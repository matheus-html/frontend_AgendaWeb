import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import { SchedulerProvider } from "@/contexts/SchedulerContext";



const Index: React.FC = () => {
  return (
    <SchedulerProvider>
      <Layout>
        <div className="container mx-auto px-0 md:px-4">
          <h1 className="text-2xl font-bold mb-4 text-scheduler-blue-dark px-4 md:px-0 mt-4">Ginásio Unifor</h1>
          <Dashboard />
        </div>
      </Layout>
    </SchedulerProvider>
  );
};

export default Index;
