import './App.css';
import { MainPage } from './components/MainPage'; 
import { MainPage2 } from './components/MainPage2'; // Passing object 
import { MainPage3 } from './components/MainPage3'; // Solution for passing object
import { MainPage4 } from './components/MainPage4'; // Passing function
import { MainPage5 } from './components/MainPage5'; // Solution for pasing function
import { MainPage6 } from './components/MainPage6'; // Additional example with non-pure component
import { MainPage7 } from './components/MainPage7'; // Additional example of custom comparison check

function App() {
  return (
    <div className="App">
      <MainPage2 />
    </div>
  );
}

export default App;
