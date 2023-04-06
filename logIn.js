
var validUser = [];

function loadSettings(){
   closeModal();
   loadValidUsers();
   hideButtons();

   document.getElementById('userName').value='';
   document.getElementById('msgOnLogin').style.display='none';

//    if(localStorage.getItem('sessionValidity')=='true')
//    {    
//         localStorage.setItem('alreadyLoggedIn','true'); //this is to set the session storage if the user has already logged in and clicks on the home page button. not yet implemented
//         console.log(localStorage.getItem('sessionValidity'));
//         console.log(localStorage.getItem('alreadyLoggedIn'));
//     }

   localStorage.setItem('sessionValidity','false');
//    pwdValue('trial41');
    document.getElementById("check").checked=false;
    myFunction();

}

function hideButtons(){
    list = document.getElementById('list_AOBR');
    quiz = document.getElementById('quiz_AOBR');
    lookup = document.getElementById('lookup_AOBR');
    quizGFR = document.getElementById('quizGFR');
    quizConstitution = document.getElementById('quizConstitution');
    quizPension = document.getElementById('quizPensionRules');
    quizLeave = document.getElementById('quizLeaveRules');
    quizConduct = document.getElementById('quizConductRules');
    quizCCA = document.getElementById('quizCCARules');

    subButton1 = document.getElementById('subQuizBtn');
    subButton2 = document.getElementById('subQuizBtn1');
    subButton3 = document.getElementById('subQuizBtn2');
    subButton4 = document.getElementById('subQuizBtn3');
    subButton5 = document.getElementById('subQuizBtn4');
    subButton6 = document.getElementById('subQuizBtn5');
    subButton7 = document.getElementById('subQuizBtn6');
    subButton8 = document.getElementById('subQuizBtn7');

    subButton1.style.display='block';
    subButton2.style.display='block';
    subButton3.style.display='block';
    subButton4.style.display='block';
    subButton5.style.display='block';
    subButton6.style.display='block';
    subButton7.style.display='block';
    subButton8.style.display='block';

    // list.style.display = 'none';
    quiz.style.display = 'none';
    lookup.style.display = 'none';
    quizGFR.style.display = 'none';
    quizConstitution.style.display = 'none';
    quizLeave.style.display = 'none';
    quizPension.style.display = 'none';
    quizConduct.style.display = 'none';
    quizCCA.style.display = 'none';
}

function showButtons(){
    list = document.getElementById('list_AOBR');
    quiz = document.getElementById('quiz_AOBR');
    lookup = document.getElementById('lookup_AOBR');
    quizGFR = document.getElementById('quizGFR');
    quizLeave = document.getElementById('quizLeaveRules');
    quizPension = document.getElementById('quizPensionRules');
    quizConduct = document.getElementById('quizConductRules');
    quizCCA = document.getElementById('quizCCARules');

    subButton1.style.display = 'none';
    subButton2.style.display = 'none';
    subButton3.style.display = 'none';
    subButton4.style.display = 'none';
    subButton5.style.display = 'none';
    subButton6.style.display = 'none';
    subButton7.style.display = 'none';
    subButton8.style.display = 'none';

    list.style.display = 'block';
    quiz.style.display = 'block';
    quizGFR.style.display='block';
    lookup.style.display = 'block';
    quizConstitution.style.display = 'block';
    quizLeave.style.display = 'block';
    quizPension.style.display='block';
    quizConduct.style.display = 'block';
    quizCCA.style.display = 'block';

    localStorage.setItem('sessionValidity','true');
}

//after successful login, some elements needs to be removed.
function hideAfterLogIn(){
    console.log('hata');
    document.getElementById("loginSection").style.display = 'none';
    document.getElementById("subscribeInfo").style.display ='none';
    document.getElementById('mainIntro').style.display='none';
    document.getElementById('subscriptionPriceLogo').style.display='none';
    document.getElementById('sampleSection').style.display = 'none';
    let uName = document.getElementById('userName').value;
    document.getElementById("packDetails").innerHTML = "Welcome " + uName+ ", you now have access to the following:"
    setTimeout(hideBanner,1000);
}

