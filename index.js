const content = document.getElementById("content");
const maxInd = 4;
let score = 0;

function startScreen(content,score){
    //main menu title
    score = 0;
    let elem = document.createElement("h2");
    elem.id = "content_header";
    elem.textContent = "Welcome to Quiz App";
    content.appendChild(elem);

    //start button
    elem = document.createElement("button");
    elem.textContent = "Start Quiz";
    elem.style.backgroundColor = "green";
    elem.style.color = "white";
    elem.style.marginTop = "75px";
    elem.onclick = () => {
        clearScreen(content);
        loadQuestions(content);
    };
    elem.addEventListener("mouseover",(event)=>{
        event.target.style.backgroundColor = "rgb(8, 204, 2)";
    });
    elem.addEventListener("mouseout",(event)=>{
        event.target.style.backgroundColor = "green";
    });
    content.appendChild(elem);
}
function resultScreen(content,maxInd,score){
    const elem = document.createElement("h2");
    elem.textContent = "You got " + score + " out of " + String(maxInd+1) + " questions correct";

    const homeButton = document.createElement("button");
    homeButton.textContent = "Main Menu";
    homeButton.style.backgroundColor = "green";
    homeButton.style.color = "white"; 
    homeButton.style.marginTop = "75px";
    homeButton.onclick = () => {
        clearScreen(content);
        startScreen(content,score);
    };
    homeButton.addEventListener("mouseover",(event)=>{
        event.target.style.backgroundColor = "rgb(8, 204, 2)";
    });
    homeButton.addEventListener("mouseout",(event)=>{
        event.target.style.backgroundColor = "green";
    });

    content.appendChild(elem);
    content.appendChild(homeButton);
}
function clearScreen(content){
    content.innerHTML = "";
}
function shuffle(arr){
    for(let i = arr.length-1;i>=0;i--){
        let rindex = Math.floor(Math.random()*(i+1));
        [arr[i],arr[rindex]]=[arr[rindex],arr[i]];
    }
}
async function loadQuestions(content){
    let questions = await fetch("questions.json");
    let questionsArr = await questions.json();
    shuffle(questionsArr);
    displayQuestion(content,questionsArr,0,maxInd,score);
}
function displayQuestion(content,questionsArr,ind,maxInd,score){
    //display the question
    let ques = document.createElement("h2");
    ques.textContent = "Q"+ String(ind+1) + ". " + questionsArr[ind].question;
    content.appendChild(ques);
    shuffle(questionsArr[ind].options);
    //displaying the options
    let optionsDiv = document.createElement("div");
    optionsDiv.style.textAlign = "left";
    optionsDiv.marginLeft = "5px";
    content.appendChild(optionsDiv);
    for(let i =0;i<questionsArr[ind].options.length;i++){
        let rbutton = document.createElement("input");
        rbutton.id = questionsArr[ind].options[i];
        rbutton.type="radio";
        rbutton.name = "radio" + ind;
        let rlabel = document.createElement("label");
        rlabel.htmlFor = rbutton.id;
        rlabel.innerHTML = questionsArr[ind].options[i] + "<br>";
        optionsDiv.appendChild(rbutton);
        optionsDiv.appendChild(rlabel);
    }

    if(ind<maxInd){
        let nextButton = document.createElement("button");
        nextButton.textContent = "NEXT";
        nextButton.style.backgroundColor = "blue";
        nextButton.style.color = "white";
        nextButton.style.marginTop = "5px";
        nextButton.addEventListener("mouseover",(event)=>{
            event.target.style.backgroundColor = "rgb(79, 170, 240)";
        });
        nextButton.addEventListener("mouseout",(event)=>{
            event.target.style.backgroundColor = "blue";
        });
        nextButton.onclick = (()=>{
            //logic to calculate whether question is correctly answered goes here
            for(elem in optionsDiv.children){
                if(optionsDiv.children[elem].checked){
                    // if(optionsDiv.children[elem].)
                    if(questionsArr[ind].answer==optionsDiv.children[elem].id){
                        score++;
                    }
                    clearScreen(content);
                    displayQuestion(content,questionsArr,ind+1,maxInd,score);
                    return;
                }
            }
            window.alert("Please select an option");
        });
        content.appendChild(nextButton);
    }else{
        let endButton = document.createElement("button");
        endButton.textContent = "SUBMIT";
        endButton.style.backgroundColor = "rgb(181, 79, 240)";
        endButton.style.marginTop = "5px";
        endButton.onclick = (()=>{
            clearScreen(content);
            //logic to calculate whether question is correctly answered goes here
            for(elem in optionsDiv.children){
                if(optionsDiv.children[elem].checked){
                    // if(optionsDiv.children[elem].)
                    if(questionsArr[ind].answer==optionsDiv.children[elem].id){
                        score++;
                    }
                    clearScreen(content);
                    resultScreen(content,maxInd,score);
                    return;
                }
            }
            window.alert("Please select an option");
        });
        content.appendChild(endButton);
    }
}
startScreen(content,score);