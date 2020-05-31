const { Mitra, Business } = require('../config');

const { encrypt, decrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class MitraController {

  //Authentication
  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      await Mitra.findOne({ email: email }).then((foundMitra) => {
        
        if (foundMitra) {
          let verify = decrypt(password, foundMitra.password);
          if (verify) {
            const payload = {
              id: foundMitra._id,
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
            message: 'Mitra not found'
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
    const { name, email, password, address, photo_profile, phone, document, business } = req.body;
    const inputData = { 
      name, 
      email, 
      password: encrypt(password),
      address,
      photo_profile,
      phone,
      document,
      business
    };
    try {
      await Mitra.create(inputData).then((response) => {
        res.status(201).json({
          name: response.name, 
          email: response.email,
          address: response.address,
          photo_profile: response.photo_profile,
          phone: response.phone,
          document: response.document,
          business: response.business
        })
      })
    }
    catch(err) {
      console.log(err);
      return res.status(400).json({
        error: err.errors
      })
    }
  }

  //Profile
  static async editProfile() {


  }

  // static async deleteProfile() {

  // }

  //Business
  static async showBusiness(req, res) {
    try {
      let result = await Business.find({})
      return res.status(200).json(result)
    } catch(err){
      return res.status(500).json({
        message: 'something wrong !!'
      })
    }
  }

  static async createBusiness(req, res) {
    const {business_name, business_type, location, unit_bussiness, value_per_unit, business_value, persentase_value, business_description, image_360, status} = req.body
    const  mitra = req.mitraId
    let data = {
      mitra,
      business_name,
      investor,
      business_type,
      location,
      unit_bussiness,
      value_per_unit,
      business_value,
      business_description,
      image_360,
      total_profit,
      status
    }

    try {
      await Business.create(data)
      .then((result) => {
        return res.status(201).json({
          message : 'success create bussiness'
        })
      })
    } catch (err) {
      return res.status(500).json({
        message : 'something wrong'
      })
    }
  }

  static async updateBusiness() {
    const {business_name, business_type, location, unit_bussiness, value_per_unit, business_value, persentase_value, business_description, image_360, status} = req.body
    const  mitra = req.params.id
    try {
      const filter = {_id: mitra}
      let data = {
        mitra,
        business_name,
        investor,
        business_type,
        location,
        unit_bussiness,
        value_per_unit,
        business_value,
        business_description,
        image_360,
        total_profit,
        status
      }
      let result = Business.findOneAndUpdate(filter,data, {
        new: true
      })

      return res.status(201).json({
        message: 'success update bussiness'
      })
    } catch(err){

    }

  }

  // static async deleteBusiness() {

  // }
}

module.exports = MitraController;