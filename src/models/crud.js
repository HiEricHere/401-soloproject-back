'use strict';

class Crud {

  constructor(schema){
    this.schema = schema;
  }

  create(data){
    let record = new this.schema(data);
    return record.save();
  }

  getById(id){
    if(id){
      return this.schema.findById(id);
    } else return { message: `${id}: Record not found` };
  }

  getByUser(user){
    if(user){
      return this.schema.find({ user: user });
    } else return { message: `${user}: User not found`};
  }

  update(id, update){
    if(id){
      return this.schema.findByIdAndUpdate(id, update,{ new: true });
    } else return { message: `${id}: Cannot update - record not found` };
  }

  delete(id){
    if(id){
      return this.schema.findByIdAndDelete(id);
    } else return { message: `${id}: Cannot delete - record not found` };
  }
}

module.exports = Crud;
