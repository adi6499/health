// ==================== DATA ====================
const FOODS = [
  {name:'Steamed Rice',icon:'rice',cal:206,prot:4,carb:45,fat:0.4,serving:'1 cup (186g)'},
  {name:'Roti (Whole Wheat)',icon:'utensils',cal:120,prot:4,carb:25,fat:1,serving:'1 roti (40g)'},
  {name:'Dal Tadka',icon:'utensils',cal:200,prot:12,carb:28,fat:6,serving:'1 bowl (250g)'},
  {name:'Paneer (Cottage Cheese)',icon:'beef',cal:265,prot:18,carb:2,fat:20,serving:'100g'},
  {name:'Chicken Breast',icon:'drumstick-bite',cal:165,prot:31,carb:0,fat:3.6,serving:'100g cooked'},
  {name:'Egg (Boiled)',icon:'egg',cal:77,prot:6,carb:0.6,fat:5,serving:'1 large egg'},
  {name:'Banana',icon:'apple',cal:89,prot:1.1,carb:23,fat:0.3,serving:'1 medium (118g)'},
  {name:'Apple',icon:'apple',cal:52,prot:0.3,carb:14,fat:0.2,serving:'1 medium (182g)'},
  {name:'Oats',icon:'rice',cal:307,prot:11,carb:55,fat:5,serving:'100g dry'},
  {name:'Milk (Full Cream)',icon:'coffee',cal:149,prot:8,carb:12,fat:8,serving:'1 cup (244ml)'},
  {name:'Curd / Yogurt',icon:'utensils',cal:98,prot:9,carb:7,fat:4,serving:'1 cup (245g)'},
  {name:'Almonds',icon:'utensils',cal:164,prot:6,carb:6,fat:14,serving:'28g (23 pieces)'},
  {name:'Aloo Sabzi',icon:'utensils',cal:180,prot:3,carb:34,fat:5,serving:'1 serving (200g)'},
  {name:'Sambar',icon:'utensils',cal:130,prot:7,carb:20,fat:3,serving:'1 bowl (250g)'},
  {name:'Idli',icon:'rice',cal:58,prot:2,carb:12,fat:0.4,serving:'1 idli (40g)'},
  {name:'Dosa',icon:'rice',cal:168,prot:4,carb:28,fat:4,serving:'1 plain dosa'},
  {name:'Rajma (Kidney Beans)',icon:'utensils',cal:337,prot:24,carb:61,fat:1,serving:'1 cup cooked (177g)'},
  {name:'Chana Dal',icon:'utensils',cal:164,prot:9,carb:27,fat:2,serving:'1 cup cooked'},
  {name:'Spinach',icon:'utensils',cal:23,prot:3,carb:4,fat:0.4,serving:'100g'},
  {name:'Tomato',icon:'utensils',cal:18,prot:0.9,carb:4,fat:0.2,serving:'1 medium (123g)'},
  {name:'Peanut Butter',icon:'utensils',cal:188,prot:8,carb:6,fat:16,serving:'2 tbsp (32g)'},
  {name:'Whey Protein Shake',icon:'coffee',cal:120,prot:24,carb:3,fat:2,serving:'1 scoop (30g)'},
  {name:'Upma',icon:'rice',cal:226,prot:6,carb:38,fat:6,serving:'1 plate (200g)'},
  {name:'Poha',icon:'rice',cal:250,prot:4,carb:48,fat:5,serving:'1 plate (200g)'},
  {name:'Chapati with Ghee',icon:'utensils',cal:148,prot:4,carb:25,fat:4,serving:'1 chapati'},
  {name:'Chicken Curry',icon:'drumstick-bite',cal:240,prot:20,carb:8,fat:14,serving:'1 serving (250g)'},
  {name:'Fish (Rohu)',icon:'fish',cal:97,prot:17,carb:0,fat:2.5,serving:'100g'},
  {name:'Mutton Biryani',icon:'rice',cal:450,prot:22,carb:52,fat:15,serving:'1 plate (300g)'},
  {name:'Masala Chai (with milk)',icon:'coffee',cal:65,prot:2,carb:9,fat:2,serving:'1 cup (200ml)'},
  {name:'Coconut Water',icon:'coffee',cal:46,prot:1.7,carb:9,fat:0.5,serving:'1 cup (240ml)'},
];

const WORKOUTS = [
  {name:'Running',icon:'run',kcalPerMin:10,category:'Cardio'},
  {name:'Walking',icon:'walk',kcalPerMin:5,category:'Cardio'},
  {name:'Cycling',icon:'bike',kcalPerMin:8,category:'Cardio'},
  {name:'Swimming',icon:'swim',kcalPerMin:9,category:'Cardio'},
  {name:'Push-ups',icon:'dumbbell',kcalPerMin:7,category:'Strength'},
  {name:'Pull-ups',icon:'dumbbell',kcalPerMin:8,category:'Strength'},
  {name:'Squats',icon:'dumbbell',kcalPerMin:6,category:'Strength'},
  {name:'Yoga',icon:'yoga',kcalPerMin:4,category:'Flexibility'},
  {name:'Jump Rope',icon:'flame',kcalPerMin:12,category:'Cardio'},
  {name:'HIIT',icon:'fire',kcalPerMin:13,category:'Cardio'},
];

