const { Investor } = require('../config');
const { encrypt, decrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class InvestorController {

  //Authentication
  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      await Investor.findOne({ email: email }).then((foundInvestor) => {
        
        if (foundInvestor) {
          let verify = decrypt(password, foundInvestor.password);
          if (verify) {
            const payload = {
              id: foundInvestor._id,
              name: foundInvestor.name, 
              email: foundInvestor.email, 
              phone: foundInvestor.phone,
              document: foundInvestor.document,
              wallet: foundInvestor.wallet
            }

            const token = generateToken(payload);

            return res.status(200).json({
              token,
              id: foundInvestor._id,
              name: foundInvestor.name, 
              email: foundInvestor.email, 
              phone: foundInvestor.phone,
              document: foundInvestor.document,
              wallet: foundInvestor.wallet
            })
          } else {
            return res.status(400).json({
              message: 'Invalid Input'
            })
          }
        } else {
          return res.status(404).json({
            message: 'Investor not found'
          })
        }
      })

    } catch (err) {
        return res.status(err.status).json({
          message: err.message,
      });
    }
  }

  static async signUp(req, res) {
    const { name, email, password, document, phone, wallet } = req.body;
    const inputData = { 
      name, 
      email, 
      password: encrypt(password), 
      phone,
      document,
      wallet
    };
    try {
      await Investor.create(inputData).then((response) => {
        res.status(201).json({
          name: response.name, 
          email: response.email, 
          phone: response.phone,
          document: response.document,
          wallet: response.wallet
        })
      })
    }
    catch(err) {
      await res.status(400).json({
        error: err.errors
      })
    }
  }

  //Profile
  static editProfile(req, res, next) {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    Investor.findOneAndUpdate({ _id: id }, { name, email, phone }, { new: true, runValidators: true })
      .then(investor => {
        return res.status(200).json(investor);
      })
      .catch(err => {
        return next(err);
      })
  }

  static deleteProfile(req, res, next) {
    const { id } = req.params;

    Investor.findOneAndRemove({ _id: id })
      .then(_ => {
        return res.status(200).json({ message: 'Success deleted profile' });
      })
      .catch(err => {
        return next(err);
      })
  }

  //Wallet
  static showWallet() {

  }

  static editWallet() {

  }

  static deleteWallet() {

  }
}

module.exports = InvestorController;