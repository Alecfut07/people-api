const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const authRepository = require('../repositories/auth');

function getUserByUsernameAndPassword(req, res) {
    authRepository.getUserByUsernameAndPassword(req.body.username, req.body.password)
        .then((results) => {
            if (results.length > 0) {
                const data = results[0];
                const body = new ApiBody({ id: data.id, username: data.username });
                res.status(200).json(body);
            } else {
                const body = new ApiBody(null);
                res.status(404).json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

module.exports = {
    getUserByUsernameAndPassword,
};
