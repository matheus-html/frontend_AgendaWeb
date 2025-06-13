
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SchedulerProvider } from "@/contexts/SchedulerContext";

const Settings: React.FC = () => {
  return (
    <SchedulerProvider>
      <Layout>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Configurações</h1>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Administrador</CardTitle>
                <CardDescription>
                  Gerencie a configuração do sistema e acesso de usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Controle de Acesso</h3>
                    <p className="text-muted-foreground">
                      Este sistema é restrito apenas a usuários administrativos. Usuários comuns não podem visualizar ou interagir com o sistema de agendamento.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Informações do Sistema</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Versão</div>
                      <div>1.0.0</div>
                      <div className="text-muted-foreground">Última Atualização</div>
                      <div>06 de Maio de 2025</div>
                      <div className="text-muted-foreground">Administrador</div>
                      <div>Administrador do Sistema</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </SchedulerProvider>
  );
};

export default Settings;
