const app = require('../app');
const request = require('supertest');
const { Investor, Business } = require('../config/index');
const { encrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const baseUrl = '/investor'

//Dummy
const investor = {
  name: 'qwoqwo1',
  email: 'mail9@mail.com',
  address: 'Jl.Jomblo No.8, Kaliputih, Jakarta Pusat',
  photo_profile: 'jomblo.jpg',
  job: 'jomblo',
  password: 'qweqwe',
  phone: '09989898938',
  document: {
      KTP: {
          url: 'ktp.jpg',
          no_KTP: '1200123123123'
      },
      NPWP: {
          url: 'npwp.jpg',
          no_NPWP: '09.254.294.3-407.000'
      }
  },
  wallet: {
      account_name: 'Jones',
      bank_name: 'BCA',
      account_number: '7310252527',
      saldo: '0',
      income: '0'
  }
}

const editInvestor = {
  name: 'investor terakhir',
  address: 'Jl.Dapet No.8, Kaliputih, Jakarta Pusat',
  photo_profile: 'Dapet.jpg',
  job: 'jomblo',
  password: 'qweqwe',
  phone: '09989898938',
  document: {
      KTP: {
          url: 'ktp.jpg',
          no_KTP: '1200123123123'
      },
      NPWP: {
          url: 'npwp.jpg',
          no_NPWP: '09.254.294.3-407.000'
      }
  },
  wallet: {
      account_name: 'Jones',
      bank_name: 'BCA',
      account_number: '7310252527',
      saldo: '0',
      income: '0'
  }
}

let investorId = '';
let token = '';
let tokenSalah = generateToken({id: 'response._id'});
let businessId = ''
//Set Data to Mongoose
beforeAll((done) => {
  Investor.create({
    name: 'qwoqwo1',
    email: 'mail12@mail.com',
    address: 'Jl.Jomblo No.8, Kaliputih, Jakarta Pusat',
    photo_profile: 'jomblo.jpg',
    job: 'jomblo',
    password: encrypt('qweqwe'),
    phone: '09989898938',
    document: {
        KTP: {
            url: 'ktp.jpg',
            no_KTP: '1200123123123'
        },
        NPWP: {
            url: 'npwp.jpg',
            no_NPWP: '09.254.294.3-407.000'
        }
    },
    wallet: {
        account_name: 'Jones',
        bank_name: 'BCA',
        account_number: '7310252527',
        saldo: '0',
        income: '0'
    }
  })
    .then(response => {
      investorId = response._id;
      token = generateToken({id: response._id})
      console.log('Berhasil Create Investor')
      Business.create({
        "business_name" : "ternak bebek3",
          "business_type":"Konveksi",
          "location" : {
            "lat":"8913723129394",
            "long":"83723842348392z",
            "address":"jl.ciptomangunkusumo"
          },
          "business_unit" : 20,
          "value_per_unit" : 2000000,
          "business_value" : 50000000,
          "persentase_value": 0.017,
          "business_description" : "lorem insum skadjsalkdjlasjldjasjd",
          "image_360" : "httpgs://modalin-a9fea.appspot.com/mitra/business/42697ea8-e4a1-4bd8-a6ce-643d6e7654f3.jpg",
          "total_profit": 0,
          "periode": 1,
          "status" : ""
      })
        .then(response => {
          businessId = response._id;
          console.log('Berhasil Create Business')
          done()
        })
        .catch(err => {
          console.log('Gagal Create Business')
        })  
    })
    .catch(err => {
      console.log('Berhasil Create Investor')
      done(err)
    })
})

//Run Jest Investor
describe('Investor', () => {
  //Sign In
  describe('Login Investor', () => {
    describe('success login investor', () => {
      test('should return token with status 200', done => {
          request(app)
              .post(baseUrl + '/signin')
              .send({
                  email: 'mail12@mail.com',
                  password: 'qweqwe'
              })
              .end((err, response) => {
                  if(err) {
                      return done(err)
                  } else {
                      expect(200)
                      return done()
                  }
              })
      })
    })
  
    describe('Failed login investor', () => {
      describe('Wrong Password', () => {
        test('should return Invalid Input', done => {
            request(app)
                .post(baseUrl + '/signin')
                .send({
                    email: 'mail12@mail.com',
                    password: 'salah'
                })
                .end((err, response) => {
                    if(err) {
                        return done(err)
                    } else {
                        expect(400)
                        return done()
                    }
                })
        })
      })
      
      describe('Wrong email', () => {
        test('should return Invalid Input', done => {
          request(app)
              .post(baseUrl + '/signin')
              .send({
                  email: 'salah@mail.com',
                  password: 'salah'
              })
              .end((err, response) => {
                  if(err) {
                      return done(err)
                  } else {
                      expect(400)
                      return done()
                  }
              })
      })
      })
    })

    //Sign Up
    describe('Sign Up Investor', () => {
      describe('success sign up investor', () => {
        test('should return token with status 200', done => {
            request(app)
                .post(baseUrl + '/signup')
                .send(investor)
                .end((err, response) => {
                    if(err) {
                        return done(err)
                    } else {
                        expect(200)
                        return done()
                    }
                })
        })
      })

      // describe('Failed sign up investor', () => {
      //   test('should return token with status 200', done => {
      //       request(app)
      //           .post(baseUrl + '/signup')
      //           .send(investor)
      //           .end((err, response) => {
      //               if(err) {
      //                   return done(err)
      //               } else {
      //                   expect(200)
      //                   return done()
      //               }
      //           })
      //   })
      // })
    })
  })
  

  //Services
  describe('Investor service', () => {
    describe('Success services', () => {
      describe('Success find investor', () => {
        test('should return new investor profile', (done) => {
          request(app)
            .get(baseUrl + '/find/' + investorId)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })
  
      describe('Success show investor', () => {
        test('should return show investor profile', (done) => {
          request(app)
            .get(baseUrl)
            .set('token', token)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })
  
      describe('Success edit profile', () => {
        test('should return new investor profile', (done) => {
          request(app)
            .patch(baseUrl)
            .set('token', token)
            .send(editInvestor)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })
    
      describe('Success delete profile', () => {
        test('should return message "Success deleted profile"', (done) => {
          request(app)
            .delete(baseUrl + "/" + investorId)
            .set('token', token)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })
    
      describe('Success fetch wallet', () => {
        test('should return wallet data', (done) => {
          request(app)
            .get(baseUrl + '/wallet')
            .set('token', token)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })
  
      describe('Success edit wallet', () => {
        const wallet = {
          saldo: 500,
          income: 20
        }
        test('should return new wallet data', (done) => {
          request(app)
            .patch(baseUrl + '/wallet')
            .set('token', token)
            .send(wallet)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(200);
              return done();
            })
        })
      })

      //Business
      describe('Business Services', () => {
        describe('Success show all business', () => {
          test('should show all business data', (done) => {
            request(app)
              .get(baseUrl + '/business')
              .set('token', token)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.status).toBe(200);
                return done();
              })
          })
        })

        describe('Success show invest business before invested', () => {
          test('should show invest business data', (done) => {
            request(app)
              .get(baseUrl + '/invest')
              .set('token', token)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(200);
                return done();
              })
          })
        })

        describe('Success invest to business', () => {
          test('should success invest business data', (done) => {
            request(app)
              .patch(baseUrl + '/business/' + businessId)
              .set('token', token)
              .send({ invest_value: 3000000, total_unit: 20 })
              .end((err, res) => {
                console.log('BUSINESS ID', businessId)
                if (err) {
                  return done(err);
                }
                expect(200);
                return done();
              })
          })
        })

        describe('Success show invest business after invested', () => {
          test('should show invest business data', (done) => {
            request(app)
              .get(baseUrl + '/invest')
              .set('token', token)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(200);
                return done();
              })
          })
        })
      })
    })
  
    describe('Failed services', () => {
      describe('Business failed', () => {
        test('should failed invest business data because business not found', (done) => {
          request(app)
            .patch(baseUrl + '/business/' + 'businessId')
            .set('token', token)
            .send({ invest_value: 3000000, total_unit: 20 })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).toBe(400);
              return done();
            })
        })

        test('should failed invest business data because same investor', (done) => {
          request(app)
            .patch(baseUrl + '/business/' + businessId)
            .set('token', token)
            .send({ invest_value: 3000000, total_unit: 20 })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })

        test('should failed invest business data because empty unit', (done) => {
          request(app)
            .patch(baseUrl + '/business/' + businessId)
            .set('token', token)
            .send({ invest_value: 3000000, total_unit: 2000 })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
      })
      
      describe('Failed because token does not exist', () => {
        describe('Failed edit profile', () => {
          test('should return message "Login required"', (done) => {
            request(app)
              .patch(baseUrl)
              .send({ name: 'investor gagal'})
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(401);
                return done();
              })
          })
        })
      })
  
      describe('Failed delete profile', () => {
        test('should return message "Login required"', (done) => {
          request(app)
            .delete(baseUrl)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })
      })
    
      describe('Failed fetch wallet', () => {
        test('should return message "Login required"', (done) => {
          request(app)
            .get(baseUrl + '/wallet')
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })
      })
  
      describe('Failed edit wallet', () => {
        const wallet = {
          saldo: 500,
          income: 20
        }
        test('should return message "Login required"', (done) => {
          request(app)
            .patch(baseUrl + '/wallet')
            .send(wallet)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })
      })
    })
    
    describe('Failed because validator', () => {
      //Untuk Register
      describe('Failed register', () => {
        test('should return message "Email cannot be empty"', (done) => {
          request(app)
            .post(baseUrl)
            .send({ ...investor, email: ''})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })

        test('should return message "NPWP is not a valid numbers"', (done) => {
          request(app)
            .post(baseUrl)
            .send({ ...investor, email: ''})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })

        test('should return message "Phone is not a valid numbers"', (done) => {
          request(app)
            .post(baseUrl)
            .send({ ...investor, phone: 'telpon aku'})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })

        test('should return message "NPWP is not a valid numbers"', (done) => {
          request(app)
            .post(baseUrl)
            .send({ ...investor, document: { ...investor.document, no_NPWP: 'ini NPWP'}})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              return done();
            })
        })
      })
      
      describe('Failed edit profile', () => {
        test('should return message "Name cannot be empty"', (done) => {
          request(app)
            .patch(baseUrl)
            .set('token', token)
            .send({ ...investor, name: ''})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).toBe(400);
              return done();
            })
        })
  
        test('should return message "is not a valid email!"', (done) => {
          request(app)
            .post(baseUrl + '/signup')
            .send({ ...investor, email: 'aku'})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              console.log(res.text)
              expect(401);
              return done();
            })
        })
        
        test('should return message "is not a valid phone number!"', (done) => {
          request(app)
            .patch(baseUrl)
            .set('token', token)
            .send({ ...investor, phone: 'kosong1'})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
  
        test('should return message "Phone cannot be empty"', (done) => {
          request(app)
            .patch(baseUrl)
            .set('token', token)
            .send({ ...investor, phone: ''})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
      })

      describe('Failed edit wallet', () => {
        test('should return message "is not a valid account number"', (done) => {
          request(app)
            .patch(baseUrl + '/wallet')
            .set('token', token)
            .send({ wallet: { ...investor.wallet, accountNumber: 'satu23' } })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
  
        test('should return message "is not a valid saldo"', (done) => {
          request(app)
            .patch(baseUrl + '/wallet')
            .set('token', token)
            .send({ ...investor, wallet: { ...investor.wallet, saldo: 'satu23' } })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
  
        test('should return message "is not a valid income"', (done) => {
          request(app)
            .patch(baseUrl + '/wallet')
            .set('token', token)
            .send({ ...investor, wallet: { ...investor.wallet, income: 'satu23' } })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(400);
              return done();
            })
        })
      })
    })

    describe('Error because wrong token', () => {
      describe('Failed edit profile', () => {
        test("should return message 'Sorry we don't recognize you'", (done) => {
          request(app)
            .patch(baseUrl)
            .set('token', tokenSalah)
            .send({ ...investor, name: 'investor salah'})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).toBe(401);
              return done();
            })
        })
        
      })
      
    })
    
  })
  afterAll((done) => {
    Investor.deleteMany({})
      .then(() => {
          console.log('DB clean up')
          Business.deleteMany({})
          .then(() => {
              console.log('DB clean up')
              done()
          })
          .catch(err => {
              done(err)
          })
      })
      .catch(err => {
          done(err)
      })
  })
})

