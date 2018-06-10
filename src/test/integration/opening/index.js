const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const endpoint = supertest('http://localhost:3000/api/openings'); 
const token  = require('../config').token; 

// Dummy data
let mockOpening = {
	title		: getRandomString(10),
	description : getRandomString(200)
}

describe('Opening ROUTE', function() {
	it('should list openings', function(done) {
		endpoint
			.get('/')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isArray(res.body.data, 'data should be an array');
				assert.isNull(res.body.error, 'error should be null');

				done();
			});
	});

	it('should create an opening, list it, edit it then delete it', function(done){
		// Create the opening
		endpoint
			.post('/')
			.set('Accept', 'application/json')
			.set('jwt', token)
			.send(mockOpening)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);



				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.error, 'error should be null');
				assert.isObject(res.body.data, 'data should be an object');
				assert.isNumber(res.body.data.id, 'id should be number');

				const opening_id = res.body.data.id;


				// List the opening
				endpoint
					.get('/' + opening_id)
					.set('Accept', 'application/json')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);

						assert.isObject(res.body, 'response should be an object');
						assert.isNull(res.body.error, 'error should be null');
						assert.isObject(res.body.data, 'data should be an object');
						
						// Modify the data
						mockOpening.title += '-edited';
						mockOpening.description += '-edited';

						// Edit the opening
						endpoint
							.put('/' + opening_id)
							.set('Accept', 'application/json')
							.set('jwt', token)
							.send(mockOpening)
							.expect(200)
							.end(function(err, res){
								if(err) return done(err);
								
								assert.isObject(res.body, 'response should be an object');
								assert.isNull(res.body.error, 'error should be null');

								// Delete the opening
								endpoint	
									.delete('/' + opening_id)
									.set('Accept', 'application/json')
									.set('jwt', token)
									.expect(200)
									.end(function(err, res){
										assert.isObject(res.body, 'response should be an object');
										assert.isNull(res.body.error, 'error should be null');
										
										done();
									});
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