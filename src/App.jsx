import { useMemo, useState } from 'react';
import LandingPage from './components/LandingPage';
import Assessment from './components/Assessment';
import Results from './components/Results';
import { generateChecklist, getRiskLevel } from './data/checklist';

export default function App() {
  const [stage, setStage] = useState('landing');
  const [profile, setProfile] = useState({});
  const [completed, setCompleted] = useState({});
  const checklist = useMemo(() => generateChecklist(profile), [profile]);
  const risk = useMemo(() => getRiskLevel(profile), [profile]);
  return stage === 'landing' ? <LandingPage onStart={() => setStage('assessment')} /> : stage === 'assessment' ? (
    <Assessment onBack={() => setStage('landing')} onComplete={(p) => { setProfile(p); setCompleted({}); setStage('results'); }} />
  ) : <Results profile={profile} sections={checklist} risk={risk} completed={completed} setCompleted={setCompleted} onRestart={() => { setProfile({}); setCompleted({}); setStage('landing'); }} />;
}
