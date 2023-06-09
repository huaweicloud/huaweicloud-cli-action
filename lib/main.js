"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
const tools = __importStar(require("./execTools"));
const install = __importStar(require("./install"));
const utils = __importStar(require("./utils"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = context.getInputs();
        // 如果参数输入有问题，终止操作
        if (!utils.checkInputs(inputs)) {
            return;
        }
        // 检查并在尝试当前环境安装KooCLI
        const isInstallSuccess = yield install.installCLIOnSystem();
        if (!isInstallSuccess) {
            core.setFailed('can not install KooCLI on your system.');
            return;
        }
        // 配置默认KooCLI
        const isConfigSuccess = yield install.configureKooCLI(inputs.accessKey, inputs.secretKey, inputs === null || inputs === void 0 ? void 0 : inputs.region);
        // 若配置成功且传入命令，执行命令
        if (isConfigSuccess) {
            if (inputs.commandList.length > 0) {
                for (const command of inputs.commandList) {
                    yield tools.execCommand(command);
                }
            }
        }
        else {
            core.setFailed('configure failed.');
            return;
        }
    });
}
exports.run = run;
run();
//# sourceMappingURL=main.js.map