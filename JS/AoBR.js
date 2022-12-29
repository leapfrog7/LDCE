

function loadMDO(){
   
    //this unchecks the side bar menu
    document.getElementById("check").checked=false;
    myFunction();


    // if(localStorage.getItem('sessionValidity')=='true'){
          document.getElementById('work_subHeading').style.display = "none";
    //console.log(Options_DB);
    let mdoCount = Options_DB.length;

    let mdoDropDown = document.getElementById("MDO_DropDown");

    if(localStorage.getItem('sessionValidity')=='true'){
        document.getElementById('gotoHome').style.display= 'none';
    }
    else{
        document.getElementById('gotoHome').style.display= 'block';
    }

    for(let i =0;i<mdoCount;i++){

        let option = document.createElement('option');
        option.text = Options_DB[i];
        mdoDropDown.add(option);
    }

    loadWorkAllocation();
    // }

    // else{
    //     location.assign('../index.html');
    // }

  
}


function loadWorkAllocation(){
    
    clearPreviousWorkItems();

    let mdoDropDown = document.getElementById('MDO_DropDown');
    
    let mdoName = mdoDropDown.options[mdoDropDown.selectedIndex].text;

    let num_MDO = AOBR_QB.length;

    for (let i = 0; i< num_MDO;i++){

        if(mdoName == AOBR_QB[i][0]){
            console.log(AOBR_QB[i][1].length);

            let num_work_items = AOBR_QB[i][1].length;
            let bulletList = document.getElementById('list_work');

            for(let j = 0; j<num_work_items;j++){
                let para = document.createElement('li');
                para.innerHTML = AOBR_QB[i][1][j];

               

                //This code bolds the important work allocation items
                if(para.innerHTML.substring(0,1)=="*"){
                    para.style.fontWeight="bold";
                    let strlen = para.innerHTML.length; // the length is needed to slice the string
                    para.innerHTML = para.innerHTML.substring(1,strlen); // The * is being removed
                }  
                bulletList.appendChild(para);              
                
            }
        }

       
    }

    updateSubHeading(mdoName);
    // nextMDO();
}

function clearPreviousWorkItems(){

    let bulletList = document.getElementById('list_work');

    while(bulletList.hasChildNodes()){
        bulletList.removeChild(bulletList.firstChild);
    }

}

function updateSubHeading(name){

    let spanName = document.getElementById("name_mdo");
    let paraName = document.getElementById("work_subHeading");

    spanName.innerHTML = name;

    paraName.style.display = 'block';

}

// function nextMDO(){
//     let mdoLength = Options_DB.length-1;
//     let mdoDropDown = document.getElementById('MDO_DropDown');
//     let currentIndex = mdoDropDown.selectedIndex;
//     console.log("currentIndex"+currentIndex);
//     console.log("mdolenth"+mdoLength);
//     let aglaElement = document.getElementById('nextEntry');
//     // if(currentIndex==mdoLength){
//     //     aglaElement.style.display="hidden";
//     // }
//     // else{
//         aglaElement.innerHTML = mdoDropDown.options[mdoDropDown.selectedIndex+1].text;
//     // }
    
// }

// function showNext(){

//     clearPreviousWorkItems();

//     let mdoDropDown = document.getElementById('MDO_DropDown');
    
//     let mdoName = mdoDropDown.options[mdoDropDown.selectedIndex+1].text;

//     let num_MDO = AOBR_QB.length;

//     for (let i = 0; i< num_MDO;i++){

//         if(mdoName == AOBR_QB[i][0]){
//             console.log(AOBR_QB[i][1].length);

//             let num_work_items = AOBR_QB[i][1].length;
//             let bulletList = document.getElementById('list_work');

//             for(let j = 0; j<num_work_items;j++){
//                 let para = document.createElement('li');
//                 para.innerHTML = AOBR_QB[i][1][j];

               

//                 //This code bolds the important work allocation items
//                 if(para.innerHTML.substring(0,1)=="*"){
//                     para.style.fontWeight="bold";
//                     let strlen = para.innerHTML.length; // the length is needed to slice the string
//                     para.innerHTML = para.innerHTML.substring(1,strlen); // The * is being removed
//                 }  
//                 bulletList.appendChild(para);              
                
//             }
//         }

       
//     }

//     updateSubHeading(mdoName);
//     nextMDO();

// }

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