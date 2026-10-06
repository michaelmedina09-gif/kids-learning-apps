/* --- voice: ONE channel. Recorded Heart clips first (packed in au/p<N>.json); the device voice only for
   lines nobody could pre-record (her own writing, AI feedback). Each part waits for the previous to finish. --- */
/*AU_KEYS_START*/const AU=new Set([]);/*AU_KEYS_END*/
const AU_P=48,AUPK={},AUURL={};
const AU_SILENCE='__SILENCE__';
const AU_NUM_RE=/(\$\d+(?:\.\d{2})?|\d{1,2}:\d{2}|\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)/;
const AU_SENT_RE=/(?:[^.!?]|\.(?=\d))+[.!?]*["”’']?/g;
function auSpoken(t){return String(t).replace(/☐/g,' blank ').replace(/=/g,' equals ').replace(/\+/g,' plus ').replace(/−/g,' minus ').replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/%/g,' percent ').replace(/</g,' less than ').replace(/>/g,' greater than ')}
function auNorm(t){return auSpoken(t).toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
function auKey(t){const n=auNorm(t);if(!n)return'';let h=5381;for(let i=0;i<n.length;i++)h=((h*33)^n.charCodeAt(i))>>>0;return n.replace(/ /g,'-').slice(0,40).replace(/-+$/,'')+'-'+h.toString(36)}
function auInt(n){if(n<100)return[String(n)];const o=[];if(n>=1000){o.push(...auInt(Math.floor(n/1000)),'thousand');n%=1000;if(!n)return o}if(n>=100){o.push(Math.floor(n/100)+' hundred');n%=100}if(n)o.push(String(n));return o}
function auNumClips(tok){let m;
 if(tok[0]==='$'){const v=tok.slice(1).split('.'),d=+v[0],c=v[1]?+v[1]:0;const o=d?[...auInt(d),d===1?(c?'dollar and':'dollar'):(c?'dollars and':'dollars')]:[];if(c||!d)o.push(...auInt(c),c===1?'cent':'cents');return o}
 if((m=tok.match(/^(\d{1,2}):(\d{2})$/))){const h=+m[1],mm=+m[2];return mm===0?[String(h),"o'clock"]:mm<10?[String(h),'oh',String(mm)]:[String(h),String(mm)]}
 if(tok.includes(','))return auInt(+tok.replace(/,/g,''));
 if(tok.includes('.')){const[a,b]=tok.split('.');return[...auInt(+a),'point',...b.split('')]}
 const n=+tok;return n>999999?null:auInt(n)}
function auPlan(t){const k=auKey(t);if(!k)return[];if(AU.has(k))return[{c:k,x:t}];const out=[];
 for(const s0 of(String(t).match(AU_SENT_RE)||[String(t)])){const s=s0.trim(),ks=auKey(s);if(!ks)continue;if(AU.has(ks)){out.push({c:ks,x:s});continue}
  const ps=s.split(AU_NUM_RE),sub=[];let ok=true;
  for(let i=0;i<ps.length&&ok;i++){const p=ps[i];if(i%2){const cl=auNumClips(p);if(!cl){ok=false;break}for(const c of cl){const kc=auKey(c);if(!AU.has(kc)){ok=false;break}sub.push({c:kc,x:c})}}else{const kp=auKey(p);if(!kp)continue;if(AU.has(kp))sub.push({c:kp,x:p});else ok=false}}
  if(ok&&sub.length)out.push(...sub);else out.push({t:s})}
 return out}
function auPack(n){return AUPK[n]||(AUPK[n]=fetch('au/p'+n+'.json').then(r=>{if(!r.ok)throw 0;return r.json()}).catch(e=>{delete AUPK[n];throw e}))}
function auUrl(key){if(AUURL[key])return Promise.resolve(AUURL[key]);return auPack(parseInt(key.slice(key.lastIndexOf('-')+1),36)%AU_P).then(pk=>{const b=pk[key];if(!b)throw 0;const s=atob(b),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return AUURL[key]=URL.createObjectURL(new Blob([u],{type:'audio/mpeg'}))})}
let AUEL=null,AUPRE=false;
function auStop(){if(AUEL){try{AUEL.onended=AUEL.onerror=AUEL.onloadedmetadata=null;AUEL.pause()}catch(e){}}}
function auClip(key,done){let fin=false;const go=ok=>{if(fin)return;fin=true;clearTimeout(g);if(AUEL)AUEL.onended=AUEL.onerror=null;done(ok)};const g=setTimeout(()=>go(true),15000);
 auUrl(key).then(url=>{if(fin)return;const a=AUEL=AUEL||new Audio();a.muted=false;a.onended=()=>go(true);a.onerror=()=>go(false);a.src=url;const pr=a.play();if(pr&&pr.catch)pr.catch(()=>go(false));SPOKE=true},()=>go(false))}
function ttsIdle(cb){let n=0;const chk=()=>{let busy=false;try{busy=TTS&&(speechSynthesis.speaking||speechSynthesis.pending)}catch(e){}if(!busy||n>16)return cb();if(n===0)try{speechSynthesis.cancel()}catch(e){}n++;setTimeout(chk,50)};chk()}
function speakNow(t,after){const id=SAYID,plan=window.__NO_AU?[{t}]:auPlan(t);let i=0;
 const next=()=>{if(id!==SAYID)return;if(i>=plan.length){after&&after();return}const p=plan[i++];
  if(p.c)ttsIdle(()=>{if(id!==SAYID)return;auClip(p.c,ok=>{if(id!==SAYID)return;if(ok)return setTimeout(next,35);const rest=[p,...plan.slice(i)].map(x=>x.x||x.t).join(' ');i=plan.length;ttsNow(rest,()=>{if(id===SAYID)after&&after()})})});
  else ttsNow(p.t,()=>setTimeout(next,60))};
 next()}
function ttsNow(t,after){t=auSpoken(t).replace(/\s+/g,' ').trim();if(!t||!TTS){after&&after();return}
 const start=()=>{const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=(S&&S.voiceRate)||.92;u.pitch=1;if(VOICE)u.voice=VOICE;let done=false,started=false,g=null;
  const go=()=>{if(done)return;done=true;clearTimeout(g);after&&after()};
  g=setTimeout(()=>{if(!started)try{speechSynthesis.cancel()}catch(e){}go()},3500);
  u.onstart=()=>{started=true;SPOKE=true;clearTimeout(g);g=setTimeout(go,4000+t.length*120)};u.onend=go;u.onerror=go;
  try{auStop();speechSynthesis.speak(u)}catch(e){go()}};
 if(VOICE)return start();let n=0;const wait=()=>{pickVoice();if(VOICE||n++>24)return start();setTimeout(wait,50)};wait()}
