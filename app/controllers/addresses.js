const ApiError = require('../models/api-error');
const ApiBody = require('../models/api-body');
const Address = require('../models/address');
const addressesRepository = require('../repositories/addresses');

function isStreetValid(street) {
    return street && street.length > 0;
}

function isNumberValid(number) {
    return number > 0;
}

function isPostalCodeValid(postalCode) {
    return postalCode > 0;
}

function isAddressValid(address) {
    return isStreetValid(address.street) && isNumberValid(address.number) && isPostalCodeValid(address.postal_code);
}

function getAddresses(req, res) {
    addressesRepository.getAddresses()
        .then((results) => {
            const addresses = [];
            results.forEach((row) => {
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                addresses.push(address);
            });
            const body = new ApiBody(addresses);
            res.json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function getAddressById(req, res) {
    const id = parseInt(req.params.id, 10);
    addressesRepository.getAddressById(id)
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                const body = new ApiBody(address);
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

function insertAddress(req, res) {
    const addressToInsert = req.body;
    if (!isAddressValid(req.body)) {
        const error = new ApiError(400, 'BAD REQUEST ERROR');
        const body = new ApiBody([], [error]);
        res.status(400).json(body);
        return;
    }
    addressesRepository.insertAddress(addressToInsert)
        .then((address) => {
            const body = new ApiBody(address);
            res.status(201).json(body);
        })
        .catch((err) => {
            console.log(err);
            const error = new ApiError(500, 'INTERNAL SERVER ERROR');
            const body = new ApiBody([], [error]);
            res.status(500).json(body);
        });
}

function updateAddressById(req, res) {
    const id = parseInt(req.params.id, 10);
    const addressToUpdate = req.body;
    addressesRepository.updateAddressById(id, addressToUpdate)
        .then((addressId) => addressesRepository.getAddressById(addressId))
        .then((results) => {
            if (results && results.length > 0) {
                const row = results[0];
                const address = new Address(row.id, row.street, row.number, row.postal_code);
                const body = new ApiBody(address);
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

function deleteAddressById(req, res) {
    const id = parseInt(req.params.id, 10);
    addressesRepository.deleteAddressById(id)
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
    getAddresses,
    getAddressById,
    insertAddress,
    updateAddressById,
    deleteAddressById,
};
