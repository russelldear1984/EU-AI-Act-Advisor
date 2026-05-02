export async function exportPdfReport({ profile, sections, risk, completed, stats }) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const org = profile.org_name || 'Your organisation';
  doc.setFillColor(15, 30, 53); doc.rect(0,0,595,842,'F');
  doc.setFillColor(45,212,160); doc.rect(0,0,6,842,'F');
  doc.setTextColor(45,212,160); doc.setFontSize(11); doc.text('EU AI ACT COMPLIANCE REPORT',30,56);
  doc.setTextColor(232,238,245); doc.setFont('helvetica','bold'); doc.setFontSize(30); doc.text(org,30,100);
  doc.setFontSize(14); doc.setFont('helvetica','normal'); doc.text('Tailored compliance checklist & action plan',30,126);
  doc.text(`Generated: ${new Date().toISOString().slice(0,10)}`,30,148);
  doc.setDrawColor(risk.key==='high'?232: risk.key==='medium'?245:74, risk.key==='high'?90:risk.key==='medium'?166:158, risk.key==='high'?90:risk.key==='medium'?35:255);
  doc.rect(30,170,530,42); doc.text(`Risk level: ${risk.label}`,40,196);
  [['Total actions',stats.total],['Completed',stats.done],['Remaining',stats.total-stats.done],['Progress',`${stats.pct}%`]].forEach((s,i)=>{doc.setDrawColor(80,100,130);doc.rect(30+i*132,228,124,58);doc.text(s[0],40+i*132,252);doc.setFont('helvetica','bold');doc.text(String(s[1]),40+i*132,274);doc.setFont('helvetica','normal');});
  doc.setFontSize(9); doc.text('This tool provides general guidance only and does not constitute legal advice.',30,812);
  sections.forEach((sec,si)=>{doc.addPage(); let y=56; doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.text(sec.title,30,y); y+=20; doc.setFontSize(10); doc.text(`Deadline: ${sec.deadline}`,30,y); y+=14;
    sec.items.forEach((item,ii)=>{if(y>760){doc.addPage(); y=56;} const key=`${si}-${ii}`; const on=!!completed[key]; doc.setDrawColor(80,100,130); doc.roundedRect(30,y,535,74,8,8); doc.rect(42,y+12,12,12,on?'F':'S'); doc.setFont('helvetica','bold'); doc.text(item.title,62,y+22,{maxWidth:380}); if(item.tag) doc.text(item.tag,520,y+22,{align:'right'}); doc.setFont('helvetica','normal'); doc.text(item.detail,62,y+42,{maxWidth:490}); y+=84;});
    doc.setFontSize(9); doc.text(`${org} · EU AI Act report · page ${doc.getNumberOfPages()}`,30,820);
  });
  doc.save(`EU-AI-Act-Compliance-${org.replace(/\s+/g,'-')}-${new Date().toISOString().slice(0,10)}.pdf`);
}
