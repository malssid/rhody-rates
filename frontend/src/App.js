import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./CustomRoutes/PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            
          </QueryClientProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
