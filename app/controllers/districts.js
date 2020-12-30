const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const District = require('../models/district');
const districtsRepository = require('../repositories/districts');

function isNameValid(name) {
    return name && name.length > 0;
}

function isPhoneNumberValid(phoneNumber) {
    return phoneNumber > 0;
}

function isAddressValid(address) {
    return address && address.length > 0;
}

function isEmailValid(email) {
    return email && email.length > 0;
}

function isDistrictValid(district) {
    return isNameValid(district.name) && isPhoneNumberValid(district.phone_number)
    && isAddressValid(district.address) && isEmailValid(district.email);
}

function getDistricts(req, res) {
    districtsRepository.getDistricts()
        .then((results) => {
            const districts = [];
            results.forEach((row) => {
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                districts.push(district);
            });
            const body = new ApiBody(districts);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function getDistrictById(req, res) {
    const id = parseInt(req.params.id, 10);
    districtsRepository.getDistrictById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                const body = new ApiBody(district);
                res.json(body);
            } else {
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function insertDistrict(req, res) {
    const districtToInsert = req.body;
    if (!isDistrictValid(req.body)) {
        const error = new ApiError(400, 'BAD REQUEST ERROR');
        const body = new ApiBody([], [error]);
        res.status(400).json(body);
        return;
    }
    districtsRepository.insertDistrict(districtToInsert)
        .then((district) => {
            const body = new ApiBody(district);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function updateDistrictById(req, res) {
    const id = parseInt(req.params.id, 10);
    const districtToUpdate = req.body;
    districtsRepository.updateDistrictById(id, districtToUpdate)
        .then((districtId) => districtsRepository.getDistrictById(districtId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const district = new District(row.id, row.name, row.phone_number, row.address, row.email);
                const body = new ApiBody(district);
                res.status(200).json(body);
            } else {
                const body = new ApiBody(null);
                res.json(body);
            }
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function deleteDistrictById(req, res) {
    const id = parseInt(req.params.id, 10);
    districtsRepository.deleteDistrictById(id)
        .then((results) => {
            res.status(204).json(results);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

module.exports = {
    getDistricts,
    getDistrictById,
    insertDistrict,
    updateDistrictById,
    deleteDistrictById,
};
