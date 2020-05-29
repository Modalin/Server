const mongoose = require('mongoose');
const url = 'mongodb://localhost/modalin_database';

mongoose.connect(url, {useNewUrlParser: true});

//Mitra
const mitraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be filled']
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'Email must be filled']
  },
  password: {
    type: String,
    required: [true, 'Password must be filled']
  },
  document: {
    KTP: {
      type: String,
      required: [true, 'KTP must be filled']
    },
    KTA: {
      type: String,
      required: [true, 'KTA must be filled']
    },
    NPWP: {
      type: String,
      required: [true, 'NPWP must be filled']
    },
    SIUP: {
      type: String,
      required: [true, 'SIUP must be filled']
    }
  },
  business: {
    type: Array,
    max: 3,
    required: [true, 'Business must be filled']
  }
});

const Mitra = mongoose.model('Mitra', mitraSchema);

//Investor
const investorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be filled']
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'Email must be filled']
  },
  password: {
    type: String,
    required: [true, 'Password must be filled']
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number must be filled']
  },
  document: {
    KTP: {
      type: Number,
      required: [true, 'KTP must be filled']
    },
    NPWP: {
      type: Number,
      required: [true, 'NPWP must be filled']
    }
  },
  wallet: {
    type: {
      bank_account: Number,
      virtual_account: Number,
      phone: Number,
      income: String
    },
    max: 3
  }
});

const Investor = mongoose.model('Investors', investorSchema);

module.exports = {Mitra, Investor};