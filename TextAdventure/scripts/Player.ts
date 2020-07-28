namespace TextAdventure {
    export class Player extends Character {
        canDrop: boolean;
        canSpeak: boolean;
        canTake: boolean;
        canGive: boolean;
        
        constructor() {
            super();
            this.position = 0;
            

        }

        commands(): string {
            let output: string = "";

            output += "walk(w) direction, ";
            output += "inventory(i), ";
            output += "look(l), ";
            if (this.canTake == true) {
                output += "take(t) item, ";
            }
            if (this.canDrop == true) {
                output += "drop(d) item, ";
            }
            if (this.canSpeak == true) {
                output += "speak(s), ";
            }
            if (this.canGive == true){
                output += "give(s) person item, ";
            }
            output += "commands(c), ";
            output += "quit(q)";

            return output;
        }


    }
}

