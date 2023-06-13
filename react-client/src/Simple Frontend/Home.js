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
