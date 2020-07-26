"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Item {
        getName() {
            return this.name;
        }
        observer() {
            if (this.position == this.destination) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    TextAdventure.Item = Item;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Item.js.map