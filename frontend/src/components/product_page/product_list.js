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
import Quote from "./quote"
import fetchZip from '../../store/actions/external_actions'
import {fetchQuote} from '../../store/actions/external_actions'
import fetchEnroll from '../../store/actions/external_actions'



const ProductList = ({age,gender,smoking}) => {
  const dispatch = useDispatch();
  const zipData = useSelector(state => state.external.zip);
  const quoteData = useSelector(state => state.external.quote);
  const [filteredQuotes, setFilteredQuotes] = useState(quoteData)
  const[benefitAmount, setBenefitAmount] = useState(0)
  const[term, setTerm] = useState()
  const [errors, setErrors] = useState([])
  useEffect(()=>{
    setFilteredQuotes(quoteData)

  },[quoteData, zipData])

  useEffect(()=>{
    dispatch(fetchQuote(
        zipData[0]?.id,
        age,
        gender,
        smoking,
    ))
  },[zipData])

 const onHandleSubmit = async (e) => {
    setErrors([])
    e.preventDefault();
    const IntBenefit = parseInt(benefitAmount)
    if (!Number.isInteger(IntBenefit)) {
      setErrors([...errors,"Benefit Amount Must be a Number"])
    }
    console.log(quoteData)
    const filteredSearch = quoteData.filter((el)=>el.term.includes(term) && el.minBenefitAmount <= IntBenefit && el.maxBenefitAmount >= IntBenefit)
    setFilteredQuotes(filteredSearch)


  }
// term: 'Years20',
// minBenefitAmount: 0,
// maxBenefitAmount: 100000,
// annualPremiumRate: 24.61


//   const handleSubmit = (e) => {
//     e.preventDefault();

//   }

//   const update = (e) => {
//     // setText(e.target.value)
//   }


    // const updateTerm = (e) => {
    //     setCardname(e.target.value);
    //     const filteredSearch = quoteData.filter((el)=>el.api_name.toLowerCase().includes(e.target.value.toLowerCase()))
    //     setUsercollectionfiltered(filteredSearch)
    // }

    // const updateBenefit = (e) => {
    //     setCardname(e.target.value);
    //     const filteredSearch = quoteData.filter((el)=>el.api_name.toLowerCase().includes(e.target.value.toLowerCase()))
    //     setUsercollectionfiltered(filteredSearch)
    // }
    return (
        <div>
            <div>
                <form onSubmit={onHandleSubmit}>
                    <select value={term} onChange={(e) => {setTerm(e.target.value)}}>
                        <option value="Policy Term" disabled selected>Policy Term</option>
                        <option value="Years10">10 Years</option>
                        <option value="Years20">20 Years</option>
                        <option value="Years30">30 Years</option>
                        <option value="wholelife">Whole Life</option>
                    </select>
                    <br/>
                    <input type="number"
                        value={benefitAmount}
                        onChange={(e) => {setBenefitAmount(e.target.value)}}
                        placeholder="BenefitAmount"
                    />
                    <br/>
                    <input type="submit" value="Submit" />
                    {errors}
                </form>
            </div>

                {filteredQuotes && filteredQuotes.map((el)=>(
              <>
                <Quote el={el}/>
              </>
          ))}

        </div>
    )
}

export default ProductList;
