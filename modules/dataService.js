const { db, pgp } =  require('../config/dbConnection');

class DataService {

	insert(data) {
		const cs = new pgp.helpers.ColumnSet(
			['version','unit','value','error','confidence','x','y','z','timestamp','dev','new_value', 'approval'],
			{table: 'data'}
			);
		const query = `${pgp.helpers.insert(data, cs)} returning *`;
		return db.many(query)
	}

	getData() {
		return db.many({
			name: 'get-all',
			text: `select * from data`,
			values: [],
		})
	}

	getLast() {
		return db.one({
			name: 'get-last',
			text: `select timestamp from data order by timestamp desc limit 1`,
			values: [],
		})
	}

	getAlgorithmVariables(){
		return db.one({
			name: 'get-algo-variables',
			text: `select a, b, c, m, w from algorithms order by id asc limit 1`,
			values: [],
		})
	}
}

exports.default = new DataService();