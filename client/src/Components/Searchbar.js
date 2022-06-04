import {React } from "react";
import '../Components/Styles/Searchbar.css';

const Searchbar = (props) => {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const placeholder = props.placeholder;

    return (
        <div className="searchDiv">
            <input 
				type="text" 
				value={searchQuery} 
				onChange={(e)=>setSearchQuery(e.target.value)} 
				placeholder={placeholder} 
                className="searchInput"
			/>
        </div>
    );
}

export default Searchbar;