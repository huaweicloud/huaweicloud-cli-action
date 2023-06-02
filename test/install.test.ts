import * as install from '../src/install';
import { expect, test } from '@jest/globals';

test('checkKooCLIInstall', async () => {
    expect(await install.checkKooCLIInstall()).toBeTruthy;
});

test('updateKooCLI', async () => {
    expect(await install.updateKooCLI()).toBeTruthy;
});
