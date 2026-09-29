import {open,shot,SPEECH_MOCK} from './lib.mjs';import {placed} from './setup.mjs';
export async function audit(p,label){return p.evaluate((label)=>{const W=document.documentElement.clientWidth;const out={label,hscroll:document.documentElement.scrollWidth>W+1?document.documentElement.scrollWidth:0,offRight:[],clipped:[],small:[]};
 const vis=e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&!e.closest('[hidden]')};
 document.querySelectorAll('body *').forEach(e=>{if(!vis(e)||e.closest('svg')||e.closest('.toast')||e.closest('canvas'))return;const r=e.getBoundingClientRect();
  if(r.right>W+2&&!e.closest('.meteors')&&!e.closest('.fx'))out.offRight.push(`${e.tagName}.${e.className&&e.className.baseVal===undefined?e.className:''} r=${Math.round(r.right)} "${(e.innerText||'').slice(0,25)}"`);
  const cs=getComputedStyle(e);if((cs.overflow==='hidden'||cs.textOverflow==='ellipsis'||cs.overflowX==='hidden')&&e.children.length===0&&e.scrollWidth>e.clientWidth+2&&(e.innerText||'').trim())out.clipped.push(`${e.tagName}.${e.className} "${e.innerText.slice(0,30)}" ${e.scrollWidth}>${e.clientWidth}`)});
 document.querySelectorAll('button,input,textarea,a,[data-act]').forEach(b=>{if(!vis(b)||b.closest('.toast'))return;const r=b.getBoundingClientRect();if(r.height<40||r.width<40)out.small.push(`${b.dataset.act||b.id||b.tagName}:${Math.round(r.width)}x${Math.round(r.height)}`)});
 out.offRight=[...new Set(out.offRight)].slice(0,8);out.small=[...new Set(out.small)];return out},label)}
