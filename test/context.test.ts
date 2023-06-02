import * as context from '../src/context';
import * as core from '@actions/core';

test('mock context getInputs ', async () => {
    jest.spyOn(core, 'getInput').mockReturnValue('install');
    expect(context.getInputs().region).toBe('install');
});
