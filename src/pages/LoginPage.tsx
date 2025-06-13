import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

// Esquema de validação para o formulário de login
const loginSchema = z.object({
  login: z.string().min(1, "O login é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: data.login,
          password: data.password,
        }),
      });

      if (response.ok) {
        const token = await response.text();
        login(token); // Use AuthContext login function
      } else {
        const errorText = await response.text();
        alert(
          response.status === 401
            ? errorText || "Credenciais inválidas. Verifique seu login e senha."
            : `Erro ao realizar login: ${errorText || "Erro desconhecido."}`
        );
        console.error("Erro de login:", response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error("Erro de rede ou na requisição:", error);
      alert("Não foi possível conectar ao servidor. Verifique sua conexão.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="../logos/background.jpg"
          alt="Fundo"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex justify-center mb-6">
          <img
            src="../logos/logo.png"
            alt="Ginásio Unifor"
            className="h-auto w-[180px]"
          />
        </div>

        <Card className="border-0 shadow-lg bg-white/95">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-blue-950">
              Acesso ao Sistema
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Entre com suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login" className="text-blue-950">
                  Login (ou E-mail)
                </Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="seu.login"
                  {...register("login")}
                  className="border-blue-200 focus:border-blue-500"
                />
                {errors.login && (
                  <p className="text-red-500 text-sm">{errors.login.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-blue-950">
                    Senha
                  </Label>
                  <Link
                    to="/recuperarsenha"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="border-blue-200 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">ou</span>
              </div>
            </div>
            <Link
              to="/solicitaracesso"
              className="w-full text-center border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
            >
              Solicitar Acesso
            </Link>
          </CardFooter>
        </Card>

        <p className="mt-4 text-center text-sm text-white">
          © 2025 Ginásio Unifor. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
