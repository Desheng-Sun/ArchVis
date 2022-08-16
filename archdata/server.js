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
  database: 'archindicators'//数据库名称
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

app.post("/selectIndicators",jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = 'select * from ' + industry + '_structure';

/////////////第一屏检索栏
//行业检索
app.post("/firstArchIndustry", jsonParser,(req, res) => {
  const industry = req.body.industry
  console.log(industry);
  if(industry == "建筑业（施工与设计加总）"){
    // 全选施工行业与设计行业
    let sql = 'select * from constru_property union select * from design_property';
    let str = '';
    connection.query(sql, function(err, result) {
      if(err){
        console.log('[SELECT ERROR]：',err.message);
      }
      str = JSON.stringify(result);
      res.send(str)
      res.end()
    })      
  }
  else {
    if(industry == "施工行业"){
      let sql = 'select * from constru_propertry';
      let str = '';
      connection.query(sql, function(err, result){
        if(err){
          console.log('[SELECT ERROR]：', err.message);
        }
        str = JSON.stringify(result);
        res.send(str)
        res.end()
      })
    }
    else if(industry == "设计行业"){
      let sql = 'select * from design_propertry';
      let str = '';
      connection.query(sql, function(err, result){
        if(err){
          console.log('[SELECT ERROR：', err.message);
        }
        str = JSON.stringify(result);
        res.send(str)
        res.end()
      })
    }
  }
})
//指标检索


//地区检索



// 企业名单
app.post("/firstArchList", jsonParser, (req, res) =>{
  const region = req.body.region
  // console.log(region)
  let sql = 'select * from constru_property where 地区 = "'+ region+'" and 年份="2019" ';
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
app.post("/firstArchRank",jsonParser, (req, res) => {
  const region = req.body.region
  // console.log(region)
  // 暂时没有企业数字化得分数据，用资产负债率代替
  let sql = 'select * from constru_property where 地区 = "'+ region+'" and 年份="2019"  order by 资产负债率 desc';
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

app.post("/selectEnterprise",jsonParser, (req, res) => {
  const industry = req.body.industry;
  let sql = 'select 企业名称 from ' + industry + '_property';
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
app.post("/thirdEPDight",jsonParser, (req, res) => {
  const name = req.body.name
  // 查询某个企业的数据，根据年份升序排序
  let sql = 'select * from constru_property where 企业名称 = "'+ name+'" order by 年份 asc';
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