/* ---------- kawaii character engine ---------- */
let KWN=0;const OL='#3d2c2e';
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=Math.abs(amt),f=amt<0?0:255;r=Math.round(r+(f-r)*t);g=Math.round(g+(f-g)*t);b=Math.round(b+(f-b)*t);return'#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
const KSIZE={xs:40,sm:56,md:78,lg:112,xl:176};
function kawaii(sp,size='md',cls='',label=''){const px=KSIZE[size]||size,u='k'+(KWN++),m=sp.m,b=sp.b||'#fff6ea',a=sp.a||shade(m,-.25),f=sp.f||[],has=x=>f.includes(x),ey=sp.ey||70;
 const st=`stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;let back='',mid='',front='';
 const EARS={pointy:`<path d="M26 52 L22 10 L54 34Z" fill="${m}" ${st}/><path d="M30 42 L28 22 L44 35Z" fill="${a}"/><path d="M94 52 L98 10 L66 34Z" fill="${m}" ${st}/><path d="M90 42 L92 22 L76 35Z" fill="${a}"/>`,
  round:`<circle cx="30" cy="36" r="15" fill="${m}" ${st}/><circle cx="30" cy="36" r="7.5" fill="${a}"/><circle cx="90" cy="36" r="15" fill="${m}" ${st}/><circle cx="90" cy="36" r="7.5" fill="${a}"/>`,
  long:`<ellipse cx="42" cy="6" rx="12" ry="32" transform="rotate(-12 42 6)" fill="${m}" ${st}/><ellipse cx="42" cy="9" rx="5.5" ry="21" transform="rotate(-12 42 9)" fill="${a}"/><ellipse cx="78" cy="6" rx="12" ry="32" transform="rotate(12 78 6)" fill="${m}" ${st}/><ellipse cx="78" cy="9" rx="5.5" ry="21" transform="rotate(12 78 9)" fill="${a}"/>`,
  tiny:`<circle cx="34" cy="36" r="10" fill="${m}" ${st}/><circle cx="34" cy="36" r="4.5" fill="${a}"/><circle cx="86" cy="36" r="10" fill="${m}" ${st}/><circle cx="86" cy="36" r="4.5" fill="${a}"/>`,
  tufts:`<path d="M30 40 L22 12 L48 32Z" fill="${a}" ${st}/><path d="M90 40 L98 12 L72 32Z" fill="${a}" ${st}/>`};
 if(has('foxtail'))back+=`<path d="M96 98 C126 90 134 58 118 42 C114 64 104 78 88 84Z" fill="${m}" ${st}/><path d="M118 42 C126 50 128 60 125 70 C118 64 114 54 118 42Z" fill="#fff"/>`;
 if(has('ringtail'))back+=`<path d="M96 98 C124 94 134 72 124 56 C118 72 106 80 90 86Z" fill="${m}" ${st}/><g stroke="${a}" stroke-width="6" stroke-linecap="round"><path d="M119 64 L128 68"/><path d="M111 80 L120 86"/></g>`;
 if(has('dtail'))back+=`<path d="M22 98 C2 106 -12 98 -12 84 C-4 92 6 92 22 86Z" fill="${m}" ${st}/>`;
 if(has('club'))back+=`<path d="M22 96 C8 104 0 102 -4 96" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M22 96 C8 104 0 102 -4 96" stroke="${m}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="-8" cy="93" r="10" fill="${a}" ${st}/>`;
 if(has('fin'))back+=`<path d="M56 30 C62 8 80 2 92 4 C82 12 78 22 78 34Z" fill="${a}" ${st}/><path d="M96 102 C108 112 126 108 132 94 C120 100 110 98 102 92Z" fill="${a}" ${st}/>`;
 if(has('flippers'))back+=`<path d="M18 84 C2 90 -2 104 6 108 C12 98 18 94 24 92Z" fill="${a}" ${st}/><path d="M102 84 C118 90 122 104 114 108 C108 98 102 94 96 92Z" fill="${a}" ${st}/>`;
 if(has('bumps'))back+=`<circle cx="42" cy="34" r="13" fill="${m}" ${st}/><circle cx="78" cy="34" r="13" fill="${m}" ${st}/>`;
 if(has('frill'))back+=`<path d="M4 78 C2 30 32 4 60 4 C88 4 118 30 116 78Z" fill="${a}" ${st}/><g fill="${shade(a,.4)}"><circle cx="17" cy="42" r="5"/><circle cx="36" cy="19" r="5"/><circle cx="60" cy="12" r="5"/><circle cx="84" cy="19" r="5"/><circle cx="103" cy="42" r="5"/></g>`;
 if(has('sail'))back+=`<path d="M24 46 C24 6 44 -8 60 -8 C76 -8 96 6 96 46Z" fill="${a}" ${st}/><g stroke="${shade(a,-.2)}" stroke-width="2.5" stroke-linecap="round"><path d="M40 38 L37 6"/><path d="M60 36 L60 -3"/><path d="M80 38 L83 6"/></g>`;
 if(has('plates'))back+=[[28,34,-32],[44,20,-14],[62,15,4],[80,20,20],[95,34,36]].map(([x,y,r])=>`<path d="M${x-10} ${y+12} Q${x} ${y-24} ${x+10} ${y+12}Z" transform="rotate(${r} ${x} ${y})" fill="${a}" ${st}/>`).join('');
 if(has('spikes'))back+=[[33,32,-30],[49,20,-10],[67,19,10],[84,28,28]].map(([x,y,r])=>`<path d="M${x-7} ${y+10} L${x} ${y-12} L${x+7} ${y+10}Z" transform="rotate(${r} ${x} ${y})" fill="${a}" ${st}/>`).join('');
 if(has('wings'))back+=`<path d="M22 62 C4 40 -14 52 -14 82 C-4 74 8 76 18 84Z" fill="${a}" ${st}/><path d="M98 62 C116 40 134 52 134 82 C124 74 112 76 102 84Z" fill="${a}" ${st}/>`;
 if(has('crest'))back+=`<path d="M56 30 C48 8 70 -2 88 2 C76 8 72 18 72 32Z" fill="${a}" ${st}/>`;
 if(has('antlers'))back+=`<g stroke="#8a5a30" stroke-width="5.5" fill="none" stroke-linecap="round"><path d="M46 30 L42 8"/><path d="M43 16 L32 8"/><path d="M74 30 L78 8"/><path d="M77 16 L88 8"/></g>`;
 if(has('legs'))back+=`<g stroke="#e8708f" stroke-width="5" stroke-linecap="round"><path d="M48 104 L48 128"/><path d="M72 104 L72 128"/><path d="M42 128 L54 128"/><path d="M66 128 L78 128"/></g>`;
 if(sp.ears)back+=EARS[sp.ears];
 const feet=has('legs')||has('nofeet')?'':`<ellipse cx="42" cy="110" rx="11" ry="7" fill="${shade(m,-.08)}" ${st}/><ellipse cx="78" cy="110" rx="11" ry="7" fill="${shade(m,-.08)}" ${st}/>`;
 const body=`<path d="M60 26 C94 26 108 52 108 76 C108 100 88 112 60 112 C32 112 12 100 12 76 C12 52 26 26 60 26Z" fill="url(#${u})" ${st}/>`;
 if(!has('nobelly'))mid+=`<ellipse cx="60" cy="98" rx="25" ry="11" fill="${b}"/>`;
 if(has('muzzle'))mid+=`<ellipse cx="60" cy="${ey+15}" rx="17" ry="11" fill="${b}"/>`;
 if(has('mask'))mid+=`<path d="M20 ${ey+4} C28 ${ey-12} 48 ${ey-10} 60 ${ey-2} C72 ${ey-10} 92 ${ey-12} 100 ${ey+4} C92 ${ey+14} 72 ${ey+10} 60 ${ey+6} C48 ${ey+10} 28 ${ey+14} 20 ${ey+4}Z" fill="${a}"/>`;
 if(has('shell'))mid+=`<path d="M13 74 C13 38 36 22 60 22 C84 22 107 38 107 74 C88 64 32 64 13 74Z" fill="${a}" ${st}/><g fill="none" stroke="${shade(a,.35)}" stroke-width="2.5" stroke-linecap="round"><path d="M60 27 L60 64"/><path d="M36 34 L46 62"/><path d="M84 34 L74 62"/><path d="M18 56 C40 48 80 48 102 56"/></g>`;
 if(has('spots'))mid+=`<g fill="#fff" opacity=".85"><circle cx="30" cy="54" r="4"/><circle cx="41" cy="42" r="3"/><circle cx="90" cy="54" r="4"/><circle cx="79" cy="42" r="3"/><circle cx="60" cy="36" r="3"/></g>`;
 if(has('armor'))mid+=`<g fill="${a}" stroke="${OL}" stroke-width="2"><circle cx="36" cy="40" r="5.5"/><circle cx="50" cy="32" r="5.5"/><circle cx="66" cy="32" r="5.5"/><circle cx="82" cy="39" r="5.5"/><circle cx="26" cy="54" r="5"/><circle cx="94" cy="54" r="5"/></g>`;
 if(has('owlwings'))mid+=`<path d="M15 72 C6 86 12 100 24 104 C20 94 20 84 15 72Z" fill="${a}" ${st}/><path d="M105 72 C114 86 108 100 96 104 C100 94 100 84 105 72Z" fill="${a}" ${st}/>`;
 if(has('vmarks'))mid+=`<g stroke="${a}" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M50 94 l4 4 l4 -4"/><path d="M62 94 l4 4 l4 -4"/><path d="M56 102 l4 4 l4 -4"/></g>`;
 if(has('owldisc'))mid+=`<circle cx="43" cy="${ey}" r="14" fill="${b}" ${st}/><circle cx="77" cy="${ey}" r="14" fill="${b}" ${st}/>`;
 const eyes=`<g fill="#2a1d22"><ellipse cx="43" cy="${ey}" rx="7" ry="8.5"/><ellipse cx="77" cy="${ey}" rx="7" ry="8.5"/></g><g fill="#fff"><circle cx="40.6" cy="${ey-3.2}" r="2.9"/><circle cx="74.6" cy="${ey-3.2}" r="2.9"/><circle cx="45.2" cy="${ey+3}" r="1.4"/><circle cx="79.2" cy="${ey+3}" r="1.4"/></g>`;
 const blush=`<g fill="#ff8fa6" opacity=".55"><ellipse cx="29" cy="${ey+13}" rx="8" ry="4.5"/><ellipse cx="91" cy="${ey+13}" rx="8" ry="4.5"/></g>`;
 if(has('snout'))front+=`<ellipse cx="60" cy="${ey+19}" rx="27" ry="13" fill="${shade(m,.22)}" ${st}/><circle cx="53" cy="${ey+14}" r="2" fill="${OL}"/><circle cx="67" cy="${ey+14}" r="2" fill="${OL}"/><path d="M47 ${ey+22} Q60 ${ey+29} 73 ${ey+22}" fill="none" ${st}/>`;
 else if(has('beaksnout'))front+=`<ellipse cx="60" cy="${ey+15}" rx="13" ry="8" fill="${shade(m,.3)}" ${st}/><path d="M54 ${ey+16} Q60 ${ey+20} 66 ${ey+16}" fill="none" ${st} stroke-width="2.4"/>`;
 else if(has('beak'))front+=`<path d="M54 ${ey+6} C51 ${ey+20} 60 ${ey+29} 71 ${ey+24} C66 ${ey+22} 64 ${ey+14} 66 ${ey+6}Z" fill="#fff" ${st}/><path d="M64 ${ey+19} C63 ${ey+25} 67 ${ey+27} 71 ${ey+24} C68 ${ey+23} 66 ${ey+21} 66 ${ey+17}Z" fill="${OL}"/>`;
 else if(has('owlbeak'))front+=`<path d="M55 ${ey+8} L65 ${ey+8} L60 ${ey+16}Z" fill="#f2a93b" ${st}/>`;
 else if(has('grin'))front+=`<path d="M51 ${ey+11} Q60 ${ey+23} 69 ${ey+11}Z" fill="#8a2f45" ${st}/><path d="M55 ${ey+17} Q60 ${ey+20} 65 ${ey+17}" stroke="#ff8fa6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 else if(has('nose'))front+=`<ellipse cx="60" cy="${ey+9}" rx="4.2" ry="3.2" fill="${sp.n||OL}"/><path d="M53.5 ${ey+13.5} q3.2 4 6.5 0 q3.2 4 6.5 0" fill="none" ${st} stroke-width="2.4"/>`;
 else front+=`<path d="M55 ${ey+11} q5 5.5 10 0" fill="none" ${st} stroke-width="2.4"/>`;
 if(has('horns'))front+=`<path d="M38 50 L32 26 L48 44Z" fill="#fff4dc" ${st}/><path d="M82 50 L88 26 L72 44Z" fill="#fff4dc" ${st}/><path d="M56 ${ey+4} L60 ${ey-6} L64 ${ey+4}Z" fill="#fff4dc" ${st}/>`;
 if(has('arms'))front+=`<ellipse cx="35" cy="94" rx="7.5" ry="4.8" transform="rotate(-35 35 94)" fill="${m}" ${st}/><ellipse cx="85" cy="94" rx="7.5" ry="4.8" transform="rotate(35 85 94)" fill="${m}" ${st}/>`;
 if(has('whiskers'))front+=`<g stroke="${OL}" stroke-width="1.8" stroke-linecap="round"><path d="M42 ${ey+14} L28 ${ey+11}"/><path d="M42 ${ey+18} L28 ${ey+19}"/><path d="M78 ${ey+14} L92 ${ey+11}"/><path d="M78 ${ey+18} L92 ${ey+19}"/></g>`;
 const defs=`<defs><radialGradient id="${u}" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="${shade(m,.38)}"/><stop offset=".55" stop-color="${m}"/><stop offset="1" stop-color="${shade(m,-.1)}"/></radialGradient></defs>`;
 return `<svg class="kw ${cls}" width="${px}" height="${Math.round(px*160/152)}" viewBox="-16 -28 152 160" role="img" aria-label="${label}">${defs}${back}${feet}${body}${mid}${eyes}${blush}${front}</svg>`}
