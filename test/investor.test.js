const app = require('../app');
const request = require('supertest');

describe('Investor service', () => {
  const investorprofile = {
    name: 'investor 1',
    email: 'investor1@mail.com',
    password: '123'
  }
  const investorId = '/1';
  const baseUrl = '/investor';
  const token = 'token';

  describe('Success services', () => {
    describe('Success edit profile', () => {
      test('should return new investor profile', () => {
        request(app)
          .patch(baseUrl + investorId)
          .set('token', token)
          .send({ name: 'investor berhasil'})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200, investorprofile);
            return done();
          })
      })
    })
  
    describe('Success delete profile', () => {
      test('should return message "Success deleted profile"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .set('token', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200);
            expect({ message: 'Success deleted profile'});
            return done();
          })
      })
    })
  
    describe('Success fetch wallet', () => {
      test('should return wallet data', () => {
        request(app)
          .get(baseUrl + '/wallet' + investorId)
          .set('token', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200);
            expect(res.body).toHaveProperty('income');
            return done();
          })
      })
    })

    describe('Success fetch wallet', () => {
      test('should return wallet data', () => {
        request(app)
          .get(baseUrl + '/wallet' + investorId)
          .set('token', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200);
            expect(res.body).toHaveProperty('income');
            expect(res.body).toHaveProperty('saldo');
            return done();
          })
      })
    })

    describe('Success edit wallet', () => {
      const wallet = {
        saldo: 500,
        income: 20
      }
      test('should return new wallet data', () => {
        request(app)
          .patch(baseUrl + '/wallet' + investorId)
          .set('token', token)
          .send(wallet)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200);
            expect(wallet);
            return done();
          })
      })
    })

    describe('Success delete wallet', () => {
      test('should return message "Success deleted wallet data"', () => {
        request(app)
          .delete(baseUrl + '/wallet' + investorId)
          .set('token', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(200);
            expect({ message: 'Success deleted wallet data' });
            return done();
          })
      })
    })
  })

  describe('Failed services', () => {
    describe('Failed because token does not exist', () => {
      describe('Failed edit profile', () => {
        test('should return message "Unauthorized"', () => {
          request(app)
            .patch(baseUrl + investorId)
            .send({ name: 'investor gagal'})
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(401);
              expect({ message: 'Unauthorized'});
              return done();
            })
        })
      })
    })

    describe('Failed delete profile', () => {
      test('should return message "Unauthorized"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(401);
            expect({ message: 'Unauthorized'});
            return done();
          })
      })
    })
  
    describe('Failed fetch wallet', () => {
      test('should return message "Unauthorized"', () => {
        request(app)
          .get(baseUrl + '/wallet' + investorId)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(401);
            expect({ message: 'Unauthorized'});
            return done();
          })
      })
    })

    describe('Failed fetch wallet', () => {
      test('should return message "Unauthorized"', () => {
        request(app)
          .get(baseUrl + '/wallet' + investorId)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(401);
            expect({ message: 'Unauthorized'});
            return done();
          })
      })
    })

    describe('Failed edit wallet', () => {
      const wallet = {
        saldo: 500,
        income: 20
      }
      test('should return message "Unauthorized"', () => {
        request(app)
          .patch(baseUrl + '/wallet' + investorId)
          .send(wallet)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(401);
            expect({ message: 'Unauthorized'});
            return done();
          })
      })
    })

    describe('Failed delete wallet', () => {
      test('should return message "Unauthorized"', () => {
        request(app)
          .delete(baseUrl + '/wallet' + investorId)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(401);
            expect({ message: 'Unauthorized'});
            return done();
          })
      })
    })
  })
  
  describe('Failed because validator', () => {
    describe('Failed edit profile', () => {
      test('should return message "Name cannot be empty"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ name: ''})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'Name cannot be empty'});
            return done();
          })
      })

      test('should return message "Email cannot be empty"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ email: ''})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'Email cannot be empty'});
            return done();
          })
      })

      test('should return message "is not a valid email!"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ email: 'aku'})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'is not a valid email!'});
            return done();
          })
      })

      test('should return message "Password cannot be empty"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ password: ''})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'Password cannot be empty'});
            return done();
          })
      })

      test('should return message "Password cannot be empty"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ password: ''})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'Password cannot be empty'});
            return done();
          })
      })

      test('should return message "is not a valid phone number!"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ phone: 'kosong1'})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'is not a valid phone number'});
            return done();
          })
      })

      test('should return message "Phone cannot be empty"', () => {
        request(app)
          .patch(baseUrl + investorId)
          .send({ phone: ''})
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'Phone cannot be empty'});
            return done();
          })
      })
    })
    describe('Failed edit wallet', () => {
      test('should return message "is not a valid account number"', () => {
        request(app)
          .patch(baseUrl + '/wallet' + investorId)
          .send({ wallet: { ...wallet, accountNumber: 'satu23' } })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'is not a valid account number'});
            return done();
          })
      })

      test('should return message "is not a valid saldo"', () => {
        request(app)
          .patch(baseUrl + '/wallet' + investorId)
          .send({ wallet: { ...wallet, saldo: 'satu23' } })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'is not a valid saldo'});
            return done();
          })
      })

      test('should return message "is not a valid income"', () => {
        request(app)
          .patch(baseUrl + '/wallet' + investorId)
          .send({ wallet: { ...wallet, income: 'satu23' } })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(400);
            expect({ message: 'is not a valid income'});
            return done();
          })
      })
    })
  })
})