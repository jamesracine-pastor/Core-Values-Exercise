import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, ChevronRight, RotateCcw, Plus, Download, GripVertical } from "lucide-react";

function AllPeoplesLogo() {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-[6px] border-slate-900 text-slate-900 md:h-72 md:w-72">
        <div className="translate-y-1 px-8 text-center leading-none md:translate-y-2">
          <div className="text-[1.4rem] font-black tracking-[0.08em] md:text-[2.05rem]">ALLPEOPLES</div>
          <div className="mt-2 text-[0.8rem] font-bold tracking-[0.55em] md:text-[1rem]">TWIN CITIES</div>
        </div>
      </div>
    </div>
  );
}

const MASTER_VALUES = [
  "Accountability","Achievement","Adaptability","Adventure","Altruism","Ambition","Appreciation","Art","Authenticity","Balance","Beauty","Boldness","Bravery","Care","Career","Challenge","Change","Clarity","Collaboration","Commitment","Communication","Community","Compassion","Competence","Confidence","Connection","Consistency","Contentment","Contribution","Cooperation","Courage","Courtesy","Creativity","Curiosity","Dedication","Dependability","Determination","Devotion","Dignity","Diligence","Discipline","Diversity","Drive","Education","Efficiency","Empathy","Empowerment","Endurance","Entrepreneurship","Environment","Equality","Ethics","Excellence","Faith","Fairness","Family","Financial Stability","Flexibility","Focus","Forgiveness","Freedom","Friendship","Fun","Future Generations","Generosity","Grace","Gratitude","Growth","Harmony","Health","Home","Honesty","Hope","Humility","Humor","Imagination","Impact","Inclusion","Independence","Initiative","Inner Healing","Innovation","Inspiration","Integrity","Intuition","Joy","Justice","Kindness","Knowledge","Leadership","Learning","Legacy","Leisure","Love","Loyalty","Mentoring","Mindfulness","Missions","Moderation","Motivation","Music","Nature","Open-mindedness","Optimism","Order","Parenting","Passion","Patience","Patriotism","Peace","Perseverance","Persistence","Personal Fulfillment","Positivity","Power","Prayer","Prophecy","Purpose","Recognition","Reliability","Resourcefulness","Respect","Responsibility","Risk-taking","Safety","Security","Self-awareness","Self-discipline","Self-esteem","Self-expression","Self-improvement","Self-respect","Service","Serving","Serenity","Simplicity","Social Justice","Spirituality","Sports","Sportsmanship","Stability","Stewardship","Strength","Success","Support","Sustainability","Teamwork","Tenacity","The Church","The Poor","Thrift","Time","Tolerance","Tradition","Transparency","Travel","Trust","Truth","Understanding","Uniqueness","Unity","Usefulness","Vision","Vulnerability","Wealth","Well-being","Wholeheartedness","Wisdom","Work Ethic","Worship","Writing","Performing"
].sort((a, b) => a.localeCompare(b));

const STEPS = [
  { id: 1, title: "Explore the word bank", subtitle: "Click every word that feels personally meaningful to you." },
  { id: 2, title: "Refine your list", subtitle: "Move the less resonant words into the secondary column." },
  { id: 3, title: "Keep refining", subtitle: "Select the words that feel most central and enduring." },
  { id: 4, title: "Discern your strongest themes", subtitle: "Now narrow your list down to your five strongest values." },
  { id: 5, title: "Final reflection", subtitle: "From these, choose the three values that best capture your core design." },
];

const getEffectiveStep = ({ step, step2Keep, top10, top5 }: { step: number; step2Keep: string[]; top10: string[]; top5: string[]; }) => {
  if (step <= 1) return 1;
  if (step === 2) return 2;
  if (step === 3) return 3;
  if (step === 4) return 4;
  if (step === 5) return 5;
  if (top5.length > 0) return 5;
  if (top10.length > 0) return 4;
  if (step2Keep.length > 0) return 3;
  return 1;
};

