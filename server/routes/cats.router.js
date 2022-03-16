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

//edit a cat
router.put('/:id', (req, res) =>{
    console.log('in cats/PUT route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);
    
    let name = req.body.hasOwnProperty('name');
    let age = req.body.hasOwnProperty('age');
    let neutered = req.body.hasOwnProperty('is_neutered');
    let weight = req.body.hasOwnProperty('current_weight');
    console.log('name is', name);
    
    if(name){
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "name" = $1 WHERE id = $2 AND user_id = $3;`;
            const valueArray = [req.body.name, req.params.id, req.user.id]
    
            pool.query(queryText, valueArray)
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error PUTting/updating cat name', error);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(403);
        }
        
    } else if(age){
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "age" = $1 WHERE id = $2 AND user_id = $3;`;
            const valueArray = [req.body.age, req.params.id, req.user.id]
    
            pool.query(queryText, valueArray)
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error PUTting/updating cat age', error);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(403);
        }
        
    } else if(neutered){
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "is_neutered" = $1 WHERE id = $2 AND user_id = $3;`;
            const valueArray = [req.body.is_neutered, req.params.id, req.user.id]
    
            pool.query(queryText, valueArray)
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error PUTting/updating cat neuter status', error);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(403);
        }
    } else if(weight){
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "current_weight" = $1 WHERE id = $2 AND user_id = $3;`;
            const valueArray = [req.body.current_weight, req.params.id, req.user.id]
    
            pool.query(queryText, valueArray)
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error PUTting/updating cat weight', error);
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(403);
        }
}})

module.exports = router;
