const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get foods 
 router.get('/:id', (req, res) => {
    console.log('in foods/GET route');
    console.log('req.params.id is', req.params.id);
    
    if (req.isAuthenticated()) {
        const queryText = `SELECT "foods"."id", "foods"."name","foods"."type", "cats_foods"."daily_amount_oz"
                           FROM "foods" 
                           JOIN "cats_foods" ON "foods"."id" = "cats_foods"."food_id" 
                           WHERE "cat_id"= $1;
                            `;

        pool.query(queryText, [req.params.id])
            .then((result) => {
                console.log('result.rows is', result.rows);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('error GETing foods', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// //get  the user's foods 
// router.get('/:id', (req, res) => {
//     console.log('in foods/user GET route');
//     console.log('req.user.id is', req.user.id);
    
//     if (req.isAuthenticated()) {
//         const queryText = `SELECT "foods"."id", "foods"."name"
//                            FROM "foods" 
//                            WHERE "user_id"= $1;
//                            `;

//         pool.query(queryText, [req.params.id])
//             .then((result) => {
//                 console.log('result.rows is', result.rows);
//                 res.send(result.rows);
//             })
//             .catch((error) => {
//                 console.log('error GETing foods', error);
//                 res.sendStatus(500);
//             })
//     } else {
//         res.sendStatus(403);
//     }
// });

//add dry food
router.post('/dry', (req, res) => {
    console.log('in foods/dry POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `
                            INSERT INTO "foods" ("name", "type", "cal_per_kg")
                            VALUES ($1, $2, $3)
                            RETURNING "id";
                            `;

        const valueArray = [req.body.name, req.body.type, req.body.cal_per_kg]

        pool.query(queryText, valueArray)
        .then((result) => {
            console.log('new food id is', result.rows[0].id);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error posting dry food', error);
            res.sendStatus(500);
        })        
    } else {
        res.sendStatus(403);
    }
});

//add wet food
router.post('/wet', (req, res) => {
    console.log('in foods/wet POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `
                            INSERT INTO "foods" ("name", "type", "cal_per_kg")
                            VALUES ($1, $2, $3)
                            RETURNING "id";
                            `;

        const valueArray = [req.body.name, req.body.type, req.body.cal_per_kg]

        pool.query(queryText, valueArray)
        .then((result) => {
            console.log('new food id is', result.rows[0].id);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error posting wet food', error);
            res.sendStatus(500);
        })        
    } else {
        res.sendStatus(403);
    }
});





module.exports = router;
