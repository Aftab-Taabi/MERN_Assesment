const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required'],
    validate: {
      validator: function(value) {
        return value > 0 && value <= new Date().getFullYear();
      },
      message: 'Please enter a valid year'
    }
  },
  ISBN: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    validate: {
      validator: function(value) {
        // Basic ISBN validation (can be enhanced)
        return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(value);
      },
      message: 'Please enter a valid ISBN'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);