const CACHE='ks-shell-v3';
const FILES=['./','./index.html','./field-guide.css?v=20261011-3','./app.js?v=20261011-3','./missions.js','./engine.js','./ai-worker.js','./favicon.ico','./manifest.webmanifest','./assets/logo.png','./assets/porch.webp','./assets/favicon-32.png','./assets/apple-touch-icon.png','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ks-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin===self.location.origin && FILES.some(f=>new URL(f,self.registration.scope).pathname===url.pathname)){
  event.respondWith(fetch(event.request,{cache:'no-cache'}).then(response=>{if(response.ok){const clone=response.clone();caches.open(CACHE).then(c=>c.put(event.request,clone));}return response;}).catch(()=>caches.match(event.request)));return;
 }
 if(url.hostname==='cdn.jsdelivr.net')event.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(event.request);if(hit)return hit;const r=await fetch(event.request);if(r.ok)await c.put(event.request,r.clone());return r;}));
});
