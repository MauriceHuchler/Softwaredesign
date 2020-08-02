namespace TextAdventure {
    export class Room {
        name: string;
        id: number;
        connectedTo: number[];
        desc: string;
        hasSeen: boolean;
        npcs: Npc[];
        items: Item[];

        constructor() {
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

            temp = temp.substring(0, temp.length - 2);
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

            temp = temp.substring(0, temp.length - 2);
            return temp + ". ";
        }

        setItem(_item: Item): void {
            this.items.push(_item);
        }
    }
}