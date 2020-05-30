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
            }

            const token = generateToken(payload);

            return res.status(200).json({
              token
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
    const { name, email, address, photo_profile, job, password, document, phone, wallet } = req.body;
    const inputData = { 
      name, 
      email,
      address, 
      photo_profile,
      password: encrypt(password), 
      job,
      document,
      phone,
      wallet
    };
    try {
      await Investor.create(inputData).then((response) => {
        res.status(201).json({
          name: response.name, 
          email: response.email,
          address: response.address, 
          photo_profile: response.photo_profile,
          job: response.job,
          document: response.document,
          phone: response.phone,
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
  static editProfile() {

  }

  static deleteProfile() {

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