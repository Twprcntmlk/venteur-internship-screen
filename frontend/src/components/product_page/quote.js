import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './quote.css';
import {fetchEnroll} from '../../store/actions/external_actions'

const Quote = ({el,age,gender,smoking,benefitAmount}) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState()

    const onEnroll = () =>{
        dispatch(fetchEnroll(el.zipCountyId,age,gender,smoking,el.id,el.minBenefitAmount))
        setConfirm("Confirmed")
        setTimeout(() => {setConfirm("")}, 6000);
    }

    return (
        <div className="Quote_Container_Main">
            <div className="Quote_Container">
                {/* <div>Id: {el.id}</div>
                <div>ZipCode: {el.zipCountyId}</div> */}
                <div>Carrier: {el.carrierName}</div>
                <div>Term: {el.term}</div>
                <div>Minimum Benefit Amount: {el.minBenefitAmount}</div>
                <div>Maximum Benefit Amount: {el.maxBenefitAmount}</div>
                <div>Annual Premium Rate: {el.annualPremiumRate}</div>
                <button onClick={onEnroll}>Choose This Policy</button>&nbsp;&nbsp;<span>{confirm}</span>
            </div>
        </div>
    )
}

export default Quote ;
