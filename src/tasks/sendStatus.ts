import axios from 'axios';
import { error } from '@actions/core';
import { Inputs } from './getAllInputs';

const sendStatus = async (inputs: Inputs): Promise<void> => {
    try {
        const {
            triggerResultId,
            eventResultId,
            statusCode,
            statusText,
        } = inputs;

        await axios.patch(
            `https://githubactions.com/api/trigger_results/${triggerResultId}`,
            {
                reportedResult: {
                    eventResultId,
                    code: statusCode,
                    text: statusText,
                },
            }
        );
    } catch (err) {
        if (err.status === 404) {
            error('Event to update not found');
        } else if (err.status === 400) {
            error(err.text);
        } else {
            error(`Error Response Code: ${err.status}`);
        }
    }
};

export default sendStatus;
