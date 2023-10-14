import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Styles/Navbar.css';
import { navbarAnchors } from '../Database/localDB';
import { useNavigate } from 'react-router-dom';
import { Fetch } from '../Services/Fetch';
// import Logo from '../Images/.DMS/dms-logo.svg';

const Navbar = () => {

    const navigate = useNavigate();

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
        Fetch('auth/getdata', {
            method : "GET"
        })
          .then((res) => res.json())
          .then((data)=> {
            if(data.isAuthenticated === false) {
                return alert("Hacked");
            }
            setUser(data);
          })
          .catch((err)=> {
            alert(err.message);
          })
    }

    const handleSignout = async () => {
        Fetch('/auth/signout', {
            method : "DELETE",
            headers : {
				"Content-Type" : "application/json"
			}
        })
		  .then(res => res.json())
          .then(data => navigate('/signin'))
        //   .catch((err)=> alert(err.message));
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
                <ul className="NavUl">
                    <div className="dropDown">
                        <li className="NavLi NavBarLi">
                            <Link className='NavLiA' to='/'>
                                {/* <Logo /> */}
                                <img src={require("../Images/.DMS/Logo.png")} width='100vw' />
                            </Link>
                        </li>
                    </div>
                    <div className="dropDown">
                        <li className="NavLi NavBarLi">
                            <Link className='NavLiA' to='/'>ACCOUNT</Link>
                        </li>
                        <div className="dropdownContent">
                            <li className="first-list dropdownlist" >
                                <Link className='dropdownA' to="#">{user && user.name}</Link>
                            </li>
                            <li className="dropdownlist" >
                                <Link className='dropdownA' to='#'>Accouncement</Link>
                            </li>
                            <li onClick={handleSignout} className="dropdownlist last-element-list" >
                                <div className='dropdownA'>Sign Out</div>
                            </li>
                        </div>
                    </div>
                </ul>
            </nav>

        </div>
    );
}
 
export default Navbar;