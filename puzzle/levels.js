// Gold Drop levels, hand-ramped: each one adds ONE new idea (tip line says what it is). par = fewest digs (checked by puzzlesolve.js)
(function(root){root.DROP_LEVELS=[
{name:'Drop It In',par:4,tip:'Dig the dirt <b>under</b> the gold so it falls into the 🛒 cart.',map:['..g...','..d...','..d...','#.d.##','#.d.##']},
{name:'Roll Off',par:3,tip:'New: gold <b>rolls off round rocks</b>. Clear the side so it rolls toward the gap.',map:['.g....','drdd..','d#dd..','##d###']},
{name:'Rock Plug',par:4,tip:'New: <b>boulders fall too</b>, and a boulder can <b>plug a rail gap</b>. Send the gold another way!',map:['..g...','.drd..','.dd...','.dd...','#dd###']},
{name:'Open the Way',par:4,tip:'Only one gap in the rails. Which column should you open?',map:['gdd..','ddddr','ddddd','ddddd','d####']},
{name:'Rock Ahead',par:5,tip:'Two nuggets, one rock. Think about <b>which falls first</b>.',map:['d#rd#.','ddggdd','ddddd#','dddd#d','#dd###']},
{name:'Make Me Think',par:7,tip:'Three nuggets, two rocks, one gap. Plan the whole route!',map:['ddggrd','dddrgd','dddddd','#dddd#','####d#']}
].map(l=>Object.assign(l,{digs:l.par+2}))})(typeof window!=='undefined'?window:global);
