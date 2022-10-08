import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Styles/Navbar.css';
import { navbarAnchors } from '../Database/localDB';

const Navbar = () => {

    const [user, setUser] = useState();

    function MobileNavigation() {
        var bg_opacity = document.getElementById("BGG");
        var x = document.getElementById("MobNav");
        if (x.className === "MobileLI") {
            document.getElementById("MobNav").className = 'AlternateMobileLI';
        } else {
            x.style.display = "block";
            document.getElementById("MobNav").className = 'MobileLI';
        }

        return false;
    }

    const DisplayNavMobile = (props)=>{
        const navbar = props.navbar;
        
        return (
            <ul className="MobileNavUl">
                {navbar.map((val)=>(
                    <li id={val.heading.toLowerCase()} key={val.id} className="MobileNavLi"><Link to={val.href}>{val.heading}</Link></li>
                ))}
            </ul>
        )
    }
    
    const getData = async () =>{
        const res = await fetch('./getdata');
        const data = await res.json();       
        if(data.isAuthenticated === false) {
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
                <DisplayNavMobile navbar = {navbarAnchors} />
            </div>
        
            <nav className="Nav " id="TopNavHeight">
                {/* <DisplayNavLaptop navbar = {Navbar}/> */}
                <ul className="NavUl">
                    {navbarAnchors.map((anchor, ind)=> {
                        return(
                            <div key={anchor.id} className="dropDown">
                                <li className="NavLi NavBarLi"><Link className='NavLiA' to={anchor.href}> {anchor.heading} </Link></li>
                                <div className="dropdownContent">
                                    {ind !== navbarAnchors.length - 1 && anchor.subLinks.length > 0 && <li className="first-list dropdownlist" ><Link className='dropdownA' to={(anchor.subLinks)[0].href}>{(anchor.subLinks)[0].heading}</Link></li>}
                                    {ind === navbarAnchors.length - 1 &&  <li className="first-list dropdownlist" ><Link className='dropdownA' to="#">{user && user.name}</Link></li>}
                                    {anchor.subLinks.map((links, i)=> {
                                        if(i > 0 || ind === navbarAnchors.length - 1) return(
                                            <li key={links.id} className="dropdownlist" ><Link className='dropdownA' to={links.href}>{links.heading}</Link></li>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </nav>

        </div>
    );
}
 
export default Navbar;