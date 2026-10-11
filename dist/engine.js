export function eligible(missions, {minutes,energy,seated,covered}) {
 return missions.filter(m=>m.minutes<=minutes && m.energy<=energy && (!seated || m.seated) && (!covered || m.covered));
}
export function rank(missions,vectors,query) {
 if(!query.length || vectors.length!==missions.length) throw new Error('Invalid embedding dimensions');
 return missions.map((mission,i)=>{
  if(vectors[i].length!==query.length) throw new Error('Invalid embedding dimensions');
  const score = vectors[i].reduce((sum,n,j)=>sum+n*query[j],0);
  if(!Number.isFinite(score)) throw new Error('Invalid embedding');
  return {...mission,score};
 }).sort((a,b)=>b.score-a.score || a.minutes-b.minutes);
}
