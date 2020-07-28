"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Item {
        getName() {
            return this.name;
        }
        observerDestination() {
            if (this.position == this.destination) {
                return true;
            }
            else {
                return false;
            }
        }
        observerPickup() {
            if (this.canPickup == true) {
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