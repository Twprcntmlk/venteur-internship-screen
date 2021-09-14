import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchZip} from '../../store/actions/external_actions'
import './ventuerForm.css';

const VentuerForm = ({setAge,age,setGender,gender,setZip,zip,setSmoking,smoking,county, setCounty}) => {
  const dispatch = useDispatch();
  const zipData = useSelector(state => state.external.zip);

  const [errors, setErrors] = useState("")
  const [policy, setPolicy] = useState(zipData)

  const onHandleSubmit = async (e) => {
    setErrors([])
    e.preventDefault();
    const IntAge = parseInt(age)
    if (!Number.isInteger(IntAge)) {
      setErrors("Age Must be a Number")
    }
    else if (IntAge < 0  || IntAge > 120){
      setErrors("Age Must be a between 0 and 120")
    }
    else if(zip.length > 11){
      setErrors("ZipCode is Invalid")
    }
    dispatch(fetchZip(zip));
  }

  useEffect(()=>{
    if(county){
      const filteredzipData = zipData.filter((el)=>(el.county === county))
      setPolicy(filteredzipData)
      }
    else if (county  & county.length > 1){
        setPolicy(zipData)
        const counties = zipData.map((el, idx)=>(el.county))
        setErrors(`Please Enter One of the Counties ${counties}`)
    }else{
      setPolicy(zipData)
    }
  },[onHandleSubmit])

    return (
        <div className="ventuer-form-main">
          <div className="ventuer-form-container">

            <form onSubmit={onHandleSubmit}>
              <b>Ventuer Customer Form</b>
              <div className="ventuer-form">
                <br/>
                  <input type="text"
                    value={age}
                    onChange={(e) => {setAge(e.target.value)}}
                    placeholder="Age"
                  />
                <br/>
                  <select defaultValue={"Gender"} value={gender} onChange={(e) => {setGender(e.target.value)}}>
                    <option value="Gender" disabled>Gender</option>
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
                  <input type="text"
                    value={county}
                    onChange={(e) => {setCounty(e.target.value)}}
                    placeholder="County"
                  />
                <br/>
                  <select defaultValue={"Smoker?"} value={smoking} onChange={(e) => {setSmoking(e.target.value)}} >
                    <option value="Smoker?" disabled>Smoker?</option>
                    <option value="nonsmoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                <br/>
                <input type="submit" value="Submit" />
                <span className="error">{errors}</span>
              </div>
            </form>
          </div>
          <div className="ventuer-form-container-result">
          {policy && policy.map((el, idx)=>(
            <div className="ventuer-form-container-result-policy" key={idx}>
              <div>Id: {el.id}</div>
              <div>Zip Code: {el.zip}</div>
              <div>City: {el.city}</div>
              <div>State: {el.state}</div>
              <div>County: {el.county}</div>
            </div>
          ))}

          </div>
        </div>
    )
}

export default VentuerForm;
