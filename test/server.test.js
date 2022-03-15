const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const fetch = require('node-fetch');

const { launch, stop, createDb } = require('../server');

chai.use(chaiAsPromised);

const config = {
	port: 8888,
	resetDB: true,
	verbose: false,
}

const { expect, should } = chai;

const data = {
	user: [
		{
			"id": 1,
			"name": "entr1",
			"status": "entreprise",
			"login": "entr1",
			"password": "entr1"
		},
		{
			"id": 2,
			"name": "entr2",
			"status": "entreprise",
			"login": "entr2",
			"password": "entr2"
		},
		{
			"id": 3,
			"name": "user1",
			"status": "candidat",
			"login": "user1",
			"password": "user1"
		},
		{
			"id": 4,
			"name": "user2",
			"status": "candidat",
			"login": "user2",
			"password": "user2"
		}
	],
	job: [
		{
			"id": 1,
			"userId": 1,
			"name": "job 1",
			"description": "A great job 1",
		},
		{
			"id": 2,
			"userId": 1,
			"name": "job 2",
			"description": "A great job 2",
		},
		{
			"id": 3,
			"userId": 1,
			"name": "job 3",
			"description": "A great job 3",
		},
		{
			"id": 4,
			"userId": 2,
			"name": "job 4",
			"description": "A great job 4",
		}
	],
	candidate: [
		{
			"id": 1,
			"jobId": 1,
			"userId": 3,
		},
		{
			"id": 2,
			"jobId": 3,
			"userId": 3
		},
		{
			"id": 3,
			"jobId": 4,
			"userId": 3
		},
		{
			"id": 4,
			"jobId": 1,
			"userId": 4
		}
	]
}


const url = 'http://localhost:' + config.port;

describe('server', function () {
	before(function () {
		launch(config.port);
		createDb(config, data);
	})

	it("server up with status 200", function () {
		return expect(fetch("http://localhost:" + config.port))
			.to.eventually.have.property('status', 200);
	})
	it("server admin route /admin/users give all users", function () {
		return expect(fetch("http://localhost:" + config.port + "/admin/users").then(res => res.json()))
			.to.eventually.be.an('array')
			.length(4);
	})

	describe("/api route need authorization headers", function () {
		it("get /api/users failed with no autorization headers", function () {
			return expect(fetch("http://localhost:" + config.port + "/api/users"))
				.to.eventually.have.property('status', 401);
		})
		it("get /api/jobs/id failed with no autorization headers", function () {
			return expect(fetch("http://localhost:" + config.port + "/api/jobs/12"))
				.to.eventually.have.property('status', 401);
		})
		it("get /api/candidates/id failed with no autorization headers", function () {
			return expect(fetch("http://localhost:" + config.port + "/api/candidates/12"))
				.to.eventually.have.property('status', 401);
		})
	})
	describe("/api route need a valid jwt in 'autorization: Bearer' headers", function () {
		it("get /api/users failed with no valid jwt", function () {
			return expect(fetch(
				"http://localhost:" + config.port + "/api/users",
				{
					headers: {
						Autorization: "Bearer a.b.c",
					}
				}
			))
				.to.eventually.have.property('status', 401);
		})
		it("get /api/jobs/id failed with no autorization headers", function () {
			return expect(fetch(
				"http://localhost:" + config.port + "/api/jobs",
				{
					headers: {
						Autorization: "Bearer a.b.c",
					}
				}
			))
				.to.eventually.have.property('status', 401);
		})
		it("get /api/candidates/id failed with no autorization headers", function () {
			return expect(fetch(
				"http://localhost:" + config.port + "/api/candidates",
				{
					headers: {
						Autorization: "Bearer a.b.c",
					}
				}
			))
				.to.eventually.have.property('status', 401);
		})
	})

	after(function () {
		stop();
	})
})