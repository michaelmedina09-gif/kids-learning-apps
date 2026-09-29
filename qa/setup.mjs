// helper: fresh placed state
export async function placed(p,extra={}){await p.evaluate((extra)=>{S=newState('Ava');for(const k in S.placement)if(k!=='at')S.placement[k]=true;S.placement.at=Date.now();if(typeof CRITTERS!=='undefined'){S.current=Object.keys(CRITTERS)[0]}else{S.egg=S.egg||'sky'}Object.assign(S,extra);save();render()},extra);await p.waitForTimeout(200)}
