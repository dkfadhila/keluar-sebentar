import test from 'node:test';
import assert from 'node:assert/strict';
import {eligible,rank} from '../dist/engine.js';
import {missions} from '../dist/missions.js';
test('hard constraints hold for every combination',()=>{
 for(const minutes of [5,10,15,20])for(const energy of [1,2,3])for(const seated of [true,false])for(const covered of [true,false]){
  const out=eligible(missions,{minutes,energy,seated,covered});assert.ok(out.length>0);
  for(const m of out){assert.ok(m.minutes<=minutes);assert.ok(m.energy<=energy);assert.ok(!seated||m.seated);assert.ok(!covered||m.covered);}
 }
});
test('semantic ranking respects nearest vector and input order independence',()=>{
 const result=rank([{id:'walk',minutes:10},{id:'bird',minutes:5}],[[1,0],[0,1]],[0,1]);assert.equal(result[0].id,'bird');assert.equal(result[0].score,1);
});
test('rejects invalid vectors rather than inventing a match',()=>{assert.throws(()=>rank(missions,[],[1]));assert.throws(()=>rank([{id:'x'}],[[NaN]],[1]));});
test('mission IDs unique and pocket cards complete',()=>{assert.equal(new Set(missions.map(m=>m.id)).size,missions.length);for(const m of missions){assert.equal(m.steps.length,3);assert.ok(m.title&&m.semantic&&m.take&&m.notice);}});
