const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const messageSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
// using an id to refer to a user
// looking for objectid data, then we say we want a USER object
},  {
  timestamps: true
  // make sure you keep a record of when messages is Posted
  // createdAt comes from here
});

messageSchema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return this.createdAt.getDate() + ' ' + monthNames[this.createdAt.getMonth()] + ' ' + this.createdAt.getFullYear();

  });


messageSchema.methods.isOwnedBy = function(user) {
  // is this messages owned by this user?
  return this.user && user._id.equals(this.user._id);
  // if logged in user id, matches the object id
};

// user model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true  },
  // gender: { type: String, required: true },
  date: { type: String, required: true  },
  travelling: { type: String, required: true },
  // interests: { type: String, required: true }
  last_login_date: { type: Date },
  description: { type: String },
  userLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String, required: true },
  messages: [ messageSchema ]
});



// store password here and set password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// UserSchema.statics.login = function login(id, callback) {
//    return this.findByIdAndUpdate(id, { $set : { 'last_login_date' : Date.now() }, { new : true }, callback);
// };

// if the password doesn't match, or has been changed, don't login/validate
userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

// hash the password
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', userSchema);
