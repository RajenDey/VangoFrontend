import { Sidebar } from "@/components/templates/music/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LinearProgress, Typography } from '@mui/material'
import { getImages } from "@/api/other";

type CardProps = {
  index: number;
  randomizeSeed: boolean;
  seedValue: string;
  steps: number;
  guidanceScale: number;
  width: number;
  height: number;
  sampler: string;
  scheduler: string;
  denoise: number;
  duplicateCard: (index: number) => void;
  updateCard: (index: number, property: string, value: any) => void;
};

type ResultsProps = {
  running: boolean;
  numModels: number;
  run: () => void;
};

export default function Demo() {
  const [currentTab, setCurrentTab] = useState("Evaluation Tests");
  const [cards, setCards] = useState<CardProps[]>([]);
  const [running, setRunning] = useState(false);

  const updateCard = (index: number, property: string, value: any) => {
    setCards(cards => {
      const updatedCards = [...cards];
      updatedCards[index][property] = value;
      return updatedCards;
    });
  };

  const duplicateCard = (index: number) => {
    setCards(cards => {
      const newCards = [...cards];
      const newCard = { ...newCards[index], index: newCards.length };
      return [...newCards, newCard];
    });
  };

  const run = () => {
    setRunning(true);
  };

  useEffect(() => {
    setCards([{
      index: 0,
      randomizeSeed: false,
      seedValue: '42',
      steps: 30,
      guidanceScale: 8.0,
      width: 1024,
      height: 1024,
      sampler: 'Euler',
      scheduler: 'Normal',
      denoise: 1.0,
      duplicateCard: duplicateCard,
      updateCard: updateCard
    }]);
  }, []);

  return (
    <div className="flex flex-row h-screen w-full">
      {/* <Sidebar currentTab={currentTab} switchTab={setCurrentTab} /> */}
      <div className="flex-col md:flex flex-grow">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-4xl font-bold tracking-tight">My First AB Test</h2>
            <Button className="bg-blue-600 hover:bg-blue-800 text-white px-10" onClick={run}>Run</Button>
          </div>
          {currentTab === "Evaluation Tests" ? cards.map((card, index) => <Card key={index} {...card} />) : <div></div>}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Validation Dataset</h2>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm">Import from</label>
                  <select className="mt-1 p-2 w-full border rounded-md">
                    <option value="Vango">Vango</option>
                    <option value="AWS S3" disabled>AWS S3</option>
                    <option value="csv" disabled>.csv</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm">Prebuilt Datasets</label>
                  <select className="mt-1 p-2 w-full border rounded-md">
                    <option value="Humans (1k)" disabled>Humans (1k)</option>
                    <option value="Humans closeup (1k)">Humans closeup (1k)</option>
                    <option value="Clothes (1k)" disabled>Clothes (1k)</option>
                    <option value="Objects (5k)" disabled>Objects (5k)</option>
                    <option value="Products (5k)" disabled>Products (5k)</option>
                    <option value="Mesh textures (1k)" disabled>Mesh textures (1k)</option>
                    <option value="Vector art (1k)" disabled>Vector art (1k)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Results running={running} numModels={2} run={run}/>
        </div>
      </div>
    </div>
  );
}

