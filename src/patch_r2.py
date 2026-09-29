#!/usr/bin/env python3
"""Inline src/cove_r2.js and src/cove_r2.css into apps/critter-cove.html (idempotent, between markers)."""
import re
H='/home/claude/kla-cove/apps/critter-cove.html'
s=open(H).read()
js=open('/home/claude/kla-cove/src/cove_r2.js').read().strip()
css=open('/home/claude/kla-cove/src/cove_r2.css').read().strip()
def put(s,b,e,body,anchor):
    blk=b+'\n'+body+'\n'+e
    if b in s:
        return re.sub(re.escape(b)+r'.*?'+re.escape(e),lambda m:blk,s,flags=re.S)
    assert anchor in s, anchor
    return s.replace(anchor,blk+'\n'+anchor,1)
s=put(s,'/* R2-CSS-BEGIN */','/* R2-CSS-END */',css,'</style>')
s=put(s,'/* R2-JS-BEGIN */','/* R2-JS-END */',js,'/* ---------- boot ---------- */')
open(H,'w').write(s)
print('patched',len(s))
