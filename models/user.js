const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// MESSAGES SCHEMA
const messageSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
// using an id to refer to a user
// looking for objectid data, then we say we want a USER object
},  {
  timestamps: true
});

// MESSAGING SCHEMA
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

// USER MODEL
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: 'Please provide a name' },
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
  image: { type: String },
  messages: [ messageSchema ]
});


// STORE PASSWORD HERE AND SET PASSWORD CONFIRMATION
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// IF PASSWORD DOESN'T MATCH, DON'T LOG IN
userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

// HASH THE PASSWORD AND PROTECT IT
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

//VALIDATE PASSWORD
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
