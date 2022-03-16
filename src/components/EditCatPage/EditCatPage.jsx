import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function EditCatPage() {
  const store = useSelector((store) => store);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState('');
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const {id} =useParams();
  const history = useHistory();

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: id});
  }, []);
  
 
  const editName = () => {
    const newName = {
      id: cat.id,
      name: name
    }
    console.log('newName is', newName);
    dispatch({type:'EDIT_NAME', payload: newName})
    // let second = Object.keys(newName);
    // console.log('second is', second[1]);
    // let result = newName.hasOwnProperty('name');
    // console.log('result is', result);
  }

  const editAge = () => {
    const newAge = {
      id: cat.id,
      age: age
    }
    console.log('newAge is', newAge);
    dispatch({type:'EDIT_AGE', payload: newAge});
  }
  
  const editNeuterStatus = () => {
    const newNeuterStatus= {
      id: cat.id,
      is_neutered: neutered
    }
    console.log('newNeuterStatus is', newNeuterStatus);
    dispatch({type: 'EDIT_NEUTER_STATUS', payload: newNeuterStatus});
  }

  const editWeight = () => {
    const newWeight= {
      id: cat.id,
      current_weight: weight
    }
    console.log('newWeight is', newWeight);
    dispatch({type: 'EDIT_WEIGHT', payload: newWeight})
  }
  
  const handleClick = () =>{
    history.push(`/cat-info/${cat.id}`)
  }



  return (
    <div className="container">
      <p>Edit info</p>
           <label> Name:
               <input type="text" 
                      placeholder= {cat.name}
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
                <option value="neutered">Neutered</option>
                <option value="intact">Intact</option>
            </select>
            <button onClick={editNeuterStatus}>Edit</button>
           </label> <br></br>
           <label> Weight:
               <input type="number" 
                      placeholder={cat.current_weight}
                      name="weight"
                      value={weight}
                      onChange={event => setWeight(event.target.value)}
                      />
                      <button onClick={editWeight}>Edit</button>
           </label><br></br>
           <button onClick={handleClick}>Back</button>
          
      


    </div>
  );
}

export default EditCatPage;
