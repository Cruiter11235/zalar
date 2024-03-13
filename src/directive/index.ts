import { type App, isRef, unref, DirectiveBinding } from "vue";
import { isEvent } from "../utils";
//防抖
function throttle(fn: any, delay: any) {
  let timer: any = null;
  return function (this: any) {
    if (timer) return;
    let that = this;
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(that, args);
      timer = null;
    }, delay);
  };
}
//防抖
function debounce(this: any, fn: any, delay: number) {
  let timeout: any;
  return function (this: any) {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export default {
  install(app: App) {
    app.directive(
      "throttle",
      (el: HTMLElement, bind: DirectiveBinding<DirectiveArgs>) => {
        console.log("挂载throttle指令");
        let { arg, modifiers, value, oldValue } = bind;
        console.log(arg);
        if (arg && isEvent(arg)) {
          console.log("ok");
          const { callback, delay } = unref(value);
          el.addEventListener(arg, throttle(callback, delay));
        }
      }
    );

    app.directive(
      "debounce",
      (el: HTMLElement, bind: DirectiveBinding<DirectiveArgs>) => {
        let { arg, modifiers, value, oldValue } = bind;
        if (arg && isEvent(arg)) {
          const { callback, delay } = unref(value);
          el.addEventListener(arg, debounce(callback, delay));
        }
      }
    );
  },
};
