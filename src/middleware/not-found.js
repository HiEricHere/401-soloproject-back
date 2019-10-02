'use strict';

const notFound = function(request, response){
  response.status(404).send('four, oh four.');
};

module.exports = notFound;
