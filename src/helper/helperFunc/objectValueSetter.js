export function objectValueSetter(obj, value) {

    for (let el in obj) {
        obj[el] = value;

    }

    return obj;

}