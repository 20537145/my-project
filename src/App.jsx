
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './style/App.css'
import './style/list.css'
import './style/dropDown.css'

import NavLayout from './Pages/NavLayout';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Search from './components/Search';
import Profile from './Pages/Profile';
import Login from './Pages/auth/Login';
import ProductCreate from './components/ProductCreateComponent';
import AllProductsComponent from './components/AllProductsComponent';
import ProductIdShop from './components/ProductIdShop';
import WishList from './components/WishList';
import Cart from './components/Cart';
import UserInfo from './Pages/userInfo';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavLayout />}>
      <Route index element={<HomePage />} />
      <Route path='about' element={<About />} />
      <Route path='search' element={<Search />} />
      <Route path='profile'  >
        <Route index element={<UserInfo />}/>
      <Route path='me' element={<Profile />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='wishlist' element={<WishList />} />
      <Route path='cart' element={<Cart />} />
      <Route path='products'>
        <Route index element={<AllProductsComponent />} />
        <Route path='create' element={<ProductCreate />} />
        <Route path=':productId' element={<ProductIdShop />} />
      </Route>
    </Route>
  )
);
function App() {

  return <RouterProvider router={router}/>
}

export default App;
