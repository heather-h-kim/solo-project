const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('in cats_foods/POST route');
    console.log('req.body is', req.body);
    
    if (req.isAuthenticated()) {
        const queryText = `INSERT INTO "cats_foods" ("cat_id", "food_id") 
                           VALUES ($1, $2);`;

        const valueArray = [req.body.cat_id, req.body.food_id];
        pool.query(queryText, valueArray)
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error posting cat_id and food_id to cats_foods', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});





//calculate food amount 
router.put('/:id', (req, res) => {
    console.log('in cats_foods PUT route');
    console.log('req.body is', req.body);
   
    if (req.isAuthenticated()) {
    const queryText = `UPDATE "cats_foods"
                       SET "daily_amount_oz" = (SELECT CASE WHEN "foods"."type" = 'wet'  THEN (SELECT "cats"."food_cal"*"cats"."wet_percentage"*0.01/("foods"."cal_per_kg"/35.274) FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "cats"."id"= $1 AND "foods"."id" =$2) 
                                                            WHEN "foods"."type" = 'dry' THEN (SELECT "cats"."food_cal"*(100-"cats"."wet_percentage")*0.01/("foods"."cal_per_kg"/35.274) FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "cats"."id" = $1 AND "foods"."id" = $2) 	
                                                           END
                                                FROM "foods" WHERE "foods"."id" = $2),

                            "daily_amount_can" = (SELECT CASE WHEN "foods"."type" = 'wet' THEN (SELECT "cats"."food_cal"*"cats"."wet_percentage"*0.01/"foods"."cal_per_can" FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods". "food_id" WHERE "cats"."id" = $1 AND "foods"."id" = $2) 
                                                                  WHEN "foods"."type" = 'dry' THEN 0
                                                              END
                                                      FROM "foods" WHERE "foods"."id" = $2),
                            "daily_amount_cup" = (SELECT CASE WHEN "foods"."type" = 'wet'  THEN 0
                                                              WHEN "foods"."type" = 'dry' THEN (SELECT "cats"."food_cal"*(100-"cats"."wet_percentage")*0.01/"foods"."cal_per_cup" FROM "cats" JOIN "cats_foods" ON "cats"."id" = "cats_foods"."cat_id"  JOIN "foods" ON "foods"."id" = "cats_foods"."food_id" WHERE "cats"."id" = $1 AND "foods"."id" = $2) 	
                                                            END
                                                    FROM "foods" WHERE "foods"."id" = $2)
                       WHERE "cat_id" = $1 AND "food_id" = $2;`;
                      
                       

    const valueArray = [req.body.cat_id, req.body.food_id];
    pool.query(queryText, valueArray)
    .then((result) => {
        // console.log('result.rows is', result.rows);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error updating cats_foods table with food amount', error);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }

    
});

//delete food that was not updated
router.delete('/:id', (req, res) => {
    console.log('in cats_foods DELETE route to delete food');
    console.log('req.body is', req.body);
    
   
    if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "cats_foods" 
                        WHERE "cat_id" = $1 AND "food_id" != $2 AND "food_id" != $3`;
                      
    pool.query(queryText, [req.body.cat_id, req.body.wetFood_id, req.body.dryFood_id])
    .then((result) => {
        console.log('deleted row that is not updated');
        
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting cats_foods food status', error);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }
});

//delete food that was not updated when only one type of food is updated
router.delete('/oneFood/:id', (req, res) => {
    console.log('in cats_foods DELETE route to delete food');
    console.log('req.body is', req.body);
    
   
    if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "cats_foods" 
                        WHERE "cat_id" = $1 AND "food_id" != $2;`;
                      
    pool.query(queryText, [req.body.cat_id, req.body.food_id])
    .then((result) => {
        console.log('deleted row that is not updated');
        
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting cats_foods food status', error);
        res.sendStatus(500);
    })
    } else {
        res.sendStatus(403);
    }
});
module.exports = router;