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
// export function firstIndicatorsSt() {
//   return post("/firstIndicatorsSt");
// }



//////// 第一屏检索栏
// 行业检索
export function firstArchIndustry(industry){
  return post("/firstArchIndustry", {
    industry: industry
  })

}

// 企业名单
export function firstArchList(region) {
  return post("/firstArchList", {
    region : region
  })
}

// 企业数字化程度排名
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
// 企业数字化程度对比
export function thirdEPdight(name) {
  return post("/thirdEPdight", {
    name : name
  });
}