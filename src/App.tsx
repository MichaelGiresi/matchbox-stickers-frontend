import './App.css';

import Nav from './layouts/nav/Nav';
import HomePageOutput from './layouts/home-page/output/HomePageOutput';
import Footer from './layouts/footer/Footer';
import Hero from './layouts/home-page/hero/Hero';




function App() {
  return (
    <div className='app'>
      <Nav/>
      <HomePageOutput/>
      <Footer/>

    </div>
  );
}

export default App;