function loadValidUsers(){

    
    for(let i = 0; i< Global_C.length;i++){

        if(Global_C[i][2]==1 || Global_C[i][2]==2){
            validUser.push(Global_C[i][0]);
        }
        
    }
    console.log(validUser);
}

function checkValidity(){
    
    console.log(document.getElementById('userName').value);
    console.log(document.getElementById('passCode').value);
    console.log(document.getElementById('passCode'));

    if(isEmpty()){

        alert("Invalid Credentials!!!");
    }

    //i.e. the username and password fields are not empty
    else{

        if(isUserValid()){
            //this means the username is valid
                console.log("thik hai");
            let uName = document.getElementById('userName').value;
            let enteredPassCode = document.getElementById('passCode').value;
           
            let nPwd = pwdValue(enteredPassCode);
            
            let isValidPassword = false;
            for(let i =0;i<Global_C.length;i++){

                if(uName == Global_C[i][0]){
                    if(nPwd == Global_C[i][1]){

                        if(Global_C[i][2]==1){
                            document.getElementById('msgOnLogin').style.display='block';
                            document.getElementById('msgOnLogin').innerHTML = "Logged in Successfully!"
                            showButtons();
                            isValidPassword = true;
                            hideAfterLogIn();
                        }
                        if(Global_C[i][2]==2){
                            isValidPassword = true;
                            alert("The trial version has ended! Subscribe to access the modules!");
                        }
                        
                    }
                }
            
            }
            if(!isValidPassword){
                alert("The Password is incorrect");
            }


        }

        else{
            alert('The Username is not Valid');
        }
        
    }

}

function pwdValue(pStr){

    let lastTwo = pStr.slice(-2);
    let pt0 = pStr.slice(0,pStr.length-2);
    let pt1 = lastTwo.codePointAt(0);
    let pt2 = lastTwo.codePointAt(1);
    console.log(pt0+pt1+pt2);
    return pt0+pt1+pt2;

    // console.log(lastTwo);
    // console.log(lastTwo.codePointAt(0));
    // console.log(lastTwo.codePointAt(1));

}

function checkValidity1(){
    
    console.log(e.target);
}

// This function checks whether the credentials are blank
function isEmpty(){

    if(document.getElementById('userName').value===''){
       return true; 
    }

    else{
        console.log("here");
        if(document.getElementById('passCode').value==='')
            {
                return true;
            }
        else
            {
                return false;
            }
    }
    
}

//this function hides the logged in div after 3 seconds

function hideBanner(){
   
    // document.getElementById('msgOnLogin').style.transition = "all 1s ease-out";
    document.getElementById('msgOnLogin').style.opacity = 0;
    setTimeout(()=>{document.getElementById('msgOnLogin').style.display = 'none';},1000); 
}

//This function checks if the usernanme is valid
function isUserValid(){

    let enteredUserName = document.getElementById('userName').value;
    
    let whetherFound = false;
    for(let i=0;i<validUser.length;i++){
        if(enteredUserName==validUser[i]){
            whetherFound = true;
        }
    }

    return whetherFound;

}

function openModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.getElementById('menuSide1').style.zIndex = 0; //to make sure the hamburger menu doesn't come over the modal
}

function closeModal(){
    var modal = document.getElementById("myModal");
    document.getElementById('menuSide1').style.zIndex = 2;
    document.getElementById('copyBtn').innerHTML = "Copy";
    document.getElementById('copyBtn').style.background = "white";
    document.getElementById('copyBtn').style.color = "firebrick";
    modal.style.display = "none";
}

//Function for Side Menu
function myFunction() {
   

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
        
        if(localStorage.getItem('sessionValidity')=='false')
        {
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


  function copyUPI(){

        /* Get the text field */
    var copyText = document.getElementById("upiDetails");

    /* Select the text field */
    //copyText.innerHTML
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerHTML);

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.innerHTML);

    document.getElementById('copyBtn').style.background = "#1d6e14";
    document.getElementById('copyBtn').style.color = "white";
    document.getElementById('copyBtn').innerHTML = "Copied";
  }


  function goToHome(){

    window.location.assign('index.html');

  }