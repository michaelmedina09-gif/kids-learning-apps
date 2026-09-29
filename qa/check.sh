for f in /home/claude/cove/critter-cove.html /home/claude/cove/dino-star-patrol.html; do python3 - "$f" <<'P'
import sys,re
s=open(sys.argv[1]).read()
js=re.findall(r'<script>(.*?)</script>',s,re.S)
open('/tmp/_x.js','w').write('\n'.join(js))
P
node --check /tmp/_x.js && echo "$(basename $f) parses OK"; done
