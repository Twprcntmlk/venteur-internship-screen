import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Quote from "./quote"
import {fetchQuote} from '../../store/actions/external_actions'

import './productList.css';

const ProductList = ({age,gender,smoking,county, policy}) => {
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
        county,
    ))


  },[policy])

 const onHandleSubmit = async (e) => {
    setErrors([])
    e.preventDefault();
    const IntBenefit = parseInt(benefitAmount)
    if (!Number.isInteger(IntBenefit)) {
      setErrors("Benefit Amount Must be a Number")
    }
    else if(IntBenefit < 0 || IntBenefit > 1000000){
      setErrors("Benefit Amount Within Policy Amount")
    }
    const filteredSearch = quoteData.filter((el)=>el.term.includes(term) && el.minBenefitAmount <= IntBenefit && el.maxBenefitAmount >= IntBenefit)
    setFilteredQuotes(filteredSearch)

  }

    return (
        <div className="ProductList_Containers_Main">
        <div className="divider"></div>
          <div className="ProductList_Containers">
            <form onSubmit={onHandleSubmit}>
                <div>Pick Policy Term</div>
                <select defaultValue={'PolicyTerm'} value={term} onChange={(e) => {setTerm(e.target.value)}}>Policy Term
                    <option value="PolicyTerm" disabled >Policy Term</option>
                    <option value="Years10">10 Years</option>
                    <option value="Years20">20 Years</option>
                    <option value="Years30">30 Years</option>
                    <option value="wholelife">Whole Life</option>
                </select>
                <br/>

                <div>Select Benefit Amount</div>
                <input type="number" value={benefitAmount} onChange={(e) => {setBenefitAmount(e.target.value)}} placeholder="BenefitAmount"></input>
                <br/>
                <input type="submit" value="Submit" />
                <span className="error">{errors}</span>
            </form>
          </div>

          <div className="filteredQuotes">
            {filteredQuotes && filteredQuotes.map((el, idx)=>(
            <Quote key={idx} el={el} age={age} gender={gender} smoking={smoking} benefitAmount={benefitAmount}/>
            ))}
          </div>
      </div>
    )
}

export default ProductList;
