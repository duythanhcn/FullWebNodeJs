// tslint:disable-next-line
require('dotenv').config();

export function getBaseUrl() {
  return `http://localhost:${process.env.APP_PORT}/api/`;
}
