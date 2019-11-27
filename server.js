import express from 'express';
import bodyParser from 'body-parser';
import faker from 'faker';
import times from 'lodash.times';
import random from 'lodash.random';
import db from './models';
import apiContact from './api/contact';
import apiUser from './api/user';
import apiAdmin from './api/admin';
import config from './config/config';
import jwtAuth from './jwtControl/auth';

const app = express();
app.use(bodyParser.json());

app.use('/api', jwtAuth);

apiContact(app, db);
apiUser(app, db);
apiAdmin(app, db);

faker.locale = 'fr';

db.sequelize.sync({ force: config.resetDB }).then(() => {
    if (config.resetDB) {
        // populate author table with dummy data
        db.user.bulkCreate(
            times(config.usersNumber, () => ({
                name: faker.name.findName(),
            })),
        );
        // populate post table with dummy data
        db.contact.bulkCreate(
            times(config.contactsNumber, () => ({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                userId: random(1, config.usersNumber),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                avatar: faker.image.avatar(),
            })),
        );
    }

    app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
});
