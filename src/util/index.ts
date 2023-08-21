const hightLight = (el: any, binding: any) => {
    const match = binding.value;
    const reg = new RegExp(match, "g");
    const txt = binding.arg;
    let str = "";
    if (txt) {
        str = txt.replace(reg, `<span style="color:red">${match}</span>`);
    } else {
        str = "";
    }
    el.innerHTML = str;
};
export default class A {
    constructor() {}
    demo(app: any): void {
        app.directive("demo", {
            beforeMount(el: any, binding: any) {
                hightLight(el, binding);
            },
            mounted(el: any, binding: any) {
                // console.log("2");
                hightLight(el, binding);
            },
            updated(el: any, binding: any) {
                // console.log("4");
                hightLight(el, binding);
            },
        });
    }
}
