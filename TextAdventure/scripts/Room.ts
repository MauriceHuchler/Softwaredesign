namespace TextAdventure {
    export class Room {
        public name: string;
        id: number;
        connectedTo: number[];
        desc: string;
        hasSeen: boolean;
        npcs: Npc[];
        items: Item[];

        constructor(_name: string, _id: number, _connectedTo: number[], _desc: string, _hasSeen: boolean) {
            this.name = _name;
            this.id = _id;
            this.connectedTo = _connectedTo;
            this.desc = _desc;
            this.hasSeen = _hasSeen;
            this.npcs = [];
            this.items = [];
        }

        getName(): string {
            return this.name;
        }

        getDesc(): string {
            return this.desc;
        }

        getNPC(): string {
            let temp: string = "";
            this.npcs.forEach(character => {
                temp += character.getName() + ", ";
            });

            temp.slice(temp.length - 2, temp.length);
            return temp;
        }

        setNPC(_npc: Npc): void {
            this.npcs.push(_npc);
        }

        getItem(): string {
            let temp: string = "";
            this.items.forEach(item => {
                temp += item.getName() + ", ";
            });

            temp.slice(temp.length - 2, temp.length);
            return temp;
        }

        setItem(_item: Item): void {
            this.items.push(_item);
        }
    }
}