"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Character {
        constructor() {
            this.inventory = [];
        }
        getName() {
            return this.name;
        }
        setName(_name) {
            this.name = _name;
        }
        getInventory() {
            let temp = "";
            let output = "";
            if (this.inventory.length > 0) {
                this.inventory.forEach(item => {
                    temp += item.getName() + ", ";
                });
                temp.slice(temp.length - 2, temp.length);
                output = "you have: " + temp;
            }
            else {
                output = "you have no items";
            }
            return output;
        }
    }
    TextAdventure.Character = Character;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Character.js.map