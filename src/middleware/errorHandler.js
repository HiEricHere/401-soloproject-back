'use strict';

const errorHandler = function(error, request, response){
  console.log('hello from handler');
  response.status(500).json({ status: false, message: error });
};

module.exports = errorHandler;
