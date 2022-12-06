import Navbar from '../Components/Navbar.js';
import MainBG from '../Components/MainBG.js';
import Offer from '../Components/Offer.js';
import Announcement from '../Components/Announcement.js';
import Footer from '../Components/Footer.js';
import { useEffect } from 'react';

const Homepage = () => {

    return (
        <>
            <Navbar />
            <MainBG />
            <Announcement/>
            <Footer />            
        </>
    );
}
 
export default Homepage;