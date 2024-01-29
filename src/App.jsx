
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './style/App.css'
import './style/list.css'

import NavLayout from './Pages/NavLayout';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Search from './components/Search';
import Profile from './Pages/Profile';
import Login from './Pages/auth/Login';
import ProductCreate from './components/ProductCreateComponent';
import AllProductsComponent from './components/AllProductsComponent';
import ProductIdShop from './components/ProductIdShop';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavLayout />}>
      <Route index element={<HomePage />} />
      <Route path='about' element={<About />} />
      <Route path='search' element={<Search />} />
      <Route path='profile' element={<Profile />} />
      <Route path='login' element={<Login />} />
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
