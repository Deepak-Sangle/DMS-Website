import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './Components/Signin.js';
import ProtectedRoute from './Services/ProtectedRoute.js';
import CheckNotAuthenticated from './Services/CheckNotAuthenticated.js';
import Homepage from './Screens/Homepage.js';
import Services from './Screens/Services.js';
import CommonComponents from './Components/CommonComponent.js';
import { ToastContainer } from "react-toastify";

const App = () => {
    return ( 
        <Router>
            <div className="App">
                <ToastContainer limit={1} />
                <Routes>
                    <Route path='/' element={<ProtectedRoute/>}>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/services' element={<Services />} />
                    </Route>
                    <Route path='/' element={<CheckNotAuthenticated />}>
                        <Route exact path='/signin' element={<Signin />} />
                        <Route path='/signin/:confirmationCode' element={<Signin />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}
 
export default App;