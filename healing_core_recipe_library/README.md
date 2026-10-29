# Healing Core Recipe Library — starter

This is the first working **front-end prototype** for your recipe library. It includes:
- Responsive layout for desktop and mobile
- Search by recipe name, ingredients, description, or category
- Category filters (recipes can belong to multiple categories)
- Recipe detail view with ingredients and method
- 10 editable example recipes

## Important before publishing
This version uses example recipes stored in `app.js`. It is a visual/functional prototype, **not yet connected to a shared database**. Anyone visiting it can browse the example recipes, but changes made in the code are not managed through an admin screen. Do not add private client information.

## The next setup step
1. Create a free GitHub account at https://github.com/ if you don't already have one.
2. Create a free Supabase account at https://supabase.com/ when you're ready for shared recipe storage.
3. Create a GitHub repository and upload these files.
4. Deploy the repository using Cloudflare Pages (free tier).
5. Create the Supabase table using `supabase-schema.sql`; connect the site to it.
6. Keep adding/editing recipes through Supabase's dashboard at first. Before adding a public admin form, set up secure authentication and row-level security so visitors cannot edit your recipes.

You do **not** need to buy a domain to begin; the free hosting URL is enough.

## Editing the example recipes
Open `app.js` and edit the `recipes` array. Each recipe has:
- `name`
- `categories` (one or more tags)
- `description`
- `time`
- `type`
- `emoji` and `tone` (temporary placeholders for this prototype)
- `ingredients` (array)
- `steps` (array)

For the final version, replace emoji illustrations with your own optimized food photos. Aim for WebP or JPEG images around 1200px wide and 150–300 KB each where possible.

## Suggested categories
Breakfast & Smoothies, One-Pot Meals, Plant-Based Protein, Gut-Friendly, Satvic, Snacks & Light Meals, Guilt-Free Treats, Desserts & Baking, Drinks, Weight Management.

Use “gut-friendly” as a descriptive category rather than promising that a recipe heals a medical condition; tolerance varies by person.
