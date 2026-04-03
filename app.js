// ==================== DATA ====================
const FOODS=[
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

const WORKOUTS=[
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

const ACTIVITY_LEVELS=[
  {key:'sedentary',label:'Sedentary',detail:'Little or no exercise',mult:1.2},
  {key:'light',label:'Lightly Active',detail:'Light exercise 1-3 days/week',mult:1.375},
  {key:'moderate',label:'Moderately Active',detail:'Moderate exercise 3-5 days/week',mult:1.55},
  {key:'active',label:'Very Active',detail:'Hard exercise 6-7 days/week',mult:1.725},
  {key:'extra',label:'Extra Active',detail:'Very hard exercise & physical job',mult:1.9},
];

const GOALS=[
  {key:'lose',label:'Lose Weight',detail:'Calorie deficit for fat loss',adj:-500},
  {key:'maintain',label:'Maintain Weight',detail:'Sustain current weight',adj:0},
  {key:'gain',label:'Gain Muscle',detail:'Calorie surplus for muscle gain',adj:+300},
];

// ==================== STATE ====================
const STATE_VERSION=3;
let state=load();

function load(){
  try{
    const s=JSON.parse(localStorage.getItem('hpro_state')||'{}');
    if(s.theme==='light') document.documentElement.setAttribute('data-theme','light');
    // Version migration
    if(!s._v||s._v<STATE_VERSION){s._v=STATE_VERSION;}
    return s;
  }catch(e){return{_v:STATE_VERSION};}
}
function save(){
  state._saved=Date.now();
  localStorage.setItem('hpro_state',JSON.stringify(state));
}
function todayKey(){return new Date().toISOString().split('T')[0];}
function getTodayData(){
  const k=todayKey();
  if(!state.days) state.days={};
  if(!state.days[k]) state.days[k]={meals:{breakfast:[],lunch:[],dinner:[],snack:[]},water:0,steps:0,exerciseMins:0,burnedCals:0};
  const d=state.days[k];
  if(!d.meals) d.meals={breakfast:[],lunch:[],dinner:[],snack:[]};
  ['breakfast','lunch','dinner','snack'].forEach(m=>{if(!d.meals[m])d.meals[m]=[];});
  return d;
}

// ==================== HAPTICS ====================
function vibrate(pattern=10){
  try{if(navigator.vibrate) navigator.vibrate(pattern);}catch(e){}
}

// ==================== NAVIGATION ====================
const TAB_ORDER=['home','nutrition','fitness','progress','profile'];
let currentTab='home';
let navHistory=['home'];
// Debounce tab switch
let tabSwitching=false;

function switchTab(tab, direction) {
  if (tabSwitching || tab === currentTab) return;
  vibrate(8);
  tabSwitching = true;

  const oldTab = currentTab;
  const oldView = document.getElementById('view-' + oldTab);
  const newView = document.getElementById('view-' + tab);
  if (!newView) { tabSwitching = false; return; }

  const oldIdx = TAB_ORDER.indexOf(oldTab);
  const newIdx = TAB_ORDER.indexOf(tab);
  const goRight = direction === 'right' || (direction === undefined && newIdx > oldIdx);

  // 1. Position new view instantly (no transition) before it becomes visible
  newView.classList.remove('active', 'enter-from-right', 'enter-from-left', 'exit-to-left', 'exit-to-right');
  newView.classList.add(goRight ? 'enter-from-right' : 'enter-from-left');

  // 2. Force reflow so the browser registers the starting position
  void newView.offsetWidth;

  // 3. Transition OLD view out (with transition enabled)
  oldView.classList.remove('active');
  oldView.classList.add(goRight ? 'exit-to-left' : 'exit-to-right');

  // 4. Transition NEW view in (remove enter class so it animates to active)
  newView.classList.remove('enter-from-right', 'enter-from-left');
  newView.classList.add('active');

  // 5. Update tab bar immediately (visual feedback)
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  currentTab = tab;
  navHistory.push(tab);
  if (navHistory.length > 20) navHistory.shift();

  // 6. After animation, clean up old view classes
  const ANIM_MS = 340;
  setTimeout(() => {
    oldView.classList.remove('exit-to-left', 'exit-to-right');
    tabSwitching = false;
    // Render content AFTER animation completes to avoid janky frames
    if (tab === 'progress')  renderProgress();
    if (tab === 'home')      renderHome();
    if (tab === 'nutrition') renderNutrition();
    if (tab === 'fitness')   renderFitness();
    if (tab === 'profile')   renderProfile();
    // Invalidate Leaflet map size if switching to fitness (map may be hidden)
    if (tab === 'fitness' && mapInstance) setTimeout(() => mapInstance.invalidateSize(), 50);
  }, ANIM_MS);
}

function goBack(){
  if(navHistory.length>1){
    navHistory.pop();
    const prev=navHistory[navHistory.length-1];
    navHistory.pop();
    switchTab(prev,'left');
  }
}

// ==================== MAP & LOCATION TRACKING ====================
let mapInstance = null;
let mapMarker = null;
let mapPolyline = null;
let locationWatchId = null;
let routePoints = [];
let totalDistanceKm = 0;
let lsSaveTimer = null;

// Haversine formula — returns km between two lat/lng points
function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const sin2 = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(sin2));
}

function initMap(lat, lng) {
  if (mapInstance) return; // already initialized
  if (typeof L === 'undefined') { showToast('Loading map…'); return; }

  const container = document.getElementById('map-container');
  container.innerHTML = ''; // clear placeholder

  mapInstance = L.map('map-container', {
    zoomControl: false,
    attributionControl: false,
  }).setView([lat, lng], 16);

  // OpenStreetMap tile layer — no API key needed
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OSM'
  }).addTo(mapInstance);

  // Attribution (small, bottom-right)
  L.control.attribution({ position: 'bottomright', prefix: false })
    .addAttribution('© <a href="https://openstreetmap.org">OSM</a>')
    .addTo(mapInstance);

  // Custom marker (CSS dot, no external image needed)
  const markerIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:16px;height:16px;background:var(--blue);
      border:2.5px solid #fff;border-radius:50%;
      box-shadow:0 0 0 4px rgba(10,132,255,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  mapMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(mapInstance);

  // Polyline for route path
  mapPolyline = L.polyline([], {
    color: 'var(--blue)', weight: 4, opacity: 0.85,
    smoothFactor: 1,
  }).addTo(mapInstance);

  // Restore saved route (if any)
  const saved = state.locationLog || [];
  if (saved.length > 1) {
    routePoints = saved.map(p => ({ lat: p.lat, lng: p.lon || p.lng }));
    mapPolyline.setLatLngs(routePoints);
    recalcDistance();
    updateRouteUI();
  }
}

function updateMapPosition(lat, lng) {
  const pt = { lat, lng };
  const prev = routePoints[routePoints.length - 1];

  // Skip duplicates or points less than 3 m apart (GPS jitter)
  if (prev && haversineKm(prev, pt) < 0.003) return;

  routePoints.push(pt);
  if (mapMarker) mapMarker.setLatLng([lat, lng]);
  if (mapPolyline) mapPolyline.addLatLng([lat, lng]);
  if (mapInstance) mapInstance.panTo([lat, lng], { animate: true, duration: 0.5 });

  if (prev) totalDistanceKm += haversineKm(prev, pt);
  updateRouteUI();
  debounceRouteSave();
}

