
import { walk, observer } from '../utils/index'



export default class Observer {
    constructor(obj, setterCallback, getterCallback) {
        if (typeof obj !== "object")
            throw new TypeError('Type "Object" required!');
        walk(obj, (key, value) => observer(
            this, key, value,
            setterCallback,
            getterCallback
        ));
    }

    static from = (obj, setterCallback, getterCallback) => {
        return new Observer(
            obj,
            setterCallback,
            getterCallback
        )
    };

    static toString = () => {
        return `Observer ${this}`
    };
}
