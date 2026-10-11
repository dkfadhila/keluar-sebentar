import { missions } from './missions.js';
import { eligible, rank } from './engine.js';
let extractor, vectors;
const MODEL = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
async function load(){
 const {pipeline,env} = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js');
 env.allowLocalModels=false;
 env.backends.onnx.wasm.numThreads=1;
 extractor=await pipeline('feature-extraction',MODEL,{dtype:'q8',device:'wasm',progress_callback:p=>{
  if(p.status==='progress') self.postMessage({type:'progress',file:p.file,progress:p.progress});
 }});
 self.postMessage({type:'indexing'});
 vectors=[];
 for (const m of missions){
  const v=await extractor(m.semantic,{pooling:'mean',normalize:true});
  vectors.push(Array.from(v.data));
 }
 self.postMessage({type:'ready',model:MODEL});
}
self.onmessage=async ({data})=>{
 try {
  if(data.type==='load') await load();
  if(data.type==='match'){
   if(!extractor || !vectors) throw new Error('Model has not loaded yet');
   const q=await extractor(data.query,{pooling:'mean',normalize:true});
   const candidates=eligible(missions,data.constraints);
   const selected=candidates.map(m=>vectors[missions.findIndex(x=>x.id===m.id)]);
   const results=rank(candidates,selected,Array.from(q.data));
   self.postMessage({type:'result',results:results.slice(0,3),requestId:data.requestId});
  }
 } catch(error){self.postMessage({type:'error',message:String(error.message||error)});}
};
