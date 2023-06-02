import * as core from '@actions/core';
import * as context from './context';
import * as tools from './execTools';
import * as install from './install';
import * as utils from './utils';

export async function run() {
    const inputs: context.Inputs = context.getInputs();

    // 如果参数输入有问题，终止操作
    if (!utils.checkInputs(inputs)) {
        return;
    }

    // 检查并在尝试当前环境安装KooCLI
    const isInstallSuccess = await install.installCLIOnSystem();
    if (!isInstallSuccess) {
        core.setFailed('can not install KooCLI on your system.');
        return;
    }

    // 配置默认KooCLI
    const isConfigSuccess = await install.configureKooCLI(inputs.accessKey, inputs.secretKey, inputs?.region);

    // 若配置成功且传入命令，执行命令
    if (isConfigSuccess) {
        if (inputs.commandList.length > 0) {
            for (const command of inputs.commandList) {
                await tools.execCommand(command);
            }
        }
    } else {
        core.setFailed('configure failed.');
        return;
    }
}

run();
