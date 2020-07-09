namespace quiz {

    // declare vars
    let score: number = 0;
    let answered: number = 0;
    let choice: string;
    let newstart: boolean = false;


    //Fragenblock
    class QuestArray {
        question: string;
        answer: string[];
        isCorrect: string;

        constructor(question: string, answer: string[], isCorrect: string) {
            this.question = question;
            this.answer = answer;
            this.isCorrect = isCorrect;
        }

        // show Question
        show(): void {
            let num = 1;
            console.log("The Question is: " + this.question);
            this.answer.forEach(function (ans: string) {
                console.log(num + ". " + ans);
                num += 1;

            });
        }

        // check if true
        istrue(questionNumber: string): boolean {
            if (questionNumber == this.isCorrect) {
                score += 1;
                answered += 1;
                console.warn("CORRECT!");
                return true;
            }
            else {
                answered += 1;
                console.warn("WRONG!");
                return false;
            }
        }
    }
    // add questions
    let quest1: QuestArray = new QuestArray("How old is Michael Schuhmacher?", ["45", "55", "49", "51"], "4");
    let quest2: QuestArray = new QuestArray("Tallest Building in the World is located in?", ["Dubai", "Abudhabi", "New York", "Singapore", "Los Angeles"], "1");
    let quest3: QuestArray = new QuestArray("Which year was Toy Story released in the US?", ["1998", "2000", "1995", "2002"], "3");
    let quest4: QuestArray = new QuestArray("In which Year did Twitter launch?", ["2002", "2006", "2010", "2000"], "2");
    let quest5: QuestArray = new QuestArray("How old is Michael Schuhmacher?", ["45", "55", "49", "51"], "4");
    let quest6: QuestArray = new QuestArray("How old is Michael Schuhmacher?", ["45", "55", "49", "51"], "4");
    let quest7: QuestArray = new QuestArray("How old is Michael Schuhmacher?", ["45", "55", "49", "51"], "4");
    let questionarray: QuestArray[] = [];

    questionarray.push(quest1, quest2, quest3, quest4, quest5, quest6, quest7);

    // start game
    menu();
    function menu(): void {

        choice = prompt("enter [1] to start quiz,[2] add question or [3] to leave?");
        switch (choice) {
            case "1": {
                startQuiz();
            }
            case "2": {
                addQuestion();
            }
            case "3": {
                break;
            }
        }
    }



    function startQuiz(): void {


        // check if new quiz 
        if (newstart == true) {
            score = 0;
            answered = 0;
            newstart = false;
        }
        else {

        }

        // output score
        let rand: number = Math.floor(Math.random() * questionarray.length);
        console.log("Your current score: " + score);
        console.log("Number of questions:" + answered);

        console.log(questionarray[rand].show());
        let answer = prompt("which answer is correct? type the number of the question");
        questionarray[rand].istrue(answer);

        choice = prompt("Press [1] for next or [2] to leave");
        if (choice == "1") {
            startQuiz();
        }
        else {
            newstart = true;
            menu();
        }


    }

    function addQuestion(): void {
        let question: string;
        let answers: string[] = [];
        let isright: string;
        let num: number;
        question = prompt("Whats your question?");
        let choices: string = prompt("How many answer does your question have?");
        for (let i: number = 1; i <= parseInt(choices) && i < 6; i++) {
            answers.push(prompt("whats answer number " + i));
        }
        isright = prompt("which answer is correct?");

        let quest: QuestArray = new QuestArray(question, answers, isright);
        questionarray.push(quest);

        choice = prompt("[1] to add another question or [2] to menu?");
        if (choice == "1") {
            addQuestion();
        }
        else {
            menu();
        }
    }


}

