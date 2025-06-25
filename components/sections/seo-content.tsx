export default function SEOContent() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Por Que Seus Anúncios do Facebook Não Estão Funcionando? Recupere 40% das Conversões Perdidas
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold mb-4">Para Quem Está Começando com Anúncios</h3>
              <p className="mb-4">
                Se você está investindo em <strong>anúncios do Facebook e Instagram</strong> mas não vê resultados, não
                é culpa sua. <strong>40% das suas vendas nunca chegam ao Facebook</strong> por causa de bloqueadores de
                anúncios e mudanças no iPhone (iOS 14.5+).
              </p>
              <p className="mb-4">
                Isso significa que você está <strong>pagando mais caro</strong> por cliques que não convertem e o
                Facebook não consegue otimizar seus anúncios corretamente. É como dirigir de olhos vendados.
              </p>
              <p className="mb-4">
                O <strong>Ad Tracker</strong> resolve isso capturando as vendas reais e enviando para o Facebook
                automaticamente. <strong>Resultado: CPA menor e mais vendas</strong> com o mesmo orçamento.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Para Profissionais de Marketing Digital</h3>
              <p className="mb-4">
                O <strong>iOS 14.5 App Tracking Transparency</strong> e ad blockers estão causando significant data loss
                no <strong>Facebook Pixel</strong>. Isso resulta em <strong>attribution gaps</strong> e suboptimal
                campaign optimization.
              </p>
              <p className="mb-4">
                Nossa solução implementa <strong>server-side tracking</strong> via <strong>Meta Conversions API</strong>
                , capturando behavioral signals que contornam client-side limitations. Utilizamos{" "}
                <strong>first-party data</strong> e <strong>enhanced conversions</strong> para maximum attribution
                accuracy.
              </p>
              <p className="mb-4">
                <strong>Resultado técnico:</strong> 94% data capture rate, improved ROAS através de better algorithmic
                optimization, e compliance total com <strong>LGPD/GDPR</strong> regulations.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Problemas Comuns que o Ad Tracker Resolve</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-red-600 mb-2">❌ Problemas Atuais</h4>
                <ul className="space-y-1 text-left">
                  <li>• Anúncios caros sem retorno</li>
                  <li>• Facebook Pixel bloqueado</li>
                  <li>• iOS não rastreia conversões</li>
                  <li>• CPA subindo todo mês</li>
                  <li>• ROAS baixo inexplicável</li>
                  <li>• Dados perdidos constantemente</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-blue-600 mb-2">🔧 Como Funciona</h4>
                <ul className="space-y-1 text-left">
                  <li>• Rastreamento comportamental</li>
                  <li>• Server-side tracking</li>
                  <li>• Meta Conversions API</li>
                  <li>• Contorna bloqueadores</li>
                  <li>• Funciona no iOS 14.5+</li>
                  <li>• Setup em 5 minutos</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-green-600 mb-2">✅ Resultados</h4>
                <ul className="space-y-1 text-left">
                  <li>• 94% das conversões capturadas</li>
                  <li>• CPA reduz até 35%</li>
                  <li>• ROAS aumenta até 45%</li>
                  <li>• Dados completos para Meta</li>
                  <li>• Otimização automática</li>
                  <li>• ROI imediato</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">🎯 Casos de Uso Específicos:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>E-commerces:</strong>
                <ul className="mt-1 space-y-1 text-gray-700">
                  <li>• Recupera vendas perdidas no checkout</li>
                  <li>• Rastreia jornada completa do cliente</li>
                  <li>• Otimiza campanhas de remarketing</li>
                  <li>• Melhora targeting de lookalike</li>
                </ul>
              </div>
              <div>
                <strong>Infoprodutores:</strong>
                <ul className="mt-1 space-y-1 text-gray-700">
                  <li>• Captura leads que não aparecem</li>
                  <li>• Rastreia webinars e VSLs</li>
                  <li>• Otimiza funis de conversão</li>
                  <li>• Melhora qualidade dos leads</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h4 className="font-semibold mb-4">Termos Técnicos Explicados</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-left">
              <div>
                <strong>CPA (Custo Por Aquisição):</strong> Quanto você paga por cada venda/lead
                <br />
                <strong>ROAS (Return on Ad Spend):</strong> Quanto você ganha para cada R$ 1 investido
                <br />
                <strong>iOS 14.5+:</strong> Atualização que bloqueia rastreamento entre apps
              </div>
              <div>
                <strong>Facebook Pixel:</strong> Código que rastreia ações no seu site
                <br />
                <strong>Meta Conversions API:</strong> Envio direto de dados para o Facebook
                <br />
                <strong>Server-side:</strong> Rastreamento que não pode ser bloqueado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
