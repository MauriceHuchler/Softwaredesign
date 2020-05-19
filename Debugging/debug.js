"use strict";
var debuggin;
(function (debuggin) {
    console.log("das ist ein Log");
    console.error("das ist ein Fehler");
    console.info("das info");
    console.warn("WARNUNG!!!!!!!!!");
    let s = "hi";
    let o = { firstnaame: "Egzon", lastname: "Demaj", age: 25 };
    console.log(o);
    let h = document.querySelector("h1");
    console.time(s);
    console.timeEnd();
    console.log(h);
})(debuggin || (debuggin = {}));
//# sourceMappingURL=debug.js.map