const _ = require('underscore');
const assert = require('assert');
const expect = require('chai').expect;
const hnc = require('../src/hngcsnt.js');
const cmap = require('../src/charmap.js').charmap;

const testcase = [
  { sentence : '각퉵후아회ABCDabcd', expect : 'ㄱㅌㅎㅇㅎ',  expect2: 'ㅏㅞㅜㅏㅚ', expect3: 'gthah' },
  { sentence : '히히덜덜털후',       expect : 'ㅎㅎㄷㄷㅌㅎ', expect2: 'ㅣㅣㅓㅓㅓㅜ', expect3: 'hhddth' },
  { sentence : '캷a밠',            expect : 'ㅋㅂ',      expect2: 'ㅑㅏ', expect3: 'kb' },
  { sentence : '에야외시',          expect : 'ㅇㅇㅇㅅ',   expect2: 'ㅔㅑㅚㅣ', expect3: 'eyws'},
  { sentence : '아이우에오야',          expect : 'ㅇㅇㅇㅇㅇㅇ',   expect2: 'ㅏㅣㅜㅔㅗㅑ', expect3: 'aiueoy'},
];

testcase.forEach(function(tcase) {

  const rs = hnc.get(tcase.sentence);
  console.log(rs);

  const msg = ['\ntest case : ', tcase.sentence, '\nexpect val: ', tcase.expect].join('');
  describe(msg, function() {
    it('초성 분리 테스트', function() {
      const cho = _.pluck(rs, 'consonant').join('');
      expect(tcase.expect).equal(cho);
    });
  });

  const msg2 = ['\ntest case : ', tcase.sentence, '\nexpect val: ', tcase.expect2].join('');
  describe(msg2, function() {
    it('중성 분리 테스트', function() {
      const rs = hnc.get(tcase.sentence);
      const cho = _.pluck(rs, 'vowel').join('');
      expect(tcase.expect2).equal(cho);
    });
  });
  
  const msg3 = ['\ntest case : ', tcase.sentence, '\nexpect val: ', tcase.expect3].join('');
  describe(msg3, function() {
    it('메타폰 추출 테스트', function() {
      const rs = hnc.get(tcase.sentence);
      const cho = _.pluck(rs, 'meta').join('');
      expect(tcase.expect3).equal(cho);
    });
  });
});
