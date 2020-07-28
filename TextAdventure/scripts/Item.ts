namespace TextAdventure {
    export class Item {
        name: string;
        id: number;
        position: number;
        destination: number;
        canPickup: boolean;

      
        getName(): string {
            return this.name;
        }

        observerDestination(): boolean {
            if (this.position == this.destination) {
                return true;
            }
            else {
                return false;
            }
        }

        observerPickup(): boolean {
            if ( this.canPickup == true){
                return true;
            }
            else{
                return false;
            }
        }
    }
}