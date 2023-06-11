import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, React, useEffect } from "react";
import './Styles/Services.css';
import Offer from "../Components/Offer";
import { horizontalCarousel } from "../Database/localDB";
import HorizontalCarousel from "../Components/HorizontalCarousel";
import { topStationeryItems } from "../Database/localDB";
import StationeryCarousel from "../Components/StationeryCarousel";
import customStyles from "../Components/Styles/customStyles";

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
    //     const res = await fetch('/auth/getitems',  {
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

    const BannerCarousel = ()=> {
        return(
            <div style={styles.stationeryScroll}>
                {topStationeryItems.map((item)=> {
                    return(
                        <div key={item.id} style={styles.scrollDiv}>
                            HEEH
                        </div>
                    )
                })}
            </div>
        )
    }

    return ( 
        <div>
            <Navbar />
            <Offer />
            <div style={Object.assign({}, customStyles.heading, {margin : "20px 0px 0px 0px"}) }>
                {"Best in class services".toUpperCase()} 
            </div>
            <HorizontalCarousel data={horizontalCarousel} />
            <div style={Object.assign({}, customStyles.heading, {margin : "0px 0px 20px 0px"}) }>
                {"Explore latest Stationeries".toUpperCase()} 
            </div>
            <StationeryCarousel data={topStationeryItems} />
            <div style={Object.assign({}, customStyles.heading, {margin : "20px 0px 0px 0px"}) }>
                {"get all the custom Banners for your village".toUpperCase()} 
            </div>
            <BannerCarousel />
            <Footer />
        </div>
    );
}
 
const styles = {
    stationeryScroll : {
        display  :"flex",
        overflowX : "scroll",
        width  :" 100%",
    },
    scrollDiv : {
        padding : "10px 20px",
    },
}

export default Services;