import React, { Component } from 'react'
import Axios from 'axios'

export class App extends Component {
  
  state={
    daftarGambar:[],
    filename:'',
    file:null,
    productprice:null
  }

  componentDidMount() {
    this.getAllData()
  }
  
  getAllData=()=>{
    Axios.get(
      'http://localhost:9000/getall'
    ).then((res)=>{
      this.setState({daftarGambar:res.data})
    }).catch((err)=>{
      console.log(err)
    })
  }

  renderTable=()=>{
    let hasil = this.state.daftarGambar.map((item,key)=>{
      let url =`http://localhost:9000/${item.image}`
      return(
        <tr key={key}>
          <td className='text-center'>{item.id}</td>
          <td className='text-center'>{item.name}</td>
          <td className='text-center'>Rp {item.price}</td>
          <td className='d-flex justify-content-center'><img width='150px' src={url} alt=""/></td>
        </tr>
      )
    })
    if(hasil.length>0){
      return hasil
    }else{
      return(
        <tr>
          <td className='text-center' colSpan='3'>You have no image data</td>
        </tr>
      )
    }
    
  }

  uploadImage=()=>{
    var fd = new FormData()
    fd.append('gambar', this.state.file, this.state.file.name)
    // pakai split
    // fd.append('propgambar',`${this.state.productprice}|-|${this.state.filename}`)
    
    let produk={
      price:this.state.productprice,
      nama:this.state.filename
    }
    produk = JSON.stringify(produk)
    fd.append('propgambar',produk)
    Axios.post(
      'http://localhost:9000/uploadimage',fd
    ).then((res)=>{
      console.log(res);
      this.getAllData()
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  render() {
    return (
      <div className="container p-5">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Image List</h3>
          </div>
          <div className="card-body">
            <table className="table table-dark table-stripped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Gambar</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </table>
            
          </div>
          <div className='card-footer'>
          <div className="row">
            <div className="col-4">
                <input className='form-control' onChange={(e)=>{this.setState({filename:e.target.value})}} placeholder='Product name . . .' type="text"/>
              </div>
            <div className="col-4">
                <input className='form-control' onChange={(e)=>{this.setState({productprice:e.target.value})}} placeholder='Price . . .' type="number" min='0'/>
              </div>
              <div className="col-4">
                <input className="d-none" onChange={(e)=>{this.setState({file:e.target.files[0]})}} type="file" ref="fileUpload" />
                <input
                  className="btn btn-primary btn-block"
                  type="button"
                  value="Select Image"
                  onClick={()=>{this.refs.fileUpload.click()}}
                />
              </div>
              
              
            </div>
            <div className="row mt-3">
              <div className="col-12 mx-auto">
                <input
                  className="btn btn-success btn-block"
                  type="button"
                  value="Upload Image"
                  onClick={this.uploadImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
