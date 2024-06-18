var tanXnat;(()=>{var e={138:(e,t,r)=>{var a=r(326),s=r(57),n=r(591),o=r(295),c=r(98);r=r(795),e.exports={validator:a,handler:s,common:n,redis:o,core:c,fp:r}},591:e=>{const t=e=>e?e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").replace(/ì|í|ị|ỉ|ĩ/g,"i").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u").replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y").replace(/đ/g,"d").replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,"A").replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g,"E").replace(/Ì|Í|Ị|Ỉ|Ĩ/g,"I").replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,"O").replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g,"U").replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g,"Y").replace(/Đ/g,"D"):"";e.exports={to:{spacePhone:e=>(e=(""+e).replace(/\D/g,"").match(/^(\d{4})(\d{3})(\d{3})$/))?e[1]+" "+e[2]+" "+e[3]:null,friendly:e=>t(e).trim().replace(/\/|\.|\,|\(|\)|\'|\"|\’|\!|\@|\#|\%|\*/g,"").replace(/ |=|>|<=|<|>=|\=|\>|\<\=|\<|\>\=|\+|\^|\+|\$|\&|\_/g,"-").replace(/^-+|-+$|-+/g,"-").toLowerCase().toLocaleLowerCase()||"",random:(e=0)=>{for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=r.length,s=0;s<e;s++)t+=r.charAt(Math.floor(Math.random()*a));return t},vn:t},trick:{sliceIntoChunks:async(e,t)=>{const r=[];for(let s=0;s<e.length;s+=t){var a=e.slice(s,s+t);r.push(a)}return r}},duplicate:{uniqByKeepFirst:(e,t)=>{let r=new Set;return e.filter((e=>!r.has(t(e))&&r.add(t(e))))},uniqByKeepLast:(e,t)=>[...new Map(e.map((e=>[t(e),e]))).values()],getUniqueListBy:(e,t)=>[...new Map(e.map((e=>[e[t],e]))).values()]},uuid:()=>{var e=URL.createObjectURL(new Blob),t=e.toString();return URL.revokeObjectURL(e),t.substr(t.lastIndexOf("/")+1)}}},98:function(e){e.exports={deduplicate2nd:(e=[])=>e.reduce(((e,t)=>e.includes(t)?e:[...e,t]),[]),deduplicate:e=>[...new Set(e)],difference:(e=[],t=[])=>e.reduce(((e,r)=>(t.includes(r)||e.push(r),e)),[]),debounce:(e,t)=>r=>{clearTimeout(e.id),e.id=setTimeout((()=>{e.call(this,r)}),t)},throttle:(e,t)=>r=>{e.id||(e.id=setTimeout((()=>{e.call(this,r),clearTimeout(e.id),e.id=null}),t))},parseUrl:e=>e.replace(/(^\?)|(&$)/g,"").split("&").reduce(((e,t)=>{var[t,r]=t.split("=");return e[t]=decodeURIComponent(r),e}),{}),unique:e=>e.filter(((e,t,r)=>r.indexOf(e)===t)),delay:e=>new Promise((t=>setTimeout(t,e))),group:(e=[],t)=>t?e.reduce(((e,r)=>(e[r[t]]||(e[r[t]]=[]),e[r[t]].push(r),e)),{}):{},unzip:(e=[])=>e.reduce(((e,t)=>(t.forEach(((t,r)=>e[r].push(t))),e)),Array.from({length:Math.max(...e.map((e=>e.length)))}).map((e=>[]))),uniq:(e,t)=>[...new Map(e.map((e=>[e[t],e]))).values()],flat:e=>e.reduce(((e,t)=>e.concat(Array.isArray(t)?Flat(t):t)),[]),max:(e=[])=>e.reduce(((e,t)=>t<e?e:t)),min:(e=[])=>e.reduce(((e,t)=>e<t?e:t))}},795:e=>{e.exports={get:e=>t=>e(t),pipe:(...e)=>e.reduce(((e,t)=>r=>t(e(r)))),curry:e=>{var t=e.length;const r=(t,a)=>0<t?(...e)=>r(t-e.length,[...a,...e]):e(...a);return r(t,[])},compose:(...e)=>e.reduce(((e,t)=>r=>e(t(r)))),memoize:e=>{const t=new Map;return(...r)=>{var a=r.join("-");return t.has(a)||t.set(a,e(r)),t.get(a)}},memoizer:e=>{let t={};return r=>{var a;return null!=t[r]?t[r]:(a=e(r),t[r]=a)}}}},57:e=>{const t=[{status:!0,message:"Success",code:200},{status:!0,message:"Not content",code:204},{status:!1,message:"Bad request",code:400},{status:!1,message:"Not found",code:404},{status:!1,message:"Server error",code:500},{status:!1,message:"Something went wrong",code:666}];var r;r=e=>t.find((t=>t.code===e.code))||t.find((e=>666===e.code)),e.exports={response:e=>r(e)}},295:e=>{const t="TAN_X_NAT";e.exports={init(e,{host:t,port:r,auth_pass:a}){this.__client=e().createClient({host:t,port:r,auth_pass:a}),this.__client.on("error",(function(e){console.error("ERROR_REDIS",e)}))},async set(e,r,a){var s=t+e.toString();return await this.__client.set(s,r.toString()),this.__client.expire(t+e.toString(),a||86400)},async get(e){return this.__client.get(t+e.toString())},async del(e){return this.__client.del(t+e.toString())}}},326:e=>{e.exports={email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase()),phone:e=>/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}$/.test(String(e).toLowerCase())}}},t={},r=function r(a){var s=t[a];return void 0!==s||(s=t[a]={exports:{}},e[a].call(s.exports,s,s.exports,r)),s.exports}(138);tanXnat=r})();