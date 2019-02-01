const promise = require('bluebird');
const options = { promiseLib: promise, capSQL: true };
const pgp = require('pg-promise')(options);
const config = require('./env/config')();

function checkdb() {
  if (config.dbURL) {
    return config.dbURL;
  }
  return `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.db}`;
}

// All configs to db connection
const connectionString = checkdb();
const db = pgp(connectionString);

module.exports = {
  db,
	pgp
};
