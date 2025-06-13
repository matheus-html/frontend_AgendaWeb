// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { SchedulerProvider } from "@/contexts/SchedulerContext";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import Index from "./pages/Index";
// import Settings from "./pages/Settings";
// import NotFound from "./pages/NotFound";
// import LoginPage from "./pages/LoginPage";
// import RecuperarSenha from "./pages/Recuperar-Senha";
// import SolicitarAcesso from "./pages/Solicitar-Acesso";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" replace />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/recuperarsenha" element={<RecuperarSenha />} />
//             <Route path="/solicitaracesso" element={<SolicitarAcesso />} />
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <SchedulerProvider>
//                     <Index />
//                   </SchedulerProvider>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <ProtectedRoute>
//                   <SchedulerProvider>
//                     <Settings />
//                   </SchedulerProvider>
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SchedulerProvider } from "@/contexts/SchedulerContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RecuperarSenha from "./pages/Recuperar-Senha";
import SolicitarAcesso from "./pages/Solicitar-Acesso";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SchedulerProvider>
                    <Index />
                  </SchedulerProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recuperarsenha" element={<RecuperarSenha />} />
            <Route path="/solicitaracesso" element={<SolicitarAcesso />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <SchedulerProvider>
                    <Index />
                  </SchedulerProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SchedulerProvider>
                    <Settings />
                  </SchedulerProvider>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
