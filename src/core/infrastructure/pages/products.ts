import ko from 'knockout'
import page from 'page'
import { Product } from '../../domain/product'
import getProducts from '../../application/getAllProducts'

class ViewModel {
  products: ko.Observable<Product[]>
  loading: ko.Observable<boolean>
  constructor(){
    this.products =  ko.observableArray([])
    this.loading = ko.observable(false)
    this.getProducts()
  }
  async getProducts(){
    this.loading(true)
    const products = await getProducts()
    this.loading(false)
    if(products){
      this.products(products)
    }
  }
  gotoCreate(){
    page('/products/create')
  }
}
ko.components.register('products',{
  template:`
<div class="table-products  mt-4 mb-3 m-auto">
    <div class="d-flex mb-3">
      <h1 class="fw-light flex-grow-1">Lista de Productos</h1> 
      <button type="button" class="btn btn-primary m-auto" data-bind="click:gotoCreate">
        Nuevo <i class="bi bi-plus"></i>
      </button> 
    </div>
    <table class="table table-hover">
        <thead class="table-light">
            <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Código</th>
                <th>Nombre</th>
                <th width="100px">Descripción</th>
                <th>Precio</th>
                <th>Moneda</th>
                <th width="100px">Imágenes</th>
            </tr>
        </thead>
        <tbody data-bind="foreach: products">
            <tr>
                <td data-bind="text: _id" style="max-width: 80px;" class="text-truncate"></td>
                <td data-bind="text: SKU" style="max-width: 80px;" class="text-truncate"></td>
                <td data-bind="text: code" style="max-width: 80px;" class="text-truncate"></td>
                <td data-bind="text: name" style="max-width: 80px;" class="text-truncate"></td>
                <td data-bind="text: description" style="max-width: 100px;" class="text-truncate"></td>
                <td data-bind="text: price" style="max-width: 50px;" class="text-truncate"></td>
                <td data-bind="text: currency" style="max-width: 50px;" class="text-truncate"></td>
                <td style="max-width: 100px;">
                  <div data-bind="attr:{ id: _id }" class="carousel slide">
                    <div data-bind="foreach: pictures" class="carousel-inner">
                      <div class="carousel-item"  data-bind="css:{'active': $index() == 0}">
                        <img data-bind="attr:{ src:$data }" height="60px" width="90px"/>
                      </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bind="attr:{ 'data-bs-target': '#'+_id }" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Anterior</font></font></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bind="attr:{ 'data-bs-target': '#'+_id }" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Próximo</font></font></span>
                    </button>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-center" data-bind="if: loading">
      <div class="spinner-border text-secondary" role="status flex-grow-0">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="alert alert-light text-center" role="alert" data-bind="visible: products().length < 1 && loading() == false ">
      <i class="bi bi-cart-x" style="font-size:48px"></i>
      <p>No hay productos disponibles para mostrar.</p>
    </div>
</div>
<style>
.table-products{
  max-width: 800px !important;
}
</style>
  `,
  viewModel: ViewModel
})