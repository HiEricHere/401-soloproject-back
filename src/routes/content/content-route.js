'use strict';

const express = require('express');
const contentRoute = express.Router();
const schema = require('../../models/test/test-model');
const Crud = require('../../models/crud');
const test = new Crud(schema);

contentRoute.get('/test', getSomething);
contentRoute.post('/test', makeSomething);
contentRoute.put('/test', changeSomething);
contentRoute.delete('/test', deleteSomething);

function getSomething (request, response, next){
  if(request.query.id){
    return test.getById(request.query.id)
      .then(data => {
        response.status(200).json(data);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not get!`});
}

function makeSomething (request, response, next){
  if(request.body){
    return test.create(request.body)
      .then(newRecord => {
        response.status(200).json(newRecord);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not create!` });
}

function changeSomething (request, response, next){
  if(request.query.id && request.body){
    return test.update(request.query.id, request.body)
      .then(updatedThing => {
        response.status(200).json(updatedThing);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not update!` });
}

function deleteSomething (request, response, next){
  if(request.query.id){
    return test.delete(request.query.id)
      .then(deletedItem => {
        response.status(200).json(deletedItem);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not delete!` });
}

module.exports = contentRoute;
