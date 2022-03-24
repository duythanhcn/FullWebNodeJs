import * as jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';
// tslint:disable-next-line
require('dotenv').config();

type RequestParams = {
  baseUrl: string;
  /**
   * Payload to make JWT fake.
   */
  payloadJwt?: PayloadJwt;
  headers?: Headers;
  query?: string;
  variables?: object;
};
export type PayloadJwt = {
  [key: string]: any;
};

export function axiosWithAuth({ baseUrl, headers, payloadJwt }: RequestParams) {
  let combineHeaders = {
    authorization: '',
    ...headers,
  };
  if (payloadJwt) {
    combineHeaders.authorization = `Bearer ${genToken(payloadJwt)}`;
  }
  return axios.create({
    headers: combineHeaders,
    baseURL: baseUrl,
  });
}
function genToken(payload: PayloadJwt) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    noTimestamp: true,
  });
}
