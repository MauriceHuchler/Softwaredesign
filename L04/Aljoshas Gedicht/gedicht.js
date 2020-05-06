"use strict";
var Gedicht;
(function (Gedicht) {
    let subjects = ["Christoph Müller", "Jirka", "Jesus", "Ron", "Dumbledore"];
    let verbs = ["braut", "malt", "zertört", "liebt", "hasst"];
    let objects = ["Zaubertränke", "Github", "Typescript", "Softwaredesign", "Maurice"];
    let verse = [];
    while (subjects.length != 0) {
        verse.push(GetVerse());
    }
    for (let i = 0; i < verse.length; i++) {
        console.log(verse[i]);
    }
    function GetVerse() {
        let verse2;
        let index = Math.floor(Math.random() * subjects.length);
        console.log("index " + index);
        verse2 = subjects.splice(index, 1) + " ";
        verse2 = verse2 + verbs.splice(index, 1) + " ";
        verse2 = verse2 + objects.splice(index, 1);
        return verse2;
    }
})(Gedicht || (Gedicht = {}));
//# sourceMappingURL=gedicht.js.map