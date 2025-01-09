import "./App.css";
// import LogInPage from "./pages/LogIn";
import Header from "./shared/header";
import HeaderListing from "./shared/header-listing"; // Your header for listings
import Footer from "./shared/footer";
import PropertyMain from "./pages/propertiesMain";
import AboutUS from "./pages/aboutUs";
import PropertyFilters from "./shared/propertyFilters";
import ListingScreenPage from "./pages/listingScreen";
import PropertyCategoriesPage from "./pages/propertyCategories";
import PropertyImagesSelectionPage from "./pages/propertyImagesSelection";
import AddVideo from "./components/propertyVideoSelection";
import PropertyListingFormPage from "./pages/propertyListingForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Dashboard/SidebarDashboard/SidebarDashboard";
import SuperAdminSidebar from "./SuperAdmin/Dashboard/SidebarDashboard/SidebarDashboard";

import HeaderAdmin from "./Dashboard/HeaderDashboard/HeaderDashboard";
import MyListing from "./Dashboard/MyListing/page";
import FavtListing from "./Dashboard/FavtListing/page";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./SuperAdmin/login";
import UserListing from "./SuperAdmin/Dashboard/userListing/page";
import PropertyListing from "./SuperAdmin/Dashboard/MyListing/page";

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();

  // Define which pages should have HeaderListing instead of Header
  const listingHeaderPages = [
    "/property-listing",
    "/property-categories",
    "/property-images",
    "/property-listing-form",
    "/property-video",
  ];

  // Define which pages should not have Footer
  const noFooterPages = [
    "/property-listing",
    "/property-categories",
    "/property-images",
    "/property-listing-form",
    "/property-video",
  ];

  // Check if the current route matches the ones for which HeaderListing should be used
  const isListingPage = listingHeaderPages.includes(location.pathname);

  // Check if the current route matches the ones for which Footer should be excluded
  const isNoFooterPage = noFooterPages.includes(location.pathname);

  return (
    <Routes>
      {/* Frontend Layout */}
      <Route
        path="/*"
        element={
          <>
            {isListingPage ? <HeaderListing /> : <Header />}{" "}
            {/* Conditional Header */}
            <Routes>
              <Route path="/" element={<PropertyMain />} />
              <Route path="/aboutus" element={<AboutUS />} />
              <Route path="/property-filters" element={<PropertyFilters />} />
              <Route path="/property-listing" element={<ListingScreenPage />} />
              <Route
                path="/property-categories"
                element={<PropertyCategoriesPage />}
              />
              <Route
                path="/property-images"
                element={<PropertyImagesSelectionPage />}
              />
              <Route path="/property-video" element={<AddVideo />} />
              <Route
                path="/property-listing-form"
                element={<PropertyListingFormPage />}
              />
            </Routes>
            {!isNoFooterPage && <Footer />} {/* Conditionally render Footer */}
          </>
        }
      />

      {/* Admin Layout */}
      <Route
        path="/dashboard/*"
        element={
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <HeaderAdmin />
              <main className="p-4 bg-gray-50 min-h-screen">
                <Routes>
                  <Route path="mylisting" element={<MyListing />} />
                  <Route path="favtlisting" element={<FavtListing />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />

      {/* Super Admin */}
      <Route
        path="/super-admin/*"
        element={
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="dashboard/*"
              element={
                <div className="flex h-screen overflow-hidden">
                  <SuperAdminSidebar />
                  <div className="flex-1 flex flex-col">
                    <HeaderAdmin />
                    <main className="p-4 bg-gray-50 min-h-screen">
                      <Routes>
                        <Route path="listing" element={<PropertyListing />} />
                        <Route path="users" element={<UserListing />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
          </Routes>
        }
      />
    </Routes>
  );
}

export default App;
