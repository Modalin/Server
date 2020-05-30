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
              name: foundMitra.name, 
              email: foundMitra.email, 
              document: foundMitra.document,
              business: foundMitra.business
            }

            const token = generateToken(payload);

            return res.status(200).json({
              token,
              id: foundMitra._id,
              name: foundMitra.name, 
              email: foundMitra.email, 
              document: foundMitra.document,
              business: foundMitra.business
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
    const { name, email, password, document, business } = req.body;
    const inputData = { 
      name, 
      email, 
      password: encrypt(password), 
      document,
      business
    };
    try {
      await Mitra.create(inputData).then((response) => {
        res.status(201).json({
          name: response.name, 
          email: response.email, 
          document: response.document,
          business: response.business
        })
      })
    }
    catch(err) {
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