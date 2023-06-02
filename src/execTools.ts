import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function execCommand(commandLine: string, args?: string[]): Promise<boolean> {
    try {
        const execResult = await exec.getExecOutput(commandLine, args, {
            ignoreReturnCode: false,
        });
        if (execResult.exitCode !== 0 && execResult.stderr.length > 0) {
            core.info(execResult.stderr);
            return false;
        }
        return execResult.exitCode === 0;
    } catch (error) {
        core.info(`Exec command failed, because: ${error}`);
        return false;
    }
}

export async function getExecResult(commandLine: string, args?: string[]): Promise<string> {
    try {
        const execResult = await exec.getExecOutput(commandLine, args, {
            ignoreReturnCode: false,
        });
        if (execResult.exitCode !== 0) {
            return execResult.stderr;
        } else {
            return execResult.stdout;
        }
    } catch (error) {
        return '';
    }
}
