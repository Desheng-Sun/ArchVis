import './App.css';

// router
import { Routes, Route } from "react-router-dom";

// 引入自定义组件
import Layout from "./components/layout";
import FirstIndicators from './components/firstComponents/indicatorsSt';
import FirstSearchBar from './components/firstComponents/searchBar';
import FirstArchMap from './components/firstComponents/archMap';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route key="layout" path="/" element={<Layout />} />
        <Route key="firstIndicators" path="/firstIndicators" element={<FirstIndicators />} />
        <Route key="firstSearchBar" path="/firstSearchBar" element={<FirstSearchBar />} />
        <Route key="firstArchMap" path="/firstArchMap" element={<FirstArchMap />} />
      </Routes>
    </div>
  );
}

export default App;
