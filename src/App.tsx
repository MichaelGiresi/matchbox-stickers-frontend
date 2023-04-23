import './App.css';

import Nav from './layouts/nav/Nav';
import HomePageOutput from './layouts/home-page/output/HomePageOutput';
import Footer from './layouts/footer/Footer';
import Hero from './layouts/home-page/hero/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';





function App() {
  return (
    <div className='app'>
      <Router>
      <Nav/>
        <Routes>
          <Route path="/" element={<HomePageOutput/>}/>
          
      

        </Routes>
      {/* <Footer/> */}
      </Router>

    </div>
  );
}

export default App;
