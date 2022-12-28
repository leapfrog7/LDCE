
var Question_Arr = []; //contains the 10 random question from the DB
var Selection_Options_Arr = []; //contains options as the user clicks next
var Correct_Answers_Arr = []; //contains the correct answer to the random Questions 
var User_Response = []; // stores the user selection
var Question_Counter = 1; //counter for taking care of the question and answer and storing state
var IsCalculationDone = false;
var FromPrevious = 0; //this flag tells if we are moving from previous to next then it won't load options
var isVisible = false;

function check(e){

    let isOptionSelected = e.target.closest('[data-options]');

    if(isOptionSelected!= null){  

        if(e.target.parentNode.className != 'options' && !IsCalculationDone)
        {
            console.log("error: ");
            console.log(e.target.parentNode.className);
            console.log(e.target.parentNode);
            e.target.firstElementChild.checked = true;
        }
    }
    console.log('after error:')
    console.log(e.target.closest('#optionsBox'));

    if(e.target.closest('.main-content')!=null){
       
       
        makeVisible();
        
    }

    if (e.target.closest('#optionShow')!=null){
        makeVisible();
    }
}

function makeVisible(){
    //document.getElementById('optionsBox').style.visibility = "hidden";
//    if(document.getElementById('optionsBox').hidden){

//    };
  
        //document.getElementById('optionsBox').style.color='rgb(66, 66, 66)';
        //isVisible = false;
        document.getElementById('optionsBox').style.visibility='visible';
        document.getElementById('optionShow').style.visibility='hidden';
    
    
}

function hideOptions(){
    //document.getElementById('optionsBox').style.color='rgb(194, 226, 235)';
    document.getElementById('optionsBox').style.visibility='hidden';
    document.getElementById('optionShow').style.visibility='visible';
}


function loadQuestions()
{
    document.getElementById("check").checked=false;
    myFunction();
    
    if(localStorage.getItem('sessionValidity')=='true'){
       const size_QB = AOBR_QB.length; //this measures the no. of row entries in the array
    const randomArr = generateRandomNumbers(size_QB-1); // generates a random number array for selecting questions
    
    loadQnA(randomArr); //this loads the question and correct answers array
    User_Response.fill(0);
   //set the Question Counter
    setQno();
    showQuestion();
    uncheckOptions();
    
    hideEvaluation();
    hideOptions(); 
    }

    else{
        window.location.assign('index.html');
    }

    
}
function setQno()
{
    if(Question_Counter<=10 && Question_Counter>0){
          document.getElementById('qno').innerHTML = Question_Counter;
    }
  
}

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

//generates Random Number array of 10 elements between 0 and the number provided
function generateRandomNumbers(max){
    //console.log(max);
    var arr = [];
    let min = 0;
    while(arr.length < 11){

        var r = Math.floor(Math.random() * (max - min )) + min;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
   // console.log(arr);
    return arr;
}

//fills the Global Array of QnA and Correct Answers
function loadQnA(randomArr){
    // console.log(randomArr.length);
    for(let i=0;i<randomArr.length;i++){

        let work_arr = AOBR_QB[randomArr[i]][1]; //assign the array of work item to a local array

        let size_work = work_arr.length; //total no. of work item under a particular ministry/department
        
        let random_num = generateOneRandom(size_work); //generates a random number
        
        let question_Str = work_arr[random_num]; // from the work array, a random entry is selected

        Question_Arr.push(question_Str); // the random entry is then pushed into global question array
        //console.log(Question_Arr);

        Correct_Answers_Arr.push(AOBR_QB[randomArr[i]][0]); //this is the array which contains correct answers
      // console.log(Correct_Answers_Arr);
    }
   
}

function loadAgain(){
    window.location.reload();
}

//Generates one Random Number between 0 and num
function generateOneRandom(num){
    return Math.floor(Math.random()*num);
}

//It shows the Question displayed
function showQuestion(){

    let question = document.getElementById("questionTitle");

    question.innerHTML = Question_Arr[Question_Counter-1];

    if(question.innerHTML.substring(0,1)=="*"){
        //question.style.fontWeight="bold";
        let strlen = question.innerHTML.length; // the length is needed to slice the string
        question.innerHTML = question.innerHTML.substring(1,strlen); // The * is being removed
    }  
    
    loadOptions();
         
    showOptions();
    hideOptions();
    //loadOptions();

}

//loads the Global Option Array as the user moves forward
function loadOptions(){

    if (Selection_Options_Arr.length<=40 && FromPrevious==0){
        //console.log('fromPre'+ FromPrevious);
        let size_QB = Options_DB.length-1; //Options DB contains the unique list of Department/Ministry

        let randomArr = generateRandomNumbers(size_QB); //generate a random array 

        let optionHolder =[]; //temporarily holds 4 options

        let correctAnswer = Correct_Answers_Arr[Question_Counter-1];
        
        for(let i = 0; i<4;i++){

            if(correctAnswer== Options_DB[randomArr[i]]){

                randomArr[i]=generateOneRandom(size_QB);
            }
            optionHolder.push(Options_DB[randomArr[i]]);
        }
        optionHolder[generateOneRandom(4)] = correctAnswer;
        
        for(let i=0;i<4;i++){

            Selection_Options_Arr.push(optionHolder[i]);
        }

    }

    else{

       // alert('Questions Complete');
    }
    
    // console.log(optionHolder);
    //console.log(Selection_Options_Arr);
}

function showOptions(){


    let radioID = "option";

    for(let i = 1; i<=4;i++){

        radioID = "#option"+i + ' + label';
       // console.log(radioID);
        document.querySelector(radioID).innerHTML = Selection_Options_Arr[(Question_Counter-1)*4+i-1];
       // console.log(document.querySelector(radioID).innerHTML);
        
    }
    // console.log(Selection_Options_Arr);
    // console.log(document.querySelector('#option1 + label').innerHTML);
}

//when the next button is clicked it loads the next question 
function goNext(){
    
   console.log("Inside Go Next");
    //document.getElementById('optionsBox').style.visibility="hidden";
    removeGreenClass();
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
    }
    else{
        alert('Arey Select Toh Karo Pehle Kuch');
    }
    printSelectionArray();

    if (IsCalculationDone){
        setGreenclass();
    }
        
}

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
    console.log("Inside store_Response");
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
    console.log("Inside Go Previous");
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
}

