import Navbar from './Navbar.js';

const MainBG = () => {
    let NavItems = ["home", "services", "prices", "about", "account"]; 
    let flag=0;
    DropList();

    function DropList(){
        for (let i=0, j=1;i<5;i++,j++) {
            let a = document.getElementById(NavItems[i]);
            let x = "drop"+j;
            let xa = document.getElementById(x);
            // console.log(xa);
            // MouseOver(a,xa);
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


    return ( 
        <div className="MainBG" id="BGG">
        <nav className="Nav" id="DropNav">
            <ul className="NavUl">
                <li className="NavLi" id="drop1">
                    
                </li>
                <li className="NavLi DropLi" id="drop2">
                    <a className="dropList" href="#">All Registers</a>
                    <a className="dropList" href="#">New Services</a>
                    <a className="dropList" href="#">Other Services</a>
                </li>
                <li className="NavLi DropLi" id="drop3">
                    <a className="dropList" href="#">Price Lists</a>
                    <a className="dropList" href="#">Order</a>
                </li>
                <li className="NavLi DropLi" id="drop4">
                    <a className="dropList" href="#">Address</a>
                    <a className="dropList" href="#">Availability</a>
                    <a className="dropList" href="#">Contact</a>
                </li>
            </ul>
            <div className="NavUl">
                <ul className="NavUl">
                    <li className="NavLi DropLi" id="drop5">
                        <a className="dropList" href="#">Deepak Sangle</a>
                        <a className="dropList" href="#">Sign In/Out</a>
                        <a className="dropList" href="#">Cart</a>
                        <a className="dropList" href="#">Annoucements</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="DivLogo">
            {/* <img src="../Images/.DMS/DMS\ Logo.png" alt="" className='Logo'/> */}
            <div className="Logo" />
        </div>

        <div className="nameClass">
            <div className="Name">
                DEEPAK MULTI SERVICES
            </div>
            <div className="Phrase">
                A store for everything you need
            </div>
        </div>
    </div>
    );
}
 
export default MainBG;