import * as utils from '../src/utils';
import { expect, test } from '@jest/globals';

// 检查ak/sk
describe('test ak/sk', () => {
    const testCase = [
        {
            description: 'right case',
            ak: 'X***************A',
            sk: '2*************************b',
            result: true,
        },
        {
            description: 'wrong case',
            ak: '*****Ak',
            sk: '****sadwqerr**',
            result: false,
        },
    ];
    testCase.forEach((item) => {
        const { description, ak, sk, result } = item;
        test(`${description},判断结果：${result}`, () => {
            expect(utils.checkAkSk(ak, sk)).toBe(result);
        });
    });
});

// 检查字符串是否为空
test('test checkParameterIsNull', () => {
    expect(utils.checkParameterIsNull('aa')).toBeFalsy();
    expect(utils.checkParameterIsNull('')).toBeTruthy();
});

// 判断操作命令列表是否为空
test('test checkParameterIsNull', () => {
    expect(utils.checkCommand('hcloud version')).toBeTruthy();
    expect(utils.checkCommand('node -v')).toBeFalsy();
    expect(utils.checkCommand('')).toBeFalsy();
});

// 检查region参数是否合法
test('test region', () => {
    expect(utils.checkRegion('cn-north-1')).toBeTruthy();
    expect(utils.checkRegion('cnnorth-4')).toBeFalsy();
    expect(utils.checkRegion('cn1-north-4')).toBeFalsy();
});
