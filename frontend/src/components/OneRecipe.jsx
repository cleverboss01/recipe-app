const OneRecipe = ({ recipe }) => {
  return (
    <div>
      <>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
          {recipe.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
        <p className="method">{recipe.method}</p>
      </>
      )
    </div>
  );
};

export default OneRecipe;
