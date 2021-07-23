"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifiers = exports.Extension = void 0;
const laravel_mix_1 = __importDefault(require("laravel-mix"));
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const fs_1 = require("fs");
const isProd = laravel_mix_1.default.inProduction();
class Extension {
    constructor() {
        this.definitions = [];
    }
    name() {
        return 'multipackage';
    }
    register(options) {
        this.options = Object.assign(Object.assign({}, Extension.defaultOptions), options);
    }
    boot() {
        const paths = this.resolveScanLocations();
        this.definitions = this.findPackageDefinitions(paths);
    }
    webpackEntry(entry) {
        for (const definition of this.definitions) {
            entry.add(definition.name, definition.entry);
        }
    }
    webpackConfig(config) {
    }
    resolveScanLocations() {
        let paths = [];
        for (let path of this.options.scanLocations) {
            if (!path_1.isAbsolute(path)) {
                path = path_1.resolve(process.cwd(), path);
            }
            paths.push(...glob_1.default.sync(path) || []);
        }
        return paths;
    }
    findPackageDefinitions(paths) {
        const definitions = [];
        for (let path of paths) {
            let definition = this.identifyLocation(path);
            if (!Extension.isPackageDefinition(definition)) {
                continue;
            }
            definitions.push(definition);
        }
        return definitions;
    }
    identifyLocation(path) {
        for (const identifier of this.options.identifiers) {
            const location = { path };
            let paths = {
                package: path_1.resolve(path, 'package.json'),
                composer: path_1.resolve(path, 'composer.json'),
            };
            if (fs_1.existsSync(paths.package)) {
                location.package = require(paths.package);
            }
            if (fs_1.existsSync(paths.composer)) {
                location.composer = require(paths.composer);
            }
            let result = identifier(location);
            if (Extension.isPackageDefinition(result)) {
                if (!path_1.isAbsolute(result.entry)) {
                    result.entry = path_1.resolve(path, result.entry);
                }
                return result; // return first valid identification of a multi-package
            }
        }
    }
}
exports.Extension = Extension;
(function (Extension) {
    Extension.defaultOptions = {
        identifiers: [identifiers.defaultIdentifier]
    };
    Extension.isPackageDefinition = (value) => value && typeof value.name === 'string' && typeof value.entry === 'string';
})(Extension = exports.Extension || (exports.Extension = {}));
var identifiers;
(function (identifiers) {
    identifiers.defaultIdentifier = (location) => {
        var _a, _b, _c, _d, _e, _f;
        if (((_b = (_a = location === null || location === void 0 ? void 0 : location.package) === null || _a === void 0 ? void 0 : _a.multipackage) === null || _b === void 0 ? void 0 : _b.name) && location.package.multipackage.entry) {
            return location.package.multipackage;
        }
        if (((_e = (_d = (_c = location === null || location === void 0 ? void 0 : location.composer) === null || _c === void 0 ? void 0 : _c.extra) === null || _d === void 0 ? void 0 : _d.multipackage) === null || _e === void 0 ? void 0 : _e.name) && ((_f = location.composer.extra.multipackage) === null || _f === void 0 ? void 0 : _f.entry)) {
            return location.composer.multipackage;
        }
    };
    identifiers.example1 = (location) => {
        var _a;
        if ((_a = location === null || location === void 0 ? void 0 : location.package) === null || _a === void 0 ? void 0 : _a.multipackage) {
            return {
                name: location.package.name,
                entry: location.package.main
            };
        }
    };
    identifiers.example2 = (location) => {
        var _a, _b, _c;
        if (((_a = location === null || location === void 0 ? void 0 : location.composer) === null || _a === void 0 ? void 0 : _a.extra) && ((_b = location === null || location === void 0 ? void 0 : location.composer) === null || _b === void 0 ? void 0 : _b.extra['my-application-extension'])) {
            return (_c = location === null || location === void 0 ? void 0 : location.composer) === null || _c === void 0 ? void 0 : _c.extra['my-application-extension'];
        }
    };
})(identifiers = exports.identifiers || (exports.identifiers = {}));
//# sourceMappingURL=Extension.js.map