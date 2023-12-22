import { Experiment, ExperimentParameters, ExperimentRun } from "@/models/Experiment";
import { BASE_URL } from "./base_url";

const EXPERIMENT_BASE_URL = `${BASE_URL}/experiment`;

export async function listExperiments(): Promise<Experiment[]> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/list`, {credentials: "include"});
    const experiments = await response.json();
    return experiments;
}

export async function getExperiment(id: string): Promise<Experiment> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/${id}`, {credentials: "include"});
    const experiment = await response.json();
    return experiment;
}

export async function createExperiment(): Promise<Experiment> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/create`, {credentials: "include", method: "POST"});
    const experiment = await response.json();
    return experiment;
}

export async function saveExperiment(experiment: Experiment): Promise<void> {
    await fetch(`${EXPERIMENT_BASE_URL}/${experiment.experiment_id}/save`, {credentials: "include", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({experiment: experiment})});
}

export async function renameExperiment(experimentId: string, newName: string): Promise<Experiment> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/${experimentId}/rename`, {credentials: "include", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: newName})});
    const experiment = await response.json();
    return await experiment;
}

export async function createExperimentRun(experimentId: string, runName: string, experimentParameters: ExperimentParameters): Promise<ExperimentRun> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/${experimentId}/run/create`, {credentials: "include", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: runName, experiment_parameters: experimentParameters})});
    const run = await response.json();
    return run;
}

export async function getExperimentRun(runId: string): Promise<ExperimentRun> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/run/${runId}`, {credentials: "include"});
    const run = await response.json();
    return run;
}

export async function startExperimentRun(runId: string): Promise<void> {
    const response = await fetch(`${EXPERIMENT_BASE_URL}/run/${runId}/start`, {credentials: "include", method: "POST"});
}
