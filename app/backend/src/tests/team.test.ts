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
});