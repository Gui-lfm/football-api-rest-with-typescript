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
  it('Se o login foi feito com sucesso, deve retornar um token com status 200', async function () {
    const parameters = loginMock.validBody;
    const userMock = SequelizeUsers.build(loginMock.existingUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

    const response = await chai.request(app).post('/login').send(parameters);

    expect(response.status).to.be.equal(200)
    expect(response.body.token).not.to.be.undefined
  });

  it('Se o login não tiver o campo "email", deve retornar um erro com status 400', async function () {
    const parameters = loginMock.bodyWithoutEmail;

    const { body, status } = await chai.request(app).post('/login').send(parameters);

    expect(status).to.be.equal(400)
    expect(body.message).to.equal('All fields must be filled');
  })

  it('Se o login não tiver o campo "password", deve retornar um erro com status 400', async function () {
    const parameters = loginMock.bodyWithoutPassword;

    const { body, status } = await chai.request(app).post('/login').send(parameters);

    expect(status).to.be.equal(400)
    expect(body.message).to.equal('All fields must be filled');
  })

  it('Se o login tiver o "email" com formato inválido, deve retornar um erro com status 401', async function () {
    const parameters = loginMock.invalidEmailFormatBody;
  })

  it('Se o login tiver o "password" com formato inválido, deve retornar um erro com status 401', async function () {
    const parameters = loginMock.invalidPasswordFormatBody;
  })

  it('Emails com formato válido, mas não cadastrados no banco devem retornar um erro com status 401', async function () {
    const parameters = loginMock.bodyWithInvalidUser;
  })

  it('Senhas com formato válido, mas não cadastradas no banco devem retornar um erro com status 401', async function () {
    const parameters = loginMock.bodyWithWrongPassword;
  })

  afterEach(sinon.restore);
});