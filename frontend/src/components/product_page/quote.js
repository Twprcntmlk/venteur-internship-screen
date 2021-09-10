import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VentuerForm from './ventuer_form';
import ProductList from './product_list';

const Quote = ({el}) => {
//   const dispatch = useDispatch();
//   const [age, setAge] = useState()
//   const [gender, setGender] = useState()
//   const [zip, setZip] = useState()
//   const [smoking, setSmoking] = useState()
//   console.log(smoking)
//   const currentUser = useSelector(state => state.session.user);
//   const zipData = useSelector(state => state.external.zip);

    return (
        <div>
            <div>{el.id}</div>
            <div>{el.zipCountyId}</div>
            <div>{el.carrierName}</div>
            <div>{el.term}</div>
            <div>{el.minBenefitAmount}</div>
            <div>{el.maxBenefitAmount}</div>
            <div>{el.annualPremiumRate}</div>
        </div>
    )
}

export default Quote ;
