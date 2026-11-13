const V='<i class="vf" title="Recalled from standard sources. Confirm before relying on it.">verify</i>';

/* Three-layer rule: every section carries one badge.
   CORE = static facts for Prelims and Mains. ANALYTICAL = links across geography, polity, economy, society, environment.
   CURRENT = recent items that change; each one is dated and has a re-check note. */
var LVL={core:['Core','#1d6f42','Static facts. Learn once.'],ana:['Analytical','#2f5aa8','Connects themes. Use in Mains answers.'],cur:['Current','#b5530a','Changes. Re-check before the exam.']};
function lv(l){var m=LVL[l];return '<i class="lvl lvl-'+l+'" title="'+m[2]+'" style="font-style:normal;font-size:.6em;font-weight:700;letter-spacing:.05em;text-transform:uppercase;border:1px solid '+m[1]+';color:'+m[1]+';border-radius:999px;padding:2px 9px;margin-left:10px;vertical-align:middle;white-space:nowrap">'+m[0]+'</i>'}

var DIMS=[
['physical','Physical Geography','Relief, rivers, climate','Location, boundaries, area, physiographic divisions, Shivaliks, Pir Panjal, Kashmir Valley, Great Himalaya, rivers, lakes, climate, soils, vegetation and mineral resources.'],
['history','History & Culture','Kalhana to 2019','Ancient and medieval history, Karkotas, Sultanate, Mughals, Sikhs, Dogras, accession, Article 370, militancy, 2019 reorganisation, culture, crafts, language, shrines and personalities.'],
['geopolitics','Geopolitics & Strategic Importance','LoC, PoK, Indus','Line of Control, International Border, PoK and Gilgit-Baltistan, Shaksgam, Indus Waters Treaty, 1947 to 2025 conflicts, UN role, security grid and cross-border issues.'],
['governance','Governance & Administration','UT with legislature','Reorganisation Act 2019, Lieutenant Governor, Council of Ministers, 90+5 Assembly, High Court, delimitation, Panchayati Raj, domicile and the statehood question.'],
['economy','Economy','Horticulture, tourism, hydro','GSDP, per capita income, horticulture, saffron, handicrafts, tourism, hydropower, industry, mining, state finances and economic challenges.'],
['environment','Environment & Ecology','Himalaya, wetlands, hazards','National parks, sanctuaries, Ramsar sites, Hangul, Dal and Wular, glaciers, floods, landslides, earthquakes and conservation conflicts.'],
['society','Society & Human Development','Regions, tribes, reservation','Population, regional and religious diversity, Gujjar-Bakarwal, Pahari, Kashmiri Pandits, literacy, health, education, migration and the reservation debate.'],
['infrastructure','Infrastructure & Connectivity','USBRL, Zojila, airports','USBRL and the Chenab bridge, Vande Bharat, tunnels, national highways, Mughal Road, airports, power and ring roads.'],
['schemes','Government Schemes & Policies','UT and central schemes','Schemes of the elected government, central packages, domicile and recruitment rules, land laws, welfare delivery and implementation gaps.'],
['scitech','Science, Technology & Research','Institutes and GI tags','AIIMS, IIT, IIM, NIT, SKUAST, CSIR-IIIM, aroma and saffron missions, GI products, bridge engineering and innovation clusters.'],
['current','Current Affairs & Emerging Issues','Live issues, Nov 2026','Statehood resolution, cabinet expansion, Supreme Court case, reservation policy, Chenab projects, security picture, budget and census-related items.'],
['upsc','UPSC Examination Integration','Articles, MCQs, Mains','Constitutional map, UT comparison, map practice, original MCQs, Mains skeletons and a rapid-fire revision sheet.']
];
var HUBS=['Physical','History & Culture','Geopolitics','Governance','Economy','Environment','Society','Infrastructure','Schemes','Sci & Tech','Current Affairs','UPSC Hub'];
var HUBSUB=['5 belts to Kolahoi','Kalhana to 2019','LoC, PoK, IWT','90+5 Assembly, LG','GSDP Rs 2.86 lakh cr','5 Ramsar sites','Reservation, tribes','USBRL, Zojila','Free LPG, bus, SASCI','AIIMS, IIIM, GI tags','Statehood, Sep 2026','Art. 370, Art. 3'];
var ORDER=['jammu-and-kashmir'].concat(DIMS.map(function(d){return 'jammu-and-kashmir-'+d[0]})).concat(['jammu-and-kashmir-revision']);
var REGIONS=[
['West & Central',['Goa','Gujarat','Maharashtra','Madhya Pradesh','Chhattisgarh','Rajasthan','Dadra and Nagar Haveli and Daman and Diu']],
['South',['Karnataka','Kerala','Tamil Nadu','Andhra Pradesh','Telangana','Puducherry']],
['North',['Chandigarh','Delhi','Jammu and Kashmir','Ladakh','Uttar Pradesh','Uttarakhand','Himachal Pradesh','Punjab','Haryana']],
['East',['Bihar','Jharkhand','Odisha','West Bengal']],
['North-East',['Assam','Arunachal Pradesh','Manipur','Meghalaya','Mizoram','Nagaland','Sikkim','Tripura']],
['Islands',['Andaman and Nicobar Islands','Lakshadweep']]
];

