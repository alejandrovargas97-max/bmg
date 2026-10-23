const ENDPOINT='https://script.google.com/macros/s/AKfycbzpvU5cMT5bzX2_Iq81BcObVnqxXMpqoFc6Vs4yjZzFQH6LiLRUH-aEnmdol4UUMQRVHg/exec';
function reply(res,status,data){res.setHeader('Cache-Control','no-store');return res.status(status).json(data);}
module.exports=async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return reply(res,405,{ok:false,error:'METHOD_NOT_ALLOWED'});}
 const host=req.headers.host;
 try{if(!host||new URL(req.headers.origin).host!==host)return reply(res,403,{ok:false,error:'ORIGIN_REJECTED'});}catch{return reply(res,403,{ok:false,error:'ORIGIN_REJECTED'});}
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return reply(res,415,{ok:false,error:'JSON_REQUIRED'});
 let body;
 try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body||typeof body!=='object'||Array.isArray(body)||Buffer.byteLength(JSON.stringify(body))>24000)throw Error();}catch{return reply(res,400,{ok:false,error:'INVALID_REQUEST'});}
 const probe=body.action==='bgm-probe-v4';
 if(!probe&&(!/^[a-f0-9-]{36}$/i.test(body.requestId||'')||body.consent!==true||body.website))return reply(res,400,{ok:false,error:'INVALID_REQUEST'});
 try{
  const upstream=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),redirect:'follow',signal:AbortSignal.timeout(45000)});
  const raw=await upstream.text();let result;try{result=JSON.parse(raw);}catch{return reply(res,502,{ok:false,error:'RECEIVER_NOT_READY'});}
  if(probe){if(result.ok===true&&result.version==='bgm-contact-post-v4')return reply(res,200,{ok:true,version:result.version});return reply(res,503,{ok:false,error:'RECEIVER_NOT_READY'});}
  if(!upstream.ok||result.ok!==true||result.id!==body.requestId||! /^[A-Z]{2}[0-9]{3,}$/.test(result.code||''))return reply(res,502,{ok:false,error:'SAVE_NOT_CONFIRMED'});
  return reply(res,200,{ok:true,id:result.id,code:result.code});
 }catch{return reply(res,502,{ok:false,error:'SAVE_NOT_CONFIRMED'});}
};
