import mix from 'laravel-mix';
import { ClassComponent } from 'laravel-mix/types/component';
import { ComposerJson, MixEntry, PackageJson } from './types';
import glob from 'glob';
import { isAbsolute, resolve } from 'path';
import { existsSync } from 'fs';
import { Configuration } from 'webpack';


const isProd = mix.inProduction();

export interface Extension {

}

export class Extension implements ClassComponent {
    options: Extension.Options;
    definitions: Extension.PackageDefinition[] = [];

    public name(): string {
        return 'multipackage';
    }

    public register(options: Extension.Options) {
        this.options = {
            ...Extension.defaultOptions,
            ...options,
        };
    }

    public boot() {
        const paths      = this.resolveScanLocations();
        this.definitions = this.findPackageDefinitions(paths);
    }

    public webpackEntry(entry: MixEntry) {
        for ( const definition of this.definitions ) {
            entry.add(definition.name, definition.entry);
        }
    }

    public webpackConfig(config: Configuration): void {

    }

    protected resolveScanLocations() {
        let paths = [];
        for ( let path of this.options.scanLocations ) {
            if ( !isAbsolute(path) ) {
                path = resolve(process.cwd(), path);
            }
            paths.push(...glob.sync(path) || []);
        }
        return paths;
    }

    protected findPackageDefinitions(paths: string[]): Extension.PackageDefinition[] {
        const definitions: Extension.PackageDefinition[] = [];
        for ( let path of paths ) {
            let definition = this.identifyLocation(path);
            if ( !Extension.isPackageDefinition(definition) ) {
                continue;
            }
            definitions.push(definition);
        }
        return definitions;
    }

    protected identifyLocation(path: string): Extension.PackageDefinition | undefined {
        for ( const identifier of this.options.identifiers ) {
            const location: Extension.Location = { path };
            let paths                          = {
                package : resolve(path, 'package.json'),
                composer: resolve(path, 'composer.json'),
            };
            if ( existsSync(paths.package) ) {
                location.package = require(paths.package);
            }
            if ( existsSync(paths.composer) ) {
                location.composer = require(paths.composer);
            }
            let result = identifier(location);
            if ( Extension.isPackageDefinition(result) ) {
                if ( !isAbsolute(result.entry) ) {
                    result.entry = resolve(path, result.entry);
                }
                return result; // return first valid identification of a multi-package
            }
        }
    }
}

export namespace Extension {
    export interface Options {
        scanLocations: string[]
        identifiers?: Identifier[]
        outputPath?: string
    }

    export const defaultOptions: Partial<Options> = {
        identifiers: [identifiers.defaultIdentifier]
    };
    export const isPackageDefinition              = (value: any): value is PackageDefinition => value && typeof value.name === 'string' && typeof value.entry === 'string';

    export interface Location {
        path: string
        composer?: ComposerJson
        package?: PackageJson
    }

    export type IdentifierResult = PackageDefinition | false | undefined | void
    export type Identifier = (location: Location) => IdentifierResult

    export interface PackageDefinition {
        name: string
        entry: string
    }

}

export namespace identifiers {
    export const defaultIdentifier: Extension.Identifier = (location) => {
        if ( location?.package?.multipackage?.name && location.package.multipackage.entry ) {
            return location.package.multipackage;
        }
        if ( location?.composer?.extra?.multipackage?.name && location.composer.extra.multipackage?.entry ) {
            return location.composer.multipackage;
        }
    };
    export const example1: Extension.Identifier = (location) => {
        if(location?.package?.multipackage){
            return {
                name: location.package.name,
                entry: location.package.main
            }
        }
    };
    export const example2: Extension.Identifier = (location) => {
        if(location?.composer?.extra && location?.composer?.extra['my-application-extension'] ){
            return location?.composer?.extra['my-application-extension']
        }
    };
}
