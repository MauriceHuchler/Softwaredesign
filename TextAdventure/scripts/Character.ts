namespace TextAdventure {
    export class Character {
        public name: string;
        public health: number;
        public inventory: Item[];
        public position: number[];

        getName(): string {
            return this.name;
        }

        setName(_name: string): void {
            this.name = _name;
        }

        getInventory(): string {
            let temp: string;
            this.inventory.forEach(item => {
                temp += item.getName + ", ";
            });
            temp.slice(temp.length - 2, temp.length);
            return temp;
        }
    }
}