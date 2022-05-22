import { useState, useEffect } from "react"
import './Styles/Annoucement.css';
const localDB = require('../Database/localDB');

const Announcement = () => {

    const [News,setNews] = useState(null);
    
    useEffect( ()=>{
        setNews(localDB.Annoucement);
    },[]);
    
    const DisplayNews = () => {
        return (
            <div className="News">
                
                {News && News.map((news) => (
                    <div className="NewsBox" key={news.key} id={news.id}>
                        <div className="AnncStrt">
                            <div className="NewsBG">
                                <div className="NewsPhoto" id={`NewsPhoto-${news.key}`}/>
                            </div>
                            <h2 className="NewsHead" dangerouslySetInnerHTML={{__html: news.headContent}}>
                            </h2>
                        </div>
                        <div className="NewsData">
                            <div className="NewsInfo" dangerouslySetInnerHTML={{__html: news.mainContent}}>
                            </div>
                        </div>
                        <div className="LearnMore">
                            Learn more...
                        </div>
                        <div className="NewsBottom">
                            {/* <!-- no text --> */}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="Annoucement">
            <div className="Heading">
                <div className="Head">
                    Annoucements
                </div>
            </div>
            <DisplayNews/>

        </div>
    );
}
 
export default Announcement;