const ACTIVITY_LEVELS = [
  {key:'sedentary',label:'Sedentary',detail:'Little or no exercise',mult:1.2},
  {key:'light',label:'Lightly Active',detail:'Light exercise 1-3 days/week',mult:1.375},
  {key:'moderate',label:'Moderately Active',detail:'Moderate exercise 3-5 days/week',mult:1.55},
  {key:'active',label:'Very Active',detail:'Hard exercise 6-7 days/week',mult:1.725},
  {key:'extra',label:'Extra Active',detail:'Very hard exercise & physical job',mult:1.9},
];

const GOALS = [
  {key:'lose',label:'Lose Weight',detail:'Calorie deficit for fat loss',adj:-500},
  {key:'maintain',label:'Maintain Weight',detail:'Sustain current weight',adj:0},
  {key:'gain',label:'Gain Muscle',detail:'Calorie surplus for muscle gain',adj:+300},
];

// ==================== STATE ====================
let state = load();

function load() {
  try { 
    const s = JSON.parse(localStorage.getItem('hpro_state') || '{}');
    if(s.theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    return s;
  } catch(e) { return {}; }
}
function save() {
  localStorage.setItem('hpro_state', JSON.stringify(state));
}
function todayKey() {
  return new Date().toISOString().split('T')[0];
}
function getTodayData() {
  const k = todayKey();
  if (!state.days) state.days = {};
  if (!state.days[k]) state.days[k] = {meals:{breakfast:[],lunch:[],dinner:[],snack:[]},water:0,steps:0,exerciseMins:0,burnedCals:0};
  return state.days[k];
}

// ==================== UI HELPERS ====================
function switchTab(tab) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(t=>t.classList.remove('active'));
  document.getElementById('view-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  if(tab==='progress') renderProgress();
  if(tab==='home') renderHome();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

// ==================== HOME ====================
function renderHome() {
  const d = getTodayData();
  const totalCals = getAllMealItems(d).reduce((s,f)=>s+f.cal,0);
  const totalProt = getAllMealItems(d).reduce((s,f)=>s+f.prot,0);

  document.getElementById('home-cals').textContent = totalCals;
  document.getElementById('home-steps').textContent = d.steps.toLocaleString();
  document.getElementById('home-water').textContent = d.water;
  document.getElementById('home-streak').textContent = getStreak();

  const calGoal = state.profile?.calGoal || 2000;
  const movePerc = Math.min((totalCals/calGoal)*100,100)/100;
  const exerPerc = Math.min((d.exerciseMins/30)*100,100)/100;
  const standPerc = Math.min((d.stand||0)/12*100,100)/100;

  animRing('r-move', movePerc, 55);
  animRing('r-exer', exerPerc, 40);
  animRing('r-stand', standPerc, 25);

  document.getElementById('ring-move-val').textContent = totalCals;
  document.getElementById('ring-move-goal').textContent = `of ${calGoal} kcal`;
  document.getElementById('ring-exer-val').textContent = d.exerciseMins;
  document.getElementById('ring-stand-val').textContent = d.stand||0;

  // Health score
  const score = calcHealthScore(d, totalCals, totalProt);
  document.getElementById('home-score').textContent = score;
  document.getElementById('home-tip').textContent = getHealthTip(score, d, totalCals);

  // Icons for home dash
  document.getElementById('home-icon-cals').innerHTML = getIcon('fire', 'icon-orange');
  document.getElementById('home-icon-steps').innerHTML = getIcon('footprints', 'icon-green');
  document.getElementById('home-icon-water').innerHTML = getIcon('droplet', 'icon-cyan');
  document.getElementById('home-icon-streak').innerHTML = getIcon('chart-line', 'icon-purple');

  // Meals preview
  const all = getAllMealItems(d);
  const el = document.getElementById('home-meals-preview');
  if(all.length===0) {
    el.innerHTML=`<div style="text-align:center;padding:20px 0;color:var(--text3);">
      <div style="margin-bottom:10px;display:block;">${getIcon('utensils', '', 32)}</div>
      <div style="font-size:15px;font-weight:500;">No meals logged yet</div>
      <div style="font-size:13px;margin-top:4px;">Tap + Add to log your first meal</div>
    </div>`;
  } else {
    el.innerHTML = all.slice(0,4).map(f=>`<div class="meal-item">
      <div class="meal-icon" style="background:var(--bg4);">${getIcon(f.icon)}</div>
      <div class="meal-info">
        <div class="meal-name">${f.name}</div>
        <div class="meal-macro">${f.prot}g protein · ${f.carb}g carbs</div>
      </div>
      <div class="meal-kcal">${f.cal} kcal</div>
    </div>`).join('');
    if(all.length>4) el.innerHTML += `<div style="text-align:center;padding:10px 0;color:var(--text2);font-size:14px;font-weight:500;">+${all.length-4} more items</div>`;
  }

  // Date
  const now = new Date();
  document.getElementById('hdr-date').textContent = now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
}

function animRing(id, perc, r) {
  const circ = 2 * Math.PI * r;
  const el = document.getElementById(id);
  if (!el) return;
  el.style.strokeDasharray = `${perc*circ} ${circ}`;
}

function calcHealthScore(d, cals, prot) {
  if(!state.profile) return 0;
  let score = 50;
  const p = state.profile;
  const calGoal = p.calGoal || 2000;
  const calRatio = cals/calGoal;
  if(calRatio>=0.7 && calRatio<=1.1) score+=20;
  else if(calRatio>=0.5) score+=10;
  const protGoal = p.protGoal || 150;
  if(prot>=protGoal*0.8) score+=15;
  if(d.water>=2000) score+=10;
  else if(d.water>=1500) score+=5;
  if(d.steps>=8000) score+=15;
  else if(d.steps>=5000) score+=8;
  if(d.exerciseMins>=20) score+=10;
  return Math.min(score,100);
}

function getHealthTip(score, d, cals) {
  if(!state.profile) return 'Set up your profile to get a personalised health score.';
  if(d.water<1500) return '💧 You need more water today. Aim for 2500ml.';
  if(d.steps<5000) return '👟 Try to hit 8,000 steps. Even a 20-min walk helps!';
  if(cals < (state.profile.calGoal||2000)*0.6) return '🍽️ Make sure to eat enough to fuel your day.';
  if(score>=85) return '🌟 Excellent! You\'re crushing your health goals today.';
  if(score>=70) return '✅ Good progress! Keep maintaining your habits.';
  return '💪 Stay consistent — every healthy choice counts!';
}

function getStreak() {
  if(!state.days) return 0;
  let streak = 0;
  const today = new Date();
  for(let i=0; i<30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate()-i);
    const k = d.toISOString().split('T')[0];
    if(state.days[k] && getAllMealItems(state.days[k]).length>0) streak++;
    else break;
  }
  return streak;
}

// ==================== NUTRITION ====================
function getAllMealItems(dayData) {
  const m = dayData.meals;
  return [...(m.breakfast||[]), ...(m.lunch||[]), ...(m.dinner||[]), ...(m.snack||[])];
}

let currentMealType = 'breakfast';
let currentFood = null;
let currentQty = 1;

function setMealType(t) {
  currentMealType = t;
  ['breakfast','lunch','dinner','snack'].forEach(m=>{
    const b = document.getElementById('meal-btn-'+m);
    if(m===t) { b.className='btn-add'; b.style.flex='1'; b.style.fontSize='13px'; }
    else { b.className='btn-sec'; b.style.flex='1'; b.style.fontSize='13px'; }
  });
}

function openAddFood() {
  editingMeal = null; // Reset edit state
  document.getElementById('food-modal').classList.add('open');
  renderFoodList(FOODS);
  document.getElementById('food-search').value='';
  setMealType('breakfast');
  const h = new Date().getHours();
  if(h>=6&&h<11) setMealType('breakfast');
  else if(h>=11&&h<15) setMealType('lunch');
  else if(h>=15&&h<18) setMealType('snack');
  else if(h>=18) setMealType('dinner');
}
function closeFoodModal() { document.getElementById('food-modal').classList.remove('open'); }

function openCustomFoodModal() {
  editingMeal = null;
  document.getElementById('custom-modal').classList.add('open');
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-cals').value = '';
  document.getElementById('cf-prot').value = '';
  document.getElementById('cf-carb').value = '';
}
function closeCustomFoodModal() {
  document.getElementById('custom-modal').classList.remove('open');
}

function confirmCustomFood() {
  const name = document.getElementById('cf-name').value || 'Custom Food';
  const cals = parseInt(document.getElementById('cf-cals').value) || 0;
  const prot = parseFloat(document.getElementById('cf-prot').value) || 0;
  const carb = parseFloat(document.getElementById('cf-carb').value) || 0;
  
  const d = getTodayData();
  const entry = {
    name: name,
    icon: 'utensils',
    cal: cals,
    prot: prot,
    carb: carb,
    fat: 0,
    qty: 1,
    serving: 'Custom',
    time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
  };
  
  d.meals[currentMealType].push(entry);
  save();
  closeCustomFoodModal();
  closeFoodModal();
  renderNutrition();
  renderHome();
  showToast(`Logged ${cals} kcal to ${currentMealType}`);
}

function filterFoods(q) {
  const filtered = q ? FOODS.filter(f=>f.name.toLowerCase().includes(q.toLowerCase())) : FOODS;
  renderFoodList(filtered);
}

function renderFoodList(foods) {
  document.getElementById('food-list').innerHTML = foods.map((f,i)=>`
    <div class="food-opt" onclick="openQtyModal(${FOODS.indexOf(f)})">
      <div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="background:var(--bg4);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;">${getIcon(f.icon, '', 22)}</div>
          <div>
            <div class="food-opt-name">${f.name}</div>
            <div class="food-opt-detail">${f.serving} · ${f.prot}g P · ${f.carb}g C · ${f.fat}g F</div>
          </div>
        </div>
      </div>
      <div class="food-opt-kcal">${f.cal} kcal</div>
    </div>`).join('');
}

function openQtyModal(idx) {
  currentFood = idx === -1 ? { name: 'Custom Food', icon: 'utensils', cal: 0, prot: 0, carb: 0, fat: 0, serving: 'Custom' } : FOODS[idx];
  currentQty = 1;
  document.getElementById('qty-food-name').textContent = idx === -1 ? 'Custom Entry' : currentFood.name;
  document.getElementById('qty-food-detail').textContent = idx === -1 ? 'Enter calories and macros manually' : `Per serving: ${currentFood.serving}`;
  document.getElementById('qty-meal-label').textContent = currentMealType.charAt(0).toUpperCase()+currentMealType.slice(1);
  
  const isCustom = idx === -1;
  document.getElementById('qty-display-static').style.display = isCustom ? 'none' : 'block';
  document.querySelector('.qty-row').style.display = isCustom ? 'none' : 'flex';
  document.querySelector('.qty-row').previousElementSibling.style.display = isCustom ? 'none' : 'block'; // SERVINGS label
  
  // Update inputs if custom
  if(isCustom) {
    document.getElementById('qty-cals-input').parentElement.parentElement.style.display = 'block';
    document.getElementById('qty-cals-input').value = '';
    document.getElementById('qty-prot-input').value = '';
    document.getElementById('qty-carb-input').value = '';
    document.getElementById('qty-fat-input').value = '';
  } else {
    document.getElementById('qty-cals-input').parentElement.parentElement.style.display = 'none';
    updateQtyDisplay();
  }
  
  document.getElementById('qty-modal').classList.add('open');
}

function updateCustomMacros(type) {
  const val = parseFloat(document.getElementById(`qty-${type}-input`).value) || 0;
  if(type==='cal') currentFood.cal = val;
  else currentFood[type] = val;
}
function closeQtyModal() { document.getElementById('qty-modal').classList.remove('open'); }

function changeQty(d) {
  currentQty = Math.max(0.5, currentQty+d*0.5);
  updateQtyDisplay();
}

function updateQtyDisplay() {
  document.getElementById('qty-val').textContent = currentQty;
  document.getElementById('qty-cals').textContent = Math.round(currentFood.cal*currentQty)+' kcal';
  document.getElementById('qty-prot').textContent = Math.round(currentFood.prot*currentQty*10)/10+' g';
  document.getElementById('qty-carb').textContent = Math.round(currentFood.carb*currentQty*10)/10+' g';
  document.getElementById('qty-fat').textContent = Math.round(currentFood.fat*currentQty*10)/10+' g';
}

let editingMeal = null; // {type, index}

function confirmAddFood() {
  const d = getTodayData();
  const entry = {
    name: currentFood.name,
    icon: currentFood.icon,
    cal: Math.round(currentFood.cal*currentQty),
    prot: Math.round(currentFood.prot*currentQty*10)/10,
    carb: Math.round(currentFood.carb*currentQty*10)/10,
    fat: Math.round(currentFood.fat*currentQty*10)/10,
    qty: currentQty,
    serving: currentFood.serving,
    time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
  };

  if(editingMeal) {
    d.meals[editingMeal.type][editingMeal.index] = entry;
    showToast(`Updated ${entry.name}`);
    editingMeal = null;
  } else {
    d.meals[currentMealType].push(entry);
    showToast(`Added ${entry.name} to ${currentMealType}`);
  }
  
  save();
  closeQtyModal();
  closeFoodModal();
  renderNutrition();
  renderHome();
}

function openScanner() {
  showToast('📷 Scanner requires camera access. Use the food search to log meals.');
  closeFoodModal();
}

function addWater() {
  const d = getTodayData();
  d.water = Math.min((d.water||0)+250, 5000);
  save();
  renderNutrition();
  document.getElementById('home-water').textContent = d.water;
  showToast('💧 +250 ml water logged!');
}

function renderNutrition() {
  const d = getTodayData();
  const all = getAllMealItems(d);
  const totalCal = all.reduce((s,f)=>s+f.cal,0);
  const totalProt = all.reduce((s,f)=>s+f.prot,0);
  const totalCarb = all.reduce((s,f)=>s+f.carb,0);
  const totalFat = all.reduce((s,f)=>s+f.fat,0);
  const p = state.profile || {};
  const calGoal = p.calGoal||2000, protGoal=p.protGoal||150, carbGoal=p.carbGoal||250, fatGoal=p.fatGoal||65;

  document.getElementById('nutr-cals').textContent = totalCal;
  document.getElementById('nutr-cal-goal').textContent = calGoal;
  document.getElementById('nutr-remaining').textContent = Math.max(0,calGoal-totalCal);
  document.getElementById('cal-bar').style.width = Math.min(100,(totalCal/calGoal)*100)+'%';
  document.getElementById('nutr-prot').textContent = totalProt;
  document.getElementById('nutr-prot-goal').textContent = protGoal;
  document.getElementById('nutr-carb').textContent = totalCarb;
  document.getElementById('nutr-carb-goal').textContent = carbGoal;
  document.getElementById('nutr-fat').textContent = totalFat;
  document.getElementById('nutr-fat-goal').textContent = fatGoal;
  document.getElementById('bar-prot').style.width = Math.min(100,(totalProt/protGoal)*100)+'%';
  document.getElementById('bar-carb').style.width = Math.min(100,(totalCarb/carbGoal)*100)+'%';
  document.getElementById('bar-fat').style.width = Math.min(100,(totalFat/fatGoal)*100)+'%';

  // Water dots
  const dots = document.getElementById('water-dots');
  const glasses = Math.floor((d.water||0)/250);
  dots.innerHTML = Array.from({length:10},(_,i)=>`<div class="water-dot${i<glasses?' filled':''}" onclick="setWaterDots(${i+1})"></div>`).join('');
  document.getElementById('water-ml').textContent = `${d.water||0} / 2500 ml`;

  // Meal sections
  const mealEl = document.getElementById('nutr-meal-list');
  const mealIcons = {breakfast:'sun',lunch:'sun',dinner:'moon',snack:'apple'};
  mealEl.innerHTML = ['breakfast','lunch','dinner','snack'].map(m=>{
    const items = d.meals[m]||[];
    if(items.length===0) return '';
    return `<div class="meal-section"><div class="meal-hdr">${getIcon(mealIcons[m])} ${m.charAt(0).toUpperCase()+m.slice(1)}</div><div class="card" style="padding:0 18px;">
      ${items.map((f,i)=>`<div class="meal-item">
        <div class="meal-icon" style="background:var(--bg4);">${getIcon(f.icon)}</div>
        <div class="meal-info"><div class="meal-name">${f.name} ×${f.qty}</div><div class="meal-macro">${f.prot}g P · ${f.carb}g C · ${f.fat}g F</div></div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="meal-kcal">${f.cal} kcal</span>
          <span onclick="editMeal('${m}',${i})" style="color:var(--blue);cursor:pointer;background:var(--bg4);width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;">${getIcon('pencil','',18)}</span>
          <span onclick="removeMeal('${m}',${i})" style="color:var(--red);cursor:pointer;background:var(--bg4);width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;">${getIcon('trash','',20)}</span>
        </div>
      </div>`).join('')}
    </div></div>`;
  }).join('');

  document.getElementById('nutr-date').textContent = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'});
}

function setWaterDots(n) {
  const d = getTodayData();
  d.water = n*250;
  save();
  renderNutrition();
}

function removeMeal(meal, idx) {
  const d = getTodayData();
  d.meals[meal].splice(idx,1);
  save();
  renderNutrition();
  renderHome();
}

function editMeal(mealType, idx) {
  const d = getTodayData();
  const item = d.meals[mealType][idx];
  editingMeal = { type: mealType, index: idx };
  
  // Find base food if exists, or treat as custom
  const baseFood = FOODS.find(f=>f.name === item.name) || {
    name: item.name, icon: item.icon,
    cal: item.cal/item.qty, prot: item.prot/item.qty, carb: item.carb/item.qty, fat: item.fat/item.qty,
    serving: item.serving || 'Custom'
  };
  
  currentFood = baseFood;
  currentQty = item.qty;
  currentMealType = mealType;
  
  const isCustom = item.serving === 'Custom';
  openQtyModal(isCustom ? -1 : FOODS.indexOf(baseFood));
  
  // Override values in case it was a semi-custom edit
  if(isCustom) {
      document.getElementById('qty-cals-input').value = item.cal;
      document.getElementById('qty-prot-input').value = item.prot;
      document.getElementById('qty-carb-input').value = item.carb;
      document.getElementById('qty-fat-input').value = item.fat;
      currentFood.cal = item.cal/item.qty; // set per unit for confirmed re-calc
  }
}

// ==================== FITNESS ====================
let pedometerActive = false;
let lastAcc = null;
let stepThreshold = 12;

function requestPedometer() {
  if (typeof DeviceMotionEvent === 'undefined') {
    showToast('Motion sensors not available on this device');
    return;
  }
  
  // iOS 13+ requirement: must be triggered by a user gesture
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          startPedometer();
        } else {
          showToast('Permission to access motion sensors was denied.');
        }
      })
      .catch(err => {
        console.error('Error requesting motion permission:', err);
        showToast('Motion sensor access requires a secure connection (HTTPS).');
      });
  } else {
    // Android or older iOS
    startPedometer();
  }
}