function Card(props: CardProps) {
  const { index, randomizeSeed, seedValue, steps, guidanceScale, width, height, sampler, scheduler, denoise, duplicateCard, updateCard } = props;
  
  return (
    <div className="flex-col md:flex bg-white p-4 rounded shadow">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Model</h2>
          <div className="flex items-center space-x-2">
              <Button onClick={() => {duplicateCard(index)}}>Duplicate</Button>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm">Import from</label>
              <select value="Vango" className="mt-1 p-2 w-full border rounded-md">
                <option value="Vango">Vango</option>
                <option value="Replicate" disabled>Replicate</option>
                <option value="API endpoint" disabled>API endpoint</option>
                <option value=".safetensors or .ckpt" disabled>.safetensors or .ckpt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Model link (click on me to view and run the model!)</label>
              <input type="text" value="https://vango.ai/file/c941464c-8ff4-47c6-9f84-08b4f83e38d6" readOnly className="mt-1 p-2 w-full border rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-4 gap-4">
            {/* Seed */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Seed</span></label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" checked={randomizeSeed} onChange={() => updateCard(index, "randomizeSeed", !randomizeSeed)} />
                  Randomize
                </label>
              </div>
              <input type="number" value={randomizeSeed ? '' : seedValue} onChange={(e) => updateCard(index, "seedValue", e.target.value)} disabled={randomizeSeed} className={`mt-1 p-2 w-full border rounded-md ${randomizeSeed ? 'bg-gray-200' : ''}`} />
            </div>
            {/* Steps */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Steps</span> <span id={`sliderValue1_${index}`}>{steps}</span></label>
              <input type="range" min="0" max="100" step="1" value={steps} className="mt-1 w-full" onChange={(e) => updateCard(index, "steps", parseInt(e.target.value))} />
            </div>
            {/* Guidance Scale */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Guidance Scale (CFG)</span> <span id={`sliderValue2_${index}`} className="">{guidanceScale}</span></label>
              <input type="range" min="0.0" max="50.0" step="0.1" value={guidanceScale} className="mt-1 w-full" onChange={(e) => updateCard(index, "guidanceScale", parseFloat(e.target.value))} />
            </div>
            {/* Denoise */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Denoise</span></label>
              <input type="number" value={denoise} step="0.1" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => updateCard(index, "denoise", parseFloat(e.target.value))} />
            </div>
            {/* Width */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Width</span></label>
              <input type="number" value={width} step="16" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => updateCard(index, "width", parseInt(e.target.value))} />
            </div>
            {/* Height */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Height</span></label>
              <input type="number" value={height} step="16" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => updateCard(index, "height", parseInt(e.target.value))} />
            </div>
            {/* Sampler */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Sampler</span></label>
              <select value={sampler} className="mt-1 p-2 w-full border rounded-md" onChange={(e) => updateCard(index, "sampler", e.target.value)}>
                <option value="option1">Euler</option>
                <option value="option2">Euler Ancestral</option>
                <option value="option3">Heun</option>
                <option value="option4">DPM 2</option>
                <option value="option5">DPM 2 Ancestral</option>
                <option value="option6">DPM 2 Fast</option>
                <option value="option7">DPM 2 Adaptive</option>
                <option value="option8">DDIM</option>
                <option value="option9">LMS</option>
              </select>
            </div>
            {/* Scheduler */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Scheduler</span></label>
              <select value={scheduler} className="mt-1 p-2 w-full border rounded-md" onChange={(e) => updateCard(index, "scheduler", e.target.value)}>
                <option value="option1">Normal</option>
                <option value="option2">Karras</option>
                <option value="option3">Exponential</option>
                <option value="option4">Simple</option>
                <option value="option5">DDIM Uniform</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Results(props: ResultsProps) {
  const { running, numModels, run } = props;
  const prompts = [
    "Tight frame of a young European male firefighter, smudges of soot on his chiseled face, piercing blue eyes, short-cropped brown hair, wearing a reflective helmet, reddened cheeks from heat. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Closeup of an elderly Native American female, wrinkles and lines mapping her face, adorned with turquoise jewelry, silver hair braided, eyes softened with wisdom. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Facial shot of a South Asian female teacher, glasses perched on her nose, dark hair pulled back tightly into a bun, lips pursed in concentration, wearing a bright yellow scarf. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Detailed view of a Latinx male sculptor's face, specks of clay, intense focus in brown eyes, wavy brown hair framing his forehead, a slight frown of concentration. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Macro image of an Australian male surfer, sun-bleached hair tousled by the wind, tanned skin, salty water droplets on his cheeks, squinting against the glare. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Close capture of an African female nurse's face, warm, inviting smile, short black hair, wearing a medical mask, eyes reflecting compassion, dimples visible, soft skin tones. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Portrait of a Japanese female calligrapher, traditional hat framing her face, serene expression, black ink smudge on her pale cheek, hair hidden under the hat, delicate features in harmony. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Closeup of an Arab male mechanic's face, grease-streaked skin, determined brown eyes under thick eyebrows, short black hair with a streak of gray, wearing protective goggles, slight grin of satisfaction. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Tight shot of an elderly Russian male farmer, weathered face with age spots, white beard, balding with wisps of white hair, wearing a woolen hat, eyes gleaming with experience, nose reddened by cold. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3",
    "Close view of a Canadian male mountaineer's face, windburned skin, glacier-blue eyes, short, icy-blond hair peeking from hood, face dusted with snow, lips cracked, expression of resolve. ((highly detailed)), ((photorealistic)), 80mm, Canon EOS R3"
  ];

  const tags = [
    "Low CLIP Similarity",
    "Low Photorealism",
    "NSFW",
    "Deformed Hands",
    "Deformed Eyes",
    "Extra Limbs",
    "Extra Heads"
  ]

  const modelOneTags = [
    [],
    ["Low Photorealism"],
    [],
    ["Low CLIP Similarity", "Low Photorealism"],
    ["Deformed Eyes"],
    ["Low CLIP Similarity"],
    ["Low CLIP Similarity"],
    [],
    [],
    [],
  ]

  const modelTwoTags = [
    [],
    ["Deformed Hands"],
    ["Deformed Hands", "Deformed Eyes"],
    ["Low CLIP Similarity", "Low Photorealism"],
    [],
    ["Deformed Eyes"],
    ["Low CLIP Similarity"],
    ["Low Photorealism"],
    [],
    []
  ]

  const indices = Array.from({ length: modelOneTags.length }, (_, i) => i);

  const [numRows, setNumRows] = useState(numModels);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [finishedRunning, setFinishedRunning] = useState(false);
  const [modelOneImages, setModelOneImages] = useState<string[]>([]);
  const [modelTwoImages, setModelTwoImages] = useState<string[]>([]);
  const [showIndices, setShowIndices] = useState<number[]>(indices);
  const [selectedFilters, setSelectedFilters] = useState(new Set<string>());
  const [metrics, setMetrics] = useState(
    new Array(numRows).fill(0).map(() => ({
      clip_similarity_score: 80,
      photorealistic: 90,
      nsfw: 3,
      hands: 2,
      eyes: 12,
      limbs: 0,
      heads: 0,
    }))
  );

  const onFilterClick = (tag: string) => {
    if (selectedFilters.has(tag)) {
      selectedFilters.delete(tag);
    } else {
      selectedFilters.add(tag);
    }
    setSelectedFilters(new Set(selectedFilters));

    if (selectedFilters.size === 0) {
      setShowIndices(indices);
    } else {
      setShowIndices(indices.filter(i => modelOneTags[i].some(tag => selectedFilters.has(tag)) || modelTwoTags[i].some(tag => selectedFilters.has(tag))));
    }
  };

  useEffect(() => {
    getImages().then((res) => {
      const modelOneImages = res.slice(0, 10);
      const modelTwoImages = res.slice(10, 20);
      setModelOneImages(modelOneImages);
      setModelTwoImages(modelTwoImages);
    });
  }, []);

  useEffect(() => {
    if (running) {
      const targetPercentages = [
        {
          clip_similarity_score: 70 + Math.random() * 2,
          photorealistic: 75 + Math.random() * 4,
          nsfw: 2 + Math.random() * 4,
          hands: 1 + Math.random() * 2,
          eyes: 5 + Math.random() * 2,
          limbs: 0.1 + Math.random() * 2,
          heads: 0.1 + Math.random() * 2,
        },
        {
          clip_similarity_score: 65 + Math.random() * 2,
          photorealistic: 95 + Math.random() * 2,
          nsfw: 2 + Math.random() * 4,
          hands: 5 + Math.random() * 2,
          eyes: 12 + Math.random() * 2,
          limbs: 0.1 + Math.random() * 2,
          heads: 0.1 + Math.random() * 2,
        },
      ];
  
      const interval = setInterval(() => {
        setLoadingPercent((loadingPercent) => {
          if (loadingPercent >= 100) {
            clearInterval(interval);
            setFinishedRunning(true);
            return 100;
          }
          return loadingPercent + 1;
        });
  
        const truncate = (value) => Number(Math.max(0, value).toFixed(2));
  
        const adjustValue = (prev, target) => {
          const noise = (Math.random() * 2 - 1) * (target - prev) * 0.1;
          const step = (target - prev + Math.random()) * 0.1 + noise;
          return truncate(prev + step);
        };        
        
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric, idx) => ({
            clip_similarity_score: adjustValue(metric.clip_similarity_score, targetPercentages[idx].clip_similarity_score),
            photorealistic: adjustValue(metric.photorealistic, targetPercentages[idx].photorealistic),
            nsfw: adjustValue(metric.nsfw, targetPercentages[idx].nsfw),
            hands: adjustValue(metric.hands, targetPercentages[idx].hands),
            eyes: adjustValue(metric.eyes, targetPercentages[idx].eyes),
            limbs: adjustValue(metric.limbs, targetPercentages[idx].limbs),
            heads: adjustValue(metric.heads, targetPercentages[idx].heads),
          }))
        );
  
      }, 300);
  
      return () => clearInterval(interval);
    }
  }, [running]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Results</h2>
      </div>
      <div className="bg-white p-4 mt-4">
        {
          running ? 
          <div>
            <div>
              <h1 style={{fontSize: 15, fontWeight: 'normal'}}>{loadingPercent * 10}/1000 images processed</h1>
              <div>
                <LinearProgress variant='determinate' value={loadingPercent} sx={{height: 5}}/>
                <Typography variant='body1' style={{textAlign: 'right'}}>{loadingPercent}%</Typography>
                </div>
            </div>
            <table className="w-full text-center border-collapse border border-gray-300 mt-4">
              <thead>
                <tr>
                <th className="border border-gray-300 p-2"></th>
                  <th className="border border-gray-300 p-2 text-green-600">CLIP Similarity</th>
                  <th className="border border-gray-300 p-2 text-green-600">Photorealism</th>
                  <th className="border border-gray-300 p-2 text-red-600">NSFW</th>
                  <th className="border border-gray-300 p-2 text-red-600">Deformed Hands</th>
                  <th className="border border-gray-300 p-2 text-red-600">Deformed Eyes</th>
                  <th className="border border-gray-300 p-2 text-red-600">Extra Limbs</th>
                  <th className="border border-gray-300 p-2 text-red-600">Extra Heads</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-2 font-bold">Model {idx + 1}</td>
                    <td className="border border-gray-300 p-2">{metric.clip_similarity_score}%</td>
                    <td className="border border-gray-300 p-2">{metric.photorealistic}%</td>
                    <td className="border border-gray-300 p-2">{metric.nsfw}%</td>
                    <td className="border border-gray-300 p-2">{metric.hands}%</td>
                    <td className="border border-gray-300 p-2">{metric.eyes}%</td>
                    <td className="border border-gray-300 p-2">{metric.limbs}%</td>
                    <td className="border border-gray-300 p-2">{metric.heads}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="overflow-y-auto h-[800px] mt-4 p-4 rounded shadow">
              <div className="pb-4">
                <label className="block text-sm font-bold">Filter by</label>
                <div className="flex flex-wrap">
                  {tags.map((tag, idx) => (
                    <button key={idx} className={`flex items-center space-x-2 text-sm p-2 m-2 rounded text-white ${selectedFilters.has(tags[idx]) ? "bg-gray-900" : "bg-gray-500"} hover:bg-gray-900`} onClick={() => {onFilterClick(tags[idx])}}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <table className="w-full text-center border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Prompt</th>
                    <th className="border border-gray-300 p-2">Model 1 Output</th>
                    <th className="border border-gray-300 p-2">Model 2 Output</th>
                  </tr>
                </thead>
                <tbody>
                  {showIndices.map((idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2" style={{ maxWidth: '300px', wordWrap: 'break-word'}}>{prompts[idx]}</td>
                      <td className="border border-gray-300 p-2">
                        <img src={modelOneImages[idx]} alt={`Model 1 Output ${idx + 1}`} style={{ width: '512px', height: 'auto' }} />
                        <div style={{ height: '20px' }}>{modelOneTags[idx].join(', ')}</div>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <img src={modelTwoImages[idx]} alt={`Model 2 Output ${idx + 1}`} style={{ width: '512px', height: 'auto' }} />
                        <div style={{ height: '20px' }}>{modelTwoTags[idx].join(', ')}</div>
                      </td>
                    </tr>
                  ))}
                  {
                    showIndices.length === 10 &&
                    <tr>
                      <td className="border border-gray-300 p-2" style={{ maxWidth: '300px', wordWrap: 'break-word'}}>990 more...</td>
                      <td className="border border-gray-300 p-2">990 more...</td>
                      <td className="border border-gray-300 p-2">990 more...</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div> : 
          <Button className="bg-blue-600 hover:bg-blue-800 text-white px-10" onClick={run}>Run</Button>
        }
      </div>
    </div>
  );
}