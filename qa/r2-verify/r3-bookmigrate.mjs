// Round-2 (pre-fix) Book Club save: single art/story fields migrate to arts[]/stories[] and still show
import {open,shot,log} from './lib.mjs';
const PNG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
const st={v:1,name:'Mia',created:1,updated:Date.now(),skills:{},placement:{math:true,spell:true,write:true,at:1},hearts:50,rescueHearts:5,current:'fox',rescued:[],streak:{n:1,last:null},days:{},missed:{},writing:[],
 books:[{id:'b1',title:'Old Book',author:'A. Writer',chapters:10,color:'#4c8dff',log:[{ch:1,date:'2026-09-28',summary:'Mara found a box.',qs:[],art:true,artId:'artOLD1',story:'Mara flew to the moon with her cat.'},{ch:2,date:'2026-09-28',summary:'She ran.',qs:[],art:false,story:null,artId:null}]}],bookCur:'b1'};
const init=`if(!sessionStorage.getItem('s')){localStorage.setItem('critter-cove-v1',${JSON.stringify(JSON.stringify(st))});localStorage.setItem('critter-cove-art-artOLD1',${JSON.stringify(PNG)});localStorage.setItem('critter-cove-art-idx','["artOLD1"]');sessionStorage.setItem('s','1')}`;
const p=await open('cove','ipad',{init,wait:1000});
const e=await p.evaluate(()=>S.books[0].log.map(e=>({arts:e.arts,stories:e.stories})));log('migrated',JSON.stringify(e));
console.log(JSON.stringify(e[0].arts)==='["artOLD1"]'&&e[0].stories.length===1&&e[1].arts.length===0&&e[1].stories.length===0?'PASS old art/story migrated to arrays':'FAIL migration');
await p.click('[data-act="bookclub"]');await p.waitForTimeout(1000);const g=await p.evaluate(()=>({img:document.querySelectorAll('.bc-gitem img').length,ok:document.querySelectorAll('.bc-gitem img.ok').length,st:document.querySelectorAll('.bc-gitem.story').length}));log('gallery',g);
console.log(g.img===1&&g.ok===1&&g.st===1?'PASS old drawing + story visible in gallery':'FAIL gallery '+JSON.stringify(g));await shot(p,'r3-cove-bookmigrate-shelf');
console.log(p.errs.length?'FAIL errors '+p.errs.join('|'):'PASS no errors');await p.b.close();
