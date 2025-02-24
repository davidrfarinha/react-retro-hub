import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { useDataContext } from "./Components/DataContextProvider";
import { assetsLoader } from "./utils/helperFunctions";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Search from "./Pages/Search"
import ResultsPage, { loader as resultsLoader } from "./Pages/ResultsPage";
import DetailLayout from "./Pages/DetailLayout";
import Contacts from "./Pages/Contacts";
import DetailOverview from "./Pages/DetailOverview";
import DetailInfo from "./Pages/DetailInfo";
import DetailRatings from "./Pages/DetailRatings"
import DetailScreenshots from "./Pages/DetailScreenshots";
import NotFound from "./Pages/NotFound";

export default function App() {
    const { allResults, handleSetAllResults } = useDataContext();
    const completeResultsLoaderFunction = () => {
        return ({ request, params }) => {
            return resultsLoader({ request, params, allResults, handleSetAllResults });
        }
    }

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} loader={assetsLoader} />
            <Route path="search" element={<Search />} loader={assetsLoader} />
            <Route
                path="search/results/:pageNumber"
                element={<ResultsPage />}
                loader={completeResultsLoaderFunction()}
            />
            <Route
                path="search/results/:pageNumber/:slug/"
                element={<DetailLayout />}
            >
                <Route index element={<DetailOverview />} />
                <Route path="game-info" element={<DetailInfo />} />
                <Route path="ratings" element={<DetailRatings />} />
                <Route path="screenshots" element={<DetailScreenshots />} />
            </Route>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    ));

    return (
        <RouterProvider router={router} />
    );
}
