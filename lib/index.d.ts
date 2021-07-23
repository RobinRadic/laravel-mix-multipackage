import api from 'laravel-mix';
import { Extension } from './Extension';
export * from './types';
export { Extension, };
export default Extension;
declare global {
    var mix: typeof api & {
        multipackage(options: Extension.Options): import('laravel-mix').Api;
    };
}
declare module 'laravel-mix' {
    interface Api {
        multipackage(options: Extension.Options): Api;
    }
}