function titleCase(value: string) {
  return value
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function ValueChip({ label, active, onClick, draggable = false, onDragStart }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <button
        type="button"
        draggable={draggable}
        onDragStart={onDragStart}
        onClick={onClick}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
          active
            ? "border-slate-900 bg-slate-900 text-white shadow"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
        }`}
      >
        {draggable && <GripVertical className="h-3.5 w-3.5 opacity-70" />}
        <span>{label}</span>
        {active && <Check className="h-3.5 w-3.5" />}
      </button>
    </motion.div>
  );
}

function Column({ title, description, items, onDropItem, onItemClick, emptyText, variant = "primary" }: { title: string; description: string; items: string[]; onDropItem: (item: string) => void; onItemClick: (item: string) => void; emptyText: string; variant?: "primary" | "secondary"; }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const value = e.dataTransfer.getData("text/plain");
        if (value) onDropItem(value);
      }}
      className={`min-h-[220px] rounded-2xl border p-4 ${variant === "primary" ? "border-slate-300 bg-white" : "border-dashed border-slate-300 bg-slate-50"}`}
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      {items.length === 0 ? <div className="rounded-xl border border-dashed border-slate-200 bg-white/70 p-6 text-sm text-slate-400">{emptyText}</div> : <div className="flex flex-wrap gap-2">{items.map((item) => <ValueChip key={item} label={item} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", item)} onClick={() => onItemClick(item)} />)}</div>}
    </div>
  );
}

export default function CoreValuesExercise() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState("");
  const [step2Keep, setStep2Keep] = useState<string[]>([]);
  const [step2SetAside, setStep2SetAside] = useState<string[]>([]);
  const [top10, setTop10] = useState<string[]>([]);
  const [top5, setTop5] = useState<string[]>([]);
  const [top3, setTop3] = useState<string[]>([]);

  const effectiveStep = useMemo(() => getEffectiveStep({ step, step2Keep, top10, top5 }), [step, step2Keep, top10, top5]);
  const progress = useMemo(() => (effectiveStep / STEPS.length) * 100, [effectiveStep]);
  const halfTarget = useMemo(() => Math.max(1, Math.ceil(selected.length / 2)), [selected]);

  const buildChatGPTLink = () => {
    if (top3.length !== 3) return "";
    const prompt = `I just completed a Christian core values exercise and my three core values are: ${top3.join(", ")}. Please write a thoughtful 4-5 sentence reflection about how these values might reflect how God has wired me. Use language like: 'It seems that God has wired you...' and 'You might find vocational fulfillment when...' Keep the tone pastoral, encouraging, and reflective.`;
    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  };
  const currentStep = STEPS.find((s) => s.id === effectiveStep);

  const addCustomValue = () => {
    const formatted = titleCase(customValue.trim());
    if (!formatted) return;
    if (!selected.includes(formatted)) setSelected((prev) => [...prev, formatted].sort((a, b) => a.localeCompare(b)));
    setCustomValue("");
  };

  const toggleSelected = (value: string) => setSelected((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value].sort((a, b) => a.localeCompare(b)));
  const startStep2 = () => { setStep2Keep([...selected]); setStep2SetAside([]); setStep(2); };
  const moveToKeep = (item: string) => { setStep2SetAside((prev) => prev.filter((v) => v !== item)); setStep2Keep((prev) => [...prev, item].sort((a, b) => a.localeCompare(b))); };
  const moveToSetAside = (item: string) => { setStep2Keep((prev) => prev.filter((v) => v !== item)); setStep2SetAside((prev) => [...prev, item].sort((a, b) => a.localeCompare(b))); };
  const startStep3 = () => {
    if (step2Keep.length <= 5) { setTop10([...step2Keep]); setTop5([...step2Keep]); setTop3([]); setStep(5); return; }
    if (step2Keep.length <= 10) { setTop10([...step2Keep]); setTop5([]); setTop3([]); setStep(4); return; }
    setTop10([]); setTop5([]); setTop3([]); setStep(3);
  };
  const toggleTop10 = (item: string) => setTop10((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : prev.length >= 10 ? prev : [...prev, item]);
  const startStep4 = () => { if (top10.length <= 5) { setTop5([...top10]); setTop3([]); setStep(5); return; } setTop5([]); setTop3([]); setStep(4); };
  const toggleTop5 = (item: string) => setTop5((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : prev.length >= 5 ? prev : [...prev, item]);
  const startStep5 = () => { setTop3([]); setStep(5); };
  const toggleTop3 = (item: string) => setTop3((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : prev.length >= 3 ? prev : [...prev, item]);
  const resetAll = () => { setStep(1); setSelected([]); setCustomValue(""); setStep2Keep([]); setStep2SetAside([]); setTop10([]); setTop5([]); setTop3([]); };

  const downloadResults = () => {
    const content = [
      "Core Values Exercise",
      "",
      `Initial selections (${selected.length}): ${selected.join(", ")}`,
      `After refinement (${step2Keep.length}): ${step2Keep.join(", ")}`,
      `Focused list: ${top10.join(", ")}`,
      `Strongest themes: ${top5.join(", ")}`,
      `Final values: ${top3.join(", ")}`,
      "",
      '“The place God calls you to is the place where your deep gladness and the world’s deep hunger meet.” — Frederick Buechner',
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "core-values-exercise-results.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
          <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60">
            <CardHeader className="pb-4">
              <div className="mb-4"><AllPeoplesLogo /></div>
              <CardTitle className="text-center text-3xl tracking-tight text-slate-900 md:text-4xl">Core Values Exercise</CardTitle>
              <CardDescription className="mx-auto max-w-2xl text-center text-base text-slate-600">A tool to help you narrow down your most-core values.</CardDescription>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm italic text-slate-600">“The place God calls you to is the place where your deep gladness and the world’s deep hunger meet.” — Frederick Buechner</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-500"><span>Step {effectiveStep} of {STEPS.length}</span><span>{currentStep?.title}</span></div>
                <Progress value={progress} className="h-2" />
                <div className="grid gap-2 md:grid-cols-5">{STEPS.map((s) => <div key={s.id} className={`rounded-2xl border px-3 py-3 text-sm ${s.id === effectiveStep ? "border-slate-900 bg-slate-900 text-white" : s.id < effectiveStep ? "border-slate-200 bg-slate-100 text-slate-700" : "border-slate-200 bg-white text-slate-400"}`}><div className="font-semibold">{s.id}</div><div className="mt-1 leading-tight">{s.title}</div></div>)}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60">
            <CardHeader><CardTitle className="text-lg">Your summary</CardTitle><CardDescription>Watch your list become clearer as you go.</CardDescription></CardHeader>
            <CardContent className="space-y-4 text-sm">
              {["Selected words", "After first refinement", "Focused list", "Strongest themes", "Final values"].map((label, index) => {
                const counts = [selected.length, step2Keep.length, top10.length, top5.length, top3.length];
                return <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"><span className="text-slate-500">{label}</span><Badge className="rounded-full">{counts[index]}</Badge></div>;
              })}
              <Separator />
              {top3.length > 0 ? <div><div className="mb-2 font-medium text-slate-700">Current reflection set</div><div className="flex flex-wrap gap-2">{top3.map((item) => <Badge key={item} className="rounded-full px-3 py-1 text-sm">{item}</Badge>)}</div></div> : <p className="text-slate-500">Your final reflection words will appear here as the exercise unfolds.</p>}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60"><CardHeader><CardTitle>{currentStep?.title}</CardTitle><CardDescription>{currentStep?.subtitle}</CardDescription></CardHeader><CardContent className="space-y-6"><div><div className="mb-3 flex items-center justify-between gap-4"><div><h3 className="font-semibold text-slate-900">Master word bank</h3><p className="text-sm text-slate-500">Click every word that resonates with you.</p></div><Badge className="rounded-full px-3 py-1">{selected.length} selected</Badge></div><div className="flex flex-wrap gap-2">{MASTER_VALUES.map((value) => <ValueChip key={value} label={value} active={selected.includes(value)} onClick={() => toggleSelected(value)} />)}{selected.filter((value) => !MASTER_VALUES.includes(value)).map((value) => <ValueChip key={value} label={value} active onClick={() => toggleSelected(value)} />)}</div></div><div className="rounded-2xl border bg-slate-50 p-4"><div className="mb-3"><h3 className="font-semibold text-slate-900">Write your own value</h3><p className="text-sm text-slate-500">Add a word or phrase that is not already in the word bank.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Input value={customValue} onChange={(e) => setCustomValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomValue()} placeholder="Type a value word or phrase here" className="h-11 rounded-xl bg-white" /><Button onClick={addCustomValue} className="h-11 rounded-xl"><Plus className="mr-2 h-4 w-4" />Add value</Button></div></div></CardContent></Card></motion.div>}

          {step === 2 && <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60"><CardHeader><CardTitle>{currentStep?.title}</CardTitle><CardDescription>{currentStep?.subtitle}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">Aim to keep about half of your original list. With {selected.length} initial selections, that means aiming for about <strong>{halfTarget}</strong> words remaining.</div><div className="rounded-2xl bg-slate-50 p-4 text-sm italic text-slate-700">“If everything is important, then nothing is.” — Patrick M. Lencioni</div></div><div className="grid gap-4 md:grid-cols-2"><Column title={`Keep for now (${step2Keep.length})`} description="These still feel especially meaningful." items={step2Keep} onDropItem={moveToKeep} onItemClick={moveToSetAside} emptyText="Drop values here that you want to keep." variant="primary" /><Column title={`Set aside (${step2SetAside.length})`} description="These matter, but not as strongly as the others." items={step2SetAside} onDropItem={moveToSetAside} onItemClick={moveToKeep} emptyText="Drop less resonant values here." variant="secondary" /></div></CardContent></Card></motion.div>}

          {effectiveStep === 3 && <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60"><CardHeader><CardTitle>{currentStep?.title}</CardTitle><CardDescription>{currentStep?.subtitle}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm"><span className="text-slate-600">Select the words that still feel most central.</span><Badge className="rounded-full px-3 py-1">{top10.length} chosen</Badge></div><div className="flex flex-wrap gap-2">{step2Keep.map((value) => <ValueChip key={value} label={value} active={top10.includes(value)} onClick={() => toggleTop10(value)} />)}</div></CardContent></Card></motion.div>}

          {effectiveStep === 4 && <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60"><CardHeader><CardTitle>{currentStep?.title}</CardTitle><CardDescription>{currentStep?.subtitle}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm"><span className="text-slate-600">Choose exactly five values that most consistently show up in your life.</span><Badge className="rounded-full px-3 py-1">{top5.length} chosen</Badge></div><div className="flex flex-wrap gap-2">{top10.map((value) => <ValueChip key={value} label={value} active={top5.includes(value)} onClick={() => toggleTop5(value)} />)}</div></CardContent></Card></motion.div>}

          {effectiveStep === 5 && <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/60"><CardHeader><CardTitle>{currentStep?.title}</CardTitle><CardDescription>{currentStep?.subtitle}</CardDescription></CardHeader><CardContent className="space-y-6"><div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm"><span className="text-slate-600">Choose exactly three words that best capture your present sense of calling and design.</span><Badge className="rounded-full px-3 py-1">{top3.length} selected</Badge></div><div className="flex flex-wrap gap-2">{top5.map((value) => <ValueChip key={value} label={value} active={top3.includes(value)} onClick={() => toggleTop3(value)} />)}</div><Separator /><div className="rounded-3xl bg-slate-900 p-6 text-white"><div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">Reflection</div><h3 className="text-2xl font-semibold">Your current reflection words</h3><div className="mt-4 flex flex-wrap gap-3">{top3.length > 0 ? top3.map((item, index) => <div key={item} className="rounded-full bg-white/10 px-4 py-2 text-base backdrop-blur">{index + 1}. {item}</div>) : <p className="text-slate-300">Your selected words will appear here once chosen.</p>}</div>{top3.length === 3 && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-100">Take your three values to ChatGPT to explore what they might reveal about how God has wired you.</div>
                  <Button onClick={() => window.open(buildChatGPTLink(), '_blank')} className="rounded-xl bg-white text-slate-900 hover:bg-slate-100">Generate Reflection with ChatGPT</Button>
                </div>
              )}
              <div className="mt-4 text-sm italic text-slate-300">“The place God calls you to is the place where your deep gladness and the world’s deep hunger meet.” — Frederick Buechner</div><div className="mt-6 flex flex-wrap gap-3"><Button onClick={downloadResults} variant="secondary" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Download results</Button><Button onClick={() => window.print()} className="rounded-xl bg-white text-slate-900 hover:bg-slate-100">Print / Save PDF</Button><Button onClick={resetAll} className="rounded-xl bg-white text-slate-900 hover:bg-slate-100">Start the Exercise</Button><Button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied. Share it with a friend!'); }} className="rounded-xl bg-white text-slate-900 hover:bg-slate-100">Share this with a friend</Button></div></div></CardContent></Card></motion.div>}
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" className="rounded-xl" onClick={() => (step === 1 ? resetAll() : setStep((prev) => Math.max(1, prev - 1)))}>{step === 1 ? <RotateCcw className="mr-2 h-4 w-4" /> : <ChevronLeft className="mr-2 h-4 w-4" />}{step === 1 ? "Reset" : "Back"}</Button>
          <div className="flex flex-wrap gap-3">
            {step === 1 && <Button onClick={startStep2} disabled={selected.length < 6} className="rounded-xl">Continue<ChevronRight className="ml-2 h-4 w-4" /></Button>}
            {step === 2 && <Button onClick={startStep3} disabled={step2Keep.length > halfTarget} className="rounded-xl">{step2Keep.length <= 5 ? "Continue to reflection" : step2Keep.length <= 10 ? "Continue to strongest themes" : "Keep refining"}<ChevronRight className="ml-2 h-4 w-4" /></Button>}
            {step === 3 && <Button onClick={startStep4} disabled={top10.length === 0 || top10.length > 10} className="rounded-xl">{top10.length <= 5 ? "Continue to reflection" : "Continue"}<ChevronRight className="ml-2 h-4 w-4" /></Button>}
            {step === 4 && <Button onClick={startStep5} disabled={top5.length !== 5 && top5.length !== top10.length} className="rounded-xl">Continue to final reflection<ChevronRight className="ml-2 h-4 w-4" /></Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
