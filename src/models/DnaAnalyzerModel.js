const logger = require("../utils/logger");
const AnalysisResult = require("./AnalysisResultModel");

class DnaAnalyzer {
  /**
   * @description Investigate if it is human or mutant
   * @param {object} req Params
   * @return {object} Analyze response
   **/
  isMutant = async (req) => {
    const dna = req.body.dna;
    let rows = [];
    let dnaAnalyzeRes = "";
    let dnaMutantFind = 0;
    await this.analyzeRowsAndCols(dna)
      .then(async (res) => {
        rows = res.rows;
        dnaMutantFind = res.dnaMutantFind;
        dnaMutantFind =
          rows.length > 0 && dnaMutantFind < 2
            ? await this.findInDiagonals(rows, dnaMutantFind)
            : dnaMutantFind;
        const isMutant = dnaMutantFind > 1;
        this.saveResultInDB(isMutant, dna.toString());
        if (isMutant) {
          dnaAnalyzeRes = {
            status: 200,
            data: 'Is Mutant'
          };
          logger.info("Is Mutant");
        } else {
          dnaAnalyzeRes = {
            status: 403,
            data: 'Is Human'
          };
          logger.info("Is Human");
        }
      })
      .catch((error) => {
        console.log("error", error);
        dnaAnalyzeRes = {
          status: 400,
          data: error
        };
      });
    return dnaAnalyzeRes;
  };

  /**
   * @description Find mutant dna matches in rows and columns
   * @param {Array} dna Dna to analyze
   * @return {Object} Object with rows array and mutant matches found
   **/
  analyzeRowsAndCols = async (dna) => {
    let result = {
      rows: [],
      dnaMutantFind: 0,
    };
    let col = [];
    let maxLength = 0;
    if (!Array.isArray(dna) || dna.length === 0) {
      throw "Not an array or is empty.";
    }
    if(dna.length !== dna[0].length){
      throw "DNA does not form an NxN table";
    }
    for (let i = 0; i < dna.length; i++) {
      let item = dna[i];
      item = item.toUpperCase();
      let dnaMutantMatches = await this.findDnaMutant(item);
      if (dnaMutantMatches !== 0) {
        result.dnaMutantFind += dnaMutantMatches;
      }
      if (result.dnaMutantFind > 1) {
        return result;
      }
      const charactArray = item.split("");
      if (maxLength === 0) {
        maxLength = charactArray.length;
      }
      const error = await this.errorHandling(item, maxLength);
      if(error === '') {
        result.rows.push(charactArray);
      } else {
        throw error;
      }
      for (let j = 0; j < charactArray.length; j++) {
        const charact = charactArray[j];
        col[j] = col[j] ? col[j] + charact : charact;
        let matchesInCol = col[j].length > 3 ? this.findDnaMutant(col[j]) : 0;
        if (matchesInCol !== 0) {
          col[j] = "";
          result.dnaMutantFind += matchesInCol;
        }
        if (result.dnaMutantFind > 1) {
          break;
        }
      }
    }
    return result;
  };

  /**
   * @description Search for mutant dna matches
   * @param {String} segment Dna segment
   * @return {Boolean} Mutant matches found
   **/
  findDnaMutant = (segment) => {
    const conditions = ["CCCC", "TTTT", "AAAA", "GGGG"];
    let dnaMutantMatches = 0;
    conditions.forEach((condition) => {
      let matches = false;
      do {
        if (segment.includes(condition)) {
          segment = segment.replace(condition, "");
          matches = true;
          dnaMutantMatches++;
        } else {
          matches = false;
        }
      } while (matches);
    });
    return dnaMutantMatches;
  };
  /**
   * @description Find mutant dna matches in all diagonals
   * @param {Array} array Dna
   * @param {Number} dnaMutantFind Mutant matches found
   * @return {Number} Mutant matches found
   **/
  findInDiagonals = (array, dnaMutantFind) => {
    let Ylength = array.length;
    let Xlength = array[0].length;
    let maxLength = Math.max(Xlength, Ylength);
    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
      let temp1 = "";
      let temp2 = "";
      for (let y = Ylength - 1; y >= 0; --y) {
        let x = k - y;
        if (x >= 0 && x < Xlength) {
          temp1 += array[y][x];
        }
        let f = k - (Ylength - y);
        if (f >= 0 && f < Xlength) {
          temp2 += array[y][f];
        }
      }
      if (temp1.length > 3) {
        dnaMutantFind += this.findDnaMutant(temp1);
      }
      if (temp2.length > 3) {
        dnaMutantFind += this.findDnaMutant(temp2);
      }
      if (dnaMutantFind > 1) {
        break;
      }
    }
    return dnaMutantFind;
  };
  /**
   * @description Save the analysis result if the record does not yet exist in the database
   * @param {Boolean} isMutant
   * @param {String} dna
   **/
  saveResultInDB = async (isMutant, dna) => {
    const newMutant = new AnalysisResult({ isMutant, dna });
    const existDnaInDB = await AnalysisResult.find({ dna });
    if (existDnaInDB.length === 0) {
      newMutant
        .save()
        .then((res) => {
          logger.info("Successfully saved in DB");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      logger.info('This dna already exists in the database');
    }
  };

  /**
   * @description Get the number of mutants and humans from the database and get a ratio
   **/
  getStatistics = async () => {
    const count_mutant_dna = (await AnalysisResult.find({ isMutant: true }))
      .length;
    const count_human_dna = (await AnalysisResult.find({ isMutant: false }))
      .length;
    let ratio = Number(Number(count_mutant_dna / count_human_dna).toFixed(2));
    const response = {
      status: 200,
      statistics: {
        count_mutant_dna,
        count_human_dna,
        ratio,
      },
    };
    logger.info(JSON.stringify(response));
    return response;
  };

  /**
   * @description Error handling
   * @param {String} item Dna segment
   * @param {Number} maxLength Maximum size of DNA fragment
   * @return {String} Error found
   **/
  errorHandling = (item, maxLength) => {
    const patron = /[^ATCG]/;
    item = item.toUpperCase();
    let error = '';
    if (patron.test(item) || item === "") {
      error = `Character not allowed: ${item}`;
      return error;
    }
    if(item.length < 4) {
      error = `The minimum size of the DNA fragment has to be 4`;
      return error;
    }
    if (maxLength && item.length !== maxLength) {
      error = `The size of the DNA fragments do not match`;
      return error;
    }
    return error;
  }
}

module.exports = new DnaAnalyzer();
