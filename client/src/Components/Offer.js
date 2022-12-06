import { useEffect, useState } from "react";
import './Styles/Offer.css';
const localDB = require('../Database/localDB');

const Offer = () => {
    const [Boxes, setBoxes] = useState(null);

    useEffect(()=>{
        setBoxes(localDB.Offer);
    },[]);

    return ( 
    <div className="MainBody">
        <div className="Boxes">
            {Boxes && Boxes.map((box) => (
                <div className="Box" id={box.id} key={box.id}> { box.content } </div>
            ))}
        </div>
    </div>
    );
}
 
export default Offer;