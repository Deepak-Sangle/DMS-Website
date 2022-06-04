import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Styles/Navbar.css';

const Navbar = () => {

    const [user, setUser] = useState();

    function MobileNavigation() {
        var bg_opacity = document.getElementById("BGG");
        var x = document.getElementById("MobNav");
        if (x.className === "MobileLI") {
            document.getElementById("MobNav").className = 'AlternateMobileLI';
            bg_opacity.className = "MainBG opacity1"
        } else {
            x.style.display = "block";
            document.getElementById("MobNav").className = 'MobileLI';
            bg_opacity.className = "MainBG opacity0"
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
                    <li id={val.content.toLowerCase()} key={val.id} className="MobileNavLi"><Link to={val.url}>{val.content.toUpperCase()}</Link></li>
                ))}
            </ul>
        )
    }
    
    const getData = async () =>{
        const res = await fetch('./getdata');
        const data = await res.json();       
        if(data.isAuthenticated==false) {
            alert("Hacked");
        }
        else setUser(data);
    }

    useEffect(()=>{
        getData();
    },[]);

    return ( 
        <div className="NavBar">
            <nav className="MobileNav">
                <label htmlFor="check">
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
                        <li className="NavLi NavBarLi"><Link to="/"> HOME </Link></li>
                        <div className="dropdownContent">

                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><Link to="/services"> SERVICES </Link></li>
                        <div className="dropdownContent">
                            <li className="first-list dropdownlist" ><Link to="#">All Services</Link></li>
                            <li className="dropdownlist" ><Link to="#">All Registers</Link></li>
                            <li className="dropdownlist" ><Link to="#">Other Services</Link></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><Link to="#"> PRICES </Link></li>
                        <div className="dropdownContent">
                            <li className="first-list dropdownlist" ><Link to="#">Price Lists</Link></li>
                            <li className="dropdownlist" ><Link to="#">Order</Link></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><Link to="#"> ABOUT </Link></li>
                        <div className="dropdownContent">
                            <li className="first-list dropdownlist" ><Link to="#">Address</Link></li>
                            <li className="dropdownlist" ><Link to="#">Availability</Link></li>
                            <li className="dropdownlist" ><Link to="/contact-us">Contact</Link></li>
                        </div>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi"><Link to="#"> ACCOUNT </Link></li>
                        <div className="dropdownContent">
                            <li className="first-list dropdownlist" ><Link to="#">{user && user.name}</Link></li>
                            <li className="dropdownlist" ><Link to="#">Sign out</Link></li>
                            <li className="dropdownlist" ><Link to="#">Cart</Link></li>
                            <li className="dropdownlist" ><Link to="#">Annoucement</Link></li>
                        </div>
                    </div>

                </ul>
            </nav>

        </div>
    );
}
 
export default Navbar;