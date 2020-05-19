namespace debuggin {
console.log("das ist ein Log");
console.error("das ist ein Fehler");
console.info("das info");
console.warn("WARNUNG!!!!!!!!!");
let s: string = "hi";

let o: Object = {firstnaame: "Egzon", lastname:"Demaj", age: 25};

console.log(o);

let h:HTMLHeadElement = document.querySelector("h1");
console.time(s);
console.timeEnd();
console.log(h);
}
