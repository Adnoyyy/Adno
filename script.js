const pages=document.querySelectorAll(".page");
const nav=document.querySelectorAll("nav a");

nav.forEach(n=>{
n.addEventListener("click",()=>{
pages.forEach(p=>p.classList.remove("active"));
document.getElementById(n.dataset.page).classList.add("active");
});
});

// Hero button
document.getElementById("startBtn")
.addEventListener("click",()=>{
document.getElementById("home").classList.add("active");
});

// Prices
let prices={Bitcoin:45000,Ethereum:3000};
let history={Bitcoin:[],Ethereum:[]};
let alerts=[];

const coinsDiv=document.getElementById("coins");
const ctx=document.getElementById("chart").getContext("2d");

function render(){
coinsDiv.innerHTML="";
for(let c in prices){
let d=document.createElement("div");
d.className="card";
d.innerHTML=`<h4>${c}</h4><p>$${prices[c]}</p>`;
coinsDiv.appendChild(d);
}
}

function update(){
for(let c in prices){
prices[c]+=Math.floor(Math.random()*200-100);
history[c].push(prices[c]);
alerts.forEach(a=>{
if(a.coin===c && prices[c]>=a.target)
alert(c+" reached "+prices[c]);
});
}
draw("Bitcoin");
render();
}

function draw(coin){
ctx.clearRect(0,0,300,150);
ctx.beginPath();
history[coin].forEach((v,i)=>{
ctx.lineTo(i*20,150-v/400);
});
ctx.strokeStyle="cyan";
ctx.stroke();
}

// Form
document.getElementById("alertForm")
.addEventListener("submit",e=>{
e.preventDefault();
let coin=document.getElementById("coin").value;
let target=document.getElementById("target").value;

if(!coin||!target){
document.getElementById("error").textContent="All fields required";
return;
}

alerts.push({coin,target:Number(target)});
e.target.reset();
});

// Change chart
document.getElementById("coin")
.addEventListener("change",e=>draw(e.target.value));

render();
setInterval(update,3000);