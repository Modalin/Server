const { Investor, Business } = require('../config');
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
            console.log(foundInvestor)
            return res.status(200).json({
              token,
              id: foundInvestor._id,
              name: foundInvestor.name,
              photo_profile: foundInvestor.photo_profile,
              email: foundInvestor.email,
              phone: foundInvestor.phone,
              job: foundInvestor.job,
              document: foundInvestor.document
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
      .then(investor => {
        if (investor) {
          return res.status(200).json({ message: 'Success deleted profile' });
        } else {
          return res.status(404).json({ message: 'User profile not found' });
        }
      })
      .catch(err => {
        return next(err);
      })
  }

  //Wallet
  static showWallet(req, res, next) {
    const id = req.user_id;

    Investor.findById(id)
      .then(investor => {
        // investor.wallet.incomePersentase = (investor.wallet.income / (investor.wallet.saldo - investor.wallet.income)) * 100;
        return res.status(200).json(investor.wallet);
      })
      .catch(err => {
        return next(err);
      })
  }

  static editWalletSaldo() {
    const { saldo } = req.body;
    const id = req.user_id;

    Investor.findOneAndUpdate({ _id: id }, { saldo }, { new: true, runValidators: true })
      .then(investor => {
        return res.status(200).json(investor.wallet);
      })
      .catch(err => {
        return next(err);
      })
  }

  //Business
  static showAllBusiness(req, res, next) {
    Business.find()
      .then(business => {
        const investorIncome = 0;
        business.map(el => {
          if (el.investor.investorId === req.user_id) {
            //Sharing results formula
            const sharing = (el.investor.total_unit / el.unit_business) * 100;
            //Investor income formula
            investorIncome += (sharing * el.total_profit);
          }
        })
        Investor.findByIdAndUpdate(req.user_id, { wallet: { ...wallet, income: investorIncome } })
          .then( _ => {
            return res.status(200).json(business);
          })
          .catch(err => {
            return next(err);
          })
      })
      .catch(err => {
        return next(err);
      })
  }

  static showInvestorBusiness(req, res, next) {
    Business.find({ investor: { investorId: req.user_id } })
      .then(docs => {
        return res.status(200).json(docs);
      })
      .catch(err => {
        return next(err);
      })
  }
}

module.exports = InvestorController;