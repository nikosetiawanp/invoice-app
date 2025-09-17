import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";

import { InvoicesPage } from "./pages/InvoicesPage";
import { InvoiceDetailPage } from "./pages/InvoiceDetailPage";

function App() {
  return (
    <main className="flex flex-col lg:flex-row w-screen h-screen bg-11">
      <Sidebar />
      <div className="flex justify-center w-full h-full py-8 px-6 md:py-12 lg:py-16">
        <Routes>
          <Route path="/invoices/" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
