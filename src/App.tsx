import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";

import { InvoicesPage } from "./pages/InvoicesPage";
import { InvoiceDetailPage } from "./pages/InvoiceDetailPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <main className="flex flex-col lg:flex-row w-screen min-h-screen h-auto bg-11 dark:bg-12 scrollbar-hide">
      <Sidebar />
      <div className="flex justify-center w-full h-auto py-8 pb-26 md:pb-12 pt-[104px] px-6 md:py-12 md:pt-[128px] lg:py-16 lg:pl-[124px]">
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
