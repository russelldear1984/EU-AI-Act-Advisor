import { useState } from 'react';
import { questions } from '../data/questions';
import './Assessment.css';
export default function Assessment({ onBack, onComplete }) { const [i,setI]=useState(0); const [a,setA]=useState({tools:[],high_risk_contexts:[],governance:[]}); const q=questions[i]; const v=a[q.id] ?? (q.type==='multi'?[]:'');
const can = q.type==='text'?true:q.type==='multi'?v.length>0:!!v;
const setVal=(x)=>setA((p)=>({...p,[q.id]:x}));
const toggle=(opt)=>{const cur=[...(v||[])]; if(opt.exclusive) return setVal([opt.value]); if(cur.includes(opt.value)) setVal(cur.filter(c=>c!==opt.value)); else setVal([...cur.filter((c)=>!q.options.find(o=>o.value===c)?.exclusive),opt.value]);};
const next=()=> i===questions.length-1?onComplete(a):setI(i+1);
return <div className='assess'><header><button onClick={onBack}>← Back</button><p>Question {i+1} of 10</p><span/></header><div className='bar'><i style={{width:`${((i+1)/10)*100}%`}}/></div><section><b>{String(i+1).padStart(2,'0')}</b><h2>{q.title}</h2><p>{q.hint}</p>{q.type==='text'?<input value={v} onChange={(e)=>setVal(e.target.value)} placeholder={q.placeholder}/>:(q.options.map((opt)=><button key={opt.value} className={q.type==='multi'&&v.includes(opt.value)||q.type==='single'&&v===opt.value?'on':''} onClick={()=>q.type==='multi'?toggle(opt):setVal(opt.value)}><span/>{opt.label}</button>))}<div className='next'><button disabled={!can} onClick={next}>{i===9?'See my results →':'Next →'}</button></div></section></div>; }
