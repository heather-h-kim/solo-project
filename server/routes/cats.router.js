const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Fetch all cats from the database
router.get('/', (req, res) => {
    console.log('in cats/GET route');
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "cats" WHERE "user_id" = ${req.user.id};`;
        pool.query(queryText)
        .then((result) => {
            console.log('result.rows is', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error GETing cats', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

//Fetch one cat from the database
router.get('/:id', (req, res) => {
    console.log('in cats/GET route to fetch one cat');
    
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "cats" WHERE "user_id" = $1 AND "id" = $2;`;
        const valueArray = [req.user.id, req.params.id];

        pool.query(queryText, valueArray)
        .then((result) => {
            console.log('result.rows is', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error GETing cats', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

// Add a cat to the database
router.post('/', (req, res) => {
    console.log('in cats/POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `
                            INSERT INTO "cats" ("name", "age", "is_neutered", "current_weight", "user_id")
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
