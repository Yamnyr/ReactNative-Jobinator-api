const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const apiJob = require('./api/job');
const apiUser = require('./api/user');
const apiAdmin = require('./api/admin');
const apiCandidate = require('./api/candidate');
const {verbose} = require('./config/config');
const jwtAuth = require('./control/auth');

let httpServer = null;

function launch(port) {
	return new Promise((resolve) => {
		const app = express();

		app.use(cors());
		app.use(bodyParser.json());

		app.use('/api', jwtAuth);

		apiJob(app, db);
		apiUser(app, db);
		apiCandidate(app, db);
		apiAdmin(app, db);

		app.use("/admin", (req, res, next) => {
			verbose && console.log("req on admin data");
			next();
		})

		app.get('/', (req, res) => {
			res.send();
		})

		httpServer = app.listen(port, () => {
			console.log(`App listening on port ${port}!`);
			resolve();
		});
	})
}

function createDb({verbose, resetDB}, initData) {
	db.sequelize.sync({ force: resetDB, logging: verbose }).then(() => {
		if (resetDB) {
			// populate author table with dummy data
			db.user.bulkCreate(
				initData.user,
				{logging: verbose}
			);
			// populate post table with dummy data
			db.job.bulkCreate(
				initData.job,
				{logging: verbose}
			);
			db.candidate.bulkCreate(
				initData.candidate,
				{logging: verbose}
			);
		}
	});
}

function stop() {
	httpServer.close();
}

module.exports = { launch, stop, createDb };
