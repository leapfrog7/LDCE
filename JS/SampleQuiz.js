var initialX = null;
var initialY = null;

var Question_Arr = []; //contains the 10 random question from the DB
var Selection_Options_Arr = []; //contains options as the user clicks next
var Correct_Answers_Arr = []; //contains the correct answer to the random Questions 
var Explanation_Arr = []; //contains the explanation
var User_Response = []; // stores the user selection
var Question_Counter = 1; //counter for taking care of the question and answer and storing state
var IsCalculationDone = false;
var FromPrevious = 0; //this flag tells if we are moving from previous to next then it won't load options
var isVisible = false;



function loadQuestions(){

    document.getElementById("check").checked=false;
    myFunction();
    
        hideEvaluation();
        hideOptions();
        const size_QB = Global_SampleQuiz.length; //this measures the no. of row entries in the array
        const randomArr = generateRandomNumbers(size_QB-1); // generates a random number array for selecting questions
        
        
        console.log(Question_Arr);
        console.log(Correct_Answers_Arr);
        console.log(Selection_Options_Arr);
        loadQnA(randomArr);
        User_Response.fill(0);
        setQno();
        showQuestion();
        uncheckOptions();
    
}

//fills the Global Array of QnA and Correct Answers
function loadQnA(randomArr){
    // console.log(randomArr.length);
    for(let i=0;i<randomArr.length-1;i++){
        console.log(i);
         Question_Arr.push(Global_SampleQuiz[randomArr[i]][0]); // the random entry is then pushed into global question array
        //this stores the options for the particular question
         for(let j =0;j<4;j++){
            
            Selection_Options_Arr.push(Global_SampleQuiz[randomArr[i]][j+1]);
        }
         
         //console.log(Question_Arr);

        Correct_Answers_Arr.push(Global_SampleQuiz[randomArr[i]][5]); //this is the array which contains correct answers
        Explanation_Arr.push(Global_SampleQuiz[randomArr[i]][6]);

       console.log(Explanation_Arr);
    }
   
}






function check(e){

  let isOptionSelected = e.target.closest('[data-options]');

  if(isOptionSelected!= null){  

      if(e.target.parentNode.className != 'options')
      {
          e.target.firstElementChild.checked = true;
      }
  }

  console.log(e.target.closest('#optionsBox'));

  if(e.target.closest('.main-content')!=null){
     
     
      makeVisible();
      
  }

  if (e.target.closest('#optionShow')!=null){
      makeVisible();
  }
}

function makeVisible(){

      document.getElementById('optionsBox').style.visibility='visible';
      document.getElementById('optionShow').style.visibility='hidden';
}

function hideOptions(){
  //document.getElementById('optionsBox').style.color='rgb(194, 226, 235)';
  document.getElementById('optionsBox').style.visibility='hidden';
  document.getElementById('optionShow').style.visibility='visible';
}



function setQno()
{
    if(Question_Counter<=10 && Question_Counter>0){
          document.getElementById('qno').innerHTML = Question_Counter;
    }
  
}

//It shows the Question displayed
function showQuestion(){

    let question = document.getElementById("questionTitle");
    let multiLineQuestion ='';
    question.innerHTML = Question_Arr[Question_Counter-1];

    // if(question.innerHTML.substring(0,1)=="*"){
    //     //question.style.fontWeight="bold";
    //     let strlen = question.innerHTML.length; // the length is needed to slice the string
    //     question.innerHTML = question.innerHTML.substring(1,strlen); // The * is being removed
    // }  
    let multiLine = question.innerHTML.split('\n');

    console.log(multiLine);

    for(let i =0;i<multiLine.length;i++){

        if(i==0){
            multiLineQuestion = multiLineQuestion + multiLine[i]+ '<br><br>';
            //for two line breaks after first statement 
        }
        else{
            multiLineQuestion = multiLineQuestion + multiLine[i]+'<br>';
        }

    }

    question.innerHTML = multiLineQuestion;
    // loadOptions();
         
    showOptions();
    // hideOptions();
    //loadOptions();

}

//this function takes a string and splits it into multiple lines and returns an array
function splitIntoMultipleLines(jointString)
{
    let multiLineQuestion ='';
    let multiLine = jointString.split('\n');

    for(let i =0;i<multiLine.length;i++){

        multiLineQuestion = multiLineQuestion + multiLine[i]+'<br>';
    }

    return multiLineQuestion;

}

