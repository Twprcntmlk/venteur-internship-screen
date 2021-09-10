const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// const Tweet = require('../../models/Tweet');
// const validateTweetInput = require('../../validation/tweets');
const axios = require('axios');

router.get('/zip/:id', async (req, res) => {
  const zip = req.params.id
  try{
    const result = await axios.get(`http://tech-screen.venteur.co/ZipCounties?zip=${zip}`)
    res.send(result.data)
  }catch (error) {
    console.error(error);
  }
  });


http://tech-screen.venteur.co/


router.post('/quote', async (req, res) => {
  // const { zip, age, gender, smoking} = req.body
  const { zipCountyId, age, gender, smoking} = req.body
  console.log(zipCountyId, age, gender, smoking)
  //{"zipCountyId": string,"age": number,"gender": string,"smoker": string}
  // try{
  // // let payload = {"zipCountyId": "06747","age": 45,"gender": "Male","smoker": "No"};
  // const res= await axios.post('',
  // {
  //   data: {"zipCountyId": "06747","age": 45,"gender": "Male","smoker": "No"}
  // })
  // const data = res.data
  // console.log(data);
  // }catch (error) {
  //   console.error(error);
  // }
  try{
    // const data = {"zipCountyId": "98489ccd-2124-5b47-8d09-686a3ea8583f","age": 45,"gender": "male","smoker": "smoker"}
    const data = {zipCountyId,age,gender,smoking}
    const result = await axios.post(`http://tech-screen.venteur.co/Policies/Quote`, data)
    //"nonsmoker""smoker"
    //"male""female"
    //"years10""years20""years30""wholelife"
    //"zipCountyId": "98489ccd-2124-5b47-8d09-686a3ea8583f","age": 45,"gender": "Male","smoker": "smoker"

    console.log(result.data)
    res.send(result.data)
  }catch (error) {
    console.error(error);
  }
});




router.post('/enroll', async (req, res) => {
  const { zip, age, gender, smoking, policyId, benefitAmount} = req.body
  // {"zipCountyId": string,"age": number,"gender": string,"smoker": string,"policyId": string,"benefitAmount": number}
  // "zipCountyId":"98489ccd-2124-5b47-8d09-686a3ea8583f",
  // "age": 45,
  // "gender": "male",
  // "smoker": "nonsmoker",
  // "policyId":"3d6e36e5-dd46-52b9-9ec5-d2627c5c1ad6",
  // "benefitAmount":(100000/5000)*56.14}
  const data =
  {
  "zipCountyId":zip,
  "age": age,
  "gender": gender,
  "smoker": smoking,
  "policyId":policyId,
  "benefitAmount":benefitAmount
  }
  try{
    const result = await axios.post('http://tech-screen.venteur.co/Policies/Enroll', data)
    console.log(result)
    return result
  }catch (error) {
    console.error(error);
  }
});


  module.exports = router;
