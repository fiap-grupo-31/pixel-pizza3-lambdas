const jwt = require('jsonwebtoken');
const { handler } = require('./index');
const { signingKey } = require('../utils/index');

describe('handler', () => {
  it('deve retornar uma resposta autorizada para um token válido', async () => {
    // Simular um evento passando para a função handler com um token JWT válido
    const validToken = jwt.sign({ exampleKey: 'exampleValue' }, signingKey());

    const mockEvent = {
      authorizationToken: `Bearer ${validToken}`
    };

    // Chamar a função handler com o evento simulado
    const result = await handler(mockEvent);

    // Verificar se a resposta tem o formato esperado para uma autorização permitida (Allow)
    expect(result.isAuthorized).toBe(true);
    expect(result.context).toEqual({
      exampleKey: 'exampleValue',
    });
  });

  it('deve retornar uma resposta não autorizada para um token inválido', async () => {
    // Simular um evento passando para a função handler com um token JWT inválido
    const invalidToken = 'token_invalido';

    const mockEvent = {
      authorizationToken: `Bearer ${invalidToken}`,
    };

    // Chamar a função handler com o evento simulado
    const result = await handler(mockEvent);

    // Verificar se a resposta tem o formato esperado para uma autorização negada (Deny)
    expect(result.isAuthorized).toBe(false);
  });


  it('deve retornar uma resposta não autorizada para ausencia de header authorization', async () => {
    // Simular um evento passando para a função handler com um token JWT inválido
    const invalidToken = 'token_invalido';

    const mockEvent = {
      authorizationToken: 'Bearer ',
    };

    // Chamar a função handler com o evento simulado
    const result = await handler(mockEvent);

    // Verificar se a resposta tem o formato esperado para uma autorização negada (Deny)
    expect(result.isAuthorized).toBe(false);
  });
});
