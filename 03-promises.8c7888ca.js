const e=document.querySelector(".form"),t=document.querySelector("input[name=delay]"),o=document.querySelector("input[name=step]"),n=document.querySelector("input[name=amount]"),i=[{position:0,delay:0}];function l(e,t){const o=Math.random()>.3;return new Promise(((n,i)=>{setTimeout((()=>{o?n({position:e,delay:t}):i({position:e,delay:t})}),t)}))}e.addEventListener("submit",(e=>{e.preventDefault();const s=+n.value;let a=+t.value,u=+o.value;for(let e=0;e<s;e+=1){i.position=e+1,i.delay=a+u*e;const{position:t,delay:o}=i;l(t,o).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}e.target.reset()}));
//# sourceMappingURL=03-promises.8c7888ca.js.map
