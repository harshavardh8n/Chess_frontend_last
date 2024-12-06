import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Game from "./screens/Game";
import Landing from "./screens/Landing";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Landing/>}/>
      <Route path="/game" element= {<Game/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App