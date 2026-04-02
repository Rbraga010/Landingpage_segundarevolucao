
import React, { useState, useEffect } from 'react';
import { Loader2, ArrowRight, Lock, User, Mail, Smartphone, Briefcase, DollarSign, Target, Zap, Clock, Users, ShieldCheck } from 'lucide-react';

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
  const [spotsLeft, setSpotsLeft] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev <= 3) return 3;
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/mUZEjZcfs8vJQPN3EnCF/webhook-trigger/ndzaV1VsS9nD1Gx82jdt";
  const CHECKOUT_URL = "https://pay.hotmart.com/M103870619B";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
            customData: { role: formData.role, income: formData.income, challenge: formData.challenge, source: "Landing Page Workshop LHA" }
          })
        });
      }
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }

    // Enviar lead ao War Room PulsarH
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
          lp_origin: "IMERSAO"
        })
      });
    } catch (e) {
      console.warn("War Room: falha ao registrar lead", e);
    }

    setTimeout(() => {
      setLoading(false);
      window.location.href = CHECKOUT_URL;
    }, 1000);
  };

  const inputBase = "w-full bg-black/60 border border-red-900/30 px-12 py-4 text-white text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all placeholder-slate-500 rounded-xl font-medium tracking-wide";
  const selectBase = (val: string) => `${inputBase} appearance-none cursor-pointer ${val === '' ? 'text-slate-500' : 'text-white'}`;

  return (
    <div className={`w-full relative ${className}`}>

      <div className="relative h-full flex flex-col justify-center">

        {/* URGENCY HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute left-3" />
              <div className="w-2 h-2 rounded-full bg-red-500 relative" />
              <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest ml-1">AO VIVO</span>
            </div>
          </div>

          <h3 className="text-center text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-2">
            Sua vaga est&aacute; <span className="text-red-500">expirando</span>
          </h3>

          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Oferta limitada</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Restam {spotsLeft} vagas</span>
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

          {/* Cargo */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="relative">
              <select
                required
                className={selectBase(formData.role)}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                value={formData.role}
              >
                <option value="" disabled className="text-slate-500">Selecione seu cargo *</option>
                {ROLES.map(r => <option key={r} value={r} className="bg-slate-900 text-white">{r}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Faixa de Renda */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="relative">
              <select
                required
                className={selectBase(formData.income)}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                value={formData.income}
              >
                <option value="" disabled className="text-slate-500">Faixa de renda mensal *</option>
                {INCOMES.map(i => <option key={i} value={i} className="bg-slate-900 text-white">{i}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Maior Desafio */}
          <div className="relative group/input">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/60 group-focus-within/input:text-red-400 transition-colors z-10">
              <Target className="w-5 h-5" />
            </div>
            <div className="relative">
              <select
                required
                className={selectBase(formData.challenge)}
                onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                value={formData.challenge}
              >
                <option value="" disabled className="text-slate-500">Seu maior desafio atual *</option>
                {CHALLENGES.map(c => <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
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
