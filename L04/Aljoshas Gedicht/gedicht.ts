namespace Gedicht{

    let subjects: string[] = ["Christoph Müller", "Jirka", "Jesus", "Ron", "Dumbledore"];
    let verbs: string[] = ["braut", "malt", "zertört", "liebt", "hasst"];
    let objects: string[] = ["Zaubertränke", "Github", "Typescript", "Softwaredesign", "Maurice"];
    let verse: string[] = [];

    while (subjects.length != 0) {
       verse.push(GetVerse()); 
    }

    for (let i: number = 0;  i < verse.length; i++) {
        console.log(verse[i]);
    }   

    function GetVerse(): string {
        let verse2: string;
        let index: number = Math.floor(Math.random() * subjects.length);
        console.log("index " + index);
        verse2 = subjects.splice(index, 1) + " ";
        verse2 = verse2 + verbs.splice(index, 1) + " ";
        verse2 = verse2 + objects.splice(index, 1);


        return verse2;
    }

}