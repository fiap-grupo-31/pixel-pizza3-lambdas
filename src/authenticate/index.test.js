const axios = require('axios');
const { handler } = require('./index');
const jwt = require('jsonwebtoken');
const { signingKey, extract } = require('../utils/index');

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar 404 se o consumidor não for encontrado', async () => {
    const mockEvent = {
      body: {
        _cpf: '33811205811',
      },
    };

    const mockContext = {};
    const mockCallback = jest.fn();

    axios.get.mockRejectedValue({ response: { status: 404, data: { message: 'Not Found' } } });

    jwt.sign.mockReturnValue('algum_token_de_acesso_mock');

    const resume = await handler(mockEvent, mockContext, mockCallback);
    expect(JSON.stringify(resume)).toBe("{\"statusCode\":404,\"body\":\"{\\\"message\\\":\\\"error\\\"}\"}");
  });

  test('deve retornar o token de acesso se o consumidor for encontrado', async () => {
    const mockEvent = {
      body: {
        _cpf: '33811205811',
      },
    };

    const mockContext = {};
    const mockCallback = jest.fn();

    // Configurar mock de axios.get para simular sucesso na requisição
    axios.get.mockResolvedValue({
      data: {
        data: [{ _id: '33811205811' }],
      },
    });

    // Configurar mock de jwt.sign para retornar um valor específico
    jwt.sign.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjVhMmJiNDllZTM4NGFjOWE2YTYyM2RlIiwiaWF0IjoxNzA1MTcxMzU4fQ.WNE925DQ9Ul2G51VEv97v0xTKSfdWvry_C-b17HgLvQ');

    const resume = await handler(mockEvent, mockContext, mockCallback);
    expect(JSON.stringify(resume)).toBe("{\"statusCode\":200,\"body\":\"{\\\"accessToken\\\":\\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lcklkIjoiNjVhMmJiNDllZTM4NGFjOWE2YTYyM2RlIiwiaWF0IjoxNzA1MTcxMzU4fQ.WNE925DQ9Ul2G51VEv97v0xTKSfdWvry_C-b17HgLvQ\\\"}\"}");
  });
});
