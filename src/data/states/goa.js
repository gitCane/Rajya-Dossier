const V='<i class="vf" title="Recalled from standard sources. Confirm before relying on it.">verify</i>';

var DIMS=[
['physical','Physical Geography','Relief, rivers, climate','Location, boundaries, area, physiographic divisions, mountains, plateaus, plains, rivers, lakes, climate, soils, vegetation, biodiversity and natural resources.'],
['history','History & Culture','1510 to 1987','Ancient, medieval and modern history, dynasties, kingdoms, colonial rule, freedom struggle, tribal movements, archaeological sites, architecture, festivals, languages, literature and personalities.'],
['geopolitics','Geopolitics & Strategic Importance','Arabian Sea gateway','International borders, neighbouring countries, maritime importance, ports, trade routes, strategic corridors, military installations where relevant, border disputes and security concerns.'],
['governance','Governance & Administration','40-seat assembly','Formation of state, constitutional provisions, Governor, Chief Minister, Legislature, High Court, administrative divisions, Panchayati Raj, municipalities, governance innovations and important state institutions.'],
['economy','Economy','GSDP, mining, tourism','GSDP, per capita income, agriculture, industries, services, minerals, exports, tourism, infrastructure, employment, investment, state finances and economic challenges.'],
['environment','Environment & Ecology','Ghats and estuaries','National parks, wildlife sanctuaries, biosphere reserves, Ramsar sites, tiger reserves, endemic species, ecological hotspots, environmental movements, conservation projects and climate vulnerabilities.'],
['society','Society & Human Development','Census and indicators','Population, demographics, tribes, caste composition where relevant, literacy, health, education, migration, urbanisation, gender issues, social movements and human development.'],
['infrastructure','Infrastructure & Connectivity','Mopa, Zuari, Konkan','Highways, railways, airports, ports, inland waterways, industrial corridors, logistics, power projects, irrigation and connectivity projects.'],
['schemes','Government Schemes & Policies','Welfare and policy','State-specific flagship schemes, central schemes implemented in the state, policy innovations, welfare programmes and implementation challenges.'],
['scitech','Science, Technology & Research','Institutes and GI tags','Research institutions, space and defence facilities, agricultural universities, technological hubs, GI products, scientific discoveries and innovation clusters.'],
['current','Current Affairs & Emerging Issues','Live issues, Nov 2026','Important state-related developments, Supreme Court cases, environmental clearances, projects, political developments relevant to governance, reports, committees and national news.'],
['upsc','UPSC Examination Integration','Articles, MCQs, Mains','Previous year questions, probable Prelims MCQs, Mains dimensions, map-based questions, inter-state comparisons, relevant constitutional articles and important facts.']
];
var HUBS=['Physical','History & Culture','Geopolitics','Governance','Economy','Environment','Society','Infrastructure','Schemes','Sci & Tech','Current Affairs','UPSC Hub'];
var HUBSUB=['3,702 sq km','1510 to 1987','Arabian Sea gateway','40-seat assembly','Rs 7.09 lakh per capita','1 NP, 6 WLS','88.7% literate (2011)','Mopa, Zuari, Konkan','Griha Aadhar, DSSS','CSIR-NIO, GI tags','Mhadei, 2027 polls','Art. 371-I'];
var ORDER=['goa'].concat(DIMS.map(function(d){return 'goa-'+d[0]})).concat(['goa-revision']);
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

/* ---------- schematic map of Goa ---------- */
var COAST=[[73.685,15.74],[73.70,15.69],[73.715,15.64],[73.735,15.605],[73.745,15.57],[73.755,15.535],[73.765,15.505],[73.79,15.485],[73.80,15.455],[73.79,15.415],[73.81,15.385],[73.84,15.37],[73.88,15.33],[73.905,15.28],[73.93,15.235],[73.95,15.17],[73.99,15.10],[74.02,15.04],[74.04,14.98],[74.07,14.91],[74.10,14.895]];
var INLAND=[[74.14,14.90],[74.20,14.96],[74.25,15.05],[74.28,15.15],[74.31,15.28],[74.33,15.40],[74.28,15.52],[74.20,15.62],[74.15,15.70],[74.10,15.76],[73.98,15.79],[73.85,15.78],[73.75,15.77]];
var RIV={
mandovi:[[74.27,15.45],[74.20,15.50],[74.12,15.50],[74.03,15.47],[73.95,15.49],[73.88,15.50],[73.80,15.49]],
zuari:[[74.25,15.22],[74.15,15.24],[74.07,15.30],[74.00,15.35],[73.92,15.40],[73.86,15.41],[73.79,15.40]],
chapora:[[74.10,15.70],[74.00,15.66],[73.92,15.62],[73.84,15.60],[73.74,15.60]],
terekhol:[[74.05,15.77],[73.92,15.76],[73.80,15.76],[73.69,15.74]],
cumb:[[73.95,15.49],[73.94,15.45],[73.93,15.42]],
sal:[[74.00,15.25],[73.95,15.22],[73.92,15.17]],
talpona:[[74.15,15.04],[74.10,15.02],[74.04,14.99]],
galgi:[[74.12,14.95],[74.07,14.92]]
};
function px(p){return [((p[0]-73.62)*520).toFixed(1),((15.84-p[1])*520).toFixed(1)]}
function pts(a){return a.map(function(p){return px(p).join(',')}).join(' ')}
function circ(lon,lat,r,cls,title){var q=px([lon,lat]);return '<circle class="'+cls+'" cx="'+q[0]+'" cy="'+q[1]+'" r="'+r+'"><title>'+title+'</title></circle>'}
function lbl(lon,lat,t,cls,dx,dy,anchor){var q=px([lon,lat]);return '<text class="m-lbl '+(cls||'')+'" x="'+(+q[0]+(dx||0))+'" y="'+(+q[1]+(dy||0))+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+t+'</text>'}
function mapSVG(L){
  var has=function(k){return L.indexOf(k)>-1};
  var s='<svg viewBox="0 0 420 520" role="img" aria-label="Schematic map of Goa"><defs><linearGradient id="rel" x1="0" x2="1"><stop offset="0" style="stop-color:var(--rl)"/><stop offset=".55" style="stop-color:var(--rl)"/><stop offset="1" style="stop-color:var(--rh)"/></linearGradient></defs>';
  s+='<rect class="m-sea" x="0" y="0" width="420" height="520" rx="10"/>';
  s+='<polygon class="m-land" fill="'+(has('relief')?'url(#rel)':'var(--rl)')+'" points="'+pts(COAST.concat(INLAND))+'"/>';
  if(has('rivers')){
    s+='<polyline class="m-riv" points="'+pts(RIV.mandovi)+'"/><polyline class="m-riv" points="'+pts(RIV.zuari)+'"/><polyline class="m-riv" points="'+pts(RIV.chapora)+'"/>';
    s+=['terekhol','cumb','sal','talpona','galgi'].map(function(k){return '<polyline class="m-riv minor" points="'+pts(RIV[k])+'"/>'}).join('');
    s+=lbl(74.10,15.505,'Mandovi','riv',0,-5)+lbl(74.08,15.30,'Zuari','riv',6,-2)+lbl(73.97,15.655,'Chapora','riv',0,-4)+lbl(73.86,15.765,'Terekhol','riv',0,-3)+lbl(73.935,15.45,'Cumbarjua','riv',6,0);
  }
  if(has('relief')){s+=lbl(74.20,15.575,'▲ Sonsogor 1,167 m','',-60,0)+lbl(74.27,15.31,'WESTERN GHATS','nb',-22,40);}
  if(has('cities')){
    [['Panaji',73.83,15.495,-4,-6,'end'],['Margao',73.955,15.275,6,4],['Vasco',73.81,15.395,-6,10,'end'],['Mapusa',73.81,15.59,6,3],['Ponda',74.015,15.40,6,4],['Valpoi',74.13,15.53,6,12],['Canacona',74.05,15.01,6,4]].forEach(function(c){s+=circ(c[1],c[2],3,'m-dot',c[0])+lbl(c[1],c[2],c[0],'',c[3],c[4],c[5])});
  }
  if(has('pa')){
    s+=circ(74.22,15.37,24,'m-pa','Bhagwan Mahavir WLS and Mollem NP');
    s+=circ(74.22,15.60,17,'m-tig','Mhadei WLS (proposed tiger reserve core)');
    s+=circ(74.17,15.17,15,'m-pa','Netravali WLS');
    s+=circ(74.19,15.00,10,'m-pa','Cotigao WLS');
    s+=circ(74.105,15.43,5,'m-pa','Bondla WLS');
    s+=circ(73.88,15.515,4,'m-pa','Dr Salim Ali WLS, Chorao');
    s+=circ(74.10,15.26,3,'m-ts','Nanda Lake, Ramsar site');
    s+=circ(73.735,15.63,3,'m-ts','Morjim, Olive Ridley nesting');
    s+=circ(74.065,14.955,3,'m-ts','Galgibaga, Olive Ridley nesting');
    s+=lbl(74.22,15.37,'Mollem NP /','',0,-6,'middle')+lbl(74.22,15.37,'B. Mahavir WLS','',0,4,'middle')+lbl(74.22,15.60,'Mhadei','',0,3,'middle')+lbl(74.17,15.17,'Netravali','',0,3,'middle')+lbl(74.19,15.00,'Cotigao','',0,3,'middle')+lbl(74.105,15.43,'Bondla','',0,-8,'middle')+lbl(73.88,15.515,'Salim Ali','',-6,-8,'end')+lbl(74.10,15.26,'Nanda Lake','',-6,12,'end');
  }
  if(has('infra')){
    s+='<polyline class="m-hwy" points="'+pts([[73.82,15.77],[73.82,15.60],[73.84,15.50],[73.90,15.39],[73.95,15.27],[74.00,15.10],[74.07,14.93]])+'"/>';
    s+='<polyline class="m-rail" points="'+pts([[73.99,15.78],[74.00,15.60],[73.96,15.40],[73.955,15.275],[74.05,15.02],[74.10,14.94]])+'"/>';
    s+='<polyline class="m-rail" points="'+pts([[74.33,15.33],[74.20,15.33],[74.07,15.38],[73.91,15.37],[73.81,15.39]])+'"/>';
    s+=circ(73.87,15.73,5,'m-inf','Manohar International Airport, Mopa')+circ(73.83,15.38,5,'m-inf','Dabolim airport and INS Hansa')+circ(73.795,15.415,4,'m-inf','Mormugao Port')+circ(73.90,15.395,4,'m-inf','New Zuari Bridge')+circ(73.84,15.50,4,'m-inf','Atal Setu')+circ(74.31,15.31,4,'m-inf','Dudhsagar Falls');
    s+=lbl(73.87,15.73,'Mopa airport','',8,-6)+lbl(73.83,15.38,'Dabolim','',-8,18,'end')+lbl(73.795,15.415,'Mormugao Port','',-8,0,'end')+lbl(73.90,15.395,'Zuari Bridge','',8,-6)+lbl(73.84,15.50,'Atal Setu','',-8,-10,'end')+lbl(74.31,15.31,'Dudhsagar','',-6,-6,'end');
  }
  if(has('geo')){
    s+=lbl(73.95,15.84,'MAHARASHTRA (Sindhudurg)','nb',0,0,'middle')+lbl(74.30,15.08,'KARNATAKA','nb',-6,0,'end')+lbl(74.30,15.07,'(Belagavi, Uttara Kannada)','nb',-6,10,'end');
    s+=circ(73.83,15.38,5,'m-inf','INS Hansa naval air station, Dabolim')+circ(73.795,15.415,4,'m-inf','Mormugao Port')+circ(73.78,15.395,4,'m-inf','Goa Shipyard, Vasco');
    s+=lbl(73.83,15.38,'INS Hansa','',-8,18,'end')+lbl(73.795,15.415,'Mormugao Port','',-8,0,'end');
    s+=circ(73.80,15.46,4,'m-inf','Dona Paula, CSIR-NIO')+lbl(73.80,15.46,'NIO, Dona Paula','',-8,2,'end');
  }
  s+='<text class="m-lbl sea" x="34" y="270" transform="rotate(-90 34 270)" text-anchor="middle">ARABIAN SEA</text>';
  s+='<g transform="translate(372,38)"><text class="pt s" text-anchor="middle" y="-8">N</text><path d="M0,-4 L5,12 L0,8 L-5,12Z" fill="var(--ink)"/></g>';
  s+='<g transform="translate(24,496)"><line x1="0" y1="0" x2="52" y2="0" stroke="var(--ink)" stroke-width="2"/><text class="pt s" x="0" y="-5">~ 10 km</text></g></svg>';
  return s;
}
var LEG={relief:'<i style="background:var(--rh)"></i>Higher ground (Ghats)',rivers:'<i style="background:var(--accent)"></i>Rivers',pa:'<i style="background:var(--good)"></i>Protected areas',tig:'<i style="background:var(--lat)"></i>Mhadei tiger-reserve core (proposed)',ts:'<i style="background:var(--pyq)"></i>Ramsar site, turtle beaches',infra:'<i style="background:var(--lat)"></i>Airports, ports, bridges'};

