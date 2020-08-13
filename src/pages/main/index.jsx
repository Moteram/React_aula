import React, { Component } from 'react';
import Api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

class Main extends Component {

state = {
  products: [],
  productInfo: {},
  page: 1,
}

//esse metodo é executado assim que o componente é mostrado em tela
  componentDidMount(){
    this.loadProducts();
  }

  loadProducts = async (page = 1) =>{
    const res = await Api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = res.data;

    this.setState({ products: docs, productInfo, page });  
  };

  prevPage = () =>{

    const { page, productInfo } = this.state;

    if(page === 1){
      return
    }

    const pageNumber = page - 1;
    this.loadProducts(pageNumber);

  }
  nextPage = () =>{

    const { page, productInfo} = this.state;
    if(page === productInfo.pages){

      return
    }
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);

  }

render(){

  const {products, page, productInfo} = this.state;

  return(
 <div className="product-list">
   {products.map(produtos=>(
     <article key={produtos._id}>
              <strong>
                {produtos.title}
              </strong>
         <p>{produtos.description}</p>
         <Link to={`/products/${produtos._id}`}>Acessar</Link>
     </article>
   ))}

   <div className="actions">
     <button disabled={page === 1} onClick={this.prevPage}>Anterios</button>
     <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
   </div>

 </div>
  );
}  
}

export default Main;