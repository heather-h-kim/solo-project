const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get foods 
 router.get('/:id', (req, res) => {
    console.log('in foods/GET route');
    console.log('req.params.id is', req.params.id);
    
    if (req.isAuthenticated()) {
        const queryText = `
                            SELECT "foods"."id", "foods"."name", "foods"."type", "foods"."daily_amount_can", "foods"."daily_amount_cup", "foods"."daily_amount_oz"
                            FROM "foods" 
                            JOIN "cats_foods"
                            ON "foods"."id" = "cats_foods"."food_id"
                            JOIN "cats"
                            ON "cats"."id" = "cats_foods"."cat_id"
                            WHERE "cats"."id" = $1;
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
                            INSERT INTO "foods" ("name", "type", "cal_per_can", "cal_per_kg")
                            VALUES ($1, $2, $3, $4)
                            RETURNING "id";
                            `;

        const valueArray = [req.body.name, req.body.type, req.body.cal_per_can, req.body.cal_per_kg]

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

//calculate food amount 
router.put('/:id', (req, res) => {
    console.log('in foods PUT route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);
   
    if (req.isAuthenticated()) {
    const queryText = `UPDATE "foods"
                       SET "daily_amount_can" = 
                             (SELECT CASE WHEN "foods"."type" = 'wet'  THEN (SELECT "cats"."food_cal"*"cats"."wet_percentage"*0.01/"foods"."cal_per_can" FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "foods"."id" =$1) 
                                          WHEN "foods"."type" = 'dry' THEN 0
                                     END) ,
          
                            "daily_amount_cup" = (SELECT CASE WHEN "foods"."type" = 'wet'  THEN 0
                                                              WHEN "foods"."type" = 'dry' THEN (SELECT "cats"."food_cal"*(100-"cats"."wet_percentage")*0.01/"foods"."cal_per_cup" FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "foods"."id" =$1) 	
                                     END) ,
         
                            "daily_amount_oz" = (SELECT CASE WHEN "foods"."type" = 'wet'  THEN (SELECT "cats"."food_cal"*"cats"."wet_percentage"*0.01/("foods"."cal_per_kg"/35.274) FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "foods"."id" =$1) 
                                                             WHEN "foods"."type" = 'dry' THEN (SELECT "cats"."food_cal"*(100-"cats"."wet_percentage")*0.01/("foods"."cal_per_kg"/35.274) FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "foods"."id" =$1) 	
                                     END)   
                       WHERE "foods"."id" = $1;
                        `;
    pool.query(queryText, [req.body.food_id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error updating food table with food amount', error);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }
});

//delete food
router.delete('/:id', async (req, res) => {
    console.log('in foods DELETE route');
    console.log('req.body is', req.params.id);
    

    if (req.isAuthenticated()) {
        try{
        const firstQueryText = ` DELETE FROM "cats_foods" WHERE "food_id"=$1;`;           
        const secondQueryText = `DELETE FROM "foods" WHERE "id" = $1;`;

        await pool.query(firstQueryText, [req.params.id]);
        await pool.query(secondQueryText, [req.params.id]);
            res.sendStatus(200)
        } catch (error) {
            console.log('error deleting this food', error);
            res.sendStatus(500);
        }
           
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