function recalcDistance() {
  totalDistanceKm = 0;
  for (let i = 1; i < routePoints.length; i++) {
    totalDistanceKm += haversineKm(routePoints[i - 1], routePoints[i]);
  }
}

function updateRouteUI() {
  const km = totalDistanceKm.toFixed(2);
  const kcal = Math.round(totalDistanceKm * 60); // ~60 kcal/km average
  const distEl  = document.getElementById('map-dist');
  const kcalEl  = document.getElementById('map-kcal');
  if (distEl)  distEl.textContent  = km + ' km';
  if (kcalEl)  kcalEl.textContent  = kcal + ' kcal';
}

function debounceRouteSave() {
  if (lsSaveTimer) clearTimeout(lsSaveTimer);
  lsSaveTimer = setTimeout(() => {
    state.locationLog = routePoints.map(p => ({ lat: p.lat, lon: p.lng, ts: Date.now() }));
    save();
  }, 2000); // batch writes every 2 s
}

function startLocationTracking() {
  if (!navigator.geolocation) { showToast('Geolocation not supported'); return; }

  // Get first position to init map immediately
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    initMap(lat, lng);
    updateMapPosition(lat, lng);
    updateMapStatusUI(true);
  }, err => {
    console.warn('Location error:', err);
    showToast('Location access denied');
    state.locationEnabled = false;
    syncToggle('loc-toggle', false);
    updateMapStatusUI(false);
  }, { enableHighAccuracy: true, timeout: 10000 });

  // Watch for continuous updates
  locationWatchId = navigator.geolocation.watchPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    if (!mapInstance) initMap(lat, lng);
    updateMapPosition(lat, lng);
  }, err => {
    console.warn('watchPosition error:', err);
  }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
}

function stopLocationTracking() {
  if (locationWatchId !== null) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
  }
  updateMapStatusUI(false);
  if (lsSaveTimer) { clearTimeout(lsSaveTimer); lsSaveTimer = null; }
  // Final save
  state.locationLog = routePoints.map(p => ({ lat: p.lat, lon: p.lng, ts: Date.now() }));
  save();
}

function toggleLocation() {
  vibrate(10);
  state.locationEnabled = !state.locationEnabled;
  syncToggle('loc-toggle', state.locationEnabled);
  syncLocTrackBtn(state.locationEnabled);
  if (state.locationEnabled) {
    startLocationTracking();
    showToast('📍 Location tracking ON');
  } else {
    stopLocationTracking();
    showToast('📍 Location tracking OFF');
  }
  save();
}

function syncLocTrackBtn(active) {
  const btn = document.getElementById('loc-track-btn');
  if (!btn) return;
  btn.textContent = active ? '⏹ Stop Tracking' : '📍 Start Tracking';
  btn.className   = active ? 'btn-danger' : 'btn-add';
}

function updateMapStatusUI(active) {
  const badge = document.getElementById('map-status');
  if (badge) {
    badge.className = active ? 'pedometer-badge active' : 'pedometer-badge inactive';
    badge.innerHTML = active ? '<div class="pulse-dot"></div> TRACKING ACTIVE' : 'TRACKING STOPPED';
  }
  syncLocTrackBtn(active);
  // Also keep profile toggle in sync
  syncToggle('loc-toggle', active);
}

function clearRoute() {
  if (!confirm('Clear this route? This cannot be undone.')) return;
  routePoints = [];
  totalDistanceKm = 0;
  state.locationLog = [];
  save();
  if (mapPolyline) mapPolyline.setLatLngs([]);
  updateRouteUI();
  showToast('🗑 Route cleared');
}


// ==================== TOUCH GESTURES ====================

(function setupGestures(){
  let startX=0,startY=0,startTime=0,gestureActive=false;
  const SWIPE_THRESHOLD=60,SWIPE_VELOCITY=0.3,MAX_DURATION=400;


  document.addEventListener('touchstart',e=>{
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    startTime=Date.now();
    gestureActive=true;
  },{passive:true});

  document.addEventListener('touchmove',e=>{
    if(!gestureActive) return;
    const dx=e.touches[0].clientX-startX;
    const dy=e.touches[0].clientY-startY;
    // If more vertical than horizontal, cancel gesture
    if(Math.abs(dy)>Math.abs(dx)*1.5) gestureActive=false;
  },{passive:true});

  document.addEventListener('touchend',e=>{
    if(!gestureActive) return;
    gestureActive=false;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    const dt=Date.now()-startTime;
    const vel=Math.abs(dx)/dt;
    const isHoriz=Math.abs(dx)>Math.abs(dy)*1.2;
    // Check no modal is open
    const modalOpen=document.querySelector('.modal-backdrop.open,.ob-backdrop.open');
    if(modalOpen) return;
    if(!isHoriz||Math.abs(dx)<SWIPE_THRESHOLD||vel<SWIPE_VELOCITY||dt>MAX_DURATION) return;
    const curIdx=TAB_ORDER.indexOf(currentTab);
    if(dx<0&&curIdx<TAB_ORDER.length-1){
      // Swipe left → next tab
      switchTab(TAB_ORDER[curIdx+1],'right');
    } else if(dx>0){
      if(startX<50&&navHistory.length>1){
        // Edge swipe right → back
        goBack();
      } else if(curIdx>0){
        switchTab(TAB_ORDER[curIdx-1],'left');
      }
    }
  },{passive:true});
})();

// ==================== MODAL DRAG-TO-CLOSE ====================
function setupSheetDrag(backdropId,closeFn){
  const backdrop=document.getElementById(backdropId);
  if(!backdrop) return;
  const sheet=backdrop.querySelector('.modal-sheet,.ob-sheet');
  if(!sheet) return;
  let startY=0,dragging=false,startScrollTop=0;
  const handle=sheet.querySelector('.modal-handle');
  const dragTarget=handle||sheet;

  dragTarget.addEventListener('touchstart',e=>{
    startY=e.touches[0].clientY;
    startScrollTop=sheet.scrollTop;
    dragging=true;
  },{passive:true});
  dragTarget.addEventListener('touchmove',e=>{
    if(!dragging) return;
    const dy=e.touches[0].clientY-startY;
    if(dy>0&&startScrollTop===0){
      sheet.style.transform=`translateY(${dy}px)`;
      sheet.style.transition='none';
    }
  },{passive:true});
  dragTarget.addEventListener('touchend',e=>{
    if(!dragging) return;
    dragging=false;
    const dy=e.changedTouches[0].clientY-startY;
    sheet.style.transition='';
    if(dy>100){
      closeFn();
    } else {
      sheet.style.transform='';
    }
  },{passive:true});
}

