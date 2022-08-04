import './App.css';

// router
import { Routes, Route } from "react-router-dom";

// 引入自定义组件
import Layout from "./components/layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route key="layout" path="/" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
