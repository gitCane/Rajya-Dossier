const V='<i class="vf" title="Recalled from standard sources. Confirm before relying on it.">verify</i>';

var DIMS=[
['physical','Physical Geography','Thar, Aravalli, Chambal','Location, boundaries, area, physiographic divisions, the Thar desert, Aravalli range, eastern plains, Hadoti plateau, rivers, lakes, climate, soils, vegetation, biodiversity and natural resources.'],
['history','History & Culture','Rajputana to 1956','Ancient sites, Rajput kingdoms, Mughal and colonial era, peasant and tribal movements, integration of Rajasthan, forts, painting schools, festivals, folk arts, languages and personalities.'],
['geopolitics','Geopolitics & Strategic Importance','Pakistan border, Pokhran','International border, border districts, Pokhran, air bases, firing ranges, water treaties and canals, inter-state disputes and security concerns.'],
['governance','Governance & Administration','200-seat assembly','Formation of state, constitutional provisions, Governor, Chief Minister, Legislature, High Court, administrative divisions, Panchayati Raj, municipalities, governance innovations and important state institutions.'],
['economy','Economy','GSDP, minerals, solar','GSDP, per capita income, agriculture, industries, services, minerals, energy, tourism, infrastructure, employment, investment, state finances and economic challenges.'],
['environment','Environment & Ecology','Aravalli and desert','National parks, wildlife sanctuaries, tiger reserves, Ramsar sites, endemic species, ecological hotspots, environmental movements, conservation projects and climate vulnerabilities.'],
['society','Society & Human Development','Census and indicators','Population, demographics, tribes, caste composition where relevant, literacy, health, education, migration, urbanisation, gender issues, social movements and human development.'],
['infrastructure','Infrastructure & Connectivity','Canals, expressways, rail','Highways, railways, airports, canals, dams, industrial corridors, logistics, power projects, irrigation and water-transfer projects.'],
['schemes','Government Schemes & Policies','Welfare and policy','State-specific flagship schemes, central schemes implemented in the state, policy innovations, welfare programmes and implementation challenges.'],
['scitech','Science, Technology & Research','Institutes and GI tags','Research institutions, nuclear and defence facilities, agricultural research, solar and energy hubs, GI products, scientific heritage and innovation clusters.'],
['current','Current Affairs & Emerging Issues','Live issues, Nov 2026','Important state-related developments, Supreme Court cases, environmental clearances, projects, political developments relevant to governance, reports, committees and national news.'],
['upsc','UPSC Examination Integration','Articles, MCQs, Mains','Probable Prelims MCQs, Mains dimensions, map-based questions, inter-state comparisons, relevant constitutional articles and important facts.']
];
var HUBS=['Physical','History & Culture','Geopolitics','Governance','Economy','Environment','Society','Infrastructure','Schemes','Sci & Tech','Current Affairs','UPSC Hub'];
var HUBSUB=['3.42 lakh sq km','Rajputana to 1956','Pakistan border','200-seat assembly','Rs 2.02 lakh per capita','Aravalli, Thar, tigers','6.85 crore (2011)','Canals, DME, rail','MAA, Lado Protsahan','Pokhran, CAZRI','Aravalli, ERCP, polls','Vishaka, Art. 164'];
var ORDER=['rajasthan'].concat(DIMS.map(function(d){return 'rajasthan-'+d[0]})).concat(['rajasthan-revision']);
var REGIONS=[
['West & Central',['Goa','Gujarat','Maharashtra','Madhya Pradesh','Chhattisgarh','Rajasthan','Dadra and Nagar Haveli and Daman and Diu']],
['South',['Karnataka','Kerala','Tamil Nadu','Andhra Pradesh','Telangana','Puducherry']],
['North',['Uttar Pradesh','Uttarakhand','Himachal Pradesh','Punjab','Haryana','Chandigarh','Delhi','Jammu and Kashmir','Ladakh']],
['East',['Bihar','Jharkhand','Odisha','West Bengal']],
['North-East',['Assam','Arunachal Pradesh','Manipur','Meghalaya','Mizoram','Nagaland','Sikkim','Tripura']],
['Islands',['Andaman and Nicobar Islands','Lakshadweep']]
];

