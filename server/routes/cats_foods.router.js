const { LockTwoTone, SleddingOutlined } = require('@mui/icons-material');
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

//delete food
router.delete('/edit/:id', (req, res) => {
    console.log('in food DELETE route');
    console.log('req.body is', req.body);
    

    if (req.isAuthenticated()) {
        
        const firstQueryText = ` DELETE FROM "cats_foods" WHERE "food_id"=$1 AND "cat_id" = $2;`;           
        // const secondQueryText = `DELETE FROM "foods" WHERE "id" = $1;`;

        pool.query(firstQueryText, [req.body.food_id, req.body.cat_id])
        .then(result => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error deleting this food', error);
            res.sendStatus(500);
        })
           
    } else {
        res.sendStatus(403);
    }
});

//add two new foods and calculate daily food amount
router.post('/wet-and-dry', async(req, res) => {
    console.log('in cats_foods/wet-and-dry post route ');
    console.log('req.body is', req.body);
    const cat_id = req.body.wet_food.cat_id;
    // const wetFood = req.body.wet_food;
    // const dryFood = req.body.dry_food;

    const connection = await pool.connect();

    try{
        await connection.query('BEGIN');
        const sqlAddDryFoodToFoods = 
        `INSERT INTO "foods" ("name", "type", "cal_per_cup", "cal_per_kg")
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
        `;

        const dryFoodArray = [req.body.dry_food.name, req.body.dry_food.type, req.body.dry_food.cal_per_cup, req.body.dry_food.cal_per_kg];

        const sqlAddWetFoodToFoods = 
        `INSERT INTO "foods" ("name", "type", "cal_per_can", "cal_per_kg")
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
        `;

        const wetFoodArray = [req.body.wet_food.name, req.body.wet_food.type, req.body.wet_food.cal_per_can, req.body.wet_food.cal_per_kg];

        const resultDry = await connection.query(sqlAddDryFoodToFoods, dryFoodArray);
        const resultWet = await connection.query(sqlAddWetFoodToFoods, wetFoodArray);

        const dryFoodId = resultDry.rows[0].id;
        const wetFoodId = resultWet.rows[0].id;

        console.log('wetFoodId and dryFoodId are', wetFoodId, dryFoodId);

        const sqlAddFoodToCatsFoods = 
        `INSERT INTO "cats_foods" ("cat_id", "food_id")
         VALUES ($1, $2), ($3, $4);`;

        const valueArray = [cat_id, dryFoodId, cat_id, wetFoodId];
        await connection.query(sqlAddFoodToCatsFoods, valueArray);
        const sqlCalculateAmount = 
        `UPDATE "cats_foods"
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
        
        const dryValueArray = [cat_id, dryFoodId];
        const wetValueArray = [cat_id, wetFoodId];

        await connection.query(sqlCalculateAmount, dryValueArray);
        await connection.query(sqlCalculateAmount, wetValueArray);
        const sqlDeleteUnupdated = 
        `DELETE FROM "cats_foods" WHERE "cat_id" = $1 AND "food_id" != $2 AND "food_id" != $3`;
        
        const deleteArray = [cat_id, dryFoodId, wetFoodId];

        await connection.query(sqlDeleteUnupdated, deleteArray);

        await connection.query('COMMIT;');
        res.sendStatus(200);
    
    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Transaction error', error);
        res.sendStatus(500);
    }finally {
        connection.release();
    }
    
})

//add new dry food and update existing wet food 
router.post('/new-dry-old-wet', async(req, res) => {
    console.log('in cats_foods/new-dry-old-wet post route ');
    console.log('req.body is', req.body);
    const cat_id = req.body.dry_food.cat_id;
    // const wetFood = req.body.wet_food;
    // const dryFood = req.body.dry_food;

    const connection = await pool.connect();

    try{
        await connection.query('BEGIN');
        const sqlAddDryFoodToFoods = 
        `INSERT INTO "foods" ("name", "type", "cal_per_cup", "cal_per_kg")
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
        `;

        const dryFoodArray = [req.body.dry_food.name, req.body.dry_food.type, req.body.dry_food.cal_per_cup, req.body.dry_food.cal_per_kg];

        
        const resultDry = await connection.query(sqlAddDryFoodToFoods, dryFoodArray);
        const dryFoodId = resultDry.rows[0].id;

        const wetFoodId = req.body.wet_food.food_id;
        console.log('wetFoodId and dryFoodId are', wetFoodId, dryFoodId);

        const sqlAddDryFoodToCatsFoods = 
        `INSERT INTO "cats_foods" ("cat_id", "food_id")
         VALUES ($1, $2);`;

        const valueArray = [cat_id, dryFoodId];

        await connection.query(sqlAddDryFoodToCatsFoods, valueArray);
        const sqlCalculateAmount = 
        `UPDATE "cats_foods"
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
        
        const dryValueArray = [cat_id, dryFoodId];
        const wetValueArray = [cat_id, wetFoodId];

        await connection.query(sqlCalculateAmount, dryValueArray);
        await connection.query(sqlCalculateAmount, wetValueArray);
        const sqlDeleteUnupdated = 
        `DELETE FROM "cats_foods" WHERE "cat_id" = $1 AND "food_id" != $2 AND "food_id" != $3`;
        
        const deleteArray = [cat_id, dryFoodId, wetFoodId];

        await connection.query(sqlDeleteUnupdated, deleteArray);

        await connection.query('COMMIT;');
        res.sendStatus(200);
    
    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Transaction error', error);
        res.sendStatus(500);
    }finally {
        connection.release();
    }  
})

