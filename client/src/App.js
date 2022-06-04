import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './Components/Signin.js';
import Signup from './Components/Signup.js';
import ProtectedRoute from './Helper/ProtectedRoute.js';
import CheckNotAuthenticated from './Helper/CheckNotAuthenticated.js';
import Homepage from './Screens/Homepage.js';
import Services from './Screens/Services.js';

const App = () => {
    return ( 
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route path='/' element={<Homepage />} />
                    </Route>
                    <Route path='/signin' element={<CheckNotAuthenticated />}>
                        <Route path='/signin' element={<Signin />} />
                    </Route>
                    <Route path='/signup' element={<CheckNotAuthenticated />}>
                        <Route path='/signup' element={<Signup />} />
                    </Route>
                    <Route path='/services' element={<ProtectedRoute />}>
                        <Route path='/services' element={<Services />} />
                    </Route>

                </Routes>
            </div>
        </Router>
    );
}
 
export default App;