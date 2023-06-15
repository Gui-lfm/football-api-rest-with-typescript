import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo de Users e Login', function () {
  describe('Testes de /login', function () {
    it('Se o login foi feito com sucesso, deve retornar um token com status 200', async function () {
      const parameters = loginMock.validBody;
      const userMock = SequelizeUsers.build(loginMock.existingUser);
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

      const response = await chai.request(app).post('/login').send(parameters);

      expect(response.status).to.be.equal(200)
      expect(response.body.token).not.to.be.undefined
    });

    it('Se o login estiver com o campo "email" vazio, deve retornar um erro com status 400', async function () {
      const parameters = loginMock.bodyWithoutEmail;

      const { body, status } = await chai.request(app).post('/login').send(parameters);

      expect(status).to.be.equal(400)
      expect(body.message).to.equal('All fields must be filled');
    })

    it('Se o login estiver com o campo "password" vazio, deve retornar um erro com status 400', async function () {
      const parameters = loginMock.bodyWithoutPassword;

      const { body, status } = await chai.request(app).post('/login').send(parameters);

      expect(status).to.be.equal(400)
      expect(body.message).to.equal('All fields must be filled');
    })

    it('Se o login tiver o "email" com formato inválido, deve retornar um erro com status 401', async function () {
      const parameters = loginMock.invalidEmailFormatBody;

      const { body, status } = await chai.request(app).post('/login').send(parameters);
      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Invalid email or password');
    })

    it('Se o login tiver o "password" com formato inválido, deve retornar um erro com status 401', async function () {
      const parameters = loginMock.invalidPasswordFormatBody;

      const { body, status } = await chai.request(app).post('/login').send(parameters);
      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Invalid email or password');
    })

    it('Emails com formato válido, mas não cadastrados no banco devem retornar um erro com status 401', async function () {
      const parameters = loginMock.bodyWithInvalidUser;
      sinon.stub(SequelizeUsers, 'findOne').resolves(null)

      const { status, body } = await chai.request(app).post('/login').send(parameters);

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Invalid email or password');
    })

    it('Senhas com formato válido, mas não cadastradas no banco devem retornar um erro com status 401', async function () {
      const parameters = loginMock.bodyWithWrongPassword;
      sinon.stub(SequelizeUsers, 'findOne').resolves(null)

      const { status, body } = await chai.request(app).post('/login').send(parameters);

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Invalid email or password');
    })
  })

  describe('Testes de login/role', function () {
    it('Ao tentar acessar o "role" de um usuário sem um token, retorna um erro com status 401', async function () {
      const { body, status } = await chai.request(app).get('/login/role').set('authorization', '');

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Token not found');
    })

    it('Ao tentar acessar o "role" de um usuário com um token inválido, retorna um erro com status 401', async function () {
      const { body, status } = await chai.request(app).get('/login/role').set('authorization', 'fakeToken');

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Token must be a valid token');
    })

    it('Retorna o "role" de um usuário usando um token válido', async function () {
      // primeiro geramos um token ao logar com um usuário válido:
      const parameters = loginMock.validBody;
      const userMock = SequelizeUsers.build(loginMock.existingUser);
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);
      const response = await chai.request(app).post('/login').send(parameters);

      // pego o token recebido via desestruturação
      const { token } = response.body

      // requisição usando o token gerado:
      const { body, status } = await chai.request(app).get('/login/role').set('authorization', token);

      expect(status).to.be.equal(200)
      expect(body).to.deep.equal({ role: loginMock.existingUser.role });
    })
  })


  afterEach(sinon.restore);
});