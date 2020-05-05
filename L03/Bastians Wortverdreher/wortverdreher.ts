namespace main {
    let sentence: string;
    sentence = prompt("GIB SATZ!!!! OMNOMNOMNOM:");

    console.log(invertEachWordLetters(sentence));
    console.log(reverseSentenceWords(sentence));
    console.log(reverseWholeString(sentence));



    function invertEachWordLetters(sentence: string): string {
        let _to: string = sentence;
        let tempStringArray: string[];
        tempStringArray = _to.split(" ");
        tempStringArray.forEach((element, index, array) => {
            array[index] = reverseWholeString(element);
        });

        let resultString: string;
        resultString = tempStringArray.join(" ");
        return resultString;

    }

    function reverseSentenceWords(sentence: string): string {
        let _to: string = sentence;
        let tempWordsArray: string[];
        tempWordsArray = _to.split(" ");
        tempWordsArray = tempWordsArray.reverse();
        let resultString: string;
        resultString = tempWordsArray.join(" ");

        return resultString;

    }

    function reverseWholeString(sentence: string): string {
        let _to: string = sentence;
        let invertedString: string;
        invertedString = _to.split("").reverse().join("");

        return invertedString;
    }



}

