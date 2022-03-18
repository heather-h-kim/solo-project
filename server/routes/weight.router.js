const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in weight/GET route');
    console.log('req.params.id is', req.params.id);
    
    if (req.isAuthenticated()) {
        const queryText = ` SELECT "current_weight", "date" 
                            FROM "weight" 
                            WHERE "cat_id" = $1;
                            `;

        pool.query(queryText, [req.params.id])
            .then((result) => {
                console.log('result.rows is', result.rows);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('error GETing weight history', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

    console.log('in weight post router, req.body is', req.body);

    if (req.isAuthenticated()) {

        const queryText = `INSERT INTO "weight" ("current_weight", "cat_id")
                    VALUES ($1, $2);`;
        const valueArray = [req.body.current_weight, req.body.id]

        pool.query(queryText, valueArray)
            .then(result => {
                res.sendStatus(200);
            }).catch(error => {
                console.log('error posting current weight to the weight table', error);
                res.sendStatus(500);
            })

    } else {
        res.sendStatus(403);
    }
});


module.exports = router;