/* ---------- helpers ---------- */
function facts(a){return '<div class="facts">'+a.map(function(f){return '<div class="fact"><span class="k">'+f[0]+'</span><span class="v">'+f[1]+'</span>'+(f[2]?'<i class="live" title="Checked against 2026 sources">2026</i>':'')+'</div>'}).join('')+'</div>'}
function sec(t,b,c,l){return '<section class="blk '+(c||'')+'"><h2>'+t+(l?lv(l):'')+'</h2>'+b+'</section>'}
function ul(a){return '<ul class="ul">'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function tbl(h,r){return '<div class="tw"><table><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>'}).join('')+'</tr></thead><tbody>'+r.map(function(row){return '<tr>'+row.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
function exam(p,m,t){return '<div class="exam"><div class="ex pre"><h4>Prelims hooks</h4>'+ul(p)+'</div><div class="ex mai"><h4>Mains angles</h4>'+ul(m)+'</div>'+(t?'<div class="ex trap"><h4>Common traps</h4>'+ul(t)+'</div>':'')+'</div>'}
function mm(c,b){return '<div class="mm"><div class="mm-root">'+c+'</div><div class="mm-grid">'+b.map(function(x){return '<div class="mm-b"><h4>'+x[0]+'</h4><p>'+x[1].join(' · ')+'</p></div>'}).join('')+'</div></div>'}
function flow(s){return '<ol class="flow">'+s.map(function(x){return '<li><b>'+x[0]+'</b><span>'+x[1]+'</span></li>'}).join('')+'</ol>'}
function tl(s){return '<ul class="tl">'+s.map(function(x){return '<li><time>'+x[0]+'</time><div><h4>'+x[1]+'</h4><p>'+x[2]+'</p></div></li>'}).join('')+'</ul>'}
function hb(items,max,cls){return '<div class="hb">'+items.map(function(i){return '<div class="r"><span>'+i[0]+'</span><div class="t"><div class="f '+(i[3]||cls||'')+'" style="width:'+Math.round(i[1]/max*100)+'%"></div></div><span class="val">'+i[2]+'</span></div>'}).join('')+'</div>'}
function vb(items,max){return '<div class="vb">'+items.map(function(i){return '<div class="c"><span class="v">'+i[1]+'</span><div class="b '+(i[3]||'')+'" style="height:'+Math.round(i[2]/max*150)+'px"></div></div>'}).join('')+'</div><div class="vl">'+items.map(function(i){return '<span>'+i[0]+'</span>'}).join('')+'</div>'}
/* Current layer block: dated table of live items with a re-check note */
function curr(rows,note){return sec('Current layer: what to re-check',tbl(['Item','Where it stands (as of 13 Nov 2026)','Re-check'],rows)+(note?'<div class="note">'+note+'</div>':''),'','cur')}

/* ---------- schematic map of Jammu and Kashmir (UT-administered area) ---------- */
var OUT=[[75.55,32.38],[75.95,32.52],[76.3,32.85],[76.75,33.2],[76.55,33.55],[76.1,33.85],[75.75,34.1],[75.5,34.3],[75.5,34.6],[75.2,34.78],[74.8,34.74],[74.4,34.72],[74.05,34.68],[73.85,34.5],[73.75,34.35],[73.9,34.15],[74.0,33.95],[73.98,33.75],[74.15,33.5],[74.4,33.25],[74.45,33.0],[74.55,32.8],[74.65,32.62],[74.95,32.55],[75.2,32.45]];
var LOC=[[75.2,34.78],[74.8,34.74],[74.4,34.72],[74.05,34.68],[73.85,34.5],[73.75,34.35],[73.9,34.15],[74.0,33.95],[73.98,33.75],[74.15,33.5],[74.4,33.25],[74.45,33.0]];
var IB=[[74.45,33.0],[74.55,32.8],[74.65,32.62],[74.95,32.55],[75.2,32.45],[75.55,32.38]];
var RIV={
jhelum:[[75.25,33.53],[75.15,33.73],[74.9,33.95],[74.8,34.08],[74.62,34.22],[74.5,34.3],[74.36,34.2],[74.1,34.12],[73.95,34.08],[73.85,34.12]],
chenab:[[76.4,33.45],[76.1,33.35],[75.77,33.31],[75.5,33.25],[75.23,33.24],[75.0,33.15],[74.84,33.08],[74.76,32.95],[74.6,32.78]],
tawi:[[75.4,33.15],[75.2,33.0],[75.05,32.85],[74.86,32.73]],
ravi:[[75.95,32.55],[75.7,32.45],[75.55,32.4]],
kishan:[[75.2,34.75],[74.95,34.68],[74.7,34.65],[74.4,34.68],[74.1,34.64]],
lidder:[[75.45,34.1],[75.33,34.0],[75.2,33.88],[75.1,33.75]]
};
function px(p){return [((p[0]-73.4)*130+20).toFixed(1),((35.0-p[1])*130+20).toFixed(1)]}
function pts(a){return a.map(function(p){return px(p).join(',')}).join(' ')}
function circ(lon,lat,r,cls,title){var q=px([lon,lat]);return '<circle class="'+cls+'" cx="'+q[0]+'" cy="'+q[1]+'" r="'+r+'"><title>'+title+'</title></circle>'}
function lbl(lon,lat,t,cls,dx,dy,anchor){var q=px([lon,lat]);return '<text class="m-lbl '+(cls||'')+'" x="'+(+q[0]+(dx||0))+'" y="'+(+q[1]+(dy||0))+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+t+'</text>'}
function mapSVG(L){
  var has=function(k){return L.indexOf(k)>-1};
  var s='<svg viewBox="0 0 520 400" role="img" aria-label="Schematic map of Jammu and Kashmir"><defs><linearGradient id="rel" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--rl)"/><stop offset=".5" style="stop-color:var(--rl)"/><stop offset="1" style="stop-color:var(--rh)"/></linearGradient></defs>';
  s+='<rect class="m-sea" x="0" y="0" width="520" height="400" rx="10"/>';
  s+='<polygon class="m-land" fill="'+(has('relief')?'url(#rel)':'var(--rl)')+'" points="'+pts(OUT)+'"/>';
  if(has('rivers')){
    s+=['jhelum','chenab','tawi'].map(function(k){return '<polyline class="m-riv" points="'+pts(RIV[k])+'"/>'}).join('')+['ravi','kishan','lidder'].map(function(k){return '<polyline class="m-riv minor" points="'+pts(RIV[k])+'"/>'}).join('');
    s+=circ(74.55,34.33,7,'m-ts','Wular Lake, largest freshwater lake in India')+circ(74.87,34.12,4,'m-ts','Dal Lake')+circ(74.67,34.24,3,'m-ts','Manasbal Lake')+circ(75.05,32.7,3,'m-ts','Mansar Lake');
    s+=lbl(75.15,33.7,'Jhelum','riv',6,-2)+lbl(75.45,33.28,'Chenab','riv',0,-6)+lbl(75.05,32.88,'Tawi','riv',8,0)+lbl(74.7,34.65,'Kishanganga','riv',0,-6)+lbl(74.55,34.33,'Wular','',-12,4,'end')+lbl(74.87,34.12,'Dal','',8,12);
  }
  if(has('relief')){
    s+='<polyline class="m-riv minor" style="stroke-dasharray:5 4" points="'+pts([[74.1,33.75],[74.55,33.65],[75.0,33.55],[75.3,33.45],[75.7,33.35],[76.1,33.25]])+'"/>';
    s+=lbl(74.6,33.62,'PIR PANJAL','nb',0,14)+lbl(75.75,34.3,'GREAT HIMALAYA','nb',0,0,'start')+lbl(75.4,34.18,'▲ Kolahoi 5,425 m','',-8,-8,'end')+lbl(75.0,32.5,'SHIVALIK / PLAINS','nb',0,16);
  }
  if(has('cities')){
    [['Srinagar',74.8,34.08,6,-6],['Jammu',74.86,32.73,6,4],['Anantnag',75.15,33.73,6,4],['Baramulla',74.36,34.2,-6,-4,'end'],['Kupwara',74.26,34.52,6,4],['Poonch',74.09,33.77,-6,4,'end'],['Rajouri',74.3,33.38,-6,4,'end'],['Udhampur',75.14,32.93,6,4],['Kishtwar',75.77,33.31,6,4],['Doda',75.55,33.15,6,4],['Kathua',75.52,32.37,0,-8,'middle']].forEach(function(c){s+=circ(c[1],c[2],3,'m-dot',c[0])+lbl(c[1],c[2],c[0],'',c[3],c[4],c[5])});
  }
  if(has('pa')){
    s+=circ(74.97,34.17,12,'m-pa','Dachigam National Park')+circ(75.9,33.55,18,'m-pa','Kishtwar High Altitude National Park')+circ(74.1,34.2,9,'m-pa','Kazinag National Park')+circ(74.4,34.0,6,'m-pa','Gulmarg Wildlife Sanctuary and Biosphere Reserve')+circ(75.3,33.95,8,'m-pa','Overa-Aru Wildlife Sanctuary')+circ(74.65,33.65,7,'m-pa','Hirpora Wildlife Sanctuary');
    s+=circ(74.55,34.35,4,'m-ts','Wular Lake, Ramsar site')+circ(74.72,34.1,3,'m-ts','Hokersar, Ramsar site')+circ(74.62,34.24,3,'m-ts','Hygam, Ramsar site')+circ(74.7,34.2,3,'m-ts','Shallbugh, Ramsar site')+circ(75.05,32.7,3,'m-ts','Surinsar-Mansar, Ramsar site');
    s+=lbl(74.97,34.17,'Dachigam','',16,-10)+lbl(75.9,33.55,'Kishtwar NP','',0,4,'middle')+lbl(74.1,34.2,'Kazinag','',-12,-6,'end')+lbl(75.3,33.95,'Overa-Aru','',10,12)+lbl(74.65,33.65,'Hirpora','',0,18,'middle')+lbl(74.55,34.35,'Wular','',-8,-6,'end')+lbl(74.7,34.18,'Hokersar, Hygam, Shallbugh','',-16,24,'end')+lbl(75.05,32.7,'Surinsar-Mansar','',8,14);
  }
  if(has('infra')){
    s+='<polyline class="m-hwy" points="'+pts([[74.86,32.73],[75.14,32.93],[75.28,33.03],[75.24,33.24],[75.19,33.45],[75.1,33.58],[75.15,33.73],[74.8,34.08],[74.36,34.2]])+'"/>';
    s+='<polyline class="m-rail" points="'+pts([[74.85,32.7],[75.14,32.93],[74.95,33.0],[74.84,33.08],[74.95,33.2],[75.2,33.33],[75.19,33.45],[75.1,33.58],[75.15,33.73],[74.8,34.08],[74.36,34.2]])+'"/>';
    s+='<polyline class="m-hwy" style="stroke-dasharray:2 3" points="'+pts([[74.3,33.38],[74.45,33.55],[74.6,33.65],[74.84,33.72]])+'"/>';
    s+=circ(74.9,33.18,5,'m-inf','Chenab rail bridge, 359 m above riverbed')+circ(75.19,33.45,4,'m-inf','Banihal tunnels, Jawahar, Navyug and rail T-80')+circ(75.28,33.03,4,'m-inf','Chenani-Nashri tunnel')+circ(75.3,34.3,4,'m-inf','Z-Morh (Sonamarg) tunnel')+circ(75.47,34.28,5,'m-inf','Zojila tunnel')+circ(74.77,33.98,4,'m-inf','Srinagar airport')+circ(74.84,32.69,4,'m-inf','Jammu airport');
    s+=lbl(74.9,33.18,'Chenab bridge','',-8,4,'end')+lbl(75.19,33.45,'Banihal','',8,-4)+lbl(75.28,33.03,'Chenani-Nashri','',8,4)+lbl(75.3,34.3,'Z-Morh','',-8,-6,'end')+lbl(75.47,34.28,'Zojila','',8,-6)+lbl(74.77,33.98,'Srinagar airport','',-8,18,'end')+lbl(74.84,32.69,'Jammu airport','',-8,14,'end')+lbl(74.45,33.55,'Mughal Road','',-6,14,'end');
  }
  if(has('geo')){
    s+='<polyline fill="none" stroke="#b3261e" stroke-width="2.2" stroke-dasharray="7 3" points="'+pts(LOC)+'"/><polyline fill="none" stroke="#b3261e" stroke-width="2" stroke-dasharray="2 3" points="'+pts(IB)+'"/>';
    s+=lbl(73.9,34.05,'LoC','nb',-6,0,'end')+lbl(74.85,32.45,'International Border','nb',0,16,'middle')+lbl(73.45,33.6,'PoK','nb',0,0,'start')+lbl(74.1,32.38,'PAKISTAN (Punjab)','nb',0,0,'middle')+lbl(76.35,32.6,'HIMACHAL','nb',0,0,'middle')+lbl(76.35,34.55,'LADAKH','nb',0,0,'middle');
    s+=circ(74.03,34.08,4,'m-inf','Uri, 2016 attack and LoC sector')+circ(75.33,34.02,4,'m-inf','Pahalgam, 22 April 2025 attack')+circ(75.5,34.2,4,'m-inf','Amarnath cave shrine')+circ(74.95,33.0,4,'m-inf','Katra, Vaishno Devi base');
    s+=lbl(74.03,34.08,'Uri','',-8,-4,'end')+lbl(75.33,34.02,'Pahalgam','',-8,12,'end')+lbl(75.5,34.2,'Amarnath','',8,-6)+lbl(74.95,33.0,'Katra','',-8,14,'end');
  }
  s+='<g transform="translate(478,40)"><text class="pt s" text-anchor="middle" y="-8">N</text><path d="M0,-4 L5,12 L0,8 L-5,12Z" fill="var(--ink)"/></g>';
  s+='<g transform="translate(24,384)"><line x1="0" y1="0" x2="65" y2="0" stroke="var(--ink)" stroke-width="2"/><text class="pt s" x="0" y="-5">~ 50 km</text></g></svg>';
  return s;
}
var LEG={relief:'<i style="background:var(--rh)"></i>Higher ground',rivers:'<i style="background:var(--accent)"></i>Rivers and lakes',pa:'<i style="background:var(--good)"></i>National parks and sanctuaries',ts:'<i style="background:var(--pyq)"></i>Ramsar sites',infra:'<i style="background:var(--lat)"></i>Rail, tunnels, airports',geo:'<i style="background:#b3261e"></i>LoC and International Border'};

var MCQ=[
['Which peak is the highest in the UT-administered J&K area?',['Kolahoi','Nun Kun','Nanga Parbat','Harmukh'],2,'Kolahoi is the highest peak in the UT-administered area, while Nun Kun is in Ladakh.'],
['The Jhelum river rises at which spring?',['Verinag','Achabal','Sheshnag','Kishanganga'],0,'The Jhelum originates at Verinag spring in Anantnag district.'],
['Which of the following is not a Ramsar site in J&K UT?',['Hokersar','Wular','Tso Moriri','Shallabugh'],2,'Tso Moriri is in Ladakh, not the J&K UT area.']
];
var MAINS=[
['How can the Chenab hydropower push support energy security while managing ecological and treaty risks?',['Introduction: strategic value of the Chenab basin.','Body: hydropower, local incomes, flood-control and ecological fragility.','Conclusion: need for climate-resilient design, treaty safeguards and transparent regulation.']],
['Assess the constitutional and political significance of the restoration of statehood in J&K.',['Introduction: UT status and Article 3 route.','Body: governance, governance accountability, security and political representation.','Conclusion: statehood must balance sovereignty, federalism and local legitimacy.']]
];

/* ---------- profile (south to north) ---------- */
function profile(){
  var E=[[0,300],[60,350],[120,600],[170,1000],[220,2000],[280,3200],[330,4742],[380,3200],[420,1700],[470,1580],[510,2500],[550,4000],[590,5425],[640,4200]];
  var d='M0,190 '+E.map(function(p){return 'L'+p[0]+','+(190-p[1]*0.03).toFixed(1)}).join(' ')+' L640,190 Z';
  return '<svg viewBox="0 0 640 240" role="img" aria-label="South to north relief profile of Jammu and Kashmir"><path class="pz" d="'+d+'"/>'
  +'<line class="m-ax" x1="0" y1="190" x2="640" y2="190"/>'
  +'<g class="pt s"><text x="6" y="212">PLAINS, SHIVALIKS</text><text x="6" y="226">300 to 1,000 m</text><text x="228" y="212">PIR PANJAL</text><text x="228" y="226">peaks to ~4,700 m</text><text x="418" y="212">KASHMIR VALLEY</text><text x="418" y="226">~1,580 m</text><text x="540" y="212">GREAT HIMALAYA</text></g>'
  +'<g stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"><line x1="200" y1="100" x2="200" y2="200"/><line x1="400" y1="100" x2="400" y2="200"/></g>'
  +'<text class="pt" x="500" y="22">Kolahoi 5,425 m</text><text class="pt s" x="500" y="36">highest peak in the UT area</text>'
  +'<text class="pt s" x="10" y="150">Jammu, Tawi, Ravi</text><text class="pt s" x="238" y="86">Banihal, Pir Panjal passes</text><text class="pt s" x="420" y="140">Srinagar, Jhelum</text></svg>';
}

/* ---------- radial hub ---------- */
function radial(){
  var s='<svg viewBox="0 0 800 700" role="img" aria-label="Mind map of the 12 Jammu and Kashmir dossier sections; each box links to its page">';
  var cx=400,cy=350,rx=290,ry=262;
  for(var i=0;i<12;i++){var a=(-90+i*30)*Math.PI/180;var x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a);s+='<line class="ln" x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'"/>'}
  s+='<circle class="cn" cx="'+cx+'" cy="'+cy+'" r="66"/><text class="ct" x="'+cx+'" y="'+(cy+4)+'" text-anchor="middle">J&amp;K</text><text class="cs" x="'+cx+'" y="'+(cy+24)+'" text-anchor="middle">UT DOSSIER</text>';
  for(var j=0;j<12;j++){var b=(-90+j*30)*Math.PI/180;var X=cx+rx*Math.cos(b),Y=cy+ry*Math.sin(b);
    s+='<a href="#jammu-and-kashmir-'+DIMS[j][0]+'"><g class="nd" transform="translate('+(X-78).toFixed(1)+','+(Y-27).toFixed(1)+')"><rect width="156" height="54" rx="10"/><text class="nn" x="12" y="17">'+(j<9?'0':'')+(j+1)+'</text><text class="nt" x="12" y="33">'+HUBS[j]+'</text><text class="ns" x="12" y="47">'+HUBSUB[j]+'</text></g></a>'}
  return s+'</svg>';
}

/* ---------- pages ---------- */
var P={};

P.overview=function(){
  return '<header class="ph"><div class="eyebrow">UT dossier · Northern India</div><h1>Jammu &amp; Kashmir</h1><p class="cov">A Union Territory with a legislature, created on 31 October 2019 when the erstwhile state lost its special status and was split from Ladakh. It is the most examined region in Indian polity, geopolitics and internal security. Start here, learn the Core layer, use the Analytical layer for Mains, and re-check the Current layer last.</p></header>'
  +facts([['Area (UT, excl. Ladakh)','42,241 sq km '+V],['Population','~1.22 crore (Census 2011, UT area) '+V],['Capital','Srinagar (summer), Jammu (winter)'],['Status','UT with legislature since 31 Oct 2019'],['Divisions and districts','2 divisions, 20 districts'],['Legislature','Unicameral; 90 elected + up to 5 nominated'],['Official languages','Urdu, Hindi, English, Kashmiri, Dogri'],['Chief Minister','Omar Abdullah (since 16 Oct 2024)',1],['Lieutenant Governor','Manoj Sinha (since 7 Aug 2020)',1],['Next Assembly election','Due around autumn 2029 (5-year term)']])
  +sec('How to read this dossier',tbl(['Layer','What goes in it','How to use it'],[
  ['<b>Core</b> '+lv('core'),'Static facts: dates, articles, places, numbers that do not move.','Learn once. Prelims and Mains.'],
  ['<b>Analytical</b> '+lv('ana'),'Links between geography, polity, economy, society and environment.','Use as the argument in Mains answers.'],
  ['<b>Current</b> '+lv('cur'),'Recent developments. Each one is dated, with a re-check note.','Check again 2 to 4 weeks before the exam.']])+ '<p class="cap">Green <i class="live" style="position:static">2026</i> tags mark figures checked against 2026 sources on 13 November 2026. Amber <i class="vf">verify</i> tags mark textbook-level facts to confirm. Completeness is not the aim; every section keeps only what the three layers need.</p>','','core')
  +sec('Map explorer','<div class="two"><div><div class="tog" id="maptog">'+[['relief','Relief'],['rivers','Rivers'],['cities','Towns'],['pa','Protected areas'],['infra','Connectivity'],['geo','LoC and border']].map(function(x,i){return '<button class="btn sm" data-lay="'+x[0]+'" aria-pressed="'+(i<2?'true':'false')+'">'+x[1]+'</button>'}).join('')+'</div><div id="mapbox">'+mapSVG(['relief','rivers'])+'</div><p class="cap">Schematic map of the area administered as the UT. It is simplified, not to scale and not an authoritative boundary. Use it for relative positions only.</p></div><div>'+ul(['<b>North and north-east:</b> Ladakh (UT), beyond the Great Himalaya and Zojila.','<b>East and south-east:</b> Himachal Pradesh (Chamba, Lahaul).','<b>South and south-west:</b> Punjab (India) and the International Border with Pakistan.','<b>West:</b> Line of Control with Pakistan-occupied Kashmir.','<b>Relief:</b> plains and Shivaliks, Pir Panjal, Kashmir Valley, Great Himalaya.','<b>Rivers:</b> Jhelum in the valley; Chenab, Tawi and Ravi in the Jammu region.','<b>Cities:</b> Srinagar and Jammu are the twin capitals.'])+'<p class="cap">Toggle layers to see how parks, wetlands, rail and the LoC sit against the rivers and ranges.</p></div></div>','','core')
  +sec('Mind map: the whole UT on one screen','<div class="hubd hub">'+radial()+'</div><div class="hubm tpl">'+DIMS.map(function(d,i){return '<a class="tp" href="#jammu-and-kashmir-'+d[0]+'"><b>'+(i<9?'0':'')+(i+1)+'</b><h3>'+d[1]+'</h3><p>'+d[2]+'</p></a>'}).join('')+'</div>')
  +sec('J&amp;K in eight lines',ul(['Princely state under the Dogra dynasty from the Treaty of Amritsar, 1846.','Acceded to India by the Instrument of Accession on 26 October 1947; the first Indo-Pak war followed.','Special status under Article 370 and Article 35A until 5 August 2019.','Reorganised on 31 October 2019 into the UTs of J&amp;K (with legislature) and Ladakh (without).','Supreme Court upheld the abrogation on 11 December 2023 and asked for statehood “as soon as possible”.','First Assembly election in 10 years held in September to October 2024; National Conference won 42 of 90 seats.','Statehood is still not restored. The Assembly passed a statehood resolution on 28 September 2026.','Services are about 61% of GVA; horticulture, tourism and hydropower define the economy.']),'','core')
};

P.physical=function(){
  return facts([['Location (UT area)','~32.3°N to 34.9°N, ~73.7°E to 76.8°E '+V],['Area','42,241 sq km '+V],['Divisions','Jammu, Kashmir'],['Highest peak (UT area)','Kolahoi (Gwashbrari), 5,425 m '+V],['Kashmir Valley','~135 km long, ~1,580 m above sea level '+V],['Seismic zone','Zones IV and V']])
  +sec('Location and boundaries','<div class="two"><div>'+ul(['West: Line of Control with Pakistan-occupied Kashmir and Gilgit-Baltistan.','South-west: International Border with Pakistan (Punjab), in Jammu, Samba and Kathua districts.','South and east: Punjab and Himachal Pradesh.','North and north-east: Ladakh (UT), with Zojila as the gateway.','Nun Kun (7,135 m) and Siachen are now in Ladakh, not in this UT '+V+'.','Official Indian maps also show PoK, Gilgit-Baltistan and Shaksgam as part of J&amp;K. This dossier maps only the UT-administered area.'])+'</div><div>'+mapSVG(['relief','rivers','cities'])+'<p class="cap">Schematic. Relief shading deepens towards the Great Himalaya.</p></div></div>','','core')
  +sec('Physiographic divisions',tbl(['Belt','Height','What defines it','Exam hook'],[
  ['Outer plains and Shivaliks','300 to 1,000 m','Jammu plains, Kandi belt, Sirowal; subtropical; Tawi and Ravi basins','Chir pine, paddy, basmati at R S Pura'],
  ['Pir Panjal (Middle Himalaya)','Up to ~4,700 m','Separates the Jammu region from the Valley; Banihal, Pir Panjal and Razdan passes','Banihal passes carry NH-44, Jawahar tunnel and rail tunnels '+V],
  ['Kashmir Valley','~1,580 m','Alluvial and lacustrine karewa plateaus; Jhelum floodplain; Dal, Wular, Anchar','Karewas grow saffron at Pampore'],
  ['Great Himalaya and Zanskar flank','Above 4,000 m','Kolahoi, Harmukh, Amarnath, Sinthan and Zojila passes; glaciers and alpine lakes','Zojila links the Valley to Ladakh'],
  ['Chenab and Kishtwar highlands','1,000 to 5,000 m','Deep gorges of the Chenab; Doda, Kishtwar, Paddar','Hydro and sapphire belt']])+ '<h3>South to north cross-section</h3>'+profile()+'<p class="cap">Vertical scale is exaggerated for legibility. The profile shows the belts in order.</p>','','core')
  +sec('Rivers and lakes',tbl(['Water body','Facts','Why it matters'],[
  ['Jhelum','Rises at Verinag spring in Anantnag; passes Srinagar and Wular; leaves for Pakistan near Uri. Tributaries: Lidder, Sind, Pohru.','Valley’s lifeline; flood-prone (Sept 2014); western river under the Indus Waters Treaty.'],
  ['Chenab','Formed by Chandra and Bhaga at Tandi (Himachal); enters the UT in Kishtwar; flows past Ramban and Reasi to Akhnoor.','Dulhasti, Salal, Baglihar, Ratle, Pakal Dul, Kiru, Kwar, Sawalkote; the key river for hydropower.'],
  ['Tawi and Ravi','Tawi flows through Jammu city. The Ravi forms the Kathua boundary with Punjab.','Ravi is an eastern river under the treaty; Ujh project on its tributary.'],
  ['Kishanganga (Neelum)','Rises near Dras, flows through Gurez to PoK.','330 MW Kishanganga project; dispute with Pakistan.'],
  ['Wular','Largest freshwater lake in India; Ramsar site (1990); absorbs Jhelum floods.','Fisheries, flood buffer; heavy encroachment.'],
  ['Dal, Nigeen, Manasbal, Anchar','Srinagar lake system; Manasbal is among the deepest lakes '+V+'.','Tourism, houseboats, pollution and weeds; Dal is governed by LCMA.'],
  ['Alpine lakes','Gangabal, Vishansar-Kishansar, Tarsar-Marsar, Sheshnag, Kounsarnag.','Trekking; glacial melt-fed.']])+ '<p class="cap">Under the Indus Waters Treaty (1960), India controls Ravi, Beas and Sutlej; Pakistan receives Indus, Jhelum and Chenab, with limited Indian rights. Details are in the Geopolitics page.</p>','','core')
  +sec('Climate, soils, vegetation','<div class="three"><div><h4>Climate</h4>'+ul(['Jammu: subtropical, hot summers, monsoon rain.','Valley: temperate; cold winters, snow from western disturbances.','Chilla Kalan: the 40-day peak winter, 21 December to 29 January '+V+'.','Southwest monsoon is weak in the Valley.'])+'</div><div><h4>Soils</h4>'+ul(['Alluvial in plains and Jhelum floodplain.','Karewa (lacustrine) deposits on plateaus.','Mountain and meadow soils; skeletal soils at height.'])+'</div><div><h4>Vegetation</h4>'+ul(['Subtropical: chir pine and scrub in Shivaliks.','Temperate: deodar, kail, fir, spruce.','Alpine meadows (margs): Gulmarg, Sonamarg, Doodhpathri.','Chinar and willow in the Valley.'])+'</div></div>','','core')
  +sec('Minerals and natural resources',ul(['Limestone (about 1 billion tonnes reported by GSI), gypsum, dolomite, bauxite, coal and lignite in small deposits '+V+'.','Sapphire in Paddar, Kishtwar.','Inferred lithium resource reported at Salal-Haimana, Reasi (GSI, 2023); mineral block auctions have faced weak response '+V+'.','Water: hydropower potential estimated at roughly 20,000 MW, much of it untapped '+V+'.']),'','core')
  +sec('Analytical links: how geography drives the rest',ul(['<b>Relief to connectivity:</b> the Pir Panjal and snowfall make rail, tunnels and the Zojila project strategic, not just economic.','<b>Chenab gorges to power:</b> steep drop in a narrow valley explains the hydropower cluster and its role in the Indus treaty debate.','<b>Karewas to horticulture:</b> lacustrine plateaus and cold winters support saffron, apple and walnut, which anchor rural incomes.','<b>Tectonics to hazards:</b> young, active mountains bring earthquakes, landslides, avalanches and cloudbursts.','<b>Wetlands to floods:</b> loss of Wular and Hokersar floodplain worsened the 2014 Jhelum flood.']),'','ana')
  +sec('Mind map',mm('Physical J&amp;K',[['Place',['32.3 to 34.9°N','42,241 sq km','2 divisions']],['Relief',['Plains and Shivaliks','Pir Panjal','Valley','Great Himalaya']],['Rivers',['Jhelum','Chenab','Tawi','Ravi','Kishanganga']],['Lakes',['Wular','Dal','Manasbal','Mansar']],['Climate and soils',['Subtropical to temperate','Karewas','Chilla Kalan']],['Resources',['Limestone','Gypsum','Sapphire','Hydro']]]))
  +curr([['Chenab hydropower push','Pakal Dul (1,000 MW), Kiru (624 MW) and Kwar (540 MW) have fast-track targets; Sawalkote (1,856 MW) moved to bids (Feb 2026 report).','Project commissioning dates'],['Mineral auctions','First limestone block e-auction was run in Nov 2025.','Auction outcomes'],['Hazard events','Aug 2025 cloudburst at Chasoti, Kishtwar, and the Vaishno Devi landslide '+V+'.','NDMA and UT disaster reports']],'Hazard death tolls differ across reports; quote ranges unless the question gives a source.')
  +exam(['Highest peak in the UT area is Kolahoi; Nun Kun is in Ladakh.','Jhelum rises at Verinag; Wular is India’s largest freshwater lake.','Chenab is formed by Chandra and Bhaga at Tandi.','Indus treaty: Ravi, Beas, Sutlej to India; Indus, Jhelum, Chenab to Pakistan.'],['Explain how the Pir Panjal and Chenab gorges shape J&amp;K’s infrastructure and strategy.','Why did the 2014 floods expose the loss of Jhelum’s natural flood buffers?'],['Do not place Siachen, Nun Kun or Zojila-east in the UT; they are in Ladakh.','Check whether a question counts only the UT-administered area or the whole Indian-claimed J&amp;K.']);
};

P.history=function(){
  return sec('From Kalhana to 2019: the flow',flow([['1846','Treaty of Amritsar; Dogra rule begins'],['26 Oct 1947','Instrument of Accession'],['1 Jan 1949','Ceasefire under UN'],['1951 to 56','Constituent Assembly and J&amp;K Constitution'],['1953','Sheikh Abdullah dismissed'],['1972','Simla Agreement; LoC'],['1989 to 90','Militancy; Pandit exodus'],['5 Aug 2019','Article 370 abrogated'],['31 Oct 2019','UT created'],['11 Dec 2023','Supreme Court verdict']]),'','core')
  +sec('Timeline',tl([
  ['Ancient','Kalhana’s Rajatarangini','Kalhana’s 12th century Sanskrit chronicle is the key source for early Kashmir. Karkota ruler Lalitaditya Muktapida (8th century) built the Martand Sun Temple; Avantivarman of the Utpala dynasty founded Avantipora.'],
  ['c. 1339','Shah Mir dynasty','Shah Mir founds the Sultanate. Zain-ul-Abidin (Budshah, 15th century) is remembered for religious tolerance, crafts and arts.'],
  ['1586','Mughal rule','Akbar annexes Kashmir. Mughal gardens such as Shalimar, Nishat and Chashme Shahi, and Mughal Road routes, date from this era.'],
  ['1752 to 1819','Afghan rule, then Sikh rule','Durrani rule gives way to Ranjit Singh’s conquest of Kashmir in 1819.'],
  ['16 Mar 1846','Treaty of Amritsar','After the First Anglo-Sikh War, Gulab Singh of Jammu buys Kashmir from the British for Rs 75 lakh and founds the Dogra dynasty. Successors: Ranbir Singh, Pratap Singh, Hari Singh.'],
  ['Oct 1947','Accession','After a tribal raid on 22 October, Maharaja Hari Singh signs the Instrument of Accession on 26 October; Indian troops land on 27 October. Standstill Agreement with Pakistan dated 12 August 1947.'],
  ['1 Jan 1948 and 1 Jan 1949','UN reference and ceasefire','India refers the issue to the UN Security Council. UN resolutions of 1948 and 1949 lead to a ceasefire line, later monitored by UNMOGIP.'],
  ['17 Oct 1949','Article 370 adopted','Temporary provision giving J&amp;K special status. Article 35A was added by the Presidential Order of 1954 '+V+'.'],
  ['1952 to 1956','Delhi Agreement and own constitution','Sheikh Abdullah’s National Conference leads the Constituent Assembly. The J&amp;K Constitution was adopted in 1956 and came into force on 26 January 1957.'],
  ['9 Aug 1953','Sheikh Abdullah dismissed','Arrested; Bakshi Ghulam Mohammad becomes Prime Minister. In 1965 the Sadr-i-Riyasat and Prime Minister posts were renamed Governor and Chief Minister.'],
  ['1965, 1971, 1972','Wars and Simla','1965 war and Tashkent Declaration (Jan 1966); 1971 war; Simla Agreement (2 July 1972) turns the ceasefire line into the Line of Control.'],
  ['1975','Indira-Sheikh Accord','Sheikh Abdullah returns as Chief Minister; he dies in 1982.'],
  ['1987 to 1990','Disputed election and militancy','Allegations about the 1987 election, then armed militancy from 1989. Kashmiri Pandit exodus in 1990; AFSPA applied; Governor’s and President’s rule 1990 to 1996.'],
  ['1999','Kargil','Operation Vijay; Indian forces recapture heights in Kargil (now in Ladakh).'],
  ['2014 to 2018','Floods and PDP-BJP rule','Sept 2014 floods; PDP-BJP coalition from 2015; Burhan Wani killing in July 2016; Uri attack in Sept 2016. BJP withdraws support in June 2018; Governor’s rule, then President’s rule from December 2018.'],
  ['14 Feb 2019','Pulwama attack','CRPF convoy attacked; Balakot strike follows on 26 February 2019.'],
  ['5 to 6 Aug 2019','Article 370 abrogated','Presidential Order (C.O. 272) uses Article 367 to apply the whole Constitution; Parliament passes the J&amp;K Reorganisation Act 2019.'],
  ['31 Oct 2019','UT created','J&amp;K becomes a UT with a legislature; Ladakh a UT without. Governor replaced by Lieutenant Governor.'],
  ['11 Dec 2023','Supreme Court verdict','Constitution Bench unanimously upholds abrogation; says J&amp;K had no internal sovereignty; asks for statehood “as soon as possible” and elections by 30 September 2024.'],
  ['Sep to Oct 2024','Assembly election','Three phases (18 Sept, 25 Sept, 1 Oct). Results on 8 October. Omar Abdullah sworn in on 16 October 2024.']])+ '<p class="cap">Day numbers are textbook-level; confirm exact dates for any date-based MCQ '+V+'.</p>','','core')
  +sec('Culture at a glance',tbl(['Theme','Key items'],[
  ['Identity','Kashmiriyat: shared Sufi and Rishi tradition; Nund Rishi (Sheikh Noor-ud-Din), Lalla Ded, Habba Khatoon'],
  ['Languages','Kashmiri (in the Eighth Schedule since 1950), Dogri (added by the 92nd Amendment, 2003), Urdu, Hindi, Pahari, Gojri. J&amp;K Official Languages Act 2020 makes five languages official.'],
  ['Crafts','Pashmina, Kani shawl, Sozni embroidery, papier-mâché, walnut wood carving, hand-knotted carpets, Khatamband ceilings. Srinagar joined the UNESCO Creative Cities Network for crafts and folk art in 2021 '+V+'.'],
  ['Shrines and monuments','Amarnath cave, Vaishno Devi (Katra), Hazratbal, Jamia Masjid, Shankaracharya temple, Martand Sun Temple, Kheer Bhawani, Mughal gardens, Mubarak Mandi complex, Bahu Fort'],
  ['Festivals and performance','Navreh, Eid, Lohri, Baisakhi, Kheer Bhawani mela, Amarnath Yatra; Bhand Pather folk theatre, Rouf dance, Dumhal'],
  ['Food and dress','Wazwan, noon chai, Kashmiri kahwa; phiran and kangri for winter']]),'','core')
  +sec('Analytical links: legacies that still shape politics',tbl(['Legacy','What it is','Why it matters now'],[
  ['Instrument of Accession and Article 370','Limited accession with special status that eroded step by step through Presidential Orders','Basis of the 2019 and 2023 legal debate: temporary provision, internal sovereignty, Article 367 route'],
  ['Regional divides','Jammu (Hindu-majority plains), Kashmir (Muslim-majority Valley), Ladakh (Buddhist and Shia Muslim)','Explains 2019 bifurcation, seat distribution and reservation politics'],
  ['Domicile and land laws','State Subject rules of 1927 under the Dogras; replaced by the 2020 domicile rules','Access to jobs and land is still a core grievance and a political issue'],
  ['1990 exodus','Kashmiri Pandit migration','Nominated Assembly seats for Kashmiri Migrants; return and rehabilitation policy']]),'','ana')
  +sec('Mind map',mm('History &amp; culture',[['Early',['Karkota','Lalitaditya','Kalhana']],['Medieval',['Shah Mir','Zain-ul-Abidin','Mughals']],['Dogras',['Treaty of Amritsar 1846','Hari Singh']],['1947 to 56',['Accession','UN','Art. 370','Constitution']],['Conflict',['1965','1971 Simla','1989 militancy','Kargil 1999']],['2019 onwards',['Abrogation','UT 2019','SC verdict 2023','Election 2024']],['Culture',['Kashmiriyat','Sufi and Rishi','Pashmina','Navreh']]]))
  +curr([['Darbar Move','Biannual move of the secretariat between Srinagar and Jammu, discontinued in 2021 and reported restored in late 2025 '+V+'.','Official notification'],['Historical narrative debates','Debates on textbooks and “Jammu and Kashmir history” are reported often, with school-library book suspensions in June 2026 (media report).','Only if asked'],['Heritage and tourism','Tulip garden, Mughal garden festivals and Srinagar’s Creative City status feature in tourism pitches.','Tourism pages']],'The Current layer here is light. History is mostly Core; recent items matter only through law, security or politics.')
  +exam(['Treaty of Amritsar (1846): Gulab Singh paid Rs 75 lakh.','Instrument of Accession: 26 October 1947.','Simla Agreement 1972 created the LoC.','Kashmiri and Dogri are in the Eighth Schedule (Dogri via the 92nd Amendment, 2003).'],['Trace the erosion of Article 370 from 1954 to 2019.','How did the Dogra legacy and State Subject rules shape J&amp;K’s regional politics?'],['Do not confuse the 1949 ceasefire line with the 1972 Line of Control.','Do not use the 2019 date for “Article 35A inserted”; it was a 1954 Presidential Order.']);
};

P.geopolitics=function(){
  return facts([['Neighbours','Pakistan (LoC and IB), China (via Ladakh), Himachal, Punjab, Ladakh'],['Line of Control','~740 km (approx.) '+V],['International Border (Jammu)','~200 km (approx.) '+V],['UN role','UNMOGIP since 1949'],['Key treaty','Indus Waters Treaty, 1960'],['Status of IWT','In abeyance since April 2025',1]])
  +sec('Core: the strategic picture','<div class="two"><div>'+mapSVG(['relief','rivers','geo'])+'<p class="cap">LoC, International Border and key sites on the schematic map.</p></div><div>'+ul(['<b>Two borders.</b> The LoC (from the 1972 Simla Agreement) runs from the Jammu region to the north; the International Border runs across Kathua, Samba and Jammu districts.','<b>PoK and Gilgit-Baltistan.</b> Held by Pakistan; 24 of 114 Assembly seats are reserved for PoK, kept vacant.','<b>Shaksgam Valley.</b> Ceded by Pakistan to China in 1963; India rejects the agreement '+V+'.','<b>CPEC.</b> Runs through PoK and Gilgit-Baltistan, which India opposes.','<b>UN.</b> UNMOGIP stays in place; India holds that Simla made the dispute bilateral.','<b>Water.</b> The western rivers flow from J&amp;K into Pakistan, which makes the Chenab and Jhelum strategic.'])+'</div></div>','','core')
  +sec('Conflicts and agreements',tbl(['Year','Event','Why it matters'],[
  ['1947 to 48','First Indo-Pak war; UN reference','Created the ceasefire line of 1 January 1949'],
  ['1965 and 1971','Two further wars','Tashkent Declaration; Simla Agreement 1972 and the LoC'],
  ['1999','Kargil conflict (Operation Vijay)','Intrusion on the Kargil heights; Indian recapture'],
  ['2003 and 2021','Ceasefire understandings along the LoC','2021 reaffirmation of the 2003 ceasefire'],
  ['2016','Uri attack; surgical strikes on 29 Sept','Doctrine of cross-LoC response'],
  ['2019','Pulwama attack (14 Feb); Balakot (26 Feb)','Cross-border air strike'],
  ['2025','Pahalgam attack on 22 April; Operation Sindoor from 7 May; ceasefire on 10 May','Largest India-Pakistan military exchange since 1971; Indus treaty put in abeyance '+V]]),'','core')
  +sec('Analytical: the Indus Waters Treaty and Chenab strategy',ul(['<b>Allocation.</b> India: Ravi, Beas, Sutlej. Pakistan: Indus, Jhelum, Chenab, with limited Indian rights for run-of-river hydro, irrigation and storage.','<b>Abeyance.</b> After the Pahalgam attack, India placed the treaty in abeyance (April 2025). Union Power Minister Manohar Lal said in January 2026 that Pakistan’s objections would no longer be acknowledged.','<b>Not a withdrawal.</b> The treaty has no unilateral exit clause; India has paused treaty-linked processes while using permissible rights (one 2026 analysis).','<b>Projects.</b> Salal desilting was among the first measures; Sawalkote, Pakal Dul, Kiru, Kwar and Ratle are being fast-tracked.','<b>Chenab diversion.</b> A Rs 5,000 crore strategic diversion plan is reported at the drawing-board stage (one outlet, May 2026); treat as unconfirmed.','<b>Counter-view.</b> Pakistan calls the move an act of war; legal experts note the treaty is not designed for suspension and storage capacity is limited.']),'','ana')
  +sec('Analytical: security picture, 2025 to 2026',ul(['Terror incidents have fallen in the Valley compared with the 2010s, but infiltration and jungle-area attacks in Jammu’s Pir Panjal and Chenab belts continued (Kishtwar, Kathua, Rajouri-Poonch).','The Nowgam police station accidental explosion (Nov 2025) killed 9 while handling seized material from a Faridabad-linked module (media reports).','IGP said in Nov 2026 that only one local militant remains active (UNI headline); verify numbers before use.','A fresh drug-free campaign (April 2026) and dismissals of employees under Article 311(2)(c) show a mix of policing and administrative measures.','Cross-border drone drops and narco-terror remain concerns.']),'','ana')
  +sec('Mind map',mm('Strategic J&amp;K',[['Borders',['LoC ~740 km','IB ~200 km']],['Claims',['PoK','Gilgit-Baltistan','Shaksgam']],['Treaties',['Simla 1972','IWT 1960','2003 ceasefire']],['Wars',['1947','1965','1971','Kargil','2025']],['Water',['Chenab','Jhelum','Hydro push']],['Security',['Pahalgam 2025','Infiltration','Drones','Narco-terror']]]))
  +curr([['IWT abeyance','In effect since April 2025; fast-tracking of Chenab projects reported through 2026.','Treaty process news, any Court of Arbitration step'],['Pahalgam aftermath','26 killed on 22 April 2025 (some reports differ); Operation Sindoor from 7 May 2025.','Official figures'],['Security events (Sep to Oct 2026)','Majalta encounter, LeT commander killed at Usmarg (4 Oct), CISF camp firing in Kathua (30 Sep) per media reports.','Verify with MHA or Army releases']],'Casualty figures and operation names vary by source; cite the official figure, or say “reported”.')
  +exam(['UNMOGIP is in place since 1949.','Indus treaty: Ravi, Beas, Sutlej to India.','LoC arose from the 1972 Simla Agreement.','24 Assembly seats reserved for PoK.'],['Evaluate India’s decision to hold the Indus Waters Treaty in abeyance, with strategic and legal angles.','Explain why J&amp;K is central to India-Pakistan relations beyond territory.'],['“Abeyance” is not “termination”; use the word carefully.','Siachen and Aksai Chin belong to the Ladakh sections, not the UT area.']);
};

P.governance=function(){
  return facts([['Chief Minister','Omar Abdullah (NC)',1],['Deputy CM','Surinder Choudhary',1],['Lieutenant Governor','Manoj Sinha',1],['Speaker','Abdul Rahim Rather',1],['Assembly','90 elected + up to 5 nominated; majority is 46 of 90'],['Ministers','9 maximum (10% of 90), reached on 27 Oct 2026',1],['Parliament','5 Lok Sabha, 4 Rajya Sabha seats '+V],['High Court','High Court of J&amp;K and Ladakh, seats at Srinagar and Jammu']])
  +sec('Core: the legal frame',flow([['5 Aug 2019','Article 370 abrogated'],['31 Oct 2019','Reorganisation Act in force'],['2020','Domicile rules'],['2022','Delimitation report; 90 seats'],['2023','Act amended for nominated members'],['2024','Elections; Omar sworn in 16 Oct'],['Present','UT status, statehood pending']])+ '<p class="cap">The J&amp;K Reorganisation Act 2019 sets up a legislature, a Lieutenant Governor and a limited Council of Ministers. The model is closest to Delhi, but with its own Act.</p>','','core')
  +sec('Core: government structure','<div class="three"><div><h4>Executive</h4>'+ul(['LG appointed by the President; acts on aid and advice of ministers except in reserved matters.','Reserved: police and public order, All India Services and the Anti-Corruption Bureau (Section 32 and the 2024 business rules) '+V+'.','Council of Ministers capped at 10% of the House: 9 including the CM.'])+'</div><div><h4>Legislature</h4>'+ul(['90 elected seats: 43 in Jammu region, 47 in Kashmir region (2022 delimitation).','24 seats for PoK, vacant, make a notional 114.','9 Scheduled Tribe seats for the first time; 7 for Scheduled Castes.','Up to 5 nominated members: 2 women, 2 Kashmiri Migrants (one woman), 1 PoK displaced person (2023 amendment) '+V+'.'])+'</div><div><h4>Judiciary and others</h4>'+ul(['Common High Court for J&amp;K and Ladakh.','J&amp;K Public Service Commission and Services Selection Board for recruitment.','Panchayat and urban local body elections are conducted by the UT’s State Election Commission.'])+'</div></div>','','core')
  +sec('Core: local government',tbl(['Level','Body','Notes'],[
  ['Rural','Halqa Panchayats, Block Development Councils, District Development Councils (DDC)','73rd Amendment extended after 2019; first DDC elections in Nov to Dec 2020 with 280 seats across 20 districts '+V],
  ['Urban','Municipal councils and committees, Srinagar and Jammu Municipal Corporations','Last elected in 2018; terms ended; elections are overdue '+V],
  ['Administrative','2 divisions, 20 districts; Divisional Commissioners and Deputy Commissioners','Jammu: 10 districts; Kashmir: 10 districts']]),'','core')
  +sec('Analytical: a UT with a legislature, compared',tbl(['','Delhi','Puducherry','J&amp;K'],[
  ['Authority','Article 239AA','Article 239A','J&amp;K Reorganisation Act 2019'],['Elected seats','70','30 (+3 nominated)','90 (+5 nominated)'],['Max ministers','7 (10%)','CM + 5 (after 2023 amendment) '+V,'9 (10%)'],['Police and public order','Centre','With UT government','With LG'],['Statehood demand','Yes','Yes','Yes, with SC reference in 2023']]),'','ana')
  +sec('Analytical: friction between the elected government and the LG',ul(['The elected government has no say over the Home department, police, and posting of officers. CM Omar Abdullah said in May 2026 that a model where elected representatives are not fully in charge “does not work” for J&amp;K (media report).','Business Rules amended in July 2024 tightened the LG’s role in transfers, prosecution sanction and police matters '+V+'.','Legislation on financial bills needs LG’s prior recommendation; bills can be sent to the President.','The LG returned the Cabinet’s reservation recommendations without approval (June 2026 report), which led to a revised response.']),'','ana')
  +sec('Analytical: statehood, constitutional route',ul(['Statehood needs a new Act of Parliament, similar to the 2019 Reorganisation Act, under Article 3.','The Supreme Court (Dec 2023) accepted the Centre’s assurance and asked for restoration “as soon as possible”; it did not give a timeline.','In August 2025 the Court said “ground realities” such as the Pahalgam attack could not be ignored; on 10 October 2025 it gave the Centre four weeks to respond, and the Centre said consultations were on.','Ladakh was kept separate; any statehood bill would cover J&amp;K only.']),'','ana')
  +curr([['Assembly statehood resolution','Moved on 25 Sept and passed on 28 Sept 2026 by voice vote, with a BJP walkout. It asks for “full” statehood; CM said it should not be a “half state” without law-and-order powers.','Union Cabinet or Parliament response'],['Cabinet expansion','4 NC MLAs sworn in on 27 Oct 2026 at Lok Bhavan, Srinagar, taking the Council to 9. Congress stayed out, citing statehood. All four are from the Valley, which drew BJP criticism.','Portfolios; Jammu representation debate'],['Supreme Court','Centre gave consultations as its stand on 10 Oct 2025; I could not confirm later hearings in 2026.','Latest order and listing'],['Rajya Sabha and bypolls','Oct 2025: NC won three Rajya Sabha seats and BJP one. Nov 2025: BJP won Nagrota bypoll; PDP’s candidate won Budgam.','Party position changes'],['Reservation policy','Cabinet sub-committee report is with the LG and the Centre; Cabinet approved a reply to MHA queries on 24 June 2026.','Final notification'],['Raj Bhavan renamed','Lok Bhavan is the name used in 2026 reports for the LG’s residence and venue.','Official notification']],'Check the latest Supreme Court order and any Union Cabinet decision on statehood before using “not restored” in an answer.')
  +sec('Mind map',mm('Governing J&amp;K',[['Legal base',['Reorg Act 2019','Art. 3','Domicile 2020']],['Executive',['LG','CM and 9 ministers']],['Legislature',['90 + 5','43:47 split','24 PoK seats']],['Courts',['J&amp;K and Ladakh HC']],['Local',['DDC','BDC','Halqa','ULB overdue']],['Issues',['Statehood','LG powers','Reservation']]]))
  +exam(['Reorganisation Act 2019: effective 31 October 2019.','Delimitation: 90 seats, 43 Jammu and 47 Kashmir; 24 for PoK.','Max ministers: 10% of the Assembly.','SC verdict 11 December 2023.'],['Is J&amp;K’s UT model compatible with cooperative federalism?','Discuss LG-government relations in Delhi and J&amp;K.'],['Do not call J&amp;K a state in an answer on 2026 governance.','Article 239A is Puducherry’s; Delhi is 239AA.']);
};

P.economy=function(){
  return facts([['GSDP (nominal), 2025-26','Rs 2.86 lakh crore (Survey advance)',1],['Real growth, 2025-26','5.82% (advance)',1],['Nominal growth','8.89%',1],['Per capita income','Rs 1,68,243 (2025-26)',1],['India per capita (Survey)','Rs 2,19,575',1],['Tourist arrivals, 2025','1.78 crore',1]])
  +sec('Core: size and structure','<div class="two"><div><h3>Per capita income (Rs)</h3>'+hb([['J&amp;K',168243,'Rs 1.68 lakh'],['India',219575,'Rs 2.20 lakh','lat']],219575)+'<p class="cap">Economic Survey 2025-26. J&amp;K’s per capita income rose about 170% from 2014-15, per the Survey.</p></div><div><h3>GVA mix, 2025-26</h3><div class="stack"><div style="width:20.45%;background:var(--good)">20</div><div style="width:18.52%;background:var(--accent)">19</div><div style="width:61.03%;background:var(--lat)">61</div></div><div class="leg"><span><i style="background:var(--good)"></i>Primary 20.45%</span><span><i style="background:var(--accent)"></i>Secondary 18.52%</span><span><i style="background:var(--lat)"></i>Tertiary 61.02%</span></div><p class="cap">Agriculture and allied sectors sit above the national share (18.35%) while services still dominate.</p></div></div>','','core')
  +sec('Core: finances (Budget 2026-27)',tbl(['Item','Figure','Note'],[
  ['Budget size','Rs 1,13,767 crore','Presented 6 Feb 2026 by CM Omar Abdullah, who also holds Finance. Some reports quote Rs 1.27 lakh crore; check the budget papers (PRS).'],
  ['Projected GSDP','Rs 3,15,822 crore for 2026-27','About 9.5% above the 2025-26 revised estimate of Rs 2.88 lakh crore'],
  ['Central assistance','Rs 42,752 crore, plus Rs 13,400 crore under centrally sponsored schemes','Heavy reliance on Centre'],
  ['Capital outlay','Reported at Rs 25,236 crore '+V,'Reports differ on the rise over 2025-26'],
  ['SASCI','Rs 3,200 crore received so far; extra Rs 1,431 crore added','50-year interest-free loans for capital projects'],
  ['Inflation','3.60% (Apr to Dec 2025) against 1.72% for India','Survey; higher than national']])+ '<div class="note"><b>Why numbers differ.</b> The Economic Survey gives nominal GSDP as about Rs 2.86 lakh crore, while the Budget speech used about Rs 2.88 lakh crore for 2025-26. State the source and year when you use a figure.</div>','','core')
  +sec('Core: sectors',tbl(['Sector','What to remember'],[
  ['Horticulture and agriculture','Apple (J&amp;K produces most of India’s apples '+V+'), walnut, almond, cherry, saffron (Pampore, Kishtwar), rice, maize, basmati in R S Pura, rajmash at Bhaderwah. Fishing and aquaculture grew 10% in 2025-26.'],
  ['Handicrafts','Pashmina, carpets, papier-mâché, walnut wood; a large informal, home-based sector'],
  ['Tourism','Gulmarg, Pahalgam, Sonamarg, Srinagar, Katra and Amarnath Yatra. About 7% of GSDP and about 5 lakh livelihoods; 36,000 foreign tourists in 2025.'],
  ['Hydropower','Estimated potential about 20,000 MW. Existing: Salal, Baglihar, Uri, Dulhasti, Kishanganga. Pipeline: Pakal Dul, Kiru, Kwar, Ratle, Sawalkote.'],
  ['Industry and mining','New Central Sector Scheme 2021; Industrial policy; limestone, gypsum, cement, SIDCO and SICOP estates; first limestone block e-auction in November 2025.'],
  ['Services and trade','61% of GVA; Ease of Doing Business “Top Achiever” in the survey']]),'','core')
  +sec('Analytical: structural challenges',ul(['<b>Shock-prone growth.</b> The Survey shows a 4.47% real CAGR for 2019-20 to 2024-25 and growth easing from 6.14% to 5.82% in 2025-26.','<b>Tourism concentration.</b> The 2025 arrivals fell after the Pahalgam attack, which shows how fragile a security-linked sector is.','<b>Investment.</b> Official figures claim about Rs 18,000 crore of investment between 2016-17 and 2025-26 compared with about Rs 8,000 crore over the previous seven decades; treat as an official claim.','<b>Trade exposure.</b> CM raised concerns that the Indo-US trade deal could hurt dry fruit and horticulture (Feb 2026).','<b>Power sector.</b> High T&amp;D losses; budget targets 100% smart metering in urban areas by December 2026.','<b>Jobs and reservation.</b> Youth unemployment and the open-merit quota dispute are economic and political at once.']),'','ana')
  +sec('Mind map',mm('J&amp;K’s economy',[['Size',['GSDP Rs 2.86 lakh cr','PCI Rs 1.68 lakh']],['Sectors',['Services 61%','Primary 20%','Secondary 19%']],['Horticulture',['Apple','Saffron','Walnut']],['Tourism',['1.78 crore arrivals','~7% GSDP']],['Power',['20,000 MW potential','Chenab cluster']],['Finance',['Rs 1.14 lakh cr budget','SASCI','Central dependence']]]))
  +curr([['Budget 2026-27 measures','Six free LPG cylinders a year for Antyodaya households, free bus travel for persons with disabilities, DBT fee reimbursement for AAY students, emergency and trauma hospitals at Uri and Poonch, 200 electric buses, daily-wager regularisation.','Implementation and cost'],['Tourism after Pahalgam','Arrivals of 1.78 crore in 2025; tourism-linked services faced a “temporary slowdown” (Survey).','Arrival data for 2026'],['Chenab hydro timelines','Pakal Dul and Kiru targeted for December 2026; Kwar for March 2028 (Feb 2026 report).','Commissioning news'],['Private universities policy','Being finalised (Budget speech).','Policy notification']],'Budget-day announcements change during the year; confirm with the latest notification.')
  +exam(['J&amp;K’s services share is about 61% of GVA.','SASCI offers 50-year interest-free capital loans.','Apple and saffron lead horticulture; Kashmir saffron has a GI tag.'],['Evaluate how security shocks affect a tourism-led economy such as J&amp;K’s.','Assess how the Chenab hydro push links energy security, water diplomacy and regional development.'],['State whether a figure is nominal or real, and the year.','Do not mix UT-only figures with erstwhile-state figures.']);
};

P.environment=function(){
  return facts([['National parks (UT area)','Dachigam, Kishtwar, Salim Ali, Kazinag '+V],['Ramsar sites (UT area)','5',1],['Water bodies identified','1,810 (554 above 1 ha)',1],['State animal','Hangul (Kashmir stag) '+V],['Key flood event','Sept 2014 Jhelum floods'],['Seismic risk','Zones IV and V']])
  +sec('Core: protected areas and wetlands map','<div class="two"><div><div id="maptog2" class="tog"></div>'+mapSVG(['relief','rivers','pa'])+'<div class="leg"><span>'+LEG.pa+'</span><span>'+LEG.ts+'</span></div></div><div>'+tbl(['Site','Remember'],[
  ['Dachigam NP','Near Srinagar; main habitat of Hangul; Srinagar’s water source '+V],
  ['Kishtwar High Altitude NP','Large Himalayan park; snow leopard, musk deer '+V],
  ['Salim Ali NP','Srinagar; small urban park '+V],
  ['Kazinag NP','Baramulla; markhor and Himalayan wildlife '+V],
  ['Sanctuaries','Gulmarg, Overa-Aru, Hirpora, Limber, Lachipora, Trikuta (Katra), Nandini, Surinsar-Mansar and others '+V],
  ['Gulmarg Biosphere Reserve','Alpine and subalpine ecosystem '+V]])+'<p class="cap">Names and areas are standard but should be checked against the latest notification '+V+'.</p></div></div>','','core')
  +sec('Core: Ramsar sites in the UT',tbl(['Site','Year','Where'],[
  ['Wular Lake','1990','Bandipora; largest freshwater lake in India'],
  ['Hokersar Wetland','2005','Near Srinagar; waterfowl and migratory birds'],
  ['Surinsar-Mansar Lakes','2005','Jammu region; sanctuary'],
  ['Hygam Wetland Conservation Reserve','2022','Baramulla'],
  ['Shallabugh Wetland Conservation Reserve','2022','Ganderbal and Srinagar']])+ '<p class="cap">Tso Moriri and Tso Kar are in Ladakh, not in this UT.</p>','','core')
  +sec('Analytical: ecological pressures',tbl(['Pressure','Evidence','Link'],[
  ['Wetland loss','Siltation, encroachment and land-use change are reported in Wular, Hokersar and Anchar, with a National Green Tribunal case in 2024.','Flood risk and bird habitat'],
  ['Dal Lake','Pollution, weeds, encroachment, and houseboat waste; LCMA’s restoration programme.','Tourism and drinking water'],
  ['Glaciers and snow','Himalayan glacier retreat, including the Kolahoi glacier '+V,'Water flows in the Jhelum and Chenab'],
  ['Hazards','2014 floods; Aug 2025 cloudburst at Chasoti, Kishtwar, and landslide near Vaishno Devi '+V+'; avalanches; earthquakes (2005 Kashmir earthquake).','Pilgrimage and highway safety'],
  ['Infrastructure','Tunnels, rail and hydro projects in a young, fragile Himalaya.','Slope stability, forest loss, muck disposal'],
  ['Human-wildlife conflict','Black bear and leopard incidents around Dachigam and Pir Panjal forests '+V,'Compensation and corridor planning']])+ '<p class="cap">Case for balance: hydropower and roads support strategy and incomes, but need slope engineering, EIAs and carrying-capacity limits.</p>','','ana')
  +sec('Analytical: climate and policy levers',ul(['Wetland rejuvenation: restore floodplains of the Jhelum, Wular and Hokersar to reduce flood peaks.','Carrying capacity for Gulmarg, Pahalgam and Sonamarg; regulate trekking and Amarnath Yatra loads.','Wildlife corridors in Pir Panjal and Kishtwar; markhor and snow leopard monitoring.','Disaster risk reduction: early warning for cloudbursts, building codes in Zones IV and V.']),'','ana')
  +sec('Mind map',mm('J&amp;K’s ecology',[['Parks',['Dachigam','Kishtwar','Salim Ali','Kazinag']],['Wetlands',['Wular','Hokersar','Hygam','Shallabugh','Mansar']],['Species',['Hangul','Markhor','Musk deer','Snow leopard (Ladakh)']],['Hazards',['Floods 2014','Cloudburst','Earthquake','Avalanche']],['Pressures',['Siltation','Encroachment','Tourism','Projects']],['Climate',['Glacier retreat','Erratic snowfall']]]))
  +curr([['Wetland inventory','Government says 1,810 water bodies identified and five Ramsar sites designated (Kashmir Life, 2026).','New Ramsar listings'],['Wetland litigation','National Green Tribunal OA 239 of 2024 covers Wular, Manasbal, Haigam, Hokersar, Anchar and Shalbug.','Orders in the case'],['River health','Reports in July 2026 flagged detergent and plastic waste in the Lidder.','Local action plans'],['Disasters','Aug 2025 events '+V+'; check any 2026 monsoon incidents.','NDMA and UT reports']],'Species counts and park areas vary across sources; use the range or the source given in the question.')
  +exam(['J&amp;K has five Ramsar sites; Wular is the oldest (1990).','Hangul is the Kashmir stag; Dachigam is its stronghold.','Hokersar, Hygam, Shallabugh: wetlands near Srinagar.'],['Examine the ecological costs of infrastructure in the Himalaya using J&amp;K’s tunnel and hydro projects.','How did wetland loss amplify the 2014 flood?'],['Do not count Tso Moriri or Tso Kar in J&amp;K’s Ramsar total; they are in Ladakh.','Check whether a question uses the “UT” or the “erstwhile state”.']);
};

P.society=function(){
  return facts([['Population (UT area, 2011)','~1.22 crore '+V],['Literacy (2011)','~68% '+V],['Sex ratio (2011)','~889 (erstwhile state) '+V],['Religion (state, 2011)','Muslim ~68%, Hindu ~28% '+V],['Scheduled Tribes (state, 2011)','~11.9% '+V],['Census cycle','Next census reference date in the UT is 1 Oct 2026 '+V]])+'<div class="note"><b>Census note.</b> Figures are from Census 2011 for the erstwhile state or the UT area, so check which one a question uses '+V+'. The next census has a different reference date for snow-bound areas '+V+'.</div>'
  +sec('Core: communities and regions',tbl(['Group','Where','Remember'],[
  ['Kashmiri Muslims','Kashmir Valley','Majority in the Valley; Sufi and Rishi traditions'],
  ['Dogras and Hindu communities','Jammu region','Majority in Jammu plains; Pandits migrated from the Valley in 1990'],
  ['Gujjar and Bakarwal','Pir Panjal and Chenab belts','Largest tribal group; transhumant pastoralists; ST status since 1991 '+V],
  ['Pahari, Gojri and Gujjar communities','Rajouri, Poonch, parts of Kashmir','Strong identity politics; 2023 Pahari and ST inclusion debate'],
  ['Kashmiri Pandits','Valley and migrant settlements','Return and rehabilitation remain a political subject'],
  ['Displaced persons','PoK, West Pakistan and Kashmiri migrants','Domicile rules, nominated seats and rights claims']]),'','core')
  +sec('Core: human development and social indicators',tbl(['Indicator','What matters','Issue'],[
  ['Literacy','Roughly 68% in 2011; Jammu region higher than the Valley','Regional educational access'],
  ['Health','Low health infrastructure in remote mountain belts and border districts','Accessibility and emergency response'],
  ['Female work participation','Lower than national norms; significant rural labour outside the formal sector','Gender and migration'],
  ['Education and migration','Out-migration of students and youth from border belts; some return after higher education','Brain drain and local jobs'],
  ['Urban-rural divide','Srinagar and Jammu urban centres dominate services; remote villages remain infrastructure-poor','Policy design']]),'','core')
  +sec('Analytical: why social issues are not only cultural',ul(['<b>Reservation politics.</b> The SC’s 2023 direction on scheduling and the Pahari-Gujjar claims show how identity and development are tied to state policy.','<b>Land and jobs.</b> Domicile law, property, and the restrictions on land sales shape social rights and migration.','<b>Return and rehabilitation.</b> Kashmiri Pandit return remains linked to statehood, security and district-level governance.','<b>Border region grievances.</b> Rajouri-Poonch, Samba, Kathua and the Pir Panjal belts often face uneven service delivery and security burdens.','<b>Gender.</b> Women’s mobility, education and labour force participation are affected by social norms and security concerns.']),'','ana')
  +sec('Analytical: Pahari, Gujjar, Bakarwal and reservation',ul(['The 2023 Pahari Community status as Scheduled Tribe and the later legal questions around reservations showed how identity politics and welfare policy interact.','The debate is not just about numbers: it involves land rights, forest rights, livelihoods and school access.','Any answer on social justice in J&amp;K should combine constitutional provisions, social change and the security backdrop.']),'','ana')
  +sec('Mind map',mm('Society &amp; development',[['Regions',['Valley','Jammu','Pir Panjal','Chenab']],['Communities',['Muslims','Hindus','Gujjar-Bakarwal','Pahari','Pandits']],['Indicators',['Literacy','Health','Gender','Migration']],['Issues',['Reservation','Land','Jobs','Return']],['Rights',['Domicile','ST/OBC debates','Nominated seats']]]))
  +curr([['Reservation debate','Cabinet sub-committee report, Pahari inclusion, open merit and ST claims remained live in 2026.','Final notification and Court order'],['Domicile policy','Valley land and jobs rule continues to be a political flashpoint, not just a legal issue.','State repot or court challenge'],['Migration and youth','Migration of youth for education and jobs in secondary cities remains a long-running issue.','District-level data']],'Do not overstate social numbers without stating whether they are from the 2011 Census or a later official survey.')
  +exam(['Census 2011 for J&amp;K state indicated Muslims about 68% and Hindus about 28%.','J&amp;K has a strong tribal presence in the Pir Panjal and Chenab belts.','The next Census reference date in snow-bound areas is after 1 October 2026, not a fixed day in all districts.'],['How do identity, land rights and security interact in J&amp;K politics?','Discuss the human-development challenges in border districts and mountain belts.'],['Do not assume the 2011 data are current. State the source and year first.']);
};

P.infrastructure=function(){
  return facts([['Strategic tunnels','Zojila, Z-Morh, Chenani-Nashri, Banihal tunnels'],['Rail bridge','Chenab Bridge, 359 m above riverbed'],['Yatra routes','Amarnath, Vaishno Devi, Pahalgam'],['Connectivity','Expressways, rail, ropeways, tunnels'],['Airports','Jammu and Srinagar international airports']])
  +sec('Core: all-weather connectivity',tbl(['Project','What it does','Why it matters'],[
  ['Zojila tunnel','Highest tunnel in J&amp;K at around 14 km + ; all-weather Srinagar–Leh route','Strategic and economic; removes snow blockages'],
  ['Z-Morh tunnel','Sonamarg tunnel on NH-1','Keeps the Srinagar–Leh route open in winter'],
  ['Chenani-Nashri tunnel','A 9.2 km tunnel reducing the NH-44 route through an accident-prone stretch','Connects Jammu and Srinagar more safely'],
  ['Banihal tunnels and highway upgrades','Jawahar Tunnel and rail tunnels through Pir Panjal','Critical to Jammu–Srinagar movement'],
  ['Chenab Bridge','World’s highest railway arch bridge; 1,315 m long','Links Udhampur–Srinagar-Baramulla rail corridor'],
  ['USBRL and RAIL corridor','Udhampur-Srinagar-Baramulla Line (USBRL) via tunnels and viaducts','Long-term mobility and tourism impact']]),'','core')
  +sec('Core: highways and roads',tbl(['Route','Fact','Strategic significance'],[
  ['NH-44','The backbone connecting Jammu, Udhampur, Banihal, Srinagar and beyond','The route most often disrupted by weather and landslides'],
  ['Mughal Road','Connects Shopian, Pulwama and Rajouri-Poonch via Pir Panjal','Alternative route as a resilience measure'],
  ['SR-1 / Mughal Road / Jawahar tunnel','Several passes and road sections experience seasonal closure','Road resiliency and defense movement'],
  ['Ropeways and road projects','Katra ropeway to Vaishno Devi, Gulmarg cable car, etc.','Tourism and local mobility']]),'','core')
  +sec('Analytical: why roads are not “just roads”',ul(['<b>Security.</b> Every tunnel and highway is a military route first, then a civilian route.','<b>Tourism.</b> All-weather roads keep Kashmir open for winter tourism and pilgrimage.','<b>Regional balance.</b> The Jammu region has much better road and rail access than remote mountain belts, so the project list still matters politically.','<b>Climate and hazard engineering.</b> Snow, avalanches, and landslides make mountain engineering a core state capacity issue.']),'','ana')
  +sec('Mind map',mm('Connectivity &amp; roads',[['Rail',['USBRL','Chenab Bridge','Vande Bharat']],['Tunnels',['Zojila','Z-Morh','Chenani-Nashri','Banihal']],['Highways',['NH-44','Mughal Road']],['Airports',['Jammu','Srinagar']],['Tourism routes',['Vaishno Devi','Amarnath','Gulmarg']]]))
  +curr([['Zojila breakthough','Main breakthrough: 9 June 2026. Completion targeted by February 2028.','Project office update'],['Chenab bridge opening','Opened 6 June 2025 and inaugurated in the rail project timeline.','Service schedules'],['Vande Bharat expansion','Srinagar–Katra Vande Bharat service started in 2025; winter operations remain subject to weather.','Rail operations']],'Construction schedules shift with winter and snowfall. Use an official date, not last month’s media report.')
  +exam(['The Chenab Bridge is 359 m above the riverbed and is the world’s highest railway arch bridge.','USBRL is the Udhampur-Srinagar-Baramulla Rail Link.','Zojila is a crucial all-weather route to Ladakh.'],['Assess the strategic and economic importance of all-weather connectivity for J&amp;K and Ladakh.','How do tunnels and bridges change the region’s security and tourism profile?'],['Do not treat a “project route” as if it is a completed corridor.','Check the route name: Zojila is not simply “Zojila pass”; the tunnel and road are separate.']);
};

P.schemes=function(){
  return facts([['Budget 2026-27','Rs 1,13,767 crore'],['SASCI','Specialised capital infrastructure loans'],['Free schemes','LPG, bus travel, educational support'],['Public delivery','PDS, pension, public service'],['Domicile rules','2020 domicile law']])
  +sec('Core: welfare and governance schemes',tbl(['Scheme or policy','What it is','Why it matters'],[
  ['Domicile rules','2020 J&amp;K domicile law; residence-based access to government jobs and land rights','Core political and legal issue'],
  ['Free LPG and transport','Free cylinders under the budget and free bus travel for persons with disabilities','Household relief'],
  ['Rural delivery schemes','PDS, pensions, AAY support, local service camps and decentralised planning','Citizen access'],
  ['Industrial schemes','OEM policy, industrial parks, seed capital for startup and manufacturing','Jobs and diversification'],
  ['Hydro and infrastructure schemes','SASCI, rail and tunnel funds, PMAY and roads programmes','Capital formation']]),'','core')
  +sec('Analytical: the policy debate',ul(['<b>Land and job rights.</b> Domicile law is a core political issue because it decides who can own land and work in government jobs.','<b>Centre-state tension.</b> The LG’s powers, list of reserved subjects and business rules create friction with the elected government.','<b>Equity and inclusion.</b> Reservation, local employment, Pahari claims and open-merit debates are all linked to welfare delivery.','<b>Implementation gap.</b> Big schemes exist, but capacity, delivery and coordination matter as much as budget size.']),'','ana')
  +sec('Mind map',mm('Schemes &amp; delivery',[['Welfare',['Free LPG','Bus travel','Disability support']],['Jobs',['Domicile law','Recruitment rules','Reservation']],['Capital',['SASCI','roads','hydro']],['Local delivery',['PDS','pensions','AAY support']],['Politics',['LG vs CM','Business rules','statehood']]]))
  +curr([['Reservation and recruitment','Cabinet and MHA discussions lined up in 2026; the policy remains contested.','Final notification'],['Free bus scheme','High uptake reported, but district-level implementation differs.','Transport department data'],['Budget delivery','Execution issues for capital works and local services remain highlighted in audits.','Audit report']],'Policy changes happen faster than law books. Always cite the latest order in the answer.')
  +exam(['J&amp;K domicile rules derived from 2020 law are central to land and jobs.','SASCI offers 50-year interest-free capital loans.','The PMAY and public service delivery model matter in rural J&amp;K.'],['How do statehood, domicile rights, and welfare delivery interact in J&amp;K?','Critically assess the balance between welfare spending and administrative capacity in a UT with a legislature.'],['Do not treat policy as static; statehood, reservation and domicile remain moving targets.']);
};

P.scitech=function(){
  return facts([['Research hubs','IIIM Jammu, SKUAST-K, IIT Jammu, AIIMS Jammu, IIM Jammu, NIT Srinagar'],['GI products','Kashmir saffron, Kani shawl, Pashmina, Basohli painting, walnuts'],['Bridge engineering','Chenab Bridge, Zojila, USBRL'],['Science missions','Aroma Mission, saffron mission, horticulture mission']])
  +sec('Core: institutions',tbl(['Institution','What it does'],[
  ['CSIR-IIIM Jammu','Industrial and medicinal research; aroma, saffron and food processing'],
  ['SKUAST-K','Agriculture, horticulture, veterinary science, extension'],
  ['IIT Jammu','Engineering and research, especially in climate and infrastructure'],
  ['AIIMS Jammu','Medical education and health system leverage'],
  ['IIM Jammu','Management and public policy'],
  ['NIT Srinagar','Engineering and technical human resources']]),'','core')
  +sec('Core: innovation and GI',tbl(['Theme','Remember'],[
  ['Kashmir saffron','GI tag; Pampore and Kishtwar belts'],
  ['Kani shawl','Handloom GI: warp and weft wool craft'],
  ['Pashmina','GI status and artisan cluster'],
  ['Walnut wood and papier-mâché','Craft and design clusters in Srinagar'],
  ['Aroma mission','Medicinal and aromatic plants and value addition']]),'','core')
  +sec('Analytical: why science matters here',ul(['<b>Horticulture.</b> Agriculture and fruit processing need cold-chain, post-harvest technology and value addition.','<b>Hydropower.</b> Chenab hydropower and tunnel engineering need climate-resilient design.','<b>Tourism and crafts.</b> GI products and design-tech link the economy to culture.','<b>Healthcare.</b> Remote high-altitude setups need medical and telemedicine capacity.']),'','ana')
  +sec('Mind map',mm('Science &amp; research',[['Institutions',['IIIM','SKUAST','IIT','IIM','NIT','AIIMS']],['GI products',['Saffron','Pashmina','Kani shawl','Walnut']],['Agriculture',['Aroma mission','cold-chain','horticulture']],['Engineering',['Chenab bridge','Zojila','USBRL']]]))
  +curr([['Aroma Mission and saffron mission','Continued in 2026 with district-level outreach and product e-commerce.','New annual report'],['AIIMS and health infra','Capacity build-up continues in Jammu.','Fresh admissions and budgets'],['Research and design enterprises','Craft clusters and startup plans remain under government support.','Policy dashboards']],'Science is not the headline issue in J&amp;K’s politics, but it is central to jobs and diversification.')
  +exam(['CSIR-IIIM is central to saffron and aroma work.','Kashmir saffron, Kani shawl and Pashmina are GI-tagged products.','AIIMS, IIT, IIM and NIT are all in the UT region.'],['How can scientific and industrial policy make J&amp;K less dependent on tourism and security cycles?','Why are GI products and agro-processing so important for the Valley and Jammu region?'],['Do not say “IIT Kashmir” unless you are using the exact institutional name.']);
};

P.current=function(){
  return sec('Current pattern for J&amp;K',tbl(['Issue','Recent development','What to watch'],[
  ['Statehood','Statehood resolution passed on 28 Sept 2026; Lok Bhavan and cabinet expansions continue','Centre and Supreme Court response'],
  ['Security','Pahalgam attack after-effects, infiltration reports, narco-terror and drone trends','MHA and Army briefings'],
  ['Economy','Budget 2026-27 and tourism data after the Pahalgam shock','Tourism arrivals and budget execution'],
  ['Infrastructure','Zojila breakthrough, Chenab bridge inauguration and Vande Bharat','Actual commissioning dates'],
  ['Environment','Wetland and disaster case updates','NGT and district disaster reports']]),'','core')
  +curr([['Statehood resolution','Passed on 28 Sept 2026, BJP walked out.','Parliament or Cabinet decision'],['Cabinet expansion','4 NC MLAs sworn in on 27 Oct 2026, raising the total to 9.','Portfolios and new appointments'],['Security','Recent encounters in Pir Panjal and Chenab belts; drone and narco-terror concerns.','Army/CRPF and MHA briefings'],['Tourism','Arrivals remain sensitive to the security environment; 2025 figures show recovery but with uneven district performance.','State tourism board figures'],['Wetland and glacier actions','Wetland protection and disaster mitigation remain live.','NGT and district action plans']],'The Current layer is the most volatile. Re-read the latest official statement before writing any answer on it.')
  +exam(['Statehood resolution passed on 28 Sept 2026.','Cabinet expansion: 27 Oct 2026.','The Pahalgam attack was on 22 April 2025.','IWT was put in abeyance in April 2025.'],['What is the political significance of the 2026 statehood resolution for J&amp;K?','How do security shocks change public confidence in tourism and infrastructure investments?'],['Do not cite old news as current. Re-check the date.']);
};

P.upsc=function(){
  return sec('Constitutional map',tbl(['Provision','Relevance to J&amp;K'],[
  ['Article 1 and 3','Parliament can form UTs and alter states; used for the 2019 Act'],
  ['Article 370 and 35A','Special status until 5 Aug 2019; the SC treated Article 370 as a temporary provision'],
  ['Article 367','Interpretation clause used for the 2019 Presidential Order'],
  ['Article 239AA and 239A','Delhi and Puducherry; the closest models to J&amp;K’s UT status'],
  ['Eighth Schedule','Kashmiri (1950) and Dogri (92nd Amendment, 2003)'],
  ['Article 311(2)(c)','Used in 2025 to dismiss employees on security grounds '+V],
  ['Tenth Schedule','Applies to the J&amp;K Assembly like other legislatures'],
  ['Article 262','Inter-state river disputes; the Indus treaty is an international agreement, not Article 262']]),'','core')
  +sec('Compare: UTs with legislatures',tbl(['','Delhi','Puducherry','J&amp;K'],[
  ['Authority','239AA','239A','Reorganisation Act 2019'],['Elected seats','70','30','90'],['Nominated','0','3','Up to 5'],['Police and public order','Centre','UT','LG']])+ '<p class="cap">Check Puducherry’s nominated members and ministers limit '+V+'.</p>','','ana')
  +sec('Map-based practice',ul(['Rivers: Jhelum, Chenab, Tawi, Ravi, Kishanganga, Lidder.','Lakes: Wular, Dal, Manasbal, Anchar, Mansar.','Parks and wetlands: Dachigam, Kishtwar, Salim Ali, Kazinag, Hokersar, Hygam, Shallabugh, Surinsar-Mansar.','Passes and tunnels: Banihal, Pir Panjal, Razdan, Zojila, Z-Morh, Chenani-Nashri.','Places: Srinagar, Jammu, Katra, Pahalgam, Gulmarg, Sonamarg, Amarnath, Uri, Poonch, Kargil (Ladakh).']),'','core')
  +sec('Practice MCQs (original, exam-style)',MCQ.map(function(q,i){return '<div class="q" data-a="'+q[2]+'"><p class="qt">Q'+(i+1)+'. '+q[0]+'</p>'+q[1].map(function(o,j){return '<button class="o" data-o="'+j+'">'+String.fromCharCode(65+j)+'. '+o+'</button>'}).join('')+'<div class="ex2"><b>Answer: '+String.fromCharCode(65+q[2])+'.</b> '+q[3]+'</div></div>'}).join('')+'<p class="cap">These are original practice questions. I did not copy past UPSC papers; add the real PYQs from the UPSC archive next to each topic.</p>','','core')
  +sec('Mains answer skeletons',MAINS.map(function(m){return '<div class="q done" style="background:var(--mai-soft)"><p class="qt">'+m[0]+'</p>'+ul(m[1])+'</div>'}).join(''),'','ana')
  +sec('Rapid-fire fact sheet',ul(['Accession: 26 Oct 1947. Treaty of Amritsar: 1846.','Article 370 abrogated: 5 Aug 2019. UT created: 31 Oct 2019. SC verdict: 11 Dec 2023.','Assembly: 90 seats (43 Jammu, 47 Kashmir) + up to 5 nominated; max 9 ministers.','Wular: largest freshwater lake; 5 Ramsar sites in the UT.','Chenab Bridge 359 m high, 1,315 m long; Vande Bharat to Srinagar since June 2025.','Indus treaty: Ravi, Beas, Sutlej to India; in abeyance since April 2025.','Statehood resolution passed on 28 Sept 2026; cabinet expanded on 27 Oct 2026.']),'','core');
};

/* ---------- revision deck ---------- */
var CARDS=[
['history','When was the Instrument of Accession signed?','26 October 1947, by Maharaja Hari Singh.'],
['history','What was the Treaty of Amritsar (1846)?','Gulab Singh bought Kashmir from the British for Rs 75 lakh and founded the Dogra dynasty.'],
['history','What did the Simla Agreement (1972) do?','Turned the ceasefire line into the Line of Control and made India-Pakistan issues bilateral.'],
['history','Who wrote Rajatarangini?','Kalhana, in the 12th century.'],
['governance','When was Article 370 abrogated?','5 August 2019; the Reorganisation Act took effect on 31 October 2019.'],
['governance','What did the Supreme Court decide on 11 Dec 2023?','Upheld the abrogation; Article 370 was temporary; statehood to be restored “as soon as possible”.'],
['governance','How many seats are in the J&K Assembly?','90 elected (43 Jammu, 47 Kashmir) + up to 5 nominated.'],
['governance','How many ministers can J&K have?','Nine, including the Chief Minister (10% of 90).'],
['governance','Who controls police and public order in J&K?','The Lieutenant Governor, under the UT framework.'],
['governance','What happened in the Assembly on 28 Sept 2026?','It passed a resolution seeking full statehood by voice vote; BJP walked out.'],
['governance','What changed on 27 Oct 2026?','Four NC MLAs were inducted, taking the Council of Ministers to nine; Congress stayed out.'],
['physical','Highest peak in the UT area?','Kolahoi (Gwashbrari), 5,425 m.'],
['physical','Where does the Jhelum rise?','At Verinag spring, Anantnag.'],
['physical','Which is the largest freshwater lake in India?','Wular Lake (Ramsar site, 1990).'],
['physical','How is the Chenab formed?','By Chandra and Bhaga at Tandi in Himachal Pradesh.'],
['environment','How many Ramsar sites are in J&K UT?','Five: Wular, Hokersar, Surinsar-Mansar, Hygam and Shallabugh.'],
['environment','Which park shelters the Hangul?','Dachigam National Park.'],
['geopolitics','What does the Indus Waters Treaty allocate?','India: Ravi, Beas, Sutlej. Pakistan: Indus, Jhelum, Chenab (limited Indian rights).'],
['geopolitics','What happened on 22 April 2025?','The Pahalgam terror attack; India put the Indus treaty in abeyance next day.'],
['geopolitics','Which seats are reserved for PoK?','24 of the notional 114 Assembly seats, kept vacant.'],
['infrastructure','Chenab Bridge facts?','Highest railway arch bridge; 359 m above riverbed; 1,315 m long; opened 6 June 2025.'],
['infrastructure','What is special about Anji Khad?','India’s first cable-stayed rail bridge.'],
['infrastructure','Zojila tunnel status?','Main breakthrough on 9 June 2026; completion expected by February 2028.'],
['infrastructure','Z-Morh tunnel?','6.5 km Sonamarg tunnel; opened 13 January 2025.'],
['economy','J&K’s per capita income in 2025-26?','Rs 1,68,243 (Survey advance), below India’s Rs 2,19,575.'],
['economy','Sector mix of GVA?','Services 61%, primary 20%, secondary 19% (2025-26).'],
['economy','Budget 2026-27 size?','Rs 1,13,767 crore; free LPG for AAY households and free bus for persons with disabilities.'],
['society','Which group got ST status in 2023-24 laws?','Pahari ethnic group and others, via the ST Order Amendment Act.'],
['schemes','What did the High Court do to the Roshni Act?','Struck it down in October 2020.'],
['scitech','Which institute drives the Aroma Mission?','CSIR-IIIM, Jammu.']
];
function foot(){
  return '<footer class="foot"><p><b>About the numbers.</b> A green <i class="live" style="position:static">2026</i> tag marks figures checked against 2026 sources on 13 November 2026. An amber <i class="vf">verify</i> tag marks textbook-level facts to confirm. Each section carries a Core, Analytical or Current badge. Check the J&amp;K Economic Survey, Census and NCERT before the exam.</p><p style="margin:10px 0 0"><b>Sources</b></p><ul>'
  +[['J&K Economic Survey 2025-26','https://jkplanning.gov.in/pdf/Economic%20Survey%202025-26.pdf'],['PRS: J&K Budget Analysis 2026-27','https://prsindia.org/files/budget/budget_state/jammu-and-kashmir/2026/Budget_Analysis_2026-27-J&K.pdf'],['Greater Kashmir: Budget 2026-27','https://m.greaterkashmir.com/article/cm-omar-presents-people-centric-jk-budget-of-rs-113767-crore/476780'],['Greater Kashmir: farm-led growth cushions economy','https://m.greaterkashmir.com/article/farm-led-growth-cushions-jk-economy-amid-tourism-slowdown/481248'],['Kashmir Life: tourism share of GSDP','https://kashmirlife.net/tourism-accounts-for-nearly-7-per-cent-of-jammu-kashmirs-economy-economic-survey-423898/'],['ThePrint: Assembly passes statehood resolution','https://theprint.in/india/j-k-assembly-passes-statehood-resolution-amid-protests-by-bjp/3055514/'],['ThePrint: Cabinet expansion, 27 Oct 2026','https://theprint.in/india/omar-expands-cabinet-with-4-new-ministers-triggers-internal-discontent-and-bjp-criticism/3082861/'],['The Week: SC on statehood, 10 Oct 2025','https://www.theweek.in/news/india/2025/10/10/supreme-court-gives-centre-four-weeks-to-respond-to-pleas-on-restoration-of-jandk-statehood.html'],['NewKerala: reservation policy, June 2026','https://www.newkerala.com/news/a/jk-cabinet-discusses-critical-administrative-issues-including-reservation-666.htm'],['NewKerala: USBRL and Vande Bharat','https://www.newkerala.com/news/a/jammu-kashmirs-challenging-terrain-yielding-new-era-connectivity-548.htm'],['All India Radio: Zojila breakthrough','https://newsonair.gov.in/zoji-la-tunnel-achieves-final-breakthrough-bringing-all-weather-kashmir-ladakh-connectivity-closer/'],['Swarajya: Zojila completion date','https://swarajyamag.com/news-brief/zojila-tunnel-likely-to-be-completed-by-february-2028-centre-says-64-per-cent-work-on-strategic-project-done-rs-3934-crore-spent-so-far'],['Daily Excelsior: Chenab projects cleared','https://www.dailyexcelsior.com/?p=2219605'],['Alpha Defense: Sawalkote and IWT','https://alphadefense.in/2026/02/08/sawalkote-hydroelectric-project-chenab-indus-waters-treaty/'],['Kashmir Life: 1,810 water bodies, five Ramsar sites','https://kashmirlife.net/jammu-kashmir-has-1810-water-bodies-five-ramsar-sites-conservation-push-intensifies-430145/']].map(function(s){return '<li><a href="'+s[1].replace(/&/g,'&amp;')+'" target="_blank" rel="noopener">'+s[0].replace(/&/g,'&amp;')+'</a></li>'}).join('')+'</ul></footer>';
}


const dossier = { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG, LVL };

export { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG, LVL };
export default dossier;