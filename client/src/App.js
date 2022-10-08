import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './Components/Signin.js';
import ProtectedRoute from './Helper/ProtectedRoute.js';
import CheckNotAuthenticated from './Helper/CheckNotAuthenticated.js';
import Homepage from './Screens/Homepage.js';
import Services from './Screens/Services.js';
import Loader7 from './Components/Loading.js';

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
                        <Route path='/signin' element={<Signin />} />
                    </Route>
                    <Route path='/loading' element={<Loader7 />} />
                </Routes>
            </div>
        </Router>
    );
}
 
export default App;