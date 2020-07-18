namespace TextAdventure {
    export class Room {
        name: string;
        id: number;
        connectedTo: number[];
        desc: string;
        hasSeen: boolean;
        npc: Npc[];
        items: Item[];

        constructor() {
            this.name = name;
            this.id = 3;
        }

        getName(): string {
            return null;
        }

        getDesc(): string {
            return null;
        }

        getNPC(): void {
            return null;
        }

    }
}