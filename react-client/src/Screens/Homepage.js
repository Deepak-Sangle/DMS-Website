import React, {useEffect} from 'react';

import Navbar from '../Components/Navbar.js';
import Offer from '../Components/Offer.js';
import HorizontalCarousel from '../Components/HorizontalCarousel.js';
import StationeryCarousel from '../Components/StationeryCarousel.js';
import Announcement from '../Components/Announcement.js';
import Footer from '../Components/Footer.js';
import customStyles from '../Components/Styles/customStyles.js';

import { horizontalCarousel } from "../Database/localDB";
import { topStationeryItems } from "../Database/localDB";


const Homepage = () => {

    return (
        <>
            <Offer />
            <div style={Object.assign({}, customStyles.heading, {margin : "20px 0px 20px 0px"}) }>
                {"Other Services".toUpperCase()} 
            </div>
            <HorizontalCarousel data={horizontalCarousel} />
            <Announcement/>
            <div style={Object.assign({}, customStyles.heading, {margin : "20px 0px 20px 0px"}) }>
                {"Best in class services".toUpperCase()} 
            </div>
            <StationeryCarousel data={topStationeryItems} />
            {/* <div style={Object.assign({}, customStyles.heading, {margin : "20px 0px 0px 0px"}) }>
                {"get all the custom Banners for your village".toUpperCase()} 
            </div> */}
            <Footer />
        </>
    );
}
 
export default Homepage;