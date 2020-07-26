namespace TextAdventure {
    const output: HTMLDivElement = document.getElementById("output");
    const input: HTMLDivElement = document.getElementById("input");

    let menu: string = "what do you want to do? </br> Start(s), Load(l) or Quit(q)?";
    output.innerHTML = menu;

    input.click();

    var player: Player = new Player();

    function startGame(): void {
        const filename: string = "mainsave.json";

        load(filename);

        while (true) {
            playerController();
        }
    }

    function load(_filename: string): Promise<RootObject> {
        console.log("start fetch");

        let response: Response = fetch(_filename);
        console.log(response);
        let json: Object = JSON.parse(text);

        let items: Item[];
        let npcs: NPC[];
        let rooms:Room[];
    }

    class RootObject{
        rooms:Room[];
        npcs: Npc[];
        items: Item[];
    }
    function sort(): void {

    }

    function assignRoom(): void {

    }



    let counter = 1;
    function playerController(): void {
        let answerMenu: string[];

        setBool();

        if (counter > 0) {
            console.log(look());
            counter -= 1;
        }

        console.log(player.commands());
        answerMenu = prompt("was machen?").split(" ");
        switch (answerMenu[0][0].toLowerCase()) {
            case "w": {
                walk(answerMenu[1]);
            }

            case "i": {
                player.getInventory();
            }

            case "s": {
                speak(answerMenu[1]);
            }

            case "t": {
                take(answerMenu[1]);
            }

            case "d": {
                drop(answerMenu[1]);
            }

            case "l": {
                look();
            }

            case "q": {
                quit();
            }

            case "c": {
                player.commands();
            }

        }
    }

    function look(): string {
        let wholeRoom: string;
        let playerRoom: Room;

        //set playerRoom to current room
        //!!!!!! AUF DOKUMENT AKTUALISIEREN!!!!!!!!!
        wholeRoom += "You are at the " + playerRoom.getDesc();
        if (playerRoom.getNPC.length != 0) {
            wholeRoom += playerRoom.getNPC() + " ";
        }
        else {
            wholeRoom += "there is no one, ";
        }
        if (playerRoom.getItem.length != 0) {
            wholeRoom += playerRoom.getItem() + " ";
        }
        else {
            wholeRoom += "there are no items.";
        }

        return wholeRoom;
    }


    function setBool(): void {
        let playerRoom: Room;


        if (playerRoom.getItem().length != 0) {
            player.canTake = true;
        }
        else {
            player.canTake = false;
        }
        if (player.inventory.length != 0) {
            player.canDrop = true;
        }
        else {
            player.canDrop = false;
        }
        if (playerRoom.getNPC.length != 0) {
            player.canSpeak = true;
        }
        else {
            player.canSpeak = false;
        }

    }

    function walk(_direction: string): void {
        let direction: string = _direction;
        let playerRoom: Room;

        playerRoom = rooms.find(npc => npc )

        // find room with id and set to playerRoom

        switch(direction) {
            case "n": {
                if(){}
                else{}
            }

            case "e": {

            }

            case "s": {

            }

            case "w": {

            }
        }
    }
}

