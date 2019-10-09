'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const contentRoute = express.Router();
const schema = require('../../models/todo/todo-model');
const Crud = require('../../models/crud');
const todo = new Crud(schema);
// const authenticate = require('../../middleware/authenticate-middleware');

contentRoute.get('/todo/:userID', getTodoByUserID);
contentRoute.post('/todo/:userID', createTodo);
contentRoute.put('/todo/:userID', changeTodo);
contentRoute.delete('/todo/:userID', deleteTodo);

function getTodoByUserID(request, response, next){
  const userID = request.params.userID;
  return todo.getByUserID(userID)
    .then(data => {
      response.json(data);
    })
    .catch(error => next(error));
}

function createTodo (request, response, next){
  if(request.body){
    return todo.create(request.body)
      .then(newRecord => {
        response.status(200).json(newRecord);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not create!` });
}

function changeTodo (request, response, next){
  if(request.query.id && request.body){
    return todo.update(request.query.id, request.body)
      .then(updatedThing => {
        response.status(200).json(updatedThing);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not update!` });
}

function deleteTodo (request, response, next){
  if(request.query.id){
    return todo.delete(request.query.id)
      .then(deletedItem => {
        response.status(200).json(deletedItem);
      })
      .catch(error => next(error));
  } else response.send({ message: `Could not delete!` });
}

module.exports = contentRoute;
