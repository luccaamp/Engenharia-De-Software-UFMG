/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Principal from './pages/Principal'; // Importar a página Principal
//import Disciplinas from './pages/Disciplinas';
import Estatisticas from './pages/Estatisticas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} /> 
        <Route path="/estatisticas" element={<Estatisticas />} />
      </Routes>
    </Router>
  );
}

export default App;

*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Disciplinas from './pages/Disciplinas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Layout com navbar (rotas aninhadas) */}
          <Route path="/principal" element={<Principal />}>
          <Route path="disciplinas" element={<Disciplinas />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
