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

router.post('/quote', async (req, res) => {
  const { zipCountyId, age, gender, smoking} = req.body
  try{
    const data = {zipCountyId,age,gender,smoking}
    const result = await axios.post(`http://tech-screen.venteur.co/Policies/Quote`, data)
    //"nonsmoker""smoker"
    //"male""female"
    //"years10""years20""years30""wholelife"
    res.send(result.data)
  }catch (error) {
    console.error(error);
  }
});

router.post('/enroll', async (req, res) => {
  const { zipCountyId, age, gender, smoker, policyId, benefitAmount} = req.body
  // "zipCountyId":"98489ccd-2124-5b47-8d09-686a3ea8583f",
  // "age": 45,
  // "gender": "male",
  // "smoker": "nonsmoker",
  // "policyId":"3d6e36e5-dd46-52b9-9ec5-d2627c5c1ad6",
  // "benefitAmount":(100000/5000)*56.14}**
  const data = {
  "zipCountyId":zipCountyId,
  "age": Number(age),
  "gender": gender,
  "smoker": smoker,
  "policyId":policyId,
  "benefitAmount":parseInt(benefitAmount)
  }
  try{
    const result = await axios.post('http://tech-screen.venteur.co/Policies/Enroll', data)
    res.send(result.data)
  }catch (error) {
    console.error(error);

  }
});

module.exports = router;
