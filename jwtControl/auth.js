const JWS = require('jsrsasign').jws.JWS;
const config = require('../config/config');

module.exports = async (req, res, next) => {
    let error = '';
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            error = 'noauthorization';
            throw new Error('You must send an Authorization header');
        }

        const [authType, token] = authorization.trim().split(' ');
        if (authType !== 'Bearer') {
            error = 'nobearertoken';
            throw new Error('Expected an Authorization Bearer token');
        }

        if (!(await JWS.verifyJWT(token, config.secret, { alg: ['HS256'] }))) {
            error = 'invalidtoken';
            throw new Error('Validating access token: token ' + token + ' invalid.');
        }

        let payload = JWS.parse(req.headers.authorization.trim().split(' ')[1]).payloadObj;
        if (payload.exp && payload.exp < Date.now()) {
            error = 'tokenexpired';
            throw new Error(
                'Validating access token: Session has expired on ' +
                    new Date(payload.exp) +
                    ' The current time is ' +
                    new Date(Date.now()) +
                    '.',
            );
        }

        req.jwtId = payload.sub;

        next();
    } catch (errorMessage) {
        res.status(401).json({ code: error, message: errorMessage.message });
    }
};
