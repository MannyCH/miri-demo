export const MOCK_RECIPES = [
  {
    id: 'demo-1',
    title: 'Yellow Lentil Soup',
    category: 'Soup',
    categories: ['Soup', 'Vegetarian'],
    meal_type: 'lunch',
    servings: 2,
    thumbnail: '/images/lentil-soup.png',
    image: '/images/lentil-soup.png',
    ingredients: [
      '75g split yellow lentils, washed',
      '50g potato, quartered',
      '½ medium onion, quartered',
      '1 tsp salt',
      '1L water',
      '1L boiling water',
      '¼ tsp ground cumin',
      '¼ tsp ground turmeric',
      '⅛ tsp white pepper',
      '½ lemon, quartered',
    ],
    directions: [
      'In a large saucepan over medium heat, add 1 litre water, the yellow lentils, potato and onion with 1 teaspoon salt, bring to the boil, and cook for 10 minutes. Reduce the heat and cook for a further 25 minutes, until the soup thickens. Skim the surface using a slotted spoon.',
      'Remove from the heat and mash the contents of the pan. Add 1 litre boiling water, the cumin, turmeric and white pepper and whisk for 1 minute. Return to the heat and cook for a further 5 minutes.',
    ],
  },
  {
    id: 'demo-2',
    title: 'Spaghetti Carbonara',
    category: 'Pasta',
    categories: ['Pasta', 'Italian'],
    meal_type: 'dinner',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&w=800&q=80',
    ingredients: [
      '200g spaghetti',
      '100g pancetta or guanciale, diced',
      '2 large eggs',
      '2 egg yolks',
      '50g Pecorino Romano, finely grated',
      '50g Parmesan, finely grated',
      'Freshly cracked black pepper',
      'Salt for pasta water',
    ],
    directions: [
      'Bring a large pot of salted water to the boil.',
      'In a bowl, whisk 2 eggs and 2 egg yolks with the grated Pecorino and Parmesan until smooth. Season generously with black pepper.',
      'Cook 200g spaghetti in the boiling water until 1 minute before al dente. Reserve 200ml pasta water before draining.',
      'Meanwhile, fry 100g pancetta in a large pan over medium heat until crispy, about 5 minutes. Remove from heat.',
      'Add the drained pasta to the pancetta pan off the heat. Toss to coat in the fat.',
      'Add the egg and cheese mixture, tossing quickly. Add pasta water a splash at a time until the sauce is silky and coats the pasta.',
      'Serve immediately with extra black pepper and Parmesan.',
    ],
  },
  {
    id: 'demo-3',
    title: 'Salmon with Asparagus',
    category: 'Fish',
    categories: ['Fish', 'Healthy'],
    meal_type: 'dinner',
    servings: 2,
    thumbnail: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&w=800&q=80',
    ingredients: [
      '2 salmon fillets (approx. 150g each)',
      '200g asparagus, woody ends trimmed',
      '1 lemon, sliced',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      'Salt and black pepper',
      'Fresh dill or parsley to serve',
    ],
    directions: [
      'Preheat oven to 200°C (180°C fan).',
      'Toss 200g asparagus with 1 tbsp olive oil, salt, and pepper on a baking tray.',
      'Place 2 salmon fillets on top of the asparagus. Drizzle with the remaining olive oil.',
      'Scatter minced garlic over the salmon and lay lemon slices on top.',
      'Roast for 15–18 minutes until the salmon is cooked through and flakes easily.',
      'Serve immediately with fresh dill or parsley.',
    ],
  },
  {
    id: 'demo-4',
    title: 'Classic Tomato Bruschetta',
    category: 'Starter',
    categories: ['Starter', 'Italian', 'Vegetarian'],
    meal_type: 'breakfast',
    servings: 4,
    thumbnail: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&w=800&q=80',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&w=800&q=80',
    ingredients: [
      '4 thick slices sourdough bread',
      '4 ripe tomatoes, diced',
      '2 cloves garlic',
      '8 fresh basil leaves, torn',
      '3 tbsp extra-virgin olive oil',
      '1 tsp balsamic vinegar',
      'Salt and black pepper',
    ],
    directions: [
      'Dice 4 ripe tomatoes and place in a bowl. Add torn basil, 2 tbsp olive oil, and 1 tsp balsamic vinegar. Season with salt and pepper. Let sit for 10 minutes.',
      'Toast 4 slices of sourdough bread until golden and crisp.',
      'Rub each warm slice with a halved garlic clove.',
      'Drizzle with remaining olive oil, then spoon the tomato mixture generously over each slice.',
      'Serve immediately.',
    ],
  },
];

export function getMockRecipeById(id) {
  return MOCK_RECIPES.find((r) => r.id === id) ?? null;
}

export function generateDemoMealPlan() {
  const byId = Object.fromEntries(MOCK_RECIPES.map(r => [r.id, r]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schedule = [
    { breakfast: null,      lunch: 'demo-1', dinner: 'demo-2' },
    { breakfast: 'demo-4',  lunch: null,     dinner: 'demo-3' },
    { breakfast: null,      lunch: 'demo-1', dinner: 'demo-2' },
    { breakfast: 'demo-4',  lunch: null,     dinner: 'demo-3' },
    { breakfast: null,      lunch: 'demo-1', dinner: 'demo-2' },
    { breakfast: 'demo-4',  lunch: 'demo-1', dinner: 'demo-3' },
    { breakfast: null,      lunch: null,     dinner: 'demo-2' },
  ];

  return schedule.map((slot, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2),
      fullDate: date.toISOString().split('T')[0],
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      isToday: i === 0,
      meals: {
        breakfast: slot.breakfast ? byId[slot.breakfast] : null,
        lunch: slot.lunch ? byId[slot.lunch] : null,
        dinner: slot.dinner ? byId[slot.dinner] : null,
      },
    };
  });
}
