const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3008;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsonParser = bodyParser.json();

const connection = mysql.createConnection({
  host: 'localhost', //数据库地址
  port: '3306',//端口号
  user: 'root',//用户名
<<<<<<< HEAD
  password: 'sds0917..',//密码
=======
  // password: 'password',//密码
  // password: '990921',//密码
  // database: 'archindicators'//数据库名称
  password: 'sds091',//密码
>>>>>>> 6c971fd976987adad1fe24cd5eff810e38708f8a
  database: 'archsql'//数据库名称
});
connection.connect();//用参数与数据库进行连接

/**
 * 设置跨域请求
 */
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "nodejs");
  res.header("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Cache-Control", "public, max-age=120");
  next();
});

app.get("/helloworld", (req, res) => {
  console.log("Hello World.");
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 获取企业的数字化得分
function getArchScore(nowData) {
  let useData = {}
  for (let i in nowData[0]) {
    if (!useData.hasOwnProperty(i)) {
      useData[i] = []
    }
  }
  for (let i of nowData) {
    for (let j in useData) {
      if (j == "企业业务中是否运用信息化技术系统") {
        useData[j].push(i[j].replace(/[^a-zA-Z]/g, '').length / 4)
      }
      else if (j == "A、智能塔吊") {
        useData[j].push(i[j].replace(/[^a-zA-Z]/g, '').length / 7)
      }
      else {
        useData[j].push(i[j])
      }
    }
  }
  // 数据标准化处理
  for (let i in useData) {
    if (i == "企业名称" || i == "股票代码" || i == "年份" || i == "成立年份") {
      continue
    }
    let max = Math.max(...useData[i])
    let min = Math.min(...useData[i])
    
    for (let j in useData[i]) {
      if(min == max){
        useData[i][j] = 0
      }
      else{
        useData[i][j] = (useData[i][j] - min) / (max - min)
      }
    }
  }
  // 定义标准化
  for (let i in useData) {
    if (i == "企业名称" || i == "股票代码" || i == "年份" || i == "成立年份") {
      continue
    }
    let sum = 0
    for (let j of useData[i]) {
      sum += j
    }
    for (let j in useData[i]) {
      if(sum == 0){
        useData[i][j] = 0
      }
      else{
        useData[i][j] = useData[i][j] / sum
      }
    }
  }

  // 信息效用值
  let dUseData = {}
  for (let i in useData) {
    if (i == "企业名称" || i == "股票代码" || i == "年份" || i == "成立年份") {
      continue
    }
    let sum = 0
    for (let j of useData[i]) {
      sum += j
    }
    if(sum == 0){
      dUseData[i] = 1
    }
    else{
      dUseData[i] = (1 - sum * Math.log(sum) / Math.log(useData[i].length))
    }
  }
  // 指标评价权重  
  let sumD = 0
  for (let i in dUseData) {
    sumD += dUseData[i]
  }
  for (let i in dUseData) {
    dUseData[i] /= sumD
  }

  return [useData, dUseData]

  // let finalData = {}
  // for (let i in useData["企业名称"]) {
  //   let nowEnterpriseName = useData["企业名称"][i]
  //   finalData[nowEnterpriseName] = 0
  //   for (let j in useData) {
  //     if (j == "企业名称" || j == "股票代码" || j == "年份" || j == "成立年份") {
  //       continue
  //     }
  //     finalData[nowEnterpriseName] += useData[j][i] * dUseData[j] * 100
  //   }
  // }
  // return finalData
}

// 获取每个企业的数字化得分
app.post("/getArchScore", jsonParser, (req, res) => {
  const industry = req.body.industry
  let sql = `select * from ${industry}_property`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    let useData = {}
    for (let i of result) {
      if (!useData.hasOwnProperty(i["年份"])) {
        useData[i["年份"]] = []
      }
      useData[i["年份"]].push(i)
    }
    let finalData = {}
    for (let i in useData) {
      finalData[i] = getArchScore(useData[i])
    }
    res.send(finalData)
    res.end()
  })
})



/////////////第一屏检索栏
//指标检索
app.post("/firstArchIndustry", jsonParser, (req, res) => {
  const industry = req.body.industry
  let sql = `select * from ${industry}_structure`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str)
    res.end()
  })
})

//地区检索
app.post("/firstArchMap", jsonParser, (req, res) => {
  const date = req.body.date
  const industry = req.body.industry
  let sql = `select * from ${industry}_enterprise where 企业名称 in (select 企业名称 from  ${industry}_property where 年份 = ${date})`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    // console.log(str);
    res.send(str)
    res.end()
  })
})


// 企业名单
app.post("/firstArchList", jsonParser, (req, res) => {
  const industry = req.body.industry
  let sql = `select * from ${industry}_enterprise`;

  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    // console.log(str);
    res.send(str)
    res.end()
  })
})

// 企业数字化程度排名
app.post("/firstArchRank", jsonParser, (req, res) => {
  const region = req.body.region
  const date = req.body.date
  const industry = req.body.industry
  let useRegion = "("
  for (let i of region) {
    useRegion += '"' + i + '" ,'
  }
  useRegion = useRegion.slice(0, useRegion.length - 1) + ")"
  let sql = `select * from ${industry}_property where 企业名称 in (select 企业名称 from ${industry}_enterprise where 地区 in ${useRegion} or 省份 in ${useRegion} )and 年份 = ${date}`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str)
    res.end()
  })
});


/////////////第二屏检索栏
//企业检索
app.post("/secondEnterprise", jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = 'select distinct 企业名称 from ' + industry + '_property';
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str)
    res.end()
  })
});

// 指标值查询
app.post("/secondProperty", jsonParser, (req, res) => {
  const industry = req.body.industry;
  const indicator = req.body.indicator;
  const nowEnterprise = req.body.nowEnterprise
  let useEnterprise = "("
  for (let i of nowEnterprise) {
    useEnterprise += '"' + i + '" ,'
  }
  useEnterprise = useEnterprise.slice(0, useEnterprise.length - 1) + ")"

  let sql = `select 企业名称, ${indicator}, 年份 from ${industry}_property where 企业名称 in ${useEnterprise}`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str)
    res.end()
  })
});

// 词频查询
app.post("/secondWord", jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = `select 单词, ${industry}频数 from wordfrequency`;
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str)
    res.end()
  })
});


/////////////第三屏检索栏


// 企业数字化程度散点图
app.post("/thirdEPPos", jsonParser, (req, res) => {
  const industry = req.body.industry
  //查询某个行业的所有企业。
  let sql = 'select * from ' + industry + '_property';
  let str = '';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]：', err.message);
    }
    str = JSON.stringify(result);
    res.send(str);
    res.end()
  })
});