// ==================== TOAST ====================
let toastTimer=null;
function showToast(msg,type=''){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='toast show'+(type?' toast-'+type:'');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

// ==================== HOME ====================
function renderHome(){
  const d=getTodayData();
  const all=getAllMealItems(d);
  const totalCals=all.reduce((s,f)=>s+f.cal,0);
  const totalProt=all.reduce((s,f)=>s+f.prot,0);

  document.getElementById('home-cals').textContent=totalCals;
  document.getElementById('home-steps').textContent=(d.steps||0).toLocaleString();
  document.getElementById('home-water').textContent=d.water||0;
  document.getElementById('home-streak').textContent=getStreak();

  const p=state.profile||{};
  const calGoal=p.calGoal||2000;
  animRing('r-move',Math.min((totalCals/calGoal),1),55);
  animRing('r-exer',Math.min((d.exerciseMins||0)/30,1),40);
  animRing('r-stand',Math.min((d.stand||0)/12,1),25);
  document.getElementById('ring-move-val').textContent=totalCals;
  document.getElementById('ring-move-goal').textContent=`of ${calGoal} kcal`;
  document.getElementById('ring-exer-val').textContent=d.exerciseMins||0;
  document.getElementById('ring-exer-goal').textContent='of 30 min';
  document.getElementById('ring-stand-val').textContent=d.stand||0;

  const score=calcHealthScore(d,totalCals,totalProt);
  document.getElementById('home-score').textContent=score;
  document.getElementById('home-tip').textContent=getHealthTip(score,d,totalCals);

  // Icons
  document.getElementById('home-icon-cals').innerHTML=getIcon('fire','icon-orange');
  document.getElementById('home-icon-steps').innerHTML=getIcon('footprints','icon-green');
  document.getElementById('home-icon-water').innerHTML=getIcon('droplet','icon-cyan');
  document.getElementById('home-icon-streak').innerHTML=getIcon('chart-line','icon-purple');

  // Smart insight
  renderInsightBanner(d,totalCals,totalProt,p);

  // Meals preview
  const el=document.getElementById('home-meals-preview');
  if(all.length===0){
    el.innerHTML=`<div style="text-align:center;padding:20px 0;color:var(--text3)">
      <div style="margin-bottom:10px">${getIcon('utensils','',32)}</div>
      <div style="font-size:15px;font-weight:500">No meals logged yet</div>
      <div style="font-size:13px;margin-top:4px">Tap + Add to log your first meal</div>
    </div>`;
  } else {
    el.innerHTML=all.slice(0,4).map(f=>`<div class="meal-item">
      <div class="meal-icon" style="background:var(--bg4)">${getIcon(f.icon||'utensils')}</div>
      <div class="meal-info"><div class="meal-name">${f.name}</div><div class="meal-macro">${f.prot}g P · ${f.carb}g C</div></div>
      <div class="meal-kcal">${f.cal} kcal</div>
    </div>`).join('');
    if(all.length>4) el.innerHTML+=`<div style="text-align:center;padding:10px 0;color:var(--text2);font-size:14px;font-weight:500">+${all.length-4} more items</div>`;
  }
  document.getElementById('hdr-date').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
}

function renderInsightBanner(d,cals,prot,p){
  const el=document.getElementById('insight-banner');
  if(!el) return;
  const calGoal=p.calGoal||2000;
  const protGoal=p.protGoal||150;
  let type='info',icon='info',title='',body='';
  if(d.water<1500){type='warn';icon='droplet';title='Drink More Water';body=`You've had ${d.water}ml. Aim for 2500ml today.`;}
  else if((d.steps||0)<5000){type='warn';icon='footprints';title='Move More';body='You need more steps. Try a 20-min walk!';}
  else if(cals<calGoal*0.5&&new Date().getHours()>14){type='warn';icon='fire';title='Eat More';body=`Only ${cals} of ${calGoal} kcal. Fuel your body!`;}
  else if(prot<protGoal*0.5&&new Date().getHours()>16){type='info';icon='zap';title='Protein Check';body=`${Math.round(protGoal-prot)}g protein left. Add a protein-rich snack!`;}
  else if(cals>=calGoal*0.8&&d.water>=2000&&(d.steps||0)>=7000){type='good';icon='sparkles';title='On Track!';body='Great progress today — keep it up!';}
  else{el.style.display='none';return;}
  el.style.display='flex';
  el.className=`insights-banner ${type} anim`;
  el.innerHTML=`<div class="insights-icon">${getIcon(icon,'icon-'+( type==='warn'?'orange':type==='good'?'green':'blue'),22)}</div>
    <div class="insights-text"><div class="insights-title">${title}</div><div class="insights-body">${body}</div></div>`;
}

function animRing(id,perc,r){
  const circ=2*Math.PI*r;
  const el=document.getElementById(id);
  if(!el) return;
  el.style.strokeDasharray=`${perc*circ} ${circ}`;
}

function calcHealthScore(d,cals,prot){
  if(!state.profile) return 0;
  let score=50;
  const p=state.profile;
  const calGoal=p.calGoal||2000;
  const cr=cals/calGoal;
  if(cr>=0.7&&cr<=1.1) score+=20; else if(cr>=0.5) score+=10;
  if(prot>=(p.protGoal||150)*0.8) score+=15;
  if(d.water>=2000) score+=10; else if(d.water>=1500) score+=5;
  if((d.steps||0)>=8000) score+=15; else if((d.steps||0)>=5000) score+=8;
  if((d.exerciseMins||0)>=20) score+=10;
  return Math.min(score,100);
}

function getHealthTip(score,d,cals){
  if(!state.profile) return 'Set up your profile for a personalised health score.';
  if(d.water<1500) return '💧 You need more water today. Aim for 2500ml.';
  if((d.steps||0)<5000) return '👟 Try to hit 8,000 steps. Even a 20-min walk helps!';
  if(cals<(state.profile.calGoal||2000)*0.6) return '🍽️ Make sure to eat enough to fuel your day.';
  if(score>=85) return '🌟 Excellent! You\'re crushing your health goals today.';
  if(score>=70) return '✅ Good progress! Keep maintaining your habits.';
  return '💪 Stay consistent — every healthy choice counts!';
}

function getStreak(){
  if(!state.days) return 0;
  let streak=0;
  const today=new Date();
  for(let i=0;i<30;i++){
    const d=new Date(today);d.setDate(today.getDate()-i);
    const k=d.toISOString().split('T')[0];
    if(state.days[k]&&getAllMealItems(state.days[k]).length>0) streak++;
    else break;
  }
  return streak;
}

// ==================== NUTRITION ====================
function getAllMealItems(dayData){
  const m=dayData.meals||{};
  return[...(m.breakfast||[]),...(m.lunch||[]),...(m.dinner||[]),...(m.snack||[])];
}

let currentMealType='breakfast',currentFood=null,currentQty=1,editingMeal=null;
let foodSearchDebounce=null;

function setMealType(t){
  currentMealType=t;
  vibrate(6);
  ['breakfast','lunch','dinner','snack'].forEach(m=>{
    const b=document.getElementById('meal-btn-'+m);
    if(!b) return;
    b.className=m===t?'btn-add':'btn-sec';
    b.style.flex='1'; b.style.fontSize='13px';
  });
}

function openAddFood(){
  editingMeal=null;
  document.getElementById('food-modal').classList.add('open');
  renderFoodList(FOODS);
  document.getElementById('food-search').value='';
  const h=new Date().getHours();
  if(h>=6&&h<11) setMealType('breakfast');
  else if(h>=11&&h<15) setMealType('lunch');
  else if(h>=15&&h<18) setMealType('snack');
  else setMealType('dinner');
}
function closeFoodModal(){
  document.getElementById('food-modal').classList.remove('open');
  const sheet=document.querySelector('#food-modal .modal-sheet');
  if(sheet) sheet.style.transform='';
}

function openCustomFoodModal(){
  editingMeal=null;
  document.getElementById('custom-modal').classList.add('open');
  ['cf-name','cf-cals','cf-prot','cf-carb'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function closeCustomFoodModal(){
  document.getElementById('custom-modal').classList.remove('open');
  const sheet=document.querySelector('#custom-modal .modal-sheet');
  if(sheet) sheet.style.transform='';
}

function confirmCustomFood(){
  const name=document.getElementById('cf-name').value||'Custom Food';
  const cals=parseInt(document.getElementById('cf-cals').value)||0;
  const prot=parseFloat(document.getElementById('cf-prot').value)||0;
  const carb=parseFloat(document.getElementById('cf-carb').value)||0;
  const d=getTodayData();
  d.meals[currentMealType].push({name,icon:'utensils',cal:cals,prot,carb,fat:0,qty:1,serving:'Custom',time:timeStr()});
  save();
  closeCustomFoodModal(); closeFoodModal();
  renderNutrition(); renderHome();
  vibrate([10,30,10]);
  showToast(`✅ Logged ${cals} kcal to ${currentMealType}`);
}

function filterFoods(q){
  if(foodSearchDebounce) clearTimeout(foodSearchDebounce);
  foodSearchDebounce=setTimeout(()=>{
    const filtered=q?FOODS.filter(f=>f.name.toLowerCase().includes(q.toLowerCase())):FOODS;
    renderFoodList(filtered);
  },180);
}

function renderFoodList(foods){
  const el=document.getElementById('food-list');
  if(!el) return;
  el.innerHTML=foods.map(f=>`<div class="food-opt" onclick="openQtyModal(${FOODS.indexOf(f)})">
    <div style="display:flex;align-items:center;gap:12px">
      <div style="background:var(--bg4);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center">${getIcon(f.icon||'utensils','',22)}</div>
      <div><div class="food-opt-name">${f.name}</div><div class="food-opt-detail">${f.serving} · ${f.prot}g P · ${f.carb}g C · ${f.fat}g F</div></div>
    </div>
    <div class="food-opt-kcal">${f.cal} kcal</div>
  </div>`).join('');
}

function openQtyModal(idx){
  currentFood=idx===-1?{name:'Custom Food',icon:'utensils',cal:0,prot:0,carb:0,fat:0,serving:'Custom'}:FOODS[idx];
  currentQty=1;
  document.getElementById('qty-food-name').textContent=currentFood.name;
  document.getElementById('qty-food-detail').textContent=idx===-1?'Enter macros manually':`Per serving: ${currentFood.serving}`;
  document.getElementById('qty-meal-label').textContent=currentMealType.charAt(0).toUpperCase()+currentMealType.slice(1);
  const isCustom=idx===-1;
  document.getElementById('qty-display-static').style.display=isCustom?'none':'block';
  document.querySelector('.qty-row').style.display=isCustom?'none':'flex';
  const sLabel=document.querySelector('.qty-row').previousElementSibling;
  if(sLabel) sLabel.style.display=isCustom?'none':'block';
  const inputBlock=document.getElementById('qty-cals-input').parentElement.parentElement;
  inputBlock.style.display=isCustom?'block':'none';
  if(!isCustom){['qty-cals-input','qty-prot-input','qty-carb-input','qty-fat-input'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});updateQtyDisplay();}
  else{['qty-cals-input','qty-prot-input','qty-carb-input','qty-fat-input'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});}
  document.getElementById('qty-modal').classList.add('open');
}
function updateCustomMacros(type){
  const val=parseFloat(document.getElementById(`qty-${type}-input`).value)||0;
  if(type==='cal') currentFood.cal=val; else currentFood[type]=val;
}
function closeQtyModal(){
  document.getElementById('qty-modal').classList.remove('open');
  const sheet=document.querySelector('#qty-modal .modal-sheet');
  if(sheet) sheet.style.transform='';
}
function changeQty(d){currentQty=Math.max(0.5,currentQty+d*0.5);updateQtyDisplay();}
function updateQtyDisplay(){
  document.getElementById('qty-val').textContent=currentQty;
  document.getElementById('qty-cals').textContent=Math.round(currentFood.cal*currentQty)+' kcal';
  document.getElementById('qty-prot').textContent=Math.round(currentFood.prot*currentQty*10)/10+' g';
  document.getElementById('qty-carb').textContent=Math.round(currentFood.carb*currentQty*10)/10+' g';
  document.getElementById('qty-fat').textContent=Math.round(currentFood.fat*currentQty*10)/10+' g';
}

function confirmAddFood(){
  const d=getTodayData();
  const entry={name:currentFood.name,icon:currentFood.icon||'utensils',cal:Math.round(currentFood.cal*currentQty),prot:Math.round(currentFood.prot*currentQty*10)/10,carb:Math.round(currentFood.carb*currentQty*10)/10,fat:Math.round(currentFood.fat*currentQty*10)/10,qty:currentQty,serving:currentFood.serving,time:timeStr()};
  if(editingMeal){d.meals[editingMeal.type][editingMeal.index]=entry;showToast(`Updated ${entry.name}`);editingMeal=null;}
  else{d.meals[currentMealType].push(entry);showToast(`✅ Added ${entry.name}`);}
  save(); closeQtyModal(); closeFoodModal();
  vibrate([10,20,10]);
  renderNutrition(); renderHome();
}

function openScanner(){showToast('📷 Use food search to log meals.');closeFoodModal();}

function addWater(){
  const d=getTodayData();
  d.water=Math.min((d.water||0)+250,5000);
  save(); renderNutrition();
  document.getElementById('home-water').textContent=d.water;
  vibrate(10);
  showToast('💧 +250 ml water logged!');
}

function setWaterDots(n){
  const d=getTodayData();d.water=n*250;save();renderNutrition();vibrate(6);
}

function renderNutrition(){
  const d=getTodayData();
  const all=getAllMealItems(d);
  const tc=all.reduce((s,f)=>s+f.cal,0);
  const tp=all.reduce((s,f)=>s+f.prot,0);
  const tcarb=all.reduce((s,f)=>s+f.carb,0);
  const tf=all.reduce((s,f)=>s+f.fat,0);
  const p=state.profile||{};
  const cg=p.calGoal||2000,pg=p.protGoal||150,carbg=p.carbGoal||250,fg=p.fatGoal||65;

  document.getElementById('nutr-cals').textContent=tc;
  document.getElementById('nutr-cal-goal').textContent=cg;
  document.getElementById('nutr-remaining').textContent=Math.max(0,cg-tc);
  document.getElementById('cal-bar').style.width=Math.min(100,(tc/cg)*100)+'%';
  document.getElementById('nutr-prot').textContent=Math.round(tp);
  document.getElementById('nutr-prot-goal').textContent=pg;
  document.getElementById('nutr-carb').textContent=Math.round(tcarb);
  document.getElementById('nutr-carb-goal').textContent=carbg;
  document.getElementById('nutr-fat').textContent=Math.round(tf);
  document.getElementById('nutr-fat-goal').textContent=fg;
  document.getElementById('bar-prot').style.width=Math.min(100,(tp/pg)*100)+'%';
  document.getElementById('bar-carb').style.width=Math.min(100,(tcarb/carbg)*100)+'%';
  document.getElementById('bar-fat').style.width=Math.min(100,(tf/fg)*100)+'%';

  // Water dots
  const glasses=Math.floor((d.water||0)/250);
  document.getElementById('water-dots').innerHTML=Array.from({length:10},(_,i)=>`<div class="water-dot${i<glasses?' filled':''}" onclick="setWaterDots(${i+1})"></div>`).join('');
  document.getElementById('water-ml').textContent=`${d.water||0} / 2500 ml`;
  document.getElementById('nutr-date').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'});

  // Meal sections
  const mealIcons={breakfast:'sun',lunch:'sun',dinner:'moon',snack:'apple'};
  document.getElementById('nutr-meal-list').innerHTML=['breakfast','lunch','dinner','snack'].map(m=>{
    const items=d.meals[m]||[];
    if(!items.length) return '';
    return `<div class="meal-section"><div class="meal-hdr">${getIcon(mealIcons[m])} ${m.charAt(0).toUpperCase()+m.slice(1)}</div>
    <div class="card" style="padding:0 18px">
      ${items.map((f,i)=>`<div class="meal-item">
        <div class="meal-icon" style="background:var(--bg4)">${getIcon(f.icon||'utensils')}</div>
        <div class="meal-info"><div class="meal-name">${f.name} ×${f.qty}</div><div class="meal-macro">${f.prot}g P · ${f.carb}g C · ${f.fat}g F</div></div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="meal-kcal">${f.cal} kcal</span>
          <div class="meal-action edit" onclick="editMeal('${m}',${i})">${getIcon('pencil','',16)}</div>
          <div class="meal-action del" onclick="removeMeal('${m}',${i})">${getIcon('trash','',16)}</div>
        </div>
      </div>`).join('')}
    </div></div>`;
  }).join('');
}

function removeMeal(meal,idx){
  const d=getTodayData();d.meals[meal].splice(idx,1);save();renderNutrition();renderHome();vibrate([8,8]);
}
function editMeal(mealType,idx){
  const d=getTodayData();const item=d.meals[mealType][idx];
  editingMeal={type:mealType,index:idx};
  const baseFood=FOODS.find(f=>f.name===item.name)||{name:item.name,icon:item.icon||'utensils',cal:item.qty?item.cal/item.qty:item.cal,prot:item.qty?item.prot/item.qty:item.prot,carb:item.qty?item.carb/item.qty:item.carb,fat:item.qty?item.fat/item.qty:item.fat,serving:item.serving||'Custom'};
  currentFood=baseFood;currentQty=item.qty||1;currentMealType=mealType;
  const isCustom=item.serving==='Custom';
  openQtyModal(isCustom?-1:FOODS.indexOf(baseFood));
  if(isCustom){document.getElementById('qty-cals-input').value=item.cal;document.getElementById('qty-prot-input').value=item.prot;document.getElementById('qty-carb-input').value=item.carb;document.getElementById('qty-fat-input').value=item.fat;}
}

function timeStr(){return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});}

