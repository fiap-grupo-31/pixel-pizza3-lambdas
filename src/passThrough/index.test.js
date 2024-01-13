const { handler } = require('./index');

describe('handler', () => {
  it('deve retornar uma resposta com statusCode 200 e mensagem de sucesso', async () => {
    const mockEvent = {
    };

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify('Success'));
  });
});
