import { HtmlEvent } from "../../types/enum";

export function flat(arr: any) {
  let ans: any[] = [];
  const dfs = (arr: any, tag: boolean) => {
    if (!isArray(arr)) {
      // console.log(arr, isModule(arr));
      if (isObject(arr) && !isModule(arr) && !tag) {
        let keys = Object.keys(arr);
        keys.forEach((key: any) => {
          dfs(arr[key], false);
        });
      } else if (isModule(arr)) {
        let keys = Object.keys(arr);
        keys.forEach((key: any) => {
          dfs(arr[key], true);
        });
      } else {
        ans.push(arr);
      }
    } else {
      arr.forEach((item: any) => {
        dfs(item, false);
      });
    }
  };
  dfs(arr, false);
  return ans;
}
// 根据接口获得所有keys数组,貌似无法实现？
// export function getInterfaceKeys<T>(){
//   const tmp:T;
//   let keys = Object.keys(tmp) as (keyof T)[]
// }
export function isEvent(x: any): boolean {
  return Object.values(HtmlEvent).indexOf(x) !== -1;
}
export function isArray(arr: any): boolean {
  return Array.isArray(arr);
}
export function isObject(x: any) {
  return typeof x === "object";
}
export function isModule(x: Object) {
  // console.log("x " + Object.prototype.toString.call(x));
  return Object.prototype.toString.call(x) === "[object Module]";
}
export function zlog(
  message: string,
  type?: "normal" | "error" | "warn" | undefined
) {
  const zalarMessage = "♕" + message;

  if (type === "error") {
    console.error(zalarMessage);
  } else if (type === "warn") {
    console.warn(zalarMessage);
  } else {
    console.log(zalarMessage);
  }
}