function startPedometer() {
  pedometerActive = true;
  document.getElementById('pedometer-status').textContent = 'SENSORS ACTIVE';
  document.getElementById('pedometer-status').style.background = 'rgba(48,209,88,0.15)';
  document.getElementById('pedometer-status').style.color = 'var(--green)';
  document.getElementById('sensor-btn').textContent = '✓ Sensors Active';
  window.addEventListener('devicemotion', onMotion);
  showToast('🏃 Pedometer activated!');
}

function onMotion(e) {
  const a = e.accelerationIncludingGravity;
  if(!a) return;
  const mag = Math.sqrt(a.x**2+a.y**2+a.z**2);
  if(lastAcc !== null && Math.abs(mag-lastAcc) > stepThreshold) {
    const d = getTodayData();
    d.steps++;
    d.burnedCals = Math.round(d.steps * 0.04);
    save();
    document.getElementById('fit-steps').textContent = d.steps.toLocaleString();
    document.getElementById('home-steps').textContent = d.steps.toLocaleString();
    document.getElementById('fit-cals-burned').textContent = `${d.burnedCals} kcal burned · ${(d.steps*0.0008).toFixed(1)} km`;
  }
  lastAcc = mag;
}

function renderFitness() {
  const d = getTodayData();
  document.getElementById('fit-steps').textContent = (d.steps||0).toLocaleString();
  document.getElementById('fit-cals-burned').textContent = `${d.burnedCals||0} kcal burned · ${((d.steps||0)*0.0008).toFixed(1)} km`;

  const wl = document.getElementById('workout-list');
  wl.innerHTML = WORKOUTS.slice(0,5).map(w=>`
    <div class="exercise-item" onclick="openActivityModal(${WORKOUTS.indexOf(w)})">
      <div class="ex-icon" style="background:var(--bg4);">${getIcon(w.icon)}</div>
      <div class="ex-info">
        <div class="ex-name">${w.name}</div>
        <div class="ex-meta"><span class="badge-pill">${w.category}</span>${w.kcalPerMin} kcal/min</div>
      </div>
      <div class="ex-arrow">${getIcon('chevron-right','',18)}</div>
    </div>`).join('');

  const rw = document.getElementById('recent-workouts');
  const logs = state.workoutLogs||[];
  if(logs.length===0) {
    rw.innerHTML=`<div style="text-align:center;padding:16px 0;color:var(--text3);">
      <div style="margin-bottom:8px;display:block;">${getIcon('dumbbell','',32)}</div>
      <div style="font-size:14px;font-weight:500;">No workouts logged yet</div>
    </div>`;
  } else {
    rw.innerHTML = logs.slice(-5).reverse().map(l=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:0.5px solid var(--sep);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="background:var(--bg4);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;">${getIcon(l.icon)}</div>
          <div><div style="font-size:15px;font-weight:600;">${l.name}</div><div style="font-size:12px;color:var(--text2);">${l.date} · ${l.duration} min</div></div>
        </div>
        <div style="font-size:15px;font-weight:700;color:var(--orange);">${l.burned} kcal</div>
      </div>`).join('');
  }
}

let selectedWorkoutIdx = null;
function openActivityModal(idx) {
  selectedWorkoutIdx = idx;
  const al = document.getElementById('activity-list');
  const w = WORKOUTS[idx];
  al.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;display:flex;justify-content:center;">${getIcon(w.icon,'',48)}</div>
    <div style="text-align:center;font-size:20px;font-weight:700;margin-bottom:4px;">${w.name}</div>
    <div style="text-align:center;font-size:14px;color:var(--text2);margin-bottom:24px;">${w.kcalPerMin} kcal per minute</div>
    <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:8px;">DURATION (minutes)</div>
    <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
      ${[10,15,20,30,45,60].map(t=>`<button class="btn-sec" style="flex:1;min-width:60px;" onclick="logWorkout(${idx},${t})">${t} min</button>`).join('')}
    </div>
  `;
  document.getElementById('activity-modal').classList.add('open');
}
function openManualActivity() {
  const al = document.getElementById('activity-list');
  al.innerHTML = WORKOUTS.map((w,i)=>`<div class="exercise-item" onclick="openActivityModal(${i})">
    <div class="ex-icon" style="background:var(--bg4);">${getIcon(w.icon)}</div>
    <div class="ex-info"><div class="ex-name">${w.name}</div><div class="ex-meta">${w.kcalPerMin} kcal/min</div></div>
  </div>`).join('');
  document.getElementById('activity-modal').classList.add('open');
}
function closeActivityModal() { document.getElementById('activity-modal').classList.remove('open'); }

function logWorkout(idx, duration) {
  const w = WORKOUTS[idx];
  const burned = Math.round(w.kcalPerMin * duration);
  const d = getTodayData();
  d.exerciseMins = (d.exerciseMins||0)+duration;
  d.burnedCals = (d.burnedCals||0)+burned;
  if(!state.workoutLogs) state.workoutLogs=[];
  state.workoutLogs.push({
    name:w.name, icon:w.icon, duration, burned,
    date: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'}),
  });
  save();
  closeActivityModal();
  renderFitness();
  renderHome();
  showToast(`🔥 ${w.name} logged — ${burned} kcal burned!`);
}

// ==================== PROGRESS ====================
let calChart, protChart, weightChart;
function renderProgress() {
  const days = state.days || {};
  const keys = Object.keys(days).sort().slice(-7);
  const labels = keys.map(k=>new Date(k).toLocaleDateString('en-IN',{day:'numeric',month:'short'}));
  const cals = keys.map(k=>getAllMealItems(days[k]).reduce((s,f)=>s+f.cal,0));
  const prots = keys.map(k=>getAllMealItems(days[k]).reduce((s,f)=>s+f.prot,0));
  const weights = keys.map(k=>days[k].weight||null);

  const avg = arr=>arr.length?Math.round(arr.reduce((a,b)=>a+b,0)/arr.length):0;
  document.getElementById('prog-avg-cal').textContent = avg(cals)||'—';
  document.getElementById('prog-avg-prot').textContent = (avg(prots)||'—')+(avg(prots)?'g':'');
  const waterAvg = avg(keys.map(k=>days[k].water||0));
  document.getElementById('prog-avg-water').textContent = waterAvg?waterAvg+'ml':'—';
  document.getElementById('prog-workouts').textContent = (state.workoutLogs||[]).length;

  const chartOpts = {
    responsive:true, maintainAspectRatio:false, animation:{duration:800},
    plugins:{legend:{display:false},tooltip:{backgroundColor:'rgba(28,28,30,0.95)',titleColor:'#fff',bodyColor:'rgba(255,255,255,0.7)',borderColor:'rgba(255,255,255,0.1)',borderWidth:1,cornerRadius:12,padding:10}},
    scales:{x:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}}},y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}},beginAtZero:true}},
  };

  if(calChart) calChart.destroy();
  calChart = new Chart(document.getElementById('cal-chart'),{
    type:'bar',
    data:{labels,datasets:[{data:cals,backgroundColor:'rgba(255,159,10,0.7)',borderRadius:8,borderSkipped:false}]},
    options:{...chartOpts}
  });

  if(protChart) protChart.destroy();
  protChart = new Chart(document.getElementById('prot-chart'),{
    type:'line',
    data:{labels,datasets:[{data:prots,borderColor:'var(--pink)',backgroundColor:'rgba(255,55,95,0.1)',fill:true,tension:0.4,pointBackgroundColor:'var(--pink)',pointRadius:5}]},
    options:{...chartOpts}
  });

  const wData = keys.map(k=>days[k].weight||null);
  if(weightChart) weightChart.destroy();
  weightChart = new Chart(document.getElementById('weight-chart'),{
    type:'line',
    data:{labels,datasets:[{data:wData,borderColor:'var(--blue)',backgroundColor:'rgba(10,132,255,0.1)',fill:true,tension:0.4,pointBackgroundColor:'var(--blue)',pointRadius:5,spanGaps:true}]},
    options:{...chartOpts}
  });
}

