'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cm = mongoose.model('Cm'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  cm;

/**
 * Cm routes tests
 */
describe('Cm CRUD tests', function () {

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

    // Save a user to the test db and create new Cm
    user.save(function () {
      cm = {
        name: 'Cm name'
      };

      done();
    });
  });

  it('should be able to save a Cm if logged in', function (done) {
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

        // Save a new Cm
        agent.post('/api/cms')
          .send(cm)
          .expect(200)
          .end(function (cmSaveErr, cmSaveRes) {
            // Handle Cm save error
            if (cmSaveErr) {
              return done(cmSaveErr);
            }

            // Get a list of Cms
            agent.get('/api/cms')
              .end(function (cmsGetErr, cmsGetRes) {
                // Handle Cms save error
                if (cmsGetErr) {
                  return done(cmsGetErr);
                }

                // Get Cms list
                var cms = cmsGetRes.body;

                // Set assertions
                (cms[0].user._id).should.equal(userId);
                (cms[0].name).should.match('Cm name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cm if not logged in', function (done) {
    agent.post('/api/cms')
      .send(cm)
      .expect(403)
      .end(function (cmSaveErr, cmSaveRes) {
        // Call the assertion callback
        done(cmSaveErr);
      });
  });

  it('should not be able to save an Cm if no name is provided', function (done) {
    // Invalidate name field
    cm.name = '';

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

        // Save a new Cm
        agent.post('/api/cms')
          .send(cm)
          .expect(400)
          .end(function (cmSaveErr, cmSaveRes) {
            // Set message assertion
            (cmSaveRes.body.message).should.match('Please fill Cm name');

            // Handle Cm save error
            done(cmSaveErr);
          });
      });
  });

  it('should be able to update an Cm if signed in', function (done) {
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

        // Save a new Cm
        agent.post('/api/cms')
          .send(cm)
          .expect(200)
          .end(function (cmSaveErr, cmSaveRes) {
            // Handle Cm save error
            if (cmSaveErr) {
              return done(cmSaveErr);
            }

            // Update Cm name
            cm.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cm
            agent.put('/api/cms/' + cmSaveRes.body._id)
              .send(cm)
              .expect(200)
              .end(function (cmUpdateErr, cmUpdateRes) {
                // Handle Cm update error
                if (cmUpdateErr) {
                  return done(cmUpdateErr);
                }

                // Set assertions
                (cmUpdateRes.body._id).should.equal(cmSaveRes.body._id);
                (cmUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cms if not signed in', function (done) {
    // Create new Cm model instance
    var cmObj = new Cm(cm);

    // Save the cm
    cmObj.save(function () {
      // Request Cms
      request(app).get('/api/cms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cm if not signed in', function (done) {
    // Create new Cm model instance
    var cmObj = new Cm(cm);

    // Save the Cm
    cmObj.save(function () {
      request(app).get('/api/cms/' + cmObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', cm.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cm with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cm is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cm which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cm
    request(app).get('/api/cms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cm with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cm if signed in', function (done) {
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

        // Save a new Cm
        agent.post('/api/cms')
          .send(cm)
          .expect(200)
          .end(function (cmSaveErr, cmSaveRes) {
            // Handle Cm save error
            if (cmSaveErr) {
              return done(cmSaveErr);
            }

            // Delete an existing Cm
            agent.delete('/api/cms/' + cmSaveRes.body._id)
              .send(cm)
              .expect(200)
              .end(function (cmDeleteErr, cmDeleteRes) {
                // Handle cm error error
                if (cmDeleteErr) {
                  return done(cmDeleteErr);
                }

                // Set assertions
                (cmDeleteRes.body._id).should.equal(cmSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cm if not signed in', function (done) {
    // Set Cm user
    cm.user = user;

    // Create new Cm model instance
    var cmObj = new Cm(cm);

    // Save the Cm
    cmObj.save(function () {
      // Try deleting Cm
      request(app).delete('/api/cms/' + cmObj._id)
        .expect(403)
        .end(function (cmDeleteErr, cmDeleteRes) {
          // Set message assertion
          (cmDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cm error error
          done(cmDeleteErr);
        });

    });
  });

  it('should be able to get a single Cm that has an orphaned user reference', function (done) {
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

          // Save a new Cm
          agent.post('/api/cms')
            .send(cm)
            .expect(200)
            .end(function (cmSaveErr, cmSaveRes) {
              // Handle Cm save error
              if (cmSaveErr) {
                return done(cmSaveErr);
              }

              // Set assertions on new Cm
              (cmSaveRes.body.name).should.equal(cm.name);
              should.exist(cmSaveRes.body.user);
              should.equal(cmSaveRes.body.user._id, orphanId);

              // force the Cm to have an orphaned user reference
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

                    // Get the Cm
                    agent.get('/api/cms/' + cmSaveRes.body._id)
                      .expect(200)
                      .end(function (cmInfoErr, cmInfoRes) {
                        // Handle Cm error
                        if (cmInfoErr) {
                          return done(cmInfoErr);
                        }

                        // Set assertions
                        (cmInfoRes.body._id).should.equal(cmSaveRes.body._id);
                        (cmInfoRes.body.name).should.equal(cm.name);
                        should.equal(cmInfoRes.body.user, undefined);

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
      Cm.remove().exec(done);
    });
  });
});
