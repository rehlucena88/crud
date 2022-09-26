import { useState } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [number, setNumber] = useState(0)
  const [product, setProduct] = useState('')
  const [productList, setProductList] = useState([])

  const addProduct = () => {
    Axios.post('http://localhost:3002/create', {
      number: number,
      product: product
    }).then(() => {
      alert('Novo Produto Adicionado')
    })
  }

  const showProducts = () => {
    Axios.get('http://localhost:3002/products').then(response => {
      setProductList(response.data)
    })
  }

  const deleteProduct = number => {
    Axios.delete(`http://localhost:3002/delete/${number}`).then(response => {
      alert('Produto Deletado')
      setProductList(
        productList.filter(val => {
          return val.number !== number
        })
      )
    })
  }
  return (
    <div className="App">
      <div className="produtos">
        <label>Numero</label>
        <input
          type="number"
          onChange={event => {
            setNumber(event.target.value)
          }}
        />
        <label>Produto</label>
        <input
          type="text"
          onChange={event => {
            setProduct(event.target.value)
          }}
        />
        <button onClick={addProduct}>Adicionar Produto</button>
      </div>
      <div className="mostrarProdutos">
        <button onClick={showProducts}>Mostrar Produtos</button>
        {productList.map((val, key) => {
          return (
            <div className="onDisplay">
              <h3>ID: {val.number}</h3>
              <h3>Produto: {val.product}</h3>
              <button
                onClick={() => {
                  deleteProduct(val.number)
                }}
              >
                Remover Produto
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
