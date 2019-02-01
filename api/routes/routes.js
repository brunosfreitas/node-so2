const HTTPStatus = require("http-status");
const GetData = require('../../modules/getData').default;

class Routes {
	constructor() { }
	initRoutes(app) {

		app.route('/').get((req, res) => {
			res.status(HTTPStatus.OK).json({
				success: true,
				message: 'Servidor ok'
			})
		});

		app.route('/getData').get(GetData.getData);
		app.route('/putData').get(GetData.putData);
		app.route('/attachData').get(GetData.attach);

	}
}

exports.default = new Routes();
