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
              address: foundInvestor.address,
              photo_profile: foundInvestor.photo_profile,
              job: foundInvestor.job,
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
              address: foundInvestor.address,
              photo_profile: foundInvestor.photo_profile,
              job: foundInvestor.job,
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
    const { name, email, address, photo_profile, job, password, document, phone, wallet } = req.body;
    const inputData = { 
      name, 
      email,
      address, 
      photo_profile,
      job,
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
          address: response.address, 
          photo_profile: response.photo_profile,
          job: response.job,
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