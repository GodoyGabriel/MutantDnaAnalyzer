let express = require('express');
const router = express.Router();
const dnaController = require("../controllers/dnaController");


router.get('/stats', );
router.post('/mutant', dnaController.isMutant);

module.exports = router;