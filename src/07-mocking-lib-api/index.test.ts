// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;
    await throttledGetDataFromApi('/users');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;
    await throttledGetDataFromApi('/users');

    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const data = { name: 'Alex', id: 1 };
    const mockGet = jest.fn().mockResolvedValue({ data: data });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;
    const result = await throttledGetDataFromApi('/users');

    expect(result).toBe(data);
  });
});
