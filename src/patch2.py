import re
eng=open('kawaii.js').read()
# ---- daughter
s=open('critter-cove.html').read()
specs={
'fox':"{m:'#aab1bb',b:'#fffaf2',a:'#e8844a',ears:'pointy',f:['foxtail','muzzle','nose']}",
'raccoon':"{m:'#9c9eac',b:'#f6f4f9',a:'#5a5463',ears:'round',f:['ringtail','mask','muzzle','nose']}",
'rabbit':"{m:'#cfa77f',b:'#fff6e8',a:'#f7b7c5',ears:'long',f:['muzzle','nose'],n:'#f07f9a'}",
'otter':"{m:'#94653f',b:'#f3dfc4',a:'#6a4429',ears:'tiny',f:['muzzle','nose','whiskers','dtail']}",
'owl':"{m:'#c0935f',b:'#fff2d6',a:'#8a6238',ears:'tufts',f:['owldisc','owlbeak','owlwings','vmarks']}",
'panther':"{m:'#dcae70',b:'#fff4e2',a:'#b07a44',ears:'round',f:['muzzle','nose','dtail'],n:'#f08fa0'}",
'deer':"{m:'#cc9160',b:'#fff2e0',a:'#a36c40',ears:'tiny',f:['antlers','spots','muzzle','nose']}",
'bear':"{m:'#5c5565',b:'#dcc3a4',a:'#3a3442',ears:'round',f:['muzzle','nose']}",
'turtle':"{m:'#86d48f',b:'#ecfadf',a:'#a2703d',f:['shell','dtail'],ey:82}",
'gator':"{m:'#74c463',b:'#e6f7cc',a:'#4a9a42',f:['bumps','snout','dtail'],ey:64}",
'flamingo':"{m:'#ffa3c0',b:'#ffe5ee',a:'#ff7aa2',f:['beak','legs','owlwings'],ey:64}",
'dolphin':"{m:'#80bdee',b:'#e8f5ff',a:'#5b99d2',f:['fin','flippers','nofeet','beaksnout']}",
}
for k,v in specs.items():
    s,n=re.subn(r"(\n "+k+r":\{sp:'[^']*',name:'[^']*',)e:'[^']*',",r"\1k:"+v.replace('\\','\\\\')+",",s)
    assert n==1,k
s=s.replace("/* ---------- critters ---------- */",eng+"\n/* ---------- critters ---------- */")
s=re.sub(r"function spr\(id,size='md',extra=''\)\{.*?\}\n",lambda m:"function spr(id,size='md',extra=''){const c=CRITTERS[id]||CRITTERS.owl;return kawaii(c.k,size,extra,c.sp)}\n",s,count=1,flags=re.S)
s=s.replace("const b=$('#buddy canvas')","const b=$('#buddy .kw')")
s=s.replace(".crit{display:inline-grid;place-items:center;line-height:1;font-family:var(--emoji);filter:drop-shadow(0 6px 5px rgba(0,0,0,.2));font-style:normal}",".kw{display:inline-block;overflow:visible;filter:drop-shadow(0 6px 5px rgba(0,0,0,.18))}")
s=s.replace(".cv-critter .crit{",".cv-critter .kw{")
open('critter-cove.html','w').write(s)
print('buddy .kw' in s, 'kawaii(c.k' in s)
# ---- son
t=open('dino-star-patrol.html').read()
crew=r'''const CREW={
 rex:{name:'Rex',role:'Captain',k:{m:'#7fd36b',b:'#eefad2',a:'#3fa45a',f:['spikes','dtail','arms','grin']},fact:'T. rex had teeth as long as bananas!'},
 bronto:{name:'Bronto',role:'Navigator',k:{m:'#8fc6ff',b:'#e9f5ff',a:'#5a9be0',f:['spots','dtail']},fact:'Long-necked dinosaurs like Brontosaurus were longer than a school bus.'},
 zap:{name:'Zap',role:'Pilot',k:{m:'#53d6c2',b:'#e3fbf6',a:'#ff9f5a',f:['crest','dtail','arms','grin']},fact:'Velociraptor was about the size of a turkey, and it had feathers.'},
 nova:{name:'Nova',role:'Star Mapper',k:{m:'#b89cff',b:'#f3edff',a:'#ff9fd0',f:['plates','dtail']},fact:'Stegosaurus had big plates on its back and spikes on its tail.'},
 pinky:{name:'Pinky',role:'Engineer',k:{m:'#ff9fcf',b:'#fff0f7',a:'#ffd36b',f:['frill','horns']},fact:'Triceratops had three horns and a big bony frill around its neck.'},
 sunny:{name:'Sunny',role:'Moon Scout',k:{m:'#ffd06b',b:'#fff6dc',a:'#e59a3a',f:['armor','club']},fact:'Ankylosaurus had armor like a tank and a club at the end of its tail.'},
 shelly:{name:'Shelly',role:'Science Officer',k:{m:'#86d48f',b:'#ecfadf',a:'#a2703d',f:['shell','dtail'],ey:82},fact:'Turtles lived at the same time as the dinosaurs!'},
 chomp:{name:'Chomp',role:'Security Chief',k:{m:'#74c463',b:'#e6f7cc',a:'#4a9a42',f:['bumps','snout','dtail'],ey:64},fact:'Crocodile relatives lived alongside the dinosaurs.'},
 ziggy:{name:'Ziggy',role:'Comet Chaser',k:{m:'#ffa66b',b:'#fff1e2',a:'#ff7a4a',f:['wings','crest','owlbeak']},fact:'Pteranodon could fly, but it was not a dinosaur. It was a flying reptile!'},
 sparky:{name:'Sparky',role:'Sail Captain',k:{m:'#ff8181',b:'#ffe8e3',a:'#ffc15a',f:['sail','dtail','grin']},fact:'Spinosaurus had a giant sail on its back and loved to catch fish.'},
};'''
t=re.sub(r"const CREW=\{.*?\n\};",lambda m:crew,t,count=1,flags=re.S)
t=t.replace("/* crew + eggs */",eng+"\n/* crew + eggs */")
t=re.sub(r"function crit\(id,size='md',extra=''\)\{.*?\}\n",lambda m:"function crit(id,size='md',extra=''){const c=CREW[id]||CREW.rex;return kawaii(c.k,size,extra,c.name)}\n",t,count=1,flags=re.S)
t=t.replace("const b=$('#buddy .crit')","const b=$('#buddy .kw')")
t=t.replace(".bubble .crit{font-size:52px}",".bubble .kw{width:74px;height:78px}\n.kw{display:inline-block;overflow:visible;filter:drop-shadow(0 6px 6px rgba(0,0,0,.35))}")
t=t.replace('.bubble{width:92px;height:92px;','.bubble{width:100px;height:100px;')
open('dino-star-patrol.html','w').write(t)
print("kawaii(c.k" in t, "buddy .kw" in t)
