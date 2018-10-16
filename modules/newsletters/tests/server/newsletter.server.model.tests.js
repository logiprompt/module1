'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Newsletter = mongoose.model('Newsletter');

/**
 * Globals
 */
var user,
  newsletter;

/**
 * Unit tests
 */
describe('Newsletter Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      newsletter = new Newsletter({
        name: 'Newsletter Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return newsletter.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      newsletter.name = '';

      return newsletter.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Newsletter.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
