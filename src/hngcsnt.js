
const han_char = {
  start     : 44032,
  end       : 55199,
  consonant : [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
                "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ],
  vowel     : [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ",
                "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ],
  lastcon   : [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
              "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ],
};


const charmap = {
  'ㄱ' : 'g',
  'ㄴ' : 'n',
  'ㄷ' : 'd',
  'ㄹ' : 'l',
  'ㅁ' : 'm',
  'ㅂ' : 'b',
  'ㅅ' : 's',
//'ㅇ' : ''
  'ㅈ' : 'j',
  'ㅊ' : 'c',
  'ㅋ' : 'k',
  'ㅌ' : 't',
  'ㅍ' : 'p',
  'ㅎ' : 'h',
  'ㅏ' : 'a',
  'ㅑ' : 'y',
  'ㅓ' : 'u',
  'ㅕ' : 'y',
  'ㅗ' : 'o',
  'ㅛ' : 'y',
  'ㅜ' : 'u',
  'ㅠ' : 'y',
  'ㅡ' : 'u',
  'ㅣ' : 'i',
  'ㅐ' : 'a',
  'ㅒ' : 'y',
  'ㅔ' : 'e',
  'ㅖ' : 'y',
  'ㅘ' : 'w',
  'ㅙ' : 'w',
  'ㅚ' : 'w',
  'ㅝ' : 'w',
  'ㅞ' : 'w',
  'ㅟ' : 'w',
  'ㅢ' : 'e',
}

function is_hangul_index (code) {
  return (han_char.start <= code && code <= han_char.end);
}

module.exports.get = function(text){

  const textarr = text.split('').map(function(c){

    const code  = c.charCodeAt(0);
    
    if(is_hangul_index(code)) {

      const index = code - han_char.start;
      const head  = index % 28;
      const body  = ((index - head) / 28 ) % 21;
      const tail  = ( ( (index - head) / 28 ) - body ) / 21;
      
      const result = {
        original  : c,
        consonant : han_char.consonant[tail],
        vowel     : han_char.vowel[body],
        lastcon   : han_char.lastcon[head],
      };
      
      if(result.consonant in charmap){
        result.meta = charmap[result.consonant];
      }
      if(result.consonant === 'ㅇ'){
        result.meta = charmap[result.vowel];
      }
      //console.log(result.consonant, result.meta)
      
      return result;

    } else {

      return {
        original  : c,
        consonant : '',
        vowel     : '',
        lastcon   : '',
      };
    }
  });
  return textarr;
};
