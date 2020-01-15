const userAuth = require('../jwtControl/actionsauthentication').userAuth;

module.exports = (app, db) => {
    app.use('/api/user/:id', userAuth);
    app.get('/api/user/:id', (req, res) => {
        db.jwtuser.findByPk(req.params.id).then(result => {
            if (result) res.json(result);
            else {
                res.status(404).json({
                    code: 'notfound',
                    message: 'User not found',
                });
            }
        });
    });
    app.post('/api/user', (req, res) => {
        db.jwtuser
            .create({
                id: req.jwtId,
                name: req.body.name,
            })
            .then(result => res.status(201).json(result))
            .catch(error =>
                res.status(400).json({
                    code: 'badrequest',
                    message: error.errors[0].message,
                }),
            );
    });
};