function showOptions(){

    let radioID = "option";

        for(let i = 1; i<=4;i++){
    
            radioID = "#option"+i + ' + label';
           // console.log(radioID);
            document.querySelector(radioID).innerHTML = Selection_Options_Arr[(Question_Counter-1)*4+i-1];
           // console.log(document.querySelector(radioID).innerHTML);
            
        }

}

//when the next button is clicked it loads the next question 
function goNext(){
    
    resetShowAnswer();
    
    // document.getElementById('optionsBox').style.visibility="hidden";
    // document.getElementById('optionShow').style.visibility='visible';
    // removeGreenClass();
   // console.log('fromPrevious'+FromPrevious);
    
    //the user moves to next screen only if anything has been selected 
    if(isAnythingSelected()){

        if(Question_Counter==10){

            Question_Counter+=1;
            store_Response();
            Question_Counter-=1;

            calculateScore();
        }

       
        else{
            hideOptions();
            Question_Counter+=1;
            
            setQno();
            store_Response();
            showQuestion(); //it will show that next question
            if(User_Response.length>Question_Counter){
                restoreSelection();
                makeVisible();
            } 
            else{
                uncheckOptions();
            }

            if(FromPrevious!==0){
                FromPrevious-=1;
            } 
        } 
        
        
        explanation.innerHTML = Explanation_Arr[Question_Counter-1];
    }
    else{
        alert('Please select an answer before proceeding to the next question.');
    }
    printSelectionArray();

    if (IsCalculationDone){
        setGreenclass();
    }
        
}

// function loadQuestions()
// {
//     localStorage.setItem('sessionValidity','true');
//     if(localStorage.getItem('sessionValidity')=='true'){
//        const size_QB = Globar_GFR.length; //this measures the no. of row entries in the array
//     const randomArr = generateRandomNumbers(size_QB-1); // generates a random number array for selecting questions
    
//     loadQnA(randomArr); //this loads the question and correct answers array
//     User_Response.fill(0);
//    //set the Question Counter
//     setQno();
//     showQuestion();
//     uncheckOptions();
    
//     hideEvaluation();
//     hideOptions(); 
//     }

//     else{
//         window.location.assign('index.html');
//     }
    
// }
// function setQno()
// {
//     if(Question_Counter<=10 && Question_Counter>0){
//           document.getElementById('qno').innerHTML = Question_Counter;
//     }
  
// }

//this functions unchecks all radio button if anyone is in checked state
function uncheckOptions(){
    
    let radioID = 'option';

    for(let i = 1; i<=4;i++){
        let radio_btn = document.getElementById(radioID+i);

        if(radio_btn.checked){
            radio_btn.checked=false;
        }
    }
}

