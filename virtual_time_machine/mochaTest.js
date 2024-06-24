const chai = require('chai');
const chaiHttp = require('chai-http');
const puppeteer = require('puppeteer');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
 
chai.use(chaiHttp);
 
describe('Google SSO Authentication and Tests', function () {
    let authToken;
 
    before(async function () {

 
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
 
        await page.goto('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Ftimecapsuleww2.azurewebsites.net%2Fauth%2Fgoogle%2Fcallback&scope=profile&client_id=322958672607-k31b97t9teq92hbd58h45rpsk6an1e4c.apps.googleusercontent.com&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow');
 
        
        await page.type('input[type="email"]', 'mochatest@gmail.com');
        await page.click('#identifierNext');
        await page.waitForNavigation();
 
       
        await page.type('input[type="password"]', 'MochaTest');
        await page.click('#passwordNext');
        await page.waitForNavigation();
 
      
        const cookies = await page.cookies();
        const sessionCookie = cookies.find(cookie => cookie.name === 'connect.sid');
        authToken = sessionCookie ? sessionCookie.value : null;
    
        await browser.close();
    });
			it('Should return an auth token', function () {
			expect(response).to.have.status(200);
			expect(authToken).to.be.a('string');
		});
 
});

describe('Gets a list of capsules', function () {
	let requestResult;
	let response;

	before(function (done) {
		chai.request("https://timecapsuleww2.azurewebsites.net/")
			.get("/capsuleList")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return an array object with more than 1 object', function () {
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(1);
		expect(response).to.have.headers;
	});

	it('The elements in the array have the expected properties', function () {
		expect(response.body).to.have.length(3);
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('name').that.is.a('string');
					expect(body[i]).to.have.property('description').that.is.a('string');
					expect(body[i]).to.have.property('capsuleID').that.is.a('string');
					expect(body[i]).to.have.property('createdDate').that.is.a('string');
					expect(body[i]).to.have.property('openDate').that.is.a('string');
					expect(body[i]).to.have.property('completed').that.is.a('boolean');
					expect(body[i]).to.have.property('owner').that.is.a('string');
					expect(body[i]).to.have.property('files');
				}
				return true;
			});
	});
});

describe('Posts a capsule to the capsule list', function () {
	let requestResult;
	let response;
	let capsuleId;

	before(function (done) {
		chai.request("https://timecapsuleww2.azurewebsites.net/")
			.post("/capsuleList")
			.send({
				name: "Test Capsule Name",
				description: "test",
				capsuleID: "test123test123",
				createdDate: "2024-6-02",
				openDate: "2024-7-08",
				completed: false,
				userID: "testadd",
				files: [],
			})
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				capsuleId = res.body.capsuleID;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return the created capsule data', function () {
		expect(response.body).to.have.property('name').that.is.a('string');
		expect(response.body).to.have.property('description').that.is.a('string');
		expect(response.body).to.have.property('capsuleID').that.is.a('string');
		expect(response.body).to.have.property('createdDate').that.is.a('string');
		expect(response.body).to.have.property('openDate').that.is.a('string');
		expect(response.body).to.have.property('completed').that.is.a('boolean');
		expect(response.body).to.have.property('owner').that.is.a('string');
		expect(response.body).to.have.property('files');
	});

	after(function (done) {
		chai.request("https://timecapsuleww2.azurewebsites.net/")
			.delete("/capsuleList/" + capsuleId)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});
});