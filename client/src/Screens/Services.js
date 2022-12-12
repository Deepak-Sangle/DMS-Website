import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, React, useEffect } from "react";
import './Styles/Services.css';
import Offer from "../Components/Offer";
import {Link} from 'react-router-dom';
import { horizontalCarousel } from "../Database/localDB";
import HorizontalCarousel from "../Components/HorizontalCarousel";

const Services = () => {

    // const [searchQuery, setSearchQuery] = useState('');
    
    // const [itemList, setItemList] = useState();

    // const ItemCard = (props) => {
    //     const name = props.name;
    //     const price = props.price;
    //     const source = props.source;

    //     return (
    //         <div className="flex-row cardView">
    //             <div className="imgDiv flex-row">
    //                 <img src={img} className="img" alt="Loading..." />
    //             </div>
    //             <div className="descriptionDiv">
    //                 <h2 className="name">{name}</h2>
    //                 <h3 className="price">Rs. {price}/-</h3>
                    
    //             </div>
    //         </div>
    //     )
    // }

    // const getData = async () => {
    //     const res = await fetch('/getitems',  {
	// 		method : "GET",
	// 		credentials: "include",	
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json',
	// 		}
	// 	});
    //     const data = await res.json();
    //     setItemList(data);
    // }

    // useEffect(()=> {
    //     getData();
    // }, []);

    return ( 
        <div>
            <Navbar />
            <Offer />
            <HorizontalCarousel data={horizontalCarousel} />
            <Footer />
        </div>
    );
}
 
export default Services;