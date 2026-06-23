import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import axios from "axios";

import { HomePage } from "./pages/HomePage/HomePage";
import { Favorites } from "./pages/Favourites/Favorites";
import { AddDrinks } from "./pages/AddDrinks/AddDrinks";
import { DrinksPage } from "./pages/DrinksPage/DrinksPage";
import { MyDrinks } from "./pages/MyDrinks/MyDrinks";
import { DrinkDetailsPage } from "./pages/DrinkDetailsPage/DrinkDetailsPage";

import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { LoginForm } from "./pages/WelcomePage/components/LoginForm";
import { RegisterForm } from "./pages/WelcomePage/components/RegisterForm";

import { AuthLayout } from "./layouts/AuthLayout/AuthLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Loader } from "./components/Loader/Loader";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  const isFetching = useIsFetching();

  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      try {
        return await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/current`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        throw error;
      }
    },
    enabled: !!localStorage.getItem("token"),
    retry: false,
  });
  return (
    <>
      {isFetching > 0 && <Loader />}

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
    </>
  );
}

export default App;
