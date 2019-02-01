const { db, pgp } =  require('../config/dbConnection');

class DataService {

	insert(data) {
		const cs = new pgp.helpers.ColumnSet(
			['version','unit','value','error','confidence','x','y','z','timestamp','dev','new_value'],
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
}

exports.default = new DataService();