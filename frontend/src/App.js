import "./App.css";
import { AuthProvider } from "./AuthProvider";
import Router from "./Router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
