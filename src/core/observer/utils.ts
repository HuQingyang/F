
import Observer from './object';
import ObserverArray from './array';


function walk(obj, fun) {
    if (typeof obj !== 'object')
        throw new TypeError(`Function "walk" require an "object" instead of ${typeof obj}`);
    if (Array.isArray(obj))
        return obj.forEach((item, index) => fun(index, item, obj));
    else
        return Object.keys(obj).forEach(key => fun(key, obj[key], obj));
}

function observer(obj, key, value, getterCallback?, setterCallback?) {
    if (typeof obj !== 'object')
        throw new TypeError(`Function "observer" require an "object" instead of ${typeof obj}`);

    if (Array.isArray(value))
        value = ObserverArray.from(value);
    else if (typeof value === "object")
        value = Observer.from(value);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            getterCallback(obj, key, value);
            return value
        },
        set: newValue => {
            observer(obj, key, newValue);
            setterCallback(obj, key, newValue);
        }
    })
}


const getObjID = function() {
    let id = 0;
    return (() => id ++);
}();


export {
    walk,
    observer,
    getObjID
}