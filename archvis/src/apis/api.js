import { get, post } from "./http.js";


export function helloworld() {
  return get("/helloworld");
}


// 获取视图的初始数据：node信息改为json文件
export function selectIndicators(industry) {
  return post("/selectIndicators", {
    industry: industry
  });
}


export function firstArchRank(region) {
  return post("/firstArchRank", {
    region : region
  });
}

export function selectEnterprise(industry) {
  return post("/selectEnterprise", {
    industry: industry
  });
}