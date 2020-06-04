const app = require('../app');
const request = require('supertest');
const { Investor, Mitra } = require('../config/index');
const { encrypt } = require('../helpers/bcrypt');

const dummyInvestor = {
    name: 'qwoqwo1',
    email: 'mail12@mail.com',
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

const dummyMitra = {
    name: 'mitra',
    email: 'mitrasehati@mail.com',
    password: 'qweqwe',
    address: 'Jl.Petani No.20, Cempaka Warna, Jakarta Pusat',
    photo_profile: 'petani.jpg',
    phone: '0812888999220',
    document: {
        KTP: {
            url: 'ktp.jpg',
            no_KTP: '0192381029381038109'
        },
        KTA: {
            kta: 'ini_kta.pdf',
            total_employee: '10'
        },
        NPWP: {
            url: 'npwp.jpg',
            no_NPWP: '1983109381038898'
        },
        SIUP: {
            url: 'siup.jpg',
            no_SIUP: '19831093810381098'
        }
    }
    
}

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
        .then(_ => {
            return Mitra.create({
                name: 'mitra',
                email: 'mitrasehati@mail.com',
                password: encrypt('qweqwe'),
                address: 'Jl.Petani No.20, Cempaka Warna, Jakarta Pusat',
                photo_profile: 'petani.jpg',
                phone: '0812888999220',
                document: {
                    KTP: {
                        url: 'ktp.jpg',
                        no_KTP: '0192381029381038109'
                    },
                    KTA: {
                        kta: 'ini_kta.pdf',
                        total_employee: '10'
                    },
                    NPWP: {
                        url: 'npwp.jpg',
                        no_NPWP: '1983109381038898'
                    },
                    SIUP: {
                        url: 'siup.jpg',
                        no_SIUP: '19831093810381098'
                    }
                }
            })
        })
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    Investor.deleteMany({})
        .then(() => {
            console.log('DB clean up')
            return Mitra.deleteMany({})
        })
        .then(() => {
            console.log('DB clean up')
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('Investor service', () => {
    describe('POST /investor/signup', () => {
        describe('success register investor', () => {
            test('should return obj with status 201', done => {
                const investorInput = {
                    name: 'qwoqwo1',
                    email: 'mail2@mail.com',
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
                        },
                        SIUP: {
                            url: 'siup.jpg',
                            no_SIUP: '19831093810381098'
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
                request(app)
                    .post('/investor/signup')
                    .send(investorInput)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            // expect(response.body).toHaveProperty('name', investorInput.name)
                            // expect(response.body).toHaveProperty('email', investorInput.email)
                            // expect(response.body).toHaveProperty('address', investorInput.address)
                            // expect(response.body).toHaveProperty('photo_profile', investorInput.photo_profile)
                            // expect(response.body).not.toHaveProperty('password')
                            // expect(response.body).toHaveProperty('job', investorInput.job)
                            // expect(response.body).toHaveProperty('phone', expect.any(Number))
                            // expect(response.body).toHaveProperty('document', expect.any(Object))
                            // expect(response.body).toHaveProperty('wallet', expect.any(Object))
                            return done()
                        }
                    })
            })
        })
        // describe('error register investor', () => {
        //     test('should return error with status 400 because missing email validation', (done) => {
        //         const investorInput = {
        //             name: 'qwoqwo1',
        //             email: 'mail2asdasd',
        //             password: encrypt('qweqwe'),
        //             phone: '09989898938',
        //             document: {
        //                 KTP: '1200123123123',
        //                 NPWP: '123123123123'
        //             },
        //             wallet: {
        //                 usaha: "tani"
        //             }
        //         }
        //         request(app)
        //             .post('/investor/signup')
        //             .send(investorInput)
        //             .end((err, response) => {
        //                 if (err) {
        //                     return done(err)
        //                 } else {
        //                     expect(response.status).toBe(400)
        //                     expect(response.body).toHaveProperty('error')
        //                     return done()
        //                 }
        //             })
        //     })
        //     test('should return error with status 400 because missing validation', (done) => {
        //         const investorInput = {
        //             password: encrypt('qweqwe'),
        //             document: {
        //                 KTP: '1200123123123',
        //                 NPWP: '123123123123'
        //             },
        //             wallet: {
        //                 usaha: "tani"
        //             }
        //         }
        //         request(app)
        //             .post('/investor/signup')
        //             .send(investorInput)
        //             .end((err, response) => {
        //                 if (err) {
        //                     return done(err)
        //                 } else {
        //                     expect(response.status).toBe(400)
        //                     return done()
        //                 }
        //             })
        //     })
        // })
    })
    describe('POST /investor/signin', () => {
        describe('success login investor', () => {
            test('should return token with status 200', done => {
                request(app)
                    .post('/investor/signin')
                    .send({
                        email: dummyInvestor.email,
                        password: dummyInvestor.password
                    })
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            // expect(response.body).toHaveProperty('token', expect.any(String))
                            // return done()
                        }
                    })
            })
        })
        describe('error login investor', () => {
            test('should return error status 404 because User not found', done => {
                const loginInvestor = {
                    email: 'mail123@mail.com',
                    password: 'qweqwe'
                }
                request(app)
                    .post('/investor/signin')
                    .send(loginInvestor)
                    .end((err, response) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(response.status).toBe(404)
                            // expect(response.body).toHaveProperty('message', 'Investor not found')
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because invalid input password', done => {
                const loginInvestor = {
                    email: 'mail12@mail.com',
                    password: 'qweqwe2',
                }
                request(app)
                .post('/investor/signin')
                .send(loginInvestor)
                .end((err, response) => {
                    if (err) {
                        done(err)
                    } else {
                        expect(response.status).toBe(400)
                        // expect(response.body).toHaveProperty('message', 'Invalid Input')
                        return done()
                    }
                })
            })
        })
    })
})
describe('Mitra service', () => {
    describe('POST /mitra/signup', () => {
        describe('success register mitra', () => {
            test('should return obj with status 201', done => {
                const mitraInput = {
                    name: 'mitra',
                    email: 'mitra@mail.com',
                    password: encrypt('qweqwe'),
                    address: 'Jl.Petani No.20, Cempaka Warna, Jakarta Pusat',
                    photo_profile: 'petani.jpg',
                    phone: '0812888999220',
                    document: {
                        KTP: {
                            url: 'ktp.jpg',
                            no_KTP: '0192381029381038109'
                        },
                        KTA: {
                            kta: 'ini_kta.pdf',
                            total_employee: '10'
                        },
                        NPWP: {
                            url: 'npwp.jpg',
                            no_NPWP: '1983109381038898'
                        },
                        SIUP: {
                            url: 'siup.jpg',
                            no_SIUP: '19831093810381098'
                        }
                    }
                }
                request(app)
                    .post('/mitra/signup')
                    .send(mitraInput)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            // expect(response.body).toHaveProperty('name', mitraInput.name)
                            // expect(response.body).toHaveProperty('email', mitraInput.email)
                            // expect(response.body).toHaveProperty('address', mitraInput.address)
                            // expect(response.body).toHaveProperty('photo_profile', mitraInput.photo_profile)
                            // expect(response.body).not.toHaveProperty('password')
                            // expect(response.body).toHaveProperty('phone', expect.any(Number))
                            // expect(response.body).toHaveProperty('document', expect.any(Object))
                            // expect(response.body).toHaveProperty('business', expect.any(Array))
                            return done()
                        }
                    })
            })
        })
        // describe('error register mitra', () => {
        //     test('should return error with status 400 because missing email validation', (done) => {
        //         const mitraInput = {
        //             name: 'mitra',
        //             email: 'mitramail.com',
        //             password: encrypt('qweqwe'),
        //             document: {
        //                 KTP: '0192381029381038109',
        //                 KTA: '0192381029379738109',
        //                 NPWP: '1983109381038898',
        //                 SIUP: '19831093810381098'
        //             },
        //             business: [
        //                 { name: 'tani' },
        //                 { name: 'dagang' }
        //             ]
        //         }
        //         request(app)
        //             .post('/mitra/signup')
        //             .send(mitraInput)
        //             .end((err, response) => {
        //                 if (err) {
        //                     return done(err)
        //                 } else {
        //                     expect(response.status).toBe(400)
        //                     expect(response.body).toHaveProperty('error')
        //                     return done()
        //                 }
        //             })
        //     })
        //     test('should return error with status 400 because missing validation', (done) => {
        //         const mitraInput = {
        //             password: encrypt('qweqwe'),
        //             document: {
        //                 KTP: '1200123123123',
        //                 NPWP: '123123123123'
        //             },
        //             wallet: {
        //                 usaha: "tani"
        //             }
        //         }
        //         request(app)
        //             .post('/mitra/signup')
        //             .send(mitraInput)
        //             .end((err, response) => {
        //                 if (err) {
        //                     return done(err)
        //                 } else {
        //                     expect(response.status).toBe(400)
        //                     return done()
        //                 }
        //             })
        //     })
        // })
    })
    describe('POST /mitra/signin', () => {
        describe('success login mitra', () => {
            test('should return token with status 200', done => {
                request(app)
                    .post('/mitra/signin')
                    .send({
                        email: dummyMitra.email,
                        password: dummyMitra.password
                    })
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('token', expect.any(String))
                            return done()
                        }
                    })
            })
        })
        describe('error login mitra', () => {
            test('should return error status 404 because User not found', done => {
                const loginMitra = {
                    email: 'mitra2@mail.com',
                    password: 'qweqwe'
                }
                request(app)
                    .post('/mitra/signin')
                    .send(loginMitra)
                    .end((err, response) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('message', 'Mitra not found')
                            return done()
                        }
                    })
            })
            test('should return error with status 400 because invalid input password', done => {
                const loginMitra = {
                    email: 'mitrasehati@mail.com',
                    password: 'qweqwe2'
                }
                request(app)
                .post('/mitra/signin')
                .send(loginMitra)
                .end((err, response) => {
                    if (err) {
                        done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'Invalid Input')
                        return done()
                    }
                })
            })
        })
    })
})
