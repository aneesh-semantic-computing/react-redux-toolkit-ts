import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFood } from '../features/customerSlice';

interface CustomerCardType {
  id: string,
  name: string,
  food: string[]
}
export default function CustomerCard({id, name, food}: CustomerCardType) {
  const dispatch = useDispatch();
  const [foodInput, setFoodInput] = useState<string>("");
  return (
    <div className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((food) => <p>{food}</p>)}
        </div>
        <div className="customer-food-input-container">
          <input value={foodInput} onChange={(e) => setFoodInput(e.target.value)} />
          <button onClick={()=>{
            if(!foodInput) return;
            dispatch(addFood({id, food: foodInput}));
            setFoodInput("");
          }}>Add</button>
        </div>
      </div>
    </div>
  )
}
