import logo from './svg/github.svg';
import './css/App.css';
import GitUserRoute from './pages/GitUserRoute';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GitUserRoute />
      </header>
      <Footer />
    </div>
  );
}

export default App;
