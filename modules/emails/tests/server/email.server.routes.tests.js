'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Email = mongoose.model('Email'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  email;

/**
 * Email routes tests
 */
describe('Email CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Email
    user.save(function () {
      email = {
        name: 'Email name'
      };

      done();
    });
  });

  it('should be able to save a Email if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Email
        agent.post('/api/emails')
          .send(email)
          .expect(200)
          .end(function (emailSaveErr, emailSaveRes) {
            // Handle Email save error
            if (emailSaveErr) {
              return done(emailSaveErr);
            }

            // Get a list of Emails
            agent.get('/api/emails')
              .end(function (emailsGetErr, emailsGetRes) {
                // Handle Emails save error
                if (emailsGetErr) {
                  return done(emailsGetErr);
                }

                // Get Emails list
                var emails = emailsGetRes.body;

                // Set assertions
                (emails[0].user._id).should.equal(userId);
                (emails[0].name).should.match('Email name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Email if not logged in', function (done) {
    agent.post('/api/emails')
      .send(email)
      .expect(403)
      .end(function (emailSaveErr, emailSaveRes) {
        // Call the assertion callback
        done(emailSaveErr);
      });
  });

  it('should not be able to save an Email if no name is provided', function (done) {
    // Invalidate name field
    email.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Email
        agent.post('/api/emails')
          .send(email)
          .expect(400)
          .end(function (emailSaveErr, emailSaveRes) {
            // Set message assertion
            (emailSaveRes.body.message).should.match('Please fill Email name');

            // Handle Email save error
            done(emailSaveErr);
          });
      });
  });

  it('should be able to update an Email if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Email
        agent.post('/api/emails')
          .send(email)
          .expect(200)
          .end(function (emailSaveErr, emailSaveRes) {
            // Handle Email save error
            if (emailSaveErr) {
              return done(emailSaveErr);
            }

            // Update Email name
            email.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Email
            agent.put('/api/emails/' + emailSaveRes.body._id)
              .send(email)
              .expect(200)
              .end(function (emailUpdateErr, emailUpdateRes) {
                // Handle Email update error
                if (emailUpdateErr) {
                  return done(emailUpdateErr);
                }

                // Set assertions
                (emailUpdateRes.body._id).should.equal(emailSaveRes.body._id);
                (emailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Emails if not signed in', function (done) {
    // Create new Email model instance
    var emailObj = new Email(email);

    // Save the email
    emailObj.save(function () {
      // Request Emails
      request(app).get('/api/emails')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Email if not signed in', function (done) {
    // Create new Email model instance
    var emailObj = new Email(email);

    // Save the Email
    emailObj.save(function () {
      request(app).get('/api/emails/' + emailObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', email.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Email with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/emails/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Email is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Email which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Email
    request(app).get('/api/emails/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Email with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Email if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Email
        agent.post('/api/emails')
          .send(email)
          .expect(200)
          .end(function (emailSaveErr, emailSaveRes) {
            // Handle Email save error
            if (emailSaveErr) {
              return done(emailSaveErr);
            }

            // Delete an existing Email
            agent.delete('/api/emails/' + emailSaveRes.body._id)
              .send(email)
              .expect(200)
              .end(function (emailDeleteErr, emailDeleteRes) {
                // Handle email error error
                if (emailDeleteErr) {
                  return done(emailDeleteErr);
                }

                // Set assertions
                (emailDeleteRes.body._id).should.equal(emailSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Email if not signed in', function (done) {
    // Set Email user
    email.user = user;

    // Create new Email model instance
    var emailObj = new Email(email);

    // Save the Email
    emailObj.save(function () {
      // Try deleting Email
      request(app).delete('/api/emails/' + emailObj._id)
        .expect(403)
        .end(function (emailDeleteErr, emailDeleteRes) {
          // Set message assertion
          (emailDeleteRes.body.message).should.match('User is not authorized');

          // Handle Email error error
          done(emailDeleteErr);
        });

    });
  });

  it('should be able to get a single Email that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Email
          agent.post('/api/emails')
            .send(email)
            .expect(200)
            .end(function (emailSaveErr, emailSaveRes) {
              // Handle Email save error
              if (emailSaveErr) {
                return done(emailSaveErr);
              }

              // Set assertions on new Email
              (emailSaveRes.body.name).should.equal(email.name);
              should.exist(emailSaveRes.body.user);
              should.equal(emailSaveRes.body.user._id, orphanId);

              // force the Email to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Email
                    agent.get('/api/emails/' + emailSaveRes.body._id)
                      .expect(200)
                      .end(function (emailInfoErr, emailInfoRes) {
                        // Handle Email error
                        if (emailInfoErr) {
                          return done(emailInfoErr);
                        }

                        // Set assertions
                        (emailInfoRes.body._id).should.equal(emailSaveRes.body._id);
                        (emailInfoRes.body.name).should.equal(email.name);
                        should.equal(emailInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Email.remove().exec(done);
    });
  });
});
