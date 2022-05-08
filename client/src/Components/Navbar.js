const Navbar = () => {

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

    const Navbar = [
        {content: 'Home', url:'Home.html', id: 1 },
        {content: 'Services', url:'Pages.html', id: 2 },
        {content: 'Prices', url:'Pages.html', id: 3 },
        {content: 'About', url:'Pages.html', id: 4 },
        {content: 'Account', url:'Pages.html', id: 5 }
    ];

    const DisplayNavMobile = (props)=>{
        const navbar = props.navbar;
        
        return (
            <ul className="MobileNavUl">
                {navbar.map((val)=>(
                    <li id={val.content.toLowerCase()} key={val.id} className="MobileNavLi"><a href={val.url}>{val.content.toUpperCase()}</a></li>
                ))}
            </ul>
        )
    }
    
    return ( 
        <div className="NavBar">
            <nav className="MobileNav">
                <label for="check">
                    <input type="checkbox" onClick={MobileNavigation} id="check" />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </nav>

            <div className="AlternateMobileLI" id="MobNav">
                <DisplayNavMobile navbar = {Navbar.copyWithin()} />
            </div>
        
            <nav className="Nav " id="TopNavHeight">
                {/* <DisplayNavLaptop navbar = {Navbar}/> */}
                <ul className="NavUl">
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><a href="#"> HOME </a></li>
                        <div class="dropdownContent">

                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><a href="#"> SERVICES </a></li>
                        <div class="dropdownContent">
                            <li class="first-list dropdownlist" ><a href="#">All Registers</a></li>
                            <li class="dropdownlist" ><a href="#">New Services</a></li>
                            <li class="dropdownlist" ><a href="#">Other Services</a></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><a href="#"> PRICES </a></li>
                        <div class="dropdownContent">
                            <li class="first-list dropdownlist" ><a href="#">Price Lists</a></li>
                            <li class="dropdownlist" ><a href="#">Order</a></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><a href="#"> ABOUT </a></li>
                        <div class="dropdownContent">
                            <li class="first-list dropdownlist" ><a href="#">Address</a></li>
                            <li class="dropdownlist" ><a href="#">Availability</a></li>
                            <li class="dropdownlist" ><a href="#">Contact</a></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><a href="#"> ACCOUNT </a></li>
                        <div class="dropdownContent">
                            <li class="first-list dropdownlist" ><a href="#">Deepak Sangle</a></li>
                            <li class="dropdownlist" ><a href="#">Sign out</a></li>
                            <li class="dropdownlist" ><a href="#">Cart</a></li>
                            <li class="dropdownlist" ><a href="#">Annoucement</a></li>
                        </div>
                    </div>

                </ul>
            </nav>

        </div>
    );
}
 
export default Navbar;