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

    const DisplayNav = (props)=>{
        const mainTitle = props.mainTitle;
        const navbar = props.navbar;
        const classTitle = props.classTitle
        
        return (
            <ul className={mainTitle}>
                {navbar.map((val)=>(
                    <li key={val.id} className={classTitle}><a href={val.url}>{val.content.toUpperCase()}</a></li>
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
                <DisplayNav navbar = {Navbar.copyWithin()} mainTitle='MobileNavUl'classTitle='MobileNavLi'/>
            </div>
        
            <nav className="Nav " id="TopNavHeight">
                <DisplayNav navbar = {Navbar.filter(val => val.id!==5)} mainTitle='NavUl' classTitle='NavLi NavBarLi'/>
                <div className="Account" id="account">
                    <a className="NavLi" href="Pages.html"> ACCOUNT </a>
                </div>
            </nav>

        </div>
    );
}
 
export default Navbar;