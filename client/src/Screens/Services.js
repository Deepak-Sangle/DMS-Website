import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, React, useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import './Styles/Services.css';
import img from '../Images/.TempImages/random3.jpg';
import Offer from "../Components/Offer";

const Services = () => {

    const [searchQuery, setSearchQuery] = useState('');
    
    const [itemList, setItemList] = useState();

    const ItemCard = (props) => {
        const name = props.name;
        const price = props.price;
        const source = props.source;

        return (
            <div className="flex-row cardView">
                <div className="imgDiv flex-row">
                    <img src={img} className="img" alt="Loading..." />
                </div>
                <div className="descriptionDiv">
                    <h2 className="name">{name}</h2>
                    <h3 className="price">Rs. {price}/-</h3>
                    
                </div>
            </div>
        )
    }

    const getData = async () => {
        const res = await fetch('/getitems',  {
			method : "GET",
			credentials: "include",	
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		});
        const data = await res.json();
        setItemList(data);
    }

    useEffect(()=> {
        getData();
    }, []);

    return ( 
        <div>
            <Navbar />
            {/* <div className="searchBox">
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search your item" />
            </div> */}
{/*             
            {itemList!=undefined && <div className="flex-row">
                <div className="leftBox">
                    
                </div>
                <div className="rightBox">
                    {itemList.map((item, i)=> {
                        return(
                            <ItemCard key={i} name={item.name} price={item.price} source={item.source} />
                        )
                    })}
                </div>
            </div>} */}
            <Offer />
            <Footer />
        </div>
    );
}
 
export default Services;