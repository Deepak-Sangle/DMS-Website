import Navbar from './Components/Navbar.js';
import MainBG from './Components/MainBG.js';
import Offer from './Components/Offer.js';
import Announcement from './Components/Announcement.js';
import Footer from './Components/Footer.js';
import './Style.css'

const App = () => {
    return ( 
        <div className="App">
            <Navbar />
            <MainBG />
            <Offer />
            <Announcement />
            <Footer />
        </div>
    );
}
 
export default App;