/* ---------- helpers ---------- */
function facts(a){return '<div class="facts">'+a.map(function(f){return '<div class="fact"><span class="k">'+f[0]+'</span><span class="v">'+f[1]+'</span>'+(f[2]?'<i class="live" title="Checked against 2026 sources">2026</i>':'')+'</div>'}).join('')+'</div>'}
function sec(t,b,c){return '<section class="blk '+(c||'')+'"><h2>'+t+'</h2>'+b+'</section>'}
function ul(a){return '<ul class="ul">'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function tbl(h,r){return '<div class="tw"><table><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>'}).join('')+'</tr></thead><tbody>'+r.map(function(row){return '<tr>'+row.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
function exam(p,m,t){return '<div class="exam"><div class="ex pre"><h4>Prelims hooks</h4>'+ul(p)+'</div><div class="ex mai"><h4>Mains angles</h4>'+ul(m)+'</div>'+(t?'<div class="ex trap"><h4>Common traps</h4>'+ul(t)+'</div>':'')+'</div>'}
function mm(c,b){return '<div class="mm"><div class="mm-root">'+c+'</div><div class="mm-grid">'+b.map(function(x){return '<div class="mm-b"><h4>'+x[0]+'</h4><p>'+x[1].join(' · ')+'</p></div>'}).join('')+'</div></div>'}
function flow(s){return '<ol class="flow">'+s.map(function(x){return '<li><b>'+x[0]+'</b><span>'+x[1]+'</span></li>'}).join('')+'</ol>'}
function tl(s){return '<ul class="tl">'+s.map(function(x){return '<li><time>'+x[0]+'</time><div><h4>'+x[1]+'</h4><p>'+x[2]+'</p></div></li>'}).join('')+'</ul>'}
function hb(items,max,cls){return '<div class="hb">'+items.map(function(i){return '<div class="r"><span>'+i[0]+'</span><div class="t"><div class="f '+(i[3]||cls||'')+'" style="width:'+Math.round(i[1]/max*100)+'%"></div></div><span class="val">'+i[2]+'</span></div>'}).join('')+'</div>'}
function vb(items,max){return '<div class="vb">'+items.map(function(i){return '<div class="c"><span class="v">'+i[1]+'</span><div class="b '+(i[3]||'')+'" style="height:'+Math.round(i[2]/max*150)+'px"></div></div>'}).join('')+'</div><div class="vl">'+items.map(function(i){return '<span>'+i[0]+'</span>'}).join('')+'</div>'}

/* ---------- schematic map of Rajasthan ---------- */
/* Outline is simplified and approximate. Revision aid only, not a survey map. */
var BORDER=[[73.9,30.15],[74.45,29.85],[74.95,29.45],[75.35,28.95],[75.9,28.45],[76.55,28.2],[76.85,27.85],[77.35,27.55],[77.9,27.2],[78.25,26.75],[77.95,26.3],[77.4,26.1],[77.05,25.6],[76.95,25.1],[76.5,24.75],[76.25,24.2],[75.6,24.35],[75.1,24.1],[74.75,23.55],[74.3,23.05],[73.7,23.4],[73.5,23.95],[73.0,24.35],[72.7,24.55],[72.1,24.6],[71.4,24.55],[70.9,24.6],[70.2,24.9],[70.05,25.4],[70.3,26.0],[70.1,26.8],[69.5,27.2],[70.1,27.8],[70.7,28.05],[71.3,28.25],[71.95,28.4],[72.6,28.9],[73.2,29.3],[73.65,29.9]];
var ARAV=[[72.7,24.6],[73.0,24.9],[73.4,25.3],[73.85,25.75],[74.4,26.2],[74.85,26.5],[75.3,27.0],[75.75,27.6],[76.2,28.0],[76.8,28.3]];
var RIV={
chambal:[[75.25,24.9],[75.85,25.2],[76.5,25.6],[77.1,26.1],[77.6,26.5],[78.2,26.7]],
banas:[[73.5,25.3],[74.2,25.6],[75.1,25.8],[76.0,26.0],[76.5,26.05]],
luni:[[74.6,26.4],[74.0,26.0],[73.3,25.7],[72.7,25.5],[72.3,25.1],[71.7,24.8],[71.0,24.65]],
mahi:[[74.95,23.75],[74.45,23.5],[74.0,23.4]],
ghaggar:[[74.9,29.7],[74.3,29.58],[73.7,29.3]],
igc:[[74.4,29.6],[73.5,29.2],[72.9,28.6],[72.4,28.0],[72.0,27.4],[71.5,27.0]]
};
function px(p){return [((p[0]-69.3)*46).toFixed(1),((30.4-p[1])*46).toFixed(1)]}
function pts(a){return a.map(function(p){return px(p).join(',')}).join(' ')}
function circ(lon,lat,r,cls,title){var q=px([lon,lat]);return '<circle class="'+cls+'" cx="'+q[0]+'" cy="'+q[1]+'" r="'+r+'"><title>'+title+'</title></circle>'}
function lbl(lon,lat,t,cls,dx,dy,anchor){var q=px([lon,lat]);return '<text class="m-lbl '+(cls||'')+'" x="'+(+q[0]+(dx||0))+'" y="'+(+q[1]+(dy||0))+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+t+'</text>'}
function mapSVG(L){
  var has=function(k){return L.indexOf(k)>-1};
  var s='<svg viewBox="0 0 420 360" role="img" aria-label="Schematic map of Rajasthan">';
  s+='<rect class="m-sea" x="0" y="0" width="420" height="360" rx="10" style="fill:none;stroke:currentColor;stroke-opacity:.18"/>';
  s+='<polygon class="m-land" fill="var(--rl)" points="'+pts(BORDER)+'"/>';
  if(has('relief')){
    s+='<polyline points="'+pts(ARAV)+'" fill="none" stroke="var(--rh)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>';
    s+=lbl(72.78,24.65,'▲ Guru Shikhar 1,722 m','',8,16)+lbl(75.5,27.3,'ARAVALLI','nb',12,0)+lbl(71.0,27.1,'THAR DESERT','nb',0,0,'middle')+lbl(76.7,25.2,'HADOTI PLATEAU','nb',0,0,'middle')+lbl(76.8,26.55,'EASTERN PLAINS','nb',0,-24,'middle');
  }
  if(has('rivers')){
    s+=['chambal','banas','luni','mahi','ghaggar'].map(function(k){return '<polyline class="m-riv'+(k==='ghaggar'?' minor':'')+'" points="'+pts(RIV[k])+'"/>'}).join('');
    s+='<polyline class="m-riv minor" style="stroke-dasharray:4 3" points="'+pts(RIV.igc)+'"/>';
    s+=lbl(76.6,25.6,'Chambal','riv',8,-2)+lbl(75.2,25.9,'Banas','riv',0,-4)+lbl(72.4,25.25,'Luni','riv',-6,-2,'end')+lbl(74.45,23.5,'Mahi','riv',0,12)+lbl(72.2,27.9,'Indira Gandhi Canal','riv',-6,-4,'end')+lbl(74.0,29.55,'Ghaggar','riv',0,10);
  }
  if(has('cities')){
    [['Jaipur',75.79,26.91,6,-4],['Jodhpur',73.02,26.24,6,4],['Udaipur',73.71,24.58,6,4],['Kota',75.86,25.18,6,4],['Bikaner',73.31,28.02,6,4],['Ajmer',74.64,26.45,-6,-5,'end'],['Jaisalmer',70.91,26.92,6,4],['Alwar',76.61,27.55,6,-2],['Bharatpur',77.49,27.22,-4,-8,'end'],['Barmer',71.4,25.75,6,4],['Sri Ganganagar',73.88,29.91,6,4]].forEach(function(c){s+=circ(c[1],c[2],3,'m-dot',c[0])+lbl(c[1],c[2],c[0],'',c[3],c[4],c[5])});
  }
  if(has('pa')){
    s+=circ(76.45,26.02,9,'m-tig','Ranthambore Tiger Reserve');
    s+=circ(76.4,27.35,9,'m-tig','Sariska Tiger Reserve');
    s+=circ(76.0,24.9,7,'m-tig','Mukundra Hills Tiger Reserve');
    s+=circ(75.6,25.4,6,'m-tig','Ramgarh Vishdhari Tiger Reserve');
    s+=circ(77.35,26.65,6,'m-tig','Dholpur-Karauli Tiger Reserve');
    s+=circ(70.4,26.9,18,'m-pa','Desert National Park (Great Indian Bustard)');
    s+=circ(77.52,27.17,4,'m-ts','Keoladeo, Ramsar site and World Heritage Site');
    s+=circ(75.2,26.95,5,'m-ts','Sambhar Lake, Ramsar site');
    s+=circ(72.75,24.65,5,'m-pa','Mount Abu Wildlife Sanctuary');
    s+=circ(73.55,25.15,5,'m-pa','Kumbhalgarh Wildlife Sanctuary');
    s+=circ(74.4,27.8,3,'m-pa','Tal Chhapar, blackbuck');
    s+=lbl(76.45,26.02,'Ranthambore','',0,18,'middle')+lbl(76.4,27.35,'Sariska','',-10,-8,'end')+lbl(76.0,24.9,'Mukundra','',-9,3,'end')+lbl(75.6,25.4,'Ramgarh V.','',-8,-5,'end')+lbl(77.35,26.65,'Dholpur-Karauli','',9,4)+lbl(70.4,26.9,'Desert NP','',0,4,'middle')+lbl(77.52,27.17,'Keoladeo','',9,-6)+lbl(75.2,26.95,'Sambhar','',-7,-6,'end')+lbl(72.75,24.65,'Mt Abu','',-7,16,'end')+lbl(73.55,25.15,'Kumbhalgarh','',-8,0,'end');
  }
  if(has('infra')){
    s+='<polyline class="m-hwy" points="'+pts([[76.6,27.5],[76.34,26.89],[76.4,26.0],[75.95,25.2],[76.2,24.5]])+'"/>';
    s+='<polyline class="m-rail" points="'+pts([[76.6,27.55],[75.79,26.91],[74.64,26.45],[73.5,25.5],[72.8,24.5]])+'"/>';
    s+=circ(75.81,26.82,5,'m-inf','Jaipur airport')+circ(72.35,27.5,5,'m-inf','Bhadla Solar Park')+circ(72.2,25.9,5,'m-inf','HPCL Rajasthan Refinery, Pachpadra')+circ(75.9,25.2,4,'m-inf','Kota, Chambal barrages')+circ(76.34,26.89,4,'m-inf','Dausa, Delhi-Mumbai Expressway')+circ(74.55,24.9,4,'m-inf','Rawatbhata, RAPS nuclear station');
    s+=lbl(75.81,26.82,'Jaipur airport','',8,14)+lbl(72.35,27.5,'Bhadla solar','',-8,-4,'end')+lbl(72.2,25.9,'Pachpadra refinery','',-8,4,'end')+lbl(75.9,25.2,'Kota','',-8,12,'end')+lbl(76.34,26.89,'DME','',8,4)+lbl(74.55,24.9,'Rawatbhata','',-7,12,'end');
  }
  if(has('geo')){
    s+=lbl(71.3,29.4,'PAKISTAN','nb',0,0,'middle')+lbl(76.2,29.5,'HARYANA','nb',0,0,'middle')+lbl(78.2,27.9,'UTTAR PRADESH','nb',0,0,'end')+lbl(75.5,23.3,'MADHYA PRADESH','nb',0,0,'middle')+lbl(72.3,23.4,'GUJARAT','nb',0,0,'middle');
    s+=circ(71.92,27.1,5,'m-inf','Pokhran, nuclear tests 1974 and 1998')+circ(70.15,27.5,4,'m-inf','Longewala, 1971 battle')+circ(72.65,28.1,4,'m-inf','Mahajan Field Firing Range, Bikaner')+circ(73.9,29.9,4,'m-inf','Sri Ganganagar border district')+circ(70.9,26.9,4,'m-inf','Jaisalmer air force station');
    s+=lbl(71.92,27.1,'Pokhran','',8,-6)+lbl(70.15,27.5,'Longewala','',8,-6)+lbl(72.65,28.1,'Mahajan range','',8,-6)+lbl(70.9,26.9,'Jaisalmer AFS','',-8,18,'end');
  }
  s+='<g transform="translate(386,36)"><text class="pt s" text-anchor="middle" y="-8">N</text><path d="M0,-4 L5,12 L0,8 L-5,12Z" fill="var(--ink)"/></g>';
  s+='<g transform="translate(24,340)"><line x1="0" y1="0" x2="46" y2="0" stroke="var(--ink)" stroke-width="2"/><text class="pt s" x="0" y="-5">~ 100 km</text></g></svg>';
  return s;
}
var LEG={relief:'<i style="background:var(--rh)"></i>Aravalli ridge',rivers:'<i style="background:var(--accent)"></i>Rivers and canal (dashed)',pa:'<i style="background:var(--good)"></i>Parks and sanctuaries',tig:'<i style="background:var(--lat)"></i>Tiger reserves',ts:'<i style="background:var(--pyq)"></i>Ramsar and wetland sites',infra:'<i style="background:var(--lat)"></i>Airports, power, refinery'};

/* ---------- profile (west to east) ---------- */
function profile(){
  var E=[[0,150],[60,250],[130,180],[200,220],[260,250],[330,400],[380,880],[420,500],[480,420],[540,380],[600,250],[640,175]];
  var d='M0,190 '+E.map(function(p){return 'L'+p[0]+','+(190-p[1]*0.09).toFixed(1)}).join(' ')+' L640,190 Z';
  return '<svg viewBox="0 0 640 240" role="img" aria-label="West to east relief profile of Rajasthan"><path class="pz" d="'+d+'"/>'
  +'<line class="m-ax" x1="0" y1="190" x2="640" y2="190"/>'
  +'<g class="pt s"><text x="20" y="214">WESTERN DESERT (THAR) ~ 61% of area</text><text x="330" y="228">ARAVALLI</text><text x="470" y="214">EASTERN PLAINS AND HADOTI</text></g>'
  +'<g stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"><line x1="300" y1="60" x2="300" y2="200"/><line x1="440" y1="60" x2="440" y2="200"/></g>'
  +'<text class="pt" x="385" y="92">Ajmer ridge (Taragarh ~870 m)</text><text class="pt s" x="385" y="106">Guru Shikhar 1,722 m lies further south</text>'
  +'<text class="pt s" x="20" y="150">dunes, salt basins,</text><text class="pt s" x="20" y="162">Luni basin, sparse rain</text>'
  +'<text class="pt s" x="470" y="140">Banas, Chambal,</text><text class="pt s" x="470" y="152">alluvial farmland</text></svg>';
}

/* ---------- radial hub ---------- */
function radial(){
  var s='<svg viewBox="0 0 800 700" role="img" aria-label="Mind map of the 12 Rajasthan dossier sections; each box links to its page">';
  var cx=400,cy=350,rx=290,ry=262;
  for(var i=0;i<12;i++){var a=(-90+i*30)*Math.PI/180;var x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a);s+='<line class="ln" x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'"/>'}
  s+='<circle class="cn" cx="'+cx+'" cy="'+cy+'" r="66"/><text class="ct" x="'+cx+'" y="'+(cy+4)+'" text-anchor="middle">RAJASTHAN</text><text class="cs" x="'+cx+'" y="'+(cy+24)+'" text-anchor="middle">STATE DOSSIER</text>';
  for(var j=0;j<12;j++){var b=(-90+j*30)*Math.PI/180;var X=cx+rx*Math.cos(b),Y=cy+ry*Math.sin(b);
    s+='<a href="#rajasthan-'+DIMS[j][0]+'"><g class="nd" transform="translate('+(X-78).toFixed(1)+','+(Y-27).toFixed(1)+')"><rect width="156" height="54" rx="10"/><text class="nn" x="12" y="17">'+(j<9?'0':'')+(j+1)+'</text><text class="nt" x="12" y="33">'+HUBS[j]+'</text><text class="ns" x="12" y="47">'+HUBSUB[j]+'</text></g></a>'}
  return s+'</svg>';
}

/* ---------- pages ---------- */
var P={};

P.overview=function(){
  return '<header class="ph"><div class="eyebrow">State dossier · Northwestern India</div><h1>Rajasthan</h1><p class="cov">Largest Indian state by area, home to the Thar desert and the Aravalli range, assembled from 22 princely states between 1948 and 1956. A mining, farming, tourism and solar economy on a water-scarce land. Start here, pick a section, then finish with the revision deck.</p></header>'
  +facts([['Area','3,42,239 sq km, largest state '+V],['Population','6.85 crore (Census 2011)'],['Capital','Jaipur'],['Present form','1 Nov 1956; Rajasthan Day 30 March '+V],['Districts','41 districts, 7 divisions',1],['Legislature','Unicameral, 200 seats'],['Official language','Hindi (Devanagari)'],['Per capita income','Rs 2.02 lakh, 2025-26 AE',1],['Chief Minister','Bhajan Lal Sharma',1],['Next election','Due Nov to Dec 2028 '+V]])
  +sec('Map explorer','<div class="two"><div><div class="tog" id="maptog">'+[['relief','Relief'],['rivers','Rivers'],['cities','Towns'],['pa','Protected areas'],['infra','Infrastructure']].map(function(x,i){return '<button class="btn sm" data-lay="'+x[0]+'" aria-pressed="'+(i<2?'true':'false')+'">'+x[1]+'</button>'}).join('')+'</div><div id="mapbox">'+mapSVG(['relief','rivers'])+'</div><p class="cap">Schematic map for revision. Positions are approximate and the outline is simplified, so do not use it to judge exact boundaries.</p></div><div>'+ul(['<b>West and north-west:</b> Pakistan (Sindh and Punjab provinces), a border of roughly 1,040 to 1,070 km depending on source '+V+'.','<b>North and north-east:</b> Punjab, Haryana and Uttar Pradesh.','<b>South and south-east:</b> Gujarat and Madhya Pradesh.','<b>Relief:</b> the Aravalli runs south-west to north-east and splits the state into a dry west and a better-watered east.','<b>Rivers:</b> Chambal and its tributaries in the east, Luni in the west; the Indira Gandhi Canal brings Punjab river water to the desert.','<b>Cities:</b> Jaipur is the capital and largest city; Jodhpur, Kota, Bikaner, Ajmer and Udaipur follow.'])+'<p class="cap">Toggle layers to see where parks, tiger reserves and projects sit relative to the Aravalli and the Chambal.</p></div></div>')
  +sec('Mind map: the whole state on one screen','<div class="hubd hub">'+radial()+'</div><div class="hubm tpl">'+DIMS.map(function(d,i){return '<a class="tp" href="#rajasthan-'+d[0]+'"><b>'+(i<9?'0':'')+(i+1)+'</b><h3>'+d[1]+'</h3><p>'+d[2]+'</p></a>'}).join('')+'</div>')
  +sec('Rajasthan in six lines',ul(['Largest state by area, about 10.4% of India, with a population share near 5.5% '+V+'.','Formed by merging 19 princely states, three chiefdoms and Ajmer-Merwara in seven stages from 18 March 1948 to 1 November 1956.','Thar desert in the west, Aravalli range through the middle (Guru Shikhar, 1,722 m, the highest point), Chambal and Banas plains in the east.','Services about 47.7%, industry about 26.6%, agriculture and allied about 25.7% of GSVA (2025-26 AE, current prices).','Panchayati Raj was first launched at Nagaur on 2 October 1959, following the Balwant Rai Mehta Committee.','Live in 2026: Aravalli definition case in the Supreme Court, the PKC-ERCP water project, delayed local-body polls and the 41-district map.']))
  };

P.physical=function(){
  return facts([['Latitude','23°03′N to 30°12′N '+V],['Longitude','69°30′E to 78°17′E '+V],['Area','3,42,239 sq km '+V],['Tropic of Cancer','Passes through Banswara and Dungarpur '+V],['Aravalli length','~692 km in Rajasthan of ~800 km '+V],['Highest point','Guru Shikhar (Mount Abu), 1,722 m']])
  +sec('Location and boundaries','<div class="two"><div>'+ul(['West: Pakistan. North: Punjab and Haryana. East: Uttar Pradesh and Madhya Pradesh. South: Gujarat and Madhya Pradesh.','Border districts with Pakistan: Sri Ganganagar, Bikaner, Jaisalmer and Barmer '+V+'.','41 districts in 7 divisions: Jaipur, Jodhpur, Ajmer, Bikaner, Kota, Udaipur, Bharatpur.','Largest district is Jaisalmer (about 38,400 sq km); smallest is Dholpur (about 3,084 sq km), after nine of the 2023 districts were abolished.','Forest cover is low, around 4 to 5% of area, one of the lowest among large states (ISFR) '+V+'.'])+'</div><div>'+mapSVG(['relief','rivers','cities'])+'<p class="cap">Schematic. The Aravalli ridge is drawn as a thick line.</p></div></div>')
  +sec('Physiographic divisions',tbl(['Region','Share of area','What defines it','Exam hook'],[
  ['Western desert (Thar)','~61% '+V,'Sand dunes (barchans), salt lakes, thorn scrub; Jaisalmer, Barmer, Bikaner, Jodhpur, Churu, Sri Ganganagar','Rajasthan has the Great Indian Desert; rainfall under ~25 cm in the driest parts'],
  ['Aravalli range','~9% '+V,'Old fold mountains; Guru Shikhar 1,722 m; Jarga about 1,431 m; Raghunathgarh about 1,055 m in Shekhawati '+V,'Water divide between Bay of Bengal and Arabian Sea drainage systems in places'],
  ['Eastern plains','~23% '+V,'Alluvial plains of Banas, Banganga, Ghaggar and Mahi; Jaipur, Bharatpur, Alwar, Tonk','Most densely populated and most irrigated part'],
  ['South-eastern plateau (Hadoti)','~7% '+V,'Rocky plateau and black soils; Kota, Bundi, Baran, Jhalawar','Chambal valley; Vindhyan outliers']])+'<h3>West to east cross-section</h3>'+profile()+'<p class="cap">Heights are exaggerated for legibility and spot heights are indicative. The profile shows the desert, ridge and plains side by side.</p>')
  +sec('Rivers and lakes',tbl(['Feature','Course and facts','Why it matters'],[
  ['Luni','Rises near Ajmer (Nag Pahar), flows south-west through Pali, Jodhpur, Barmer and Jalore and ends in the Rann of Kutch; water turns saline downstream '+V+'.','Only major river of the west; seasonal.'],
  ['Chambal','Rises in Madhya Pradesh, enters at Chittorgarh and Kota, forms the border near Dholpur; Rana Pratap Sagar, Jawahar Sagar and Kota Barrage.','Only perennial river of the state; ravines; basis of PKC-ERCP.'],
  ['Banas','Rises in the Aravalli near Kumbhalgarh, joins the Chambal near Sawai Madhopur; Bisalpur Dam (Tonk) on it '+V+'.','Water source for Jaipur and Ajmer.'],
  ['Mahi','Rises in Madhya Pradesh, flows through Banswara and Pratapgarh to the Gulf of Khambhat; Mahi Bajaj Sagar dam.','Tribal south; one of the few west-flowing rivers.'],
  ['Ghaggar','Seasonal; flows in Hanumangarh; often linked to the Vedic Saraswati.','Northern desert fringe; Kalibangan lies on the dry bed.'],
  ['Sambhar Lake','Largest inland saline lake in India; Ramsar site since 1990 '+V+'.','Salt production; flamingos and other waterbirds.'],
  ['Other lakes','Didwana, Pachpadra and Lunkaransar (salt); Pichola, Fateh Sagar, Jaisamand and Rajsamand (freshwater).','Udaipur lake system; tourism.']])+'<p class="cap">The Indira Gandhi Canal (earlier the Rajasthan Canal) carries water from the Harike barrage in Punjab into the Thar.</p>')
  +sec('Climate, soils, vegetation','<div class="three"><div><h4>Climate</h4>'+ul(['Arid and semi-arid; extremes of heat and cold.','Rainfall falls from east to west; Mount Abu and Jhalawar receive the most, Jaisalmer the least.','Aravalli runs parallel to the south-west monsoon branch, so it does not block moisture much '+V+'.'])+'</div><div><h4>Soils</h4>'+ul(['Desert (arid) soils in the west, sandy and low in organic matter.','Sierozem and red-yellow soils in the middle.','Alluvial in the eastern plains; black soils in Hadoti.'])+'</div><div><h4>Vegetation</h4>'+ul(['Thorn forest and scrub; khejri (state tree), rohida (state flower).','Dry deciduous forest in the Aravalli, south and Hadoti.','Sewan grass and aak in desert grasslands.'])+'</div></div>')
  +sec('Natural resources',ul(['Rajasthan is the main producer of zinc and lead concentrates (Rampura Agucha, Zawar) and a leading producer of copper (Khetri), wollastonite, selenite, jasper and soapstone '+V+'.','Building stone and marble: Makrana and Rajsamand marble, Jodhpur sandstone, Kota stone, Bijolia.','Limestone and cement-grade minerals; gypsum and lignite (Bikaner, Barmer); salt.','Crude oil and gas in the Barmer basin (Mangala fields) and Jaisalmer gas fields '+V+'.','Solar and wind potential in the desert; Mining and its legal limits are covered under Economy and Environment.']))
  +sec('Mind map',mm('Physical Rajasthan',[['Place',['23° to 30°N','3.42 lakh sq km','41 districts']],['Relief',['Thar 61%','Aravalli','Eastern plains','Hadoti']],['Water',['Chambal','Luni','Banas','Mahi','Sambhar']],['Climate',['Arid to semi-arid','Rain falls westward']],['Soil and cover',['Desert soil','Sierozem','Khejri','Thorn scrub']],['Resources',['Zinc','Copper','Marble','Oil and gas','Solar']]]))
  +exam(['Guru Shikhar (Mount Abu) is the highest peak of the Aravalli.','Chambal is the only perennial river; Luni is the main river of the west.','Sambhar is India’s largest inland saline lake.','Rajasthan is the main zinc and lead producer.'],['Explain how the Aravalli shapes climate, water and mining in Rajasthan.','Why is Rajasthan the test case for water-scarcity governance in India?'],['Guru Shikhar is not in Shekhawati; Raghunathgarh is the highest hill there.','Physiographic area shares vary by source; use the stem if given.']);
};

P.history=function(){
  return sec('From Matsya Union to Rajasthan: the seven stages',flow([['18 Mar 1948','Matsya Union (Alwar, Bharatpur, Dholpur, Karauli)'],['25 Mar 1948','Rajasthan Union (Hadoti, Tonk, Banswara, Dungarpur and others)'],['18 Apr 1948','United Rajasthan: Udaipur (Mewar) joins'],['30 Mar 1949','Greater Rajasthan: Jaipur, Jodhpur, Bikaner, Jaisalmer join'],['15 May 1949','Matsya merged into Greater Rajasthan'],['26 Jan 1950','Sirohi merged (Abu Road and Dilwara handed to Bombay)'],['1 Nov 1956','Ajmer-Merwara, Abu and other areas added under the States Reorganisation Act']])+'<p class="cap">Stage order and names follow standard textbooks; confirm exact dates before a date-based MCQ '+V+'.</p>')
  +sec('Timeline',tl([
  ['c.3000 to 1500 BCE','Kalibangan and Ahar-Banas cultures','Kalibangan (Hanumangarh) is a Harappan site with a ploughed field and fire altars; Ahar-Banas copper age sites include Ahar, Balathal and Ganeshwar '+V+'.'],
  ['6th to 11th c.','Gurjara-Pratiharas and early Rajput clans','Gurjara-Pratiharas with capital at Bhinmal and Mandore; Chauhans of Sambhar and Ajmer; Guhilas of Mewar.'],
  ['1191 to 1192','Prithviraj Chauhan III','Won at First Tarain, defeated at Second Tarain by Muhammad of Ghor.'],
  ['1303','Alauddin Khalji at Chittorgarh','Siege of Chittor; Rani Padmini tradition appears in later literature.'],
  ['1459','Jodhpur founded','Rao Jodha of the Rathors founds Jodhpur and Mehrangarh.'],
  ['1527','Khanwa','Rana Sanga of Mewar loses to Babur near Bayana.'],
  ['1568, 1576','Chittor and Haldighati','Akbar takes Chittor in 1568; Maharana Pratap fights Mughal and Amber forces at Haldighati in 1576.'],
  ['1727','Jaipur founded','Sawai Jai Singh II of Amber; planned by Vidyadhar Bhattacharya; Jantar Mantar built in the same era.'],
  ['1818','Subsidiary alliances','Rajput states accept British paramountcy through treaties; Rajputana Agency forms.'],
  ['1857','Revolt','Risings at Nasirabad, Neemuch and Kota; Kota rebels hold the city for months '+V+'.'],
  ['1897 to 1941','Peasant and tribal movements','Bijolia kisan movement (from 1897 and 1913 under Vijay Singh Pathik), Begun, Bhil Eki movement under Motilal Tejawat, Govind Guru and the Mangarh massacre of 1913.'],
  ['1938','Praja Mandals','Jaipur and Marwar Praja Mandals gain strength; Hiralal Shastri and Jai Narain Vyas are prominent leaders.'],
  ['1948 to 1956','Integration','Seven-stage merger; Sardar Patel and V P Menon steer negotiations; Hiralal Shastri becomes first CM of Greater Rajasthan in 1949.'],
  ['1 Nov 1956','Present Rajasthan','States Reorganisation Act, 7th Constitutional Amendment.'],
  ['2 Oct 1959','Panchayati Raj at Nagaur','Launched by Jawaharlal Nehru; first state to adopt the three-tier system '+V+'.'],
  ['1998','Pokhran-II','Five nuclear tests on 11 and 13 May.'],
  ['2023 to 2024','Districts redrawn','50 districts and 10 divisions created in 2023; 9 districts and 3 divisions abolished on 28 December 2024.']])+'<p class="cap">Dates are from textbook-level sources; confirm exact days for any date-based MCQ '+V+'.</p>')
  +sec('Historical legacies that still matter',tbl(['Legacy','What it is','Why UPSC cares'],[
  ['Bishnoi movement, Khejarli 1730','Amrita Devi and many villagers died protecting khejri trees from felling for the Jodhpur king.','Early environmental sacrifice; seen as an inspiration for Chipko.'],
  ['Bijolia and Mewar peasant movements','Opposed heavy land revenue and feudal levies.','Peasant movements in princely states.'],
  ['Hill Forts of Rajasthan','Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer, World Heritage Site since 2013 '+V+'.','UNESCO sites; Rajput military architecture.'],
  ['Princely integration','22 states and Ajmer-Merwara merged over eight years.','Compare with Hyderabad, Junagadh and Kashmir.']]))
  +sec('Culture at a glance',tbl(['Theme','Key items'],[
  ['Festivals and fairs','Teej, Gangaur, Pushkar camel fair, Desert Festival at Jaisalmer, Mewar Festival at Udaipur, Urs at Ajmer Sharif, Kajli Teej at Bundi, Baneshwar fair of tribes '+V],
  ['Music and dance','Ghoomar, Kalbeliya (UNESCO intangible heritage, 2010), Kachhi Ghodi, Terah Taali, Bhavai, Kathputli puppetry, Manganiyar and Langa songs'],
  ['Painting schools','Mewar, Marwar, Kishangarh (Bani Thani), Bundi-Kota, Amber-Jaipur; Phad scroll painting of Bhilwara; miniature traditions'],
  ['Architecture','Amber Fort, Hawa Mahal, City Palace Jaipur, Mehrangarh, Jaisalmer Fort, Dilwara and Ranakpur Jain temples, Chand Baori at Abhaneri, Keshavrai temple, Osian temples'],
  ['UNESCO','Keoladeo NP (1985), Jantar Mantar (2010), Hill Forts of Rajasthan (2013), Jaipur City (2019) '+V],
  ['Language and literature','Hindi is the official language; Rajasthani dialects (Marwari, Mewari, Dhundhari, Hadoti, Mewati); Rajasthani is not in the Eighth Schedule though demanded '+V+'. Prithviraj Raso is attributed to Chand Bardai.'],
  ['Crafts','Block printing (Sanganer, Bagru), blue pottery, Kota Doria, Thewa, bandhani, lac work, Molela terracotta']]))
  +sec('Mind map',mm('History & culture',[['Early',['Kalibangan','Ahar','Gurjara-Pratiharas','Chauhans']],['Medieval',['Guhilas of Mewar','Rathors','Kachwahas','Haldighati 1576']],['Colonial',['Treaties 1818','1857 risings','Rajputana Agency']],['Movements',['Bijolia','Bhil Eki','Mangarh 1913','Praja Mandals']],['Integration',['Matsya 1948','Greater Rajasthan 1949','1956 final']],['Culture',['Kalbeliya','Ghoomar','Phad','Hill Forts']]]))
  +exam(['Seven stages of integration; Greater Rajasthan on 30 March 1949; final form 1 November 1956.','Kalibangan is in Hanumangarh; Ahar-Banas culture sites.','Khejarli massacre 1730 and the Bishnoi.','UNESCO: Keoladeo, Jantar Mantar, Hill Forts, Jaipur City.'],['Assess the role of princely states and Praja Mandals in Rajasthan’s integration.','How do peasant and tribal movements in Rajasthan differ from Gandhian national movements?'],['Rajasthan Day is 30 March, but the present boundaries date from 1 November 1956.','Matsya Union is the first stage, not the Mewar merger.']);
};

P.geopolitics=function(){
  return facts([['International border','Pakistan, ~1,040 to 1,070 km '+V],['Border districts','Sri Ganganagar, Bikaner, Jaisalmer, Barmer'],['Nuclear tests','Pokhran, 1974 and 1998'],['1971 battle','Longewala, 4 to 5 Dec 1971'],['Air bases','Jodhpur, Jaisalmer, Nal, Suratgarh, Uttarlai '+V],['Firing ranges','Pokhran, Mahajan (Bikaner)']])
  +sec('Strategic picture','<div class="two"><div>'+mapSVG(['relief','rivers','geo'])+'<p class="cap">Strategic sites on the schematic map.</p></div><div>'+ul(['<b>Border state in the desert.</b> The Thar border is open terrain, patrolled by the BSF, with fencing, flood-lighting and anti-drone measures.','<b>Nuclear history.</b> Smiling Buddha (18 May 1974) and Operation Shakti (11 and 13 May 1998) were both at Pokhran.','<b>Air and land power.</b> Several air force stations and large firing ranges in Jaisalmer, Bikaner and Jodhpur; the Thar hosts regular tri-service and bilateral exercises '+V+'.','<b>1971 war.</b> The Battle of Longewala showed how a small post and air support can halt an armoured thrust.','<b>Energy security.</b> Barmer oil, a new refinery at Pachpadra, and solar parks make the west a national energy asset.'])+'</div></div>')
  +sec('Disputes and diplomacy',tbl(['Issue','Facts','Exam angle'],[
  ['Indus Waters and Indira Gandhi Canal','The 1960 Indus Waters Treaty gave India the eastern rivers (Ravi, Beas, Sutlej). The Indira Gandhi Canal draws on these via the Harike barrage. India placed the treaty in abeyance in April 2025 '+V+'.','International water law; irrigation in Thar; western-river projects'],
  ['Pakistani Hindu migrants','Long-term visa holders live in Jodhpur and Jaisalmer; Citizenship Amendment Act 2019 is relevant '+V+'.','Citizenship, minority protection'],
  ['Yamuna and Ravi-Beas water sharing','Rajasthan seeks greater shares from Haryana, Punjab and the Upper Yamuna Board '+V+'.','Inter-state water allocation, Article 262'],
  ['PKC-ERCP with Madhya Pradesh','Chambal basin transfer shared with MP; MoUs signed in 2024 '+V+'.','Inter-state river linking'],
  ['Aravalli across states','Delhi, Haryana, Rajasthan and Gujarat share one range; mining rules differ.','Federal coordination on ecology']])+'<p class="cap">Sir Creek is a Gujarat-Pakistan issue, not a Rajasthan one.</p>')
  +sec('Security concerns',ul(['Cross-border drone drops of narcotics and weapons; smuggling in border districts.','Water scarcity and migration pressure in border villages.','Communal and religious tension; anti-conversion law and protests in 2025 to 2026.','Cyber-crime hubs in some Mewat and Bharatpur pockets; coordinated by state and central agencies '+V+'.']))
  +sec('Mind map',mm('Strategic Rajasthan',[['Border',['Pakistan','4 border districts','BSF']],['Nuclear',['Pokhran 1974','Pokhran 1998']],['Air and land',['Air bases','Mahajan range','Jaisalmer']],['War history',['Longewala 1971']],['Water',['Indus Waters Treaty','IGNP','PKC-ERCP']],['People',['Pak Hindu migrants','CAA 2019']]]))
  +exam(['Pokhran: 1974 (Smiling Buddha) and 1998 (Shakti).','Indira Gandhi Canal draws Beas-Sutlej water; fed from Harike.','Longewala: December 1971.'],['Examine Rajasthan’s role in India’s western-front security and energy strategy.','Examine how the suspension of the Indus Waters Treaty affects irrigation in the Thar.'],['The Indus Waters Treaty covers the western rivers for Pakistan; the eastern rivers belong to India.']);
};

P.governance=function(){
  return facts([['Governor','Haribhau Bagde',1],['Chief Minister','Bhajan Lal Sharma (since 15 Dec 2023)',1],['Deputy CMs','Diya Kumari (Finance), Prem Chand Bairwa',1],['Assembly','200 seats; 101 for majority'],['Parliament','25 Lok Sabha, 10 Rajya Sabha '+V],['High Court','Principal seat Jodhpur; bench at Jaipur']])
  +sec('Formation and constitutional hooks',flow([['1956','States Reorganisation Act; 7th Amendment; Rajasthan in present form'],['Art. 164(1A)','Council of Ministers capped at 15% of the House, so 30 for 200 seats'],['Art. 243','Panchayati Raj; Rajasthan was the first to launch it, 1959'],['5th Schedule','Scheduled Areas in the south (Banswara, Dungarpur, Pratapgarh and parts of other districts) '+V],['Art. 262','Inter-state river disputes, e.g. Chambal, Yamuna, Ravi-Beas']])+'<p class="cap">Rajasthan has no Article 371 special provision. Scheduled Area status comes from the Fifth Schedule.</p>')
  +sec('Government structure','<div class="three"><div><h4>Executive</h4>'+ul(['Governor appointed by President.','Chief Minister heads the Council of Ministers; two Deputy CMs.','Secretariat in Jaipur; Chief Secretary heads the civil service.'])+'</div><div><h4>Legislature</h4>'+ul(['Unicameral Legislative Assembly of 200.','Speaker: Vasudev Devnani; Leader of Opposition: Tikaram Jully '+V+'.','Term ends December 2028.'])+'</div><div><h4>Judiciary</h4>'+ul(['Rajasthan High Court, established 1949; Jaipur bench since 1977 '+V+'.','District courts in each of the 41 districts.','Anti-conversion Act and Aravalli mining cases are before the Supreme Court.'])+'</div></div>')
  +sec('Administration and local government',tbl(['Level','Body','Notes'],[
  ['Divisions','7: Jaipur, Jodhpur, Ajmer, Bikaner, Kota, Udaipur, Bharatpur','Divisional commissioners; Pali, Sikar and Banswara divisions created in 2023 were abolished on 28 Dec 2024.'],
  ['Districts and sub-units','41 districts, 323 sub-division offices, 425 tehsils, 233 sub-tehsils (registers of 22 Jan 2026)','Eight of the 17 new districts of 2023 were kept: Balotra, Beawar, Deeg, Didwana-Kuchaman, Khairthal-Tijara, Kotputli-Behror, Phalodi, Salumbar '+V+'.'],
  ['Rural','41 Zila Parishads, 457 Panchayat Samitis, 14,403 Gram Panchayats (2026 elections)','Rajasthan Panchayati Raj Act 1994; State Election Commission conducts polls under Article 243K.'],
  ['Urban','Municipal corporations, councils and boards under Rajasthan Municipalities Act 2009 '+V,'74th Amendment; delayed polls and delimitation litigation in 2025 to 2026.']]))
  +sec('Politics and stability',ul(['2023 result (25 Nov 2023, 199 seats polled): BJP 115, Congress about 69, others about 15; no party had won twice in a row since 1998.','Bhajan Lal Sharma, a first-time MLA from Sanganer, became the 14th Chief Minister on 15 Dec 2023.','Bypolls changed the numbers: in November 2024 the BJP won five of seven seats; the Congress won the Anta bypoll in November 2025 '+V+'.','Anti-defection history: six BSP MLAs merged with the Congress in 2009 and again in 2019, drawing Tenth Schedule challenges; the 2020 rebellion led by Sachin Pilot reached the courts '+V+'.','Local-body elections were delayed beyond April 2026 despite High Court and Supreme Court orders; panchayat polls were announced on 3 October 2026.']))
  +sec('Institutions and innovations',ul(['Nagaur: world’s first three-tier Panchayati Raj experiment of its kind in India, 1959.','Right to Information: the MKSS movement (Aruna Roy) in Rajasthan gave the national RTI Act its early template '+V+'.','Rajasthan Lokayukta (Act of 1973) was among the earliest state anti-corruption bodies '+V+'.','Bhamashah and Jan Soochna Portal for transparency; Rajasthan State Testing Agency (RSTA) announced in Budget 2026-27 to clean up competitive exams.','Rajasthan Platform Based Gig Workers Act 2023, among the first of its kind in India '+V+'.']))
  +sec('Mind map',mm('Governing Rajasthan',[['Formation',['1956 Act','7th Amendment']],['Executive',['Governor','CM and 2 Deputy CMs']],['Legislature',['200 seats','Max 30 ministers']],['Courts',['Jodhpur HC','Jaipur bench']],['Local',['ZP 41','PS 457','GP 14,403']],['Bodies',['Lokayukta','SEC','RPSC','RSTA']]]))
  +exam(['Rajasthan has 200 Assembly seats, so the 15% cap gives a maximum of 30 ministers.','Panchayati Raj began at Nagaur on 2 October 1959.','Present map: 41 districts, 7 divisions.'],['Evaluate district reorganisation as an administrative and political tool, using Rajasthan 2023 to 2024.','Why do local-body elections get delayed, and what role does the judiciary play?'],['The Governor is appointed, not elected; check the current office-holder before the exam.','Do not use the old 50-district or 10-division numbers.']);
};

P.economy=function(){
  return facts([['GSDP, current prices','Rs 18.75 lakh crore, 2025-26 AE',1],['Growth, current','10.24%',1],['Growth, constant (2011-12)','8.66%',1],['Per capita income','Rs 2,02,349, 2025-26 AE',1],['India per capita','Rs 2,19,575, 2025-26',1],['Rank and share','7th; ~5.25% of India GDP',1]])
  +sec('Per capita income, current prices (Rs lakh)','<div class="two"><div>'+vb([['2021-22','1.34',1.34],['2022-23','1.49',1.49],['2023-24','1.67',1.67],['2024-25','1.85',1.85],['2025-26','2.02',2.02,'lat']],2.2)+'<p class="cap">Source: Rajasthan Economic Review 2025-26, Key Indicators table. 2025-26 is an Advance Estimate.</p></div><div>'+hb([['Rajasthan',202349,'Rs 2.02 lakh'],['India',219575,'Rs 2.20 lakh','lat']],219575)+'<p class="cap">Rajasthan’s per capita income is about 8% below the national figure. At constant prices it is Rs 1,03,189 against about Rs 1.22 lakh for India.</p></div></div>')
  +sec('GSDP trend (current prices)',tbl(['Year','GSDP (Rs lakh crore)','Growth'],[['2021-22','11.96','17.46%'],['2022-23','n.a. in source','12.80%'],['2023-24','n.a. in source','12.85%'],['2024-25','n.a. in source','11.77%'],['2025-26 AE','18.75','10.24%'],['2026-27 BE (budget)','21.52','budget projection']])+'<p class="cap">Growth rates and the end-point values are from the Economic Review 2025-26 as reported; the budget projects Rs 21.52 lakh crore GSDP for 2026-27.</p>')
  +sec('Sector mix (GSVA, 2025-26 AE, current prices)','<div class="stack"><div style="width:25.74%;background:var(--good)">26</div><div style="width:26.55%;background:var(--accent)">27</div><div style="width:47.71%;background:var(--lat)">48</div></div><div class="leg"><span><i style="background:var(--good)"></i>Agriculture and allied 25.74%</span><span><i style="background:var(--accent)"></i>Industry 26.55%</span><span><i style="background:var(--lat)"></i>Services 47.71%</span></div><p class="cap">These are shares of GSVA at basic prices, not of GSDP. Foodgrain output is about 284 lakh tonnes (2025-26 AE).</p>')
  +sec('State finances, Budget 2026-27 (Rs crore)',tbl(['Item','2025-26 RE','2026-27 BE','Change'],[
  ['Net expenditure','3,59,472','4,05,632','+13%'],['Interest payments','42,961','43,675','+2%'],['Fiscal deficit','3.9% of GSDP','79,493 (3.7%)','narrowing'],['Revenue deficit','n.a.','24,314','persistent'],['Agricultural subsidies incl. power','n.a.','42,191','n.a.']])+'<div class="note"><b>Why numbers differ across sources.</b> The budget outlay (about Rs 6.11 lakh crore) includes debt repayment, while PRS reports net expenditure of Rs 4.06 lakh crore. The CAG noted in August 2026 that the state breached its fiscal-deficit targets repeatedly over twelve years: 4.31% in 2023-24, about 4.25% in 2024-25, 3.89% revised for 2025-26 and 3.69% budgeted for 2026-27 against the 3% FRBM benchmark. Presented by Deputy CM and Finance Minister Diya Kumari on 11 February 2026.</div>')
  +sec('Sectors',tbl(['Sector','What to remember'],[
  ['Agriculture','Leading producer of bajra, mustard, guar and many spices; wool and camel numbers; sheep and goat rearing; heavy dependence on rain and tubewells '+V+'.'],
  ['Mining and minerals','Zinc and lead (Hindustan Zinc), limestone, copper, marble, sandstone and lignite; zinc and limestone together provide most mineral revenue.'],
  ['Industry','Bhilwara textiles, Jaipur gems and jewellery, Bhiwadi-Neemrana auto cluster on the Delhi-Mumbai corridor, cement, ceramics and food processing; RIICO industrial areas.'],
  ['Energy','Large solar capacity (Bhadla Solar Park), wind in Jaisalmer, thermal at Kota and Suratgarh, nuclear at Rawatbhata (RAPS), HPCL Rajasthan Refinery at Pachpadra '+V+'.'],
  ['Tourism','Heritage, desert and wildlife circuits; Golden Triangle, Palace on Wheels, destination weddings; more than 1,600 tourism MoUs signed under Rising Rajasthan.'],
  ['Investment','Rising Rajasthan Global Investment Summit (9 to 11 Dec 2024) produced about Rs 35 lakh crore of MoUs; the state reported over Rs 8 lakh crore grounded by July 2026 and set a November 2026 target.']]))
  +sec('Economic challenges',ul(['Water scarcity: the state has more than 10% of India’s area but only about 1% of its surface water '+V+'.','Fiscal deficit still above 3% and a persistent revenue deficit, flagged by the CAG.','Grounding of MoUs: only a fraction of announced investment becomes real projects.','Paper leaks in competitive exams and youth unemployment; RSTA and the Employment Policy 2026 respond to this.','Power distribution company debt and farm electricity subsidies; Aravalli mining limits.','Female labour force participation is about 42% according to the Economic Review, so gender gaps in work remain.']))
  +sec('Mind map',mm('Rajasthan’s economy',[['Size',['GSDP Rs 18.75 lakh cr','7th rank','PCI Rs 2.02 lakh']],['Sectors',['Services 48%','Industry 27%','Agri 26%']],['Minerals',['Zinc and lead','Limestone','Marble','Oil and gas']],['Energy',['Bhadla solar','Rawatbhata','Pachpadra refinery']],['Investment',['Rising Rajasthan','Rs 35 lakh cr MoUs','$350 bn by 2029 target']],['Finance',['Deficit 3.7%','Revenue deficit','CAG flags']]]))
  +exam(['Rajasthan is 7th in GSDP; its per capita income is below the national average.','Sector shares are GSVA shares.','Rising Rajasthan: December 2024, Rs 35 lakh crore MoUs.','Zinc and lead mining in Rajasthan.'],['Why does a large, resource-rich state lag national per capita income? Use Rajasthan’s water, human capital and fiscal data.','Assess MoU-based investment promotion as a development strategy.'],['Always state the price basis (current or constant) and the estimate stage (AE, RE, BE).','Do not divide GSDP by population to get per capita income; PCI uses NSDP.']);
};

P.environment=function(){
  return facts([['Tiger reserves','5 notified, 6th reported '+V],['National parks','Ranthambore, Sariska, Keoladeo, Mukundra Hills, Desert '+V],['Ramsar sites','Keoladeo (1981), Sambhar (1990) and newer additions '+V],['World Heritage (natural)','Keoladeo NP (1985)'],['Critically endangered bird','Great Indian Bustard (state bird)'],['State animals','Camel (livestock), chinkara (wildlife)']])
  +sec('Protected areas map','<div class="two"><div><div id="maptog2" class="tog"></div>'+mapSVG(['relief','rivers','pa'])+'<div class="leg"><span>'+LEG.pa+'</span><span>'+LEG.tig+'</span><span>'+LEG.ts+'</span></div></div><div>'+tbl(['Area','Where','Remember'],[
  ['Ranthambore TR','Sawai Madhopur','Tiger reserve and NP; fort inside; in the Ranthambore-Kuno corridor'],
  ['Sariska TR','Alwar','First tigers lost by 2004 and reintroduced from 2008 '+V],
  ['Mukundra Hills TR','Kota, Jhalawar','Notified 2013; Darrah sanctuary area'],
  ['Ramgarh Vishdhari TR','Bundi','Fourth tiger reserve '+V],
  ['Dholpur-Karauli TR','Dholpur, Karauli','Fifth tiger reserve '+V],
  ['Keoladeo NP','Bharatpur','Birds; Ramsar and World Heritage Site'],
  ['Desert National Park','Jaisalmer, Barmer','Great Indian Bustard stronghold; sand dunes; fossils at Akal'],
  ['Sambhar Lake','Jaipur, Nagaur','Saline wetland; flamingos'],
  ['Tal Chhapar','Churu','Blackbuck sanctuary'],
  ['Mount Abu WLS','Sirohi','Guru Shikhar; sloth bear']])+'<p class="cap">Counts and areas are approximate and change with new notifications '+V+'.</p></div></div>')
  +sec('Great Indian Bustard and power lines',flow([['2013','Project Great Indian Bustard launched on 5 June '+V],['2018','National Conservation Breeding Centre at Jaisalmer set up with WII '+V],['2021 to 2024','Supreme Court orders on overhead lines in bustard habitat; March 2024 ruling recognises a right against climate change effects '+V],['Oct 2026','Union Environment Minister and CM begin release of captive-bred birds at Desert National Park'],['Next','Monitor survival, line undergrounding and solar-park siting']])+'<div class="note"><b>Check before exam.</b> The 2026 release is from a PIB-based report dated 4 October 2026. Confirm numbers and later outcomes from official releases.</div>')
  +sec('Flagship case: the Aravalli',flow([['20 Nov 2025','Supreme Court accepts a uniform definition: hills 100 m or more above local relief, plus ranges of hills within 500 m of each other; bans fresh leases until a plan is ready'],['Late Dec 2025','Protests in Udaipur, Jodhpur, Sikar and Alwar; the claim that only 1,048 of 12,081 Rajasthan hills qualify'],['29 Dec 2025','Court takes suo motu cognisance and stays its own judgment; no complete mining ban'],['21 Jan 2026','Court records Rajasthan’s assurance of no illegal mining and moves to form an expert committee'],['25 May 2026','Court wants wider public participation in the expert committee’s process'],['Now','Stay continues; fresh or renewed leases need Supreme Court permission']])+'<div class="note"><b>Case title.</b> In Re: Definition of Aravalli Hills and Ranges and Ancillary Issues, before a bench led by CJI Surya Kant. I could confirm the stay and the May 2026 hearing but not any later order; look up the latest before using it.</div>')
  +sec('Movements, laws and climate risks',tbl(['Item','Facts'],[
  ['Bishnoi tradition','Khejarli 1730; Rajasthan awards for wildlife protection are named after the community.'],
  ['Save Aravalli protests','Residents and activists oppose a height-based definition that would expose lower hills.'],
  ['Orans and sacred groves','Community-managed groves face pressure from solar and wind projects; the Supreme Court has addressed their protection '+V+'.'],
  ['Ramsar additions','Siliserh Lake (Alwar) is among recent Rajasthan designations '+V+'.'],
  ['Heat and drought','Heatwaves in Churu, Phalodi and Sri Ganganagar; falling water tables; groundwater over-extraction in many blocks.'],
  ['Flash floods','Intense, localised rain in desert districts; Jaisalmer and Barmer floods in recent monsoons '+V+'.']]))
  +sec('Mind map',mm('Rajasthan’s ecology',[['Habitats',['Thar','Aravalli','Hadoti forests','Wetlands']],['Tigers',['Ranthambore','Sariska','Mukundra','Ramgarh Vishdhari','Dholpur-Karauli']],['Birds',['Great Indian Bustard','Keoladeo','Sambhar flamingos']],['Law and cases',['Aravalli definition','Climate right 2024']],['Community',['Bishnoi','Orans']],['Climate',['Heat','Water table','Flash floods']]]))
  +exam(['Keoladeo: Ramsar (1981) and World Heritage Site (1985).','Great Indian Bustard: state bird, Desert National Park, power lines.','Aravalli definition: 100 m local relief and 500 m clustering; stayed.'],['Balance mining, livelihoods and ecology in the Aravalli.','How can renewable energy expansion avoid harming desert grasslands?'],['The Supreme Court’s November 2025 definition is stayed; do not present it as the operative rule.','The number of tiger reserves differs by source and date; use the stem.']);
};

P.society=function(){
  return facts([['Population','6,85,48,437 (2011)'],['Density','~200 per sq km'],['Sex ratio','~928 (2011)'],['Literacy','~66.1% (2011)'],['Urban share','~25% (2011)'],['Decadal growth','~21.4% (2001 to 2011)']])+'<div class="note"><b>Census note.</b> Figures here are from Census 2011 and need confirmation '+V+'. A newer Census cycle may change them.</div>'
  +sec('Religion and communities (Census 2011, approximate)','<div class="stack"><div style="width:88.5%;background:var(--accent)">Hindu 88.5%</div><div style="width:9.1%;background:var(--lat)"></div><div style="width:2.4%;background:var(--good)"></div></div><div class="leg"><span><i style="background:var(--lat)"></i>Muslim ~9.1%</span><span><i style="background:var(--good)"></i>Sikh, Jain, Christian and others ~2.4%</span></div><p class="cap">SC share is about 17.8% and ST share about 13.5% '+V+'.</p>')
  +sec('Society and tribes',ul(['Major Scheduled Tribes: Meena, Bhil, Garasia, Damor and Sahariya; Sahariya (Baran) is the only Particularly Vulnerable Tribal Group in the state '+V+'.','Southern Rajasthan (Banswara, Dungarpur, Pratapgarh, Udaipur) is the tribal belt; the Bharatiya Adivasi Party (BAP) has grown there, winning the Banswara Lok Sabha seat in 2024 '+V+'.','Jat, Rajput, Gurjar, Meena, Brahmin, Bishnoi and Mali communities shape local politics; Gurjar reservation agitations ran from 2006 to 2019 '+V+'. Treat caste facts carefully.','Rajasthan has a large Marwari business diaspora across India.']))
  +sec('Human development',tbl(['Theme','Notes'],[
  ['Health','Infant mortality about 29 per 1,000 live births in the 2025-26 Review; Right to Health Act 2022 and health-insurance schemes expanded access; AIIMS Jodhpur is a tertiary centre.'],
  ['Education','Kota coaching hub; IIT Jodhpur, MNIT Jaipur, BITS Pilani, Central University of Rajasthan; Rajasthan Coaching Centres (Control and Regulation) Act 2025 after student-suicide concerns '+V+'.'],
  ['Migration','Seasonal labour migration from south and west; remittances from Gulf; in-migration to Jaipur and Kota for study and work.'],
  ['Gender','Child marriage persists (Akha Teej weddings); female LFPR about 42%; Rajasthan has a rich history of women’s movements, from Bhanwari Devi to Vishaka.'],
  ['Water and nutrition','Women and girls bear water-carrying burdens in the desert; anaemia and nutrition remain concerns '+V+'.']]))
  +sec('Social movements and landmark cases',ul(['Roop Kanwar sati case, Deorala, 1987, led to the Commission of Sati (Prevention) Act, 1987 '+V+'.','Bhanwari Devi’s case (1992) led to Vishaka v State of Rajasthan (1997) and later the POSH Act 2013.','MKSS and the right to information campaign from the 1990s.','Gurjar and Meena reservation conflicts; Bhil and tribal autonomy demands for a Bhil Pradesh '+V+'.','Anti-conversion law protests by minority groups, September to October 2025.']))
  +sec('Mind map',mm('People of Rajasthan',[['Numbers',['6.85 crore','200 per sq km','25% urban']],['Faith and groups',['Hindu majority','Muslim 9%','Jain and Sikh']],['Tribes',['Meena','Bhil','Garasia','Sahariya PVTG']],['Development',['Literacy 66%','IMR 29','Kota coaching']],['Mobility',['Seasonal labour','Gulf remittances']],['Movements',['Bhanwari Devi','MKSS','Gurjar']]]))
  +exam(['Literacy about 66% (2011); sex ratio about 928.','Sahariya is Rajasthan’s PVTG.','Vishaka v State of Rajasthan, 1997.'],['Examine the social dimensions of water scarcity in Rajasthan.','Discuss how women’s movements in Rajasthan shaped national law.'],['Do not use 2011 figures as current estimates without saying so.']);
};

P.infrastructure=function(){
  return facts([['Airports','Jaipur (international), Jodhpur, Udaipur, Kishangarh, Bikaner, Jaisalmer '+V],['Railway HQ','North Western Railway, Jaipur'],['Expressway','Delhi-Mumbai Expressway (Dausa to Kota section)'],['Canals','Indira Gandhi, Gang, Bhakra, Narmada'],['Rail corridor','Western Dedicated Freight Corridor '+V],['Water transfer','PKC-ERCP, 17 districts',1]])
  +sec('Map of connectivity','<div class="two"><div><div class="tog" id="maptog3"></div>'+mapSVG(['relief','rivers','infra'])+'<div class="leg"><span>'+LEG.infra+'</span></div><p class="cap">Solid lines are highways, dashed lines are rail and canal, shown approximately.</p></div><div>'+tbl(['Asset','Key facts'],[
  ['Indira Gandhi Canal','About 650 km; draws Beas-Sutlej water from Harike; lifeline for Sri Ganganagar, Bikaner and Jaisalmer '+V+'.'],
  ['Gang Canal','Opened 1927 under Maharaja Ganga Singh of Bikaner; Sutlej water '+V+'.'],
  ['Narmada Canal','Brings Narmada water to Jalore and Barmer '+V+'.'],
  ['Delhi-Mumbai Expressway','Passes through Alwar, Dausa, Sawai Madhopur, Kota and Jhalawar districts '+V+'.'],
  ['DMIC','Delhi-Mumbai Industrial Corridor with Neemrana, Bhiwadi and Khushkhera nodes '+V+'.'],
  ['Bhadla Solar Park','Jodhpur district; one of the world’s largest solar parks '+V+'.'],
  ['Palace on Wheels','Luxury train launched in 1982 '+V+'.']])+'</div></div>')
  +sec('PKC-ERCP: from a state project to an inter-state link',flow([['2017','ERCP proposed to move surplus Chambal-basin water to 13 water-short districts'],['Jan 2024','Rajasthan, MP and Jal Shakti ministry sign MoU for the Modified PKC-ERCP link '+V],['2024 to 2025','DPR and appraisal; Rajasthan calls its portion Ramjal Setu, for 17 districts'],['2025 to 2026','First-phase work orders worth about Rs 9,600 crore reported'],['Next','Clearances, funding share (Centre bears a larger share if declared national), phased completion']])+'<div class="note"><b>Why it matters.</b> It is the largest drinking-water and irrigation project in eastern Rajasthan and a model case of inter-state river linking. Original ERCP targeted about 2.82 lakh hectares of irrigation. Check the latest cost and timeline before using numbers.</div>')
  +sec('Rail, air and roads',ul(['North Western Railway, headquartered in Jaipur, covers most of the state; Ajmer, Jodhpur, Bikaner and Kota are major junctions.','Jaipur is the main international airport; regional connectivity under UDAN at Kishangarh, Jaisalmer and others '+V+'.','National highways link Jaipur with Delhi, Ahmedabad and Agra; expressway and access-controlled corridors are expanding.','Jaipur Metro runs in the capital.']))
  +sec('Water and power',ul(['Dams: Bisalpur (Banas), Jawai (Pali), Jaisamand (Udaipur), Mahi Bajaj Sagar (Banswara), Kota Barrage and Rana Pratap Sagar on the Chambal.','Solar and wind lead new capacity; Rajasthan is among the top states for installed solar capacity '+V+'.','Nuclear: Rajasthan Atomic Power Station at Rawatbhata; a new four-unit project at Mahi Banswara was announced in 2025 '+V+'.','Thermal: Kota, Suratgarh and Chhabra plants.']))
  +sec('Mind map',mm('Connectivity',[['Air',['Jaipur','Jodhpur','Udaipur']],['Road',['DME','NH corridors']],['Rail',['NWR Jaipur','Western DFC']],['Canals',['IGNP','Gang','Narmada']],['Dams',['Bisalpur','Jawai','Kota Barrage']],['Pipeline',['PKC-ERCP','Rs 9,600 cr first phase']]]))
  +exam(['IGNP draws water from Harike barrage in Punjab.','Gang Canal 1927 from Sutlej; Bikaner’s Ganga Singh.','PKC-ERCP is in the Chambal basin.'],['Does inter-basin transfer solve scarcity in Rajasthan or move the problem?','Assess how solar parks and desert grasslands can coexist.'],['Do not confuse the Narmada canal (Jalore, Barmer) with the Chambal-based PKC-ERCP.']);
};

P.schemes=function(){
  return facts([['Health cover','MAA (Mukhyamantri Ayushman Arogya) '+V],['Girl child','Rajshree, Lado Protsahan '+V],['Youth','Yuva Sambal, skill and employment policies',1],['Water','Mukhyamantri Jal Swavlamban Abhiyan'],['Farm power','Kisan Mitra Urja Yojana '+V],['Budget theme','Service, Security and Good Governance',1]])
  +sec('State flagship schemes',tbl(['Scheme','Who and what','Notes'],[
  ['MAA Yojana','State health insurance with a high cover limit (Rs 25 lakh reported) after merging Chiranjeevi with Ayushman Bharat '+V+'.','Check current limit and coverage rules.'],
  ['Mukhyamantri Jal Swavlamban Abhiyan','Water harvesting structures and watershed work in villages, launched 2016 '+V+'.','Phase continues with new targets.'],
  ['Rajshree Yojana and Lado Protsahan','Staged cash support to girls from birth to higher education '+V+'.','Names and amounts change; verify before use.'],
  ['Mukhyamantri Yuva Sambal Yojana','Allowance for unemployed youth, with training '+V+'.','Linked to the Youth Policy 2025.'],
  ['Rajasthan Skill, Youth and Employment Policies','Skill Policy 2025, Youth Policy 2025 and Employment Policy 2026 set job and training targets.','Announced alongside the $350 billion economy target by 2029.']])+'<div class="note"><b>Budget 2026-27 pillars.</b> Ten pillars including roads (Rs 1,800 crore), drinking water (over Rs 5,000 crore), mentoring and incubation in colleges, and the Rajasthan State Testing Agency for exam integrity. No new taxes were announced.</div>')
  +sec('Central schemes and policy',ul(['PM-KUSUM and PM Surya Ghar for solar farm pumps and rooftop panels; Jal Jeevan Mission for tap water, vital in the desert.','Centrally sponsored schemes (PM-KISAN, MGNREGA, POSHAN) run through the state; central Special Assistance for Capital Investment gives Rs 15,000 crore in 2026-27 (about 28% of capital outlay, per PRS).','Industrial Park Policy 2026 (March 2026) and the Rajasthan Investment Promotion Scheme target manufacturing.','Rajasthan Coaching Centres Act 2025 regulates coaching hubs, particularly Kota '+V+'.','Platform Based Gig Workers Act 2023 gives gig workers a welfare fund '+V+'.']))
  +sec('Implementation challenges',ul(['Fertiliser and input supply: the opposition criticised delays in fertiliser availability in early 2026.','Leakage and targeting in cash and in-kind transfers; digital identity gaps among the elderly and tribal families.','Fiscal strain from subsidies (agriculture and power subsidies alone about Rs 42,191 crore in 2026-27).','Delivery in dispersed desert settlements; water and school access.','Political changes can rename or merge flagship schemes; check the latest notification.']))
  +sec('Mind map',mm('Welfare Rajasthan',[['Health',['MAA','Right to Health Act 2022']],['Women and girls',['Rajshree','Lado Protsahan']],['Youth and skills',['Skill Policy 2025','Youth Policy 2025','Employment Policy 2026']],['Water and farm',['Jal Swavlamban','Kisan Mitra Urja','PM-KUSUM']],['Industry',['Industrial Park Policy 2026','RIPS']],['Risks',['Subsidy bill','Delivery gaps']]]))
  +exam(['Know the difference between state-named schemes and centrally sponsored ones.','Jal Swavlamban Abhiyan is a water-harvesting mission.'],['Evaluate the role of conditional versus universal transfers in a high-subsidy, low-revenue state.','How can welfare schemes be aligned with water security in arid regions?'],['Scheme names and benefit amounts change often; always check the latest notification.']);
};

P.scitech=function(){
  return sec('Institutions',tbl(['Institution','Place','Remember'],[
  ['Central Arid Zone Research Institute (CAZRI, ICAR)','Jodhpur','Desert agriculture and land use research '+V],
  ['Central Sheep and Wool Research Institute (ICAR)','Avikanagar, Tonk','Wool and sheep breeding '+V],
  ['National Research Centre on Camel (ICAR)','Bikaner','Camel research '+V],
  ['National Research Centre on Seed Spices (ICAR)','Tabiji, Ajmer','Spice research '+V],
  ['IIT Jodhpur, MNIT Jaipur, BITS Pilani, AIIMS Jodhpur','Jodhpur, Jaipur, Pilani','Technical and medical education'],
  ['Rajasthan Atomic Power Station (NPCIL)','Rawatbhata, Chittorgarh','Nuclear power; a new Mahi Banswara project announced '+V],
  ['National Conservation Breeding Centre for GIB','Jaisalmer','Bustard captive breeding'],
  ['Jantar Mantar and Jaipur observatory','Jaipur','Sawai Jai Singh’s astronomy instruments; World Heritage Site']])+'<p class="cap">Pokhran test site and defence research facilities are strategic and are described only at textbook level.</p>')
  +sec('Energy and technology',ul(['Solar: Bhadla Solar Park and large utility-scale parks across Jodhpur, Jaisalmer and Bikaner '+V+'.','Wind: Jaisalmer and Barmer belts; bird-flight corridors are a conservation concern.','Oil and gas: Mangala-Bhagyam-Aishwariya fields in Barmer; a 9 MMTPA refinery at Pachpadra by HPCL '+V+'.','Semiconductor and electronics policies are planned in Jaipur and Bhiwadi clusters '+V+'.']))
  +sec('Geographical Indications (GI)',tbl(['Product','Year','Type'],[
  ['Kota Doria','2005','Textile; often cited as an early Rajasthan GI '+V],
  ['Sanganeri and Bagru hand block printing; Blue Pottery of Jaipur; Thewa art','2008','Craft '+V],
  ['Bikaneri Bhujia','2010','Food '+V],
  ['Sojat Mehndi and Mathania red chilli','2020 and 2021','Agricultural '+V]])+'<p class="cap">Confirm the full GI list and years against the Geographical Indications Registry before the exam.</p>')
  +sec('Mind map',mm('Science in Rajasthan',[['Desert research',['CAZRI','Camel centre','Seed spices']],['Nuclear',['Rawatbhata','Mahi Banswara']],['Energy',['Bhadla solar','Wind','Barmer oil']],['Education',['IIT Jodhpur','MNIT','AIIMS Jodhpur','BITS']],['Heritage science',['Jantar Mantar']],['GI',['Kota Doria','Bikaneri Bhujia','Sanganeri print']]]))
  +exam(['CAZRI is at Jodhpur; CSWRI is at Avikanagar.','Rawatbhata hosts RAPS.','Jantar Mantar is a World Heritage Site since 2010.'],['Role of ICAR institutes in dryland agriculture.','Can Rajasthan become a clean-energy manufacturing hub?'],['Do not confuse CAZRI (arid zone) with CIAH (arid horticulture) at Bikaner.']);
};

P.current=function(){
  return '<div class="note"><b>As of 2 November 2026.</b> Items are drawn from news reports found in October and November 2026. Treat dates as indicative and verify before using in answers.</div>'
  +sec('What is live',tbl(['Issue','Where it stands','Section'],[
  ['Aravalli definition','Supreme Court stayed its Nov 2025 definition on 29 Dec 2025; an expert committee is being formed; the court wants wider public consultation (25 May 2026); fresh or renewed leases need its permission.','Environment'],
  ['Panchayat elections','State Election Commission announced four-phase polls on 3 Oct 2026 for 14,403 gram panchayats, 457 samitis and 41 zila parishads; counting for samitis and ZPs on 20 Nov; some districts follow after 22 Dec; the two-child norm was reported removed.','Governance'],
  ['Local-body delays','High Court had set 15 April 2026; the Supreme Court declined to interfere; OBC commission and delimitation delayed polls.','Governance'],
  ['PKC-ERCP (Ramjal Setu)','First-phase work orders worth about Rs 9,600 crore reported; link covers 17 districts.','Infrastructure'],
  ['Budget 2026-27 and CAG','Fiscal deficit target 3.69% of GSDP; CAG noted repeated breaches over 12 years (Aug 2026).','Economy'],
  ['Rising Rajasthan MoUs','Over Rs 8 lakh crore reported grounded; November 2026 target; Rising Rajasthan to return in 2026 per CM.','Economy'],
  ['Anti-conversion law','Act in force since Oct 2025 with life term and Rs 50 lakh fine provisions; four petitions pending before the Supreme Court; first case registered in Kota.','Society'],
  ['District map','41 districts, 7 divisions after 2024 abolitions; protests followed; sub-district registers updated Jan 2026.','Governance'],
  ['Great Indian Bustard','Union Environment Minister and CM initiated release of captive-bred birds in Desert National Park (4 Oct 2026 report).','Environment'],
  ['Industrial and employment policy','Industrial Park Policy 2026 (March 2026) and Employment Policy 2026; target of a $350 billion economy by 2029.','Economy']]))
  +sec('Likely exam angles',ul(['Ecology versus mining in the Aravalli and the role of the Supreme Court’s suo motu jurisdiction.','Federalism and river linking: PKC-ERCP and Chambal basin sharing.','Local democracy: delayed panchayat and municipal elections, Article 243E and 243K.','Civil liberties versus conversion regulation: Article 25 and state laws.','Fiscal federalism: FRBM norms and state deficits.']))
  +exam(['Know the case title for the Aravalli matter and the status (stayed).','Article 243K (State Election Commission) and 243E (duration of panchayats).'],['Prepare a 150-word note on each live issue with one data point and one constitutional or legal hook.'],['Do not cite a hearing outcome you have not read.']);
};

var MCQ=[
['Panchayati Raj in India was first launched at which place on 2 October 1959?',['Jaipur','Nagaur','Bikaner','Ajmer'],1,'Nehru launched it at Nagaur, Rajasthan, following the Balwant Rai Mehta Committee.'],
['The highest peak of the Aravalli range, in Rajasthan, is:',['Guru Shikhar','Jarga','Taragarh','Raghunathgarh'],0,'Guru Shikhar at Mount Abu is about 1,722 m.'],
['Which Rajasthan wetland is both a Ramsar site (1981) and a World Heritage Site (1985)?',['Sambhar Lake','Keoladeo National Park','Pichola Lake','Siliserh Lake'],1,'Keoladeo NP at Bharatpur; Sambhar became a Ramsar site in 1990.'],
['The Supreme Court’s November 2025 definition of the Aravalli, later stayed, was based mainly on:',['Hills 100 m or more above local relief and ranges of hills within 500 m','Any hill above 30 m','Only hills in Rajasthan and Haryana','Only forest-covered land'],0,'The court stayed its own order on 29 December 2025 and took the matter up suo motu.'],
['Vishaka v State of Rajasthan (1997) laid down guidelines on:',['Child labour','Sexual harassment at the workplace','Land acquisition','Bonded labour'],1,'The case arose from the Bhanwari Devi incident and led to the POSH Act 2013.'],
['As per the current map, Rajasthan has how many districts and divisions?',['33 districts, 7 divisions','50 districts, 10 divisions','41 districts, 7 divisions','41 districts, 10 divisions'],2,'Nine districts and three divisions created in 2023 were abolished on 28 December 2024.'],
['Under Article 164(1A), the maximum size of the Council of Ministers in Rajasthan (200 MLAs) is:',['24','30','36','40'],1,'15% of the strength of the House, so 30.'],
['The Indira Gandhi Canal draws water from which barrage?',['Bhakra','Harike','Ferozepur','Pong'],1,'Harike, at the confluence of the Beas and Sutlej in Punjab.'],
['The Modified PKC-ERCP link mainly uses surplus water of which river system?',['Luni','Chambal','Mahi','Banas alone'],1,'Parbati, Kalisindh and Chambal sub-basins feed the link.'],
['The Khejarli massacre of 1730, linked to tree protection, is associated with which community?',['Meena','Bishnoi','Bhil','Gurjar'],1,'Amrita Devi and others died protecting khejri trees; it is seen as a forerunner of Chipko.']
];
var MAINS=[
['Examine how the integration of princely states created Rajasthan, and why it took eight years.',['Intro: 22 states plus Ajmer-Merwara.','Body: seven stages, Matsya Union, Mewar, Jaipur-Jodhpur-Bikaner-Jaisalmer, Sirohi, 1956 changes.','Conclusion: lessons for federal consolidation.']],
['Water scarcity defines Rajasthan’s development. Discuss the role of canals and inter-basin transfers.',['Intro: 10% area, about 1% surface water.','Body: IGNP, Gang, Narmada canals, PKC-ERCP, Jal Swavlamban.','Conclusion: demand management, groundwater governance.']],
['Evaluate the Aravalli definition controversy as a conservation-development conflict.',['Intro: Nov 2025 definition and Dec 2025 stay.','Body: 1,048 of 12,081 hills, mining revenue, ecological services, suo motu.','Conclusion: science-based mapping, community voice.']],
['Why are local-body elections frequently delayed, and what does it say about democratic decentralisation?',['Intro: Articles 243E and 243K.','Body: delimitation, OBC data, HC and SC orders, 2026 schedule.','Conclusion: time-bound reforms and independent delimitation.']],
['Assess Rajasthan’s fiscal position using Budget 2026-27 and the CAG’s observations.',['Intro: GSDP, deficit 3.69%.','Body: revenue deficit, subsidies, capital outlay, SASCI.','Conclusion: FRBM path and quality of expenditure.']],
['Discuss the strategic importance of Rajasthan for India’s western security and energy needs.',['Intro: border with Pakistan, Pokhran.','Body: air bases, ranges, solar, refinery, Indus Waters.','Conclusion: balancing security with livelihoods and ecology.']]
];
P.upsc=function(){
  return sec('Constitutional map',tbl(['Provision','Relevance to Rajasthan'],[
  ['Art. 3 and 4; States Reorganisation Act 1956','Present boundaries from 1 November 1956; 7th Amendment'],
  ['Art. 164(1A)','Council of Ministers capped at 15% of Assembly strength; 30 for 200 seats'],
  ['Art. 243D, 243E, 243K','Reservations, five-year term and State Election Commission; central to the 2025 to 2026 local-body case'],
  ['Fifth Schedule and Art. 244','Scheduled Areas of southern Rajasthan; Tribes Advisory Council'],
  ['Art. 262','Inter-state river disputes: Chambal basin, Yamuna, Ravi-Beas'],
  ['Art. 21 and Art. 14','Vishaka (1997); climate-change right (2024 Supreme Court ruling on bustard habitat)'],
  ['Art. 25','Anti-conversion law challenge'],
  ['Tenth Schedule','BSP merger cases in 2009 and 2019; the 2020 rebellion in the ruling party'],
  ['Art. 48A and Art. 51A(g)','Environment protection and the Aravalli matter']]))
  +sec('Compare large neighbouring states',tbl(['','Rajasthan','Gujarat','Madhya Pradesh'],[
  ['Formation (present form)','1 Nov 1956','1 May 1960','1 Nov 1956'],['Area rank','1st','5th','2nd'],['Assembly strength','200','182','230'],['Max ministers (15%)','30','27','34'],['Capital','Jaipur','Gandhinagar','Bhopal']])+'<p class="cap">Gujarat and Madhya Pradesh numbers are standard figures included for comparison and should be checked '+V+'.</p>')
  +sec('Map-based practice',ul(['Ranthambore, Sariska, Mukundra Hills, Ramgarh Vishdhari, Dholpur-Karauli, Keoladeo, Desert NP, Tal Chhapar, Mount Abu, Kumbhalgarh.','Chambal, Banas, Luni, Mahi, Ghaggar, Indira Gandhi Canal, Sambhar, Pichola.','Pokhran, Longewala, Jaisalmer, Mahajan range, Barmer refinery, Bhadla, Rawatbhata.','Kalibangan, Ahar, Chittorgarh, Kumbhalgarh, Ranthambore fort, Amer, Jaisalmer, Mehrangarh.','Nagaur (Panchayati Raj), Khejarli, Bijolia, Mangarh, Pushkar.']))
  +sec('Practice MCQs (original, exam-style)',MCQ.map(function(q,i){return '<div class="q" data-a="'+q[2]+'"><p class="qt">Q'+(i+1)+'. '+q[0]+'</p>'+q[1].map(function(o,j){return '<button class="o" data-o="'+j+'">'+String.fromCharCode(65+j)+'. '+o+'</button>'}).join('')+'<div class="ex2"><b>Answer: '+String.fromCharCode(65+q[2])+'.</b> '+q[3]+'</div></div>'}).join('')+'<p class="cap">These are original practice questions. I did not copy past UPSC papers; add the real PYQs from the UPSC archive next to each topic.</p>')
  +sec('Mains answer skeletons',MAINS.map(function(m){return '<div class="q done" style="background:var(--mai-soft)"><p class="qt">'+m[0]+'</p>'+ul(m[1])+'</div>'}).join(''))
  +sec('Rapid-fire fact sheet',ul(['Largest state by area; present form 1 November 1956; Rajasthan Day 30 March.','Panchayati Raj at Nagaur, 2 October 1959.','Guru Shikhar 1,722 m; Thar about 61%; Chambal is the only perennial river.','Keoladeo: Ramsar 1981, WHS 1985; Sambhar: Ramsar 1990.','Pokhran: 1974 and 1998; Longewala: December 1971.','Aravalli definition: 20 Nov 2025 order stayed 29 Dec 2025.','41 districts and 7 divisions after 28 Dec 2024.','Economy 2025-26 AE: GSDP Rs 18.75 lakh crore; PCI Rs 2,02,349; rank 7th.']));
};

/* ---------- revision deck ---------- */
var CARDS=[
['history','When was present-day Rajasthan formed?','1 November 1956, with the States Reorganisation Act; Rajasthan Day is observed on 30 March (Greater Rajasthan, 1949).'],
['history','What was the first stage of integration?','Matsya Union on 18 March 1948 (Alwar, Bharatpur, Dholpur, Karauli).'],
['history','Which battle in 1576 involved Maharana Pratap?','Haldighati, against Mughal forces led by Man Singh of Amber.'],
['history','Which Harappan site is in Hanumangarh?','Kalibangan.'],
['history','What is the Khejarli massacre?','1730 event in Marwar where Bishnois led by Amrita Devi died protecting khejri trees.'],
['history','Who founded Jaipur and when?','Sawai Jai Singh II, in 1727.'],
['physical','Highest point in Rajasthan?','Guru Shikhar, Mount Abu, about 1,722 m.'],
['physical','Share of area covered by the Thar region?','About 61% (textbook figure; confirm).'],
['physical','Only perennial river of the state?','Chambal.'],
['physical','India’s largest inland saline lake?','Sambhar Lake, Ramsar site since 1990.'],
['physical','Where does the Luni river end?','In the Rann of Kutch, after flowing through the desert districts.'],
['geopolitics','Where were India’s nuclear tests held in 1974 and 1998?','Pokhran, Rajasthan.'],
['geopolitics','Which canal brings Punjab river water to the Thar?','Indira Gandhi Canal, fed from Harike barrage.'],
['governance','How many districts and divisions does Rajasthan have now?','41 districts and 7 divisions.'],
['governance','Who is the CM and who are the Deputy CMs?','Bhajan Lal Sharma; Diya Kumari and Prem Chand Bairwa.'],
['governance','What happened in the 2023 Assembly election?','BJP won 115 of 199 seats polled; Congress about 69.'],
['governance','Where was Panchayati Raj launched?','Nagaur, 2 October 1959.'],
['economy','Rajasthan’s GSDP in 2025-26 AE?','Rs 18.75 lakh crore at current prices, growth 10.24%; 7th in India.'],
['economy','Rajasthan’s per capita income?','Rs 2,02,349 current and Rs 1,03,189 constant (2025-26 AE); below India’s average.'],
['economy','Budget 2026-27 fiscal deficit target?','3.69% of GSDP, Rs 79,492.52 crore.'],
['environment','Which Rajasthan site is a Ramsar site and a World Heritage Site?','Keoladeo National Park, Bharatpur.'],
['environment','State bird of Rajasthan?','Great Indian Bustard (Godawan), critically endangered.'],
['environment','What did the Supreme Court do on 29 Dec 2025 regarding Aravalli?','Stayed its Nov 2025 definition and took up the matter suo motu.'],
['society','Rajasthan’s literacy in Census 2011?','About 66.1% (male about 79.2%, female about 52.1%).'],
['society','Which case led to the Vishaka guidelines?','Vishaka v State of Rajasthan, 1997, following the Bhanwari Devi case.'],
['infrastructure','Which expressway crosses eastern Rajasthan?','Delhi-Mumbai Expressway, through Dausa, Sawai Madhopur, Kota and Jhalawar.'],
['infrastructure','What is PKC-ERCP?','Modified Parbati-Kalisindh-Chambal link merged with ERCP; Rajasthan calls its part Ramjal Setu, for 17 districts.'],
['schemes','Name two Rajasthan state schemes.','MAA Yojana (health) and Mukhyamantri Jal Swavlamban Abhiyan (water); verify current names.'],
['scitech','Where is CAZRI?','Jodhpur; it is the ICAR institute for arid zone research.'],
['scitech','First GI-tagged Rajasthan product often cited?','Kota Doria (2005); confirm from the GI registry.'],
['current','What happened on 3 October 2026?','The State Election Commission announced four-phase panchayat polls; counting for samitis and ZPs on 20 November.'],
['upsc','What caps the number of ministers in Rajasthan?','Article 164(1A): 15% of 200 seats, so 30.']
];
function foot(){
  return '<footer class="foot"><p><b>About the numbers.</b> A green <i class="live" style="position:static">2026</i> tag marks figures checked against 2026 sources on 2 November 2026. An amber <i class="vf">verify</i> tag marks textbook-level facts to confirm. Everything else is standard material; check the Rajasthan Economic Review, Census and NCERT before the exam.</p><p style="margin:10px 0 0"><b>Sources</b></p><ul>'
  +[['PRS: Rajasthan Budget Analysis 2026-27','https://prsindia.org/budgets/states/rajasthan-budget-analysis-2026-27'],['Drishti: Rajasthan Economic Review 2025-26','https://www.drishtiias.com/state-pcs-current-affairs/rajasthan-economic-review-2025-26'],['RAS Rajasthan: GSDP and per capita income','https://rajras.in/economic-growth-indicators-of-rajasthan-state-domestic-product-per-capita-income/'],['RAS Rajasthan: fiscal management and deficits','https://rajras.in/state-budget-fiscal-management-and-budget-deficits/'],['Drishti: Rajasthan Budget 2026-27','https://www.drishtiias.com/state-pcs-current-affairs/rajasthan-budget-2026-27'],['NewKerala: CAG on fiscal deficit breaches','https://www.newkerala.com/news/a/rajasthans-fiscal-woes-persist-across-governments-cag-flags-696.htm'],['LiveLaw: Aravalli hearing, Jan 2026','https://www.livelaw.in/amp/top-stories/aravalli-hills-supreme-court-records-rajasthans-assurance-to-ensure-no-illegal-mining-proposes-to-form-expert-committee-519872'],['Outlook Business: SC stays Aravalli redefinition','https://www.outlookbusiness.com/planet/climate/supreme-court-stays-aravalli-redefinition-mining-ban'],['ETV Bharat: panchayat polls schedule','https://www.etvbharat.com/en/state/panchayat-elections-in-rajasthan-to-be-held-in-four-phases-from-october-23-enn26100304266'],['Business Standard: panchayat polls 2026','https://www.business-standard.com/amp/elections/rajasthan-elections/rajasthan-panchayat-polls-2026-to-be-held-in-4-phases-from-october-23-126100300581_1.html'],['Bharat Notes: administrative machinery','https://bharatnotes.com/ras/polity-administration-rajasthan/administrative-machinery-secretariat-to-tehsil/'],['Drishti: 9 districts dissolved','https://drishtiias.com/state-pcs-current-affairs/rajasthan-government-dissolves-9-districts'],['Drishti: anti-conversion law','https://www.drishtiias.com/state-pcs-current-affairs/rajasthan-anti-conversion-law-comes-into-force'],['Statesman: SC notice on anti-conversion law','https://www.thestatesman.com/india/sc-issues-notice-to-rajasthan-govt-on-challenge-to-2025-anti-conversion-law-1503519240.html'],['ThePrint: ERCP MoU','https://theprint.in/politics/decks-cleared-for-eastern-rajasthan-canal-project-ahead-of-ls-polls-doing-politics-says-congress/1944811'],['Swarajya: ERCP and Chambal link','https://swarajyamag.com/amp/story/infrastructure/centre-to-merge-eastern-rajasthan-canal-project-and-chambal-river-link-to-ensure-supply-in-water-scarce-districts-of-rajasthan'],['NewKerala: Rising Rajasthan grounding','https://www.newkerala.com/news/a/rising-rajasthan-summit-investment-proposals-worth-over-rs-663.htm'],['ThePrint: Governor, CM and LoP, Jan 2026','https://theprint.in/india/guv-bagde-cm-sharma-lop-jully-unfurl-national-flags-as-rajasthan-marks-republic-day/2836851'],['Superkalam: bustard release, 4 Oct 2026','https://superkalam.com/current-affairs/04-10-2026/in-culmination-of-10-years-of-dedicated-efforts-union-environment-minister-and-cm-rajasthan-initiate-the-process-for-release-of-captive-bred-great-indian-bustards-into-the-wild-at-desert-national-park-jaislamer-eeaed7ad-03bc-4e16-9d78-3bb2b7a4728a']].map(function(s){return '<li><a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a></li>'}).join('')+'</ul></footer>';
}


const dossier = { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG };

export { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG };
export default dossier;
