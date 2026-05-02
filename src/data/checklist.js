const hasHighRisk = (p) => (p.high_risk_contexts || []).some((v) => v !== 'none_high');
const hasEU = (p) => p.eu_nexus !== 'no_eu';

export const getRiskLevel = (p) => {
  if (!hasEU(p)) return { label: 'Limited applicability', color: 'var(--blue)', key: 'limited' };
  if (hasHighRisk(p) && ['provider', 'both'].includes(p.ai_role)) return { label: 'High — provider with high-risk AI', color: 'var(--red)', key: 'high' };
  if (hasHighRisk(p)) return { label: 'High — high-risk AI in use', color: 'var(--red)', key: 'high' };
  if (['provider', 'both'].includes(p.ai_role)) return { label: 'Medium — AI provider', color: 'var(--amber)', key: 'medium' };
  if (p.personal_data === 'significant') return { label: 'Medium — significant personal data', color: 'var(--amber)', key: 'medium' };
  return { label: 'Lower — general AI deployer', color: 'var(--accent)', key: 'lower' };
};

export const generateChecklist = (p) => {
  const g = p.governance || []; const high = hasHighRisk(p);
  const sections = [
    { title:'AI inventory & risk classification', priority:'high', deadline:'Do now', items:[
      {title:'Compile a complete inventory of all AI tools in use', detail:`Track selected tools: ${(p.tools||[]).join(', ') || 'all systems across departments'}.`},
      {title:'Classify each tool by risk tier', detail: high ? 'At least one higher-risk context was identified. Prioritise legal review and categorisation.' : 'Classify prohibited, high-risk, limited-risk, and minimal-risk use cases.'},
      {title:'Identify your role for each tool', detail: p.ai_role === 'provider' || p.ai_role === 'both' ? 'Map provider obligations for systems you build plus deployer obligations for tools you consume.' : 'Focus on deployer obligations and third-party provider controls.'},
      {title:'Document which departments use which tools', detail:'Assign business owners and usage boundaries per function.'}
    ]},
    { title:'AI literacy obligations', priority:'high', deadline:'In force since Feb 2025', items:[
      {title:'Confirm AI literacy obligations are being met (Article 4, in force Feb 2025)', detail:'Document a competence baseline for all staff using AI.', tag:'Already required'},
      {title:g.includes('ai_policy')?'Update your existing AI policy to reference the EU AI Act':'Create a written AI acceptable use policy', detail:'Define allowed tools, approvals, and prohibited use.', tag: g.includes('ai_policy') ? undefined : 'High priority'},
      {title:g.includes('training')?'Update training to include EU AI Act awareness':'Implement mandatory AI literacy training', detail:'Include role-based scenarios and practical controls.', tag: g.includes('training') ? undefined : 'High priority'},
      {title:'Train staff on prohibited AI practices', detail:'Explicitly prohibit disallowed use cases and risky shortcuts.'},
      {title:'Maintain dated records of training completion', detail:'Store evidence for audits and governance reporting.'}
    ]},
  ];
  if (['significant','limited'].includes(p.personal_data) || !g.includes('gdpr')) sections.push({title:'Data governance & acceptable use', priority:p.personal_data==='significant'?'high':'medium', deadline:'Do now', items:[
    {title:'Define prohibited data categories for AI input', detail:'Ban sensitive data uploads unless expressly approved.', tag:p.personal_data==='significant'?'Urgent':undefined},
    ...(!g.includes('dpa')?[{title:'Obtain Data Processing Agreements with all AI providers', detail:'Ensure contractual controls for processor obligations.', tag:'Required'}]:[]),
    {title:'Document cross-border data flows', detail:'Map destinations, transfer tools, and safeguards.'},
    {title:'Mandate human oversight for AI-assisted decisions', detail:'Ensure accountable reviewers can override AI outputs.'},
    ...(!g.includes('gdpr')?[{title:'Ensure your GDPR programme covers AI tool use', detail:'Integrate AI into DPIA, RoPA, and lawful basis controls.', tag:'High priority'}]:[])
  ]});
  if (['provider','both'].includes(p.ai_role)) sections.push({title:'Provider obligations', priority:'high', deadline:'Aug 2026', items:[
    {title:'Classify your AI system(s) by risk tier', detail:'Identify prohibited, high-risk, and limited-risk characteristics.', tag:'Provider-specific'},
    {title:'Implement a risk management system', detail:'Define hazard identification, mitigation, and review cycles.', tag:'Provider-specific'},
    {title:'Prepare technical documentation', detail:'Document model purpose, performance, data governance, and limitations.', tag:'Provider-specific'},
    {title:'Provide downstream deployers with sufficient information', detail:'Support safe deployment with clear operating instructions.', tag:'Provider-specific'},
    ...(high?[{title:'Complete conformity assessment for high-risk AI systems', detail:'Perform required assessment pathway and evidence capture.', tag:'High-risk'}]:[])
  ]});
  if (high) sections.push({title:'High-risk AI obligations', priority:'high', deadline:'Aug 2026', items:[
    {title:'Conduct a Fundamental Rights Impact Assessment (FRIA)', detail:'Assess and document impacts on affected persons.', tag:'Required by law'},
    {title:'Implement enhanced human oversight for high-risk systems', detail:'Define control points, escalation, and intervention.', tag:'Required'},
    {title:'Keep logs of high-risk AI system activity', detail:'Maintain traceability for audit, incidents, and redress.'},
    ...((p.high_risk_contexts||[]).includes('recruitment')?[{title:'Audit AI-assisted recruitment for bias and fairness', detail:'Test disparate impact and mitigation controls.', tag:'Recruitment-specific'}]:[]),
    ...((p.high_risk_contexts||[]).includes('biometric')?[{title:'Review biometric AI use — likely prohibited or heavily restricted', detail:'Escalate legal review immediately before continued use.', tag:'Check urgently'}]:[])
  ]});
  sections.push({title:'Transparency & accountability', priority:'medium', deadline:'Aug 2026', items:[
    {title:'Appoint an internal AI compliance owner', detail:['large','medium'].includes(p.org_size)?'Assign a formal owner with cross-functional authority.':'Assign a named responsible lead, even in a lean team.'},
    {title:'Update your privacy notice to cover AI tool use', detail:'Describe processing purpose, categories, and safeguards.'},
    {title:'Establish a process for AI-related incidents', detail:'Capture, investigate, and remediate model or usage failures.'},
    {title:'Disclose AI involvement in external-facing communications', detail:'Implement consistent notices across channels.', tag:'Aug 2026'},
    ...(['finance','healthcare','public'].includes(p.sector)?[{title:'Review sector-specific AI guidance from your regulator', detail:'Align with supervisory expectations and sector rules.', tag:'Sector-specific'}]:[])
  ]});
  sections.push({title:'AI supplier & supply chain management', priority:'medium', deadline:'Ongoing', items:[{title:'Request AI Act compliance documentation from key AI providers', detail:'Collect and review evidence from vendors.'},{title:'Review AI provider terms of service for business use', detail:'Verify rights, limits, and indemnity terms.'},{title:'Audit SaaS platforms for embedded AI features', detail:'Identify hidden model features and data flows.'},{title:'Include AI Act compliance in new supplier contracts', detail:'Add due diligence and contractual control language.', tag:'Forward-looking'}]});
  sections.push({title:'August 2026 deadline preparation', priority:'medium', deadline:'Before 2 Aug 2026', items:[{title:'Conduct a formal AI compliance review before August 2026', detail:'Run a full readiness review and remediation plan.', tag:'Deadline'},{title:'Brief leadership on AI Act obligations and potential penalties', detail:'Present risk profile, investment needs, and timelines.'},{title:'Monitor the Digital Omnibus amendments', detail:'Track evolving implementation guidance and updates.'},...(g.includes('iso')?[{title:'Map AI Act obligations onto your existing ISO 27001 controls', detail:'Use existing control frameworks to accelerate compliance.', tag:'Leverage existing work'}]:[]),{title:'Schedule annual AI compliance reviews', detail:'Embed recurring governance and assurance routines.', tag:'Ongoing'}]});
  return sections;
};
