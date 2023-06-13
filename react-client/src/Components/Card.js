import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';

const MyCard = ({item}) => {

    const handleClick = ()=> {
        // go to item.id 
    }

    return (
        <Card variant="outlined" sx={{width : 300}} style={styles.card}>
            <CardOverflow>
                <AspectRatio ratio="2">
                <img
                    src={require('../Images/.Stationery/' + item.dbName + '.jpg')}
                    alt="Fuckoff"
                />
                </AspectRatio>
            </CardOverflow>
            <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }} style={styles.heading}> {item.name} </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }} style={styles.description}> {item.description}</Typography>
            <Divider />
            <CardOverflow variant="soft" sx={{ display: 'flex', gap: 1.5, py: 1.5, px: 'var(--Card-padding)', bgcolor: 'background.level1',}} style={styles.bottom}>
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} style={styles.price}> &#8377;{item.price}  </Typography>
                <Divider orientation="vertical" />
                <Button variant="solid" style={styles.viewItem} onClick={handleClick}> View Item </Button>
            </CardOverflow>
        </Card>
    );
}

const styles = {
    card : {
        boxShadow : "0px 0px 10px #888888",
        border : "0px",
        fontFamily : "Segoe UI",
        flexShrink : "0",
    },
    heading : {
        fontFamily : "Open Sans",
        fontWeight : "600",
        fontSize : "1.2rem",
    },
    description : {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        lineClamp: "2",
        WebkitBoxOrient: "vertical",
        lineHeight : "1em",
        height : "2em",
    },
    bottom : {
        display : "flex",
        flexFlow : "row wrap",
        justifyContent : "space-between",
    }
}

export default MyCard;