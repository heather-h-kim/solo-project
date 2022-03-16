const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// calculate the goal_weight column first, then calculate the recommended daily calorie and update the total_daily_cal column
router.put('/:id', async (req, res) => {
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

            const firstArray = [req.body.goal_weight, req.params.id, req.user.id]

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



            const secondArray = [req.params.id, req.user.id];

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
})

module.exports = router;
