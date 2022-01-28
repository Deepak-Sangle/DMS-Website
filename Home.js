let NavItems = ["home", "services", "prices", "about", "account"]; 
let flag=0;
DropList();


function MobileNavigation() {
    var x = document.getElementById("MobNav");
    if (x.className === "MobileLI") {
        document.getElementById("MobNav").className = 'AlternateMobileLI';
        document.getElementById("Cross").style.display = "none";
        document.getElementById("Dots").style.display = "block";
    } else {
        x.style.display = "block";
        document.getElementById("MobNav").className = 'MobileLI';
        document.getElementById("Dots").style.display = "none";
        document.getElementById("Cross").style.display = "block";
    }
    
    return false;
}

function DropList(){
    for (let i=0, j=1;i<5;i++,j++) {
        a = document.getElementById(NavItems[i]);
        let x = "drop"+j;
        xa = document.getElementById(x);
        MouseOver(a,xa);
    }
}

function MouseOver(a,xa){
    a.addEventListener("mouseover", function(){
        xa.style.opacity = "1";  
        flag=1;
    });
    a.addEventListener("mouseout", function(){
        xa.addEventListener("mouseover",function(){
            // if(flag)
                xa.style.opacity = "1";
        })
        xa.addEventListener("mouseout", function(){
            xa.style.opacity = "0";
            flag=0;
        })
        xa.style.opacity = "0";
        // flag=0;
    });
}

// let cls = document.getElementById("Box1");
// let cls = document.getElementsByClassName("Box");
// cls[1];
// let cls = document.querySelector(".Box");
// let cls = document.querySelectorAll(".Box~div");
// console.log(cls);

let boxes = document.getElementsByClassName("Box");
// console.log(typeof(boxes));
// for(let i=0;i<boxes.length;i++){
//     boxes[i].addEventListener("click", function(){
//         boxes[i].style.backgroundSize = "110%";
//     })
// }

// let x = confirm("Hey Sexy");
// if(!x){
//     let y = document.getElementById("BODY");
//     y.style.display = "none";
// }
// console.log(`This is how "to add this"`);
function firstclick(){
    alert("BOZO");
}

