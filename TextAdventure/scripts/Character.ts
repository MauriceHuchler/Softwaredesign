namespace TextAdventure {
    export class Character {
        public name: string;
        public health: number;
        public inventory: Item[];
        public position: number;

        constructor() {
            this.inventory = [];
        }

        getName(): string {
            return this.name;
        }

        setName(_name: string): void {
            this.name = _name;
        }

        getInventory(): string {
            let temp: string = "";
            let output: string = "";
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
}