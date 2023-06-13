import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../Components/Loading';

const ProtectedRoute = () => {
    
    const [auth, setAuth] = useState();

    const checkAuthentication = async ()=>{
        const res = await fetch('/auth/checkauth', {
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
        return auth ? <Outlet /> : <Navigate to='/signin' />;
    else{
        return <Loading />;
    }

}

export default ProtectedRoute;