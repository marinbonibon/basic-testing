// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

// jest.mock('axios');
// // const mockAxios = axios as jest.Mocked<typeof axios>;
// const mockAxios = jest.genMockFromModule('axios');
// mockAxios.create = jest.fn(() => mockAxios);

jest.mock('axios');
const responseData = { data: { foo: 'bar' } };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    axios.create = jest.fn().mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValue(responseData),
    }));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockCreate = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL,
    });
    mockCreate.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosClient = { get: jest.fn().mockResolvedValue(responseData) };
    axios.create = jest.fn().mockImplementationOnce(() => mockAxiosClient);

    const mockGet = jest.spyOn(mockAxiosClient, 'get');
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(mockGet).toHaveBeenCalledWith(`${relativePath}`);
    mockGet.mockRestore();
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const result = await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(result).toEqual(responseData.data);
  });
});
