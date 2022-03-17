const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('in cats_foods/POST route');
    console.log('req.body is', req.body);
    
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "cats_foods" ("cat_id", "food_id") VALUES ($1, $2);`;
        const valueArray = [req.body.cat_id, req.body.food_id];
        pool.query(queryText, valueArray)
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error posting to cats_foods', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;