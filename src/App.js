import './App.scss';
import {Container} from "react-bootstrap";
import AppRoutes from "./components/routers/AppRoutes";
import {ToastContainer} from 'react-toastify'
const App = () => {
    return (
        <>
        <div className="app-container">
            <Container>
                <AppRoutes></AppRoutes>
            </Container>
        </div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
        </>


);
}

export default App;
