import * as core from '@actions/core';
import * as cred from './credential';

// Windows的安装路径，下载地址
export const WINDOWS_KOOCLI_PATH = 'C:/windows/hcloud';
export const WINDOWS_KOOCLI_URL =
    'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-windows-amd64.zip';

// Linux和MacOS的KooCLI安装路径
export const LINUX_MACOS_KOOCLI_PATH = '/usr/local/hcloud';

// Linux ARM64 和 AMD64 的安装路径，下载地址和包名
export const LINUX_ARM_KOOCLI_URL =
    'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-linux-arm64.tar.gz';
export const LINUX_ARM_KOOCLI_PACKAGE_NAME = 'huaweicloud-cli-linux-arm64.tar.gz';
export const LINUX_AMD_KOOCLI_URL =
    'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-linux-amd64.tar.gz';
export const LINUX_AMD_KOOCLI_PACKAGE_NAME = 'huaweicloud-cli-linux-amd64.tar.gz';

// MacOS ARM64 和 AMD64 的安装路径下载地址和包名
export const MACOS_ARM_KOOCLI_URL =
    'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-mac-arm64.tar.gz';
export const MACOS_ARM_KOOCLI_PACKAGE_NAME = 'huaweicloud-cli-mac-arm64.tar.gz';
export const MACOS_AMD_KOOCLI_URL =
    'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest/huaweicloud-cli-mac-amd64.tar.gz';
export const MACOS_AMD_KOOCLI_PACKAGE_NAME = 'huaweicloud-cli-mac-amd64.tar.gz';

export interface Inputs {
    accessKey: string;
    secretKey: string;
    region: string;
    commandList: string[];
}

export function getInputs(): Inputs {
    return {
        accessKey: cred.getCredential('access_key', true),
        secretKey: cred.getCredential('secret_key', true),
        region: cred.getCredential('region', false),
        commandList: core.getMultilineInput('command_list', { required: false }),
    };
}
