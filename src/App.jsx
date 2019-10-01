import React, { Component } from 'react'
import Axios from 'axios'

export class App extends Component {
  
  state={
    daftarGambar:[],
    filename:''
  }

  renderTable=()=>{
    let hasil = this.state.daftarGambar.map((item)=>{
      return(
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.image}</td>
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
    Axios.post(
      'http://localhost:9000/uploadimage'
    )
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
                  <th>Gambar</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
            </table>
            
          </div>
          <div className='card-footer'>
          <div className="row">
            <div className="col-8">
                <input className='form-control' onChange={(e)=>{this.setState({filename:e.target.value})}} placeholder='Type image name here . . .' type="text"/>
              </div>
              <div className="col-4">
                <input className="d-none" type="file" ref="fileUpload" />
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
