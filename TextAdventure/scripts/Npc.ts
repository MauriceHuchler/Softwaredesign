namespace TextAdventure {
    export class Npc extends Character {
        public dialog:string[];
        public id: number;
        public likesyou: boolean;
        public isTrue: boolean;

        getDialog(): string{
            if (this.likesyou == true) {
                return this.dialog[0];
            }
            else{
                return this.dialog[1];
            }
            
        }

        observer(_id:number):void{
            return null;
        }
    }
}