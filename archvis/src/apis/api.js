import { get, post } from "./http.js";


export function helloworld() {
  return get("/helloworld");
}


// 获取视图的初始数据：node信息改为json文件


// export function firstIndicatorsSt() {
//   return post("/firstIndicatorsSt");
// }



//////// 第一屏检索栏
// 行业检索
export function firstArchIndustry(industry, index) {
  return post("/firstArchIndustry", {
    industry: industry,
    index: index
  })

}

export function firstArchMap() {
  return post("/firstArchMap")
}

// 企业名单
export function firstArchList(region, date) {
  return post("/firstArchList", {
    region: region,
    date: date
  })
}

// 企业数字化程度排名
export function firstArchRank(region, date) {
  return post("/firstArchRank", {
    region: region,
    date: date
  });
}

//////// 第二屏检索栏
export function secondSelectIndicators(industry) {
  return post("/secondSelectIndicators", {
    industry: industry
  });
}

export function selectEnterprise(industry) {
  return post("/selectEnterprise", {
    industry: industry
  });
}

export function selectProperty(industry, enterprise, indicator) {
  return post("/selectProperty", {
    industry: industry,
    enterprise: enterprise,
    indicator: indicator
  });
}


// 企业数字化程度对比
export function thirdEPdight(name) {
  return post("/thirdEPdight", {
    name: name
  });
}