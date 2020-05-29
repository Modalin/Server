
const app = require('../app')
const request = require('supertest')




describe('mitra services', () => {

    const token = 'token'

    describe('success cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return success message and status 201 with token', (done) => {
                const data = {
                    name : "CV.mitra bersama",
                    bussiness_type : "tekstil",
                    location : {
                        address : "jln karet sawah, no 1, Jakarta selatan",
                        lat: "012303040304",
                        long: "0032040343z"
                    },
                    image : "https://imgurl/djdjf/kdjf",
                    status: "tersedia",
                    unit: 300,
                }
                request(app)    
                .post('/mitra/bussiness')
                .set('token', token)
                .send(data)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('message', 'Success create bussiness')
                        return done()
                    }
                })

            })
        })

        describe('GET /mitra/bussiness', ()=>{
            test('should return all bussines data and status 200', (done) => {
                request(app)    
                .get('/mitra/bussiness')
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('data')
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 201 with token', (done) => {
                const data = {
                    name : "CV.mitra bersama",
                    bussiness_type : "tekstil",
                    location : {
                        address : "jln karet sawah, no 1, Jakarta selatan",
                        lat: "012303040304",
                        long: "0032040343z"
                    },
                    image : "https://imgurl/djdjf/kdjf",
                    status: "tersedia",
                    unit: 300,
                }
                request(app)    
                .put('/mitra/bussiness/1')
                .set('token', token)
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('message', 'Success edit bussiness')
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
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('message', 'Success edit bussiness')
                        return done()
                    }
                })

            })
        })

        
    })

    describe('failed cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return error message and status 404 with', (done) => {

                const data = {
                    name : "",
                    bussiness_type : "",
                    location : {
                        address : "jln karet sawah, no 1, Jakarta selatan",
                        lat: "012303040304",
                        long: "0032040343z"
                    },
                    image : "https://imgurl/djdjf/kdjf",
                    status: "tersedia",
                    unit: 300,
                }

                request(app)    
                .post('/mitra/bussiness')
                .set('token', token)
                .send(data)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('message', 'bad request')
                        expect(response.body).toHaveProperty('errors')
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 404', (done) => {
                const data = {
                    name : "",
                    bussiness_type : "",
                    location : {
                        address : "jln karet sawah, no 1, Jakarta selatan",
                        lat: "012303040304",
                        long: "0032040343z"
                    },
                    image : "https://imgurl/djdjf/kdjf",
                    status: "tersedia",
                    unit: 300,
                }
                request(app)    
                .put('/mitra/bussiness/1')
                .set('token', token)
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('message', 'bad request')
                        expect(response.body).toHaveProperty('errors')
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
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('message', 'bad request')
                        expect(response.body).toHaveProperty('errors')
                        return done()
                    }
                })

            })
        })

        
    })

})
