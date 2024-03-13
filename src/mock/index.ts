import Mock from "mockjs";
import { nanoid } from "nanoid";
// 脚手架会通过babel降级语法，js使用需要使用commonjs语法
// const Mock = require('mockjs')
function createNode(name: string, isLeaf: boolean) {
  return {
    name,
    id: nanoid(),
    isLeaf,
  };
}
Mock.mock("http://localhost:8080/mock/test", "get", {
  message: "success",
  data: ["数据1", "数据2", "数据3"],
});
Mock.mock("http://localhost:8080/mock/firstNode", "post", {
  data: [createNode("A", false), createNode("B", false)],
});
Mock.mock("http://localhost:8080/mock/childNode", "post", {
  data: [createNode("a", true), createNode("b", true), createNode("c", true)],
});
