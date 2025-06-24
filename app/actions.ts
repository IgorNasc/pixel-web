"use server"

export async function submitInterestForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const monthlyAdSpend = formData.get("monthlyAdSpend") as string
  const challenges = formData.get("challenges") as string
  const updates = formData.get("updates") as string

  // Simular delay de envio
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Aqui você integraria com seu serviço de email
  // Por exemplo: SendGrid, Resend, Nodemailer, etc.

  const emailData = {
    to: "contato@adtracker.com.br", // Seu email
    subject: "🎯 Novo Interesse - Ad Tracker",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">🚀 Novo Cadastro de Interesse</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Ad Tracker - Analytics Sem Cookies</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Informações do Lead</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3B82F6; margin-top: 0;">👤 Dados Pessoais</h3>
            <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${company || "Não informado"}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #8B5CF6; margin-top: 0;">💰 Informações Comerciais</h3>
            <p><strong>Investimento Mensal em Anúncios:</strong> ${monthlyAdSpend || "Não informado"}</p>
            <p><strong>Desafios Atuais:</strong></p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
              ${challenges || "Não informado"}
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #059669; margin-top: 0;">📧 Preferências</h3>
            <p><strong>Aceita receber atualizações:</strong> ${updates ? "Sim" : "Não"}</p>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            Email gerado automaticamente pelo sistema Ad Tracker
          </p>
        </div>
      </div>
    `,
  }

  // Email de confirmação para o usuário
  const confirmationEmail = {
    to: email,
    subject: "🎉 Bem-vindo ao Ad Tracker - Acesso Antecipado Confirmado!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Bem-vindo ao Ad Tracker!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Seu acesso antecipado foi confirmado</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1f2937;">Olá, ${firstName}! 👋</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Obrigado por se cadastrar para o acesso antecipado do <strong>Ad Tracker</strong>! 
            Você está entre os primeiros a conhecer nossa revolucionária solução de analytics sem cookies.
          </p>
          
          <div style="background: linear-gradient(135deg, #EBF8FF, #F3E8FF); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #3B82F6;">
            <h3 style="color: #1E40AF; margin-top: 0;">🚀 O que vem por aí:</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>✅ <strong>Rastreamento 94% mais preciso</strong> que métodos tradicionais</li>
              <li>✅ <strong>Contorna bloqueadores</strong> de anúncios e cookies</li>
              <li>✅ <strong>Integração direta</strong> com Meta Ads API</li>
              <li>✅ <strong>Dashboard em tempo real</strong> com insights de IA</li>
              <li>✅ <strong>Conformidade total</strong> com LGPD</li>
            </ul>
          </div>
          
          <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
            <h3 style="color: #92400E; margin-top: 0;">💰 Preço Especial de Lançamento</h3>
            <p style="color: #78350F; margin: 0; font-size: 18px;">
              <strong>Apenas R$ 49,90/mês</strong> para os primeiros usuários!
            </p>
          </div>
          
          <h3 style="color: #1f2937;">📅 Próximos Passos:</h3>
          <ol style="color: #374151; line-height: 1.8;">
            <li>Acompanhe seu email para atualizações exclusivas</li>
            <li>Siga nossas redes sociais para dicas de otimização</li>
            <li>Aguarde o convite para beta testing (em breve!)</li>
            <li>Seja um dos primeiros a usar quando lançarmos</li>
          </ol>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              🔗 Acessar Site do Ad Tracker
            </a>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 25px; text-align: center; color: white;">
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            Dúvidas? Estamos aqui para ajudar!
          </p>
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            📧 contato@adtracker.com.br | 📱 WhatsApp: (11) 99999-9999
          </p>
          <p style="margin: 15px 0 0 0; font-size: 12px; opacity: 0.6;">
            Você está recebendo este email porque se cadastrou para acesso antecipado do Ad Tracker.
          </p>
        </div>
      </div>
    `,
  }

  console.log("📧 Email para admin:", emailData)
  console.log("📧 Email de confirmação:", confirmationEmail)

  // Aqui você faria a integração real com o serviço de email
  // Exemplo com Resend:
  // await resend.emails.send(emailData)
  // await resend.emails.send(confirmationEmail)

  return { success: true }
}
