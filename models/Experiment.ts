type Experiment = {
    experiment_id: string;
    name: string;
    cells: ExperimentCell[];
    run_ids: string[];
    owner_id: string;
    last_edited: string;
}

type ExperimentRun = {
    run_id: string;
    name: string;
    parameters: ExperimentParameters;
    date: string;
}

type ExperimentParameters = {
    models: string[];
    prompts: string[];
    seeds: number[];
    steps: number[];
    cfgs: number[];
    denoises: number[];
    widths: number[];
    heights: number[];
    samplers: string[];
    schedulers: string[];
}

const experimentParametersDefault: ExperimentParameters = {
    models: [],
    prompts: ['A photo of a cat'],
    seeds: [1],
    steps: [30],
    cfgs: [8],
    denoises: [1],
    widths: [1024],
    heights: [1024],
    samplers: ['euler'],
    schedulers: ['normal']
}

type ExperimentParametersFixed = { // represents indexes
    models: number;
    prompts: number;
    seeds: number;
    steps: number;
    cfgs: number;
    denoises: number;
    widths: number;
    heights: number;
    samplers: number;
    schedulers: number;
}

type ExperimentCell =  {
    type: "GridSlice" | "Markdown";
}

type GridSliceCell = ExperimentCell & {
    run_id: string;
    fixed_parameters: ExperimentParametersFixed;
    x_axis: string;
    y_axis: string;
}

type MarkdownCell = ExperimentCell & {
    content: string;
}

export { experimentParametersDefault };
export type { Experiment, ExperimentRun, ExperimentParameters, ExperimentParametersFixed, ExperimentCell, GridSliceCell, MarkdownCell };
