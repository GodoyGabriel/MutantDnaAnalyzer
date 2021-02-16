let express = require('express');
const router = express.Router();
const DnaController = require("../controllers/DnaController");


router.get('/stats', DnaController.dnaResults);
router.post('/mutant', DnaController.isMutant);

module.exports = router;