// //generates Random Number array of 10 elements between 0 and the number provided
function generateRandomNumbers(max){
    console.log(max);
    var arr = [];
    let min = 0;
    while(arr.length < 11){

        var r = Math.floor(Math.random() * (max - min )) + min;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
   console.log(arr);
    return arr;
}

function loadAgain(){
    window.location.reload();
}

// //Generates one Random Number between 0 and num
// function generateOneRandom(num){
//     return Math.floor(Math.random()*num);
// }

function printSelectionArray(){
    

       // console.log(Selection_Options_Arr);
    
}

//it checks whether the user has selected anything before moving to next screen
function isAnythingSelected(){

    let radioID = 'option';
    let counter = 0;
    for(let i = 1; i<=4;i++){
        let radio_btn = document.getElementById(radioID+i);

        if(radio_btn.checked){
            counter +=1;
        }

    }
    if(counter == 0){
        return false;
    }
    else{
        return true;
    }

}

//it stores the response of the user before going to the next question
function store_Response(){
    
    let radioID = 'option';
    
    let i =1
    for(i; i<=4;i++){

        let radio_btn = document.getElementById(radioID+i);

        if(radio_btn.checked){

            if(Question_Counter<=11)
            {
                User_Response[Question_Counter-1]=i;
            }
                    
        }
            
      //  console.log("sr "+ User_Response);
            
    }
    
    //console.log(User_Response);
}

function goPrevious(){
    
    resetShowAnswer();
    removeGreenClass();
    

    if(Question_Counter==1){
        alert('Not allowed');

        if(IsCalculationDone){
            setGreenclass();
        }
    }
    else{
        Question_Counter-=1;
        FromPrevious+=1;
        setQno();
        showPreviousQuestions();
        restoreSelection();
        if(IsCalculationDone)
        {
            setGreenclass();
        }
        
    }
    //showOptions();
    makeVisible();
    explanation.innerHTML = Explanation_Arr[Question_Counter-1];
}

function restoreSelection(){

    let userOption = User_Response[Question_Counter];
    // console.log(User_Response);

    document.getElementById('option'+userOption).checked = true;
}

function showPreviousQuestions(){

    let question = document.getElementById("questionTitle");

    question.innerHTML = Question_Arr[Question_Counter-1];

    showOptions();

}

function calculateScore(){

    let rightAns = 0;
    let wrongAns = 0;
    
   // console.log(Correct_Answers_Arr);
    for(let i = 0; i<10;i++){

        let userInput = parseInt(User_Response[i+1])-1;
        // console.log(Selection_Options_Arr[4*i+userInput]);
      //  console.log(Correct_Answers_Arr[i]);
        //console.log('pp'+Selection_Options_Arr[4*i+userInput]);
        // console.log(User_Response[i]);
        if(Selection_Options_Arr[4*i+userInput]==Correct_Answers_Arr[i]){
            rightAns+=1;
        }
        else{
            wrongAns+=1;
        }

    }
    IsCalculationDone = true;
    setGreenclass();
    //alert("Score is "+ rightAns + " Wrong is "+wrongAns);
    showEvaluation(rightAns,wrongAns);
   
}

function setGreenclass(){
    
    let Qnum = Question_Counter-1;
    let userInput = parseInt(User_Response[Qnum+1]);

    let isCorrect = false;
    
    // if (Question_Counter>10){
    //     let userInput = parseInt(User_Response[Qnum]);
    //     Qnum-=1;
    // }
    let radio = document.getElementById('option'+userInput).parentElement;
    
    // console.log(radio);
    // console.log(radio.innerText.trim());
    // console.log(Correct_Answers_Arr[Qnum].trim());

    if(radio.innerText.trim() == Correct_Answers_Arr[Qnum].trim())
    {
        
       // console.log('here here hre');
        radio.className ='right'   
        isCorrect = true;
    }

    else{
        removeGreenClass();
        setRedClass();
    }

    if(isCorrect){
         setCorrectAnswerGreen();

    }
}

function setCorrectAnswerGreen(){
    
    let Qnum = Question_Counter-1;
    
    let radioID = 'option';
    
    let i =1
    for(i; i<=4;i++){
        
        let radio_btn = document.getElementById(radioID+i).parentElement;
        console.log(radio_btn.innerText.trim());
        if(radio_btn.innerText.trim() == Correct_Answers_Arr[Qnum].trim()){
            console.log("dharrrrrr");
           // removeGreenClass();
            radio_btn.classList.add('right');  
        }

    }

}

function setRedClass(){

    let Qnum = Question_Counter-1;
    let userInput = parseInt(User_Response[Qnum+1]);

    let radio = document.getElementById('option'+userInput).parentElement;

    radio.className = 'wrong';

    setCorrectAnswerGreen();

}

function removeGreenClass(){

    let radioID = 'option';
    
    let i =1
    for(i; i<=4;i++){

        let radio_btn = document.getElementById(radioID+i).parentElement;

        radio_btn.classList.remove('right'); // remove the class name right
        radio_btn.className = 'options'; //sets the class Name back to option

    }
}

function hideEvaluation(){

    let result = document.getElementById("evaluation");
    
    result.style.display="none";
    
}

function showEvaluation(right, wrong){

   // if(IsCalculationDone){
    console.log("inside Evalutation");
        let result = document.getElementById("evaluation");
        let correct = document.getElementById("correctAns");
        let incorrect = document.getElementById("wrongAns");
        let comment = document.getElementById("remarks");
        let explanation = document.getElementById("explanation");

        correct.innerHTML = "Correct Answers : "+ right;
        incorrect.innerHTML = "Wrong Answers : "+wrong
        comment.innerHTML = evaluationRemarks(right);
        explanation.innerHTML = Explanation_Arr[Question_Counter-1];

        document.getElementById('showAnswerBtn').style.display = 'none';

        setResult();
       // result.className="results";
   // }
}

function setResult(){

    let result = document.getElementById("evaluation");

    result.style.display="flex";
    result.style.gap= "1rem";
    result.style.alignItems = "center";
    result.style.flexDirection="column";
    result.style.fontSize = "0.9rem";
    
    
    result.style.transition = 'all 500ms ease-in';
    result.style.opacity = 0;
    setTimeout(()=>{result.style.opacity = 1;},400); 
}

function evaluationRemarks(right){
    let remarks="check";
    
    switch(right){
        
        case 0:
        case 1:
        case 2:
            remarks = 'Success is not final, failure is not fatal: it is the courage to continue that counts. Keep working hard and you will achieve the desired results.';
            break;
        case 3:
        case 4:
            remarks = 'Although your current score is not where you aim to be, you can improve a lot with little more focus. Do Remember, progress, not perfection is what counts.';
            break;
        
        case 5:
        case 6:
            remarks = "Good job! your hard work is paying off. Keep pushing forward and strive to achieve an even better score";
            break;
        
        case 7:
        case 8:
            remarks = 'Well done! Keep up the effort and you will soon acquire the mastery on this topic';
            break;
        
        case 9:
            remarks = "Outstanding! it demonstrates your sincerity, hard work and remarkable understanding of the subject. Keep up the great work!";
            break;
        case 10:
            remarks = 'Perfect!!! This is a testament to your exceptional abilities. But remember- Success is not final, failure is not fatal: it is the courage to continue that counts';
            break;
        default:
            remarks = "none";
        
    }
return remarks;
}










// ******************
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
      var menu = document.getElementById("check");
      menu.checked = false;
      myFunction();
      

    } else {
      // swiped right
      console.log("swiped right");
      var menu = document.getElementById("check");
      menu.checked = true;
      myFunction();
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
    } else {
      // swiped down
      console.log("swiped down");
    }  
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
}

