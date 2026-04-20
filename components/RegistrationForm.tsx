import React, { useEffect, useState } from 'react';
import { Loader2, ArrowRight, Lock, User, Mail, Smartphone, Zap, Clock, Users, ShieldCheck } from 'lucide-react';
import { captureUtm, getUtm, appendUtmToUrl, trackLead, trackInitiateCheckout } from './utm';

interface RegistrationFormProps {
  btnText?: string;
  className?: string;
}

const ROLES = ['Coordenador / Supervisor', 'Gerente de Operação', 'Diretor / Head', 'Dono de Empresa / Sócio', 'Líder de Equipe Técnica', 'Outro'];
const INCOMES = ['Até R$ 5.000', 'R$ 5.000 a R$ 10.000', 'R$ 10.000 a R$ 20.000', 'R$ 20.000 a R$ 30.000', 'Acima de R$ 30.000'];
const CHALLENGES = [
  'Engajamento e Retenção do Time',
  'Falta de Tempo / Sobrecarga Operacional',
  'Conflitos e Clima Organizacional',
  'Dificuldade em Delegar',
  'Baixa Produtividade da Equipe',
  'Adaptação às Novas Tecnologias (IA)',
  'Contratação de Talentos Qualificados',
  'Comunicação Falha entre Departamentos',
  'Pressão por Resultados de Curto Prazo',
  'Falta de Processos Claros',
  'Outro'
];

export const RegistrationForm = ({ btnText, className = "h-full" }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', income: '', challenge: '' });

  const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/mUZEjZcfs8vJQPN3EnCF/webhook-trigger/ndzaV1VsS9nD1Gx82jdt";
  const CHECKOUT_URL = "https://pay.hotmart.com/M103870619B";

  // Captura UTM params ao carregar (guarda em sessionStorage)
  useEffect(() => {
    captureUtm();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const utm = getUtm();

    // 1. Dispara evento Meta Pixel "Lead" (client-side + server-side via lead-proxy)
    try {
      trackLead(formData.email, formData.phone);
    } catch (err) {
      console.warn("pixel Lead fail:", err);
    }

    // 2. Manda pro GoHighLevel (GHL) webhook — mantido pra automacao externa
    try {
      if (GHL_WEBHOOK_URL) {
        await fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            revenue: formData.income,
            challenge: formData.challenge,
            customData: {
              role: formData.role,
              income: formData.income,
              challenge: formData.challenge,
              source: "Landing Page Workshop LHA",
              ...utm,
            }
          })
        });
      }
    } catch (error) {
      console.error("Erro ao salvar lead no GHL:", error);
    }

    // 3. Manda pro War Room PulsarH (com UTM pra atribuição)
    try {
      await fetch("/api/lead-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          income: formData.income,
          challenge: formData.challenge,
          lp_origin: "IMERSAO",
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          src: utm.src,
          fbclid: utm.fbclid,
          gclid: utm.gclid,
        })
      });
    } catch (e) {
      console.warn("War Room: falha ao registrar lead", e);
    }

    // 4. Dispara InitiateCheckout ANTES do redirect (pra Meta casar com Purchase depois)
    try {
      trackInitiateCheckout(297);
    } catch (err) {
      console.warn("pixel InitiateCheckout fail:", err);
    }

    // 5. Redireciona pra Hotmart com UTM params anexados (webhook de venda capturara)
    const checkoutUrl = appendUtmToUrl(CHECKOUT_URL);

    setTimeout(() => {
      setLoading(false);
      window.location.href = checkoutUrl;
    }, 1000);
  };

  const inputBase = "w-full bg-black/60 border border-red-900/30 px-12 py-4 text-white text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all placeholder-slate-500 rounded-xl font-medium tracking-wide";
  const selectBase = (val: string) => `${inputBase} appearance-none cursor-pointer ${val === '' ? 'text-slate-500' : 'text-white'}`;

  return (
    <div className={`w-full relative ${className}`}>

      <div className="relative h-full flex flex-col justify-center">

        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-center text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-2">
            Garanta sua vaga <span className="text-red-500">agora</span>
          </h3>

          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Oferta limitada</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Vagas limitadas</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Nome */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              required
              className={inputBase}
              placeholder="Seu nome completo *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* WhatsApp */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <Smartphone className="w-5 h-5" />
            </div>
            <input
              type="tel"
              required
              className={inputBase}
              placeholder="WhatsApp com DDD *"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              required
              className={inputBase}
              placeholder="Seu melhor e-mail *"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* CTA BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-5 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-500 hover:via-red-400 hover:to-orange-400 text-white font-black rounded-xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 relative z-10" />
              ) : (
                <>
                  <Zap className="w-5 h-5 relative z-10 fill-current" />
                  <span className="relative z-10">{btnText || "GARANTIR MINHA VAGA AGORA"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* PARCELAMENTO */}
        <div className="mt-3 text-center">
          <p className="text-green-400 font-bold text-sm">ou 12x de R$24,75</p>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 opacity-60">
              <Lock className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <ShieldCheck className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">7 dias de garantia</span>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-600 font-mono">
            Acesso imediato + b&ocirc;nus exclusivos por tempo limitado
          </p>
        </div>
      </div>
    </div>
  );
};
