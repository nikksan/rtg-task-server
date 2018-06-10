const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const endpoint = supertest('http://localhost:3000/api/upload'); 
const token  = require('../config').token; 

describe('Upload ROUTE', function() {
	it('should fail to upload an invalid image', function(done) {
		endpoint
			.post('/image')
			.set('Connection', 'keep alive')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Accept', 'application/json')
			.set('jwt', token)
			.attach('image', __dirname  + '/invalid-image.png')
			.expect(500)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.data, 'data should be null');
				assert.isString(res.body.error, 'error should be a string');

				done();
			});
	});

	it('should succesfully upload an image', function(done) {
		endpoint
			.post('/image')
			.set('Connection', 'keep alive')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Accept', 'application/json')
			.set('jwt', token)
			.attach('image', __dirname  + '/valid-image.png')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.error, 'there should be no error');
				assert.isObject(res.body.data, 'data should be an object');
				assert.isString(res.body.data.image, 'data should be an object');
				
				done();
			});
	});
});

