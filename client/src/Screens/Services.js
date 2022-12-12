import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, React, useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import './Styles/Services.css';
import img from '../Images/.TempImages/random3.jpg';
import Offer from "../Components/Offer";
import SwipeableViews from 'react-swipeable-views';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import { horizontalCarousel } from "../Database/localDB";
import { autoPlay } from 'react-swipeable-views-utils';

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

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const HorizontalCatalogue = ()=> {

        return (
            <Grid container style={styles.carousel_div}>
                <Grid item md={12} xs={12} style={{margin : "30px"}}>
                    <AutoPlaySwipeableViews enableMouseEvents>
                        {horizontalCarousel.map((service)=> {
                            return(
                                <Grid key={service.id} container style={styles.swipeGrid}>
                                    <Grid item md={4} xs={12} style={styles.carousel_img_grid} className="carousel_img_grid">
                                        <img src={require('../Images/.Boxes/' + service.imgType + '.jpg')} alt="fuckoff" style={styles.img} className="img"/>
                                    </Grid>
                                    <Grid item md={8} xs={12} style={styles.carousel_text_grid} className="carousel_text_grid">
                                        <div style={{width : "30%"}} className="dummyDiv">

                                        </div>
                                        <div style={styles.textDiv} className="textDiv">
                                            <div style={styles.smallHead}>
                                                {service.smallHeading}
                                            </div>
                                            <div style={styles.heading}>
                                                {service.heading}
                                            </div>
                                            <div style={styles.description} className="description">
                                                {service.descirption}
                                            </div>
                                            <div>
                                                <Link to={"#"} style={styles.readMore}>  Read More  </Link>   
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </AutoPlaySwipeableViews>
                </Grid>
            </Grid>
        )
    }

    return ( 
        <div>
            <Navbar />
            <Offer />
            <HorizontalCatalogue />
        </div>
    );
}
 
const styles = {
    carousel_div : {
        // margin : "30px",
        justifyContent : "center",
        position : "relative",
    },
    swipeGrid : {
        height : "100%",
        padding : "10px",
    },
    carousel_img_grid : {
        display : "flex",
        position : "relative",
        left : "100px",
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center",
        padding : "50px",
    },
    img : {
        boxShadow : "0px 0px 10px black",
        objectFit : "cover",
        width : "100%",
        maxWidth : "300px",
        borderRadius : "20px",
        height : "100%",
        margin : "0px",
    },
    carousel_text_grid : {
        color : "white",
        fontFamily : "Segoe UI",
        borderRadius : "20px",
        position : "relative",
        right : "150px",
        zIndex : "-1",
        backgroundColor : "black",
        boxShadow : "0px 0px 10px #888888",
        display : "flex",
        flexFlow : "row wrap",
        justifyContent : "space between",
        padding : "20px",
    },
    textDiv : {
        width : "70%",
        textAlign : "right",
        display : "flex",
        flexFlow : "column wrap",
        justifyContent : "space-evenly",
    },
    smallHead : {
        letterSpacing : "3px",
    },
    heading : {
        fontFamily : "Lucida Grande",
        fontSize : "2rem",
    },
    description : {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "4",
        lineClamp: "4",
        WebkitBoxOrient: "vertical",
    },
    readMore : {
        backgroundColor : "white",
        color : "black",
        padding : "5px 10px",
        borderRadius : "30px",
        fontWeight : "600",
    }
}

export default Services;