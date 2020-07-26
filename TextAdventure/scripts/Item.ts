namespace TextAdventure {
    export class Item {
        public name: string;
        public id: number;
        public position: number;
        public destination: number;



        getName(): string {
            return this.name;
        }

        observer(): boolean {
            if (this.position == this.destination) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}