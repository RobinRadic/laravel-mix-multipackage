import {merge} from 'lodash'

export const util = {
    ucfirst(str){
        return str[0].toUpperCase() + str.toString().slice(1)
    },
    merge(...objects){
        return merge(...objects);
    }
}

export const App = {
    util,
    mount(elementId){
        this.el = document.getElementById(elementId);
        this.el.classList.add('app')
    },
    use(callback){
        callback(this)
    }
}
