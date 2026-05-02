export const questions = [
  { id: 'org_size', type: 'single', title: 'How large is your organisation?', hint: 'Select one option', options: [
    { value: 'micro', label: 'Micro (1–9)' }, { value: 'small', label: 'Small (10–49)' }, { value: 'medium', label: 'Medium (50–249)' }, { value: 'large', label: 'Large (250+)' }
  ]},
  { id: 'sector', type: 'single', title: "What sector does your organisation operate in?", hint: 'Select one option', options: [
    { value: 'tech', label: 'Technology/Software' }, { value: 'finance', label: 'Finance/Insurance' }, { value: 'healthcare', label: 'Healthcare/Life sciences' }, { value: 'retail', label: 'Retail/E-commerce' }, { value: 'professional', label: 'Professional services/Legal' }, { value: 'public', label: 'Public sector/Government' }, { value: 'education', label: 'Education' }, { value: 'other', label: 'Other' }
  ]},
  { id: 'ai_role', type: 'single', title: "What is your organisation's primary role with AI?", hint: 'Select one option', options: [
    { value: 'deployer', label: 'We use AI tools built by others (deployer)' }, { value: 'provider', label: 'We build AI systems or products (provider)' }, { value: 'both', label: 'Both — we build and use AI' }, { value: 'unsure', label: "We're not sure yet" }
  ]},
  { id: 'eu_nexus', type: 'single', title: 'Where do you operate or sell to?', hint: 'Select one option', options: [
    { value: 'eu_primary', label: 'Primarily within the EU/UK' }, { value: 'eu_mixed', label: 'EU/UK plus other markets' }, { value: 'eu_some', label: 'Mainly outside the EU but some EU customers' }, { value: 'no_eu', label: 'No EU customers or operations' }
  ]},
  { id: 'tools', type: 'multi', title: 'Which AI tools or systems does your organisation currently use?', hint: 'Select all that apply', options: [
    { value: 'productivity', label: 'Productivity AI (Claude, ChatGPT, Copilot, Gemini)' }, { value: 'hr_tools', label: 'HR/recruitment tools with AI features' }, { value: 'chatbots', label: 'Customer-facing chatbots or AI assistants' }, { value: 'security', label: 'Security/EDR/threat detection with AI' }, { value: 'analytics', label: 'AI-powered analytics or business intelligence' }, { value: 'coding', label: 'AI coding assistants (GitHub Copilot, Cursor, etc.)' }, { value: 'custom', label: 'Custom-built AI systems' }, { value: 'none_yet', label: "None yet — we're planning to", exclusive: true }
  ]},
  { id: 'high_risk_contexts', type: 'multi', title: 'Does your organisation use AI in any of these higher-risk contexts?', hint: 'Select all that apply', options: [
    { value: 'recruitment', label: 'Recruitment, screening, or performance evaluation' }, { value: 'credit', label: 'Credit scoring or financial decisions about individuals' }, { value: 'identity', label: 'Access control or identity verification' }, { value: 'infrastructure', label: 'Critical infrastructure (utilities, transport, etc.)' }, { value: 'law_enforcement', label: 'Law enforcement or public safety' }, { value: 'biometric', label: 'Biometric identification or emotion recognition' }, { value: 'none_high', label: 'None of these', exclusive: true }
  ]},
  { id: 'personal_data', type: 'single', title: 'Does your organisation process personal data through AI tools?', hint: 'Select one option', options: [
    { value: 'significant', label: 'Yes — significant amounts of personal data' }, { value: 'limited', label: 'Yes — limited or occasional personal data' }, { value: 'none', label: 'No — we keep personal data out of AI tools' }, { value: 'unsure', label: "We're not sure / haven't assessed this" }
  ]},
  { id: 'governance', type: 'multi', title: 'What AI governance does your organisation currently have in place?', hint: 'Select all that apply', options: [
    { value: 'ai_policy', label: 'A written AI acceptable use policy' }, { value: 'training', label: 'Staff training on AI use' }, { value: 'dpa', label: 'Data Processing Agreements with AI providers' }, { value: 'gdpr', label: 'GDPR / data protection programme' }, { value: 'iso', label: 'ISO 27001 or similar security framework' }, { value: 'dpo', label: 'A Data Protection Officer (DPO)' }, { value: 'nothing_formal', label: 'Nothing formal in place yet', exclusive: true }
  ]},
  { id: 'timeline', type: 'single', title: 'How soon are you looking to address EU AI Act compliance?', hint: 'Select one option', options: [
    { value: 'immediate', label: 'Immediately — we need to act now' }, { value: '3_6_months', label: 'Within the next 3–6 months' }, { value: 'within_year', label: 'Within the next year' }, { value: 'exploring', label: 'Just exploring for now' }
  ]},
  { id: 'org_name', type: 'text', title: "Finally — what's your organisation's name?", hint: 'Optional — press Next to skip', placeholder: 'e.g. Acme Ltd' }
];
