import "./styles/main.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { HomePage } from "./pages/HomePage/HomePage";
import { Favorites } from "./pages/Favourites/Favourites";
import { AddDrinks } from "./pages/AddDrinks/AddDrinks";
import { DrinksPage } from "./pages/DrinksPage/DrinksPage";
import { MyDrinks } from "./pages/MyDrinks/MyDrinks";
import { DrinkDetailsPage } from "./pages/DrinkDetailsPage/DrinkDetailsPage";

import { Routes, Route, Navigate } from "react-router-dom";

import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { LoginForm } from "./pages/WelcomePage/components/LoginForm";
import { RegisterForm } from "./pages/WelcomePage/components/RegisterForm";
import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";

import { PrivateRoute } from "./routes/PrivateRoute";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.get("http://localhost:5000/api/user/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error(
          "The token is invalid or there is a server error:",
          error,
        );
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />

      <Route element={<AuthLayout />}>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<RegisterForm />} />
      </Route>

      <Route
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <MainLayout setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        }>
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add-drink" element={<AddDrinks />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/my-drinks" element={<MyDrinks />} />
        <Route path="/drinks/:id" element={<DrinkDetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
