const app = require('../app')
const request = require('supertest')


describe('mitra services', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDJjMDQ3Njk3OWY5MzY3OGVhNWRjYiIsImlhdCI6MTU5MDg3MDI1NH0.ULskTJ1fuLcZ7Q66YicgWmO6jYgGyNvJ9N0JlsJy-5w'
    const baseUrl = 'http://localhost:3000/mitra/bussiness';
    const data = {
        mitra: 'sdkasdj30',
        investor : [],
        bussiness_name : "CV.mitra bersama",
        bussiness_type : "tekstil",
        location : {
            address : "jln karet sawah, no 1, Jakarta selatan",
            lat: "012303040304",
            long: "0032040343z"
        },
        bussiness_unit : 10,
        value_per_unit: 10000000,
        bussines_unit: 10,
        value_per_unit: 12,
        bussines_value: 30,
        persentase_value: 12,
        business_description: 'klsadljsaldj',
        images_360 : "https://imgurl/djdjf/kdjf",
        status: "",
        total_profit: 20000,
        periode: 2,
        profit_times: 3
    }

    describe('success cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return success message and status 201 with token', (done) => {
                request(app)    
                .post(baseUrl)
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
                .get(baseUrl)
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 201 with token', (done) => {
                request(app)    
                .put(baseUrl + '1')
                .set('token', token)
                .send(data)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(200)
                        return done()
                    }
                })

            })
        })

        // describe('DELETE /mitra/bussiness/:id', ()=>{
        //     test('should return success edit and status 200 with token', (done) => {
        //         request(app)    
        //         .put(baseUrl + '1')
        //         .set('token', token)
        //         .send(data)
        //         .end((err, response) => {
        //             if (err) {
        //                 return done(err)
        //             } else {
        //                 expect(response.status).toBe(200)
        //                 return done()
        //             }
        //         })

        //     })
        // })

        
    })

    describe('failed cases', ()=>{
        describe('POST /mitra/bussiness', ()=>{
            test('should return error message and status 404 with', (done) => {
                request(app)    
                .post(baseUrl)
                .set('token', token)
                .send(data)
                .end((err, response) => {

                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(404)
                        return done()
                    }
                })

            })
        })

        describe('PUT /mitra/bussiness/:id', ()=>{
            test('should return success edit and status 404', (done) => {
                 request(app)    
                .put(baseUrl + '1')
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
                .put(baseUrl + '1')
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