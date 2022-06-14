import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <div className='App'>
                <AuthProvider>
                    <AppProvider>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </AppProvider>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
