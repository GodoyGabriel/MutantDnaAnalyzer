const DnaAnalyzer = require("../models/DnaAnalyzerModel");

class DnaController {
  /**
   * @description Analyze DNA to know if it is mutant or human
   * @return {object} Result of the analysis
   **/
  isMutant = async (req, res) => {
    let response = await DnaAnalyzer.isMutant(req);
    return res.status(response.status).json(response.data);
  };

  /**
   * @description Get the number of humans, mutants and the ratio
   * @return {object} Statistics
   **/
  dnaResults = async (req, res) => {
    let response = await DnaAnalyzer.getStatistics();
    return res.status(response.status).json(response.statistics);
  };
}

module.exports = new DnaController();
