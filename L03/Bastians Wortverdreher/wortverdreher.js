"use strict";
var main;
(function (main) {
    let sentence;
    sentence = prompt("Ein Satz:du sagst nichts");
    console.log(invertEachWordLetters(sentence));
    console.log(reverseSentenceWords(sentence));
    console.log(reverseWholeString(sentence));
    function invertEachWordLetters(sentence) {
        let _to = sentence;
        let tempStringArray;
        tempStringArray = _to.split(" ");
        tempStringArray.forEach((element, index, array) => {
            array[index] = reverseWholeString(element);
        });
        let resultString;
        resultString = tempStringArray.join(" ");
        return resultString;
    }
    function reverseSentenceWords(sentence) {
        let _to = sentence;
        let tempWordsArray;
        tempWordsArray = _to.split(" ");
        tempWordsArray = tempWordsArray.reverse();
        let resultString;
        resultString = tempWordsArray.join(" ");
        return resultString;
    }
    function reverseWholeString(sentence) {
        let _to = sentence;
        let invertedString;
        invertedString = _to.split("").reverse().join("");
        return invertedString;
    }
})(main || (main = {}));
//# sourceMappingURL=wortverdreher.js.map