/* ---------- profile (west to east) ---------- */
function profile(){
  var E=[[60,0],[120,15],[180,40],[230,90],[280,60],[320,110],[360,90],[400,160],[450,400],[500,820],[545,1167],[580,950],[620,800],[640,760]];
  var d='M0,190 L60,190 '+E.map(function(p){return 'L'+p[0]+','+(190-p[1]*0.13).toFixed(1)}).join(' ')+' L640,190 Z';
  return '<svg viewBox="0 0 640 240" role="img" aria-label="West to east relief profile of Goa"><rect x="0" y="0" width="60" height="190" class="m-sea"/><path class="pz" d="'+d+'"/>'
  +'<line class="m-ax" x1="0" y1="190" x2="640" y2="190"/>'
  +'<text class="pt" x="8" y="120">Arabian</text><text class="pt" x="8" y="134">Sea</text>'
  +'<g class="pt s"><text x="62" y="212">COASTAL BELT 0 to 30 m</text><text x="215" y="226">MIDLAND PLATEAU 30 to 100 m</text><text x="430" y="212">WESTERN GHATS up to 1,167 m</text></g>'
  +'<g stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3"><line x1="140" y1="150" x2="140" y2="200"/><line x1="390" y1="100" x2="390" y2="200"/></g>'
  +'<text class="pt" x="470" y="48">Sonsogor 1,167 m</text><text class="pt s" x="470" y="62">highest point in Goa</text>'
  +'<text class="pt s" x="150" y="150">estuaries, khazans,</text><text class="pt s" x="150" y="162">sandy beaches</text>'
  +'<text class="pt s" x="250" y="100">laterite plateaus,</text><text class="pt s" x="250" y="112">mining belt</text></svg>';
}

