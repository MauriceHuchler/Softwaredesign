namespace TextAdventure {
    export class Npc extends Character {
        public dialog:string;
        public id: number;
        public likesyou: boolean;
        public isTrue: boolean;

        getDialog(): string{
            return this.dialog;
        }

        observer(_id:number):void{
            return null;
        }
    }
}