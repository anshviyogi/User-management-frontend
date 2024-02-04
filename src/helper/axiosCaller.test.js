import axios from 'axios';
import apiCaller from './apiCaller.js';

jest.mock('axios');

describe('apiCaller', () => {
  it('creates an instance of axios with the correct baseURL and responseType', () => {
    expect(apiCaller).toBeInstanceOf(axios.create);
    expect(apiCaller.defaults.baseURL).toBe('https://user-management-backend-xi.vercel.app/');
    expect(apiCaller.defaults.responseType).toBe('json');
  });

  it('makes a GET request to the specified endpoint', async () => {
    const mockResponse = { data: 'mock data' };
    axios.get.mockResolvedValue(mockResponse);

    const response = await apiCaller.get('endpoint');

    expect(axios.get).toHaveBeenCalledWith('endpoint');
    expect(response).toBe(mockResponse);
  });

  it('makes a POST request to the specified endpoint with the provided data', async () => {
    const mockResponse = { data: 'mock data' };
    axios.post.mockResolvedValue(mockResponse);

    const data = { key: 'value' };
    const response = await apiCaller.post('endpoint', data);

    expect(axios.post).toHaveBeenCalledWith('endpoint', data);
    expect(response).toBe(mockResponse);
  });

  // Add more tests for other HTTP methods if needed
});