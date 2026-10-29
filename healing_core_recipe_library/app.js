// Public recipe reader for Healing Core. Publishable keys are designed for browser use.
const SUPABASE_URL = 'https://obfivpchpetkeibocflf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_h-It4wWp-nVF8zcTaSt0Fw_zHhNnTqn';
const REST_URL = `${SUPABASE_URL}/rest/v1/recipes?select=*&published=eq.true&order=created_at.desc`;
const categoryNames = ['All Recipes','Breakfast & Smoothies','One-Pot Meals','Plant-Based Protein','Gut-Friendly','Satvic','Snacks & Light Meals','Guilt-Free Treats','Desserts & Baking','Drinks','Weight Management'];
let recipes = [];
let selectedCategory = 'All Recipes';
const grid = document.getElementById('recipe-grid');
const searchInput = document.getElementById('search');
const categoriesEl = document.getElementById('categories');
const countEl = document.getElementById('recipe-count');
const emptyEl = document.getElementById('empty-state');
const dialog = document.getElementById('recipe-dialog');
function esc(v){return String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderCategories(){
 categoriesEl.innerHTML='';
 categoryNames.forEach(name=>{const b=document.createElement('button');b.className='category'+(selectedCategory===name?' active':'');b.textContent=name;b.type='button';b.addEventListener('click',()=>{selectedCategory=name;renderCategories();renderRecipes();});categoriesEl.appendChild(b);});
}
function matches(r,q){const cats=r.categories||[],ings=r.ingredients||[];const hay=[r.name,r.description,r.recipe_type,...cats,...ings].join(' ').toLowerCase();return (selectedCategory==='All Recipes'||cats.includes(selectedCategory))&&hay.includes(q.toLowerCase().trim());}
function recipeImage(r){return r.image_url?`<img class="recipe-photo" src="${esc(r.image_url)}" alt="${esc(r.name)}" loading="lazy">`:`<div class="recipe-visual green"><div class="bowl" aria-hidden="true">🥣</div></div>`;}
function renderRecipes(){
 const shown=recipes.filter(r=>matches(r,searchInput.value));countEl.textContent=`${shown.length} ${shown.length===1?'recipe':'recipes'} shown`;grid.innerHTML='';emptyEl.hidden=shown.length>0;
 const title=document.getElementById('empty-title'),message=document.getElementById('empty-message');
 if(!shown.length){title.textContent=recipes.length?'No matching recipes':'Your recipe library is ready';message.textContent=recipes.length?'Try another search or choose a different category.':'No recipes have been published yet. Add your first recipe in Supabase and mark it as published.';}
 shown.forEach(r=>{const card=document.createElement('article');card.className='recipe-card';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',`Open ${r.name} recipe`);card.innerHTML=`${recipeImage(r)}<div class="card-body"><div class="card-tags">${(r.categories||[]).slice(0,2).map(c=>`<span class="tag">${esc(c)}</span>`).join('')}</div><h3>${esc(r.name)}</h3><p>${esc(r.description||'')}</p><div class="card-meta"><span>◷ ${r.prep_minutes?`${Number(r.prep_minutes)} min`:'Time varies'}</span><span>${esc(r.recipe_type||'Recipe')}</span></div></div>`;card.addEventListener('click',()=>openRecipe(r));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openRecipe(r);}});grid.appendChild(card);});
}
function openRecipe(r){const visual=r.image_url?`<img class="dialog-photo" src="${esc(r.image_url)}" alt="${esc(r.name)}">`:`<div class="dialog-visual">🥣</div>`;document.getElementById('dialog-content').innerHTML=`${visual}<div class="card-tags">${(r.categories||[]).map(c=>`<span class="tag">${esc(c)}</span>`).join('')}</div><h2>${esc(r.name)}</h2><p>${esc(r.description||'')}</p><div class="detail-meta">◷ ${r.prep_minutes?`${Number(r.prep_minutes)} min`:'Time varies'} &nbsp; • &nbsp; ${esc(r.recipe_type||'Recipe')}</div><h3>Ingredients</h3><ul>${(r.ingredients||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>Method</h3><ol>${(r.steps||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;dialog.showModal();}
async function loadRecipes(){
 countEl.textContent='Connecting to your recipe database…';
 try{const res=await fetch(REST_URL,{headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`}});if(!res.ok)throw new Error(`Supabase request failed (${res.status}): ${await res.text()}`);recipes=await res.json();renderCategories();renderRecipes();}
 catch(err){console.error(err);countEl.textContent='Connection issue';document.getElementById('empty-title').textContent='We could not load recipes';document.getElementById('empty-message').textContent='Please check the Supabase table and public read policy. See the browser console for details.';emptyEl.hidden=false;}
}
searchInput.addEventListener('input',renderRecipes);
document.getElementById('clear-filters').addEventListener('click',()=>{searchInput.value='';selectedCategory='All Recipes';renderCategories();renderRecipes();});
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();searchInput.focus();}});
document.getElementById('year').textContent=new Date().getFullYear();renderCategories();loadRecipes();
