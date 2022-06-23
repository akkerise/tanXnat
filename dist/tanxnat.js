var tanXnat=(()=>{var e={138:(e,t,r)=>{var a=r(795),s=r(98),n=r(295),o=r(591),c=r(57);r=r(326),e.exports={fp:a,core:s,redis:n,common:o,handler:c,validator:r}},591:e=>{var t=e=>e?e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").replace(/ì|í|ị|ỉ|ĩ/g,"i").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u").replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y").replace(/đ/g,"d").replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,"A").replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g,"E").replace(/Ì|Í|Ị|Ỉ|Ĩ/g,"I").replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,"O").replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g,"U").replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g,"Y").replace(/Đ/g,"D"):"";e.exports={to:{spacePhone:e=>(e=(""+e).replace(/\D/g,"").match(/^(\d{4})(\d{3})(\d{3})$/))?e[1]+" "+e[2]+" "+e[3]:null,friendly:e=>t(e).trim().replace(/\/|\.|\,|\(|\)|\'|\"|\’|\!|\@|\#|\%|\*/g,"").replace(/ |=|>|<=|<|>=|\=|\>|\<\=|\<|\>\=|\+|\^|\+|\$|\&|\_/g,"-").replace(/^-+|-+$|-+/g,"-").toLowerCase().toLocaleLowerCase()||"",random:(e=0)=>{for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=r.length,s=0;s<e;s++)t+=r.charAt(Math.floor(Math.random()*a));return t},vn:t},trick:{sliceIntoChunks:async(e,t)=>{const r=[];for(let s=0;s<e.length;s+=t){var a=e.slice(s,s+t);r.push(a)}return r}},duplicate:{uniqByKeepFirst:(e,t)=>{let r=new Set;return e.filter((e=>!r.has(t(e))&&r.add(t(e))))},uniqByKeepLast:(e,t)=>[...new Map(e.map((e=>[t(e),e]))).values()],getUniqueListBy:(e,t)=>[...new Map(e.map((e=>[e[t],e]))).values()]}}},98:function(e){e.exports={deduplicate2nd:(e=[])=>e.reduce(((e,t)=>e.includes(t)?e:[...e,t]),[]),deduplicate:e=>[...new Set(e)],difference:(e=[],t=[])=>e.reduce(((e,r)=>(t.includes(r)||e.push(r),e)),[]),debounce:(e,t)=>r=>{clearTimeout(e.id),e.id=setTimeout((()=>{e.call(this,r)}),t)},throttle:(e,t)=>r=>{e.id||(e.id=setTimeout((()=>{e.call(this,r),clearTimeout(e.id),e.id=null}),t))},parseUrl:e=>e.replace(/(^\?)|(&$)/g,"").split("&").reduce(((e,t)=>{var[r,t]=t.split("=");return e[r]=decodeURIComponent(t),e}),{}),unique:e=>e.filter(((e,t,r)=>r.indexOf(e)===t)),delay:e=>new Promise((t=>setTimeout(t,e))),group:(e=[],t)=>t?e.reduce(((e,r)=>(e[r[t]]||(e[r[t]]=[]),e[r[t]].push(r),e)),{}):{},unzip:(e=[])=>e.reduce(((e,t)=>(t.forEach(((t,r)=>e[r].push(t))),e)),Array.from({length:Math.max(...e.map((e=>e.length)))}).map((e=>[]))),uniq:(e,t)=>[...new Map(e.map((e=>[e[t],e]))).values()],flat:e=>e.reduce(((e,t)=>e.concat(Array.isArray(t)?Flat(t):t)),[]),max:(e=[])=>e.reduce(((e,t)=>t<e?e:t)),min:(e=[])=>e.reduce(((e,t)=>e<t?e:t))}},795:e=>{e.exports={get:e=>t=>e(t),pipe:(...e)=>e.reduce(((e,t)=>r=>t(e(r)))),curry:e=>{var t=e.length;const r=(t,a)=>0<t?(...e)=>r(t-e.length,[...a,...e]):e(...a);return r(t,[])},compose:(...e)=>e.reduce(((e,t)=>r=>e(t(r))))}},57:e=>{const t=[{status:!0,message:"Success",code:200},{status:!0,message:"Not content",code:204},{status:!1,message:"Bad request",code:400},{status:!1,message:"Not found",code:404},{status:!1,message:"Server error",code:500},{status:!1,message:"Something went wrong",code:666}];var r,a=(r=e=>t.find((t=>t.code===e.code))||t.find((e=>666===e.code)),e=>r(e));e.exports={response:a}},295:e=>{var t="TAN_X_NAT",r={init:function(e,{host:t,port:r,auth_pass:a}){this.__client=e().createClient({host:t,port:r,auth_pass:a}),this.__client.on("error",(function(e){console.error("ERROR_REDIS",e)}))},set:async function(e,r,a){var s=t+e.toString();return await this.__client.set(s,r.toString()),await this.__client.expire(t+e.toString(),a||86400)},get:async function(e){return await this.__client.get(t+e.toString())},del:async function(e){return await this.__client.del(t+e.toString())}};e.exports=r},326:e=>{e.exports={email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase()),phone:e=>/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/.test(String(e).toLowerCase())}}},t={};return function r(a){if(t[a])return t[a].exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,r),s.exports}(138)})();