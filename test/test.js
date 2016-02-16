const _ = require('underscore');
const assert = require('assert');
const expect = require('chai').expect;
const hnc = require('../src/hngcsnt.js');

const testcase = [
  { sentence : '각퉵후아회ABCDabcd', expect : 'ㄱㅌㅎㅇㅎ', expect2: 'ㅏㅞㅜㅏㅚ' },
  { sentence : '히히덜덜털후', expect : 'ㅎㅎㄷㄷㅌㅎ', expect2: 'ㅣㅣㅓㅓㅓㅜ' },
];

testcase.forEach(function(tcase) {

  const rs = hnc.get(tcase.sentence);

  const msg = ['\ntest case : ', tcase.sentence, '\nexpect val: ', tcase.expect].join('');
  const msg2 = ['\ntest case : ', tcase.sentence, '\nexpect val: ', tcase.expect2].join('');

  describe(msg, function() {
    it('초성 분리 테스트', function() {
      const cho = _.pluck(rs, 'consonant').join('');
      expect(tcase.expect).equal(cho);
    });
  });
  
  describe(msg2, function() {
    it('중성 분리 테스트', function() {
      const rs = hnc.get(tcase.sentence);
      const cho = _.pluck(rs, 'vowel').join('');
      expect(tcase.expect2).equal(cho);
    });
  });
  
  
});
