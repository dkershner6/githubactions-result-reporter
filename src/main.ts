import { error } from '@actions/core';
import getAllInputs from './tasks/getAllInputs';
import sendStatus from './tasks/sendStatus';

async function run(): Promise<void> {
    try {
        const inputs = getAllInputs();
        await sendStatus(inputs);
    } catch (err) {
        error(err.message);
    }
}

run();
