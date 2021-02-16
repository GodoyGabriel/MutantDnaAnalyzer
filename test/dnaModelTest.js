const assert = require('chai').assert;
require(('../src/services/dbConnection'));
const moongose = require('mongoose')
const DnaAnalyzer = require('../src/models/DnaAnalyzerModel');

before(async () => {
  await moongose.connection
})

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

    it('Get the number of mutants and humans from the database and get a ratio', (done) => {
      DnaAnalyzer.getStatistics().then(res => {
        if(res.status === 200) {
          assert.containsAllKeys(res.statistics, ['count_mutant_dna', 'count_human_dna', 'ratio']);
        } else {
          assert.containsAllKeys(res, ['status', 'statistics']);
        }
        done();
      });
    })
  })
  describe('Error handling', () => {
    it('Character min', (done) => {
      const fragment = "at";
      const res = DnaAnalyzer.errorHandling(fragment);
      assert.equal(res, 'The minimum size of the DNA fragment has to be 4')
      done();
    })

    it('Character not allowed', (done) => {
      const fragment = "TGCTH";
      const res = DnaAnalyzer.errorHandling(fragment);
      assert.equal(res, `Character not allowed: ${fragment}`)
      done();
    })

    it('Different DNA fragment size', (done) => {
      const fragment = "TGCTTCC";
      const maxLengthFragment = 5;
      const res = DnaAnalyzer.errorHandling(fragment, maxLengthFragment);
      assert.equal(res, `The size of the DNA fragments do not match`)
      done();
    })
  })
})

