
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function CatItem({ cat }) {
    const history = useHistory();
    const dispatch = useDispatch();
    console.log('in catItem');
    const handleClick = () => {
        console.log('CatItem cat id is', cat.id);
        dispatch({type:'FETCH_THIS_CAT', payload: cat.id})
        dispatch({type:'FETCH_FOODS', payload: cat.id})
        history.push(`/cat-info/${cat.id}`);
    }

    return (
        <Card sx={{ maxWidth: 345, mb:'20px', mt:'20px'}}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cat.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Current weight: {cat.current_weight}lbs
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}

export default CatItem;
