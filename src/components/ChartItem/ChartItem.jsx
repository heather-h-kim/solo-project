import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function ChartItem({ cat }) {
    const history = useHistory();
    const dispatch = useDispatch();
    console.log('in ChartItem');

    const handleClick = () => {
        console.log('ChartItem cat id is', cat.id);
        dispatch({type:'FETCH_THIS_CAT', payload: cat.id});
        dispatch({type:'FETCH_WEIGHT_HISTORY', payload: cat.id});
        history.push(`/chart-eachcat/${cat.id}`);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleClick}>
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
