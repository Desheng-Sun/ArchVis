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
export function firstArchIndustry(industry) {
  return post("/firstArchIndustry", {
    industry: industry,
  })

}

export function firstArchMap(date) {
  return post("/firstArchMap", {
    date: date
  })
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
export function secondIndicators(industry) {
  return post("/secondIndicators", {
    industry: industry
  });
}

export function secondEnterprise(industry) {
  return post("/secondEnterprise", {
    industry: industry
  });
}

export function secondProperty(industry, enterprise, indicator) {
  return post("/secondProperty", {
    industry: industry,
    enterprise: enterprise,
    indicator: indicator
  });
}

export function secondExplain(industry, indicator) {
  return post("/secondExplain", {
    industry: industry,
    indicator: indicator
  });
}


//////// 第三屏检索栏
export function thirdEnterprise(industry){
  return post("/thirdEnterprise",{
    industry:industry
  });
}

export function thirdScoreST(industry, enterprise){
  return post("/thirdScoreST", {
    industry: industry,
    enterprise: enterprise
  });
}

export function thirdScoreND(industry, enterprise){
  return post("/thirdScoreND", {
    industry: industry,
    enterprise: enterprise
  });
}

export function thirdEPPos(industry){
  return post("/thirdEPPos", {
    industry: industry
  });
}

export function thirdEPdight(enterprise, industry) {
  return post("/thirdEPdight", {
    enterprise: enterprise,
    industry: industry
  });
}