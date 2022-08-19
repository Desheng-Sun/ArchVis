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
  // password: '990921',//密码
  // database: 'archindicators'//数据库名称
  password: 'sds091',//密码
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
  let sql = `select 省份, COUNT(*) from constru_region where 企业名称 in (select 企业名称 from constru_property where 年份 = ${date}) group by 省份`;
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
  let useRegion = "("
  for (let i of region) {
    useRegion += '"' + i + '" ,'
  }
  useRegion = useRegion.slice(0, useRegion.length - 1) + ")"
  let sql = `select * from constru_property where 企业名称 in (select 企业名称 from constru_region where 地区 in ${useRegion} or 省份 in ${useRegion} ) and 年份 = ${date}`;
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
  // 暂时没有企业数字化得分数据，用资产负债率代替
  const date = req.body.date
  let useRegion = "("
  for (let i of region) {
    useRegion += '"' + i + '" ,'
  }
  useRegion = useRegion.slice(0, useRegion.length - 1) + ")"
  let sql = `select * from constru_property where 企业名称 in (select 企业名称 from constru_region where 地区 in ${useRegion} or 省份 in ${useRegion} )and 年份 = ${date}`;
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
app.post("/secondProperty",jsonParser, (req, res) => {
  const industry = req.body.industry;
  const enterprise = req.body.enterprise;
  const indicator = req.body.indicator;
  let sql = 'select ' + indicator + ',年份 from ' + industry + '_property where 企业名称 = "' + enterprise + '" order by 年份';
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

// 指标解释查询
app.post("/secondExplain",jsonParser, (req, res) => {
  const industry = req.body.industry;
  const indicator = req.body.indicator;
  let sql = '';
  if (isNaN(indicator)) {
    sql = 'select * from ' + industry + '_structure where indi_name = "' + indicator + '"';
  }
  else {
    sql = 'select * from ' + industry + '_structure where id = "' + indicator + '"';
  }
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





// 企业数字化程度对比
app.post("/thirdEPDight", jsonParser, (req, res) => {
  const name = req.body.name
  // 查询某个企业的数据，根据年份升序排序
  let sql = 'select * from constru_property where 企业名称 = "' + name + '" order by 年份 asc';
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