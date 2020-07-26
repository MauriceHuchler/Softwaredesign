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
            if (this.inventory.length > 0) {
                this.inventory.forEach(item => {
                    temp += item.getName() + ", ";
                });
                temp.slice(temp.length - 2, temp.length);
                return "you have: " + temp;
            }
            else {
                return "you have no items";
            }
        }
    }
    TextAdventure.Character = Character;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Character.js.map