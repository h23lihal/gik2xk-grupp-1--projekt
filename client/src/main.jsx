import React from 'react'; // Importerar React för att använda JSX och skapa komponenter
import ReactDOM from 'react-dom/client'; // Importerar ReactDOM för att rendera React-komponenter i DOM
import App from './App.jsx'; // Importerar huvudkomponenten (App) som innehåller layout och struktur
import ProductEdit from './views/ProductEdit.jsx'; // Importerar komponenten för att redigera produkter
import ProductDetail from './views/ProductDetail.jsx'; // Importerar komponenten för att visa detaljer om en produkt
import Home from './views/Home.jsx'; // Importerar startsidan (hem) komponenten
import Products from './views/Products.jsx'; // Importerar komponenten som visar en lista med produkter
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importerar router-komponenter från react-router-dom för routing

// Skapar en router med en uppsättning av rutter
const router = createBrowserRouter([
  {
    path: '/', // Huvudvägen för appen
    element: <App />, // Huvudkomponenten som renderas för alla sidor
    children: [ // Definierar barnrutter för applikationen (dvs. undersidor under App-komponenten)
      {
        path: '/', // Vägen för startsidan
        element: <Home /> // Renderar Home-komponenten för root-vägen
      },
      {
        path: '/products', // Vägen för att visa en lista med produkter
        element: <Products /> // Renderar Products-komponenten
      },
      {
        path: '/products/new', // Vägen för att skapa en ny produkt
        element: <ProductEdit /> // Renderar ProductEdit-komponenten för att lägga till ny produkt
      },
      {
        path: '/products/:id', // Vägen för att visa detaljer om en specifik produkt baserat på produktens ID
        element: <ProductDetail /> // Renderar ProductDetail-komponenten för att visa produktens detaljer
      },
      {
        path: '/products/:id/edit', // Vägen för att redigera en befintlig produkt baserat på produktens ID
        element: <ProductEdit /> // Renderar ProductEdit-komponenten för att redigera en produkt
      },
    ]
  }
]);

// Renderar applikationen med hjälp av ReactDOM och RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Aktiverar strikt läge för att fånga potentiella problem under utveckling */}
    <RouterProvider router={router} /> {/* Skickar in den skapade routern i RouterProvider */}
  </React.StrictMode>
);