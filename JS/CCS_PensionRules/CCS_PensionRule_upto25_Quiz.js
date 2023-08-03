function loadQuestions(){

    document.getElementById("check").checked=false;
    myFunction();
    
    if(localStorage.getItem('sessionValidity')=='true'){

        hideEvaluation();
        hideOptions();
        const size_QB = Global_CCS_PensionRule_25.length; //this measures the no. of row entries in the array
        const randomArr = generateRandomNumbers(size_QB-1); // generates a random number array for selecting questions
        
        loadQnA(randomArr);
        console.log(Question_Arr);
        console.log(Correct_Answers_Arr);
        console.log(Selection_Options_Arr);

        User_Response.fill(0);
        setQno();
        showQuestion();
        uncheckOptions();
    }
    else{
        window.location.assign('index.html');
    }
    
}

//fills the Global Array of QnA and Correct Answers
function loadQnA(randomArr){
    // console.log(randomArr.length);
    for(let i=0;i<randomArr.length-1;i++){
        console.log(i);
         Question_Arr.push(Global_CCS_PensionRule_25[randomArr[i]][0]); // the random entry is then pushed into global question array
        //this stores the options for the particular question
         for(let j =0;j<4;j++){
            
            Selection_Options_Arr.push(Global_CCS_PensionRule_25[randomArr[i]][j+1]);
        }
         
         //console.log(Question_Arr);

        Correct_Answers_Arr.push(Global_CCS_PensionRule_25[randomArr[i]][5]); //this is the array which contains correct answers
        Explanation_Arr.push(Global_CCS_PensionRule_25[randomArr[i]][6]);

       console.log(Explanation_Arr);
    }
   
}
