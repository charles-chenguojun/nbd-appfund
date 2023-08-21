type Constructor<T> = {
    new (...args: any[]): T;
    instance?: T;
};
function factorySingleClass<T>(C: Constructor<T>): T {
    if (!C.instance) {
        C.instance = new C();
    }
    return C.instance;
}

export default factorySingleClass;
