var initialX = null;
var initialY = null;
 
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
    answer.innerHTML= Correct_Answers_Arr[Question_Counter-1];
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