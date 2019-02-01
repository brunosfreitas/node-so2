
const fs = require('fs');
const path = require('path');
const caFile = path.resolve(__dirname, 'certificates/client-17-A7B64D415BD3E98B.pem');
const keyFile = path.resolve(__dirname, 'certificates/client-17-A7B64D415BD3E98B.key');
const request = require('request-promise');
const Handlers = require('../api/responses/handlers').default;
const DataService = require('./dataService').default;


class GetData {

	async getData(req, res) {
		const options = {
			method: 'POST',
			uri: 'https://iot.ufsc.br/api/get.php',
			cert: fs.readFileSync(caFile),
			key: fs.readFileSync(keyFile),
			headers: {
				'content-type': 'application/json'
			},
			body: {
				series : {
					version : 1.1,
					unit    : 2224179500,
					x       : 305,
					y       : 305,
					z       : 0,
					r       : 2000,
					t0      : 0,
					t1      : 100000,
					dev     : 0
				}
			},
			json: true
		};
		try {
			const response = await request(options);
			response.series.map(r => {
				r["new_value"] = 1
			});
			const data = await DataService.insert(response.series);
			return Handlers.onSuccess(res, data)
		} catch (e) {
			return Handlers.onError(res, 'Fail to get data', e)
		}
	}

	async putData(req, res) {
		try {
			const data = await DataService.getData();

			const	smartdata = [];
			data.map(d => {
				const aju = {
					version: 1.1,
					unit: d.unit,
					x: d.x,
					y: d.y,
					z: d.z,
					t: d.timestamp,
					dev: d.dev,
					error: d.error,
					value: d.new_value,
					confidence: d.confidence
				};
				smartdata.push(aju)
			});

			const options = {
				method: 'POST',
				uri: 'https://iot.lisha.ufsc.br/api/put.php',
				cert: fs.readFileSync(caFile),
				key: fs.readFileSync(keyFile),
				headers: {
					'content-type': 'application/json'
				},
				body: {
					smartdata
				},
				json: true
			};
			try {
				await request(options);
				return Handlers.onSuccess(res, {
					success: true
				});
			} catch (e) {
				console.log(e);
				return Handlers.onError(res, 'Fail to put data', e)
			}
		} catch (e) {
			return Handlers.onError(res, 'Fail to put data', e)
		}
	}

	async attach() {
		const options = {
			method: 'POST',
			uri: 'https://iot.lisha.ufsc.br/api/attach.php',
			cert: fs.readFileSync(caFile),
			key: fs.readFileSync(keyFile),
			headers: {
				'content-type': 'application/json'
			},
			body: {
				series: {
					version: 1.1,
					t0: 0,
					t1: 18446744073709551605,
					unit: 2224179500,
					dev: 0,
					r:2000,
					y: 305,
					x: 305,
					z: 0
				}
			},
			json: true
		};
		try {
			const response = await request(options);
			console.log(response);
		} catch (e) {
			console.log(e)
		}
	}
}

exports.default = new GetData();