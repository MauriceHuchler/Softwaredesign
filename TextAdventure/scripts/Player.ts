namespace TextAdventure {
    export class Player extends Character {
        public canDrop: boolean;
        public canSpeak: boolean;
        public canTake: boolean;

        commands(): string {
            let output: string;

            output += "walk(w) direction, ";
            output += "inventory(i), ";
            output += "look(l), ";
            if (this.canTake == true) {
                output += "take(t) item, ";
            }
            if (this.canDrop == true){
                output += "drop(d) item, ";
            }
            if( this.canSpeak == true){
                output += "speak(s), ";
            }
            output += "commands(c), ";
            output += "quit(q)";

            return output;
        }

        
    }
}

