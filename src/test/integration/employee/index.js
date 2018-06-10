const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const supertest = require('supertest');
const endpoint = supertest('http://localhost:3000/api/employees'); 
const token  = require('../config').token; 

// Dummy data
let mockEmployee = {
	name	: getRandomString(10),
	picture	: getRandomString(10),
	big 	: Math.random > 0.5 ? 1 : 0
}

describe('Employee ROUTE', function() {
	it('should list employees', function(done) {
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

	it('should create an employee, list it, edit it then delete it', function(done){
		// Create the employee
		endpoint
			.post('/')
			.set('Accept', 'application/json')
			.set('jwt', token)
			.send(mockEmployee)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				assert.isObject(res.body, 'response should be an object');
				assert.isNull(res.body.error, 'error should be null');
				assert.isObject(res.body.data, 'data should be an object');
				assert.isNumber(res.body.data.id, 'id should be number');

				const employee_id = res.body.data.id;

				// List the employee
				endpoint
					.get('/' + employee_id)
					.set('Accept', 'application/json')
					.expect(200)
					.end(function(err, res){
						if(err) return done(err);

						assert.isObject(res.body, 'response should be an object');
						assert.isNull(res.body.error, 'error should be null');
						assert.isObject(res.body.data, 'data should be an object');
						
						// Modify the data
						mockEmployee.name += '-edited';
						mockEmployee.picture += '-edited';
						mockEmployee.big = !mockEmployee.big;

						// Edit the employee
						endpoint
							.put('/' + employee_id)
							.set('Accept', 'application/json')
							.set('jwt', token)
							.send(mockEmployee)
							.expect(200)
							.end(function(err, res){
								if(err) return done(err);
								
								assert.isObject(res.body, 'response should be an object');
								assert.isNull(res.body.error, 'error should be null');

								// Delete the employee
								endpoint	
									.delete('/' + employee_id)
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