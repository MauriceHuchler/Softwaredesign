namespace TextAdventure {
    export class Item {
        public name: string;
        public id: number;
        public position: number;
        public destination: number;

        constructor(_name: string, _id: number, _position: number, _destination: number) {
            this.name = _name;
            this.id = _id;
            this.position = _position;
            this.destination = _destination;
        }

        getName():string{
            return this.name;
        }

        observer():void{
            
        }
    }
}