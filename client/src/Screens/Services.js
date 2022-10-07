import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, React, useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import './Styles/Services.css';

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
                    <img src={source} className="img" alt="Loading..." />
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
        setItemList(data.Item);
    }

    useEffect(()=> {
        getData();
    }, []);

    return ( 
        <div>
            <Navbar />
            <div className="searchBox">
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search your item" />
            </div>
            
            <div className="flex-row">
                <div className="leftBox">
                    
                </div>
                <div className="rightBox">
                    {itemList.map((item)=> {
                        return(
                            <ItemCard name={item.name} price={item.price} source={item.source} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Services;