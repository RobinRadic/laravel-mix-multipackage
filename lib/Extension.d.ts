import { ClassComponent } from 'laravel-mix/types/component';
import { ComposerJson, MixEntry, PackageJson } from './types';
import { Configuration } from 'webpack';
export interface Extension {
}
export declare class Extension implements ClassComponent {
    options: Extension.Options;
    definitions: Extension.PackageDefinition[];
    name(): string;
    register(options: Extension.Options): void;
    boot(): void;
    webpackEntry(entry: MixEntry): void;
    webpackConfig(config: Configuration): void;
    protected resolveScanLocations(): any[];
    protected findPackageDefinitions(paths: string[]): Extension.PackageDefinition[];
    protected identifyLocation(path: string): Extension.PackageDefinition | undefined;
}
export declare namespace Extension {
    interface Options {
        scanLocations: string[];
        identifiers?: Identifier[];
        outputPath?: string;
    }
    const defaultOptions: Partial<Options>;
    const isPackageDefinition: (value: any) => value is PackageDefinition;
    interface Location {
        path: string;
        composer?: ComposerJson;
        package?: PackageJson;
    }
    type IdentifierResult = PackageDefinition | false | undefined | void;
    type Identifier = (location: Location) => IdentifierResult;
    interface PackageDefinition {
        name: string;
        entry: string;
    }
}
export declare namespace identifiers {
    const defaultIdentifier: Extension.Identifier;
    const example1: Extension.Identifier;
    const example2: Extension.Identifier;
}
