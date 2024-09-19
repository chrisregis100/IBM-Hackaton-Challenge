const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
  username:{type:String, require:true},
  email:{type: String, require:true, unique:true},
  password:{type:String, require:true}
},{timestamps:true} )

const User = models.User || model('User', UserSchema)

export default User ;