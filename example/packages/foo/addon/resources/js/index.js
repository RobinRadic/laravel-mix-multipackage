import {App, util} from '@foo/core'


export const superDuperAppPlugin = (App) => {
    const superDuperImportantObject = App.util.merge(merge({a: 'b'}, {b: 'c'}))
    const superDuperImportantString =App.util.ucfirst('superduper');
}


// App.use(superDuperAppPlugin);
