"use strict";
const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.js"); //db에서 불러와주기!!

module.exports = () => {
    router.get('/gyunggi', async(req,res) => {
        try{
            Shop.find({$and: [{address:/경기/}, {name:{$ne:"물뛴다"}}]}, function(err, result) {
                console.log(result);
                res.render('./shops/gyunggi.ejs', {data: result});
            });
        } catch(err) {
            console.log(err);
        }
    });

    router.get('/seoul', async(req,res) => {
        try{
            Shop.find({address:/서울/}, function(err, result) {
                res.render('../views/shops/seoul.ejs', {data: result});
            });
        }catch(err){
            console.log(err);
        }
    });

    router.get("/busan", async (req, res) => {
      try {
        Shop.find({ address: /부산/ }, function (err, result) {
          res.render("./shops/busan.ejs", { data: result });
        });
      } catch (err) {
        console.log(err);
      }
    });

    router.get("/chungcheong", async (req, res) => {
      try {
        Shop.find({ address: {$or: [/충남/, /충북/] }}, function (err, result) {
          res.render("./shops/chungcheong.ejs", { data: result });
        });
      } catch (err) {
        console.log(err);
      }
    });

    router.get("/gyeongsang", async (req, res) => {
      try {
        Shop.find({ address: {$or: [/경북/, /경남/] }}, function (err, result) {
          res.render("./shops/gyeongsang.ejs", { data: result });
        });
      } catch (err) {
        console.log(err);
      }
    });

    router.get("/incheon", async (req, res) => {
      try {
        Shop.find({ address: /인천/ }, function (err, result) {
          res.render("./shops/incheon.ejs", { data: result });
        });
      } catch (err) {
        console.log(err);
      }
    });

   router.get("/jeju", async (req, res) => {
     try {
       Shop.find({ address: /제주/ }, function (err, result) {
         res.render("./shops/jeju.ejs", { data: result });
       });
     } catch (err) {
       console.log(err);
     }
   });

   router.get("/jeolla", async (req, res) => {
     try {
       Shop.find({ address: /전라/ }, function (err, result) {
         res.render("./shops/jeolla.ejs", { data: result });
       });
     } catch (err) {
       console.log(err);
     }
   });

   router.get("/shop", async(req, res) => {
    try{
      Shop.find({},function (err, result) {
        res.render("./shops/shop.ejs", {data : result});
      });
    } catch (err) {
      console.log(err);
    }
   });

   router.get("/menu", async(req, res) => {
    try{
            let { title } = req.query;
            // 실제 값 
            let findAll = await Shop.find(); // 전체 다 출력!
            // console.log(findAll); // [{}, {}, {}, {}]
            let resultArr = findAll.filter((ele) => {
                return ele.menu.includes(title) === true;
            })
            // 속성값만 찾아오기...!!
            let property = await Shop.findOne().select('title address menu');
            let pro = Object.keys(property.toJSON());
            console.log(resultArr);
            // 이제 찾아줬으면 page! 
            // let resultRender = await res.status(200).render('./shops/shopMenu.ejs',{
            //     isLogined : isLogined(req.user),
            //     property : pro,
            //     menu : resultArr,
            // });
    } catch(err) {
      console.log(err);
    }
   });

    return router;
}