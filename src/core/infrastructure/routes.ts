import ko from 'knockout'
import page from 'page'

import './pages/signin'
import './pages/products'
import './pages/createProduct'

const outlet = ko.observable('loginPage')

//@ts-ignore
const protectedAuth = (_, next)=>{
  const token = localStorage.getItem('token')
  if (!token) {
    page.redirect('/')
  } else {
    next()
  }
}

//@ts-ignore
const checkAuth = (ctx, next)=>{
  const token = localStorage.getItem('token')
  if (token&&ctx.path == '/') {
    page.redirect('/products')
  } else {
    next()
  }
}

page('/',checkAuth, () => {
  outlet('loginPage')
})

page('/products',protectedAuth, () => {
  outlet('products')
})

page('/products/create', protectedAuth, () => {
  outlet('createProduct')
})


page()


ko.applyBindings({outlet})

