const { Schema, model } = require('mongoose');

const AnalysisSchema = new Schema({
  isMutant: {
    type: Boolean,
    required: true
  },
  dna: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('dna-analyzed', AnalysisSchema);