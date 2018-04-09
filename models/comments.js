const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
// using an id to refer to a user
// looking for objectid data, then we say we want a USER object
},  {
  timestamps: true
  // make sure you keep a record of when comment is Posted
  // createdAt comes from here
});

commentSchema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return this.createdAt.getDate() + ' ' + monthNames[this.createdAt.getMonth()] + ' ' + this.createdAt.getFullYear();

  });


commentSchema.methods.isOwnedBy = function(user) {
  // is this comment owned by this user?
  return this.user && user._id.equals(this.user._id);
  // if logged in user id, matches the object id
};


// data template and schema expectations
const schema = new mongoose.Schema({
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
  // make sure you keep a record of when comment is Posted
  // createdAt comes from here
});


schema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return this.date.getDate() + ' ' + monthNames[this.date.getMonth()] + ' ' + this.date.getFullYear();
  });


// telling the model it should be called Popup.
// name of the model 'popup' + schema
module.exports = mongoose.model('Popup', schema);
