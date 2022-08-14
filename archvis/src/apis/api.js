import { get, post } from "./http.js";


export function helloworld() {
  return get("/helloworld");
}


// 获取视图的初始数据：node信息改为json文件
export function firstIndicatorsSt() {
  return post("/firstIndicatorsSt");
}


export function firstArchRank(region) {
  return post("/firstArchRank", {
    region : region
  });
}
