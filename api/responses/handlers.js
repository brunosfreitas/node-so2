const HTTPStatus = require("http-status");

class Handlers {
	constructor() { }

	onSuccess(res, data) {
		return res.status(HTTPStatus.OK).json(data);
	}

	onError(res, message, err) {
		console.log(`Error: ${err}`);
		return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: message
		});
	}

	errorHandlerApi(err, req, res, next) {
		console.error(`API error handler foi executada: ${err}`);
		return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
			errorCode: 'ERR-001',
			message: 'Erro Interno do Servidor'
		});
	}

	onBadRequest(res, message) {
		console.log(`Error: ${message}`);
		return res.status(HTTPStatus.BAD_REQUEST).json({
			success: false,
			message: message
		});
	}
}

exports.default = new Handlers();
