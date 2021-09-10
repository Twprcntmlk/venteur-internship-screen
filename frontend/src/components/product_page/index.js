import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VentuerForm from './ventuer_form';
import ProductList from './product_list';

const ProductPage = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState()
  const [gender, setGender] = useState()
  const [zip, setZip] = useState()
  const [smoking, setSmoking] = useState()
  console.log(smoking)
  const currentUser = useSelector(state => state.session.user);
  const zipData = useSelector(state => state.external.zip);

    return (
        <div>
          "ProductPage"
          <VentuerForm setAge={setAge} age={age} setGender={setGender} gender={gender} setZip={setZip} zip={zip} setSmoking={setSmoking} smoking={smoking}/>
          <ProductList age={age} gender={gender} smoking={smoking} />
        </div>
    )
}

export default ProductPage;
