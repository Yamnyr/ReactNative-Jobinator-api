module.exports = (app, db) => {
    app.get('/admin/users/:id', (req, res) => {
        db.user.findByPk(req.params.id).then(result => res.json(result));
    });

    app.get('/admin/users', (req, res) => {
        db.user.findAll().then(result => {
            res.json(result);
        });
    });

    app.get('/admin/jobs/:id', (req, res) => {
        db.job.findByPk(req.params.id).then(result => res.json(result));
    });

    app.get('/admin/jobs', (req, res) => {
        db.job.findAll().then(result => {
            res.json(result);
        });
    });

    app.get('/admin/candidates/:id', (req, res) => {
        db.candidate.findByPk(req.params.id).then(result => res.json(result));
    });

    app.get('/admin/candidates', (req, res) => {
        db.candidate.findAll().then(result => {
            res.json(result);
        });
    });
};
