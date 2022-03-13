import { useEffect, useState } from "react";

const Offer = () => {
    const [Boxes, setBoxes] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:8000/Offer")
            .then(res=> {
                return res.json()
            })
            .then(data =>{
                setBoxes(data)
            })
    },[]);

    return ( 
    <div className="MainBody">
        <div className="Heading">
            <div className="Head">
                What we Offer...
            </div>
        </div>
        <div className="Boxes">
            {Boxes && Boxes.map((box) => (
                <div className="Box" id={box.id} key={box.id}> { box.content } </div>
            ))}
        </div>
    </div>
    );
}
 
export default Offer;