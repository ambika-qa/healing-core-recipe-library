// Starter demo data. Replace these examples with your own recipes when connecting Supabase.
const recipes = [
  {id:1,name:"Coconut Chickpea Pulao",categories:["One-Pot Meals","Plant-Based Protein"],description:"A comforting one-pot rice meal with chickpeas and creamy coconut milk.",time:"35 min",type:"Lunch / Dinner",emoji:"🥥",tone:"green",ingredients:["1 cup rice, rinsed","1 cup cooked chickpeas","¾ cup coconut milk","1 small carrot, chopped","Ginger, cumin and salt to taste"],steps:["Rinse the rice until the water runs mostly clear.","Add rice, chickpeas, vegetables, coconut milk and water to a pot.","Season gently and cook covered until the rice is tender.","Rest for 5 minutes, fluff and serve warm."]},
  {id:2,name:"Moong Dal Khichadi",categories:["Gut-Friendly","One-Pot Meals","Satvic"],description:"A soft, simple rice and mung dal comfort bowl.",time:"30 min",type:"Lunch / Dinner",emoji:"🍲",tone:"sand",ingredients:["½ cup rice","½ cup split yellow mung dal","½ tsp cumin","¼ tsp turmeric","Water and salt to taste"],steps:["Rinse rice and dal well; soak if convenient.","Add to a pot with turmeric, cumin and water.","Simmer until soft and porridge-like, adding water as needed.","Serve warm. Adjust texture and seasoning to your preference."]},
  {id:3,name:"Mango Protein Smoothie",categories:["Breakfast & Smoothies","Plant-Based Protein"],description:"A creamy fruit smoothie with a plant-based protein boost.",time:"5 min",type:"Breakfast",emoji:"🥭",tone:"peach",ingredients:["1 cup ripe mango","1 cup unsweetened soy milk","½ banana","1 scoop plain pea protein, optional","Water or ice as needed"],steps:["Add all ingredients to a blender.","Blend until creamy and smooth.","Adjust thickness with water or ice and serve fresh."]},
  {id:4,name:"Ragi Dosa",categories:["Breakfast & Smoothies","Satvic"],description:"A crisp-edged dosa idea for a nourishing breakfast.",time:"20 min",type:"Breakfast",emoji:"🥞",tone:"lilac",ingredients:["½ cup ragi flour","¼ cup rice flour","½ cup plain yogurt or water","Cumin, optional","Water and salt to taste"],steps:["Whisk the flours with yogurt or water, salt and enough water to make a pourable batter.","Rest for 10 minutes.","Pour a thin layer onto a warm, lightly greased pan.","Cook until the edges crisp, flip briefly and serve."]},
  {id:5,name:"Date & Oat Energy Bites",categories:["Guilt-Free Treats","Snacks & Light Meals"],description:"No-bake bites made with dates, oats and nut butter.",time:"15 min",type:"Snack",emoji:"🌰",tone:"blue",ingredients:["1 cup soft pitted dates","¾ cup rolled oats","2 tbsp nut butter","1 tbsp ground flaxseed, optional","Cinnamon to taste"],steps:["Pulse dates in a food processor until sticky.","Add oats, nut butter, flaxseed and cinnamon.","Roll into small bites; add a little water if the mixture is too dry.","Chill in a sealed container."]},
  {id:6,name:"Cucumber Chickpea Salad",categories:["Gut-Friendly","Plant-Based Protein","Snacks & Light Meals"],description:"A fresh, crunchy salad with chickpeas and herbs.",time:"10 min",type:"Lunch / Side",emoji:"🥗",tone:"green",ingredients:["1 cup cooked chickpeas","1 cucumber, diced","1 tomato, diced","Fresh coriander or parsley","Lemon juice and olive oil to taste"],steps:["Combine chickpeas, cucumber and tomato in a bowl.","Add herbs, lemon juice and olive oil.","Toss gently and serve fresh. For sensitive digestion, adjust raw vegetables to your own tolerance."]},
  {id:7,name:"Warm Cinnamon Pears",categories:["Desserts & Baking","Gut-Friendly"],description:"Soft warm pears with cinnamon for a simple dessert.",time:"12 min",type:"Dessert",emoji:"🍐",tone:"sand",ingredients:["2 ripe pears, sliced","¼ tsp cinnamon","2 tbsp water","Chopped walnuts, optional"],steps:["Place pears, cinnamon and water in a small covered pan.","Cook gently for 8–10 minutes until soft.","Top with walnuts if desired and serve warm."]},
  {id:8,name:"Ginger Lemon Cooler",categories:["Drinks","Satvic"],description:"A refreshing, gently zingy drink for a warm afternoon.",time:"5 min",type:"Drink",emoji:"🍋",tone:"peach",ingredients:["1 cup cool water","1–2 tsp lemon juice","A few thin slices of ginger","Mint leaves, optional"],steps:["Add ginger to the water and let it infuse for a few minutes.","Stir in lemon juice and mint if using.","Serve chilled or at room temperature."]},
  {id:9,name:"Tofu Veggie Bowl",categories:["Plant-Based Protein","One-Pot Meals"],description:"A flexible bowl with tofu, grains and colourful vegetables.",time:"25 min",type:"Lunch / Dinner",emoji:"🥦",tone:"blue",ingredients:["150 g firm tofu, cubed","1 cup cooked quinoa or rice","1 cup chopped vegetables","1 tsp sesame oil, optional","Ginger and tamari to taste"],steps:["Pat tofu dry and pan-sear until lightly golden.","Cook vegetables until they reach your preferred texture.","Serve over quinoa or rice with tofu.","Season with ginger and a little tamari."]},
  {id:10,name:"Banana Oat Pancakes",categories:["Breakfast & Smoothies","Guilt-Free Treats"],description:"A simple, naturally sweet breakfast made with pantry staples.",time:"15 min",type:"Breakfast",emoji:"🥞",tone:"lilac",ingredients:["1 ripe banana","½ cup rolled oats, ground","1 egg or flax egg","¼ cup milk of choice","½ tsp baking powder"],steps:["Mash banana and whisk with egg and milk.","Stir in ground oats and baking powder.","Cook small pancakes on a lightly greased pan over medium-low heat.","Flip when bubbles appear and cook through."]}
];
const categoryNames = ["All Recipes","Breakfast & Smoothies","One-Pot Meals","Plant-Based Protein","Gut-Friendly","Satvic","Snacks & Light Meals","Guilt-Free Treats","Desserts & Baking","Drinks"];
let selectedCategory = "All Recipes";
const grid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search");
const categoriesEl = document.getElementById("categories");
const countEl = document.getElementById("recipe-count");
const emptyEl = document.getElementById("empty-state");
const dialog = document.getElementById("recipe-dialog");

