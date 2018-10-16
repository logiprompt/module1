'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Newsletter = mongoose.model('Newsletter'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  newsletter;

/**
 * Newsletter routes tests
 */
describe('Newsletter CRUD tests', function () {

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

    // Save a user to the test db and create new Newsletter
    user.save(function () {
      newsletter = {
        name: 'Newsletter name'
      };

      done();
    });
  });

  it('should be able to save a Newsletter if logged in', function (done) {
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

        // Save a new Newsletter
        agent.post('/api/newsletters')
          .send(newsletter)
          .expect(200)
          .end(function (newsletterSaveErr, newsletterSaveRes) {
            // Handle Newsletter save error
            if (newsletterSaveErr) {
              return done(newsletterSaveErr);
            }

            // Get a list of Newsletters
            agent.get('/api/newsletters')
              .end(function (newslettersGetErr, newslettersGetRes) {
                // Handle Newsletters save error
                if (newslettersGetErr) {
                  return done(newslettersGetErr);
                }

                // Get Newsletters list
                var newsletters = newslettersGetRes.body;

                // Set assertions
                (newsletters[0].user._id).should.equal(userId);
                (newsletters[0].name).should.match('Newsletter name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Newsletter if not logged in', function (done) {
    agent.post('/api/newsletters')
      .send(newsletter)
      .expect(403)
      .end(function (newsletterSaveErr, newsletterSaveRes) {
        // Call the assertion callback
        done(newsletterSaveErr);
      });
  });

  it('should not be able to save an Newsletter if no name is provided', function (done) {
    // Invalidate name field
    newsletter.name = '';

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

        // Save a new Newsletter
        agent.post('/api/newsletters')
          .send(newsletter)
          .expect(400)
          .end(function (newsletterSaveErr, newsletterSaveRes) {
            // Set message assertion
            (newsletterSaveRes.body.message).should.match('Please fill Newsletter name');

            // Handle Newsletter save error
            done(newsletterSaveErr);
          });
      });
  });

  it('should be able to update an Newsletter if signed in', function (done) {
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

        // Save a new Newsletter
        agent.post('/api/newsletters')
          .send(newsletter)
          .expect(200)
          .end(function (newsletterSaveErr, newsletterSaveRes) {
            // Handle Newsletter save error
            if (newsletterSaveErr) {
              return done(newsletterSaveErr);
            }

            // Update Newsletter name
            newsletter.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Newsletter
            agent.put('/api/newsletters/' + newsletterSaveRes.body._id)
              .send(newsletter)
              .expect(200)
              .end(function (newsletterUpdateErr, newsletterUpdateRes) {
                // Handle Newsletter update error
                if (newsletterUpdateErr) {
                  return done(newsletterUpdateErr);
                }

                // Set assertions
                (newsletterUpdateRes.body._id).should.equal(newsletterSaveRes.body._id);
                (newsletterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Newsletters if not signed in', function (done) {
    // Create new Newsletter model instance
    var newsletterObj = new Newsletter(newsletter);

    // Save the newsletter
    newsletterObj.save(function () {
      // Request Newsletters
      request(app).get('/api/newsletters')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Newsletter if not signed in', function (done) {
    // Create new Newsletter model instance
    var newsletterObj = new Newsletter(newsletter);

    // Save the Newsletter
    newsletterObj.save(function () {
      request(app).get('/api/newsletters/' + newsletterObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', newsletter.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Newsletter with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/newsletters/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Newsletter is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Newsletter which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Newsletter
    request(app).get('/api/newsletters/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Newsletter with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Newsletter if signed in', function (done) {
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

        // Save a new Newsletter
        agent.post('/api/newsletters')
          .send(newsletter)
          .expect(200)
          .end(function (newsletterSaveErr, newsletterSaveRes) {
            // Handle Newsletter save error
            if (newsletterSaveErr) {
              return done(newsletterSaveErr);
            }

            // Delete an existing Newsletter
            agent.delete('/api/newsletters/' + newsletterSaveRes.body._id)
              .send(newsletter)
              .expect(200)
              .end(function (newsletterDeleteErr, newsletterDeleteRes) {
                // Handle newsletter error error
                if (newsletterDeleteErr) {
                  return done(newsletterDeleteErr);
                }

                // Set assertions
                (newsletterDeleteRes.body._id).should.equal(newsletterSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Newsletter if not signed in', function (done) {
    // Set Newsletter user
    newsletter.user = user;

    // Create new Newsletter model instance
    var newsletterObj = new Newsletter(newsletter);

    // Save the Newsletter
    newsletterObj.save(function () {
      // Try deleting Newsletter
      request(app).delete('/api/newsletters/' + newsletterObj._id)
        .expect(403)
        .end(function (newsletterDeleteErr, newsletterDeleteRes) {
          // Set message assertion
          (newsletterDeleteRes.body.message).should.match('User is not authorized');

          // Handle Newsletter error error
          done(newsletterDeleteErr);
        });

    });
  });

  it('should be able to get a single Newsletter that has an orphaned user reference', function (done) {
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

          // Save a new Newsletter
          agent.post('/api/newsletters')
            .send(newsletter)
            .expect(200)
            .end(function (newsletterSaveErr, newsletterSaveRes) {
              // Handle Newsletter save error
              if (newsletterSaveErr) {
                return done(newsletterSaveErr);
              }

              // Set assertions on new Newsletter
              (newsletterSaveRes.body.name).should.equal(newsletter.name);
              should.exist(newsletterSaveRes.body.user);
              should.equal(newsletterSaveRes.body.user._id, orphanId);

              // force the Newsletter to have an orphaned user reference
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

                    // Get the Newsletter
                    agent.get('/api/newsletters/' + newsletterSaveRes.body._id)
                      .expect(200)
                      .end(function (newsletterInfoErr, newsletterInfoRes) {
                        // Handle Newsletter error
                        if (newsletterInfoErr) {
                          return done(newsletterInfoErr);
                        }

                        // Set assertions
                        (newsletterInfoRes.body._id).should.equal(newsletterSaveRes.body._id);
                        (newsletterInfoRes.body.name).should.equal(newsletter.name);
                        should.equal(newsletterInfoRes.body.user, undefined);

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
      Newsletter.remove().exec(done);
    });
  });
});
