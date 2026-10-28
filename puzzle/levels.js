// 5 hand-picked Gold Drop levels (each checked solvable by puzzlesolve.js; par = fewest digs)
(function(root){root.DROP_LEVELS=[
{name:'Drop It In',par:4,map:['..g...','..d...','..d...','#.d.##','#.d.##']},
{name:'Open the Way',par:4,map:['gdd..','ddddr','ddddd','ddddd','d####']},
{name:'Rock Ahead',par:5,map:['d#rd#.','ddggdd','ddddd#','dddd#d','#dd###']},
{name:'Boulder Trap',par:6,map:['#rg#d','rgd#d','dddd#','ddddd','##dd#']},
{name:'Make Me Think',par:7,map:['ddggrd','dddrgd','dddddd','#dddd#','####d#']}
].map(l=>Object.assign(l,{digs:l.par+2}))})(typeof window!=='undefined'?window:global);
