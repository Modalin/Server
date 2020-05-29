// const app = require('../app')
const request = require('supertest')
const subs = require('../substract')


test('should substract 2 number', () => {
    expect(subs(3,2)).toBe(1)
})


