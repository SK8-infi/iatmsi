import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DynamicPage from './pages/DynamicPage';
import { pageRegistry } from './data/pageRegistry';
import ScrollToTop from './components/layout/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* Dynamically register all pages from the registry */}
          {pageRegistry.map(page => (
            <Route key={page.id} path={page.path} element={<DynamicPage pageId={page.id} />} />
          ))}

          {/* Backward compatibility: old call-for-papers URLs */}
          <Route path="/call-for-papers/guidelines" element={<Navigate to="/call-for-papers/paper-submission" replace />} />
          <Route path="/call-for-papers/camera-ready" element={<Navigate to="/call-for-papers/paper-submission" replace />} />
          <Route path="/paper-submission" element={<Navigate to="/call-for-papers/paper-submission" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
