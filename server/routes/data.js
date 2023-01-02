const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { post } = require('.');

//定義connection作為MySQL物件
const connection = mysql.createConnection({
    //自訂的host跟user
    host     : 'localhost',
    user     : 'root',
    //MySQL的密碼
    password : 'test-password',
    //要連接MySQL資料庫名字
    database: 'test'
});

//把moneyaccounting資料放到data
let moneyAccounting
connection.query("select * from moneyaccounting", function (err, rows) {
  if (err) throw err
  moneyAccounting = rows
});

router.get('/',function(req,res){
    res.send(moneyAccounting)
})
router.post('/',function(req,res){
    //本地moneyAccounting
    const newList=req.body
    moneyAccounting.push({
        ...newList,
    })
    //必須轉換成XXXX-XX-XX日期型式 MySQL才能吃到
    let newKeyId=req.body.id
    let newDate=req.body.today
    let newIncome=req.body.income
    let newPay=req.body.pay
    let newObject=req.body.object

    //插入MySQL moneyaccounting表格
    connection.query("insert into moneyaccounting(id,today,income,pay,object) values(?,?,?,?,?)",[newKeyId,newDate,newIncome,newPay,newObject],function(err,data){
        if(err){
            throw err
        }else{
            console.log("post success!")
        }
    })
})
router.delete('/:id',function(req,res){
    let deleteId=req.params.id
    //刪除本地moneyaccounting相符資料
    moneyAccounting.forEach((item,index)=>{
        if(item.id==deleteId){
          moneyAccounting.splice(index,1)
        }
    })
    //刪除MySQL moneyAccounting表格相符資料
    connection.query("delete from moneyaccounting where id=?",[deleteId],function(err,data){
        if(err){
            throw err
        }else{
            console.log(`delete keyId:${deleteId} success!`)
        }
    })
})

module.exports = router;