//add new wet food and update existing dry food 
router.post('/new-wet-old-dry', async(req, res) => {
    console.log('in cats_foods/new-wet-old-dry post route ');
    console.log('req.body is', req.body);
    const cat_id = req.body.wet_food.cat_id;

    const connection = await pool.connect();

    try{
        await connection.query('BEGIN');
        const sqlAddWetFoodToFoods = 
        `INSERT INTO "foods" ("name", "type", "cal_per_can", "cal_per_kg")
        VALUES ($1, $2, $3, $4)
        RETURNING "id";
        `;

        const wetFoodArray = [req.body.wet_food.name, req.body.wet_food.type, req.body.wet_food.cal_per_can, req.body.wet_food.cal_per_kg];

        
        const resultWet = await connection.query(sqlAddWetFoodToFoods, wetFoodArray);
        const wetFoodId = resultWet.rows[0].id;

        const dryFoodId = req.body.dry_food.food_id;
        console.log('wetFoodId and dryFoodId are', wetFoodId, dryFoodId);

        const sqlAddWetFoodToCatsFoods = 
        `INSERT INTO "cats_foods" ("cat_id", "food_id")
         VALUES ($1, $2);`;

        const valueArray = [cat_id, wetFoodId];

        await connection.query(sqlAddWetFoodToCatsFoods, valueArray);
        const sqlCalculateAmount = 
        `UPDATE "cats_foods"
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
        
        const dryValueArray = [cat_id, dryFoodId];
        const wetValueArray = [cat_id, wetFoodId];

        await connection.query(sqlCalculateAmount, dryValueArray);
        await connection.query(sqlCalculateAmount, wetValueArray);
        const sqlDeleteUnupdated = 
        `DELETE FROM "cats_foods" WHERE "cat_id" = $1 AND "food_id" != $2 AND "food_id" != $3`;
        
        const deleteArray = [cat_id, dryFoodId, wetFoodId];

        await connection.query(sqlDeleteUnupdated, deleteArray);

        await connection.query('COMMIT;');
        res.sendStatus(200);
    
    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Transaction error', error);
        res.sendStatus(500);
    }finally {
        connection.release();
    }  
})


module.exports = router;