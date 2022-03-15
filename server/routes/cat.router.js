const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

// Add a cat to the database
router.post('/', (req, res) => {
 console.log('req.body is', req.body);
 console.log('req.user is', req.user);
 
 
 let queryText = `
 INSERT INTO "cats" ("name", "age", "is_neutered", "current_weight", "user_id")
 VALUES ($1, $2, $3, $4, $5);
 `;

 let valueArray = [req.body.name, req.body.age, req.body.is_neutered, req.body.current_weight, req.user.id]

 if (req.isAuthenticated()){
     pool.query(queryText, valueArray)
     .then((results) => {
         res.sendStatus(200);
     })
     .catch((error) => {
         console.log('Error in POSTing a cat', error);
         res.sendStatus(500);
     });
 } else {
     res.sendStatus(403);
 }
});

module.exports = router;