/* ---------- radial hub ---------- */
function radial(){
  var s='<svg viewBox="0 0 800 700" role="img" aria-label="Mind map of the 12 Goa dossier sections; each box links to its page">';
  var cx=400,cy=350,rx=290,ry=262;
  for(var i=0;i<12;i++){var a=(-90+i*30)*Math.PI/180;var x=cx+rx*Math.cos(a),y=cy+ry*Math.sin(a);s+='<line class="ln" x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'"/>'}
  s+='<circle class="cn" cx="'+cx+'" cy="'+cy+'" r="66"/><text class="ct" x="'+cx+'" y="'+(cy+4)+'" text-anchor="middle">GOA</text><text class="cs" x="'+cx+'" y="'+(cy+24)+'" text-anchor="middle">STATE DOSSIER</text>';
  for(var j=0;j<12;j++){var b=(-90+j*30)*Math.PI/180;var X=cx+rx*Math.cos(b),Y=cy+ry*Math.sin(b);
    s+='<a href="#goa-'+DIMS[j][0]+'"><g class="nd" transform="translate('+(X-78).toFixed(1)+','+(Y-27).toFixed(1)+')"><rect width="156" height="54" rx="10"/><text class="nn" x="12" y="17">'+(j<9?'0':'')+(j+1)+'</text><text class="nt" x="12" y="33">'+HUBS[j]+'</text><text class="ns" x="12" y="47">'+HUBSUB[j]+'</text></g></a>'}
  return s+'</svg>';
}

/* ---------- pages ---------- */
var P={};

P.overview=function(){
  return '<header class="ph"><div class="eyebrow">State dossier · Western India</div><h1>Goa</h1><p class="cov">Smallest Indian state by area, a Portuguese colony until 1961, and a coastal, service-led economy with one of the highest per capita incomes in the country. Start here, pick a section, then finish with the revision deck.</p></header>'
  +facts([['Area','3,702 sq km'],['Population','14.59 lakh (Census 2011)'],['Capital','Panaji (Panjim)'],['Statehood','30 May 1987, 25th state'],['Districts','2 (North Goa, South Goa)'],['Legislature','Unicameral, 40 seats'],['Official language','Konkani (Devanagari)'],['Per capita income','Rs 7.09 lakh, 2024-25',1],['Chief Minister','Pramod Sawant',1],['Next election','Due Feb to Mar 2027',1]])
  +sec('Map explorer','<div class="two"><div><div class="tog" id="maptog">'+[['relief','Relief'],['rivers','Rivers'],['cities','Towns'],['pa','Protected areas'],['infra','Infrastructure']].map(function(x,i){return '<button class="btn sm" data-lay="'+x[0]+'" aria-pressed="'+(i<2?'true':'false')+'">'+x[1]+'</button>'}).join('')+'</div><div id="mapbox">'+mapSVG(['relief','rivers'])+'</div><p class="cap">Schematic map for revision. Positions are approximate and the outline is simplified, so do not use it to judge exact boundaries.</p></div><div>'+ul(['<b>North:</b> Terekhol river and Sindhudurg district, Maharashtra.','<b>East and south:</b> Karnataka (Belagavi and Uttara Kannada districts).','<b>West:</b> Arabian Sea, about 101 to 105 km of coast.','<b>Relief:</b> three belts, coast, midland plateau, Western Ghats.','<b>Rivers:</b> Mandovi and Zuari carry most traffic; Cumbarjua canal links them.','<b>Cities:</b> Panaji is the capital, Margao the commercial centre, Vasco the largest city by population.'])+'<p class="cap">Toggle layers to see where parks, ports and airports sit relative to the rivers.</p></div></div>')
  +sec('Mind map: the whole state on one screen','<div class="hubd hub">'+radial()+'</div><div class="hubm tpl">'+DIMS.map(function(d,i){return '<a class="tp" href="#goa-'+d[0]+'"><b>'+(i<9?'0':'')+(i+1)+'</b><h3>'+d[1]+'</h3><p>'+d[2]+'</p></a>'}).join('')+'</div>')
  +sec('Goa in six lines',ul(['Colony of Portugal from 1510 to 1961, the longest European rule in India.','Annexed by Operation Vijay on 17 to 19 December 1961; Goa, Daman and Diu became a Union Territory.','Opinion Poll of 16 January 1967 kept Goa separate from Maharashtra.','Statehood on 30 May 1987; Konkani in the Eighth Schedule from 1992.','Only Indian state with a common civil code, derived from the Portuguese Civil Code of 1867.','Economy: services about 48%, industry about 46%, agriculture about 6% of GSDP (2026-27 estimate).']))
};

P.physical=function(){
  return facts([['Latitude','14°53′54″N to 15°48′00″N'],['Longitude','73°40′33″E to 74°20′13″E'],['Area','3,702 sq km'],['Coastline','~101 to 105 km (sources differ)'],['Extent','~105 km N to S, ~65 km E to W'],['Highest point','Sonsogor, 1,167 m']])
  +sec('Location and boundaries','<div class="two"><div>'+ul(['North: Terekhol river separates Goa from Sindhudurg (Maharashtra). Tiracol fort sits at its mouth.','East and south-east: Karnataka (Belagavi, Uttara Kannada). The Sahyadri forms the natural wall.','West: Arabian Sea.','2 districts, 12 talukas. Konkan coast lowland on the west, Deccan side on the east.','Forest cover is roughly 60% of the area, among the highest shares in India (ISFR) '+V+'.'])+'</div><div>'+mapSVG(['relief','rivers','cities'])+'<p class="cap">Schematic. Relief shading deepens towards the Ghats.</p></div></div>')
  +sec('Physiographic divisions',tbl(['Belt','Height','What defines it','Exam hook'],[
  ['Coastal lowland','0 to 30 m','Sandy beaches, estuaries, mangroves, khazan lands, coconut groves','Khazan = reclaimed saline floodplain with sluice gates (manos)'],
  ['Midland plateau','30 to 100 m','Flat-topped laterite plateaus cut by river valleys; mining belt in Bicholim, Sanguem, Quepem, Sattari','Iron ore, manganese, bauxite sit in this belt'],
  ['Western Ghats (Sahyadri)','Above 100 m, up to 1,167 m','Dense moist deciduous and evergreen forest, waterfalls, sanctuaries, river sources','Dudhsagar Falls, Mollem NP, Mhadei, Netravali']])+'<h3>West to east cross-section</h3>'+profile()+'<p class="cap">Heights are exaggerated for legibility. The profile shows the three belts side by side.</p>')
  +sec('Rivers',tbl(['River','Course and facts','Why it matters'],[
  ['Mandovi (Mahadayi, Mhadei)','Rises near Bhimgad, Belagavi, Karnataka. About 77 km inside Goa '+V+'. Dudhsagar Falls lie on it. Estuary at Panaji.','Lifeline of Goa. Iron-ore barge route. Subject of the Mahadayi water dispute.'],
  ['Zuari','Rises in the Hemad-Barga ghats, Karnataka. Longest river in Goa, about 92 km '+V+'. Salaulim is a tributary.','Mormugao Bay, New Zuari Bridge, Salaulim irrigation.'],
  ['Chapora','Northern Goa; estuary at Chapora fort.','Pernem and Bardez drainage.'],
  ['Terekhol','Forms the northern boundary with Maharashtra.','Tiracol fort at the mouth.'],
  ['Sal','Salcete; flows to the sea near Cavelossim and Betul.','Backwater tourism, fishing.'],
  ['Talpona, Galgibaga','Far south, Canacona.','Galgibaga beach is an Olive Ridley nesting site.']])+'<p class="cap">Cumbarjua canal links the Mandovi and Zuari estuaries and is part of the barge network.</p>')
  +sec('Climate, soils, vegetation','<div class="three"><div><h4>Climate</h4>'+ul(['Tropical monsoon.','Rain mostly June to September; roughly 3,000 mm a year, higher towards the Ghats.','Moderate temperatures, high humidity, no true winter.'])+'</div><div><h4>Soils</h4>'+ul(['Laterite is dominant, acidic and iron-rich.','Alluvial along rivers and the coast.','Saline and acid-sulphate soils in khazans.'])+'</div><div><h4>Vegetation</h4>'+ul(['Moist deciduous forest dominates.','Semi-evergreen and evergreen belts in the Ghats.','Mangroves along Mandovi, Zuari and Chorao.','Cashew, coconut and areca plantations.'])+'</div></div>')
  +sec('Natural resources',ul(['Iron ore (low to medium grade, exported through Mormugao), manganese, bauxite, ferro-manganese, silica sand.','Laterite stone, widely used in traditional buildings.','Fisheries, cashew, coconut, paddy.','Mining history is covered under Economy and Environment.']))
  +sec('Mind map',mm('Physical Goa',[['Place',['14.9 to 15.8°N','3,702 sq km','2 districts']],['Relief',['Coast','Midland plateau','Sahyadri 1,167 m']],['Water',['Mandovi','Zuari','Cumbarjua canal','Khazans']],['Climate',['Tropical monsoon','~3,000 mm rain']],['Soil and cover',['Laterite','Moist deciduous','Mangroves']],['Resources',['Iron ore','Manganese','Bauxite','Cashew']]]))
  +exam(['Highest peak Sonsogor (1,167 m).','Dudhsagar lies on the Mandovi (Mahadayi).','Zuari and Mandovi are joined by the Cumbarjua canal.','Laterite soil, tropical monsoon climate.'],['Explain how laterite plateaus shaped Goa’s mining economy and its ecological costs.','Why are khazans important for climate resilience?'],['Do not mix up Zuari (longest) with Mandovi (lifeline).','Goa’s coast length is quoted differently across sources; use the figure given in the question stem.']);
};

P.history=function(){
  return sec('From Kadambas to statehood: the flow',flow([['1510','Albuquerque takes Goa from the Adil Shahs'],['1560','Goa Inquisition begins (ends 1812)'],['1946','Lohia’s Margao civil disobedience, 18 June'],['1955','Mass satyagraha, 15 August'],['1961','Operation Vijay, 17 to 19 Dec'],['1962','12th Amendment makes it a UT'],['1967','Opinion Poll, 16 Jan'],['1987','Statehood, 30 May'],['1992','Konkani in Eighth Schedule']]))
  +sec('Timeline',tl([
  ['Ancient','Mauryas to Chalukyas','Early Bhoja chiefs, Satavahanas, Chalukyas of Badami, Rashtrakutas and Silaharas held the Konkan coast.'],
  ['c.1000 to 1345','Kadambas of Goa','Capital at Gopakapattana (Goa Velha) and later Chandor. Strong Arab trade, gold coin called gadyana. Temple style at Tambdi Surla.'],
  ['14th to 15th c.','Sultanates and Vijayanagara','Delhi Sultanate raids, Vijayanagara rule, then Bahmani and Bijapur Adil Shahi control; Old Goa becomes a major port.'],
  ['1510','Portuguese conquest','Afonso de Albuquerque captures Goa, which becomes the capital of the Estado da India.'],
  ['1542, 1560','Church and Inquisition','St Francis Xavier arrives (1542). Inquisition established 1560 and abolished 1812.'],
  ['1763 to 1788','New Conquests','Ponda, Sattari, Sanguem, Quepem, Canacona and others added to the Old Conquests of Tiswadi, Bardez and Salcete.'],
  ['1787, 1852 to 1912','Revolts','Conspiracy of the Pintos (1787); repeated Rane revolts in Sattari; the Cuncolim uprising of 1583 is an earlier flashpoint.'],
  ['1928','Goa Congress Committee','Tristão de Bragança Cunha, called the father of Goan nationalism, organises Goan opinion from Bombay.'],
  ['18 Jun 1946','Lohia at Margao','Ram Manohar Lohia defies the ban on assembly; 18 June is Goa Revolution Day.'],
  ['15 Aug 1955','Satyagraha','Mass satyagraha at the borders; heavy casualties pushed India towards firmer action.'],
  ['17 to 19 Dec 1961','Operation Vijay','Indian forces enter; Governor-General Vassalo e Silva surrenders on 19 December, now Goa Liberation Day.'],
  ['1962','12th Amendment','Goa, Daman and Diu added to the First Schedule as a Union Territory.'],
  ['16 Jan 1967','Opinion Poll','Voters choose to remain a separate UT instead of merging with Maharashtra.'],
  ['1963 to 1973','First elected government','Dayanand Bandodkar of the MGP is the first Chief Minister of Goa, Daman and Diu.'],
  ['30 May 1987','Statehood','Goa, Daman and Diu Reorganisation Act 1987; Goa becomes the 25th state. Daman and Diu stay as a UT.'],
  ['1987, 1992','Konkani','Official Language Act 1987; Eighth Schedule through the 71st Amendment, 1992.']])+'<p class="cap">Dates marked from textbook sources; confirm exact day numbers for any date-based MCQ '+V+'.</p>')
  +sec('Colonial legacies that still shape Goa',tbl(['Legacy','What it is','Why UPSC cares'],[
  ['Goa Civil Code','Based on the Portuguese Civil Code of 1867; common family law for all communities.','Only state with a common civil code; cited in Article 44 debates and Supreme Court judgments.'],
  ['Comunidades','Village communities holding land collectively, with a code dating from the Portuguese era.','Land and property governance; unique institution.'],
  ['Mundkar Act 1975','Protects hereditary occupants of homesteads from eviction.','Land reform, tenancy.'],
  ['Tenancy law 1964','Goa, Daman and Diu Agricultural Tenancy Act gave land to the tiller.','Early land reform in a UT.']]))
  +sec('Culture at a glance',tbl(['Theme','Key items'],[
  ['Festivals','Carnival (Feb to Mar), Shigmo (spring), Sao Joao (24 June), Bonderam (Divar), Feast of St Francis Xavier (3 Dec), Ganesh Chaturthi, Zatra festivals'],
  ['Music and dance','Fugdi, Dhalo, Ghode Modni, Dekhni, Mando (Konkani-Portuguese song form), Corridinho'],
  ['Architecture','Basilica of Bom Jesus (consecrated 1605), Se Cathedral, Church of St Francis of Assisi, Mangeshi and Shantadurga temples, Tambdi Surla Mahadev (Kadamba era), Fort Aguada, Chapora, Reis Magos, Cabo de Rama, Tiracol'],
  ['UNESCO','Churches and Convents of Goa, World Heritage Site since 1986'],
  ['Language and literature','Konkani (Devanagari) official; Marathi permitted for official use; English, Portuguese heritage. Damodar Mauzo received the Jnanpith (2022) '+V+'.'],
  ['Films','International Film Festival of India has been held in Goa since 2004.']]))
  +sec('Mind map',mm('History & culture',[['Early',['Bhoja','Satavahana','Kadamba','Tambdi Surla']],['Medieval',['Sultanates','Vijayanagara','Adil Shahi']],['Portuguese',['1510','Inquisition','Old and New Conquests']],['Resistance',['Cuncolim 1583','Pinto 1787','Rane revolts']],['Freedom',['Cunha','Lohia 1946','1955','Op Vijay 1961']],['After 1961',['UT 1962','Opinion Poll 1967','Statehood 1987']],['Culture',['Carnival','Shigmo','Mando','UNESCO churches']]]))
  +exam(['Operation Vijay (Dec 1961); Liberation Day 19 December.','Opinion Poll 16 January 1967.','Statehood 30 May 1987; 71st Amendment (1992) for Konkani.','UNESCO site: Churches and Convents of Goa (1986).'],['Assess the impact of Portuguese rule on Goan society and law.','How did the 1967 Opinion Poll shape Goa’s political identity?'],['Do not confuse Goa Liberation Day (19 Dec) with Revolution Day (18 June).','Daman and Diu did not become a state with Goa.']);
};

P.geopolitics=function(){
  return facts([['Land neighbours','Maharashtra, Karnataka'],['International land border','None'],['Sea','Arabian Sea, EEZ off Konkan coast'],['Major port','Mormugao'],['Naval base','INS Hansa, Dabolim'],['Shipbuilder','Goa Shipyard Ltd, Vasco']])
  +sec('Strategic picture','<div class="two"><div>'+mapSVG(['relief','rivers','geo'])+'<p class="cap">Strategic sites on the schematic map.</p></div><div>'+ul(['<b>Mid-way on the western seaboard.</b> Sits between Mumbai and Karwar (Project Seabird, INS Kadamba), covering the Konkan coast.','<b>Naval aviation hub.</b> INS Hansa at Dabolim is a major naval air station and shares the civil enclave of Goa International Airport.','<b>Shipbuilding.</b> Goa Shipyard Ltd builds patrol and offshore vessels for the Navy and Coast Guard.','<b>Ocean science.</b> CSIR-NIO at Dona Paula and the National Centre for Polar and Ocean Research at Vasco.','<b>Port.</b> Mormugao is a deep-water major port with a long record in iron-ore exports.'])+'</div></div>')
  +sec('Disputes and diplomacy',tbl(['Issue','Facts','Exam angle'],[
  ['Mahadayi (Mhadei) water dispute','Goa, Karnataka and Maharashtra. Tribunal formed in 2010 under the Inter-State River Water Disputes Act 1956; award of August 2018 split the water, with about 13.42 TMC to Karnataka, 24 TMC to Goa and 1.33 TMC to Maharashtra '+V+'. Karnataka’s Kalasa-Banduri diversion is contested by Goa.','Inter-state water disputes, federalism, Western Ghats ecology'],
  ['Right of Passage case (1960)','Portugal v India at the ICJ over access to the Dadra and Nagar Haveli enclaves.','International law, colonial enclaves'],
  ['Wildlife corridor','Mhadei-Kotigaon landscape links to Kali Tiger Reserve in Karnataka.','Transboundary conservation']])+'<p class="cap">Belagavi boundary dispute is between Maharashtra and Karnataka, not Goa.</p>')
  +sec('Security concerns',ul(['Coastal security after 26/11: coastal police stations, Sagar Kavach style exercises, fishing-boat registration.','Drug trafficking and tourism-linked crime, handled by the state anti-narcotics cell and central agencies.','Illegal construction in the Coastal Regulation Zone; compounding risk in high-tourism belts.']))
  +sec('Diplomatic stage',ul(['Hosted the BRICS summit (October 2016) at Benaulim '+V+'.','SCO Foreign Ministers’ meeting (May 2023) and G20 tourism meetings (2023).','Goa Maritime Conclave, hosted by the Indian Navy for Indian Ocean littoral navies '+V+'.']))
  +sec('Mind map',mm('Strategic Goa',[['Sea',['Arabian Sea','Konkan coast','EEZ']],['Ports',['Mormugao','Panaji (minor)']],['Defence',['INS Hansa','Goa Shipyard','Naval War College '+V]],['Neighbours',['Maharashtra','Karnataka']],['Disputes',['Mahadayi','Kali corridor']],['Diplomacy',['BRICS 2016','SCO 2023','G20 2023']]]))
  +exam(['Mormugao is the only major port in Goa.','INS Hansa at Dabolim; Goa Shipyard at Vasco.','Mahadayi tribunal formed 2010; award August 2018.'],['Explain Goa’s relevance in India’s Indian Ocean strategy.','Examine the Mahadayi dispute as a test of cooperative federalism.'],['Goa has no international land border; it is a maritime state.']);
};

P.governance=function(){
  return facts([['Governor','Pusapati Ashok Gajapathi Raju',1],['Chief Minister','Pramod Sawant (since Mar 2019)',1],['Assembly','40 seats; 21 for majority'],['Parliament','2 Lok Sabha, 1 Rajya Sabha'],['High Court','Bombay HC, bench at Panaji'],['Local bodies','2 ZPs, ~191 VPs, 14 councils + CCP '+V]])
  +sec('Formation and constitutional hooks',flow([['1961','Annexation; Union Territory'],['1962','12th Amendment adds Goa, Daman and Diu to the First Schedule'],['1987','Reorganisation Act; statehood on 30 May'],['Art. 371-I','Special provision: Assembly of not less than 30 members'],['Art. 164(1A)','Council of Ministers cannot be fewer than 12']])+'<p class="cap">Goa’s assembly has 40 seats. The 15% cap would allow only 6 ministers, so the minimum of 12 applies, as in Sikkim and Mizoram.</p>')
  +sec('Government structure','<div class="three"><div><h4>Executive</h4>'+ul(['Governor appointed by President.','Chief Minister heads a Council of Ministers, normally 12.','Secretariat at Porvorim.'])+'</div><div><h4>Legislature</h4>'+ul(['Unicameral Legislative Assembly of 40.','Speaker elected by members.','Assembly term due to end early 2027.'])+'</div><div><h4>Judiciary</h4>'+ul(['Bombay High Court Goa bench at Panaji.','Two district courts, North and South Goa.','Common civil code issues reach the Supreme Court.'])+'</div></div>')
  +sec('Local government',tbl(['Level','Body','Notes'],[
  ['Rural','Village panchayats (about 191 '+V+') and 2 zilla panchayats','Goa Panchayat Raj Act 1994; two-tier model without a block-level body'],
  ['Urban','14 municipal councils and the Corporation of the City of Panaji '+V,'Goa Municipalities Act; 74th Amendment applies'],
  ['Traditional','Comunidades, gaunkari','Collective land bodies that sit outside ordinary PRIs'],
  ['Administrative','2 districts, 12 talukas','Collectors and mamlatdars']]))
  +sec('Politics and stability',ul(['2022 result: BJP 20, Congress 11, AAP 2, MGP 2, Goa Forward 1, RGP 1, Independents 3.','BJP formed the government with MGP and independents and gained further numbers through defections.','Defections: 10 of 15 Congress MLAs merged with BJP in 2019, and 8 of 11 in 2022, using the two-thirds merger rule under the Tenth Schedule '+V+'.','Next Assembly election is due February to March 2027. The BJP has set a target of 27 plus seats and says the party will decide its CM face (Oct 2026 statement).']),'')
  +sec('Institutions and innovations',ul(['Goa Lokayukta (Lokayukta Act 2011), State Election Commission, State Information Commission, Public Service Commission '+V+'.','Goa Online citizen services portal; Aadhaar penetration above 100% in the Economic Survey 2025-26.','Goa Children’s Act 2003, among the first state laws on child rights '+V+'.','Media reports say Goa is the second state, after Mizoram, to reach full functional literacy.']))
  +sec('Mind map',mm('Governing Goa',[['Formation',['1962 UT','1987 state','Art. 371-I']],['Executive',['Governor','CM and 12 ministers']],['Legislature',['40 seats','Anti-defection cases']],['Courts',['Bombay HC bench','Civil code']],['Local',['VPs and ZPs','Councils and CCP','Comunidades']],['Bodies',['Lokayukta','SEC','Goa Online']]]))
  +exam(['Article 371-I: Goa assembly minimum 30 members.','Minimum 12 ministers for Goa, Sikkim, Mizoram.','Tenth Schedule merger rule, with Goa examples.'],['Are small legislatures more prone to defections? Use Goa’s 2019 and 2022 mergers.','Discuss how Comunidades fit into modern land governance.'],['The Governor is appointed, not elected; do not use older names. Check the current office-holder before the exam.']);
};

P.economy=function(){
  return facts([['GSDP, current prices','Rs 1,12,525 crore, 2024-25',1],['Growth, current','15.01%',1],['Growth, constant (2011-12)','11.95%',1],['Per capita income','Rs 7,09,045, 2024-25',1],['India per capita','Rs 2,34,859, 2024-25',1],['Public debt','Rs 30,945 crore, Mar 2026 proj.',1]])
  +sec('Per capita income, current prices (Rs lakh)','<div class="two"><div>'+vb([['2021-22','5.20',5.20],['2023-24','6.20',6.20],['2024-25','7.09',7.09,'lat']],8)+'<p class="cap">Source: Goa Economic Survey 2025-26. 2022-23 is omitted because revised and older releases differ.</p></div><div>'+hb([['Goa',709045,'Rs 7.09 lakh'],['India',234859,'Rs 2.35 lakh','lat']],709045)+'<p class="cap">Goa’s figure is about three times the national average (PRS, 2024-25).</p></div></div>')
  +sec('Sector mix (2026-27 estimate, current prices)','<div class="stack"><div style="width:6%;background:var(--good)"></div><div style="width:46%;background:var(--accent)">46</div><div style="width:48%;background:var(--lat)">48</div></div><div class="leg"><span><i style="background:var(--good)"></i>Agriculture and allied ~6%</span><span><i style="background:var(--accent)"></i>Industry ~46%</span><span><i style="background:var(--lat)"></i>Services ~48%</span></div><p class="cap">Per PRS analysis of the Goa Budget 2026-27.</p>')
  +sec('State finances (Rs crore)',tbl(['Item','2025-26 RE','2026-27 BE','Change'],[
  ['Total expenditure','29,275','30,194','+3%'],['Revenue expenditure','20,568','21,970','+7%'],['Capital outlay','6,036','6,083','+1%'],['Revenue surplus','1,708 (1.2% of GSDP)','1,667 (1.3%)','roughly flat'],['Fiscal deficit','3.1% of GSDP','4,422 (3.4%)','widening']])+'<div class="note"><b>Why numbers differ across sources.</b> Quick estimates, revised estimates and budget estimates are published at different times. Budget papers project GSDP of Rs 1.31 lakh crore for 2026-27, which PRS notes is below the Rs 1.38 lakh crore estimate for 2025-26. Use the Economic Survey for the latest published series.</div>')
  +sec('Sectors',tbl(['Sector','What to remember'],[
  ['Agriculture','Paddy, coconut, cashew, areca, fisheries; small share of GSDP. Khazan farming is distinctive.'],
  ['Mining','Iron ore. Supreme Court halted leases in 2012 after the Shah Commission; 2018 order quashed lease renewals; auctions led to restart. The Economic Survey 2025-26 projects a mining-led pick-up.'],
  ['Industry','Pharmaceuticals, electronics, brewing and distilling, ship repair, food processing; industrial estates managed by GIDC (Verna, Kundaim, Tivim and others).'],
  ['Tourism','Beach, heritage and conference tourism; seasonal and sensitive to global shocks. Official figures claim a 22% rise in domestic tourists in 2024 (media report).'],
  ['Services','Largest share; real estate, finance, IT parks such as Tuem, remittances from seafarers.']]))
  +sec('Economic challenges',ul(['Manufacturing growth has been weak: one commentary on the Economic Survey puts the 2019-20 to 2023-24 manufacturing CAGR at about 1.2%.','Public debt is rising; the survey projects Rs 30,945 crore by March 2026 from Rs 26,605 crore a year earlier.','Heavy dependence on tourism and a service sector sensitive to global conditions, flagged by the CM at the budget.','Mining volatility and legal uncertainty; land-use and CRZ conflicts.','Unequal rural to urban incomes; high housing costs.']))
  +sec('Mind map',mm('Goa’s economy',[['Size',['GSDP Rs 1.13 lakh cr','Per capita Rs 7.09 lakh']],['Sectors',['Services 48%','Industry 46%','Agri 6%']],['Mining',['2012 halt','2018 order','Auctions']],['Industry',['Pharma','Electronics','GIDC estates']],['Tourism',['Beaches','Heritage','Mopa airport']],['Finance',['Revenue surplus','Deficit 3.4%','Debt rising']]]))
  +exam(['Goa has one of the highest per capita incomes among states.','Mining: Shah Commission, 2012 suspension, 2018 judgement.','Tourism and services dominate GSDP.'],['Is a service-led, high-income small state resilient? Use Goa’s mining and tourism cycles.','Examine the role of fiscal discipline in small states.'],['Always state the price basis (current or constant) with GSDP figures.']);
};

P.environment=function(){
  return facts([['National park','1 (Mollem)'],['Wildlife sanctuaries','6'],['Ramsar site','Nanda Lake (first)',1],['Tiger reserve','Proposed, Mhadei-Kotigaon',1],['World Heritage (natural)','None; Western Ghats listing excludes Goa'],['State animal','Gaur']])
  +sec('Protected areas map','<div class="two"><div><div id="maptog2" class="tog"></div>'+mapSVG(['relief','rivers','pa'])+'<div class="leg"><span>'+LEG.pa+'</span><span>'+LEG.tig+'</span><span>'+LEG.ts+'</span></div></div><div>'+tbl(['Area','Size','Remember'],[
  ['Mollem NP','~107 sq km','Only national park; Dudhsagar; inside Bhagwan Mahavir WLS'],
  ['Bhagwan Mahavir WLS','~240 sq km','Largest sanctuary'],
  ['Netravali WLS','~211 sq km','Sanguem; Savari Dhadou falls'],
  ['Mhadei WLS','~208 sq km','Sattari; tiger reserve dispute'],
  ['Cotigao WLS','~86 sq km','Canacona; southern Goa forest'],
  ['Bondla WLS','~8 sq km','Zoo and garden'],
  ['Dr Salim Ali WLS','~1.8 sq km','Chorao Island, mangroves, birds']])+'<p class="cap">Areas are approximate '+V+'.</p></div></div>')
  +sec('Wetlands and turtles',ul(['Nanda Lake (Curchorem-Cacora) became Goa’s first Ramsar site.','State wetland authority has approved nominations including Carambolim Lake, Raia lake and Dr Salim Ali sanctuary.','Olive Ridley turtles nest at Morjim, Galgibaga and Agonda.','Mangroves in Mandovi and Zuari estuaries protect against storm surge.']))
  +sec('Flagship case: Mhadei tiger reserve',flow([['2024','Bombay HC bench directs the state to notify a tiger reserve'],['Sep 2025','Supreme Court orders status quo in Mhadei-Kotigaon; refers to CEC'],['Nov 2025','CEC recommends a phased reserve over about 468.6 sq km, with Netravali and Cotigao as core areas'],['19 Mar 2026','Hearing scheduled; check the latest order'],['Next','State must notify under Sec 38V, WPA 1972, on NTCA advice']])+'<div class="note"><b>Check before exam.</b> I could confirm the 2025 status-quo order and CEC recommendation, but not the outcome of later hearings. Look up the latest order.</div>')
  +sec('Movements and conservation',tbl(['Movement or project','Facts'],[
  ['Save Mollem (2020)','Opposed three linear projects through Mollem NP: rail double-tracking, a power transmission line and highway widening.'],
  ['Mhadei Bachao Abhiyan','Campaign to protect the Mhadei river and Western Ghats from diversion.'],
  ['Goa Foundation cases','Public interest litigation on mining, wetlands and the tiger reserve.'],
  ['Biodiversity governance','Goa Biodiversity Board under the Biodiversity Act 2002 '+V+'.']])+'<h3>Climate vulnerabilities</h3>'+ul(['Monsoon floods in the Mandovi basin, intense cyclone side-effects off the Arabian Sea, coastal erosion and sea-level rise.','Saltwater intrusion in khazans; unregulated tourist construction in CRZ.','2026 media reports mention a large conversion of eco-sensitive land to no-development zones.']))
  +sec('Mind map',mm('Goa’s ecology',[['Hotspot',['Western Ghats','Mhadei','Netravali']],['Parks',['Mollem NP','6 WLS']],['Wetlands',['Nanda Lake Ramsar','Salim Ali','Mangroves']],['Species',['Gaur','Flame-throated bulbul','Olive Ridley']],['Conflicts',['Mining','Save Mollem','Tiger reserve']],['Climate',['Floods','Erosion','Salinity']]]))
  +exam(['Mollem is Goa’s only national park.','Nanda Lake is the first Ramsar site.','Section 38V, Wildlife Protection Act, for tiger reserves.'],['Balance eco-tourism and conservation in the Western Ghats using Goa’s Mhadei case.','How do linear projects fragment wildlife corridors?'],['Goa has no biosphere reserve and no notified tiger reserve; check the latest status.']);
};

P.society=function(){
  return facts([['Population','14,58,545 (2011)'],['Density','~394 per sq km'],['Sex ratio','~973 (2011)'],['Literacy','~88.7% (2011)'],['Urban share','~62% (2011)'],['Decadal growth','~8% (2001 to 2011)']])+'<div class="note"><b>Census note.</b> Figures here are from Census 2011 and need confirmation '+V+'. A newer Census cycle may change them.</div>'
  +sec('Religion (Census 2011, approximate)','<div class="stack"><div style="width:66%;background:var(--accent)">Hindu 66%</div><div style="width:25%;background:var(--lat)">Christian 25%</div><div style="width:9%;background:var(--good)"></div></div><div class="leg"><span><i style="background:var(--good)"></i>Muslim and others ~9%</span></div>')
  +sec('Society and tribes',ul(['Scheduled Tribes include Kunbi, Gawda and Velip, notified in 2003 '+V+'.','Parliament passed the Readjustment of Representation of Scheduled Tribes in Assembly Constituencies of Goa Bill: Lok Sabha 5 August 2025, Rajya Sabha 11 August 2025. Seat details follow a Delimitation Order.','Communities such as Gaud Saraswat Brahmins, Catholics, Kunbis and Bhandaris shape local politics; treat caste facts carefully.','Goenkar identity and Konkani language are central to social movements.']))
  +sec('Human development',tbl(['Theme','Notes'],[
  ['Health','High life expectancy and health index; Goa Medical College at Bambolim is the tertiary centre; Deen Dayal Swasthya Seva Yojana covers state health insurance.'],
  ['Education','Goa University (Taleigao), IIT Goa and NIT Goa, BITS Pilani Goa campus, Goa College of Engineering.'],
  ['Migration','In-migration of labour from Karnataka, Maharashtra and elsewhere; out-migration of seafarers and professionals abroad.'],
  ['Gender','Strong sex ratio and literacy; welfare for women through Griha Aadhar and Laadli Laxmi.'],
  ['Ageing','Older age profile and below-replacement fertility; planning for elder care.']]))
  +sec('Social movements',ul(['Konkani language agitation (1986 to 1987) that won the Official Language Act and statehood.','Opinion Poll of 1967: regional identity versus merger.','Anti-mining, Mhadei Bachao and Save Mollem campaigns.','Protest over Chimbel Unity Mall construction; court halted work in January 2026 (media report).']))
  +sec('Mind map',mm('People of Goa',[['Numbers',['14.6 lakh','394 per sq km','62% urban']],['Faith and culture',['Hindu majority','Large Catholic minority','Konkani']],['Tribes',['Kunbi','Gawda','Velip','ST reservation']],['Development',['Health','Education','Literacy']],['Mobility',['In-migration','Seafarers']],['Movements',['Konkani 1986','Opinion Poll','Mhadei']]]))
  +exam(['Literacy about 88.7% (2011); urban share about 62%.','Konkani Eighth Schedule 1992.','ST reservation bill passed August 2025.'],['Examine why development indicators in Goa exceed national averages.','Urbanisation and migration pressures on a small coastal state.'],['Do not use 2011 figures as current estimates without saying so.']);
};

P.infrastructure=function(){
  return facts([['Airports','Mopa (Manohar International), Dabolim'],['Major port','Mormugao'],['Railway','Konkan Railway, Londa-Vasco'],['Highways','NH 66, NH 748 (old 4A), NH 566, NH 166S'],['Waterways','Mandovi, Zuari, Cumbarjua '+V],['Projects underway','354 worth Rs 7,532 crore',1]])
  +sec('Map of connectivity','<div class="two"><div><div class="tog" id="maptog3"></div>'+mapSVG(['relief','rivers','infra'])+'<div class="leg"><span>'+LEG.infra+'</span></div><p class="cap">Solid lines are highways, dashed lines are rail, shown approximately.</p></div><div>'+tbl(['Asset','Key facts'],[
  ['Mopa airport','Manohar International Airport; Pernem; GMR-built; operations from 5 January 2023; named for Manohar Parrikar; 6-lane NH-166S link road.'],
  ['Dabolim airport','Shared with INS Hansa naval air station.'],
  ['New Zuari Bridge','Eight-lane cable-stayed bridge with a 360 m main span, 640 m in total; reported as India’s first on a curve. Twin observatory towers planned by 2028.'],
  ['Atal Setu','Mandovi bridge linking Panaji and Porvorim (2019).'],
  ['Porvorim elevated corridor','About 5.2 km, connecting to Mopa.'],
  ['Konkan Railway','Roha to Mangaluru, opened 1998; Madgaon is the hub.']])+'</div></div>')
  +sec('Ports and waterways',ul(['Mormugao Port: deep-water major port; iron-ore handling; coal and containers.','Panaji and other minor ports; riverine barge transport of ore on the Mandovi and Zuari.','National Waterways declared in 2016 include Mandovi and Zuari '+V+'.']))
  +sec('Irrigation and power',ul(['Salaulim irrigation project on the Salaulim river; Tillari is shared with Maharashtra.','Drinking water from Opa and Assnora plants.','Goa imports most of its power from the western grid; the Goa-Tamnar line through Mollem was part of the Save Mollem controversy.']))
  +sec('Mind map',mm('Connectivity',[['Air',['Mopa','Dabolim']],['Road',['NH 66','NH 748','Zuari Bridge','Atal Setu']],['Rail',['Konkan Railway','Londa-Vasco']],['Sea',['Mormugao','Barges']],['Water and power',['Salaulim','Tillari','Grid imports']],['Pipeline',['354 projects','Rs 7,532 crore']]]))
  +exam(['Mopa operations began 5 January 2023.','Konkan Railway 1998; Madgaon hub.','Atal Setu over the Mandovi.'],['Does greenfield infrastructure promote balanced regional development in a small state?','Environmental costs of linear projects in Goa.'],['Dabolim is the older airport; Mopa is in the north (Pernem).']);
};

P.schemes=function(){
  return facts([['Griha Aadhar','Rs 1,500 per month for homemakers'],['Payment date','By the 10th of each month',1],['March 2026 release','Rs 45.26 crore to 2.24 lakh people',1],['Health cover','Deen Dayal Swasthya Seva Yojana'],['Girl child','Laadli Laxmi'],['Social security','Dayanand Social Security Scheme']])
  +sec('State flagship schemes',tbl(['Scheme','Who and what','Notes'],[
  ['Griha Aadhar','Married women resident in Goa for 15 years with household income up to Rs 3 lakh; monthly assistance of Rs 1,500.','Run by Women and Child Development; excludes DSSS beneficiaries, except some widows.'],
  ['Dayanand Social Security Scheme (DSSS)','Pension-type support for senior citizens, widows, persons with disabilities and others; amounts vary by category.','Directorate of Social Welfare.'],
  ['Laadli Laxmi','Financial help for girls at marriage or higher education.','Amount has changed over time; check the current notification '+V+'.'],
  ['Deen Dayal Swasthya Seva Yojana','State health insurance scheme.',''],
  ['Cyber Age scheme','Digital access support for students '+V+'.','']])+'<div class="note"><b>Operational fix, March 2026.</b> The CM announced that Griha Aadhar and DSSS money will be credited by the 10th of each month after reports of delays.</div>')
  +sec('Central schemes and policy',ul(['Housing, drinking water and sanitation, nutrition, health missions, PM-KISAN and Jal Jeevan Mission are implemented through the state.','Education reform: internship made mandatory in graduation from the 2025 academic year (budget announcement).','Budget 2026-27 pushes a "green innovation economy" and raises Anganwadi workers’ honorarium by Rs 1,000 a month.','Swayampurna Goa initiative promotes self-reliance in villages '+V+'.']))
  +sec('Implementation challenges',ul(['Delays in direct benefit transfers and backlogs of applications.','Targeting: eligibility rules such as the 15-year residence condition.','Fiscal sustainability of welfare with a rising debt stock.','Digital divide for elderly beneficiaries.']))
  +sec('Mind map',mm('Welfare Goa',[['Women',['Griha Aadhar','Laadli Laxmi']],['Elderly and vulnerable',['DSSS']],['Health',['DDSSY','NHM']],['Education',['Mandatory internship','Cyber Age']],['Delivery',['10th-of-month rule','Goa Online']],['Risks',['Delays','Debt','Targeting']]]))
  +exam(['Griha Aadhar and DSSS are the two major cash-transfer schemes.','Laadli Laxmi supports girls’ marriage or education.'],['Evaluate universal versus targeted cash transfers in a high-income small state.','Role of DBT in reducing leakages.'],['Benefit amounts change often; always check the latest notification.']);
};

P.scitech=function(){
  return sec('Institutions',tbl(['Institution','Place','Remember'],[
  ['CSIR-National Institute of Oceanography','Dona Paula','Oceanography, marine biology, geology'],
  ['National Centre for Polar and Ocean Research','Vasco','Earth system science, Antarctic logistics'],
  ['ICAR Central Coastal Agricultural Research Institute','Old Goa','Coastal agriculture, khazan research '+V],
  ['Goa University','Taleigao','State university'],
  ['IIT Goa, NIT Goa, BITS Pilani Goa','Farmagudi, Cuncolim, Zuarinagar','Technical education'],
  ['Goa Shipyard Ltd','Vasco','Defence PSU shipbuilder'],
  ['INS Hansa','Dabolim','Naval air station'],
  ['Tuem IT Park, Goa Science Centre','Pernem, Panaji '+V,'Tech and outreach']])+'<p class="cap">Goa College of Engineering started programmes under the National Semiconductor Mission, per the Economic Survey 2025-26.</p>')
  +sec('Geographical Indications (GI)',tbl(['Product','Year','Type'],[
  ['Goan Feni (cashew)','2009','First GI-tagged liquor in India '+V],
  ['Khaje, Harmal chilli, Moira banana','2022','Sweet, spice, fruit'],
  ['Bebinca, Mankurad mango, Agsechi Vayingim (brinjal), Sat Shiro Bheno (okra)','2023','Sweet and agricultural'],
  ['Five more agricultural products','2025','Media report; check the registry']])+'<p class="cap">Confirm full GI lists against the Geographical Indications Registry before the exam.</p>')
  +sec('Mind map',mm('Science in Goa',[['Ocean',['NIO','NCPOR','Hansa']],['Agriculture',['ICAR CCARI','Khazan']],['Higher education',['Goa University','IIT Goa','NIT Goa','BITS']],['Defence',['Shipyard','INS Hansa']],['Chips and IT',['Semiconductor Mission course','Tuem IT park']],['GI',['Feni','Bebinca','Mankurad']]]))
  +exam(['Feni was the first GI liquor, 2009 '+V+'.','NIO at Dona Paula; NCPOR at Vasco.'],['Role of GI tags in rural livelihoods.','Why a small state should specialise in marine science.'],['Do not confuse NCPOR (Vasco) with NIO (Dona Paula).']);
};

P.current=function(){
  return '<div class="note"><b>As of 2 November 2026.</b> Items are drawn from news reports found in November 2026. Treat dates as indicative and verify before using in answers.</div>'
  +sec('What is live',tbl(['Issue','Where it stands','Section'],[
  ['Mhadei tiger reserve','Supreme Court status quo (Sep 2025); CEC recommends a phased reserve of ~468.6 sq km; Goa objects that there are no resident tigers; later orders to be checked.','Environment'],
  ['2027 Assembly election','Due Feb to Mar 2027. BJP targets 27+ seats; Congress is trying to build an opposition front with Goa Forward and RGP.','Governance'],
  ['ST political reservation','Parliament passed the Goa ST readjustment law in August 2025; Delimitation Order pending.','Society'],
  ['Economic Survey 2025-26 and Budget 2026-27','GSDP growth 15% at current prices in 2024-25; debt rising; "green innovation economy" theme.','Economy'],
  ['Governor change','Pusapati Ashok Gajapathi Raju succeeded P S Sreedharan Pillai in July 2025.','Governance'],
  ['Arpora nightclub fire','Media reports describe 25 deaths, including tourists and staff, prompting scrutiny of fire safety and licensing.','Governance'],
  ['Functional literacy','Reported as the second state after Mizoram to reach full functional literacy.','Society'],
  ['Welfare disbursal','Griha Aadhar and DSSS to be paid by the 10th of every month.','Schemes'],
  ['Zuari bridge towers','Twin 125 m observatory towers planned by 2028.','Infrastructure']]))
  +sec('Likely exam angles',ul(['Conservation versus development in the Western Ghats.','Anti-defection and small-state political stability.','Federalism: Mahadayi water sharing.','Tourism regulation after safety incidents.']))
  +exam(['Know the case name: State of Goa v Goa Foundation (tiger reserve).','Sec 38V WPA for tiger reserves.'],['Prepare a 150-word note on each live issue with one data point and one constitutional or legal hook.'],['Do not cite a hearing outcome you have not read.']);
};

var MCQ=[
['Article 371-I provides that the Legislative Assembly of Goa shall have not fewer than how many members?',['25','30','35','40'],1,'Art. 371-I (56th Amendment, 1987) sets a minimum of 30. The actual strength is 40.'],
['Dudhsagar Falls lie on which river?',['Zuari','Sal','Mandovi (Mahadayi)','Chapora'],2,'The Mandovi, also called Mahadayi or Mhadei, rises near Bhimgad in Karnataka and carries Dudhsagar.'],
['The Opinion Poll of 16 January 1967 in Goa decided:',['Statehood for Goa','Merger with Maharashtra','Continuation as a separate Union Territory','Merger with Karnataka'],2,'Voters chose to stay a separate UT. Statehood came on 30 May 1987.'],
['Konkani was added to the Eighth Schedule by which amendment?',['56th','61st','71st','74th'],2,'71st Amendment, 1992, also added Manipuri and Nepali.'],
['Goa’s first Ramsar site is:',['Carambolim Lake','Nanda Lake','Chorao Island','Raia Lake'],1,'Nanda Lake in Curchorem-Cacora; the others have been nominated.'],
['A tiger reserve in India is notified by the State Government under which provision on advice of the NTCA?',['Sec 38V, WPA 1972','Sec 18, WPA 1972','Sec 3, EPA 1986','Sec 4, FRA 2006'],0,'Sec 38V of the Wildlife (Protection) Act deals with tiger reserves.'],
['Which of these states has a legal minimum of 12 ministers despite the 15% cap?',['Goa','Punjab','Kerala','Assam'],0,'Art. 164(1A) proviso: minimum 12, relevant for small assemblies such as Goa, Sikkim and Mizoram.'],
['The only major port of Goa is:',['Panaji','Mormugao','Tiracol','Betul'],1,'Mormugao is a deep-water major port; the others are minor or small.'],
['Which state follows a common civil code derived from the Portuguese Civil Code of 1867?',['Kerala','Puducherry','Goa','Gujarat'],2,'The Goa Civil Code applies to all communities.'],
['Mollem National Park is notable because it is:',['Only national park in Goa','Largest sanctuary in Goa','A Ramsar site','A biosphere reserve'],0,'It is Goa’s only national park and contains Dudhsagar Falls.']
];
var MAINS=[
['Examine how the Portuguese colonial legacy shapes Goa’s law, land and culture today.',['Intro: 1510 to 1961, longest colonial rule.','Body: Civil Code, Comunidades, Mundkar Act, Church architecture, Carnival.','Way forward: UCC debate, heritage conservation.']],
['Tourism and mining dominate Goa’s economy. Discuss the sustainability challenge.',['Intro: GSDP data, per capita income.','Body: mining legal cycle, tourism seasonality, CRZ and land use.','Conclusion: diversification and green innovation economy.']],
['Evaluate the Mhadei tiger reserve controversy as a conservation-development conflict.',['Intro: Bombay HC order, SC status quo, CEC report.','Body: NTCA, Kali corridor, relocation claim, eco-tourism.','Conclusion: science-based zoning, community consent.']],
['The Mahadayi dispute tests cooperative federalism. Comment.',['Intro: tribunal 2010, award 2018.','Body: Kalasa-Banduri, ecological flows, Article 262.','Conclusion: negotiated settlement, ecological safeguards.']],
['Are small legislatures more prone to defections? Use Goa’s experience.',['Intro: 2019 and 2022 mergers.','Body: Tenth Schedule paragraph 4, Speaker’s role, voter alienation.','Conclusion: reforms such as time-bound decisions.']],
['Discuss Goa’s maritime and strategic relevance.',['Intro: Konkan coast position.','Body: Mormugao, INS Hansa, shipyard, NIO.','Conclusion: Indian Ocean strategy, coastal security.']]
];
P.upsc=function(){
  return sec('Constitutional map',tbl(['Provision','Relevance to Goa'],[
  ['Art. 3 and 4','Parliament’s power to form states; Goa’s reorganisation by the 1987 Act'],
  ['12th Amendment (1962)','Goa, Daman and Diu added to the First Schedule'],
  ['56th Amendment (1987)','Statehood, Art. 371-I'],
  ['Art. 371-I','Assembly of not less than 30 members'],
  ['Art. 164(1A)','Minimum 12 ministers'],
  ['71st Amendment (1992)','Konkani in Eighth Schedule'],
  ['Art. 44','Common civil code debate, with the Goa Civil Code as the reference'],
  ['Art. 262','Inter-state water disputes (Mahadayi)'],
  ['Tenth Schedule','Anti-defection, with 2019 and 2022 mergers']]))
  +sec('Compare small states with special provisions',tbl(['','Goa','Sikkim','Mizoram'],[
  ['Article','371-I','371-F','371-G'],['Assembly strength (actual)','40','32','40'],['Minimum ministers','12','12','12'],['Language note','Konkani (8th Sch.)','Nepali (8th Sch.)','Mizo, not in 8th Sch.']])+'<p class="cap">Sikkim and Mizoram details are included for comparison and should be checked '+V+'.</p>')
  +sec('Map-based practice',ul(['Mollem NP, Bhagwan Mahavir WLS, Mhadei, Netravali, Cotigao, Bondla, Dr Salim Ali.','Mandovi, Zuari, Chapora, Terekhol, Sal, Talpona, Galgibaga, Cumbarjua canal.','Mopa, Dabolim, Mormugao, Zuari Bridge, Atal Setu, Dudhsagar.','Old Goa, Chandor, Fort Aguada, Chapora, Cabo de Rama, Tiracol.','Nanda Lake, Morjim and Galgibaga turtle beaches.']))
  +sec('Practice MCQs (original, exam-style)',MCQ.map(function(q,i){return '<div class="q" data-a="'+q[2]+'"><p class="qt">Q'+(i+1)+'. '+q[0]+'</p>'+q[1].map(function(o,j){return '<button class="o" data-o="'+j+'">'+String.fromCharCode(65+j)+'. '+o+'</button>'}).join('')+'<div class="ex2"><b>Answer: '+String.fromCharCode(65+q[2])+'.</b> '+q[3]+'</div></div>'}).join('')+'<p class="cap">These are original practice questions. I did not copy past UPSC papers; add the real PYQs from the UPSC archive next to each topic.</p>')
  +sec('Mains answer skeletons',MAINS.map(function(m){return '<div class="q done" style="background:var(--mai-soft)"><p class="qt">'+m[0]+'</p>'+ul(m[1])+'</div>'}).join(''))
  +sec('Rapid-fire fact sheet',ul(['Smallest state by area; statehood 30 May 1987; 25th state.','Liberation Day 19 Dec; Revolution Day 18 June; Opinion Poll 16 Jan 1967.','Sonsogor 1,167 m; Mollem only NP; six WLS.','Mopa operational 5 Jan 2023; Konkan Railway 1998.','Konkani in Eighth Schedule 1992; Civil Code from 1867.','Feni GI 2009 '+V+'.']));
};

/* ---------- revision deck ---------- */
var CARDS=[
['history','When did Goa become a state, and which number?','30 May 1987, the 25th state (Goa, Daman and Diu Reorganisation Act 1987, 56th Amendment).'],
['upsc','Which article gives Goa a special provision?','Article 371-I: Assembly of not less than 30 members.'],
['history','Operation Vijay dates and Liberation Day?','17 to 19 December 1961; Goa Liberation Day is 19 December.'],
['history','What did the Opinion Poll of 1967 decide?','Goa stayed a separate Union Territory, not merged with Maharashtra (16 January 1967).'],
['physical','Highest point in Goa?','Sonsogor, 1,167 m, in the Western Ghats.'],
['environment','Goa’s only national park?','Mollem NP, which houses Dudhsagar Falls.'],
['environment','Largest wildlife sanctuary?','Bhagwan Mahavir WLS, about 240 sq km.'],
['environment','Goa’s first Ramsar site?','Nanda Lake.'],
['physical','Which river has Dudhsagar Falls?','Mandovi (Mahadayi or Mhadei).'],
['upsc','Which amendment put Konkani in the Eighth Schedule?','71st Amendment, 1992.'],
['history','What is unique about Goa’s civil law?','A common civil code based on the Portuguese Civil Code of 1867.'],
['history','When did the Goa Inquisition run?','1560 to 1812.'],
['history','Who started civil disobedience at Margao in 1946?','Ram Manohar Lohia, on 18 June 1946.'],
['governance','How many ministers must Goa have at minimum?','12, under Article 164(1A).'],
['governance','What happened in the 2022 Goa Assembly election?','BJP 20 of 40 seats; formed government with MGP and independents.'],
['infrastructure','When did Mopa airport begin operations?','5 January 2023; Manohar International Airport, named for Manohar Parrikar.'],
['infrastructure','Which bridge connects Panaji and Porvorim?','Atal Setu over the Mandovi, opened 2019.'],
['infrastructure','When did Konkan Railway open?','1998; Madgaon is the Goa hub.'],
['geopolitics','What is the Mahadayi dispute?','Water sharing among Goa, Karnataka and Maharashtra; tribunal formed 2010, award August 2018.'],
['geopolitics','Where is INS Hansa?','Dabolim, the naval air station that shares the civil enclave.'],
['economy','Goa’s per capita income in 2024-25?','Rs 7,09,045 at current prices, about three times India’s.'],
['schemes','What does Griha Aadhar give?','Rs 1,500 per month to eligible homemakers, credited by the 10th of the month.'],
['scitech','Which institute is at Dona Paula?','CSIR-National Institute of Oceanography.'],
['scitech','First GI-tagged liquor in India?','Goan Feni (cashew), 2009.'],
['society','What did Parliament pass in August 2025 for Goa?','The ST political reservation readjustment law; Lok Sabha 5 Aug, Rajya Sabha 11 Aug.'],
['current','What did the Supreme Court order on 8 Sept 2025?','Status quo in the Mhadei-Kotigaon area and a CEC report on the tiger reserve.'],
['environment','Which Act section covers tiger reserves?','Section 38V, Wildlife Protection Act 1972.'],
['history','Who was Goa’s first Chief Minister after 1961?','Dayanand Bandodkar (MGP), 1963 to 1973.']
];
function foot(){
  return '<footer class="foot"><p><b>About the numbers.</b> A green <i class="live" style="position:static">2026</i> tag marks figures checked against 2026 sources on 2 November 2026. An amber <i class="vf">verify</i> tag marks textbook-level facts to confirm. Everything else is standard material; check the State Economic Survey, Census and NCERT before the exam.</p><p style="margin:10px 0 0"><b>Sources</b></p><ul>'
  +[['Goa Economic Survey 2025-26','https://dpse.goa.gov.in/economic-survey-2025-26.pdf'],['PRS: Goa Budget Analysis 2026-27','https://prsindia.org/budgets/states/goa-budget-analysis-2026-27'],['PRS: Goa ST representation Bill','https://prsindia.org/billtrack/the-readjustment-of-representation-of-scheduled-tribes-in-assembly-constituencies-of-the-state-of-goa-bill-2024'],['Goa government press note, 10 March 2026','https://www.goa.gov.in/wp-content/uploads/2026/03/GRIHA-AADHAR-DSS.pdf'],['Bar and Bench: SC on Mhadei-Kotigaon','https://www.barandbench.com/news/supreme-court-halts-projects-in-goas-mhadei-kotigaon-orders-status-quo-on-proposed-tiger-reserve'],['Herald Goa: tiger reserve ruling','https://www.heraldgoa.in/goa/goa/supreme-court-rules-against-goa-government-in-tiger-reserve-dispute-2/427037'],['Herald Goa: new Governor','https://www.heraldgoa.in/goa/goa/pusapati-ashok-gajapathi-raju-to-replace-sreedharan-pillai-as-goa-governor/424977'],['Goemkarponn: 2027 election target','https://goemkarponn.com/goa-cm-sawant-aims-for-27-seats-in-2027-polls'],['Goemkarponn: infrastructure push','https://goemkarponn.com/goa-sees-major-infrastructure-push-with-%e2%82%b97500-cr-projects-underway-eco-survey'],['Navhind Times: GSDP and per capita income','https://navhindtimes.in/?p=452738']].map(function(s){return '<li><a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a></li>'}).join('')+'</ul></footer>';
}


const dossier = { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG };

export { DIMS, HUBS, HUBSUB, REGIONS, ORDER, P, MCQ, MAINS, CARDS, foot, mapSVG };
export default dossier;