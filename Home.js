let begin = Date.now()
let NavItems = ["home", "services", "prices", "about", "account"]; 
let flag=0;
DropList();

function MobileNavigation() {
    var bg_opacity = document.getElementById("BGG");
    var x = document.getElementById("MobNav");
    if (x.className === "MobileLI") {
        document.getElementById("MobNav").className = 'AlternateMobileLI';
        bg_opacity.className = "MainBG opacity1"
        // bg_opacity.style.opacity = "1";
    } else {
        x.style.display = "block";
        document.getElementById("MobNav").className = 'MobileLI';
        bg_opacity.className = "MainBG opacity0"
        // bg_opacity.style.opacity = "0.2";
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

// let boxes = document.getElementsByClassName("Box");
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
// function firstclick(){
//     alert("BOZO");
// }

// var x = new Date(2020,2,6,20,30,30)
// console.log(x.getMonth()+1)
// x.setDate(5)
// console.log(x.getDate())
// let end = Date.now()
// console.log(end-begin)

// console.log(Math.E)
// console.log(Math.sin(Math.PI/2))
// console.log(Math.tan(Math.PI/2))
// console.log(Math.sin(Math.PI/4)*Math.SQRT2)
// console.log(Math.log10(1000))
// let aa=5,bb=70
// let rndnm = aa + (bb-aa)*Math.random()
// console.log(Math.round(rndnm))

// function debug(text){
//     console.log(text+' HURRAY');
// }

// setTimeout(debug("HURRAY"), 3000);

// function myDisplayer(some) {
//     console.log(some);  
// }

// let myPromise = new Promise(function(y, n) {
//     let x = 0;
//     if (x == 0) {
//         y("OK");
//         // console.log("YES");
//     } 
//     else {
//         n("Erro0r");
//     }
// });
// myPromise.then(
//     function(a) {myDisplayer(a);},
//     (b)=> {console.log(b)}
// );
    
// console.log(myPromise);

// myPromise.finally(
//     ()=> {console.log("FINCALLY:)"); }
// );

// myPromise.catch(
//     ()=> {console.log("FC"); }
// )

// function trial(arr){
//     let n = arr.length,sum=0;
    
//     for(let i=0;i<n;i++){
//         sum+=arr[i];
//     }
//     return sum;
// }

// module.exports = {
//     fn: trial
// }