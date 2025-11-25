import "./index.css";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './components/routes';
// import { StateAndHandlerProvider } from './context/stateAndHandler';
// import './styles/global.css';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
// root.render(
//     <StateAndHandlerProvider>
//         <RouterProvider router={router} />
//     </StateAndHandlerProvider>
// );
