
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import NavLayout from './Pages/NavLayout';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Shop from './Pages/Shop';
import Search from './components/Search';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<NavLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='search' element={<Search/>}/>
    </Route>
))
function App() {
  
  return <RouterProvider router={router}/>
}

export default App;
