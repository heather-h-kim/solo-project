import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function FoodAmountPage() {
    const store = useSelector((store) => store);
    const cat = store.thisCat;
    const foods = store.foods;
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [wetPercent, setWetPercent] = useState('');
    const [foodOneName, setFoodOneName] = useState('');
    const [foodTwoName, setFoodTwoName] = useState('');
    const [perCan, setPerCan] = useState('');
    const [foodOnePerKg, setFoodOnePerKg] = useState('');
    const [foodTwoPerKg, setFoodTwoPerKg] = useState('');
    const [perCup, setPerCup] = useState('');
    const [wetFoodId, setWetFoodId] = useState('');
    const [dryFoodId, setDryFoodId] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
        dispatch({ type: 'FETCH_FOODS', payload: Number(id) });
    }, []);
    const wet = (food) => {
        return food.type === 'wet';
    }

    const dry = (food) => {
        return food.type === 'dry';
    }

    const handleSubmit = () => {
        console.log('in food amount handle submit');

        const wetFoodPercentage = {
            id: cat.id,
            wet_percentage: Number(wetPercent)
        }

        const wetFood = {
            cat_id: cat.id,
            name: foodOneName,
            type: 'wet',
            cal_per_can: Number(perCan),
            cal_per_kg: Number(foodOnePerKg),
        }

        const dryFood = {
            cat_id: cat.id,
            name: foodTwoName,
            type: 'dry',
            cal_per_cup: Number(perCup),
            cal_per_kg: Number(foodTwoPerKg)
        }

        const existingWetFood = {
            cat_id: cat.id,
            food_id: wetFoodId
        }

        const existingDryFood = {
            cat_id: cat.id,
            food_id: dryFoodId
        }
        console.log('wetFoodPercentage is', wetFoodPercentage);
        console.log('wetFood is', wetFood);
        console.log('dryFood is', dryFood);

        //Update the wet food percentage of this cat
        dispatch({ type: 'EDIT_WET_PERCENTAGE', payload: wetFoodPercentage });


        if (wetFoodPercentage.wet_percentage === 0) {
            if (dryFood.name === '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingDryFood })
            } else {
                dispatch({ type: 'ADD_DRY_FOOD', payload: dryFood });
            }
        } else if (wetFoodPercentage.wet_percentage === 100) {
            if (wetFood.name === '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingWetFood })
            } else {
                dispatch({ type: 'ADD_WET_FOOD', payload: wetFood });
            }
        } else {
            if (dryFood.name === '' && wetFood.name === '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingDryFood })
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingWetFood })
            } else if (dryFood.name === '' && wetFood.name !== '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingDryFood });
                dispatch({ type: 'ADD_WET_FOOD', payload: wetFood });
            } else if (dryFood.name !== '' && wetFood.name === '') {
                dispatch({ type: 'ADD_DRY_FOOD', payload: dryFood });
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: existingWetFood });
            } else if (dryFood.name !== '' && wetFood.name !== '') {
                dispatch({ type: 'ADD_WET_FOOD', payload: wetFood });
                dispatch({ type: 'ADD_DRY_FOOD', payload: dryFood });
            }
        }
        // history.push(`/result/${cat.id}`)
    }

    console.log('foods are', foods);
    console.log('wetFoodId is', wetFoodId);
    console.log('dryFoodId is', dryFoodId);
    // console.log('wetFoodId is', wetFoodId);
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Desired % of calories from wet food:
                    <input type="number"
                        placeholder="wet food %"
                        value={wetPercent}
                        onChange={event => setWetPercent(event.target.value)}
                    />
                </label><br></br>
                <p>Wet food info</p>
                <p>Select from the dropdown </p>
                <select
                    name="wetfood"
                    value={wetFoodId}
                    onChange={event => setWetFoodId(event.target.value)}>
                    <option value="none">Select from the existing foods</option>
                    {foods.filter(wet).map((food, i) => {
                        return <option key={i} value={food.id}>{food.name} </option>
                    }
                    )}
                </select><br></br>
                <p>or enter the information</p>
                <label>Food name:
                    <input type="text"
                        placeholder="food name"
                        value={foodOneName}
                        onChange={event => setFoodOneName(event.target.value)}
                    />
                </label><br></br>
                <label>Calories per kg:
                    <input type="number"
                        placeholder="calorie"
                        value={foodOnePerKg}
                        onChange={event => setFoodOnePerKg(event.target.value)}
                    />
                </label><br></br>
                <label>Calories per can
                    <input type="number"
                        placeholder="calorie"
                        value={perCan}
                        onChange={event => setPerCan(event.target.value)}
                    />
                </label><br></br>

                <p>Dry food info</p>
                <p>Select from the dropdown </p>
                <select
                    name="dryfood"
                    value={dryFoodId}
                    onChange={event => setDryFoodId(event.target.value)}>
                    <option value="none">Select from the existing foods</option>
                    {foods.filter(dry).map((food, i) => {

                        return <option key={i} value={food.id}>{food.name} </option>
                    }
                    )}
                </select><br></br>
                <p>or enter the information</p>
                <label>Food name:
                    <input type="text"
                        placeholder="food name"
                        value={foodTwoName}
                        onChange={event => setFoodTwoName(event.target.value)}
                    />
                </label><br></br>
                <label>Calories per kg:
                    <input type="number"
                        placeholder="calorie"
                        value={foodTwoPerKg}
                        onChange={event => setFoodTwoPerKg(event.target.value)}
                    />
                </label><br></br>
                <label>Calories per cup
                    <input type="number"
                        placeholder="calorie"
                        value={perCup}
                        onChange={event => setPerCup(event.target.value)}
                    />
                </label><br></br>
                <button type="submit">Submit</button>
            </form>
            <h3>{cat.name} needs</h3>
            {foods.map((food, i) => (
                <ul key={i}>
                    <li>{food.daily_amount_oz} oz of {food.name} a day. </li>
                </ul>
            ))}
        </div>
    );
}

export default FoodAmountPage;