// ==================== FITNESS & PEDOMETER ====================
let pedometerActive=false;
let lastAcc=null,stepThreshold=12,lastStepTime=0;

function requestPedometer(){
  vibrate(15);
  if(pedometerActive){stopPedometer();return;}
  if(typeof DeviceMotionEvent==='undefined'){showToast('Motion sensors not available');return;}
  if(typeof DeviceMotionEvent.requestPermission==='function'){
    // iOS 13+
    DeviceMotionEvent.requestPermission().then(state=>{
      if(state==='granted') startPedometer();
      else showToast('❌ Motion permission denied. Check iOS Settings.');
    }).catch(err=>{
      console.error(err);
      showToast('Enable motion in iOS Settings → Privacy → Motion');
    });
  } else {
    startPedometer();
  }
}

function startPedometer(){
  pedometerActive=true;
  state._pedometerSession={active:true,startTime:Date.now(),date:todayKey()};
  save();
  const btn=document.getElementById('sensor-btn');
  const badge=document.getElementById('pedometer-status');
  if(btn) btn.innerHTML=`${getIcon('pause','',20)} Stop Tracking`;
  if(badge){badge.className='pedometer-badge active';badge.innerHTML=`<div class="pulse-dot"></div> LIVE TRACKING`;}
  window.addEventListener('devicemotion',onMotion);
  showToast('🏃 Tracking session started');
  const saved=getTodayData().steps||0;
  document.getElementById('fit-steps').textContent=saved.toLocaleString();
}

