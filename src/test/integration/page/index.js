const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const endpoint = supertest('http://localhost:3000/api/pages'); 
const token  = require('../config').token; 

// Dummy data
let mockPage = {
	slug	: getRandomString(10).toLocaleLowerCase(),
	title	: getRandomString(10),
	content : getRandomString(200)
}

describe('Page ROUTE', function() {
	it('should list pages', function(done) {
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

	it('should create a page, list it, edit it then delete it', function(done){
		// Create the employee
		endpoint
			.post('/')
			.set('Accept', 'application/json')
			.set('jwt', token)
			.send(mockPage)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.error, 'error should be null');
				assert.isObject(res.body.data, 'data should be an object');
				assert.isNumber(res.body.data.id, 'id should be number');

				const page_id = res.body.data.id;

				// List the page
				endpoint
					.get('/' + page_id)
					.set('Accept', 'application/json')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);

						assert.isObject(res.body, 'response should be an object');
						assert.isNull(res.body.error, 'error should be null');
						assert.isObject(res.body.data, 'data should be an object');
						
						// Modify the data
						mockPage.slug += '-edited';
						mockPage.title += '-edited';
						mockPage.content += '-edited';

						// Edit the page
						endpoint
							.put('/' + page_id)
							.set('Accept', 'application/json')
							.set('jwt', token)
							.send(mockPage)
							.expect(200)
							.end(function(err, res){
								if(err) return done(err);
								
								assert.isObject(res.body, 'response should be an object');
								assert.isNull(res.body.error, 'error should be null');

								// Delete the page
								endpoint	
									.delete('/' + page_id)
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