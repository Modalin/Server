
const app = require('../app')
const request = require('supertest')
const { Mitra, Business } = require('../config/index');
const { encrypt } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const baseUrl = '/mitra'

let token = ''
let MitraId = ''
let businessId = ''
let tokenSalah = generateToken({id: 'response._id'});

let businessData = {
    "business_name" : "ternak bebek3",
    "business_type":"Konveksi",
    "location" : {
        "lat":"8913723129394",
        "long":"83723842348392z",
        "address":"jl.ciptomangunkusumo"
    },
    "business_unit" : 200,
    "value_per_unit" : 2000000,
    "business_value" : 50000000,
    "persentase_value": 0.017,
    "business_description" : "lorem insum skadjsalkdjlasjldjasjd",
    "image_360" : "httpgs://modalin-a9fea.appspot.com/mitra/business/42697ea8-e4a1-4bd8-a6ce-643d6e7654f3.jpg",
    "total_profit": 0,
    "periode": 1,
    "status" : ""
}

let mitraData = {
    "name":"cv.mitracoba5",
    "email": "mitra11@mail.com",
    "password": "123",
    "address": "jl.ciptomangunkusumo",
    "photo_profile" : "http://imgurl/skadjjas/slakdj",
    "phone":"08525024443",
    "document":{
        "KTP" : {
            "url" : "http://imgurl/skakals/saks",
            "no_KTP" : "65829202930384"
        },
        "KTA":{
        "kta" : "http://file.pdf",
        "total_employee" : 20
        },
        "NPWP":{
            "url" : "http://imgurl/skakals/saks",
            "no_NPWP" : "65829202930384"
        },
        "SIUP":{
            "url" : "http://file.pdf",
            "no_SIUP" : "65829202930384"
        }
    }
}

beforeAll((done) => {
    Mitra.create({
        "name":"cv.mitracoba5",
        "email": "mitra11@mail.com",
        "password": encrypt("123"),
        "address": "jl.ciptomangunkusumo",
        "photo_profile" : "http://imgurl/skadjjas/slakdj",
        "phone":"08525024443",
        "document":{
            "KTP" : {
                "url" : "http://imgurl/skakals/saks",
                "no_KTP" : "65829202930384"
            },
            "KTA":{
            "kta" : "http://file.pdf",
            "total_employee" : 20
            },
            "NPWP":{
                "url" : "http://imgurl/skakals/saks",
                "no_NPWP" : "65829202930384"
            },
            "SIUP":{
                "url" : "http://file.pdf",
                "no_SIUP" : "65829202930384"
            }
        }
  })
      .then(response => {
        token = generateToken({id: response._id})
        MitraId = response._id;
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
                done()
            })
            .catch(err => {
            }) 
      })
      .catch(err => {
          done(err)
      })
  
    //Sign In
    describe('success login Mitra', () => {
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
                      token = response.token;
                      expect(response.status).toBe(200)
                      return done()
                  }
              })
      })
    })
  })

describe('mitra services', () => {

    // const token = 'token'

    describe('success cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return success message and status 201 with token', (done) => {
                request(app)    
                .post('/mitra/bussiness')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(201)
                        return done()
                    }
                })

            })
        })

        describe('GET /mitra/bussiness', ()=>{
            test('should return all bussines data and status 200', (done) => {
                request(app)    
                .get('/mitra/bussiness')
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(201)
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 201 with token', (done) => {
                request(app)    
                .put('/mitra/bussiness/1')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(2011)
                        return done()
                    }
                })

            })
        })

        describe('DELETE /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 201 with token', (done) => {
                request(app)    
                .put('/mitra/bussiness/1')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(200)
                        return done()
                    }
                })

            })
        })

        
    })

    describe('failed cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return error message and status 404 with', (done) => {
                request(app)    
                .post('/mitra/bussiness')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {
                        expect(404)
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 404', (done) => {
                request(app)    
                .put('/mitra/bussiness/1')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(404)
                        return done()
                    }
                })

            })
        })

        describe('DELETE /mitra/bussiness/:id', ()=>{
            test('should return failed delete and status 404', (done) => {
                request(app)    
                .put('/mitra/bussiness')
                .set('token', token)
                .send(businessData)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(404)
                        return done()
                    }
                })
            })
        })        
    })

    describe('Success Services', () => {
        test('should success show mitra by id', (done) => {
            request(app)    
            .get('/mitra/' + MitraId)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(200)
                    return done()
                }
            })
        })

        test('should success create a business', (done) => {
            request(app)    
            .post('/mitra/business')
            .set('token', token)
            .send(businessData)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(201)
                    return done()
                }
            })
        })

        test('should success show business by auth', (done) => {
            request(app)    
            .get('/mitra/business' + MitraId)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(200)
                    return done()
                }
            })
        })

        test('should success show all business', (done) => {
            request(app)    
            .get('/mitra/business')
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(200)
                    return done()
                }
            })
        })

        test('should success update a business', (done) => {
            request(app)    
            .put('/mitra/business/' + MitraId)
            .send({ ...businessData, "business_name" : "ternak manusia"})
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(201)
                    return done()
                }
            })
        })

        test('should success update profit', (done) => {
            request(app)    
            .put('/mitra/business/profit/' + businessId)
            .send({ profit: 27000000 })
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(200)
                    return done()
                }
            })
        })

        test('should success create report', (done) => {
            request(app)    
            .put('/mitra/report/' + businessId)
            .send({ report: 27000000 })
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(200)
                    return done()
                }
            })
        })
    })

    describe('Failed Services', () => {
        test(`should return message "Sorry we don't recognize you"`, (done) => {
            request(app)    
            .post('/mitra/business')
            .set('token', tokenSalah)
            .send(businessData)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    expect(response.status).toBe(401)
                    return done()
                }
            })
        })

        test(`should return message "is not a valid email!"`, async (done) => {
            let invaliduser = new Mitra({...mitraData, email: 'ada'});
            try {
                await invaliduser.validate();
            } catch (error) {
                expect(error).not.toBeNull();
                done();
            }
            // request(app)    
            // .post('/mitra/signup')
            // .send({ ...mitraData, email: 'ada'})
            // .end((err, response) => {
            //     console.log(res.text)
            //     if (err) {
            //         expect(401);
            //         return done(err)
            //     } else {
            //         expect(res.status).toBe(401);
            //         return done()
            //     }
            // })
        })
    })    
})

afterAll((done) => {
    Mitra.deleteMany({})
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