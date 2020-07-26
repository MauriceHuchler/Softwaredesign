"use strict";
var TextAdventure;
(function (TextAdventure) {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const points = document.getElementById("points");
    let items = [];
    let npcs = [];
    let rooms = [];
    let player = new TextAdventure.Player();
    console.log(player);
    function prepare(ini) {
        return ini.toLowerCase();
    }
    function getUserInput() {
        input.focus();
        return new Promise(function (resolve) {
            const keydownEvent = (event) => {
                if (event.key === "Enter") {
                    const value = input.value;
                    input.value = "";
                    input.removeEventListener("keydown", keydownEvent);
                    resolve(value);
                }
            };
            input.addEventListener("keydown", keydownEvent);
        });
    }
    async function main() {
        let menu = "start (s), load (l), quit (q)";
        output.innerHTML += menu + "<p>";
        let userInput = await getUserInput();
        switch (userInput) {
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
    main();
    async function startGame() {
        const filename = "./JSON/mainsave.json";
        await load(filename);
        while (true) {
            await playerController();
        }
    }
    async function load(_filename) {
        console.log("start fetch");
        let response = await fetch(_filename);
        let text = await response.text();
        let json = JSON.parse(text);
        console.log("ready for sorting");
        sort(json);
        assign(); // ANSPASSEN AUF KONZEPT!!!!!11111einseinself
        console.log(rooms);
        console.log(npcs);
    }
    function sort(_element) {
        for (let key in _element) {
            if (key == "rooms") {
                let sortedArray = new Array();
                for (let room of _element.rooms) {
                    let room1 = new TextAdventure.Room();
                    room1.id = room.id;
                    room1.name = room.name;
                    room1.connectedTo = room.connectedTo;
                    room1.desc = room.desc;
                    room1.hasSeen = room.hasSeen;
                    console.dir(room1);
                    sortedArray.push(room1);
                }
                rooms = sortedArray;
            }
            if (key == "npcs") {
                let sortedArray = new Array();
                for (let npc of _element.npcs) {
                    let npc1 = new TextAdventure.Npc();
                    npc1.name = npc.name;
                    npc1.id = npc.id;
                    npc1.dialog = npc.dialog;
                    npc1.likesyou = npc.likesyou;
                    npc1.isTrue = npc.isTrue;
                    npc1.position = npc.position;
                    sortedArray.push(npc1);
                }
                npcs = sortedArray;
            }
            if (key == "items") {
                let sortedArray = new Array();
                for (let item of _element.items) {
                    let item1 = new TextAdventure.Item();
                    item1.name = item.name;
                    item1.id = item.id;
                    item1.position = item.position;
                    item1.destination = item.destination;
                    sortedArray.push(item1);
                }
                items = sortedArray;
            }
        }
    }
    function assign() {
        for (let npc of npcs) {
            if (npc.position >= 0 && npc.position < 1000) {
                rooms.find(room => room.id == npc.position).npcs.push(npc);
            }
        }
        for (let item of items) {
            if (item.position >= 0 && item.position < 1000) {
                rooms.find(room => room.id == item.position).items.push(item);
            }
        }
    }
    let counter = 1;
    async function playerController() {
        let answerMenu;
        setBool();
        if (counter > 0) {
            output.innerHTML = look();
            counter -= 1;
        }
        output.innerHTML += "<p>" + player.commands();
        answerMenu = (await prepare(await getUserInput())).split(" ");
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
            case "q": {
                quit();
                break;
            }
            case "c": {
                output.innerHTML = player.commands();
                break;
            }
            default:
                output.innerHTML = "there is no such command";
                break;
        }
    }
    function look() {
        let wholeRoom = "";
        let playerRoom;
        playerRoom = rooms.find(room => room.id == player.position);
        //!!!!!! AUF DOKUMENT AKTUALISIEREN!!!!!!!!!
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
    function setBool() {
        let playerRoom;
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
    // UPDATEN AUF KONZPET !!!!!!!!!!
    function walk(_direction) {
        let direction = _direction;
        let playerRoom;
        playerRoom = rooms.find(room => room.id == player.position);
        switch (direction) {
            case "n":
            case "north":
                if (playerRoom.connectedTo[0] >= 0 && playerRoom.connectedTo[0] < 1000) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[0]).id;
                    return "you walked north";
                }
                else
                    return "you cant walk this way";
            case "e":
            case "east":
                if (playerRoom.connectedTo[1] >= 0 && playerRoom.connectedTo[1] < 1000) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[1]).id;
                    return "you walked east";
                }
                else
                    return "you cant walk this way";
            case "s":
            case "south":
                if (playerRoom.connectedTo[2] >= 0 && playerRoom.connectedTo[2] < 1000) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[2]).id;
                    return "you walked south";
                }
                else
                    return "you cant walk this way";
            case "w":
            case "west":
                if (playerRoom.connectedTo[3] >= 0 && playerRoom.connectedTo[3] < 1000) {
                    player.position = rooms.find(room => room.id == rooms.find(room => room.id == player.position).connectedTo[3]).id;
                    return "you walked west";
                }
                else
                    return "you cant walk this way";
            default:
                return "you cant walk this way";
        }
    }
    function speak(_answer) {
        console.log(_answer);
        let playerRoom;
        let npcRoom;
        let output = "";
        playerRoom = rooms.find(room => room.id == player.position);
        if (playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer) == undefined) {
            return "there is no one with this name.";
        }
        else {
            npcRoom = playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer);
            return npcRoom.name + " says: " + npcRoom.getDialog();
        }
    }
    // anpassen auf Konzept
    function take(_answer) {
        let playerRoom;
        let itemInRoom;
        let event = "nothing happens";
        playerRoom = rooms.find(room => room.id == player.position);
        itemInRoom = playerRoom.items.find(item => item.name.toLowerCase() == _answer);
        if (itemInRoom != undefined) {
            itemInRoom.position = -1;
            if (itemInRoom.observer() == true) {
                event = takeEvent(itemInRoom);
            }
            console.log(itemInRoom);
            player.inventory.push(itemInRoom);
            playerRoom.items = playerRoom.items.filter(item => item.name.toLowerCase() != _answer);
            itemInRoom.position = -1;
            return "you took: " + _answer + ", " + event;
        }
        else {
            return "there is no such item";
        }
    }
    function takeEvent(_item) {
        switch (_item.name.toLowerCase()) {
            case "flammenschlund":
            case "beer":
                let specificnpc = npcs.find(npc => npc.name == "Dwarf-Lady");
                specificnpc.likesyou = false;
                return "Dwarf-Lady doenst like you anymore";
            case "thors-hammer":
                points.setAttribute("points", "1");
        }
    }
    // ANPASSEN AUF KONZEPT
    function drop(_answer) {
        let playerRoom;
        let itemInInv;
        playerRoom = rooms.find(room => room.id == player.position);
        itemInInv = player.inventory.find(item => item.name.toLowerCase() == _answer);
        if (itemInInv == undefined) {
            return "there is no such item";
        }
        else {
            playerRoom.items.push(itemInInv);
            player.inventory = player.inventory.filter(item => item.name.toLowerCase() != _answer);
            itemInInv.position = playerRoom.id;
            return "you dropped: " + _answer;
        }
    }
    function give(_answer, _item) {
        let playerRoom;
        let npcInRoom;
        let itemInInv;
        playerRoom = rooms.find(room => room.id == player.position);
        npcInRoom = playerRoom.npcs.find(npc => npc.name.toLowerCase() == _answer);
        itemInInv = player.inventory.find(item => item.name.toLowerCase() == _item);
        console.log(itemInInv);
        if (itemInInv.id != undefined) {
            itemInInv.position = npcInRoom.id;
            if (itemInInv.observer() == true) {
                npcInRoom.inventory.push(itemInInv);
                player.inventory = player.inventory.filter(item => item.name.toLowerCase() != _item);
                npcInRoom.likesyou = true;
                return "Thank you my friend, take this!";
            }
            else {
                itemInInv.position = -1;
                return "i have no need for it.";
            }
        }
    }
    function quit() {
        console.log("quit");
    }
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=main.js.map