'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const call = require('supertest');
const app = require('../index');

describe('Unit testing /home route', () => {
  it('should return OK status', () => {
    return call(app)
      .get('/')
      .then(response => {
        assert.strictEqual(response.status, 200);
      });
  });

  // it('should return message in response', () => {
  //   return call(app)
  //     .get('/home')
  //     .then(response => {
  //       expect(response.body.msg).to.contain('revres!');
  //     });
  // });
});
