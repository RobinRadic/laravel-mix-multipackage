"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
const laravel_mix_1 = __importDefault(require("laravel-mix"));
const Extension_1 = require("./Extension");
Object.defineProperty(exports, "Extension", { enumerable: true, get: function () { return Extension_1.Extension; } });
__exportStar(require("./types"), exports);
const extension = new Extension_1.Extension();
laravel_mix_1.default.extend(extension.name(), extension);
exports.default = Extension_1.Extension;
//# sourceMappingURL=index.js.map