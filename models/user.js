const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  userLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String, required: true }
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
