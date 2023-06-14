import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import teamMock from './mocks/team.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo de times (Teams)', function () {
  it('Deve retornar uma lista de todos os times presentes no banco de dados', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamMock.teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock.teams);
  })

  it('Deve retornar um time específico', async function () {
    sinon.stub(SequelizeTeams, 'findOne').resolves(teamMock.team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock.team);
  })

  it('caso seja informado um id inválido, retorna um erro', async function () {
    sinon.stub(SequelizeTeams, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/99999');

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Team not found!');
  })

  afterEach(sinon.restore);
});