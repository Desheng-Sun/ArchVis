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
  password: '990921',//密码
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
});

app.post("/firstArchRank",jsonParser, (req, res) => {
  const region = req.body.region
  // region = ["西北","东北"]
  let sql = 'select * where region = ' + region + ' from constru_property';
  console.log(region)
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
    console.log(str);
    res.send(str)
    res.end()
  })
});