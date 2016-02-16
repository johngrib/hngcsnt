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
      
      return {
        original  : c,
        consonant : han_char.consonant[tail],
        vowel     : han_char.vowel[body],
        lastcon   : han_char.lastcon[head],
      };

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
