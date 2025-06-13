import { useState } from "react"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recuperação solicitada para:", email)
    setEnviado(true)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo com efeito de desfoque */}
      <div className="absolute inset-0 z-0">
        <img
          src="../logos/background.jpg"
          alt="Fundo"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="../logos/logo.png"
            alt="Ginásio Unifor"
            width={180}
            height={60}
            className="h-auto"
          />
        </div>

        <div className="bg-white/95 rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-950">Recuperar Senha</h1>
            <p className="text-gray-600">
              {!enviado
                ? "Informe seu e-mail para receber instruções de recuperação de senha"
                : "Verifique seu e-mail para redefinir sua senha"}
            </p>
          </div>

          {!enviado ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-blue-950">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@unifor.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enviar Instruções
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-center text-gray-700">
                Enviamos um e-mail para <strong>{email}</strong> com instruções para redefinir sua senha. Por favor,
                verifique sua caixa de entrada.
              </p>
              <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p>O link de recuperação expira em 30 minutos.</p>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/login" className="text-blue-600 hover:underline">
              Voltar para o Login
            </a>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-white">© 2025 Ginásio Unifor. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
