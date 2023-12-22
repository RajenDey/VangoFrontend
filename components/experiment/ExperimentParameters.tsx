import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Select from 'react-select';
import { ExperimentParameters as VangoExperimentParameters } from "@/models/Experiment";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { listModels } from "@/api/model";
import { Model } from "@/models/Model";

type ExperimentParametersProps = {
  experimentParameters: VangoExperimentParameters;
  runNumber: number;
  runExperiment: (name: string, experimentParameters: VangoExperimentParameters) => void;
};

const modelOptions = [
  { value: 'sd_xl_base_1.0.safetensors', label: 'Stable Diffusion XL v1.0' },
  { value: 'v1-5-pruned.safetensors', label: 'Stable Diffusion v1.5' },
  { value: 'anything_v5.0.safetensors', label: 'Anything v5.0 (SD 1.5 Base)' },
  { value: 'dreamshaper_7.0.safetensors', label: 'Dreamshaper v7.0 (SD 1.5 Base)' },
  { value: 'realistic_vision_5.0.safetensors', label: 'Realistic Vision v5.0 (SD 1.5 Base)' },
  { value: 'venice_xl.safetensors', label: 'Venice XL' },
]

const samplerOptions = [
  { value: 'euler', label: 'Euler' },
  { value: 'euler_ancestral', label: 'Euler Ancestral' },
  { value: 'heun', label: 'Heun' },
  { value: 'dpm_2', label: 'DPM 2' },
  { value: 'dpm_2_ancestral', label: 'DPM 2 Ancestral' },
  { value: 'dpm_fast', label: 'DPM Fast' },
  { value: 'dpm_adaptive', label: 'DPM Adaptive' },
  { value: 'ddim', label: 'DDIM' },
  { value: 'lms', label: 'LMS' }
];

const schedulerOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'karras', label: 'Karras' },
  { value: 'exponential', label: 'Exponential' },
  { value: 'simple', label: 'Simple' },
  { value: 'ddim_uniform', label: 'DDIM Uniform' }
];

