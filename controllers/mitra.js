const { Mitra, Business } = require("../config");
const mongoose = require('mongoose')

const { encrypt, decrypt } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class MitraController {
  //Authentication
  static async signIn(req, res) {
    const { email, password } = req.body;
    // try {
      await Mitra.findOne({ email: email }).then((foundMitra) => {
        if (foundMitra) {
          let verify = decrypt(password, foundMitra.password);
          if (verify) {
            const payload = {
              id: foundMitra._id,
            };

            const token = generateToken(payload);

            return res.status(200).json({
              token,
              id: foundMitra._id,
              data: foundMitra
            });
          } else {
            return res.status(400).json({
              message: "Invalid Input",
            });
          }
        } else {
          return res.status(404).json({
            message: "Mitra not found",
          });
        }
      });
    // } catch (err) {
    //   return res.status(err.status).json({
    //     message: err.message,
    //   });
    // }
  }

  static async signUp(req, res) {
    const {
      name,
      email,
      password,
      address,
      photo_profile,
      phone,
      document,
      bank_name,
      bank_account,
      account_number
    } = req.body;
    const inputData = {
      name,
      email,
      password: encrypt(password),
      address,
      photo_profile,
      phone,
      document,
      bank_name,
      bank_account,
      account_number
    };
    // try {
      await Mitra.create(inputData).then((response) => {
        res.status(201).json({
          name: response.name,
          email: response.email,
          address: response.address,
          photo_profile: response.photo_profile,
          phone: response.phone,
          bank_name,
          bank_account,
          account_number,
          document: response.document,
        });
      });
    // } catch (err) {
    //   return res.status(400).json({
    //     error: err.errors,
    //   });
    // }
  }

  static async getById (req, res) {
    let { id } = req.params;
    try {
      let response = await Mitra.findById(id);
      return res.status(200).json(response)
    } catch (err) {
    //   res.status(404).json({
    //     error: err.errors
    //   })
    }
  }

  static async getBusinessByAuth (req, res) {
    let { id } = req.params;
    // try {
      let response = await Business.find({ mitra: id });
      return res.status(200).json(response)
    // } catch (err) {
    //   return res.status(404).json({
    //     message: "Business Not Found !!",
    //   });
    // }
  }

  //Profile
  // static async editProfile() {}

  // static async deleteProfile() {

  // }

  //Business
  static async showBusiness(req, res) {
    // try {
      let result = await Business.find({});
      return res.status(200).json(result);
    // } catch (err) {
    //   return res.status(500).json({
    //     message: "something wrong !!",
    //   });
    // }
  }


  static async createBusiness(req, res) {
    const {
      business_name,
      business_type,
      location,
      business_unit,
      value_per_unit,
      business_value,
      persentase_value,
      business_description,
      images_360,
      status,
      total_profit,
      periode,
      profit_times
    } = req.body;
    const mitra = req.mitraId;
    
    // try {
      let createMitra = await Mitra.findById({ _id: mitra})
      let data = {
        mitra,
        business_name,
        // investor: {
        //   invest_value: 0,
        //   total_unit: 0,
        //   investor_id: null,
        // },
        investor: [],
        business_type,
        location,
        business_unit,
        value_per_unit,
        business_value,
        business_description,
        images_360,
        persentase_value,
        total_profit,
        status,
        periode,
        profit_times,
        owner: {
          name: createMitra.name,
          phone: createMitra.phone
        }
      };
      await Business.create(data).then(() => {
        return res.status(201).json({
          message: "success create bussiness",
        });
      })
    // } catch (err) {

    //   return res.status(500).json({
    //     message: "something wrong",
    //   });
    // }
  }

  // static async updateAllBusiness(req, res, next) {
  //   const {
  //     business_name,
  //     business_type,
  //     location,
  //     business_unit,
  //     value_per_unit,
  //     business_value,
  //     persentase_value,
  //     business_description,
  //     images_360,
  //     status,
  //     periode,
  //     profit_times,
  //   } = req.body;
  //   const mitra = req.params.id;
  //   // try {
  //     const filter = { _id: mitra };
  //     let data = {
  //       mitra,
  //       business_name,
  //       investor,
  //       business_type,
  //       location,
  //       business_unit,
  //       value_per_unit,
  //       business_value,
  //       business_description,
  //       images_360,
  //       total_profit,
  //       persentase_value,
  //       status,
  //       periode,
  //       profit_times,
  //     };
  //     let result = await Business.findOneAndUpdate(filter, data, {
  //       new: true,
  //     });

  //     return res.status(201).json({
  //       message: "success update bussiness",
  //     });
  //   // } catch (err) {
  //   //   return res.status(500).json({
  //   //     message: "something wrong",
  //   //   });
  //   // }
  // }

  // static async addInvestor(req, res){
  //   const { investor } = req.body
  //   const { id }  = req.params
      
    
  //   try {
  //     const filter = {_id: mongoose.Types.ObjectId(id)}
  //     const data = {$push: {investor: investor}}
      
  //    let result =  await Business.findOneAndUpdate(filter, data, {
  //       new: true
  //     })

  //     let totalUnit = 0
  //     result.investor.forEach(el => {
  //       totalUnit += el.total_unit
  //     });
  //     const updateUnit = {business_unit: result.business_unit - totalUnit}
  //       await Business.findOneAndUpdate(filter, updateUnit)
  //       return res.status(201).json({
  //         message: 'success add investor'
  //     })
  //   } catch(err){
    
  //     return res.status(500).json({
  //       message: "something wrong",
  //     });
  //   }
  // }

  static async updateProfit(req, res){
    const { id } = req.params
    const { profit } = req.body

    // try {
      const filter = {_id: mongoose.Types.ObjectId(id)}
      const data = {total_profit: profit}

      const business = await Business.findOneAndUpdate(filter, data, {
        new: true
      })
      if (business.investor[0]) {
        business.investor.map(investor => {
          investor.investor_profit = (investor.total_unit / business.business_unit) * profit;
        })
        business.save();
      }
      res.status(201).json({
        message: 'success update Profit'
      })
    // } catch(err){
    //   return res.status(500).json({
    //     message: "something wrong",
    //   });
    // }
  }

  static async createReport(req, res){
    const { report } =  req.body
    const { id } = req.params

    // try {
      const filter = {_id: mongoose.Types.ObjectId(id)}
      const data = {$push: {report: report}}
      
      await Business.findOneAndUpdate(filter, data, {
        new: true
      })

      res.status(201).json({
        message: 'success create report'
      })
    // } catch(err) {
    //   return res.status(500).json({
    //     message: "something wrong",
    //   });
    // }

  }
  // static async deleteBusiness() {

  // }

}

module.exports = MitraController;
