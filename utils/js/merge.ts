export function merge<O extends object>(Obj: O) {
return <K extends object>(obj2: K) => ({
    ...Obj,
    ...obj2
});
}