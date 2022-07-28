import { get, post } from "./http.js";


export function helloworld() {
  return get("/helloworld");
}


// 获取视图的初始数据：node信息改为json文件
export function getInitialSds(type, industry, id) {
  return post("/getInitialSds", {
    type: type,
    industry: industry,
    id: id,
  });
}


