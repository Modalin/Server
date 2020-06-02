const { Investor, Business, Mitra } = require('../config');
const { encrypt, decrypt } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');

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
              token,
              id: foundInvestor._id,
              name: foundInvestor.name,
              photo_profile: foundInvestor.photo_profile,
              email: foundInvestor.email,
              address: foundInvestor.address,
              phone: foundInvestor.phone,
              job: foundInvestor.job,
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
        return res.status(500).json({
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
      console.log(err);
      await res.status(400).json({
        error: err.errors
      })
    }
  }

  //Profile
  static showProfile(req, res, next) {

    const decoded = verifyToken(req.headers.token)

    Investor.findById(decoded.id)
      .then(investor => {
        console.log(investor);
        const { name, email, address, job, phone, photo_profile, document, wallet } = investor;
        const data = { name, email, address, job, phone, photo_profile, document, wallet };
        return res.status(200).json(data)
      })
      .catch(err => {
        return next(err);
      })
  }

  static editProfile(req, res, next) {
    console.log('masuk edit server');
    const { name, photo_profile, phone, address, wallet, job } = req.body;
    const decoded = verifyToken(req.headers.token)

    Investor.findByIdAndUpdate(decoded.id, { name, photo_profile, phone, address, $set: { 'wallet.account_number': wallet.account_number }, job }, { new: true, runValidators: true })
      .then(investor => {
        const { name, email, address, job, phone, photo_profile, document, wallet } = investor;
        const data = { name, email, address, job, phone, photo_profile, document, wallet };
        console.log('ini hasil edit');
        console.log(data);
        return res.status(200).json(data);
      })
      .catch(err => {
        return next(err);
      })
  }

  static deleteProfile(req, res, next) {
    const { id } = req.user_id;

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
  static showWallet(req, res) {
    const id = req.user_id;
    console.log(id);
    Investor.findById(id)
      .then(investor => {
        // investor.wallet.incomePersentase = (investor.wallet.income / (investor.wallet.saldo - investor.wallet.income)) * 100;
        return res.status(200).json(investor.wallet);
      })
      .catch(err => {
        return res.status(404).json(err)
      })
  }

  static editWalletSaldo(req, res, next) {
    const { saldo } = req.body;
    const id = req.user_id;

    Investor.findByIdAndUpdate(id, { $set: { 'wallet.saldo': saldo } }, { new: true, runValidators: true })
      .then(investor => {
        return res.status(200).json(investor.wallet);
      })
      .catch(err => {
        return next(err);
      })
  }

  //Business
  static showAllBusiness(req, res, next) {
    Business.find({})
      .then(business => {
        return res.status(200).json(business);
      })
      .catch(err => {
        return next(err);
      })
  }

  static showInvestorBusiness(req, res, next) {
    const ObjectID = require('mongodb').ObjectID;

    Business.find({ 'investor.investorId': ObjectID(req.user_id) })
      .then(invest => {
        let investorIncome = 0;
        invest.map(el => {
          const result = el.investor.find(investor => investor.investorId.toString() == req.user_id)
          if (result) {
            //Investor income formula
            investorIncome += result.investor_profit;
          }
        })
        if (investorIncome) {
          Investor.findByIdAndUpdate(req.user_id, { $set: { 'wallet.income': investorIncome } })
            .then( result => {
              result.wallet.incomePersentase = (result.wallet.income / result.wallet.saldo) * 100;
              result.save();
              return res.status(200).json(invest);
            })
            .catch(err => {
              return next(err);
            })
        } else {
          return res.status(200).json(invest);
        }
      })
      .catch(err => {
        return next(err);
      })
  }

  static investToBusiness(req, res, next) {
    const { invest_value, total_unit } = req.body;
    const { id } = req.params;
    const investorId = req.user_id;

    Business.findById(id)
      .then(result => {
        if (result) {
          if (result.business_unit > 0 && total_unit <= result.business_unit) {
            if (result.investor.findIndex(el => el.investorId.toString() == investorId) >= 0) {
              return res.status(400).json({ message: 'Investor already exists' });
            } else {
              Business.findByIdAndUpdate(id, { $push: { investor: { investorId, invest_value, total_unit } }, business_unit: result.business_unit - total_unit })
                .then(result => {
                  if (result.business_unit == total_unit) {
                    result.status = 'Pendanaan Terpenuhi';
                    result.save();
                  }
                  return res.status(200).json({ message: 'Success invest' });
                })
                .catch(err => {
                  next(err);
                })
            }
          } else {
            return res.status(400).json({ message: 'Business unit is not enough'});
          }
        } else {
          return res.status(400).json({ message: 'Business not found'});
        }
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = InvestorController;