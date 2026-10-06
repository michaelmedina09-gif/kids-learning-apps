window.__log=[];const T0=performance.now();const now=()=>Math.round(performance.now()-T0);
(function(){
 let voices=[];setTimeout(()=>{voices=[{name:'Samantha',lang:'en-US',default:true},{name:'Daniel',lang:'en-GB'}];ss.onvoiceschanged&&ss.onvoiceschanged()},1500);
 let cur=null,queue=[];
 const fin=(u,cut)=>{const L=u.__L;if(L&&L.e==null){L.e=now();if(cut)L.cut=true}};
 const startNext=()=>{if(cur||!queue.length)return;cur=queue.shift();const u=cur;
   u.__d=setTimeout(()=>{ // iPad: speech often starts late
     u.__L={kind:'tts',voice:u.voice?u.voice.name:'(system default)',text:u.text,s:now()};window.__log.push(u.__L);u.onstart&&u.onstart();
     u.__t=setTimeout(()=>{fin(u);cur=null;u.onend&&u.onend();startNext()},Math.max(300,u.text.length*62/(u.rate||1)))},700)};
 const ss={get speaking(){return !!cur},get pending(){return queue.length>0},getVoices:()=>voices,
   cancel(){queue=[];if(cur){clearTimeout(cur.__d);clearTimeout(cur.__t);fin(cur,true);cur=null}},
   speak(u){if(!u.text||!u.text.trim()||u.volume===0)return;queue.push(u);startNext()},onvoiceschanged:null};
 Object.defineProperty(window,'speechSynthesis',{value:ss,configurable:true});
 window.SpeechSynthesisUtterance=function(t){this.text=t;this.rate=1};
 const urlKey=new Map();const oc=URL.createObjectURL;URL.createObjectURL=function(b){const u=oc.call(URL,b);urlKey.set(u,window.__lastKey||'clip');return u};
 const ofetch=window.fetch;window.fetch=function(){return ofetch.apply(this,arguments)};
 const op=HTMLMediaElement.prototype.play;
 HTMLMediaElement.prototype.play=function(){const el=this;if(el.src.startsWith('data:'))return op.call(el);
   if(el.__L&&el.__L.e==null){el.__L.e=now();el.__L.cut=true}
   const L={kind:'clip',voice:'Heart',text:el.src.slice(-12),s:now()};window.__log.push(L);el.__L=L;
   if(!el.__w){el.__w=true;['ended','pause','error'].forEach(ev=>el.addEventListener(ev,()=>{if(el.__L&&el.__L.e==null)el.__L.e=now()}))}
   return op.call(el)};
})();
