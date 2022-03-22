import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FoodToDelete from '../FoodToDelete/FoodToDelete';


function EditCatPage() {
  const store = useSelector((store) => store);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState('');
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} =useParams();
  const history = useHistory();

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    dispatch({type: 'FETCH_FOODS', payload: Number(id)});
  }, []);
  
 
  const editName = () => {
    const newName = {
      id: cat.id,
      name: name
    }
    console.log('newName is', newName);
    const confirmation = confirm("Are you sure?")
        if(confirmation === true) {
          dispatch({type:'EDIT_NAME', payload: newName})
          setName('');
          alert('Success!')
        }   
  }

  const editAge = () => {
    const newAge = {
      id: cat.id,
      age: age
    }
    console.log('newAge is', newAge);
    const confirmation = confirm("Are you sure?")
    if(confirmation === true) {
      dispatch({type:'EDIT_AGE', payload: newAge});
      setAge('');
      alert('Success!')
    }  
  }
  
  const editNeuterStatus = () => {
    const newNeuterStatus= {
      id: cat.id,
      is_neutered: neutered
    }
    console.log('newNeuterStatus is', newNeuterStatus);
    const confirmation = confirm("Are you sure?")
    if(confirmation === true) {
      dispatch({type: 'EDIT_NEUTER_STATUS', payload: newNeuterStatus});
      setNeutered('');
      alert('Success!')
    }
  }

  const editWeight = () => {
    const newWeight= {
      id: cat.id,
      current_weight: weight
    }
    console.log('newWeight is', newWeight);
    const confirmation = confirm("Are you sure?")
    if(confirmation === true) {
      dispatch({type: 'EDIT_WEIGHT', payload: newWeight})
      setWeight('');
      alert('Success!')
    }
  }
  
  

  const handleClick = () =>{
    history.push(`/cat-info/${cat.id}`)
  }

  


  return (
    <div className="container">
      <p>Edit info</p>
           <label> Name:
               <input type="text" 
                      placeholder= "new name"
                      name="name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                      />
               <button onClick={editName}>Edit</button>
           </label><br></br>
           <label>Age:
            <select 
                name="age"
                value={age}
                onChange={event => setAge(event.target.value)}
            >
                <option>Select from the options</option>
                <option value="kitten">Kitten</option>
                <option value="adult">Adult</option>
            </select>
            <button onClick={editAge}>Edit</button>
           </label><br></br>    
           <label>Neutered?
            <select 
                name="neuter-status"
                value={neutered}
                onChange={event => setNeutered(event.target.value)}
            >
              <option>Select from the options</option>
                <option value="neutered">Neutered</option>
                <option value="intact">Intact</option>
            </select>
            <button onClick={editNeuterStatus}>Edit</button>
           </label> <br></br>
           <label> Weight:
               <input type="number" 
                      placeholder="new weight"
                      name="weight"
                      value={weight}
                      onChange={event => setWeight(event.target.value)}
                      />
                      <button onClick={editWeight}>Edit</button>
           </label><br></br>
           <table>
             <thead>
               <th>Food name</th>
               <th> </th>
             </thead>
             <tbody>
               {foods.map((food, i) => (
                 <tr key={i}>
                   <FoodToDelete food={food}/>
                 </tr>
               ))}
             </tbody>
           </table>
           <button onClick={handleClick}>Back</button>
          
      


    </div>
  );
}

export default EditCatPage;
