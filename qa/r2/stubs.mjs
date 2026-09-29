// In-memory stand-ins for window.claude db + sample. Never touches a live db.
export const STUB=`window.__db={};window.__dbWrites=[];window.__prompts=[];
window.claude={use:async(cap)=>{
 if(cap==='db')return{doc:(path)=>({get:async()=>({exists:!!window.__db[path],data:()=>JSON.parse(JSON.stringify(window.__db[path]))}),set:async(d)=>{window.__db[path]=JSON.parse(JSON.stringify(d));window.__dbWrites.push({path,bytes:JSON.stringify(d).length})}})};
 if(cap==='sample')return{limits:async()=>({images:true}),json:async(prompt,opts)=>{window.__prompts.push({prompt,images:!!(opts&&opts.images)});await new Promise(r=>setTimeout(r,150));
  if(/Write 3 short, fun questions/.test(prompt))return{questions:[
   {q:'You wrote that Mara found a strange box. Why do you think she opened it?',kind:'summary',grounded:true,basis:'Mara found a strange box'},
   {q:'Why did Lina climb the Pipeworks tower to look for the message?',kind:'stem',grounded:false,basis:''},
   {q:'What do you think Doon will say when he sees the box?',kind:'stem',grounded:true,basis:''},
   {q:'How do you think Mara felt when the lights went out?',kind:'summary',grounded:true,basis:'the lights went out'}],pageText:'The lights went out and Mara held the box tight.'};
  if(/answered questions about a chapter/.test(prompt))return{replies:['What a thoughtful reason. Mara sounds brave!','Great thinking! Did Doon help her?','Love your prediction!']};
  if(/HANDWRITTEN/.test(prompt))return{transcript:'Mara ran to the roof because she was scared.',who:true,what:true,why:true,glow:'You told who and why. Clear!',grow:'Tell what Mara found on the roof.'};
  if(/"who":true/.test(prompt))return{who:true,what:true,why:true,glow:'You told who, what and why. Super clear!',grow:'Try naming the place where Lina was.',fixes:[{wrong:'storroom',right:'storeroom',why:'spelling'}]};
  return{stars:2,glow:'You wrote a fun adventure!',grow:'Add one more detail.',fixes:[],rubric:{topic:2,details:1,organization:1,conventions:2},example:''}}};
 throw Object.assign(new Error('no'),{code:'not_declared'})}};`;
