"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Room {
        constructor() {
            this.npcs = [];
            this.items = [];
        }
        getName() {
            return this.name;
        }
        getDesc() {
            return this.desc;
        }
        getNPC() {
            let temp = "";
            this.npcs.forEach(character => {
                temp += character.getName() + ", ";
            });
            temp = temp.substring(0, temp.length - 2);
            return temp;
        }
        setNPC(_npc) {
            this.npcs.push(_npc);
        }
        getItem() {
            let temp = "";
            this.items.forEach(item => {
                temp += item.getName() + ", ";
            });
            temp = temp.substring(0, temp.length - 2);
            console.log(temp);
            console.log(temp.length);
            return temp + ". ";
        }
        setItem(_item) {
            this.items.push(_item);
        }
    }
    TextAdventure.Room = Room;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Room.js.map