/*
 * @Author: Jinjun Zhuang Cruiter11235@outlook.com
 * @Date: 2024-03-09 11:57:59
 * @LastEditors: Jinjun Zhuang Cruiter11235@outlook.com
 * @LastEditTime: 2024-03-09 14:59:53
 * @FilePath: \zalar\test\testModuleResolution.test.ts
 * @Description:
 *
 * Copyright (c) 2024 by cruiter11235@outlook.com, All Rights Reserved.
 */
import * as util from "../src/utils";

describe("测试util", () => {
  it("测试数组扁平化", () => {
    const data = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
    expect(util.flat(data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("测试对象扁平化", () => {
    const data = [1, 2, 3, { a: 4, b: 5, c: { d: 6, e: 7, f: 8 } }];
    expect(util.flat(data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
