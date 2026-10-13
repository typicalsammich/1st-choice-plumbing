
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const {RESEND_API_KEY,RESEND_FROM_EMAIL}=process.env;
 const CONTACT_EMAIL=process.env.CONTACT_EMAIL||'1stchoiceplumbing31@gmail.com';
 if(!CONTACT_EMAIL||!RESEND_API_KEY||!RESEND_FROM_EMAIL)return res.status(503).json({error:'Email delivery is not configured yet.'});
 const fields=req.body||{};
 if(fields.website)return res.status(400).json({error:'Invalid submission.'});
 const keys=['name','phone','email','service','city','message'];
 if(keys.some(k=>typeof fields[k]!=='string'||!fields[k].trim()))return res.status(400).json({error:'Please complete all fields.'});
 if(keys.some(k=>fields[k].length>3000)||!/^\S+@\S+\.\S+$/.test(fields.email))return res.status(400).json({error:'Invalid submission.'});
 const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const body=keys.map(k=>`<p><strong>${escape(k)}:</strong> ${escape(fields[k]).replace(/\n/g,'<br>')}</p>`).join('');
 try{
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:RESEND_FROM_EMAIL,to:[CONTACT_EMAIL],reply_to:fields.email,subject:'1st Choice Plumbing - New Service Request',html:body})});
  if(!result.ok)return res.status(502).json({error:'Email delivery failed. Please call instead.'});
  return res.status(200).json({ok:true});
 }catch{return res.status(502).json({error:'Email service unavailable. Please call instead.'})}
}
