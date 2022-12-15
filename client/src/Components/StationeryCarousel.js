import {  React } from "react";
import MyCard from "../Components/Card";

const StationeryCarousel = (props) => {

    const topStationeryItems = props.data;

    return(
        <div>
            <div style={styles.stationeryScroll}>
                {topStationeryItems.map((item)=> {
                    return(
                        <div key={item.id} style={styles.scrollDiv}>
                            <MyCard item={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const styles = {
    stationeryScroll : {
        display  :"flex",
        overflowX : "scroll",
        width  :" 100%",
    },
    scrollDiv : {
        padding : "10px 20px",
    },
}
 
export default StationeryCarousel;