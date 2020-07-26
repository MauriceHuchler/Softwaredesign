"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Npc extends TextAdventure.Character {
        getDialog() {
            if (this.likesyou == true) {
                return this.dialog[0];
            }
            else {
                return this.dialog[1];
            }
        }
        observer(_id) {
            return null;
        }
    }
    TextAdventure.Npc = Npc;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Npc.js.map