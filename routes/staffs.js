var express = require('express');
var router = express.Router();
const Staff = require('../models/staff');

/* GET staffs listing. */
router.get('/', function(req, res, next) {
Staff.find().sort('id').exec(function(err, staffs) {
	if (err) {
		return next(err);
	}
	res.send(staffs);
	});
});

/* GET staff by id */
router.get('/:id', loadStaff, function(req, res, next) {
	res.send(req.staff);
});

/* POST new staff */
router.post('/', function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newStaff = new Staff(req.body);

	newStaff.date_creation = Date.now();
	// Save that document
	newStaff.save(function(err, savedStaff) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedStaff);
	});
});

/* PATCH update staff */
router.patch('/:id', loadStaff, function(req, res, next) {

	if (req.body.prenom !== undefined) {
		req.staff.prenom = req.body.prenom;
	}
	if (req.body.nom !== undefined) {
		req.staff.nom = req.body.nom;
	}
	if (req.body.email !== undefined) {
		req.staff.email = req.body.email;
	}

	req.staff.save(function(err, savedStaff) {
		if (err) {
			return next(err);
		}
		res.send(savedStaff);
	});
});

/* DELETE delete staff */
router.delete('/:id', loadStaff, function(req, res, next) {

	req.staff.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadStaff(req, res, next) {
	Staff.findOne({"_id" : req.params.id}).exec(function(err, staff) {
		if (err) {
			return next(err);
		} else if (!staff) {
			return res.status(404).send('Aucun staffs trouvé avec cet identifiant : ' + req.params.id);
		}
		req.staff = staff;
		next();
	});
}

module.exports = router;
