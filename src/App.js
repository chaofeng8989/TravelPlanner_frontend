import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

//布局大概是，header 和 footer，
//然后header里会call navigation，
//然后navigation，route去不同页面，每一个页面都是main
function App() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
      );
  }
export default App;