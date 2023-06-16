import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import matchMock from './mocks/match.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do fluxo de partidas (matches)', function () {
  it('Deve retornar todas as partidas presentes no banco de dados', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.matches as any);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.matches);
  })

  it('É possivel filtrar somente as partidas em andamento', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.activeMatches as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.activeMatches);
  })

  it('É possivel filtrar somente as partidas finalizadas', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock.matches as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.matches);
  })

  afterEach(sinon.restore);
})