function stopPedometer(){
  pedometerActive=false;
  state._pedometerSession={active:false};
  window.removeEventListener('devicemotion',onMotion);
  const btn=document.getElementById('sensor-btn');
  const badge=document.getElementById('pedometer-status');
  if(btn) btn.innerHTML=`${getIcon('play','',20)} Start Tracking`;
  if(badge){badge.className='pedometer-badge inactive';badge.innerHTML='TRACKING STOPPED';}
  save();
  showToast('📊 Session stopped. Data saved.');
}

function onMotion(e){
  const a=e.accelerationIncludingGravity;
  if(!a||a.x===null) return;
  const mag=Math.sqrt((a.x||0)**2+(a.y||0)**2+(a.z||0)**2);
  const now=Date.now();
  if(lastAcc!==null&&Math.abs(mag-lastAcc)>stepThreshold&&now-lastStepTime>250){
    lastStepTime=now;
    const d=getTodayData();
    d.steps=(d.steps||0)+1;
    d.burnedCals=Math.round(d.steps*0.04);
    // Debounced save every 10 steps
    if(d.steps%10===0) save();
    const el=document.getElementById('fit-steps');
    if(el) el.textContent=d.steps.toLocaleString();
    const calEl=document.getElementById('fit-cals-burned');
    if(calEl) calEl.textContent=`${d.burnedCals} kcal burned · ${(d.steps*0.0008).toFixed(1)} km`;
    const homeSteps=document.getElementById('home-steps');
    if(homeSteps) homeSteps.textContent=d.steps.toLocaleString();
  }
  lastAcc=mag;
}

