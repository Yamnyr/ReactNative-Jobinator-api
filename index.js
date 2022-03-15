const { launch, createDb } = require('../server');
const env = require('./config/config');

const data = {
	user: [
		{
			"id": 1,
			"name": "IUT",
			"status": "entreprise",
			"login": "gillar01",
			"password": "admin"
		},
		{
			"id": 3,
			"name": "entreprise",
			"status": "entreprise",
			"login": "ent1",
			"password": "ent1"
		},
		{
			"id": 2,
			"name": "dupont",
			"status": "candidat",
			"login": "toto",
			"password": "toto"
		}
	],
	job: [
		{
			"id": 1,
			"userId": 1,
			"name": "surveillant H/F",
			"description": "Une superbe offre de stage à l'IUT pour forcer les étudiants à arriver à l'heure !",
		},
		{
			"id": 2,
			"userId": 1,
			"name": "developeur web fullStack",
			"description": "Une autre offre pour coder le site web de l'URCA",
		},
		{
			"id": 3,
			"userId": 1,
			"name": "developeur web React / Symfony",
			"description": "Une offre pour créer le SI du département informatique",
		},
		{
			"id": 4,
			"userId": 3,
			"name": "concepteur architecte",
			"description": "refaire l'infra",
		}
	],
	candidate: [
		{
			"id": 1,
			"jobId": 1,
			"userId": 2
		},
		{
			"id": 2,
			"jobId": 3,
			"userId": 2
		}
	]
};

launch(env.port);

createDb(config, data);