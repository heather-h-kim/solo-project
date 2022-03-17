const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
//add dry food
router.post('/dry', (req, res) => {
    console.log('in foods/dry POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const firstQueryText = `
                            INSERT INTO "foods" ("name", "type", "cal_per_cup", "cal_kg")
                            VALUES ($1, $2, $3, $4, $5);
                            `;

        const valueArray = [req.body.name, req.body.age, req.body.is_neutered, req.body.current_weight, req.user.id]

        pool.query(queryText, valueArray)
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('Error POSTing a cat', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
