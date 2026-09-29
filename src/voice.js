const TTS=('speechSynthesis' in window)&&typeof SpeechSynthesisUtterance!=='undefined';
let VOICES=[],VOICE=null,SAYID=0;
function voiceScore(v){const n=v.name||'',l=(v.lang||'').replace('_','-');let s=0;if(/^en-US/i.test(l))s+=20;else if(/^en/i.test(l))s+=8;else return -1;
 if(/premium/i.test(n))s+=60;if(/enhanced/i.test(n))s+=50;if(/neural|natural|online/i.test(n))s+=45;if(/Google US English/i.test(n))s+=25;if(/\b(Ava|Zoe|Samantha|Allison|Susan|Nicky|Evan|Nathan|Tom|Joelle|Noelle|Aria|Jenny|Emma|Ana)\b/i.test(n))s+=12;
 if(/Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Ralph|Kathy|Grandma|Grandpa|Rocko|Shelley|Sandy|Flo|Eddy|Reed/i.test(n))s-=80;return s}
function pickVoice(){try{VOICES=speechSynthesis.getVoices().filter(v=>voiceScore(v)>=0).sort((a,b)=>voiceScore(b)-voiceScore(a));const want=S&&S.voiceName;VOICE=(want&&VOICES.find(v=>v.name===want))||VOICES[0]||null}catch(e){}}
if(TTS){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice}catch(e){}}
/* say(): strings are spoken in order with a short breath between them; numbers are pauses in ms; "|" inside a string also means a pause */
function say(parts){if(!TTS||!S||S.voice===false)return;const id=++SAYID;try{speechSynthesis.cancel()}catch(e){}if(!VOICE)pickVoice();
 const list=[];(Array.isArray(parts)?parts:[parts]).forEach(p=>{if(typeof p==='number')list.push(p);else if(p)String(p).replace(/<[^>]+>/g,' ').split('|').forEach((t,i)=>{if(i)list.push(550);t=t.replace(/\s+/g,' ').trim();if(t)list.push(t)})});
 let i=0;const next=()=>{if(id!==SAYID||i>=list.length)return;const it=list[i++];if(typeof it==='number'){setTimeout(next,it);return}
  const u=new SpeechSynthesisUtterance(it);u.lang='en-US';u.rate=S.voiceRate||.92;u.pitch=1;if(VOICE)u.voice=VOICE;let done=false;const go=()=>{if(done)return;done=true;clearTimeout(g);setTimeout(next,220)};const g=setTimeout(go,1500+it.length*95);u.onend=go;u.onerror=go;try{speechSynthesis.speak(u)}catch(e){go()}};
 setTimeout(next,80)}
function hush(){SAYID++;try{speechSynthesis.cancel()}catch(e){}}
