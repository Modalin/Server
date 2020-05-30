const { Mitra } = require('../config');
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
  static editProfile() {

  }

  static deleteProfile() {

  }

  //Business
  static showBusiness() {

  }

  static editBusiness() {

  }

  static deleteBusiness() {

  }
}

module.exports = MitraController;