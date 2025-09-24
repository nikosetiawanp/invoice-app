import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";

import { InvoicesPage } from "./pages/InvoicesPage";
import { InvoiceDetailPage } from "./pages/InvoiceDetailPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <main className="flex flex-col lg:flex-row w-screen h-screen bg-11">
      <Sidebar />
      <div className="flex justify-center w-full h-full py-8 pt-[104px] px-6 md:py-12 md:pt-[128px] lg:py-16 lg:pl-[124px]">
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/invoices/" element={<InvoicesPage />} />
            <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </main>
  );
}

export default App;
