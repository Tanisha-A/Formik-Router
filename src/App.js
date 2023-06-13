import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Aboutus } from './Aboutus'
import {BrowserRouter} from 'react-router-dom'
import { Home } from './Home'


function App () {
return ( <BrowserRouter>
<Routes>
<Route path='/' element ={<Home/>} ></Route>
<Route path='about' element ={<Aboutus/>}></Route>

</Routes>
</BrowserRouter>
)
}


export default App