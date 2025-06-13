import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function SolicitarAcessoPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [motivo, setMotivo] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Solicitação enviada:", { nome, email, departamento, motivo })
    alert("Solicitação enviada com sucesso! Você receberá um e-mail quando sua conta for aprovada.")
    navigate("/login")
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo com efeito de desfoque */}
      <div className="absolute inset-0 z-0">
        <img src="../public/logos/background.jpg" alt="Fundo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="../public/logos/logo.png" alt="Ginásio Unifor" className="h-auto w-[180px]" />
        </div>

        <div className="bg-white/95 rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-950">Solicitar Acesso</h1>
            <p className="text-gray-600">Preencha o formulário para solicitar acesso ao sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium text-blue-950">
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-950">
                E-mail Institucional
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

            <div className="space-y-2">
              <label htmlFor="departamento" className="block text-sm font-medium text-blue-950">
                Departamento
              </label>
              <select
                id="departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Selecione seu departamento
                </option>
                <option value="educacao-fisica">Educação Física</option>
                <option value="esportes">Coordenação de Esportes</option>
                <option value="administrativo">Administrativo</option>
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="motivo" className="block text-sm font-medium text-blue-950">
                Motivo da Solicitação
              </label>
              <textarea
                id="motivo"
                placeholder="Descreva brevemente por que você precisa de acesso ao sistema"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar Solicitação
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Voltar para o Login
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-white">© 2025 Ginásio Unifor. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