function renderCategories(){
  categoriesEl.innerHTML = "";
  categoryNames.forEach(name => {
    const btn = document.createElement("button");
    btn.className = "category" + (selectedCategory === name ? " active" : "");
    btn.textContent = name;
    btn.type = "button";
    btn.addEventListener("click", () => { selectedCategory = name; renderCategories(); renderRecipes(); });
    categoriesEl.appendChild(btn);
  });
}
function recipeMatches(recipe, query){
  const text = [recipe.name, recipe.description, recipe.type, ...recipe.categories, ...recipe.ingredients].join(" ").toLowerCase();
  const categoryMatch = selectedCategory === "All Recipes" || recipe.categories.includes(selectedCategory);
  return categoryMatch && text.includes(query.toLowerCase().trim());
}
function renderRecipes(){
  const query = searchInput.value;
  const shown = recipes.filter(r => recipeMatches(r, query));
  countEl.textContent = `${shown.length} ${shown.length === 1 ? "recipe" : "recipes"} shown`;
  grid.innerHTML = "";
  emptyEl.hidden = shown.length !== 0;
  shown.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.tabIndex = 0;
    card.setAttribute("role","button");
    card.setAttribute("aria-label",`Open ${recipe.name} recipe`);
    card.innerHTML = `<div class="recipe-visual ${recipe.tone}"><div class="bowl" aria-hidden="true">${recipe.emoji}</div></div>
      <div class="card-body"><div class="card-tags">${recipe.categories.slice(0,2).map(c=>`<span class="tag">${escapeHtml(c)}</span>`).join("")}</div>
      <h3>${escapeHtml(recipe.name)}</h3><p>${escapeHtml(recipe.description)}</p>
      <div class="card-meta"><span>◷ ${escapeHtml(recipe.time)}</span><span>${escapeHtml(recipe.type)}</span></div></div>`;
    card.addEventListener("click",()=>openRecipe(recipe));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openRecipe(recipe);}});
    grid.appendChild(card);
  });
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openRecipe(recipe){
  document.getElementById("dialog-content").innerHTML = `<div class="dialog-visual ${recipe.tone}">${recipe.emoji}</div>
    <div class="card-tags">${recipe.categories.map(c=>`<span class="tag">${escapeHtml(c)}</span>`).join("")}</div>
    <h2>${escapeHtml(recipe.name)}</h2><p>${escapeHtml(recipe.description)}</p>
    <div class="detail-meta">◷ ${escapeHtml(recipe.time)} &nbsp; • &nbsp; ${escapeHtml(recipe.type)}</div>
    <h3>Ingredients</h3><ul>${recipe.ingredients.map(i=>`<li>${escapeHtml(i)}</li>`).join("")}</ul>
    <h3>Method</h3><ol>${recipe.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ol>`;
  dialog.showModal();
}
searchInput.addEventListener("input",renderRecipes);
document.getElementById("clear-filters").addEventListener("click",()=>{searchInput.value="";selectedCategory="All Recipes";renderCategories();renderRecipes();});
document.getElementById("close-dialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();searchInput.focus();}});
document.getElementById("year").textContent = new Date().getFullYear();
renderCategories();renderRecipes();
