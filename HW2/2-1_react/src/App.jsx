import React, { useState } from 'react';
import './App.css';

function App() {
  // 建立一個狀態來記錄選單是否開啟
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切換選單狀態的函式
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-logo">Web_app</div>

        {/* 取代原本的 checkbox，改用 onClick 觸發 */}
        <div 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* 根據 isMenuOpen 的值動態加入 'show' class */}
        <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>首頁</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>服務</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>關於我們</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>聯絡我們</a></li>
        </ul>
      </nav>

      
    </div>
  );
}

export default App;