function logWeight() {
  const w = prompt('Enter your weight in kg:');
  if(!w || isNaN(parseFloat(w))) return;
  const d = getTodayData();
  d.weight = parseFloat(w);
  if(!state.profile) state.profile = {};
  state.profile.weight = parseFloat(w);
  save();
  renderProgress();
  updateProfileUI();
  showToast(`⚖️ Weight logged: ${w} kg`);
}

// ==================== PROFILE ====================
function renderProfile() {
  const p = state.profile;
  if(!p) return;
  document.getElementById('prof-name').textContent = p.name || 'Your Name';
  const initials = (p.name||'?').split(' ').map(s=>s[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('prof-avatar').textContent = initials||'?';
  document.getElementById('prof-weight-val').textContent = (p.weight||'—')+' kg';
  document.getElementById('prof-height-val').textContent = (p.height||'—')+' cm';
  document.getElementById('prof-age-val').textContent = (p.age||'—')+' yr';
  const bmi = p.weight && p.height ? (p.weight/(p.height/100)**2).toFixed(1) : '—';
  document.getElementById('prof-bmi-val').textContent = bmi + (bmi!=='—'?' ('+bmiLabel(bmi)+')':'');
  document.getElementById('prof-cal-goal').textContent = (p.calGoal||2000)+' kcal';
  document.getElementById('prof-prot-goal').textContent = (p.protGoal||150)+' g';
  document.getElementById('prof-goal-label').textContent = GOALS.find(g=>g.key===p.goal)?.label || 'Goal not set';

  // Profile icons
  document.getElementById('prof-icon-weight').innerHTML = getIcon('scale');
  document.getElementById('prof-icon-height').innerHTML = getIcon('ruler');
  document.getElementById('prof-icon-age').innerHTML = getIcon('user');
  document.getElementById('prof-icon-bmi').innerHTML = getIcon('target');
  document.querySelectorAll('.prof-arrow').forEach(el=>el.innerHTML=getIcon('chevron-right'));
}
function updateProfileUI() { renderProfile(); }
function bmiLabel(bmi) {
  const b = parseFloat(bmi);
  if(b<18.5) return 'Underweight';
  if(b<25) return 'Normal';
  if(b<30) return 'Overweight';
  return 'Obese';
}

// ==================== ONBOARDING ====================
let obStep = 1;
const OB_STEPS = 5;
let obData = { gender:'M', activity:'moderate', goal:'maintain' };

function showOnboarding() {
  if(state.profile) {
    obData = {...state.profile};
    document.getElementById('ob-name').value = obData.name||'';
    document.getElementById('ob-age').value = obData.age||'';
    document.getElementById('ob-weight').value = obData.weight||'';
    document.getElementById('ob-height').value = obData.height||'';
  }
  obStep = 1;
  renderObStep();
  document.getElementById('ob-backdrop').classList.add('open');
}
function closeOnboarding() { document.getElementById('ob-backdrop').classList.remove('open'); }

function renderObStep() {
  for(let i=1;i<=OB_STEPS;i++) {
    document.getElementById('ob-step-'+i).classList.toggle('active', i===obStep);
  }
  const dots = document.getElementById('ob-dots');
  dots.innerHTML = Array.from({length:OB_STEPS},(_,i)=>`<div class="progress-dot${i+1===obStep?' active':''}"></div>`).join('');
  document.getElementById('ob-back-btn').style.display = obStep===1?'none':'block';
  document.getElementById('ob-next-btn').textContent = obStep===OB_STEPS?'Start Tracking!':'Continue';

  if(obStep===1) document.getElementById('ob-title-1').innerHTML = `${getIcon('hand-wave','icon-orange')} Welcome`;
  if(obStep===2) document.getElementById('ob-title-2').innerHTML = `${getIcon('scale','icon-blue')} Body Stats`;
  if(obStep===3) { document.getElementById('ob-title-3').innerHTML = `${getIcon('run','icon-green')} Activity Level`; renderObActivityOpts(); }
  if(obStep===4) { document.getElementById('ob-title-4').innerHTML = `${getIcon('target','icon-purple')} Your Goal`; renderObGoalOpts(); }
  if(obStep===5) { document.getElementById('ob-title-5').innerHTML = `${getIcon('sparkles','icon-orange')} All Set!`; renderObResults(); }
}

function renderObActivityOpts() {
  document.getElementById('ob-activity-opts').innerHTML = ACTIVITY_LEVELS.map(a=>`
    <div class="ob-opt${obData.activity===a.key?' selected':''}" onclick="selectActivity('${a.key}')">
      <div><div class="ob-opt-name">${a.label}</div><div class="ob-opt-detail">${a.detail}</div></div>
      <div class="ob-check">${obData.activity===a.key?'✓':''}</div>
    </div>`).join('');
}
function renderObGoalOpts() {
  document.getElementById('ob-goal-opts').innerHTML = GOALS.map(g=>`
    <div class="ob-opt${obData.goal===g.key?' selected':''}" onclick="selectGoal('${g.key}')">
      <div><div class="ob-opt-name">${g.label}</div><div class="ob-opt-detail">${g.detail}</div></div>
      <div class="ob-check">${obData.goal===g.key?'✓':''}</div>
    </div>`).join('');
}

function selectGender(g) {
  obData.gender = g;
  ['M','F','O'].forEach(x=>{
    document.getElementById('ob-gender-'+x).classList.toggle('active', x===g);
  });
}
function selectActivity(k) {
  obData.activity = k;
  renderObActivityOpts();
}
function selectGoal(k) {
  obData.goal = k;
  renderObGoalOpts();
}

function calcTDEE() {
  const {weight,height,age,gender,activity,goal} = obData;
  let bmr = gender==='F'
    ? 10*weight + 6.25*height - 5*age - 161
    : 10*weight + 6.25*height - 5*age + 5;
  const mult = ACTIVITY_LEVELS.find(a=>a.key===activity)?.mult || 1.55;
  const adj = GOALS.find(g=>g.key===goal)?.adj || 0;
  return Math.round(bmr * mult + adj);
}

function renderObResults() {
  const w = parseFloat(obData.weight)||70, h = parseFloat(obData.height)||170;
  const tdee = calcTDEE();
  const prot = Math.round(w * (obData.goal==='gain'?2.2:1.8));
  const fat = Math.round(tdee * 0.25 / 9);
  const carb = Math.round((tdee - prot*4 - fat*9) / 4);

  obData.calGoal = tdee; obData.protGoal = prot; obData.carbGoal = carb; obData.fatGoal = fat;

  document.getElementById('ob-result-cals').textContent = tdee+' kcal/day';
  document.getElementById('ob-result-prot').textContent = prot+'g';
  document.getElementById('ob-result-carb').textContent = carb+'g';
  document.getElementById('ob-result-fat').textContent = fat+'g';

  const bmi = (w/(h/100)**2).toFixed(1);
  const sc = obData.goal==='lose'?62:obData.goal==='gain'?68:75;
  document.getElementById('ob-result-score').textContent = sc;
  document.getElementById('ob-result-tip').textContent = `BMI: ${bmi} (${bmiLabel(bmi)}) · TDEE: ${tdee} kcal`;
}

function obNext() {
  if(obStep===1) {
    obData.name = document.getElementById('ob-name').value || obData.name;
    obData.age = parseInt(document.getElementById('ob-age').value) || obData.age;
    if(!obData.name) { showToast('Please enter your name'); return; }
  }
  if(obStep===2) {
    obData.weight = parseFloat(document.getElementById('ob-weight').value) || obData.weight;
    obData.height = parseFloat(document.getElementById('ob-height').value) || obData.height;
    if(!obData.weight || !obData.height) { showToast('Please enter weight and height'); return; }
  }
  if(obStep===OB_STEPS) {
    state.profile = {...obData};
    save();
    closeOnboarding();
    renderHome();
    updateProfileUI();
    renderNutrition();
    showToast('🎉 Profile saved! Your goals are set.');
    return;
  }
  obStep++;
  renderObStep();
}
function obBack() {
  if(obStep>1) { obStep--; renderObStep(); }
}

// ==================== THEME ====================
let isDark = true;
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const isL = current !== 'light';
  if(isL) document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  state.theme = isL ? 'light' : 'dark';
  
  const knob = document.getElementById('toggle-knob');
  const toggle = document.getElementById('theme-toggle');
  if(!isL) {
    toggle.style.background = 'var(--blue)';
    knob.style.right = '2px'; knob.style.left = 'auto';
  } else {
    toggle.style.background = 'var(--bg5)';
    knob.style.left = '2px'; knob.style.right = 'auto';
  }
  save();
  showToast(isL ? 'Light mode on' : 'Dark mode on');
}

function renderStaticIcons() {
  document.querySelectorAll('.close-btn').forEach(el => {
    const size = parseInt(el.getAttribute('data-icon-size')) || 24;
    el.innerHTML = getIcon('plus', '', size);
  });
}

// ==================== INIT ====================
function init() {
  renderHome();
  renderNutrition();
  renderFitness();
  renderProfile();
  renderStaticIcons();
  
  if(state.theme === 'light') {
    // Sync toggle UI
    const knob = document.getElementById('toggle-knob');
    const toggle = document.getElementById('theme-toggle');
    toggle.style.background = 'var(--bg5)';
    knob.style.left = '2px'; knob.style.right = 'auto';
  }

  if(!state.profile) {
    setTimeout(showOnboarding, 800);
  }
}

init();
