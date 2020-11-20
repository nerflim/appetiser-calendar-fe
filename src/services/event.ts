import { httpClient } from '@/services/httpClient';

const BASE_PATH = '/events';

export const getEvents = (): Promise<any> =>
  httpClient.get(`${BASE_PATH}`).then(({ data }) => data);

export const addEvents = (payload: any): Promise<any> =>
  httpClient.post(`${BASE_PATH}/add`, payload).then(({ data }) => data);
