const { launch, createDb } = require('./server');
const env = require('./config/config');

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
};

launch(env.port);

createDb(env, data);