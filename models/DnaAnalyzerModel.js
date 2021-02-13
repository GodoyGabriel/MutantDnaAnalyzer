const logger = require("../utils/logger");

class DnaAnalyzer {
  /**
   * Investigate if it is human or mutant
   * @param {object} req params
   * @return {object} Analyze response
   **/
  isMutant = async (req) => {
    //const dna = ["atgcga", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
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
        if (dnaMutantFind > 1) {
          dnaAnalyzeRes = {
            status: 200,
          };
          logger.info(`Is Mutant with dna matches: ${dnaMutantFind}`);
        } else {
          dnaAnalyzeRes = {
            status: 403,
          };
          logger.info("Is Human");
        }
      })
      .catch((error) => {
        console.log("error", error);
        dnaAnalyzeRes = {
          status: 400,
        };
      });
    return dnaAnalyzeRes;
  };

  /**
   * Find mutant dna matches in rows and columns
   * @param {Array} dna Dna to analyze
   * @return {Object} object with rows array and mutant matches found
   **/
  analyzeRowsAndCols = async (dna) => {
    let result = {
      rows: [],
      dnaMutantFind: 0,
    };
    let col = [];
    let maxLength = 0;
    let patron = /[^ATCG]/;
    if(!Array.isArray(dna) || dna.length === 0){
      throw 'Not an array or is empty';
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
      if (patron.test(item) || item === '') {
        const error = "Character not allowed";
        throw error;
      }
      const charactArray = item.split("");
      if (maxLength === 0) {
        maxLength = charactArray.length;
      }
      if (charactArray.length !== maxLength) {
        const error = `Error in the number of characters: ${charactArray.length}`;
        throw error;
      } else {
        result.rows.push(charactArray);
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
   * Search for mutant dna matches
   * @param {String} segment dna segment
   * @return {Boolean} mutant matches found
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
   * Find mutant dna matches in all diagonals
   * @param {Array} array dna
   * @param {Number} dnaMutantFind mutant matches found
   * @return {Number} mutant matches found
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
}

module.exports = new DnaAnalyzer();
