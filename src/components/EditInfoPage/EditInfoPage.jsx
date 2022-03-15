import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function EditInfoPage() {
  const store = useSelector((store) => store);
  

  return (
    <div className="container">
        <p>Edit info</p>
      
    </div>
  );
}

export default EditInfoPage;