//This function shows the Answer Section within the question and before the evaluation
function showAnswer()
{   
    division = document.getElementById('divCorrectAnswer');
    division.style.display = 'block';
    answer = document.getElementById('correctAnswer');
    division.style.background = '#d2fae7';
    division.style.margin = "1rem 0.8rem";
    division.style.padding = "0.3rem 0.5rem";
    

    answerStr = "Answer :  " + Correct_Answers_Arr[Question_Counter-1];
    
   if(Explanation_Arr[Question_Counter-1]!='-'){
    answerStr= answerStr +"<br><br>"+ splitIntoMultipleLines(Explanation_Arr[Question_Counter-1]);
   }

    answer.innerHTML= answerStr;//Correct_Answers_Arr[Question_Counter-1];
}

//This function hide the answer shown within the question
function resetShowAnswer(){

    document.getElementById('correctAnswer').innerHTML='';
    division = document.getElementById('divCorrectAnswer');
    division.style.margin = "0";
    division.style.padding = "0";
}


//Function for Side Menu
function myFunction() {
   console.log("inside swipe");

    document.getElementById('ifLoggedOut').style.opacity = '0';
    var x = document.getElementById("myLinks");
    var menu = document.getElementById("check");
    var menuLabel = document.getElementById("H-menu");

    x.style.visibility='hidden';
    console.log(menu.checked);
    if (menu.checked == true) {
    // x.style.display = "block";
    x.style.visibility='visible';
    x.style.transform = "translateX(0%)";
    menuLabel.style.transition = "all 0.4s ease-in";
    menuLabel.style.transform = "translateX(240px)";
    }

    if (menu.checked == false) {
        x.style.visibility='hidden';
        x.style.transform = "translateX(-110%)";
        menuLabel.style.transform = "translateX(0vw)";
    
    }
    
    if(localStorage.getItem('sessionValidity')=='false'){

        document.getElementById('ifLoggedOut').style.opacity = '1';

        let nodelist = document.querySelectorAll('.links-sidebar');
        for(let i =0;i<nodelist.length;i++){
            nodelist[i].style.display = 'none';
        }
       
        document.getElementById('logOutBtn').style.opacity = '0';
    }

    if(localStorage.getItem('sessionValidity')=='true'){
        
        let nodelist = document.querySelectorAll('.links-sidebar');
        for(let i =0;i<nodelist.length;i++){
            nodelist[i].style.display = 'block';
        }
        document.getElementById('ifLoggedOut').style.opacity = '0';
       
        document.getElementById('logOutBtn').style.opacity = '1';
    }
   
    

// else{
//     // document.querySelectorAll('links-sidebar').style.display='none';
//     document.getElementById('ifLoggedOut').style.display = block;
// }

}