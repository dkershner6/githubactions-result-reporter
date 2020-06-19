import { getInput, error } from '@actions/core';

export interface Inputs {
    triggerResultId: string;
    eventResultId: string;
    statusCode: string;
    statusText: string;
}

const getAllInputs = (): Inputs => {
    const triggerResultId = getInput('trigger_result_id');

    if (!triggerResultId) {
        error('trigger_result_id is a required input, and was not found.');
    }

    const eventResultId = getInput('event_result_id');

    if (!eventResultId) {
        error('event_result_id is a required input, and was not found.');
    }

    const statusCode = getInput('status_code') ?? 'success';
    const statusText = getInput('status_text') ?? 'Success!';

    return { triggerResultId, eventResultId, statusCode, statusText };
};

export default getAllInputs;
