import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './Components/Signin.js';
import ProtectedRoute from './Helper/ProtectedRoute.js';
import CheckNotAuthenticated from './Helper/CheckNotAuthenticated.js';
import Homepage from './Screens/Homepage.js';
import Services from './Screens/Services.js';

const App = () => {
    return ( 
        <Router>
            <div className="App">
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