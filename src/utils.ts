import * as core from '@actions/core';
import * as context from './context';

const akReg = /^[a-zA-Z0-9]{10,30}$/;
const skReg = /^[a-zA-Z0-9]{30,50}$/;
const regionReg = /^[a-z]{2}-[a-z]+-[1-9]$/;

/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    if (!checkAkSk(inputs.accessKey, inputs.secretKey)) {
        core.setFailed('ak or sk is not correct.');
        return false;
    }
    if (!checkRegion(inputs.region)) {
        core.setFailed('region is not correct.');
        return false;
    }
    if (inputs.commandList.length > 0) {
        inputs.commandList.forEach((command: string) => {
            if (!checkCommand(command)) {
                core.setFailed(`your command is not correct.`);
                return false;
            }
        });
    }
    return true;
}

/**
 * 检查ak/sk是否合法
 * @param ak
 * @param sk
 * @returns
 */
export function checkAkSk(ak: string, sk: string): boolean {
    return akReg.test(ak) && skReg.test(sk);
}

/**
 * 检查region格式是否合法
 * @returns
 */
export function checkRegion(region: string): boolean {
    return regionReg.test(region);
}

/**
 * 判断字符串是否为空
 * @param parameter
 * @returns
 */
export function checkParameterIsNull(parameter: string): boolean {
    return parameter === '' || parameter.trim().length === 0;
}

/**
 * 判断操作命令是否合法
 * @param command
 * @returns
 */
export function checkCommand(command: string): boolean {
    if (checkParameterIsNull(command)) {
        core.info(`command should not be empty.`);
        return false;
    }
    if (!command.startsWith('hcloud')) {
        core.info('command should start with "hcloud", please check your command.');
        return false;
    }
    return true;
}