export default function ExperimentParameters({ experimentParameters, runNumber, runExperiment }: ExperimentParametersProps) {
   // blur on enter 
  const [runName, setRunName] = useState<string>("");

  const [models, setModels] = useState<string[]>([]);
  const [seeds, setSeeds] = useState<string>("");
  const [stepValues, setStepValues] = useState<string>("");
  const [cfgs, setCfgs] = useState<string>("");
  const [denoises, setDenoises] = useState<string>("");
  const [widths, setWidths] = useState<string>("");
  const [heights, setHeights] = useState<string>("");
  const [samplers, setSamplers] = useState<string[]>([]);
  const [schedulers, setSchedulers] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);

  const [numPromptsInput, setNumPromptsInput] = useState<number>(1);

  const [modelOptions, setModelOptions] = useState<{ value: string, label: string }[]>([]);

  const onRunClick = async () => {
    const parameters = {...experimentParameters};
    parameters.models = models;
    parameters.seeds = seeds.split(',').map((s) => parseInt(s));
    parameters.steps = stepValues.split(',').map((s) => parseInt(s));
    parameters.cfgs = cfgs.split(',').map((s) => parseFloat(s));
    parameters.denoises = denoises.split(',').map((s) => parseFloat(s));
    parameters.widths = widths.split(',').map((s) => parseInt(s));
    parameters.heights = heights.split(',').map((s) => parseInt(s));
    parameters.samplers = samplers;
    parameters.schedulers = schedulers;
    parameters.prompts = prompts;
    runExperiment(runName, parameters);
  }

  useEffect(() => {
    setRunName(`Run #${runNumber}`);
    setModels(experimentParameters.models);
    setSeeds(experimentParameters.seeds.join(', '));
    setStepValues(experimentParameters.steps.join(', '));
    setCfgs(experimentParameters.cfgs.join(', '));
    setDenoises(experimentParameters.denoises.join(', '));
    setWidths(experimentParameters.widths.join(', '));
    setHeights(experimentParameters.heights.join(', '));
    setSamplers(experimentParameters.samplers);
    setSchedulers(experimentParameters.schedulers);
    setPrompts(experimentParameters.prompts);

    const fetchModels = async () => {
      const models = await listModels();
      models.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
      setModelOptions(models.map((model: Model) => ({value: model.model_id, label: model.name})));
    }
    fetchModels();
  }, [experimentParameters]);

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <Edit2Icon height={20}/>
        <input type="text" className="text-3xl font-bold tracking-tight border-2 border-transparent hover:border-1 hover:border-black rounded-sm p-2" value={runName} onChange={(e) => setRunName(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') (e.target as HTMLInputElement).blur()}} onClick={(e) => (e.target as HTMLInputElement).select()}/>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Models</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Select isMulti options={modelOptions} value={models.map(model_id => {return {value: model_id, label: modelOptions.find((option) => option.value === model_id)?.label}})} onChange={(options) => setModels(options.map((option) => option.value))}/>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
          <h2 className="text-sm tracking-tight pl-4 mt-1">(comma separated)</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-4 gap-4">
            {/* Seeds */}
            <div className="flex flex-col">
              <label className="block text-sm">
                <span className="font-mono bg-gray-800 text-white p-1 rounded">Seeds</span>
              </label>
              <input type="text" value={seeds} onChange={(e) => setSeeds(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Steps */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Step Values</span></label>
              <input type="text" value={stepValues} onChange={(e) => setStepValues(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Guidance Scales */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Guidance Scales (CFGs)</span></label>
              <input type="text" value={cfgs} onChange={(e) => setCfgs(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Denoises */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Denoises</span></label>
              <input type="text" value={denoises} onChange={(e) => setDenoises(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Widths */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Widths</span></label>
              <input type="text" value={widths} onChange={(e) => setWidths(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Heights */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Heights</span></label>
              <input type="text" value={heights} onChange={(e) => setHeights(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            {/* Samplers */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Samplers</span></label>
              <Select className="mt-1" isMulti options={samplerOptions} value={samplers.map(sampler => {return {value: sampler, label: samplerOptions.find((option) => option.value === sampler)?.label}})} onChange={(options) => setSamplers(options.map((option) => option.value))}/>
            </div>
            {/* Schedulers */}
            <div>
              <label className="block text-sm"><span className="font-mono bg-gray-800 text-white p-1 rounded">Schedulers</span></label>
              <Select className="mt-1" isMulti options={schedulerOptions} value={schedulers.map(scheduler => {return {value: scheduler, label: schedulerOptions.find((option) => option.value === scheduler)?.label}})} onChange={(options) => setSchedulers(options.map((option) => option.value))}/>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Prompts</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-4 gap-4">
            {
              prompts.map((prompt, index) => (
                <div key={index}>
                  <label className="block text-sm flex items-center space-x-4">
                    <span className="font-mono bg-gray-800 text-white p-1 rounded">Prompt {index + 1}</span>
                    <Trash2Icon height={20} onClick={() => setPrompts(prompts.filter((p, i) => i !== index))} className="cursor-pointer"/>
                  </label>
                  <input type="text" value={prompt} onChange={(e) => setPrompts(prompts.map((p, i) => i === index ? e.target.value : p))} className="mt-1 p-2 w-full border rounded-md" />
                </div>
              ))
            }
          </div>
          <div className="flex items-end space-x-2 my-4 h-8">
              <input className="border border-black h-full px-2 w-[60px] rounded" placeholder="1" type="number" value={numPromptsInput} onChange={(e) => setNumPromptsInput(parseInt(e.target.value))}/>
              <Button className="h-full" onClick={() => setPrompts(prompts.concat(Array.from({ length: numPromptsInput }, () => "")))}>+ Add Prompts</Button>
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white px-10" onClick={onRunClick}>Run Experiment</Button>
        </div>
      </div>
    </div>
  );
}
