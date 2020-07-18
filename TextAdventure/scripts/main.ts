namespace TextAdventure {
    const output: HTMLDivElement = document.getElementById("output");
    const input: HTMLDivElement = document.getElementById("input");

    let menu: string = "what do you want to do? </br> Start(s), Load(l) or Quit(q)?";
    output.innerHTML = menu;

    input.click();
  

}
