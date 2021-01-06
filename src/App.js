import React, { useEffect, useState } from 'react';
import Recipe from './Components/recipe'

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID
  const APP_KEY = process.env.REACT_APP_APP_KEY
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  const endPoint = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  
  
  useEffect(()=> {
    getRecipes()
  }, [query])
  
  console.log(query)
  const getRecipes = async () => {
    const allData = await fetch(endPoint);
    const data = await allData.json();
    setRecipes(data.hits);
  }


  const handleSeachBar = (e) => {
   const newValue =  e.target.value; 
   setSearch(newValue);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }


  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input value={search} tyoe="text" onChange={handleSeachBar}/>
        <button type="submit">Send</button>
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
          ))}
      </form>
    </React.Fragment>
  );
}

export default App;