function renderFitness(){
  const d=getTodayData();
  document.getElementById('fit-steps').textContent=(d.steps||0).toLocaleString();
  document.getElementById('fit-cals-burned').textContent=`${d.burnedCals||0} kcal burned · ${((d.steps||0)*0.0008).toFixed(1)} km`;

  const wl=document.getElementById('workout-list');
  wl.innerHTML=WORKOUTS.slice(0,6).map((w,i)=>`
    <div class="exercise-item" onclick="openActivityModal(${i})">
      <div class="ex-icon" style="background:var(--bg4)">${getIcon(w.icon)}</div>
      <div class="ex-info"><div class="ex-name">${w.name}</div><div class="ex-meta"><span class="badge-pill">${w.category}</span>${w.kcalPerMin} kcal/min</div></div>
      <div class="ex-arrow">${getIcon('chevron-right','',18)}</div>
    </div>`).join('');

  const rw=document.getElementById('recent-workouts');
  const logs=state.workoutLogs||[];
  if(!logs.length){
    rw.innerHTML=`<div style="text-align:center;padding:16px 0;color:var(--text3)"><div>${getIcon('dumbbell','',32)}</div><div style="font-size:14px;font-weight:500;margin-top:8px">No workouts logged yet</div></div>`;
  } else {
    rw.innerHTML=logs.slice(-5).reverse().map(l=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:0.5px solid var(--sep)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="background:var(--bg4);width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center">${getIcon(l.icon)}</div>
          <div><div style="font-size:15px;font-weight:600">${l.name}</div><div style="font-size:12px;color:var(--text2)">${l.date} · ${l.duration} min</div></div>
        </div>
        <div style="font-size:15px;font-weight:700;color:var(--orange)">${l.burned} kcal</div>
      </div>`).join('');
  }
}

let selectedWorkoutIdx=null;
function openActivityModal(idx){
  selectedWorkoutIdx=idx;
  const w=WORKOUTS[idx];
  document.getElementById('activity-list').innerHTML=`
    <div style="text-align:center;margin-bottom:20px">${getIcon(w.icon,'',48)}</div>
    <div style="text-align:center;font-size:20px;font-weight:700;margin-bottom:4px">${w.name}</div>
    <div style="text-align:center;font-size:14px;color:var(--text2);margin-bottom:24px">${w.kcalPerMin} kcal per minute</div>
    <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:8px">DURATION (minutes)</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
      ${[10,15,20,30,45,60].map(t=>`<button class="btn-sec" style="flex:1;min-width:60px" onclick="logWorkout(${idx},${t})">${t} min</button>`).join('')}
    </div>`;
  document.getElementById('activity-modal').classList.add('open');
}
function openManualActivity(){
  document.getElementById('activity-list').innerHTML=WORKOUTS.map((w,i)=>`
    <div class="exercise-item" onclick="openActivityModal(${i})">
      <div class="ex-icon" style="background:var(--bg4)">${getIcon(w.icon)}</div>
      <div class="ex-info"><div class="ex-name">${w.name}</div><div class="ex-meta">${w.kcalPerMin} kcal/min</div></div>
    </div>`).join('');
  document.getElementById('activity-modal').classList.add('open');
}
function closeActivityModal(){
  document.getElementById('activity-modal').classList.remove('open');
  const sheet=document.querySelector('#activity-modal .modal-sheet');
  if(sheet) sheet.style.transform='';
}

function logWorkout(idx,duration){
  const w=WORKOUTS[idx];
  const burned=Math.round(w.kcalPerMin*duration);
  const d=getTodayData();
  d.exerciseMins=(d.exerciseMins||0)+duration;
  d.burnedCals=(d.burnedCals||0)+burned;
  d.stand=Math.min((d.stand||0)+Math.round(duration/5),12);
  if(!state.workoutLogs) state.workoutLogs=[];
  state.workoutLogs.push({name:w.name,icon:w.icon,duration,burned,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'})});
  save();closeActivityModal();renderFitness();renderHome();
  vibrate([10,30,10]);
  showToast(`🔥 ${w.name} logged — ${burned} kcal burned!`);
}

function logWeight(){
  const w=prompt('Enter your weight in kg:');
  if(!w||isNaN(parseFloat(w))) return;
  const d=getTodayData();
  d.weight=parseFloat(w);
  if(!state.profile) state.profile={};
  state.profile.weight=parseFloat(w);
  save();renderProgress();updateProfileUI();
  showToast(`⚖️ Weight logged: ${w} kg`);
}

function logManualSteps(){
  const input=prompt("Enter steps to add (e.g. 5000):");
  const stepsToAdd=parseInt(input);
  if(isNaN(stepsToAdd)||stepsToAdd<=0) return;
  const d=getTodayData();
  d.steps=(d.steps||0)+stepsToAdd;
  d.burnedCals=(d.burnedCals||0)+Math.round(stepsToAdd*0.04);
  save();vibrate(10);renderFitness();renderHome();
  showToast(`✅ Added ${stepsToAdd.toLocaleString()} steps manually`);
}

// ==================== PROGRESS ====================
let calChart,protChart,weightChart;
function renderProgress(){
  const days=state.days||{};
  const keys=Object.keys(days).sort().slice(-7);
  const labels=keys.map(k=>new Date(k).toLocaleDateString('en-IN',{day:'numeric',month:'short'}));
  const cals=keys.map(k=>getAllMealItems(days[k]).reduce((s,f)=>s+f.cal,0));
  const prots=keys.map(k=>getAllMealItems(days[k]).reduce((s,f)=>s+f.prot,0));
  const weights=keys.map(k=>days[k].weight||null);

  const avg=arr=>arr.length?Math.round(arr.reduce((a,b)=>a+(b||0),0)/arr.filter(v=>v!=null).length):0;
  document.getElementById('prog-avg-cal').textContent=avg(cals)||'—';
  document.getElementById('prog-avg-prot').textContent=(avg(prots)||'—')+(avg(prots)?'g':'');
  const waterAvg=avg(keys.map(k=>days[k].water||0));
  document.getElementById('prog-avg-water').textContent=waterAvg?waterAvg+'ml':'—';
  document.getElementById('prog-workouts').textContent=(state.workoutLogs||[]).length;

  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  const tickColor=isDark?'rgba(255,255,255,0.45)':'rgba(0,0,0,0.45)';
  const gridColor=isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)';
  const chartOpts={
    responsive:true,maintainAspectRatio:false,animation:{duration:700},
    plugins:{legend:{display:false},tooltip:{backgroundColor:isDark?'rgba(28,28,30,0.95)':'rgba(255,255,255,0.95)',titleColor:isDark?'#fff':'#000',bodyColor:isDark?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.7)',borderColor:isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)',borderWidth:1,cornerRadius:12,padding:10}},
    scales:{x:{grid:{color:gridColor},ticks:{color:tickColor,font:{size:11}}},y:{grid:{color:gridColor},ticks:{color:tickColor,font:{size:11}},beginAtZero:true}},
  };
  if(calChart) calChart.destroy();
  calChart=new Chart(document.getElementById('cal-chart'),{type:'bar',data:{labels,datasets:[{data:cals,backgroundColor:'rgba(255,159,10,0.75)',borderRadius:8,borderSkipped:false}]},options:{...chartOpts}});
  if(protChart) protChart.destroy();
  protChart=new Chart(document.getElementById('prot-chart'),{type:'line',data:{labels,datasets:[{data:prots,borderColor:'var(--pink)',backgroundColor:'rgba(255,55,95,0.1)',fill:true,tension:0.4,pointBackgroundColor:'var(--pink)',pointRadius:5}]},options:{...chartOpts}});
  if(weightChart) weightChart.destroy();
  weightChart=new Chart(document.getElementById('weight-chart'),{type:'line',data:{labels,datasets:[{data:weights,borderColor:'var(--blue)',backgroundColor:'rgba(10,132,255,0.1)',fill:true,tension:0.4,pointBackgroundColor:'var(--blue)',pointRadius:5,spanGaps:true}]},options:{...chartOpts}});
}

// ==================== PROFILE ====================
function renderProfile(){
  const p=state.profile;
  if(!p) return;
  document.getElementById('prof-name').textContent=p.name||'Your Name';
  const initials=(p.name||'?').split(' ').map(s=>s[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('prof-avatar').textContent=initials||'?';
  document.getElementById('prof-weight-val').textContent=(p.weight||'—')+' kg';
  document.getElementById('prof-height-val').textContent=(p.height||'—')+' cm';
  document.getElementById('prof-age-val').textContent=(p.age||'—')+' yr';
  const bmi=p.weight&&p.height?(p.weight/(p.height/100)**2).toFixed(1):'—';
  document.getElementById('prof-bmi-val').textContent=bmi+(bmi!=='—'?' ('+bmiLabel(bmi)+')':'');
  document.getElementById('prof-cal-goal').textContent=(p.calGoal||2000)+' kcal';
  document.getElementById('prof-prot-goal').textContent=(p.protGoal||150)+' g';
  document.getElementById('prof-goal-label').textContent=GOALS.find(g=>g.key===p.goal)?.label||'Goal not set';

  document.getElementById('prof-icon-weight').innerHTML=getIcon('scale');
  document.getElementById('prof-icon-height').innerHTML=getIcon('ruler');
  document.getElementById('prof-icon-age').innerHTML=getIcon('user');
  document.getElementById('prof-icon-bmi').innerHTML=getIcon('target');
  document.querySelectorAll('.prof-arrow').forEach(el=>el.innerHTML=getIcon('chevron-right','',16));

  // Sync location toggle
  const locToggle=document.getElementById('loc-toggle');
  if(locToggle) syncToggle('loc-toggle',state.locationEnabled||false);
  // Sync theme toggle
  syncThemeToggle();
}
function updateProfileUI(){renderProfile();}
function bmiLabel(bmi){
  const b=parseFloat(bmi);
  if(b<18.5) return 'Underweight';
  if(b<25) return 'Normal';
  if(b<30) return 'Overweight';
  return 'Obese';
}


// (location tracking is now handled by the map section above)


// ==================== EXPORT / IMPORT ====================
function exportData(){
  vibrate(15);
  const data=JSON.stringify(state,null,2);
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`healthify-backup-${todayKey()}.json`;
  document.body.appendChild(a);a.click();
  setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},1000);
  showToast('📦 Data exported successfully!');
}

function importData(){
  vibrate(10);
  const input=document.createElement('input');
  input.type='file';input.accept='.json,application/json';
  input.onchange=e=>{
    const file=e.target.files[0];if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const imported=JSON.parse(ev.target.result);
        if(!imported.days&&!imported.profile){showToast('❌ Invalid backup file');return;}
        Object.assign(state,imported);save();
        renderHome();renderNutrition();renderFitness();renderProfile();
        showToast('✅ Data imported successfully!');
      }catch(err){showToast('❌ Failed to read file');}
    };
    reader.readAsText(file);
  };
  input.click();
}

// ==================== SAVE AS IMAGE ====================
function saveAsImage(targetId){
  vibrate(10);
  const el=document.getElementById(targetId);
  if(!el){showToast('❌ Element not found');return;}
  if(typeof html2canvas==='undefined'){showToast('⏳ Loading html2canvas…');loadHtml2Canvas(()=>captureElement(el));return;}
  captureElement(el);
}
function loadHtml2Canvas(cb){
  const s=document.createElement('script');
  s.src='https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  s.onload=cb;document.head.appendChild(s);
}
function captureElement(el){
  html2canvas(el,{backgroundColor:null,scale:2,useCORS:true}).then(canvas=>{
    const url=canvas.toDataURL('image/png');
    const a=document.createElement('a');
    a.href=url;a.download=`healthify-summary-${todayKey()}.png`;
    document.body.appendChild(a);a.click();
    setTimeout(()=>document.body.removeChild(a),1000);
    showToast('🖼 Image saved!');
  }).catch(()=>showToast('❌ Could not capture image'));
}

// ==================== THEME ====================
function toggleTheme(){
  vibrate(8);
  const isLight=document.documentElement.getAttribute('data-theme')==='light';
  if(isLight){document.documentElement.removeAttribute('data-theme');state.theme='dark';}
  else{document.documentElement.setAttribute('data-theme','light');state.theme='light';}
  syncThemeToggle();save();
  showToast(isLight?'🌙 Dark mode on':'☀️ Light mode on');
}
function syncThemeToggle(){
  const isLight=document.documentElement.getAttribute('data-theme')==='light';
  const t=document.getElementById('theme-toggle-btn');
  if(t) t.className='ios-toggle'+(isLight?'':' on');
}

// ==================== TOGGLE HELPER ====================
function syncToggle(id,on){
  const el=document.getElementById(id);
  if(!el) return;
  el.className='ios-toggle'+(on?' on':'');
}

// ==================== ONBOARDING ====================
let obStep=1;const OB_STEPS=5;
let obData={gender:'M',activity:'moderate',goal:'maintain'};

function showOnboarding(){
  if(state.profile){
    obData={...state.profile};
    ['ob-name','ob-age','ob-weight','ob-height'].forEach(id=>{
      const el=document.getElementById(id);if(!el) return;
      const key=id.replace('ob-','');
      el.value=obData[key]||'';
    });
  }
  obStep=1;renderObStep();
  document.getElementById('ob-backdrop').classList.add('open');
}
function closeOnboarding(){
  document.getElementById('ob-backdrop').classList.remove('open');
  const sheet=document.querySelector('#ob-backdrop .ob-sheet');
  if(sheet) sheet.style.transform='';
}

function renderObStep(){
  for(let i=1;i<=OB_STEPS;i++) document.getElementById('ob-step-'+i).classList.toggle('active',i===obStep);
  document.getElementById('ob-dots').innerHTML=Array.from({length:OB_STEPS},(_,i)=>`<div class="progress-dot${i+1===obStep?' active':''}"></div>`).join('');
  document.getElementById('ob-back-btn').style.display=obStep===1?'none':'block';
  document.getElementById('ob-next-btn').textContent=obStep===OB_STEPS?'Start Tracking!':'Continue';
  const icons=['hand-wave','scale','run','target','sparkles'];
  const titles=['Welcome','Body Stats','Activity Level','Your Goal','All Set!'];
  const ic=['icon-orange','icon-blue','icon-green','icon-purple','icon-orange'];
  const el=document.getElementById('ob-title-'+obStep);
  if(el) el.innerHTML=`${getIcon(icons[obStep-1],ic[obStep-1])} ${titles[obStep-1]}`;
  if(obStep===3) renderObActivityOpts();
  if(obStep===4) renderObGoalOpts();
  if(obStep===5) renderObResults();
}
function renderObActivityOpts(){
  document.getElementById('ob-activity-opts').innerHTML=ACTIVITY_LEVELS.map(a=>`
    <div class="ob-opt${obData.activity===a.key?' selected':''}" onclick="selectActivity('${a.key}')">
      <div><div class="ob-opt-name">${a.label}</div><div class="ob-opt-detail">${a.detail}</div></div>
      <div class="ob-check">${obData.activity===a.key?getIcon('check','',14):''}</div>
    </div>`).join('');
}
function renderObGoalOpts(){
  document.getElementById('ob-goal-opts').innerHTML=GOALS.map(g=>`
    <div class="ob-opt${obData.goal===g.key?' selected':''}" onclick="selectGoal('${g.key}')">
      <div><div class="ob-opt-name">${g.label}</div><div class="ob-opt-detail">${g.detail}</div></div>
      <div class="ob-check">${obData.goal===g.key?getIcon('check','',14):''}</div>
    </div>`).join('');
}
function selectGender(g){obData.gender=g;['M','F','O'].forEach(x=>document.getElementById('ob-gender-'+x).classList.toggle('active',x===g));}
function selectActivity(k){obData.activity=k;renderObActivityOpts();}
function selectGoal(k){obData.goal=k;renderObGoalOpts();}

function calcTDEE(){
  const{weight,height,age,gender,activity,goal}=obData;
  let bmr=gender==='F'?10*weight+6.25*height-5*age-161:10*weight+6.25*height-5*age+5;
  const mult=ACTIVITY_LEVELS.find(a=>a.key===activity)?.mult||1.55;
  const adj=GOALS.find(g=>g.key===goal)?.adj||0;
  return Math.round(bmr*mult+adj);
}
function renderObResults(){
  const w=parseFloat(obData.weight)||70,h=parseFloat(obData.height)||170;
  const tdee=calcTDEE();
  const prot=Math.round(w*(obData.goal==='gain'?2.2:1.8));
  const fat=Math.round(tdee*0.25/9);
  const carb=Math.round((tdee-prot*4-fat*9)/4);
  obData.calGoal=tdee;obData.protGoal=prot;obData.carbGoal=carb;obData.fatGoal=fat;
  document.getElementById('ob-result-cals').textContent=tdee+' kcal/day';
  document.getElementById('ob-result-prot').textContent=prot+'g';
  document.getElementById('ob-result-carb').textContent=carb+'g';
  document.getElementById('ob-result-fat').textContent=fat+'g';
  const bmi=(w/(h/100)**2).toFixed(1);
  const sc=obData.goal==='lose'?62:obData.goal==='gain'?68:75;
  document.getElementById('ob-result-score').textContent=sc;
  document.getElementById('ob-result-tip').textContent=`BMI: ${bmi} (${bmiLabel(bmi)}) · TDEE: ${tdee} kcal`;
}

function obNext(){
  vibrate(8);
  if(obStep===1){
    obData.name=document.getElementById('ob-name').value||obData.name;
    obData.age=parseInt(document.getElementById('ob-age').value)||obData.age;
    if(!obData.name){showToast('Please enter your name');return;}
  }
  if(obStep===2){
    obData.weight=parseFloat(document.getElementById('ob-weight').value)||obData.weight;
    obData.height=parseFloat(document.getElementById('ob-height').value)||obData.height;
    if(!obData.weight||!obData.height){showToast('Please enter weight and height');return;}
  }
  if(obStep===OB_STEPS){
    state.profile={...obData};save();closeOnboarding();
    renderHome();updateProfileUI();renderNutrition();
    vibrate([10,20,30]);
    showToast('🎉 Profile saved! Your goals are set.');return;
  }
  obStep++;renderObStep();
}
function obBack(){if(obStep>1){vibrate(6);obStep--;renderObStep();}}

// ==================== ICONS INIT ====================
function renderStaticIcons(){
  // Tab icons
  const tabMap={home:'heart-pulse',nutrition:'utensils',fitness:'dumbbell',progress:'chart-line',profile:'user'};
  Object.entries(tabMap).forEach(([tab,icon])=>{
    const el=document.querySelector('.tab-icon-'+tab);
    if(el) el.innerHTML=getIcon(icon);
  });
  // Tab pips
  document.querySelectorAll('.tab-item').forEach(el=>{
    if(!el.querySelector('.tab-pip')){
      const pip=document.createElement('div');pip.className='tab-pip';el.insertBefore(pip,el.firstChild);
    }
  });
  // Button icons
  document.querySelectorAll('.btn-icon-plus').forEach(el=>el.innerHTML=getIcon('plus','',20));
  document.querySelectorAll('.btn-icon-camera').forEach(el=>el.innerHTML=getIcon('camera','',20));
  document.querySelectorAll('.btn-icon-pencil').forEach(el=>el.innerHTML=getIcon('pencil','',20));
  document.querySelectorAll('.btn-icon-droplet').forEach(el=>el.innerHTML=getIcon('droplet','',20));
  document.querySelectorAll('.btn-icon-satellite').forEach(el=>el.innerHTML=getIcon('satellite','',20));
  // Close buttons — use X icon not plus
  document.querySelectorAll('.close-btn').forEach(el=>{el.innerHTML=getIcon('x','',16);});
  // Score icon
  const sic=document.getElementById('score-icon');if(sic) sic.innerHTML=getIcon('heart-pulse','icon-green',14);
  const moon=document.getElementById('icon-moon');if(moon) moon.innerHTML=getIcon('moon');
}

// Setup drag-to-close on all modal sheets
function setupAllSheetDrags(){
  setupSheetDrag('food-modal',closeFoodModal);
  setupSheetDrag('qty-modal',closeQtyModal);
  setupSheetDrag('custom-modal',closeCustomFoodModal);
  setupSheetDrag('activity-modal',closeActivityModal);
  setupSheetDrag('ob-backdrop',closeOnboarding);
}

// ==================== INIT ====================
function init(){
  // Set home as the initially active view (transform-based)
  // All other views start off-screen to the right by default CSS
  // Only need to add 'active' to home — it's already in HTML
  document.querySelectorAll('.view').forEach(v => {
    if (!v.classList.contains('active')) {
      // Reset any stale animation styles from old system
      v.style.animation = '';
      v.style.display = '';
    }
  });

  renderStaticIcons();
  renderHome();
  renderNutrition();
  renderFitness();
  renderProfile();
  setupAllSheetDrags();
  syncThemeToggle();

  // Restore pedometer session continuity
  const d = getTodayData();
  if (state._pedometerSession && state._pedometerSession.active && state._pedometerSession.date === todayKey()) {
    const badge = document.getElementById('pedometer-status');
    if (badge) {
      badge.className = 'pedometer-badge active';
      badge.style.background = 'rgba(255,159,10,0.15)';
      badge.style.color = 'var(--orange)';
      badge.innerHTML = 'SESSION INTERRUPTED — TAP TO RESUME';
    }
  }

  // Restore location / map if was enabled
  if (state.locationEnabled) {
    // Delay slightly so the map container is laid out
    setTimeout(() => startLocationTracking(), 500);
  }

  // Show onboarding if no profile
  if (!state.profile) setTimeout(showOnboarding, 700);
}

// Prevent double-tap zoom on iOS
let lastTouchEnd=0;
document.addEventListener('touchend',e=>{
  const now=Date.now();
  if(now-lastTouchEnd<=300 && e.cancelable) e.preventDefault();
  lastTouchEnd=now;
},{passive:false});

window.addEventListener('DOMContentLoaded',()=>{
  renderStaticIcons();
});
window.addEventListener('load',init);

