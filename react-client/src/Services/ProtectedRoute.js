import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../Components/Loading';
import { Fetch } from '../Services/Fetch';
import CommonComponents from '../Components/CommonComponent';

const ProtectedRoute = () => {
    
    const [auth, setAuth] = useState();

    const checkAuthentication = async ()=>{
        const res = await Fetch('/auth/checkauth', {
        	method : "GET",
        	credentials: "include",	
        	headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json',
        	}
        });
        const data = await res.json();
        return res.status===200 ? (data.isAuthenticated) : (false) ;
    }
    
    useEffect(async ()=>{
        const data = await checkAuthentication();
        setAuth(data)
    }, [auth]);

    
    if(auth!=undefined)
        return !auth ? 
            <Navigate to='/signin' /> : 
            <> 
                <CommonComponents/>
                <Outlet />
            </> ;
    else{
        return <Loading />;
    }

}

export default ProtectedRoute;