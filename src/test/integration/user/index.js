const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const endpoint = supertest('http://localhost:3000/api/user'); 

describe('User ROUTE', function() {
	it('should fail when sending empty mockCredentials', function(done) {
		endpoint
			.post('/login')
			.send({})
			.set('Accept', 'application/json')
			.expect(500)
			.end(function(err, res){
				if(err) return done(err);

				done();
			});
	});

	it('should fail authentification if no token is supplied', function(done) {
		endpoint
			.post('/auth')
			.set('Accept', 'application/json')
			.expect(500)
			.end(function(err, res){
				if(err) return done(err);

				done();
			});
	});

	it('should fail authentification if invalid token is supplied', function(done) {
		endpoint
			.post('/auth')
			.set({jwt: 'not-a-valid-token', Accept: 'application/json'})
			.expect(500)
			.end(function(err, res){
				if(err) return done(err);

				done();
			});
	});


	// Testing credentials
	const mockCredentials = { 
		username: getRandomString(10),
		password: getRandomString(10) 
	};

	it('should register user, log him him then authenticate him', function(done){
		// Increase timeout, this may take more than 2000 ms
		this.timeout(5000);

		// Registration part
		endpoint
			.post('/register')
			.send(mockCredentials)
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.error, 'there should be no error');
				assert.isObject(res.body.data, 'data should be an object');
				assert.isString(res.body.data.token, 'data.token should be a string');

				// Login Part
				endpoint
					.post('/login')
					.send(mockCredentials)
					.set('Accept', 'application/json')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);

						assert.isObject(res.body, 'response should be an object');
						assert.isNull(res.body.error, 'there should be no error');
						assert.isObject(res.body.data, 'data should be an object');
						assert.isString(res.body.data.token, 'data.token should be a string');

						// Authentication part
						const token = res.body.data.token;
						endpoint
							.post('/auth')
							.set({jwt: token, Accept: 'application/json'})
							.expect(200)
							.end(function(err, res){
								if(err) return done(err);

								assert.isNull(res.body.error, 'there should be no error');
								assert.isObject(res.body.data, 'data should be an object');
								assert.isObject(res.body.data.user, 'user should be an object');
								done();
							});
					});
			});
	});
});


function getRandomString(length) {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var text = "";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
		
  return text;
}