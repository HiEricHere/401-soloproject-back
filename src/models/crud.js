'use strict';

class Crud {

  constructor(schema){
    this.Schema = schema;
  }

  create(data){
    let record = new this.Schema(data);
    return record.save();
  }

  getById(id){
    if(id){
      return this.Schema.findById(id);
    } else return { message: `${id}: Record not found` };
  }

  getByUser(user){
    if(user){
      return this.Schema.find({ user: user });
    } else return { message: `${user}: User not found`};
  }

  update(id, update){
    if(id){
      return this.Schema.findByIdAndUpdate(id, update,{ new: true });
    } else return { message: `${id}: Cannot update - record not found` };
  }

  delete(id){
    if(id){
      return this.Schema.findByIdAndDelete(id);
    } else return { message: `${id}: Cannot delete - record not found` };
  }
}

module.exports = Crud;
