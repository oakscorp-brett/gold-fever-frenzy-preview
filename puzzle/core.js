// Gold Drop puzzle core. Grid strings top->bottom. Under the bottom row runs the mine-cart rail.
// d dirt (tap to dig, 1 dig)  . empty  g gold  r boulder  # bedrock
// Gold and boulders fall when nothing is under them, and roll off the round top of a boulder or gold if the side is open.
// Gold that falls off the bottom row lands in the cart. A boulder that reaches the bottom row blocks that rail spot.
(function(root){
function parse(lv){return lv.map.map(r=>r.split(''))}
function key(g){return g.map(r=>r.join('')).join('/')}
function step(g){const H=g.length,W=g[0].length;const moves=[];let got=0;const done=new Set();
 for(let y=H-1;y>=0;y--)for(let x=0;x<W;x++){const c=g[y][x];if(c!=='g'&&c!=='r'||done.has(x+','+y))continue;
  if(y===H-1){if(c==='g'){g[y][x]='.';got++;moves.push({x,y,to:'cart'})}continue}
  const below=g[y+1][x];if(below==='.'){g[y+1][x]=c;g[y][x]='.';done.add(x+','+(y+1));moves.push({x,y,dx:0});continue}
  if(below==='r'||below==='g'){for(const dx of[-1,1]){const nx=x+dx;if(nx<0||nx>=W)continue;if(g[y][nx]==='.'&&g[y+1][nx]==='.'){g[y][nx]=c;g[y][x]='.';done.add(nx+','+y);moves.push({x,y,dx});break}}}}
 return{moved:moves.length>0,got,moves}}
function settle(g){let got=0,n=0;for(;n<200;n++){const s=step(g);got+=s.got;if(!s.moved)break}return got}
function goldLeft(g){let n=0;for(const r of g)for(const c of r)if(c==='g')n++;return n}
function dig(g,x,y){if(g[y][x]!=='d')return false;g[y][x]='.';return true}
// breadth-first solver: fewest digs that bring all gold to the cart
function solve(lv,maxD){let g=parse(lv);settle(g);const start=key(g);let frontier=[[g,[]]];const seen=new Set([start]);
 for(let d=0;d<=(maxD||lv.digs);d++){const nx=[];for(const[gg,path]of frontier){if(goldLeft(gg)===0)return path;if(d===(maxD||lv.digs))continue;
  for(let y=0;y<gg.length;y++)for(let x=0;x<gg[0].length;x++)if(gg[y][x]==='d'){const g2=gg.map(r=>r.slice());dig(g2,x,y);settle(g2);const k=key(g2);if(seen.has(k))continue;seen.add(k);nx.push([g2,path.concat([[x,y]])])}}frontier=nx}return null}
// same search, from any board and number of digs left (used by Hint and the 'no way to win' check)
function solveFrom(g0,left){const g=g0.map(r=>r.slice());settle(g);if(goldLeft(g)===0)return[];let frontier=[[g,[]]];const seen=new Set([key(g)]);
 for(let d=0;d<left;d++){const nx=[];for(const[gg,path]of frontier){for(let y=0;y<gg.length;y++)for(let x=0;x<gg[0].length;x++)if(gg[y][x]==='d'){const g2=gg.map(r=>r.slice());dig(g2,x,y);settle(g2);const k=key(g2);if(seen.has(k))continue;seen.add(k);const p=path.concat([[x,y]]);if(goldLeft(g2)===0)return p;nx.push([g2,p])}}frontier=nx}return null}
root.GoldDrop={solveFrom,parse,step,settle,goldLeft,dig,solve,key}})(typeof window!=='undefined'?window:global);
