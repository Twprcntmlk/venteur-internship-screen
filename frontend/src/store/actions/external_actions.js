// src/actions/tweet_actions.js
// import { getTweets, getUserTweets, writeTweet } from '../util/tweet_api_util';

export const RECEIVE_ZIP = "RECEIVE_ZIP";
export const RECEIVE_QUOTE = "RECEIVE_QUOTE";
// export const RECEIVE_ENROLL = "RECEIVE_ENROLL";

export const receiveZip = data => ({
  type: RECEIVE_ZIP,
  data
});

export const receiveQuote = data => ({
  type: RECEIVE_QUOTE,
  data
});

// export const receiveEnroll = data=> ({
//   type: RECEIVE_NEW_TWEET,
//   data
// })

export const fetchZip = (zip) => async (dispatch) => {
  const response = await fetch(`/api/external/zip/${zip}`)
  const data = await response.json();
  dispatch(receiveZip(data))

}

export const fetchQuote= (zipCountyId, age, gender, smoking) => async (dispatch) => {
  if(zipCountyId && age && gender && smoking){
    const response = await fetch('/api/external/quote', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({zipCountyId, age, gender, smoking})
    })
    const data = await response.json();
    dispatch(receiveQuote(data))
  }


};

export const fetchEnroll = (zipCountyId, age, gender, smoker, policyId, benefitAmount) => async (dispatch) => {
    const response = await fetch('/api/external/enroll',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({zipCountyId, age, gender, smoker, policyId, benefitAmount})
  })
  const data = await response.json();
  return data
};
