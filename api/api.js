const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Routes = require('./routes/routes').default;
const Handlers = require("./responses/handlers").default;

class Api {

	constructor() {
		this.express = express();
		this.middleware();
	}

	middleware() {
		this.express.use(morgan('dev'));
		this.express.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
		this.express.use(bodyParser.json({ limit: '100mb' }));
		this.express.use(Handlers.errorHandlerApi);
		Api.router(this.express);
	}

	static router(app) {
		Routes.initRoutes(app)
	}
}

exports.default = new Api().express;
