import ko from 'knockout'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import page from 'page'
import { Product } from '../../domain/product'
import addNewProduct from '../../application/addNewProduct'
import { ProductNotCreatedExeption } from '../../domain/exeptions/productNotCreated.exeption'
class ViewModel {
  SKU: ko.Observable<string>
  code: ko.Observable<number | null> 
  name: ko.Observable<string>
  description: ko.Observable<string>
  pictures: ko.ObservableArray<string>
  price: ko.Observable<number | null>
  currency: ko.Observable<string>
  __v: ko.Observable<string>
  pictureUrl: ko.Observable<string>
  constructor(){
      this.SKU = ko.observable('')
      this.code= ko.observable(null)
      this.name= ko.observable('')
      this.description= ko.observable('')
      this.pictures= ko.observableArray<string>([])
      this.price= ko.observable(null)
      this.currency= ko.observable('')
      this.__v= ko.observable('')
      this.pictureUrl = ko.observable('')
  }
  addPicture(){
    const url = this.pictureUrl();
    if (this.pictures().length < 3 && url) {
      this.pictures.push(url)
      this.pictureUrl('')
    }
  }
  async submitForm(){
    const body = new Product({
      SKU: this.SKU(),
      code: this.code(), 
      name: this.name(),
      description:this.description(),
      pictures:this.pictures(), 
      price:this.price(), 
      currency:this.currency(),
      __v:this.__v()
    })
    
    try {
      const data = await addNewProduct(body)
      if(!data) throw new ProductNotCreatedExeption()
      this.showAlert('success','El producto ha sido agregado exitosamente.')
      this.resetForm()
    } catch (error) {
      this.showAlert('error', (error as Error).message)
    }
  }
  resetForm(){
    $('#formProductCreate').trigger('reset')
    this.pictures([])
  }
  showAlert(type:'success' | 'error', message:string){
    let toast:JQuery<HTMLElement> 
    if(type == 'success'){
      toast= $('#successAlert')
    }else{
      toast = $('#errorAlert')
    } 
    toast.find('.toast-body').text(message)
    const alert: bootstrap.Toast = new bootstrap.Toast(toast[0],{
      delay: 2000,
      animation:true
    })
    alert.show()
  }
  gotoBack(){
    page.redirect('/products')
  }
}

ko.components.register('createProduct',{
  template:`
<form id="formProductCreate" class="form-product m-auto " data-bind="submit: submitForm">
      <div class="d-flex mb-3">
        <h1 class="fw-light flex-grow-1">Nuevo Producto</h1> 
        <button type="button" class="btn btn-outline-secondary m-auto" data-bind="click:gotoBack">
          <i class="bi-arrow-left"></i>
          Volver
        </button>
      </div>
      <div class="row mb-3">
        <label for="sku" class="col-sm-2 col-form-label">SKU</label>
        <div class="col-sm-10">
          <input type="text" id="sku" class="form-control" data-bind="value: SKU" placeholder="Ingrese el SKU">
        </div>
      </div>

      <div class="row mb-3">
        <label for="code" class="col-sm-2 col-form-label">Código</label>
        <div class="col-sm-10">
          <input type="number" id="code" class="form-control" data-bind="value: code" placeholder="Ingrese el código">
        </div>
      </div>

      <div class="row mb-3">
        <label for="name" class="col-sm-2 col-form-label">Nombre</label>
        <div class="col-sm-10">
          <input type="text" id="name" class="form-control" data-bind="value: name" placeholder="Ingrese el nombre del producto">
        </div>
      </div>

      <div class="row mb-3">
        <label for="description" class="col-sm-2 col-form-label">Descripción</label>
        <div class="col-sm-10">
          <textarea id="description" class="form-control" data-bind="value: description" rows="3" placeholder="Ingrese la descripción del producto"></textarea>
        </div>
      </div>

      <div class="row mb-3">
        <label for="pictures" class="col-sm-2 col-form-label">Imágenes</label>
        <div class="col-sm-10">
          <div class="d-flex align-items-center">
            <input type="text" id="picture-url" class="form-control" data-bind="value: pictureUrl" placeholder="Ingrese la URL de la imagen" />
            <button type="button" class="btn btn-success ms-2" data-bind="click: addPicture">+</button>
          </div>
          <ul class="list-group list-group-horizontal  mt-2" data-bind="foreach: pictures">
            <li class="list-group-item me-2">
              <img data-bind="attr: { src: $data, alt: 'Imagen', style: 'width: 100px; height: 100px;' }" />
            </li>
          </ul>
        </div>
      </div>

      <div class="row mb-3">
        <label for="price" class="col-sm-2 col-form-label">Precio</label>
        <div class="col-sm-10">
          <input type="number" id="price" class="form-control" data-bind="value:price" placeholder="Ingrese el precio">
        </div>
      </div>

      <div class="row mb-3">
        <label for="currency" class="col-sm-2 col-form-label">Moneda</label>
        <div class="col-sm-10">
          <select id="currency" class="form-select" data-bind="value: currency">
            <option value="" selected disabled>Selecciona una opción</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ARS">ARS</option>
          </select>
        </div>
      </div>

      <div class="row mb-3">
        <label for="v" class="col-sm-2 col-form-label">Versión</label>
        <div class="col-sm-10">
          <input type="text" id="v" class="form-control" data-bind="value: __v" placeholder="Ingrese la versión">
        </div>
      </div>

      <div class="row mb-3">
        <div class="d-flex flex-row-reverse">
          <button type="submit" class="btn btn-primary ms-2">Enviar</button>
          <button data-bind="click: resetForm" class="btn btn-secondary">Reset</button>
        </div>
      </div>
    </form>
    <div class="successAlert">
      <div id="successAlert" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body" />           
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <div class="errorAlert">
      <div id="errorAlert" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body" />           
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <style>
    .form-product{
      max-width: 600px;
      padding: 1rem;
    }
    #errorAlert, #successAlert{
      flex-grow: 0;
      margin: auto;
    }
    .errorAlert, .successAlert{
      position: fixed !important;
      display: flex;
      width: 100% !important;
      top:0;
    }
    </style>
  `,
  viewModel: ViewModel
})