module.exports = {
    userAuth: (req, res, next) => {
        if (parseInt(req.params.id) === parseInt(req.jwtId)) {
            next();
        } else
            res.status(403).json({
                code: `accessdenied`,
                message: `Access denied for user ${req.jwtId}`,
            });
    },
    contactAuthentication: (req, res, next, db) => {
        db.jwtcontact.findByPk(req.params.id).then(result => {
            if (result && req.jwtId === result.jwtuserId) {
                req.contactFromId = result;
                next();
            } else if (result) {
                res.status(403).json({
                    code: `accessdenied`,
                    message: `Contact access denied for user ${req.jwtId}`,
                });
            } else {
                res.status(404).json({
                    code: 'notfound',
                    message: 'Contact not found',
                });
            }
        });
    },
};
