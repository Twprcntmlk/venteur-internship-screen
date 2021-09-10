// // src/components/tweets/tweet_compose_container.js

// import { connect } from 'react-redux';
// import { composeTweet } from '../../store/actions/tweet_actions';
// import TweetCompose from './tweet_compose';

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.session.user,
//     newTweet: state.tweets.new
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     composeTweet: data => dispatch(composeTweet(data))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TweetCompose);

// src/components/tweets/tweet_compose.js

import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchZip} from '../../store/actions/external_actions'
// import {fetchQuote} from '../../store/actions/external_actions'
// import {fetchEnroll} from '../../store/actions/external_actions'


const VentuerForm = ({setAge,age,setGender,gender,setZip,zip,setSmoking,smoking}) => {
  const dispatch = useDispatch();

  // const currentUser = useSelector(state => state.session.user);
  const zipData = useSelector(state => state.external.zip);

  // console.log(currentUser,zipData)

  const [errors, setErrors] = useState([])
  const [policy, setPolicy] = useState(zipData)

  const onHandleSubmit = async (e) => {
    setErrors([])
    e.preventDefault();
    const IntAge = parseInt(age)
    if (!Number.isInteger(IntAge)) {
      setErrors([...errors,"Age Must be a Number"])
    }
    else if (IntAge < 0  || IntAge > 120){
      setErrors([...errors,"Age Must be a between 0 and 120"])
    }
    else if(zip.length > 11){
      setErrors([...errors,"ZipCode is Invalid"])
    }
    dispatch(fetchZip(zip));
  }

  useEffect(()=>{
    setPolicy(zipData)
  },[zipData])

    return (
        <div>
          {/* {currentUser.id} */}
          <div className="ventuer-form-container">
            <form onSubmit={onHandleSubmit}>
              <div className="ventuer-form">
                <br/>
                  <input type="text"
                    value={age}
                    onChange={(e) => {setAge(e.target.value)}}
                    placeholder="Age"
                  />
                <br/>
                  <select value={gender} onChange={(e) => {setGender(e.target.value)}}>
                    <option value="Gender" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                <br/>
                  <input type="text"
                    value={zip}

                    onChange={(e) => {setZip(e.target.value)}}
                    placeholder="Zipcode"
                  />
                <br/>
                  <select value={smoking} onChange={(e) => {setSmoking(e.target.value)}} >
                    <option value="Smoker?" disabled selected>Smoker?</option>
                    <option value="nonsmoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                <br/>
                <input type="submit" value="Submit" />
                {errors}
              </div>
            </form>
          </div>
          <div className="ventuer-form-container-result">
          {policy && policy.map((el)=>(
            <div>
              <div>{el.id}</div>
              <div>{el.zip}</div>
              <div>{el.city}</div>
              <div>{el.state}</div>
              <div>{el.county}</div>
            </div>
          ))}

          </div>
        </div>
    )
}

export default VentuerForm;
