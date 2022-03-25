const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Fetch all cats of one user 
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

//Fetch one cat 
router.get('/:id', (req, res) => {
    console.log('in cats/GET route to fetch one cat');
    console.log('req.params.id is', req.params.id);


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
        //Get the new cat's ID to post the cat's current weight to the weight table
        const queryText = `
                            INSERT INTO "cats" ("name", "age", "is_neutered", "current_weight", "user_id")
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING "id"; 
                            `;

        const valueArray = [req.body.name, req.body.age, req.body.is_neutered, req.body.current_weight, req.user.id]
        pool.query(queryText, valueArray)
            .then((result) => {
                console.log('new cat id is', result.rows[0].id);
                const createdCatId = result.rows[0].id

                const secondQueryText = `INSERT INTO "weight" ("current_weight", "cat_id")
                                    VALUES ($1, $2);`;
                const secondArray = [req.body.current_weight, createdCatId]
                //Post the cat's weight to the weight table
                pool.query(secondQueryText, secondArray)
                    .then(result => {
                        res.sendStatus(201);
                    }).catch(error => {
                        console.log('error posting to the weight table', error);
                        res.sendStatus(500);
                    })
            }).catch((error) => {
                console.log('error posting a cat');
                res.sendStatus(500);
            })

    } else {
        res.sendStatus(403);
    }
});

