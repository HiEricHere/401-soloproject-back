'use strict';

const errorHandler = function(error, request, response){
  response.status(500).send('Internal error.');
};

module.exports = errorHandler;
