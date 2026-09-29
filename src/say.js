/* say(): strings are spoken in order with a short breath between them; numbers are pauses in ms; "|" inside a string also means a pause */
let SPOKE=false,SAYWARN=false;
function speakNow(t,after){const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=(S&&S.voiceRate)||.92;u.pitch=1;if(VOICE)u.voice=VOICE;let done=false;const go=()=>{if(done)return;done=true;clearTimeout(g);after&&after()};const g=setTimeout(go,1500+t.length*95);u.onstart=()=>{SPOKE=true};u.onend=go;u.onerror=go;try{speechSynthesis.speak(u)}catch(e){go()}}
function say(parts){if(!TTS||(S&&S.voice===false))return;const id=++SAYID;try{if(speechSynthesis.speaking||speechSynthesis.pending)speechSynthesis.cancel()}catch(e){}if(!VOICE)pickVoice();
 const list=[];(Array.isArray(parts)?parts:[parts]).forEach(p=>{if(typeof p==='number')list.push(p);else if(p)String(p).replace(/<[^>]+>/g,' ').split('|').forEach((t,i)=>{if(i)list.push(550);t=t.replace(/\s+/g,' ').trim();if(t)list.push(t)})});
 let i=0;const next=()=>{if(id!==SAYID||i>=list.length)return;const it=list[i++];if(typeof it==='number'){setTimeout(next,it);return}speakNow(it,()=>setTimeout(next,200))};
 next();
 if(!SPOKE&&!SAYWARN)setTimeout(()=>{if(!SPOKE&&!SAYWARN&&id===SAYID){SAYWARN=true;toast('Tap the speaker button to hear it. If it stays quiet, check that the device isn’t on silent.')}},4000)}
function hush(){SAYID++;try{speechSynthesis.cancel()}catch(e){}}
/* iPad/iPhone only allow speech after a tap: unlock it on the first touch */
document.addEventListener('pointerdown',function unlock(){if(!TTS)return;try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}document.removeEventListener('pointerdown',unlock,true)},true);
