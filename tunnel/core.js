// Tunnel Digging core (shared by tunnel.html and tunnelsim.js). Grid W x H, row 0 touches the surface.
(function(root){
const W=7,H=9,VAL={1:1,2:3,3:8};
// legend: . dirt   r rock (2 digs)   w underground spring (can't dig, go around)   1/2/3 flake/nugget/big nugget (1/3/8 oz)
function parse(lv){const g=[];for(let y=0;y<H;y++){g[y]=[];for(let x=0;x<W;x++){const ch=lv.map[y][x];g[y][x]={t:ch==='r'?'r':ch==='w'?'w':/[123]/.test(ch)?'n':'d',v:VAL[ch]||0,hp:ch==='r'?2:1,dug:false}}}return g}
function newGame(lv){return{lv,g:parse(lv),digs:lv.digs,gold:0,over:false,won:false}}
const nb=(x,y)=>[[x+1,y],[x-1,y],[x,y+1],[x,y-1]].filter(([a,b])=>a>=0&&b>=0&&a<W&&b<H);
function canDig(s,x,y){const c=s.g[y][x];if(c.dug||c.t==='w')return false;return y===0||nb(x,y).some(([a,b])=>s.g[b][a].dug)}
function frontier(s){const o=[];for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(canDig(s,x,y))o.push([x,y]);return o}
// returns {ok, got, cracked}
function dig(s,x,y){if(s.over||s.digs<=0||!canDig(s,x,y))return{ok:false};const c=s.g[y][x];s.digs--;c.hp--;let got=0,cracked=false;
 if(c.hp>0){cracked=true}else{c.dug=true;if(c.t==='n'){got=c.v;s.gold+=got}}
 if(s.gold>=s.lv.target){s.over=true;s.won=true}else if(s.digs<=0){s.over=true}return{ok:true,got,cracked}}
function clone(s){return{lv:s.lv,digs:s.digs,gold:s.gold,over:s.over,won:s.won,g:s.g.map(r=>r.map(c=>({...c})))}}
// cost-to-reach every cell from the current tunnel (rock costs its remaining hp)
function dist(s){const D=[];for(let y=0;y<H;y++)D[y]=Array(W).fill(1e9);const q=[];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=s.g[y][x];if(c.dug){D[y][x]=0;q.push([x,y])}}
 for(let x=0;x<W;x++){const c=s.g[0][x];if(!c.dug&&c.t!=='w'){const d=c.hp;if(d<D[0][x]){D[0][x]=d;q.push([x,0])}}}
 // small Dijkstra (grid is tiny)
 const done=new Set();while(q.length){q.sort((a,b)=>D[a[1]][a[0]]-D[b[1]][b[0]]);const[x,y]=q.shift();const k=x+','+y;if(done.has(k))continue;done.add(k);
  for(const[a,b]of nb(x,y)){const c=s.g[b][a];if(c.t==='w')continue;const nd=D[y][x]+(c.dug?0:c.hp);if(nd<D[b][a]){D[b][a]=nd;q.push([a,b])}}}return D}
root.Tunnel={W,H,VAL,newGame,canDig,frontier,dig,clone,dist,nb}})(typeof window!=='undefined'?window:global);
