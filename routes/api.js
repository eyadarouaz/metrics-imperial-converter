'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get((req, res) => {
    let {input} = req.query;
    
    if(input) {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      if(initNum === 'invalid number' && initUnit === 'invalid unit')
        return res.json('invalid number and unit');
      if(initNum === 'invalid number' && initUnit !== 'invalid unit')
        return res.json('invalid number');
      if(initNum !== 'invalid number' && initUnit === 'invalid unit')
        return res.json('invalid unit');
      
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);

      return res.json(convertHandler.getString(initNum, initUnit, returnNum, returnUnit));
    }
  })

};
