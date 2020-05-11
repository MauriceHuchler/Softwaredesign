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
        let index2 = Math.floor(Math.random() * subjects.length);
        let index3 = Math.floor(Math.random() * subjects.length);
        verse2 = subjects.splice(index, 1) + " ";
        verse2 = verse2 + verbs.splice(index2, 1) + " ";
        verse2 = verse2 + objects.splice(index3, 1);
        return verse2;
    }
})(Gedicht || (Gedicht = {}));
//# sourceMappingURL=gedicht.js.map