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
  password: 'root',//密码
  // password: '990921',//密码
  database: 'archindicators'//数据库名称
  // password: 'sds091',//密码
  // database: 'archsql'//数据库名称
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


// 获取每个企业的数字化得分

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
  let sql = `select 省份, COUNT(*) from ${industry}_enterprise where 企业名称 in (select 企业名称 from  ${industry}_property where 年份 = ${date}) group by 省份`;
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
  const region = req.body.region
  const date = req.body.date
  const industry = req.body.industry
  // console.log(region)
  let useRegion = "("
  for (let i of region) {
    useRegion += '"' + i + '" ,'
  }
  useRegion = useRegion.slice(0, useRegion.length - 1) + ")"
  let sql = `select * from ${industry}_property where 企业名称 in (select 企业名称 from ${industry}_enterprise where 地区 in ${useRegion} or 省份 in ${useRegion} ) and 年份 = ${date}`;
  
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
    // console.log(result);
    res.send(str)
    res.end()
  })
});


/////////////第二屏检索栏
//指标检索
app.post("/secondIndicators", jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = 'select * from ' + industry + '_structure';
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

// // 指标解释查询
// app.post("/secondExplain",jsonParser, (req, res) => {
//   const industry = req.body.industry;
//   let sql = 'select indi_name,explanation from ' + industry + '_structure';
//   let str = '';
//   connection.query(sql, function (err, result) {
//     if (err) {
//       console.log('[SELECT ERROR]：', err.message);
//     }
//     str = JSON.stringify(result);
//     res.send(str)
//     res.end()
//   })
// });


/////////////第三屏检索栏
//企业检索：检索某个行业的一个企业
app.post("/thirdEnterprise", jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = `select distinct 企业名称 from ${industry}_property`;
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


// 企业一级指标得分检索
app.post("/thirdScoreST", jsonParser, (req, res) => {
  const industry = req.body.industry
  const enterprise = req.body.enterprise
  //查询某个企业的一级指标得分值。用五个三级指标代替。
  let sql = 'select * from ' + industry + '_property where 企业名称 = "' + enterprise + '" ';
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

// 企业二级指标得分检索
app.post("/thirdScoreND", jsonParser, (req, res) => {
  const industry = req.body.industry
  const enterprise = req.body.enterprise
  //查询某个企业的一级指标下的二级指标得分值。用三级指标代替。只找2019年。
  let sql = 'select * from ' + industry + '_property where 企业名称 = "' + enterprise + '" ';
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

// 企业数字化程度散点图
app.post("/thirdEPPos", jsonParser, (req, res) => {
  const industry = req.body.industry
  //查询某个行业的所有企业的数字化程度得分。用资产负债率代替。
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

// 企业数字化程度得分检索
app.post("/thirdEPDight", jsonParser, (req, res) => {
  const enterprise = req.body.enterprise
  const industry = req.body.industry
  // 查询某个企业的数据。资产负债率代替。
  let sql = 'select * from ' + industry + '_property where 企业名称 = "' + enterprise + '"';
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