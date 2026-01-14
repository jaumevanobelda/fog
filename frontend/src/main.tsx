import ReactDOM from "react-dom/client";
import './index.css'
import AppRouter from './router/AppRouter.tsx';



ReactDOM.createRoot(document.getElementById("root")!).render(
  AppRouter()
);
