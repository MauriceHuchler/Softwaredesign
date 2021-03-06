"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Player extends TextAdventure.Character {
        constructor() {
            super();
        }
        commands() {
            let output = "";
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
            if (this.canGive == true) {
                output += "give(s) person item, ";
            }
            output += "commands(c), ";
            output += "quit(q)";
            return output;
        }
    }
    TextAdventure.Player = Player;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Player.js.map