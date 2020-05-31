const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const url = 'mongodb://localhost/modalin_database';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

//Bussiness
const bussinesSchema = new mongoose.Schema({
      mitra: {
        type: mongoose.Types.ObjectId,
        ref:'Mitra'
      },
      investor:
      [{
        investorId: {
          type: mongoose.Types.ObjectId,
          ref: 'Investors'
        },
        invest_value: {
          type: Number
        },
        total_unit: {
          type: Number
        }
      }],
      business_name: {
        type: String
      },
      business_type: {
        type: String,
        enum: ['Pertanian', 'Konveksi', 'Jasa', 'Wisata & Perjalanan', 'Makanan', 'Peternakan', 'Semua', 'lainnya']
      },
      location: {
        lat: {
          type: String
        },
        long: {
          type: String
        },
        address: {
          type: String
        }
      },
      periode: {
        type: Number
      },
      business_unit: {
        type: Number
      },
      value_per_unit: {
        type: Number
      },
      business_value: {
        type: Number
      },
      persentase_value: {
        type: mongoose.Schema.Types.Double
      },
      business_description: {
        type: String
      },
      images_360: {
        type: String
      },
      total_profit: {
        type: Number
      },
      status: {
        type: String,
        enum: ['','Sedang Berjalan','Pendanaan Terpenuhi']
      }
    })

// bussinesSchema.pre('find', function (next, docs) {
//   console.log(this._find)
//   // if (this._update.income) {
//   //   this._update.$set.incomePersentase = (this._update.income / (this._update.saldo - this._update.income)) * 100;
//   // }
//   next();
// });

const Business = mongoose.model('Business', bussinesSchema);

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
  address: {
    type: String,
    required: [true, 'Address must be filled']
  },
  photo_profile: {
    type: String
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number must be filled']
  },
  document: {
    KTP: {
      url: {
        type: String,
        required: [true, 'KTP URL must be filled']
      },
      no_KTP: {
        type: Number,
        required: [true, 'KTP must be filled']
      }
    },
    KTA: {
      kta: {
        type: String,
        required: [true, 'KTA must be filled']
      },
      total_employee: {
        type: Number
      },
    },
    NPWP: {
      url: {
        type: String,
        required: [true, 'NPWP URL must be filled']
      },
      no_NPWP: {
        type: String,
        default: 0,
        validate: {
          validator: function(v) {
            return /\d+/g.test(v);
          },
          message: props => `${props.value} is not a valid numbers!`
        }
      }
    },
    SIUP: {
      url: {
        type: String
      },
      no_SIUP: {
        type: Number
      }
    }
  },
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
  address: {
    type: String,
    required: [true, 'Address must be filled']
  },
  photo_profile: {
    type: String
  },
  job: {
    type: String,
    required: [true, 'Job must be filled']
  },
  password: {
    type: String,
    required: [true, 'Password must be filled']
  },
  phone: {
    type: String,
    required: [true, 'Phone Number must be filled'],
    validate: {
      validator: function(v) {
        return /\d+/g.test(v);
      },
      message: props => `${props.value} is not a valid numbers!`
    }
  },
  document: {
    KTP: {
      url: {
        type: String,
        required: [true, 'KTP URL must be filled']
      },
      no_KTP: {
        type: Number,
        required: [true, 'KTP must be filled']
      }
    },
    NPWP: {
      url: {
        type: String,
        required: [true, 'NPWP URL must be filled']
      },
      no_NPWP: {
        type: String,
        default: 0,
        validate: {
          validator: function(v) {
            return /\d+/g.test(v);
          },
          message: props => `${props.value} is not a valid numbers!`
        }
      }
    }
  },
  wallet: {
    account_name: {
      type: String
    },
    bank_name: {
      type: String
    },
    account_number: {
      type: String,
      default: 0,
      validate: {
        validator: function(v) {
          return /\d+/g.test(v);
        },
        message: props => `${props.value} is not a valid numbers!`
      }
    },
    saldo: {
      type: Number,
      default: 0
    },
    income: {
      type: Number,
      default: 0
    },
    incomePersentase: {
      type: mongoose.Schema.Types.Double,
      default: 0
    }
  }
});

// investorSchema.pre('findOneAndUpdate', function (next, docs) {
//   if (this._update.income) {
//     this._update.$set.incomePersentase = (this._update.income / (this._update.saldo - this._update.income)) * 100;
//   }
//   next();
// });

const Investor = mongoose.model('Investors', investorSchema);

module.exports = { Mitra, Investor, Business};
