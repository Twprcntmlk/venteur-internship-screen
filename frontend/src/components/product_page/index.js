import React, {useState} from 'react';
import VentuerForm from './ventuer_form';
import ProductList from './product_list';
import './index.css';

const ProductPage = () => {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState()
  const [zip, setZip] = useState("")
  const [county, setCounty] = useState("")
  const [smoking, setSmoking] = useState()

    return (
        <div>
          <VentuerForm setAge={setAge} age={age} setGender={setGender} gender={gender} setZip={setZip} zip={zip} setSmoking={setSmoking} smoking={smoking} county={county} setCounty={setCounty}/>
          <ProductList age={age} gender={gender} smoking={smoking} county={county}/>
        </div>
    )
}

export default ProductPage;
