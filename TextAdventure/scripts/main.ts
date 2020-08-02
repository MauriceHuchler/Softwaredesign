namespace TextAdventure {
    const input: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
    const output: HTMLLIElement = document.getElementById("output") as HTMLLIElement;
    const beerboard: HTMLLIElement = document.getElementById("scoreboard") as HTMLLIElement;

    let items: Item[] = [];
    let npcs: Npc[] = [];
    let rooms: Room[] = [];
    let player: Player = new Player();

    let minRoomId: number = 0;
    let maxRoomId: number = 1000;
    let minItemId: number = 1000;
    let maxItemId: number = 2000;

    let isRunning: boolean = true;


    main();

    async function main(): Promise<void> {
        let menu: string = "start (s), load (l), quit (q)";
        output.innerHTML += menu + "<p>";

        let userInput: string = await getUserInput();

        switch (userInput.toLowerCase()) {
            case "s":
            case "start":
                startGame();
                break;
            case "l":
            case "load":
                load("_file");
                break;
            case "q":
            case "quit":
                break;

            default:
                output.innerHTML += "this is no valid command <p>";
                main();
                break;
        }
    }

    async function startGame(): Promise<void> {
        const filename: string = "./JSON/mainsave.json";
        await load(filename);

        while (isRunning == true) {

            await playerController();
        }
    }

    async function load(_filename: string): Promise<void> {
        console.log("start fetch");
        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);

        console.log("ready for sorting");
        sort(json);
        assign();

    }

    function getUserInput(): Promise<string> {
        input.focus();
        return new Promise(function (resolve: (value: string) => void): void {
            const keydownEvent: EventListener = (event: Event) => {
                if ((event as KeyboardEvent).key === "Enter") {
                    const value: string = input.value;
                    input.value = "";
                    input.removeEventListener("keydown", keydownEvent);
                    resolve(value);
                }
            };
            input.addEventListener("keydown", keydownEvent);
        });
    }
    function updateBeerBoard(): void {
        let beer: Item;
        beer = player.inventory.find(item => item.name.toLowerCase() == "beer");
        if (player.inventory.includes(beer)) {
            player.points += 1;
            beerboard.innerHTML = "you drunk " + player.points + " beer";
            player.inventory = player.inventory.filter(item => item.name.toLowerCase() != "beer");
        }
    }

    function sort(_element: Object): void {
        for (let key in _element) {
            if (key == "rooms") {
                let sortedArray: Room[] = new Array();
                for (let room of _element.rooms) {
                    let room1: Room = new Room();
                    room1.id = room.id;
                    room1.name = room.name;
                    room1.connectedTo = room.connectedTo;
                    room1.desc = room.desc;
                    room1.hasSeen = room.hasSeen;
                    sortedArray.push(room1);
                }
                rooms = sortedArray;
            }

            if (key == "npcs") {
                let sortedArray: Npc[] = new Array();
                for (let npc of _element.npcs) {
                    let npc1: Npc = new Npc();
                    npc1.name = npc.name;
                    npc1.id = npc.id;
                    npc1.dialog = npc.dialog;
                    npc1.likesyou = npc.likesyou;
                    npc1.position = npc.position;
                    sortedArray.push(npc1);
                }
                npcs = sortedArray;
            }

            if (key == "items") {
                let sortedArray: Item[] = new Array();
                for (let item of _element.items) {
                    let item1: Item = new Item();
                    item1.name = item.name;
                    item1.id = item.id;
                    item1.position = item.position;
                    item1.destination = item.destination;
                    item1.canPickup = item.canPickup;
                    sortedArray.push(item1);
                }
                items = sortedArray;
            }

            if (key == "player") {
                for (let oldPlayer of _element.player) {
                    player.position = oldPlayer.position;
                    player.points = oldPlayer.points;
                    player.name = oldPlayer.name;
                }

            }
        }

    }

    function assign(): void {

        for (let npc of npcs) {
            if (npc.position >= minRoomId && npc.position < maxRoomId) {
                rooms.find(room => room.id == npc.position).npcs.push(npc);
            }
        }
        for (let item of items) {
            if (item.position >= minRoomId && item.position < maxRoomId) {
                rooms.find(room => room.id == item.position).items.push(item);
            }
            if (item.position > minItemId && item.position < maxItemId) {
                npcs.find(npc => npc.id == item.position).inventory.push(item);
            }
        }
        console.log("everything succesfully assigned");
    }

    async function playerController(): Promise<void> {
        let answerMenu: string[];
        let currentRoom: Room;
        currentRoom = rooms.find(room => room.id == player.position);

        updateBeerBoard();
        setBool();

        if (currentRoom.hasSeen == false) {
            output.innerHTML = look();
            currentRoom.hasSeen = true;
        }
        output.innerHTML += "<p>" + player.commands();
        answerMenu = (await getUserInput()).toLowerCase().split(" ");
        changePicture("");
        switch (answerMenu[0].toLowerCase()) {
            case "w":
            case "walk": {
                output.innerHTML = walk(answerMenu[1]);
                break;
            }

            case "i":
            case "inventory": {
                output.innerHTML = player.getInventory();
                break;
            }

            case "s":
            case "speak": {
                output.innerHTML = speak(answerMenu[1]);
                break;
            }

            case "g":
            case "give": {
                output.innerHTML = give(answerMenu[1], answerMenu[2]);
                break;
            }

            case "t":
            case "take": {
                output.innerHTML = take(answerMenu[1]);
                break;
            }

            case "d":
            case "drop": {
                output.innerHTML = drop(answerMenu[1]);
                break;
            }

            case "l":
            case "look": {
                output.innerHTML = look();
                break;
            }

            case "q":
            case "quit": {
                quit();
                break;
            }

            case "c":
            case "commands": {
                output.innerHTML = player.commands();
                break;
            }
            default:
                output.innerHTML = "there is no such command";
                break;

        }

    }

    function look(): string {
        let wholeRoom: string = "";
        let playerRoom: Room;
        playerRoom = rooms.find(room => room.id == player.position);

        wholeRoom += "You are at" + playerRoom.getDesc();
        if (playerRoom.npcs.length > 0) {
            wholeRoom += " There is " + playerRoom.getNPC();
        }
        else {
            wholeRoom += " There is no one";
        }
        if (playerRoom.items.length > 0) {
            wholeRoom += ". You can see " + playerRoom.getItem();
        }
        else {
            wholeRoom += "There are no items.";
        }

        return wholeRoom;
    }

    function setBool(): void {
        let playerRoom: Room;
        playerRoom = rooms.find(room => room.id == player.position);

        if (playerRoom.items.length > 0) {
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
        if (playerRoom.npcs.length > 0) {
            player.canSpeak = true;
            player.canGive = true;
        }
        else {
            player.canSpeak = false;
            player.canGive = false;
        }


    }

    function walk(_direction: string): string {
        let playerRoom: Room;
        playerRoom = rooms.find(room => room.id == player.position);



        switch (_direction) {

            case "n":
            case "north":
                if (playerRoom.connectedTo[0] >= minRoomId && playerRoom.connectedTo[0] < maxRoomId) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[0]).id;
                    return "you walked north";
                }
                else return "you cant walk north";

            case "e":
            case "east":
                if (playerRoom.connectedTo[1] >= minRoomId && playerRoom.connectedTo[1] < maxRoomId) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[1]).id;
                    return "you walked east";
                }
                else return "you cant walk east";



            case "s":
            case "south":
                if (playerRoom.connectedTo[2] >= minRoomId && playerRoom.connectedTo[2] < maxRoomId) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[2]).id;
                    return "you walked south";
                }
                else return "you cant walk south";




            case "w":
            case "west":
                if (playerRoom.connectedTo[3] >= minRoomId && playerRoom.connectedTo[3] < maxRoomId) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[3]).id;
                    return "you walked west";
                }
                else return "you cant walk this west";
            default:
                return "you cant walk this way";


        }
    }

    function speak(_answer: string): string {
        let playerRoom: Room;
        let npcRoom: Npc;

        playerRoom = rooms.find(room => room.id == player.position);

        if (playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer) == undefined) {
            return "there is no one with this name: " + _answer;
        }
        else {
            npcRoom = playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer);
            changePicture(_answer);
            return npcRoom.name + " says: " + npcRoom.getDialog();
        }

    }
    
    function take(_answer: string): string {
        let playerRoom: Room;
        let itemInRoom: Item;
        let event: string;

        playerRoom = rooms.find(room => room.id == player.position);
        itemInRoom = playerRoom.items.find(item => item.name.toLowerCase() == _answer);

        if (itemInRoom != undefined) {

            if (itemInRoom.canPickup == true) {
                itemInRoom.position = -1;


                event = getTakeEvent(itemInRoom);
                player.inventory.push(itemInRoom);
                playerRoom.items = playerRoom.items.filter(item => item.name.toLowerCase() != _answer);
                itemInRoom.position = -1;
                return "you took: " + _answer + ", " + event;
            }
            else {
                return "you cant take this item right now.";
            }
        }
        else {
            return "there is no such item";
        }

    }

    function getTakeEvent(_item: Item): string {
        let specificnpc: Npc;
        switch (_item.name.toLowerCase()) {

            case "beer":
                specificnpc = npcs.find(npc => npc.name == "Dwarf-Lady");
                specificnpc.likesyou = false;
                return "Dwarf-Lady doesn't like you anymore";
            case "odins-eye":
                specificnpc = npcs.find(npc => npc.name == "Odin");
                specificnpc.likesyou = false;
                return "Odin doesn't like you anymore";
            default:
                return "nothing happens.";
        }
    }
   
    function drop(_answer: string): string {
        let playerRoom: Room;
        let itemInInv: Item;



        playerRoom = rooms.find(room => room.id == player.position);
        itemInInv = player.inventory.find(item => item.name.toLowerCase() == _answer);
        if (itemInInv == undefined) {
            return "you dont have " + _answer + "in your inventory";
        }
        else {
            playerRoom.items.push(itemInInv);
            player.inventory = player.inventory.filter(item => item.name.toLowerCase() != _answer);
            itemInInv.position = playerRoom.id;

            return "you dropped: " + _answer;
        }


    }

    function give(_answer: string, _item: string): string {
        let playerRoom: Room;
        let npcInRoom: Npc;
        let itemInInv: Item;
        let output: string;

        playerRoom = rooms.find(room => room.id == player.position);
        npcInRoom = playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer);
        itemInInv = player.inventory.find(item => item.name.toLowerCase() == _item);
        if (npcInRoom == undefined) {
            output = "there is no one with this name: " + _answer;
            return output;
        }
        if (itemInInv == undefined) {
            output = "you dont have the item: " + _item;
            return output;
        }


        itemInInv.position = npcInRoom.id;
        if (itemInInv.observerDestination() == true) {
            output = getGiveEvent(npcInRoom, itemInInv);


        }
        else {
            itemInInv.position = -1;
            output = "i have no need for it.";

        }
        return output;

    }
    
    function getGiveEvent(_npc: Npc, _item: Item): string {
        let output: string;
        switch (_item.name.toLowerCase()) {

            case "flammenschlund":
            case "thors-hammer":
                _npc.inventory.push(_item);
                player.inventory = player.inventory.filter(item => item != _item);
                _npc.likesyou = true;
                output = "Thank you my friend, take this beer!";
                player.inventory.push(items.find(item => item.name.toLowerCase() == "beer"));
                return output;
            case "odins-eye":
                _npc.inventory.push(_item);
                player.inventory = player.inventory.filter(item => item != _item);
                _npc.likesyou = true;
                output = "Well done brother, you can have this i found it at some place.";
                player.inventory.push(_npc.inventory.find(item => item.name.toLowerCase() == "zeus-trident"));
                _npc.inventory.filter(item => item.name.toLowerCase() == "zeus-trident");
                player.inventory = player.inventory.filter(item => item.name.toLowerCase() != "odins-eye");
                return output;
            case "zeus-trident":
                _npc.inventory.push(_item);
                player.inventory = player.inventory.filter(item => item != _item);
                _npc.likesyou = true;
                items.find(item => item.name.toLowerCase() == "thors-hammer").canPickup = true;
                output = "Oh this looks way better than my hammer, you are worthy! Try lifting it";
                return output;

            default:
                output = "this does not do anything";
                return output;

        }



    }
    // WIP
    function saveGame(): void {
        let json: string = "{ \"rooms\": [";

        for (let room of rooms) {
            json += "{ \"name\": \"" + room.name + "\", ";
            json += "\"id\":" + room.id + ", ";
            json += "\"connectedTo\": [";
            for (let num of room.connectedTo) {
                json += num + ",";
            }
            json = json.substring(0, json.length - 1);
            json += "],";
            json += "\"desc\": \"" + room.desc + "\",";
            json += "\"hasSeen\":" + room.hasSeen;
            json += "},";

        }
        json = json.substring(0, json.length - 2);
        json += "}]}";

        let jsonObject: Object = JSON.parse(json);
        let data: string = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
        let hiddenElement: HTMLAnchorElement = document.createElement("a");
        document.body.appendChild(hiddenElement);
        hiddenElement.href = "data:" + data;
        hiddenElement.download = "SaveJson.json";
        hiddenElement.click();
        document.body.removeChild(hiddenElement);
    }

    function quit(): void {
        saveGame();
        isRunning = false;
        window.close();
    }

    function changePicture(_npc: string): void {
        let frame: HTMLElement = document.getElementById("characters");

        switch (_npc.toLowerCase()) {
            case "olaf":
                frame.style.backgroundImage = "url('../pics/olaf.png')";
                break;
            case "thor":
                frame.style.backgroundImage = "url('../pics/thor.png')";
                break;
            case "odin":
                frame.style.backgroundImage = "url('../pics/odin.png')";
                break;
            default:
                frame.style.backgroundImage = "none";
                break;
        }
    }

}


