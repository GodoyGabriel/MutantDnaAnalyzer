const dna = require("../models/DnaAnalyzerModel");;

class DnaController {
  isMutant = async (req, res) => {
    let response = await dna.isMutant(req);
    return res.sendStatus(response.status);
  };
}

module.exports = new DnaController();