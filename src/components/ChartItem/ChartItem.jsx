import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function ChartItem({ cat }) {
    const history = useHistory();
    const dispatch = useDispatch();
    console.log('in ChartItem');

    const handleClick = () => {
        console.log('ChartItem cat id is', cat.id);
        dispatch({type:'FETCH_THIS_CAT', payload: cat.id})
        dispatch({type:'FETCH_WEIGHT_HISTORY', payload: cat.id})
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleClick}>
                {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {cat.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}

export default ChartItem;
