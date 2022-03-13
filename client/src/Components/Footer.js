import { useEffect, useState } from "react";

const Footer = () => {
    
    const [links, setLinks] = useState();

    const [quickLink1, setQuickLink1] = useState(null);

    const [quickLink2, setQuickLink2] = useState(null);

    const [quickLink3, setQuickLink3] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:8000/Footer")
        .then(res => res.json())
        .then(data => {
            setLinks(data[0].links);
            setQuickLink1(data[0].quickLink1);
            setQuickLink2(data[0].quickLink2);
            setQuickLink3(data[0].quickLink3);
        })
    },[]);    


    const DisplayLinks = (props)=>{
        const Links = props.link;
        return(
            <div className="linkslist">
                <ul className="LinksUl">
                    {Links && Links.map((link)=>(
                        <li key={link.id}>{link.name}</li>
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
                        <div className="Links" >
                            <DisplayLinks link={quickLink1}/>
                        </div>
                        <div className="Links" >
                            <DisplayLinks link={quickLink2}/>
                        </div>
                        <div className="Links" >
                            <DisplayLinks link={quickLink3}/>
                        </div>
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