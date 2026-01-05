import { createRoot } from 'react-dom/client';
import App from './App';


/**
 * Entry point of the React application.
 * This file is responsible for attaching the React tree
 * to the DOM.
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = createRoot(container);
root.render(<App />);