//update cat's name and/or age and/or neuter status and/or current weight
router.put('/:id', (req, res) => {
    console.log('in cats/PUT route');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);

    let name = req.body.hasOwnProperty('name');
    let age = req.body.hasOwnProperty('age');
    let neutered = req.body.hasOwnProperty('is_neutered');
    let weight = req.body.hasOwnProperty('current_weight');
    console.log('name is', name);

    if (name) {
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "name" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
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

    } else if (age) {
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "age" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
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

    } else if (neutered) {
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "is_neutered" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
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
    } else if (weight) {
        if (req.isAuthenticated()) {
            const queryText = `UPDATE "cats" SET "current_weight" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
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
    }
})

//calculate daily calorie
router.put('/calorie/:id', async (req, res) => {
    console.log('in cats/PUT route to calculate the daily calorie');
    console.log('req.body is', req.body);
    console.log('req.user is', req.user);
    if (req.isAuthenticated()) {
        try {
            const firstQueryText = `
                                    UPDATE "cats"
                                    SET "goal_weight" = $1
                                    WHERE "id" = $2 AND "user_id" = $3;
                                    `;

            const firstArray = [req.body.goal_weight, req.body.id, req.user.id]

            const secondQueryText = `
                                    UPDATE "cats"
                                    SET 
                                    "total_daily_cal" =  
                                      (SELECT CASE WHEN "current_weight" > "goal_weight" THEN
                                                        (SELECT  
                                                            CASE WHEN "age" = 'adult' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*0.8*("goal_weight"*0.453592)^0.75)   
                                                                   WHEN "age" = 'adult' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*0.8*("goal_weight"*0.453592)^0.75)
                                                                   WHEN "age" = 'kitten' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*2.5*0.8*("goal_weight"*0.453592)^0.75)
                                                                   WHEN "age" = 'kitten' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*2.5*0.8*("goal_weight"*0.453592)^0.75)  
                                                             END 
                                                             FROM "cats" WHERE "id"= $1 AND "user_id" = $2)
                                                   WHEN "current_weight" = "goal_weight" THEN
                                                         (SELECT  
                                                            CASE WHEN "age" = 'adult' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*("goal_weight"*0.453592)^0.75)   
                                                                 WHEN "age" = 'adult' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*("goal_weight"*0.453592)^0.75)
                                                                 WHEN "age" = 'kitten' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*2.5*("goal_weight"*0.453592)^0.75)
                                                                 WHEN "age" = 'kitten' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*2.5*("goal_weight"*0.453592)^0.75)  
                                                            END 
                                                          FROM "cats" WHERE "id"= $1 AND "user_id" = $2)
                                                   WHEN "current_weight" < "goal_weight" THEN
                                                         (SELECT  
                                                            CASE WHEN "age" = 'adult' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*1.8*("goal_weight"*0.453592)^0.75)   
                                                                 WHEN "age" = 'adult' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*1.8*("goal_weight"*0.453592)^0.75)
                                                                 WHEN "age" = 'kitten' AND "is_neutered" = 'neutered' THEN (SELECT 70*1.2*2.5*1.8*("goal_weight"*0.453592)^0.75)
                                                                 WHEN "age" = 'kitten' AND "is_neutered" = 'intact' THEN (SELECT 70*1.4*2.5*1.8*("goal_weight"*0.453592)^0.75)  
                                                            END 
                                                          FROM "cats" WHERE "id"= $1 AND "user_id" = $2)
                                              END
                                             FROM "cats" WHERE "id"= $1 AND "user_id" = $2)
                                             
                                    WHERE "id"= $1 AND "user_id" = $2;`;



            const secondArray = [req.body.id, req.user.id];

            await pool.query(firstQueryText, firstArray);
            await pool.query(secondQueryText, secondArray);
            res.sendStatus(200);
        } catch (error) {
            console.log('error updating daily calorie', error);
            res.sendStatus(500);
        }

    } else {
        res.sendStatus(403);
    }
});

//Update treat % column, calculate calories from treats and calories from food, and update the database accordingly
router.put('/treats/:id', async (req, res) => {
    console.log('in cats/treats/PUT route to calculate the daily calorie');
    console.log('req.body is', req.body);
    console.log('req.body.treat_percentage is', req.body.treat_percentage);

    if (req.isAuthenticated()) {
        try {
            const firstQueryText = `
                                UPDATE "cats"
                                SET "treat_percentage" = $1
                                WHERE "id" = $2 AND "user_id" = $3;
                                `;

            const firstArray = [req.body.treat_percentage, req.body.id, req.user.id];

            const secondQueryText = `
                                UPDATE "cats"
                                SET "treat_cal" = (
                                    SELECT "total_daily_cal"*"treat_percentage"*0.01 
                                    FROM "cats"
                                    WHERE "id" = $1 AND "user_id" = $2),
                                    "food_cal" = (
                                    SELECT "total_daily_cal"*(100-"treat_percentage")*0.01 
                                    FROM "cats"
                                    WHERE "id" = $1 AND "user_id" = $2
                                    )
                                WHERE "id" = $1 AND "user_id" = $2;
                                `;

            const secondArray = [req.params.id, req.user.id];

            await pool.query(firstQueryText, firstArray);
            await pool.query(secondQueryText, secondArray);
            res.sendStatus(200);
        } catch (error) {
            console.log('error updating treat percentage', error);
            res.sendStatus(500);
        }

    } else {
        res.sendStatus(403);
    }
})

//update wet_percentage colum to calculate the amount of wet food and the dry food 
router.put('/wetRatio/:id', (req, res) => {
    console.log('in cats/wetRatio/PUT route to calculate the amount of the wet food and the dry food');
    console.log('req.body is', req.body);
    console.log('req.body.wet_percentage is', req.body.wet_percentage);

    console.log('req.user is', req.user);
    if (req.isAuthenticated()) {
        const queryText = `
                                UPDATE "cats"
                                SET "wet_percentage" = $1
                                WHERE "id" = $2 AND "user_id" = $3;
                                `;

        const valueArray = [req.body.wet_percentage, req.body.cat_id, req.user.id];

        pool.query(queryText, valueArray)
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('error updating wet food percentage', error);
                res.sendStatus(500);
            })

    } else {
        res.sendStatus(403);
    }
});

//add the calorie adjustment direction and percentage and adjust the total daily calorie
router.put('/adj-calorie/:id', async (req, res) => {
    console.log('in cats/adj-calorie/ put route');
    console.log('req.body is', req.body);

    if (req.isAuthenticated()) {

        const connection = await pool.connect();

        try {
            await connection.query('BEGIN');
            const queryText =
            `UPDATE "cats" 
            SET "adjustment_direction" = $1,  "adjustment_percentage" = $2, "treat_percentage" = $3
            WHERE "cats"."id" = $4;`;

            const valueArray = [req.body.adjustment_direction, req.body.adjustment_percentage, req.body.treat_percentage, req.body.cat_id];

            await connection.query(queryText, valueArray);
            const sqlAdjustCalorie =
            `UPDATE "cats"
            SET "total_daily_cal" = 
                (SELECT 
                    CASE WHEN "cats"."adjustment_direction" = 'increase' THEN (SELECT "cats"."total_daily_cal"*(100+"adjustment_percentage")/100 FROM "cats")
                        WHEN "cats"."adjustment_direction" = 'decrease' THEN (SELECT "cats"."total_daily_cal"*(100-"adjustment_percentage")/100 FROM "cats")
                    END
                )
            WHERE "cats"."id" = $1;`;

            const adjCalorieArray = [req.body.cat_id];

            await connection.query(sqlAdjustCalorie, adjCalorieArray);

            const sqlAdjTreatFoodCalories = 
            `UPDATE "cats"
            SET "treat_cal" = (SELECT "total_daily_cal"*"treat_percentage"*0.01 FROM "cats"),
                "food_cal" = (SELECT "total_daily_cal"*(100-"treat_percentage")*0.01 FROM "cats")
            WHERE "cats"."id" = $1;`;

            const adjTreatFoodCalArray = [req.body.cat_id];
            await connection.query(sqlAdjTreatFoodCalories, adjTreatFoodCalArray);

            await connection.query('COMMIT;');
            res.sendStatus(200);

        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log('Transaction error', error);
            res.sendStatus(500);
        } finally {
            connection.release();
        }

    } else {
        res.sendStatus(403);
    }
});


module.exports = router;
