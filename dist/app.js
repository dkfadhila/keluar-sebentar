import {missions} from './missions.js';
import {eligible} from './engine.js';
const $=id=>document.getElementById(id);
let current=missions[0],worker,ready=false,previewIndex=0,requestId=0;
const icons={sound:'♫',leaf:'❧',sky:'☁',path:'↗'};
const constraints=()=>({minutes:Number($('minutes').value),energy:Number($('energy').value),seated:$('seated').checked,covered:$('covered').checked});
function show(m,ai=false){
 current=m;$('category').textContent=m.category;$('duration').textContent=m.minutes+' MIN';$('mission-title').textContent=m.title;$('mission-description').textContent=m.description;$('mission-icon').textContent=icons[m.icon];$('take').textContent=m.take;
 $('steps').replaceChildren(...m.steps.map(s=>{const li=document.createElement('li');li.textContent=s;return li}));
 $('mode').textContent=ai?'MATCHED BY LOCAL AI':'CURATED PREVIEW';$('preview-note').textContent=ai?'Matched locally. Filtered for your time and preferences.':'A curated preview. Enable local AI to match your words.';
}
show(current);
document.querySelectorAll('[data-query]').forEach(b=>b.addEventListener('click',()=>{$('mood').value=b.dataset.query;invalidate();$('mood').focus()}));
function toast(text){$('toast').textContent=text;$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,3500)}
function invalidate(){ requestId++;$('alternatives').hidden=true;const valid=eligible([current],constraints()).length;if(!valid){previewIndex=0;show(eligible(missions,constraints())[0]);}else if($('mode').textContent==='MATCHED BY LOCAL AI'){show(current);}}
['minutes','energy','seated','covered'].forEach(id=>$(id).addEventListener('change',invalidate));
$('mood').addEventListener('input',invalidate);
$('preview').addEventListener('click',()=>{requestId++;const pool=eligible(missions,constraints());previewIndex=(previewIndex+1)%pool.length;show(pool[previewIndex]);$('alternatives').hidden=true;});
$('load-ai').addEventListener('click',()=>{
 $('load-ai').disabled=true;$('load-ai').textContent='Downloading model…';$('ai-status').textContent='Loading open-source model';$('error').hidden=true;$('download').hidden=false;
 worker?.terminate();worker=new Worker('./ai-worker.js',{type:'module'});
 worker.onmessage=({data})=>{
  if(data.type==='progress'){$('download').value=data.progress;$('ai-detail').textContent=`Downloading ${data.file.split('/').pop()} · ${Math.round(data.progress)}%. Keep this tab open.`;}
  if(data.type==='indexing'){$('download').hidden=true;$('ai-status').textContent='Model loaded · preparing mission embeddings';$('ai-detail').textContent='Reading the mission library locally. Almost ready.';}
  if(data.type==='ready'){ready=true;$('match').disabled=false;$('load-ai').hidden=true;$('download').hidden=true;$('ai-status').textContent='Local AI ready · multilingual MiniLM';$('ai-detail').textContent='Inference runs in this browser. Your mood stays on your device. English and Bahasa Indonesia welcome.';$('ai-dot').style.background='#203c53';}
  if(data.type==='result'){
   $('match').disabled=false;$('match').innerHTML='Find a mission <span>→</span>';
   if(data.requestId!==requestId){toast('Preferences changed. Find a new match when ready.');return;}
   if(!data.results.length){toast('No mission fits. Try changing your preferences.');return;}
   show(data.results[0],true);$('alternatives').replaceChildren(...data.results.slice(1).map(m=>{const b=document.createElement('button');b.type='button';b.textContent=m.title+' ↗';b.onclick=()=>show(m,true);return b;}));$('alternatives').hidden=false;
  }
  if(data.type==='error')fail(data.message);
 };
 worker.onerror=()=>fail('The AI worker could not start. Check your connection, then retry.');worker.postMessage({type:'load'});
});
function fail(message){
 $('error').hidden=false;$('error').textContent='AI could not complete: '+message+'. Curated browsing is still available.';$('download').hidden=true;
 if(!ready){$('load-ai').disabled=false;$('load-ai').textContent='Retry model download ↓';$('ai-status').textContent='Local AI unavailable';}else{$('match').disabled=false;$('match').innerHTML='Find a mission <span>→</span>';}
}
$('planner-form').addEventListener('submit',e=>{e.preventDefault();if(!ready)return;const query=$('mood').value.trim();if(!query){$('mood').focus();toast('Add a thought or choose one of the small wishes.');return;}$('error').hidden=true;$('match').disabled=true;$('match').textContent='Finding a match on your device…';worker.postMessage({type:'match',query,constraints:constraints(),requestId:++requestId});});
let pocketURL;
$('save').addEventListener('click',()=>{
 const card=`KELUAR SEBENTAR\n${current.title} · ${current.minutes} minutes\n\n${current.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n${current.take}\n\nWhen you return: ${current.notice}\n\nChoose a safe, familiar place. Try another day if conditions feel wrong.\n`;
 if(pocketURL)URL.revokeObjectURL(pocketURL);pocketURL=URL.createObjectURL(new Blob([card],{type:'text/plain;charset=utf-8'}));$('pocket-text').value=card;$('pocket-status').hidden=true;$('download-card').href=pocketURL;$('download-card').download='keluar-sebentar-'+current.id+'.txt';$('pocket').showModal();
});
$('close-pocket').onclick=()=>$('pocket').close();
$('pocket').addEventListener('close',()=>{if(pocketURL){URL.revokeObjectURL(pocketURL);pocketURL=undefined;}});
$('copy-card').onclick=async()=>{try{await navigator.clipboard.writeText($('pocket-text').value);$('pocket-status').textContent='Card copied. Paste it into your notes.';}catch{$('pocket-text').focus();$('pocket-text').select();$('pocket-status').textContent='Select and copy the card text with your browser.';}$('pocket-status').hidden=false;};
$('begin').onclick=()=>{$('outside-summary').textContent=current.title+' · about '+current.minutes+' minutes';$('outside').showModal()};
$('cancel-outside').onclick=()=>$('outside').close();
$('back').onclick=()=>{$('outside').close();$('reflection-label').textContent=current.notice;$('reflection-text').value='';$('reflection').showModal()};
$('skip').onclick=()=>$('reflection').close();
const journal=document.createElement('details');journal.className='journal';const journalTitle=document.createElement('summary');journalTitle.textContent='Little moments kept on this device';const memoryList=document.createElement('ul');journal.append(journalTitle,memoryList);$('how').append(journal);
function readMemories(){try{const raw=JSON.parse(localStorage.getItem('ks-memories')||'[]');return Array.isArray(raw)?raw:[];}catch{return [];}}
function renderMemories(){const saved=readMemories();journal.hidden=!saved.length;memoryList.replaceChildren(...saved.slice(-5).reverse().map(item=>{const li=document.createElement('li');li.textContent=String(item.memory||'');return li;}));}renderMemories();
$('keep').onclick=()=>{const memory=$('reflection-text').value.trim();if(!memory){$('reflection').close();return;}try{const saved=readMemories();saved.push({mission:current.id,memory,date:new Date().toISOString()});localStorage.setItem('ks-memories',JSON.stringify(saved.slice(-50)));renderMemories();$('reflection').close();toast('A little moment, kept on this device.');}catch{toast('This browser could not save. Your moment still counts.');}};
$('erase').onclick=()=>{try{localStorage.removeItem('ks-memories');renderMemories();toast('Your saved reflections are erased.');}catch{toast('Browser storage is unavailable.');}};
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js?v=20261011-4',{updateViaCache:'none'}).catch(()=>{});
