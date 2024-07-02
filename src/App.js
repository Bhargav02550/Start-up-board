import logo from './logo.svg';
import './App.css';
import Post from './Pages/Post';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Navbar/>
      <Post />
    </>
  );
}

export default App;
