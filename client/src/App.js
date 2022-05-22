import Navbar from './Components/Navbar.js';
import MainBG from './Components/MainBG.js';
import Offer from './Components/Offer.js';
import Announcement from './Components/Announcement.js';
import Footer from './Components/Footer.js';
import Signin from './Components/Signin.js';
import Signup from './Components/Signup.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return ( 
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<>
                        <Navbar />
                        <MainBG />
                        <Announcement/>
                        <Offer />
                        <Footer />
                    </>} />
                    <Route path='/signin' element={<>
                        <Signin />
                    </>}/>
                    <Route path='/signup' element={<>
                        <Signup />
                    </>}/>
                </Routes>
            </div>
        </Router>
    );
}
 
export default App;