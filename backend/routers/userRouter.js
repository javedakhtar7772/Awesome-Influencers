const { Router } = require('express');
const router = Router();
const Model = require('../models/userModel');

router.post('/add', (req, res) => {
    
    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;