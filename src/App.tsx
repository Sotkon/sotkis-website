import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Platform } from './pages/Platform';
import { Paylt } from './pages/Paylt';
import { Access } from './pages/Access';
import { Level } from './pages/Level';
import { DRS } from './pages/DRS';
import { Contact } from './pages/Contact';
import { Trash4Goods } from './pages/Trash4Goods';
import { MobileApp } from './pages/MobileApp';

function App() {
  return (
    <Routes>
      {/* Redirect root to /home */}
      <Route index element={<Navigate to="/home" replace />} />

      {/* Main site with layout */}
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="mobile-app" element={<MobileApp />} />
        <Route path="access" element={<Access />} />
        <Route path="level" element={<Level />} />
        <Route path="drs" element={<DRS />} />
        <Route path="P(L)ayt" element={<Paylt />} />
        <Route path="contact" element={<Contact />} />
        <Route path="trash4goods" element={<Trash4Goods />} />
      </Route>
    </Routes>
  );
}

export default App;
