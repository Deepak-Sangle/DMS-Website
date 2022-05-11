import Navbar from './Components/Navbar.js';
import MainBG from './Components/MainBG.js';
import Offer from './Components/Offer.js';
import Announcement from './Components/Announcement.js';
import Footer from './Components/Footer.js';
import Contact from './Components/contact-us.js';
import './Style.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return ( 
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path='/' element={<><MainBG /><Announcement/><Offer /></>} />
                    <Route path='/contact-us' element={<><Contact/></>} />
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
 
export default App;