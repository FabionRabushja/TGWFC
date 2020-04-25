const fs = require('fs');
require('dotenv').config();
const apiURL = process.env.API_URL;
const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
  production: true,
  baseUrl: '${apiURL}api/',
  websocketUrl: '${apiURL}',
  logEnabled: false,
};`
fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
});
