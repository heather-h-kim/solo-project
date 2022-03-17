const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get foods 
 router.get('/', (req, res) => {
    console.log('in foods/GET route');
    console.log('req.user is', req.user);
    console.log('req.params.id is', req.params.id);
    
    if (req.isAuthenticated()) {
        const queryText = `
                            SELECT * FROM "foods" 
                            JOIN "cats_foods"
                            ON "foods"."id" = "cats_foods"."food_id"
                            JOIN "cats"
                            ON "cats"."id" = "cats_foods"."cat_id"
                            WHERE "cats_foods"."cat_id" = ${req.params.id};
                            `;

        pool.query(queryText)
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

//add dry food
router.post('/dry', (req, res) => {
    console.log('in foods/dry POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `
                            INSERT INTO "foods" ("name", "type", "cal_per_cup", "cal_per_kg")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";
                            `;

        const valueArray = [req.body.name, req.body.type, req.body.cal_per_cup, req.body.cal_per_kg]

        pool.query(queryText, valueArray)
        .then((result) => {
            console.log('new food id is', result.rows[0].id);
            const food_id = result.rows[0].id;

            //handle the cats_foods reference
            const secondQueryText = `INSERT INTO "cats_foods" ("cat_id", "food_id") VALUES ($1, $2);`;
            const secondArray = [req.body.cat_id, food_id]
            pool.query(secondQueryText, secondArray)
                .then((result) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('error adding food_id to cats_foods', error);
                    res.sendStatus(500)
                })
        }).catch((error) => {
            console.log('error posting dry food', error);
            res.sendStatus(500);
        })        
    } else {
        res.sendStatus(403);
    }
});
// router.post('/dry', async (req, res) => {
//     console.log('in foods/Dry Post route');
//     console.log('req.body is', req.body);
//     console.log('req.user is', req.user);

//     if (req.isAuthenticated()) {
//         try{
//         const queryText = `
//                             INSERT INTO "foods" ("name", "type", "cal_per_cup", "cal_per_kg")
//                            VALUES ($1, $2, $3, $4)
//                             RETURNING "id";
//                                  `;
//         const valueArray = [req.body.name, req.body.type, req.body.cal_per_cup, req.body.cal_per_kg]
//         const secondQueryText = `INSERT INTO "cats_foods" ("cat_id", "food_id") VALUES ($1, $2);`;
//         const secondArray = [req.body.cat_id, food_id]

//         const food_id = await pool.query(queryText, valueArray);
//         await pool.query(secondQueryText, secondArray);
//         res.sendStatus(200);
//         } catch (error) {
//             console.log('error posting dry food');
//             res.sendStatus(500);
//         }
//     }
    
    
    
// })

//add wet food
router.post('/wet', (req, res) => {
    console.log('in foods/wet POST route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    if (req.isAuthenticated()) {
        const queryText = `
                            INSERT INTO "foods" ("name", "type", "cal_per_can", "cal_per_kg")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";
                            `;

        const valueArray = [req.body.name, req.body.type, req.body.cal_per_can, req.body.cal_per_kg]

        pool.query(queryText, valueArray)
        .then((result) => {
            console.log('new food id is', result.rows[0].id);
            const food_id = result.rows[0].id;

            //handle the cats_foods reference
            const secondQueryText = `INSERT INTO "cats_foods" ("cat_id", "food_id") VALUES ($1, $2);`;
            const secondArray = [req.body.cat_id, food_id]

            pool.query(secondQueryText, secondArray)
                .then((result) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('error adding food_id to cats_foods', error);
                    res.sendStatus(500)
                })
        }).catch((error) => {
            console.log('error posting wet food', error);
            res.sendStatus(500);
        })        
    } else {
        res.sendStatus(403);
    }
});

//calculate food amount 
router.put('/', (req, res) => {
    console.log('in foods PUT route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);
    console.log('req.params.id is', req.params.id);

    if (req.isAuthenticated()) {
         
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
