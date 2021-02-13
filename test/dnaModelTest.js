const assert = require('chai').assert;

const DnaAnalyzer = require('../models/DnaAnalyzerModel');

describe('DnaAnalyzerModel', () => {
  describe('isMutant', () => {
    it('Find dna mutant matches in dna fragment', (done) => {
      const dnaFragment = 'AAAGGGTTTTAC';
      const dnaMutantMatches = DnaAnalyzer.findDnaMutant(dnaFragment);   
      assert.isNumber(dnaMutantMatches)
      done();
    })

    it('Search for mutant dna matches in rows and columns', (done) => {
      const dna = ["atgcga", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
      DnaAnalyzer.analyzeRowsAndCols(dna).then(res => {
        assert.containsAllKeys(res, ['rows', 'dnaMutantFind'])
        done();
      }).catch(error => {
        console.log('error', error);
        done();
      })
    })

    it('Search for mutant dna matches in all diagonals', (done) => {
      const dnaArray = ["atgcga", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
      let auxDna = [];
      const dnaMutantFind = 1;
      dnaArray.forEach(fragment => {
        auxDna.push(fragment.split(''));
      })
      const res = DnaAnalyzer.findInDiagonals(auxDna, dnaMutantFind)
      assert.isNumber(res);
      done();
    })
  })
})

