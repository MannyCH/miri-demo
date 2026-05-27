import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeDetailView } from '../patterns/RecipeDetailView';
import { CookingModeView } from '../components/CookingModeView';
import { useApp } from '../context/AppContext';
import { usePreferences } from '../context/PreferencesContext';
import { fetchRecipeById } from '../lib/recipesApi';
import { convertIngredients, scaleIngredients } from '../lib/unitConverter';
import { Button } from '../components/Button/Button';
import { getMockRecipeById } from '../demo/mockRecipes';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

function directionsToSteps(directions = []) {
  return directions.map((direction) => ({
    icon: '🍳',
    verb: direction.trim().split(/\s+/)[0].replace(/[.,;:!?]$/, ''),
    items: [{ name: direction }],
    layout: 'simple',
  }));
}

/**
 * Recipe Detail Page
 * Fetches the full recipe (including image) individually so the list
 * fetch can skip image_url and stay under the 10 MB Data API limit.
 */
export function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRecipeToShoppingList } = useApp();
  const { preferences } = usePreferences();
  const [isAdded, setIsAdded] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCooking, setIsCooking] = useState(false);
  const [cookingStep, setCookingStep] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (DEMO) {
      const mock = getMockRecipeById(id);
      if (mock) { setRecipe(mock); setIsLoading(false); return; }
    }
    fetchRecipeById(id)
      .then(setRecipe)
      .catch(() => setRecipe(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return null;
  }

  if (!recipe) {
    return (
      <div style={{ padding: 'var(--spacing-32)', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <Button variant="secondary" showIcon={false} onClick={() => navigate('/recipes')}>Back to Recipes</Button>
      </div>
    );
  }

  const handleAddToList = () => {
    if (isAdded) return;
    addRecipeToShoppingList(recipe.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const scaleFactor = recipe.servings ? preferences.servings / recipe.servings : 1;
  const scaledIngredients = scaleIngredients(recipe.ingredients, scaleFactor);
  const displayRecipe = {
    ...recipe,
    ingredients: convertIngredients(scaledIngredients, preferences.unitSystem),
    servings: preferences.servings,
  };

  if (isCooking) {
    const steps = directionsToSteps(displayRecipe.directions);
    return (
      <CookingModeView
        recipeTitle={displayRecipe.title}
        steps={steps}
        currentStep={cookingStep}
        onNext={() => setCookingStep(s => Math.min(s + 1, steps.length - 1))}
        onBack={() => setCookingStep(s => Math.max(s - 1, 0))}
        onQuit={() => { setIsCooking(false); setCookingStep(0); }}
      />
    );
  }

  return (
    <RecipeDetailView
      recipe={displayRecipe}
      onAddToList={handleAddToList}
      isAdded={isAdded}
      onCook={() => { setCookingStep(0); setIsCooking(true); }}
    />
  );
}
