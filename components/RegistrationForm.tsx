
import React, { useState } from 'react';
import { Loader2, ArrowRight, Lock, User, Mail, Smartphone, Briefcase, DollarSign } from 'lucide-react';

interface RegistrationFormProps {
  btnText?: string;
  className?: string;
}

export const RegistrationForm = ({ btnText, className = "h-full" }: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', revenue: '' });

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
            revenue: formData.revenue,
            customData: { role: formData.role, revenue: formData.revenue, source: "Landing Page Workshop LHA" }
          })
        });
      }
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }

    setTimeout(() => {
      setLoading(false);
      window.location.href = CHECKOUT_URL;
    }, 1000);
  };

  return (
    <div className={`w-full relative ${className}`}>
      
      <div className="relative bg-transparent h-full flex flex-col justify-center">
        
        <div className="text-center mb-8">
           <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Oferta por tempo limitado</h3>
           <p className="text-primary text-xs uppercase tracking-widest font-mono font-bold">Vagas Limitadas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="relative group/input">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                <User className="w-5 h-5" />
             </div>
             <input 
               type="text" 
               required
               className="w-full bg-slate-900/50 border border-slate-800 px-12 py-4 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all placeholder-slate-600 rounded-lg font-light"
               placeholder="Seu nome completo *"
               value={formData.name}
               onChange={(e) => setFormData({...formData, name: e.target.value})}
             />
          </div>

          <div className="relative group/input">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                <Smartphone className="w-5 h-5" />
             </div>
             <input 
               type="tel" 
               required
               className="w-full bg-slate-900/50 border border-slate-800 px-12 py-4 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all placeholder-slate-600 rounded-lg font-light"
               placeholder="WhatsApp com DDD *"
               value={formData.phone}
               onChange={(e) => setFormData({...formData, phone: e.target.value})}
             />
          </div>

          <div className="relative group/input">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
             </div>
             <input 
               type="email" 
               className="w-full bg-slate-900/50 border border-slate-800 px-12 py-4 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all placeholder-slate-600 rounded-lg font-light"
               placeholder="Seu melhor e-mail (Opcional)"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
             />
          </div>

          <div className="relative group/input">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                <Briefcase className="w-5 h-5" />
             </div>
             <div className="relative">
               <select 
                 className={`w-full bg-slate-900/50 border border-slate-800 px-12 py-4 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all rounded-lg font-light appearance-none cursor-pointer ${formData.role === '' ? 'text-slate-600' : 'text-white'}`}
                 onChange={(e) => setFormData({...formData, role: e.target.value})}
                 value={formData.role}
               >
                 <option value="" disabled className="text-slate-500">Selecione seu cargo (Opcional)</option>
                 <option value="Empresario" className="bg-slate-900 text-white">Empresário</option>
                 <option value="CEO" className="bg-slate-900 text-white">CEO</option>
                 <option value="Diretor" className="bg-slate-900 text-white">Diretor</option>
                 <option value="Head" className="bg-slate-900 text-white">Head</option>
                 <option value="Gerente" className="bg-slate-900 text-white">Gerente</option>
                 <option value="Supervisor" className="bg-slate-900 text-white">Supervisor</option>
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
             </div>
          </div>

          <div className="relative group/input">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors">
                <DollarSign className="w-5 h-5" />
             </div>
             <div className="relative">
               <select 
                 className={`w-full bg-slate-900/50 border border-slate-800 px-12 py-4 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all rounded-lg font-light appearance-none cursor-pointer ${formData.revenue === '' ? 'text-slate-600' : 'text-white'}`}
                 onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                 value={formData.revenue}
               >
                 <option value="" disabled className="text-slate-500">Faturamento Mensal (Opcional)</option>
                 <option value="Ate50k" className="bg-slate-900 text-white">Até R$ 50k</option>
                 <option value="50k-200k" className="bg-slate-900 text-white">R$ 50k - R$ 200k</option>
                 <option value="200k-500k" className="bg-slate-900 text-white">R$ 200k - R$ 500k</option>
                 <option value="500k-1M" className="bg-slate-900 text-white">R$ 500k - R$ 1M</option>
                 <option value="Acima1M" className="bg-slate-900 text-white">Acima de R$ 1M</option>
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-neon w-full py-5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest mt-4 group"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 relative z-10" />
            ) : (
              <>
                <span className="relative z-10">{btnText || "INSCREVER-ME AGORA"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center flex items-center justify-center gap-2 opacity-50">
           <Lock className="w-3 h-3 text-slate-400" />
           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              Dados 100% protegidos
           </p>
        </div>
      </div>
    </div>
  );
};
