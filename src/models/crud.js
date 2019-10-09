'use strict';

class Crud {

  constructor(schema){
    this.Schema = schema;
  }

  create(data){
    let record = new this.Schema(data);
    return record.save();
  }

  getByUserID(userID){
    if(userID){
      return this.Schema.find({ userID });
    } else return { message: `${userID}: User not found`};
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
