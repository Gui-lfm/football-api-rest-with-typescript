import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeUsers from '../database/models/SequelizeUsers';
import matchMock from './mocks/match.mock';
import loginMock from './mocks/login.mock';
import Validations from '../middlewares/validations';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo de partidas (matches)', function () {
  describe('Testes de GET /matches', function () {
    it('Deve retornar todas as partidas presentes no banco de dados', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.matches as any);

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.matches);
    })
    it('É possivel filtrar somente as partidas em andamento', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.activeMatches as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=true');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.activeMatches);
    })
    it('É possivel filtrar somente as partidas finalizadas', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.matches as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=false');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchMock.matches);
    })
  })

  describe('Testes de /matches/:id/finish', function () {
    it('É possível finalizar uma partida em andamento', async function () {
      const parameters = loginMock.validBody;
      const userMock = SequelizeUsers.build(loginMock.existingUser);
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      const response = await chai.request(app).post('/login').send(parameters);

      const { token } = response.body

      sinon.stub(SequelizeMatches, 'update').resolves([1]);

      const { id } = matchMock.activeMatch;
      const { status, body } = await chai.request(app).patch(`/matches/${id}/finish`).set('authorization', token);

      expect(status).to.equal(200);
      expect(body.message).to.deep.equal('Finished');
    })
    it('Caso o token não seja informado, deve retornar um erro, com um status 401', async function () {
      const { body, status } = await chai.request(app).patch('/matches/1/finish').set('authorization', '');

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token not found');
    })
    it('Caso o token seja inválido, retorna um erro com um status 401', async function () {
      const { body, status } = await chai.request(app).patch('/matches/1/finish').set('authorization', 'fakeToken');

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token must be a valid token');
    })
  })

  describe('Testes de /matches/:id', function () {
    it('É possível atualizar o placar de uma partida em andamento', async function () {
      const parameters = loginMock.validBody;
      const userMock = SequelizeUsers.build(loginMock.existingUser);
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      const response = await chai.request(app).post('/login').send(parameters);

      const { token } = response.body
      const { id } = matchMock.activeMatch;

      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      const { status, body } = await chai.request(app).patch(`/matches/${id}`).set('authorization', token).send(matchMock.newScore);

      expect(status).to.equal(200);
    })

    it('Caso o token não seja informado, deve retornar um erro, com um status 401', async function () {
      const { body, status } = await chai.request(app).patch('/matches/1/').set('authorization', '');

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token not found');
    })

    it('Caso o token seja inválido, retorna um erro com um status 401', async function () {
      const { body, status } = await chai.request(app).patch('/matches/1/').set('authorization', 'fakeToken');

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token must be a valid token');
    })

  })
  describe('Testes de POST /matches', function () { 
    it('É possivel cadastrar uma nova partida', async function () {
      const existingUser = loginMock.validBody;
      const userMock = SequelizeUsers.build(loginMock.existingUser);
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      const response = await chai.request(app).post('/login').send(existingUser);

      const { token } = response.body
      const parameters = matchMock.matchRequest;
      sinon.stub(SequelizeMatches, 'create').resolves(matchMock.newMatch as any);
      sinon.stub(Validations, 'validateToken').returns();
      sinon.stub(Validations, 'validateMatch').returns();

      const  { status, body } = await chai.request(app).post('/matches').set('authorization', token).send(parameters);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchMock.newMatch);
    })

    it('Caso o token não seja informado, deve retornar um erro, com um status 401', async function () {
      const parameters = matchMock.newMatch
      const { body, status } = await chai.request(app).post('/matches').set('authorization', '').send(parameters)

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token not found');
    })

    it('Caso o token seja inválido, retorna um erro com um status 401', async function () {
      const parameters = matchMock.newMatch
      const { body, status } = await chai.request(app).post('/matches').set('authorization', 'fakeToken').send(parameters);

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Token must be a valid token');
    })

    it('Não é possível inserir uma partida em que o homeTeam e o awayTeam sejam iguais', async function () {
      const parameters = matchMock.sameTeam;
    })

    it('Caso algum dos times não esteja cadastrado no banco de dados, deve retornar um erro com um status 404', async function () {
      
    })
  })

  afterEach(sinon.restore);
})