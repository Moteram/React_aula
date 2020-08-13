import React, { Component } from 'react';
import Api from '../../services/api';
import {Link} from 'react-router-dom';

import './styles.css';

class Product extends Component{

  state ={

  product:{},

  }
  async componentDidMount(){

    const {id} = this.props.match.params;

    const response = await Api.get(`products/${id}`);

    this.setState({ product: response.data });

  }

  render(){

    const { product } = this.state;

    return(
      <>
      <div className="product-info">
        <h1>{product.title}</h1>
    <p>{product.desciption}</p>

    <p>
    URL: <a href={product.url} target="_blank">{product.url}</a>

    </p>

   

      </div>

      <div className="btnAline">
      <Link to="/">Back</Link>
      </div>
      
      </>
      
      
      
      );
  }

}
export default Product;
