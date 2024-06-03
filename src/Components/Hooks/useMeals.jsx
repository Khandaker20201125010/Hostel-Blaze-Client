import { useEffect, useState } from "react";



const useMeals = () => {
 const [meals,setMeals] =useState([]);
 const [loading,setloading] = useState(true);
 useEffect(()=>{
    fetch('http://localhost:5000/meals')
    .then(res => res.json())
    .then(data =>
         {setMeals(data);
         setloading(false); }
           
             );
    
 },[])
 return[meals,loading]
};

export default useMeals;