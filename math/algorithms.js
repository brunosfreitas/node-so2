const DataService = require('../modules/dataService').default;


class Algorithms {
    constructor() {         
    }
    
    calculateApprovalByNonLinearRegression(pluv, turbidy, level) {
        const { a, b, c, m, w, tolerance } = {
            a: 0.08112,
            b: -0.001477,
            c: 0.6128,
            m: 0.8194,
            w: 0.5319, 
            tolerance: 0.00005
        }
        
        const expected_pluv = a + b*Math.sin(m*Math.PI*turbidy) + c*Math.exp(-(Math.pow((w*level), 2)));

        const return_array = {
            expected_pluv,
            pluv: pluv,
            error: pluv - expected_pluv,
            approval: (pluv - expected_pluv < tolerance)? 1 : 0
        }
        return return_array;

	}
}

exports.default = new Algorithms();
