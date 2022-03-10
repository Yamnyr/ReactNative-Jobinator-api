import express from 'express';
import bodyParser from 'body-parser';
import db from './models';
import apiJob from './api/job';
import apiUser from './api/user';
import apiAdmin from './api/admin';
import config from './config/config';
import jwtAuth from './jwtControl/auth';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', jwtAuth);

apiJob(app, db);
apiUser(app, db);
apiAdmin(app, db);

app.use("/admin/users", (req, res, next) => {
    console.log("req on admin/users");
    next();
})

db.sequelize.sync({ force: config.resetDB }).then(() => {
    if (config.resetDB) {
        // populate author table with dummy data
        db.user.bulkCreate(
            [
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
                    "status": "particulier",
                    "login": "toto",
                    "password": "toto"
                }
            ]
        );
        // populate post table with dummy data
        db.job.bulkCreate(
            [
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
            ]
        );
        db.candidate.bulkCreate(
            [
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
        );
    }

    app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
});