function restoreSelection(){
    console.log("Inside restore Selection");
    let userOption = User_Response[Question_Counter];
    // console.log(User_Response);

    document.getElementById('option'+userOption).checked = true;
}

function showPreviousQuestions(){

    let question = document.getElementById("questionTitle");

    question.innerHTML = Question_Arr[Question_Counter-1];

    showOptions();
    makeVisible();

}

function calculateScore(){
    console.log("Inside Calculate Score");
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
    console.log("Inside SetGreenClass");
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
        radio.className ='right';   
        isCorrect = true;
    }

    else{
        removeGreenClass();
        radio.className = 'wrong';
        setRedClass();
    }

    if(isCorrect){
         setCorrectAnswerGreen();

    }
}

function setCorrectAnswerGreen(){
    console.log("Inside SetCorrectAnswerGreen");
    let Qnum = Question_Counter-1;
    
    let radioID = 'option';
    
    let i =1
    for(i; i<=4;i++){
        
        let radio_btn = document.getElementById(radioID+i).parentElement;
        console.log(radio_btn.innerText.trim());
        if(radio_btn.innerText.trim() == Correct_Answers_Arr[Qnum].trim()){
            console.log("dharrrrrr");
            removeGreenClass();
            radio_btn.classList.add('right');  
        }

    }

}

function setRedClass(){
    console.log("Inside setRedClass");
    let Qnum = Question_Counter-1;
    let userInput = parseInt(User_Response[Qnum+1]);

    let radio = document.getElementById('option'+userInput).parentElement;
    removeGreenClass();
    radio.className = 'wrong';
    // radio.classList.toggle('wrong');
    // radio.classList.add('wrong');
    setCorrectAnswerGreen();

}

function removeGreenClass(){
    console.log("Inside removeGreenClass");
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

        correct.innerHTML = "Correct Answers : "+ right;
        incorrect.innerHTML = "Wrong Answers : "+wrong
        comment.innerHTML = evaluationRemarks(right);
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
    
    result.style.transition = 'all 1s ease-in';
    result.style.opacity = 0;
    setTimeout(()=>{result.style.opacity = 1;},700); 
}

function evaluationRemarks(right){
    let remarks="check";
    
    switch(right){
        
        case 0:
        case 1:
        case 2:
            remarks = 'Mood hi khraab kar dia... aise toh nhi ho payga... refund hi lelo' +'&#129326';
            break;
        case 3:
        case 4:
            remarks = 'Thoda pehle padh lo ap... You are highly encouraged to go through AoBR properly? ' + '&#128530';
            break;
        
        case 5:
        case 6:
            remarks = "Thik thaak hi hai bas... there's a lot of room for improvement" + '&#128528';
            break;
        
        case 7:
            remarks = "Score toh thik hai but baaki log toh 9 ya 10 la rhe hai. Thoda sa effort aur laga do bas "+ '&#128591';
            break;
        case 8:
            remarks = "Good work... keep it up!!" + '&#128527';
            break;
        
        case 9:
            remarks = "Excellent Work!!!" + '&#128524';
            break;
        case 10:
            remarks = 'Perfect!!!' + '&#128293'+ '&#128293'+ '&#128293';
            break;
        default:
            remarks = "none";
        
    }
return remarks;
}

function showAnswer()
{
    answer = document.getElementById('correctAnswer');

    answer.innerHTML= Correct_Answers_Arr[Question_Counter-1];
}

//Function for Side Menu
function myFunction() {

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
     
      // x.style.display = "none";
    }
  }