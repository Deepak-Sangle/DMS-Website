import './Styles/Footer.css';
import { footerTopics } from "../Database/localDB";

const Footer = () => {
    
    const links = footerTopics[0];

    const DisplayLinks = (props)=>{
        const Links = props.link;
        return(
            <div className="linkslist">
                <ul className="LinksUl">
                    {Links && Links.map((link)=>(
                        <li key={link.id}> {link.name} </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <footer className="BlackBG">
            <div className="BottomLinks">
                <div className="Center">
                    Connect with Us.
                </div>
                <div className="Social">
                    {links && links.map((link)=>(
                        <a href={link.href} key={link.id} className="icon" id={link.id}></a>
                    ))}
                </div>
            </div>

            <div className="Bottom">
                <div className="LinksClass">
                    <div className="QuickLink" id="FirstLink">
                        Quick Links:
                    </div>
                    <div className="MainLinks">
                        {[...Array(3).keys()].map((i)=> {
                            return(
                                <div key={i} className="Links" >
                                    <DisplayLinks link={footerTopics[i+1]}/>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className="Info">
                    <span className="DPSpan">
                        <img src={require("../Images/DP.jpg")} alt="" className="DP" />
                    </span>
                    <div className="Data">
                        <h2>
                            Hello...
                        </h2>

                        <p>
                            &emsp; &emsp; The above website is created by Deepak Sangle. He is a student currently studying
                            at IIT Kanpur in
                            Computer Science Department in his 3rd year Undergraduate Programme. Feel free to connect to
                            him.
                        </p>
                    </div>
                </div>
            </div>

        </footer>
    );
}
 
export default Footer;