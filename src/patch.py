import re
s=open('critter-cove.html').read()
css=open('new.css').read()
s=re.sub(r'<link href="https://fonts.googleapis.com/css2[^>]+>','<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Lexend:wght@400;500;600;700&display=swap" rel="stylesheet">',s)
s=re.sub(r'<style>.*?</style>','<style>\n'+css+'</style>',s,flags=re.S)
icons=r'''/* ---------- icons ---------- */
const ic=inner=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
const ICON={
 heart:ic('<path d="M12 20.5S3.5 15.4 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 6.2-8.5 11.3-8.5 11.3z" fill="#ff5d47"/><path d="M7.3 7.8a2.6 2.6 0 0 0-1.9 2.1" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".75"/>'),
 flame:ic('<path d="M12 2.5c.8 3.4 5.5 5.6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.7 1.3-4.4 2.8-5.5.2 1.9 1 3 2.1 3.4-.7-3.1-.2-6 .6-8.9z" fill="#ff8a3d"/><path d="M12 12.5c.4 1.6 2.6 2.4 2.6 4.6a2.6 2.6 0 0 1-5.2 0c0-1.5 1.2-2.4 2.6-4.6z" fill="#ffd166"/>'),
 bolt:ic('<path d="M13.5 2 4.5 13.5H11L9.8 22l9.7-12.5H13z" fill="#ffb627" stroke="#d98e00" stroke-width="1" stroke-linejoin="round"/>'),
 drop:ic('<path d="M12 2.8s6.3 7 6.3 11.6a6.3 6.3 0 0 1-12.6 0C5.7 9.8 12 2.8 12 2.8z" fill="#3aa0e8"/><path d="M9.2 13.8a3 3 0 0 0 2.3 3.2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".8"/>'),
 pencil:ic('<path d="M4 20l1.2-4.6L15.6 5a2.1 2.1 0 0 1 3 0l.4.4a2.1 2.1 0 0 1 0 3L8.6 18.8z" fill="#ffc53d"/><path d="M15.2 5.4l3.4 3.4" stroke="#ff6b57" stroke-width="2.6"/><path d="M4 20l1.2-4.6 3.4 3.4z" fill="#132530"/>'),
 calc:ic('<rect x="4.5" y="2.5" width="15" height="19" rx="3" fill="#0f8b8d"/><rect x="7" y="5" width="10" height="4" rx="1" fill="#d9f2ef"/><g fill="#fff"><circle cx="8.5" cy="12.5" r="1.2"/><circle cx="12" cy="12.5" r="1.2"/><circle cx="15.5" cy="12.5" r="1.2"/><circle cx="8.5" cy="16.5" r="1.2"/><circle cx="12" cy="16.5" r="1.2"/></g><circle cx="15.5" cy="16.5" r="1.2" fill="#ffc53d"/>'),
 star:ic('<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="#ffc53d" stroke="#e0a414" stroke-width="1" stroke-linejoin="round"/>'),
 paw:ic('<g fill="#fff"><ellipse cx="6.5" cy="10" rx="2" ry="2.6"/><ellipse cx="10" cy="6.3" rx="2" ry="2.6"/><ellipse cx="14.8" cy="6.3" rx="2" ry="2.6"/><ellipse cx="18.2" cy="10" rx="2" ry="2.6"/><path d="M12.4 11.3c3 0 5.5 4 5.5 6.2 0 1.8-1.6 2.6-3 2.3-1.1-.2-1.6-.8-2.5-.8s-1.4.6-2.5.8c-1.4.3-3-.5-3-2.3 0-2.2 2.5-6.2 5.5-6.2z"/></g>'),
 speaker:`<svg class="li" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 soundOff:`<svg class="li" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 x:`<svg class="li" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`,
 arrow:`<svg class="li" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 back:`<svg class="li" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
ICON.soundOn=ICON.speaker;
'''
s=re.sub(r'/\* ---------- pixel icons ---------- \*/.*?ICON\.soundOn=ICON\.speaker;\n',lambda m:icons,s,flags=re.S)
crit=r'''/* ---------- critters ---------- */
const CRITTERS={
 fox:{sp:'Gray Fox',name:'Pip',e:'🦊',bg:['#fff1e4','#ffc9a0'],fact:'Gray foxes live all over Florida, and they are one of the only foxes that can climb trees.'},
 raccoon:{sp:'Raccoon',name:'Rocco',e:'🦝',bg:['#f1eff7','#c7c1dc'],fact:'Raccoons have super-sensitive front paws and often feel around in water to find food.'},
 rabbit:{sp:'Marsh Rabbit',name:'Clover',e:'🐇',bg:['#f7f0e3','#dcc6a2'],fact:'Marsh rabbits live in Florida wetlands, and unlike most rabbits, they are good swimmers.'},
 otter:{sp:'River Otter',name:'Ollie',e:'🦦',bg:['#e6f6fa','#9bd4e3'],fact:'River otters can close their ears and nose to keep water out when they dive.'},
 owl:{sp:'Burrowing Owl',name:'Hoot',e:'🦉',bg:['#fff4dc','#f1cb85'],fact:'Burrowing owls live in holes in the ground. Cape Coral, Florida is famous for them.'},
 panther:{sp:'Florida Panther',name:'Sunny',e:'🐆',bg:['#fff3d9','#f0bf76'],fact:'The Florida panther is Florida’s official state animal.'},
 deer:{sp:'Key Deer',name:'Kiki',e:'🦌',bg:['#eef8e6','#b5db97'],fact:'Key deer live only in the Florida Keys. They are the smallest deer in North America.'},
 bear:{sp:'Black Bear',name:'Bean',e:'🐻',bg:['#f4ece2','#cfb597'],fact:'The Florida black bear is the biggest land mammal in Florida.'},
 turtle:{sp:'Loggerhead Sea Turtle',name:'Shelly',e:'🐢',bg:['#e2f7ef','#8fdabb'],fact:'Most loggerhead sea turtle nests in the United States are on Florida beaches.'},
 gator:{sp:'American Alligator',name:'Chomper',e:'🐊',bg:['#ecf7e3','#a6d488'],fact:'The American alligator is Florida’s official state reptile. Alligators can live 50 years or more.'},
 flamingo:{sp:'Flamingo',name:'Rosie',e:'🦩',bg:['#ffeef3','#ffb1c7'],fact:'Flamingos get their pink color from the shrimp and algae they eat.'},
 dolphin:{sp:'Bottlenose Dolphin',name:'Splash',e:'🐬',bg:['#e6f3ff','#98c8f3'],fact:'Each bottlenose dolphin has its own signature whistle, a bit like a name.'},
};
const CIDS=Object.keys(CRITTERS);
const OLDIDS={manatee:'dolphin',opossum:'raccoon',bobcat:'panther'};
function spr(id,size='md',extra=''){const c=CRITTERS[id]||CRITTERS.owl;return `<span class="crit ${size} ${extra}" role="img" aria-label="${c.sp}">${c.e}</span>`}
function discBg(id){const c=CRITTERS[id]||CRITTERS.owl;return `background:radial-gradient(circle at 35% 28%,${c.bg[0]} 0,${c.bg[1]} 100%)`}
function ring(id,frac){const r=80,C=2*Math.PI*r;return `<div class="medal"><svg class="ring" viewBox="0 0 176 176" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc53d"/><stop offset="1" stop-color="#ff5d47"/></linearGradient></defs><circle cx="88" cy="88" r="${r}" fill="none" stroke="#efe6d6" stroke-width="12"/>${frac>0?`<circle cx="88" cy="88" r="${r}" fill="none" stroke="url(#rg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-frac)).toFixed(1)}"/>`:''}</svg><div class="disc" style="${discBg(id)}">${spr(id,'lg','bob')}</div></div>`}
function drawAll(){}
'''
s=re.sub(r'/\* ---------- critters \(16x16 pixel sprites\) ---------- \*/.*?setInterval\(\(\)=>\{const cs=.*?\n',lambda m:crit,s,flags=re.S)
waves=''.join(' q30 -7 60 0' if i==0 else ' t60 0' for i in range(22))
cove=r'''function coveScene(){const L=S.rescued;const cr=L.map((r,i)=>{const left=4+((i*29+11)%84),bottom=6+(i%3)*20,dur=10+(i%5)*2,dx=(i%2?-1:1)*(28+(i%4)*12);return`<button class="cv-critter" data-act="pet" data-i="${i}" style="left:${left}%;bottom:${bottom}px;--dx:${dx}px;animation-duration:${dur}s" aria-label="Pet ${esc(r.name)}">${spr(r.id,'md')}<span class="cv-name">${esc(r.name)}</span></button>`}).join('');
 return`<div class="scene"><svg class="land" viewBox="0 0 1000 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78c6db"/><stop offset=".58" stop-color="#ffe3b9"/><stop offset="1" stop-color="#ffb78c"/></linearGradient><linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43bcc4"/><stop offset="1" stop-color="#137c8a"/></linearGradient><linearGradient id="grassG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93d47c"/><stop offset="1" stop-color="#57a953"/></linearGradient><radialGradient id="sunG"><stop offset="0" stop-color="#fff7dc"/><stop offset=".45" stop-color="#ffe6a0" stop-opacity=".75"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
 <rect width="1000" height="280" fill="url(#skyG)"/><circle cx="770" cy="120" r="100" fill="url(#sunG)"/><circle cx="770" cy="120" r="38" fill="#fff4cf"/>
 <g class="cloudg" opacity=".9"><ellipse cx="120" cy="52" rx="62" ry="15" fill="#fff"/><ellipse cx="150" cy="42" rx="34" ry="16" fill="#fff"/></g><g class="cloudg" style="animation-delay:-38s" opacity=".75"><ellipse cx="420" cy="84" rx="50" ry="11" fill="#fff"/><ellipse cx="446" cy="76" rx="26" ry="12" fill="#fff"/></g>
 <path d="M0 152 C40 132 80 142 120 134 C150 124 180 138 220 132 C270 118 300 136 340 130 C380 122 420 138 470 132 C520 120 560 138 610 130 C660 122 700 140 740 134 C800 124 840 140 890 130 C940 122 970 136 1000 132 V160 H0Z" fill="#3b8a70" opacity=".8"/>
 <rect y="152" width="1000" height="70" fill="url(#seaG)"/><g class="waves" stroke="#eafcff" stroke-width="3" stroke-linecap="round" opacity=".5" fill="none"><path d="M0 170WAVES"/><path d="M-30 190WAVES"/></g>
 <path d="M0 212 C120 196 240 206 360 200 C480 194 620 192 760 204 C860 210 920 198 1000 202 V280 H0Z" fill="#f2d9a4"/><path d="M0 224 C140 208 260 218 380 212 C520 206 640 204 780 216 C880 222 940 210 1000 214 V280 H0Z" fill="url(#grassG)"/>
 <g transform="translate(40 0)"><path d="M34 232 C40 192 32 152 50 110" stroke="#7d5230" stroke-width="10" fill="none" stroke-linecap="round"/><g fill="#1f7a55"><path d="M50 110 C22 98 2 110 -10 128 C14 112 34 110 50 112Z"/><path d="M50 110 C72 90 102 94 118 110 C94 100 72 104 50 112Z"/><path d="M50 110 C42 82 58 66 78 62 C64 78 58 94 52 112Z"/><path d="M50 110 C28 82 8 80 -6 86 C18 88 34 98 48 112Z"/><path d="M50 110 C78 106 96 120 102 140 C86 124 70 116 50 114Z"/></g></g>
 <g transform="translate(880 30) scale(.8)"><path d="M34 232 C40 192 32 152 50 110" stroke="#7d5230" stroke-width="10" fill="none" stroke-linecap="round"/><g fill="#237f5a"><path d="M50 110 C22 98 2 110 -10 128 C14 112 34 110 50 112Z"/><path d="M50 110 C72 90 102 94 118 110 C94 100 72 104 50 112Z"/><path d="M50 110 C42 82 58 66 78 62 C64 78 58 94 52 112Z"/><path d="M50 110 C28 82 8 80 -6 86 C18 88 34 98 48 112Z"/></g></g></svg>${cr}${L.length?'':'<p class="scene-empty">Your cove is waiting for its first rescued critter.</p>'}</div>`}
'''.replace('WAVES',waves)
s=re.sub(r'function coveScene\(\)\{.*?\n\}\n|function coveScene\(\)\{.*?</div>`\}\n',lambda m:cove,s,count=1,flags=re.S)
# rescue card
s=s.replace('''<div class="kennel"><div class="pen">${spr(S.current,'lg','bob')}</div><div><div class="cname">${c.sp}</div><div class="muted">needs ${nd} hearts to come home</div></div></div>
   <div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="${nd}" aria-valuenow="${S.rescueHearts}"><i style="width:${pct}%"></i><span>${Math.min(S.rescueHearts,nd)} / ${nd} hearts</span></div>''',
'''<div class="kennel" role="progressbar" aria-valuemin="0" aria-valuemax="${nd}" aria-valuenow="${Math.min(S.rescueHearts,nd)}">${ring(S.current,pct/100)}<div><div class="cname">${c.sp}</div><div class="bignum">${Math.min(S.rescueHearts,nd)}<span class="muted" style="font-size:18px;font-weight:500"> / ${nd} hearts</span></div><div class="muted">Earn hearts to bring your ${c.sp.toLowerCase()} home.</div></div></div>''')
s=s.replace("['manatee','fox','owl','turtle','otter']","['dolphin','fox','owl','turtle','flamingo']")
s=s.replace('<div class="logo px">${ICON.paw}Critter Cove</div>','<div class="logo"><span class="mark">${ICON.paw}</span>Critter Cove</div>')
s=s.replace('''<button class="ccard" data-act="pick-rescue" data-id="${id}">${spr(id,'lg','bob')}''','''<button class="ccard" data-act="pick-rescue" data-id="${id}"><span class="disc" style="${discBg(id)}">${spr(id,'lg','bob')}</span>''')
s=s.replace('''<div class="sparkle">${spr(id,'xl','bob')}</div>''','''<div class="glow">${spr(id,'xl','bob')}</div>''')
s=s.replace("fctx.fillStyle=p.c;fctx.fillRect(Math.round(p.x),Math.round(p.y),p.s,p.s)","fctx.fillStyle=p.c;fctx.beginPath();fctx.arc(p.x,p.y,p.s/2,0,6.283);fctx.fill()")
s=s.replace("function migrate(s){if(!s||!s.skills||s.reset)return null;","function migrate(s){if(!s||!s.skills||s.reset)return null;if(s.current&&!CRITTERS[s.current])s.current=OLDIDS[s.current]||'owl';(s.rescued||[]).forEach(r=>{if(!CRITTERS[r.id])r.id=OLDIDS[r.id]||'owl'});if(s.choices&&s.choices.some(i=>!CRITTERS[i]))s.choices=null;")
s=s.replace('<div class="sprint-score px">','<div class="sprint-score">')
s=s.replace('<b class="px" style="font-size:20px">Coach Hoot says</b>','<b style="font-size:20px;font-family:var(--disp)">Coach Hoot says</b>')
s=s.replace('<label for="nm" class="px" style="font-size:22px">','<label for="nm" style="font-size:20px;font-weight:600">')
s=s.replace('<label for="cn" class="px" style="font-size:22px">','<label for="cn" style="font-size:20px;font-weight:600">')
s=s.replace('<span class="px" style="font-size:20px;color:var(--palm)">','<span style="font-size:17px;font-weight:600;color:var(--mint-d)">')
open('critter-cove.html','w').write(s)
for k in ['pixel icons','16x16','Pixelify','drawSprite','var(--palm)','sparkle']:
  print(k, k in s)
