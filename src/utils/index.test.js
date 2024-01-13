const { signingKey, extract } = require('../utils/index');

describe('signingKey', () => {
  it('deve retornar a chave de assinatura correta', () => {
    const key = signingKey();
    expect(key).toEqual('PIXELS@100%2023');
  });
});

describe('extract', () => {
  it('deve extrair corretamente os parâmetros da solicitação', () => {
    const event = {
      body: '{"name": "John"}',
      queryStringParameters: '{"age": 25}',
      pathParameters: { id: '123' },
    };

    const result = extract(event);

    expect(result.body).toEqual({ name: 'John' });
    expect(result.query).toEqual({ age: 25 });
    expect(result.path).toEqual({ id: '123' });
  });
});
