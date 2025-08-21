import type * as React from "react"

interface EmailTemplateProps {
  fullName: string
  email: string
  company: string
  phone?: string
  website?: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ fullName, email, company, phone, website }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ backgroundColor: "#2563eb", padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "white", margin: "0", fontSize: "24px" }}>🚀 Novo Cadastro - AdTracker</h1>
    </div>

    <div style={{ padding: "30px", backgroundColor: "#f8fafc" }}>
      <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>Nova solicitação de teste grátis</h2>

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ color: "#2563eb", marginTop: "0" }}>Dados do Cliente:</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#374151" }}>Nome Completo:</td>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>{fullName}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#374151" }}>Email:</td>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>{email}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#374151" }}>Empresa:</td>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>{company}</td>
            </tr>
            {phone && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#374151" }}>Telefone:</td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>{phone}</td>
              </tr>
            )}
            {website && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#374151" }}>Website:</td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  <a href={website} style={{ color: "#2563eb" }}>
                    {website}
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: "#dbeafe", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <p style={{ margin: "0", color: "#1e40af", fontSize: "14px" }}>
          <strong>📅 Data/Hora:</strong> {new Date().toLocaleString("pt-BR")}
        </p>
      </div>

      <div style={{ backgroundColor: "#fef3c7", padding: "15px", borderRadius: "8px" }}>
        <p style={{ margin: "0", color: "#92400e", fontSize: "14px" }}>
          <strong>⚡ Ação Recomendada:</strong> Entre em contato em até 1 hora para maximizar a conversão!
        </p>
      </div>
    </div>

    <div style={{ backgroundColor: "#1e293b", padding: "20px", textAlign: "center" }}>
      <p style={{ color: "#94a3b8", margin: "0", fontSize: "12px" }}>
        Este email foi enviado automaticamente pelo sistema AdTracker
      </p>
    </div>
  </div>
)
