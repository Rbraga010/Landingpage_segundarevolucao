
import React, { useEffect, useRef, useState } from 'react';
import {
   ArrowRight,
   Target,
   Zap,
   Brain,
   CheckCircle2,
   Clock,
   Calendar,
   MonitorPlay,
   Award,
   Search,
   Activity,
   Scale,
   ShieldAlert,
   BarChart4,
   Crosshair,
   Route,
   X,
   ChevronDown,
   Fingerprint,
   Play,
   Minus,
   Plus,
   Users,
   TrendingUp,
   Network,
   Rocket,
   Layers,
   UserMinus,
   CalendarCheck,
   Gift,
   Check,
   Tag,
   Quote,
   MessageCircle,
   Compass,
   LayoutGrid,
   FileText,
   XCircle,
   Sparkles,
   MousePointer2,
   Lock,
   Flame,
   Rocket as RocketIcon,
   Crown,
   Trophy,
   Cpu,
   GiftIcon,
   Eye,
   CreditCard,
   BookOpen,
   BarChart
} from 'lucide-react';
import { RegistrationForm } from './components/RegistrationForm';
import { SocialProofPopup } from './components/SocialProofPopup';


// --- UTILS ---
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) setIsVisible(true);
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
   }, []);

   return (
      <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
         {children}
      </div>
   );
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-white/5 bg-slate-900/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#C5A572]/20 mb-4">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 text-left group"
         >
            <div className="flex items-center gap-4">
               {icon && <div className="text-[#C5A572] group-hover:scale-110 transition-transform">{icon}</div>}
               <span className="text-slate-200 font-bold uppercase tracking-widest text-sm md:text-base">{title}</span>
            </div>
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C5A572]' : 'text-slate-500'}`}>
               <ChevronDown className="w-5 h-5" />
            </div>
         </button>
         <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="p-8 pt-0 border-t border-white/5 bg-slate-900/40">
               {children}
            </div>
         </div>
      </div>
   );
};

export default function App() {
   const scrollToOffer = () => document.getElementById('section-offer')?.scrollIntoView({ behavior: 'smooth' });

   // --- WEBHOOK READINESS SIGNAL ---
   useEffect(() => {
      const signalReady = async () => {
         const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/mUZEjZcfs8vJQPN3EnCF/webhook-trigger/ebf6e908-0191-4ec2-b00c-19fbedd1d63f";
         try {
            await fetch(WEBHOOK_URL, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  event: "PAGE_READY_FOR_LAUNCH",
                  timestamp: new Date().toISOString(),
                  status: "ready",
                  message: "A LP da Imersão H.AI v3 (14 blocos · arquitetura conversão Betina) está no ar.",
                  url: window.location.href
               })
            });
         } catch (e) {
            console.warn("Falha ao enviar sinal de prontidão.");
         }
      };
      signalReady();
   }, []);

   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
   const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

   // BLOCO 10 — QUEBRA DE OBJEÇÕES (4 Q&A)
   const objections = [
      {
         q: "Não sou técnico. Vou dar conta?",
         a: "Você não precisa ser. O método é desenhado pra dono de loja, não pra programador. Se você usa WhatsApp, você usa o método. Quem virou técnico foi o time da Pulse — pra você não precisar."
      },
      {
         q: "Não tenho tempo. Minha agenda já está cheia.",
         a: "Aulas de 15 minutos. Você assiste no carro, no almoço, antes de dormir. E tem coisa que você aplica na primeira semana e devolve tempo de volta — porque a primeira IA.gente já tira tarefa da sua mesa."
      },
      {
         q: "Meu time não vai comprar essa ideia.",
         a: "Tem módulo inteiro pra isso. Roteiro de reunião pronto, método de engajamento testado. Empresário que aplicou trouxe o time junto sem precisar impor. O segredo é como apresenta."
      },
      {
         q: "Já tentei IA antes e não funcionou.",
         a: "Você tentou ferramenta. Aqui você aprende sistema. ChatGPT solto não vira resultado. IA.gente com função, KPI e processo claro vira. Diferença é 90 dias."
      }
   ];

   // BLOCO 4 — TABELA DE CONTRASTE
   const contrastRows = [
      { common: "Faz mais horas", scaler: "Decide o que só ele decide" },
      { common: "Vende sozinho", scaler: "Constrói máquina que vende" },
      { common: "Apaga incêndio", scaler: "Estrutura pra incêndio não acontecer" },
      { common: "Tem ferramenta de IA solta", scaler: "Tem IA com função clara dentro do time" }
   ];

   return (
      <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary selection:text-background">

         {/* --- BACKGROUND FX --- */}
         <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none z-0"></div>
         <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] radial-glow opacity-50 z-0"></div>

         {/* --- HEADER --- */}
         <nav className="fixed top-0 w-full z-50 h-20 flex items-center justify-between px-6 lg:px-12 glass-card border-b-0 border-white/5 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
               <img
                  src="https://storage.googleapis.com/msgsndr/mUZEjZcfs8vJQPN3EnCF/media/69655adcf88d5a6b434054ac.png"
                  alt="Logo PulsarH"
                  className="h-10 w-auto object-contain"
               />
               <span className="font-heading font-black text-lg tracking-tight uppercase text-white">PulsarH<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">.AI</span></span>
            </div>
            <button onClick={scrollToOffer} className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-[#C5A572] transition-colors">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
               Imersão H.AI
            </button>
         </nav>

         <main className="relative z-10">

            {/* ============================================================== */}
            {/* BLOCO 1 — ATAQUE INICIAL (HERO)                                  */}
            {/* ============================================================== */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden bg-[#070514]">

               <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[url('/hero_cinematic.jpg')] bg-cover bg-right md:bg-center bg-no-repeat opacity-60 md:opacity-100 mix-blend-screen mix-blend-lighten"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070514] via-[#070514]/90 lg:via-[#070514]/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070514] via-[#070514]/90 lg:via-[#070514]/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070514] via-[#070514]/80 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#070514] via-[#070514]/80 to-transparent"></div>
                  <div className="absolute bottom-[10%] left-[2%] w-[45%] h-32 bg-[#070514] blur-3xl opacity-95"></div>
               </div>

               <div className="max-w-7xl mx-auto w-full relative z-10 flex text-left">
                  <div className="max-w-3xl flex flex-col justify-center">

                     <Reveal delay={100}>
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 glass-pill mb-8 border-[#C5A572]/20 bg-[#C5A572]/5 backdrop-blur-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse shadow-[0_0_10px_rgba(197,165,114,0.8)]"></div>
                           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A572] drop-shadow-md">PARA EMPRESÁRIOS QUE JÁ CONSTRUÍRAM ALGO REAL</span>
                        </div>
                     </Reveal>

                     <Reveal delay={200}>
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-black leading-tight tracking-tight text-white mb-4">
                           Faça sua empresa crescer no ritmo da sua visão —<br/>
                           <span className="text-slate-300 font-bold">usando IA + equipe pra escalar sem perder o controle.</span>
                        </h1>
                     </Reveal>

                     <Reveal delay={400}>
                        <p className="text-base md:text-lg font-light text-slate-300 leading-relaxed max-w-xl mb-10 italic border-l-2 border-[#C5A572]/30 pl-6">
                           Pra quem sabe que pode mais. Mas ainda gasta energia demais em <strong className="font-bold text-white not-italic">decisões que não deveriam passar por você.</strong>
                        </p>
                     </Reveal>

                     <Reveal delay={500}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                           <button onClick={scrollToOffer} className="relative overflow-hidden group px-8 py-4 rounded-xl md:rounded-2xl border border-[#C5A572]/40 bg-[#C5A572]/10 hover:bg-[#C5A572]/20 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(197,165,114,0.15)] hover:shadow-[0_0_50px_rgba(197,165,114,0.4)] flex items-center justify-center gap-3">
                              <span className="text-[#C5A572] group-hover:text-[#E8D5B0] font-bold uppercase tracking-widest text-xs md:text-sm relative z-10 transition-colors drop-shadow-md">
                                 QUERO ESCALAR COM CONTROLE — R$ 697
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A572]/0 via-[#C5A572]/20 to-[#C5A572]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                           </button>
                           <div className="text-xs md:text-sm text-slate-400 font-light">
                              <div>ou 12x de <strong className="text-white font-bold">R$ 69,82</strong> sem juros</div>
                              <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Garantia 7 dias · Acesso imediato</div>
                           </div>
                        </div>
                     </Reveal>

                  </div>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 2 — ESPELHO DO EGO                                         */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden border-y border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6B2D8B]/10 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="max-w-4xl mx-auto relative z-10">
                  <Reveal>
                     <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 text-center">RECONHECIMENTO</p>
                     <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight text-center mb-10">
                        Você construiu uma empresa que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">depende de você.</span>
                     </h2>
                  </Reveal>

                  <Reveal delay={150}>
                     <div className="space-y-6 text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                        <p>
                           Isso não é defeito. <strong className="text-white">É prova de competência.</strong> Você decide rápido, vende melhor que o time, fecha negócio que ninguém mais fecharia. A operação anda porque você puxa.
                        </p>
                        <p>
                           Só que essa mesma força criou um <strong className="text-[#C5A572]">teto invisível.</strong> Seu crescimento agora passa pela sua agenda. Sua empresa cresce no limite da sua energia — e energia é o único recurso que não escala.
                        </p>
                        <p className="text-xl md:text-2xl text-white font-bold pt-4 border-t border-white/10">
                           Empresário grande não é quem faz mais. É quem <span className="text-[#C5A572]">decide o que só ele pode decidir</span>, e tem alavanca pra todo o resto.
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 3 — AGITAÇÃO (4 obstáculos)                                */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-12">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">OS 4 OBSTÁCULOS</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-4">
                           4 obstáculos que limitam o crescimento de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">empresário bom.</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-300 font-light italic mt-4">
                           Não é falta de capacidade. <strong className="text-white not-italic">É falta de alavanca.</strong>
                        </p>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
                     {[
                        {
                           num: '01',
                           title: 'Decisão demais passa por você',
                           body: 'Cada compra, cada contratação, cada resposta de cliente importante. Quando o dono é o gargalo da decisão, a empresa anda no ritmo da agenda dele.',
                           color: '#EF4444'
                        },
                        {
                           num: '02',
                           title: 'Execução não acompanha sua velocidade',
                           body: 'Você pensa rápido. O time ainda está terminando o que você pediu na semana passada. A distância entre sua visão e a entrega virou problema operacional.',
                           color: '#C5A572'
                        },
                        {
                           num: '03',
                           title: 'Time depende mais do que deveria',
                           body: 'Pergunta básica chega no seu WhatsApp. Não porque o time é ruim. Porque ninguém estruturou pra que não chegue.',
                           color: '#6B2D8B'
                        },
                        {
                           num: '04',
                           title: 'IA já está mudando o jogo — com ou sem você',
                           body: 'Concorrente novo, com metade da estrutura, está girando o dobro. Não é mágica. É alavanca que ele tem e você ainda não pegou.',
                           color: '#8B5CB8'
                        }
                     ].map((card, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="relative h-full p-6 md:p-7 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-white/20 transition-all group overflow-hidden">
                              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}></div>
                              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-15 group-hover:opacity-30 transition-opacity" style={{ background: card.color }}></div>
                              <div className="relative z-10">
                                 <div className="text-3xl font-black mb-3" style={{ color: card.color }}>{card.num}</div>
                                 <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-3">{card.title}</h3>
                                 <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">{card.body}</p>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  <Reveal delay={500}>
                     <div className="mt-12 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] text-center shadow-[0_0_40px_rgba(197,165,114,0.15)]">
                        <p className="text-xl md:text-2xl text-white font-bold leading-snug">
                           Não é falta de capacidade.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">É falta de alavanca.</span>
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 4 — QUEBRA DE CRENÇA (tabela contraste)                    */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden border-y border-white/5">
               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-12">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">QUEBRA DE CRENÇA</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-6">
                           Empresário comum tenta fazer mais.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Empresário que cresce agora faz diferente.</span>
                        </h2>
                        <div className="space-y-4 max-w-3xl mx-auto text-left text-base md:text-lg text-slate-300 font-light leading-relaxed">
                           <p>
                              Quem ainda compete pelo {`"`}trabalhar mais{`"`} <strong className="text-white">perdeu antes de começar.</strong> O jogo virou: o empresário que cresce em 2026 é o que amplia a própria capacidade — usando IA e equipe como <strong className="text-[#C5A572]">alavanca real</strong>, não como acessório.
                           </p>
                           <p>
                              Não é sobre fazer o dobro. É sobre comandar uma operação que <strong className="text-white">entrega o dobro sem precisar do dobro de você.</strong>
                           </p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={200}>
                     <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#070514] overflow-hidden backdrop-blur-md shadow-[0_0_60px_rgba(107,45,139,0.15)]">
                        <div className="grid md:grid-cols-2 border-b border-white/10">
                           <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-red-500/5">
                              <div className="flex items-center gap-3">
                                 <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                 <span className="text-xs md:text-sm font-black uppercase tracking-widest text-red-400">Empresário comum</span>
                              </div>
                           </div>
                           <div className="p-5 md:p-6 bg-[#C5A572]/5">
                              <div className="flex items-center gap-3">
                                 <CheckCircle2 className="w-5 h-5 text-[#C5A572] shrink-0" />
                                 <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#C5A572]">Empresário que escala em 2026</span>
                              </div>
                           </div>
                        </div>

                        {contrastRows.map((row, i, arr) => (
                           <div key={i} className={`grid md:grid-cols-2 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                              <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/5 bg-red-500/[0.02] hover:bg-red-500/[0.04] transition-colors">
                                 <p className="text-slate-400 text-sm md:text-base font-light italic leading-relaxed line-through decoration-red-500/30 decoration-[1px]">{row.common}</p>
                              </div>
                              <div className="p-5 md:p-6 bg-[#C5A572]/[0.02] hover:bg-[#C5A572]/[0.05] transition-colors">
                                 <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed">{row.scaler}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 5 — VISÃO DE FUTURO (4 marcos)                             */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A572]/10 blur-[140px] rounded-full pointer-events-none"></div>
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">VISÃO DE FUTURO</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-4">
                           Como sua semana fica quando<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">o sistema certo está rodando.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                     {[
                        { icon: Crown, title: 'Você decide. O time executa.', body: 'Sua agenda volta a ser sua. Decisão grande na sua mesa. Decisão pequena resolvida antes de chegar até você.' },
                        { icon: Network, title: 'Processo flui sem travar em você.', body: 'Pedido entra, time responde, cliente é atendido — sem precisar do seu OK em cada etapa.' },
                        { icon: Cpu, title: 'IA resolve o operacional invisível.', body: 'Resposta de cliente, organização de agenda, follow-up de orçamento, controle de estoque. O que consumia sua energia agora roda enquanto você dorme.' },
                        { icon: TrendingUp, title: 'Sua empresa cresce — sem virar caos.', body: 'Mais cliente, mais venda, mais entrega. Sem que isso vire mais reunião, mais correria, mais bombeiro de plantão.' }
                     ].map((card, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="relative h-full p-7 md:p-8 rounded-2xl border border-[#C5A572]/20 bg-gradient-to-br from-[#C5A572]/5 to-transparent backdrop-blur-md hover:border-[#C5A572]/40 transition-all group">
                              <div className="flex items-start gap-4 mb-4">
                                 <div className="w-12 h-12 rounded-xl bg-[#C5A572]/10 border border-[#C5A572]/30 flex items-center justify-center text-[#C5A572] group-hover:scale-110 transition-transform shrink-0">
                                    <card.icon className="w-6 h-6" />
                                 </div>
                                 <h3 className="text-white font-bold text-lg md:text-xl leading-snug pt-2">{card.title}</h3>
                              </div>
                              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">{card.body}</p>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  <Reveal delay={500}>
                     <p className="text-center text-base md:text-lg text-slate-200 font-light italic mt-12 max-w-2xl mx-auto">
                        Isso não é projeção.<br/>
                        <strong className="text-white not-italic text-lg md:text-xl">É o que acontece quando o método certo entra na operação.</strong>
                     </p>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* FRASE DE OURO — caixa hero entre Bloco 5 e 6                     */}
            {/* ============================================================== */}
            <section className="relative py-16 md:py-24 px-6 lg:px-12 overflow-hidden" style={{ backgroundColor: '#6B4E9B' }}>
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C5A572]/15 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-4xl mx-auto relative z-10 text-center">
                  <Reveal>
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A572]/40 bg-[#C5A572]/10 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A572]" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#C5A572]">A virada de chave</span>
                     </div>
                  </Reveal>
                  <Reveal delay={150}>
                     <p className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        Sua empresa não precisa <span className="italic text-[#E8D5B0]">menos</span> de você.
                     </p>
                  </Reveal>
                  <Reveal delay={300}>
                     <p className="text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        Precisa <span className="italic text-[#E8D5B0]">mais</span> de você no <span className="text-[#C5A572]">lugar certo.</span>
                     </p>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 6 — APRESENTAÇÃO DA SOLUÇÃO                                */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-y border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6B2D8B]/10 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="max-w-4xl mx-auto relative z-10 text-center">
                  <Reveal>
                     <p className="text-[#C5A572] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">A SOLUÇÃO</p>
                     <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-8">
                        Foi exatamente pra isso que criamos a<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">Imersão H.AI.</span>
                     </h2>
                  </Reveal>
                  <Reveal delay={200}>
                     <div className="space-y-6 text-base md:text-lg text-slate-300 font-light leading-relaxed">
                        <p>
                           Um sistema direto, em <strong className="text-white">5 etapas</strong>, pra empresário que quer <strong className="text-[#C5A572]">crescer com IA sem perder controle</strong>, sem virar empresa fria, sem destruir o que já funciona. Sem virar técnico. Sem precisar contratar TI. Sem precisar parar a operação.
                        </p>
                        <p className="text-lg md:text-xl text-white font-bold pt-4 border-t border-white/10">
                           Em <span className="text-[#C5A572]">7 dias</span> você sai com sua primeira IA.gente rodando.<br/>
                           Em <span className="text-[#C5A572]">90 dias</span> você opera diferente.
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 7 — MECANISMO ÚNICO (3 elementos)                          */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">O MECANISMO</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           Você não precisa virar técnico.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Precisa dominar 3 coisas.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                     {[
                        {
                           num: '01',
                           title: 'Liderança Híbrida',
                           body: 'Comandar gente e IA juntas, dentro do mesmo time, com a mesma clareza. Não é sobre saber programar — é sobre saber liderar uma equipe que agora tem humanos e IA.gentes operando lado a lado.',
                           color: '#8B5CF6',
                           icon: Crown
                        },
                        {
                           num: '02',
                           title: 'IA Aplicada com função clara',
                           body: 'Esquece chatbot que só conversa. Aqui é IA.gente com cargo, função, entregável. Atende cliente, organiza agenda, controla estoque, faz follow-up. Tem nome, tem KPI, tem horário de trabalho.',
                           color: '#C5A572',
                           icon: Cpu
                        },
                        {
                           num: '03',
                           title: 'Sistema de implementação simples',
                           body: 'Método PULSAR+H. Cinco passos: Planejar, Usar, Lapidar, Sustentar, Alavancar — com Humanização no centro. Empresário aplica em 90 dias, sem precisar de consultoria de R$ 50 mil.',
                           color: '#6B2D8B',
                           icon: Network
                        }
                     ].map((card, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(197,165,114,0.12)] group h-full" style={{ background: `linear-gradient(135deg, ${card.color}10 0%, rgba(7,5,20,0.8) 100%)` }}>
                              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: card.color }} />
                              <div className="relative z-10">
                                 <div className="flex items-center gap-3 mb-5">
                                    <span className="text-4xl md:text-5xl font-black leading-none block" style={{ color: card.color }}>{card.num}</span>
                                    <card.icon className="w-7 h-7" style={{ color: card.color }} />
                                 </div>
                                 <h3 className="font-black uppercase tracking-wide text-base md:text-lg text-white mb-4 leading-tight">{card.title}</h3>
                                 <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">{card.body}</p>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 8 — PROVA (NAP + 200 + Rodrigo)                            */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-y border-white/5">
               <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#C5A572]/10 blur-[140px] rounded-full pointer-events-none"></div>
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">A PROVA</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           Não é teoria.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Já está rodando em operações reais.</span>
                        </h2>
                     </div>
                  </Reveal>

                  {/* Quote NAP */}
                  <Reveal delay={150}>
                     <div className="max-w-4xl mx-auto mb-12 p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] via-[#070514] to-[#0a0f25] shadow-[0_0_60px_rgba(197,165,114,0.15)] relative overflow-hidden">
                        <Quote className="absolute top-6 right-6 w-12 h-12 text-[#C5A572]/20" />
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed italic mb-6">
                           {`"`}Em 60 dias a gente parou de afogar em mensagem de WhatsApp. A IA atende, organiza pedido, e o time fechou mês <strong className="text-[#C5A572] not-italic">32% acima.</strong>{`"`}
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A572] to-[#6B2D8B] flex items-center justify-center text-slate-950 font-black text-lg">
                              A
                           </div>
                           <div>
                              <p className="text-white font-bold text-base">Antônio</p>
                              <p className="text-[#C5A572] text-xs uppercase tracking-widest font-bold mt-0.5">NAP Tintas · Sorocaba/SP</p>
                           </div>
                        </div>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                     {/* +200 */}
                     <Reveal delay={300}>
                        <div className="p-8 md:p-10 rounded-3xl border border-[#6B2D8B]/30 bg-[#6B2D8B]/5 backdrop-blur-md text-center h-full flex flex-col justify-center">
                           <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8B5CB8] to-[#6B2D8B] mb-3">+200</div>
                           <p className="text-white font-bold text-base md:text-lg leading-snug mb-2">donos de loja</p>
                           <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                              já passaram pelo método e estão operando com IA + equipe.
                           </p>
                        </div>
                     </Reveal>

                     {/* Rodrigo 4h+18IA */}
                     <Reveal delay={450}>
                        <div className="p-8 md:p-10 rounded-3xl border-2 border-[#C5A572]/40 bg-gradient-to-br from-[#C5A572]/10 to-[#6B2D8B]/10 backdrop-blur-md shadow-[0_0_40px_rgba(197,165,114,0.15)] h-full">
                           <p className="text-[10px] text-[#C5A572] font-black uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse"></div>
                              Prova viva — Rodrigo Braga
                           </p>
                           <div className="grid grid-cols-3 gap-2 md:gap-4 mb-5">
                              <div className="text-center px-2">
                                 <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-1">4</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">humanos</div>
                              </div>
                              <div className="text-center px-2 border-x border-white/5">
                                 <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-1">18</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">IA.gentes</div>
                              </div>
                              <div className="text-center px-2">
                                 <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-1">24h</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">operação</div>
                              </div>
                           </div>
                           <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                              A PulsarH.AI roda com 4 pessoas e 18 IA.gentes trabalhando 24 horas por dia. <strong className="text-white">Quem ensina é quem aplica. Todo dia.</strong>
                           </p>
                        </div>
                     </Reveal>
                  </div>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 9 — STACK (5 conquistas + bônus)                           */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden">
               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">O QUE VOCÊ DOMINA AO SAIR</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           5 conquistas concretas.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Aplicação imediata.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="space-y-5">
                     {[
                        {
                           title: 'Você entende como usar IA sem destruir sua operação',
                           body: 'Sai sabendo onde IA entra, onde NÃO entra, e como evitar os 3 erros que quebram empresa que tenta digitalizar de qualquer jeito.',
                           tag: 'Módulo 1 · A Ruptura'
                        },
                        {
                           title: 'Você identifica seus 2 buracos como líder — e como ampliar',
                           body: 'Diagnóstico das 5 dimensões do líder híbrido. Você sai sabendo exatamente onde está forte e onde precisa de alavanca.',
                           tag: 'Módulo 2 · DNA do Líder Híbrido'
                        },
                        {
                           title: 'Você implanta sua primeira IA.gente em 7 dias',
                           body: 'Método passo a passo. Escolhe a função, define o KPI, coloca pra rodar. Em uma semana você tem IA trabalhando na sua operação.',
                           tag: 'Módulo 3 · IA.gentes na Prática'
                        },
                        {
                           title: 'Você engaja seu time sem resistência',
                           body: 'Roteiro de reunião pronto. Método S.E.R (Sensibilizar · Engajar · Respeitar) pra trazer o time junto, sem virar guerra interna.',
                           tag: 'Módulo 4 · Liderança Híbrida'
                        },
                        {
                           title: 'Você sai com plano de 90 dias escrito',
                           body: 'Prioridade definida, prazo definido, responsável definido. Aplicação semana 1. Resultado mês 3.',
                           tag: 'Módulo 5 · PULSAR+H'
                        }
                     ].map((item, i) => (
                        <Reveal key={i} delay={i * 80}>
                           <div className="p-6 md:p-7 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-[#C5A572]/30 transition-all group">
                              <div className="flex items-start gap-4">
                                 <div className="w-9 h-9 rounded-full bg-[#C5A572]/10 border border-[#C5A572]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                    <Check className="w-5 h-5 text-[#C5A572]" />
                                 </div>
                                 <div className="flex-1">
                                    <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-3">{item.body}</p>
                                    <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#C5A572]/80 italic">{item.tag}</span>
                                 </div>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  {/* Bônus */}
                  <Reveal delay={500}>
                     <div className="mt-12 p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] shadow-[0_0_60px_rgba(197,165,114,0.15)]">
                        <p className="text-[#C5A572] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 text-center">Bônus inclusos</p>
                        <ul className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                           {[
                              { icon: '🎯', title: 'Sessão 1:1 com Rodrigo Braga', body: 'diagnóstico ao vivo da sua operação' },
                              { icon: '🚪', title: 'War Room ao vivo', body: 'encontros mensais com outros empresários implementando' },
                              { icon: '🤖', title: 'IA.gente operacional em 7 dias', body: 'entrega prática, não promessa' },
                              { icon: '👥', title: 'Comunidade fechada', body: 'rede de empresário aplicando no mesmo nível' }
                           ].map((b, i) => (
                              <li key={i} className="flex items-start gap-3">
                                 <span className="text-2xl shrink-0">{b.icon}</span>
                                 <div>
                                    <p className="text-white font-bold text-sm md:text-base leading-snug">{b.title}</p>
                                    <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed mt-1">{b.body}</p>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 10 — QUEBRA DE OBJEÇÕES (4 perguntas)                      */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-y border-white/5">
               <div className="max-w-4xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-12">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">QUEBRA DE OBJEÇÕES</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           {`"`}Mas Rodrigo...{`"`}<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">as 4 dúvidas que todo empresário tem antes de entrar.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="space-y-5">
                     {objections.map((obj, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="p-6 md:p-7 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-[#C5A572]/30 transition-all">
                              <div className="flex items-start gap-4 mb-4">
                                 <Quote className="w-6 h-6 text-[#C5A572]/60 shrink-0 mt-1" />
                                 <h3 className="text-white font-bold text-base md:text-lg leading-snug italic">{`"`}{obj.q}{`"`}</h3>
                              </div>
                              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed pl-10">
                                 {obj.a}
                              </p>
                           </div>
                        </Reveal>
                     ))}
                  </div>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 11 — OFERTA                                                */}
            {/* ============================================================== */}
            <section id="section-offer" className="py-24 px-6 lg:px-12 relative overflow-hidden bg-background border-y border-white/5 scroll-mt-28">
               <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                     <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6 animate-pulse">LOTE DE ABERTURA · ACESSO IMEDIATO</p>
                     <h2 className="text-2xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight uppercase mb-8 leading-tight">
                        Tudo que está incluso<br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">na sua entrada hoje.</span>
                     </h2>
                  </div>

                  <div className="max-w-4xl mx-auto glass-card border-2 border-green-500/50 bg-gradient-to-br from-slate-900 to-[#0a0f25] p-6 md:p-10 rounded-2xl md:rounded-3xl relative shadow-[0_0_120px_rgba(34,197,94,0.25)]">

                     <div className="bg-white/[0.03] rounded-2xl p-6 md:p-8 border border-white/5 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 md:p-4 bg-green-500 text-black text-[10px] md:text-[12px] font-black uppercase tracking-widest rounded-bl-2xl shadow-xl z-20">Incluso</div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 text-center mb-10 mt-4">
                           <p className="text-primary font-black uppercase tracking-widest text-sm mb-4">O pacote completo</p>
                           <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                              <span className="text-slate-500 line-through">R$ 6.691</span> POR<br/>
                              <span className="text-green-400 underline decoration-green-500/30 underline-offset-8">R$ 697</span>
                           </h4>
                        </div>

                        <ul className="space-y-4 relative z-10">
                           {[
                              { name: "5 módulos completos do método H.AI", price: "R$ 1.997" },
                              { name: "Sessão 1:1 com Rodrigo Braga", price: "R$ 2.500" },
                              { name: "Acesso ao War Room ao vivo (3 meses)", price: "R$ 997" },
                              { name: "Implementação da sua 1ª IA.gente em 7 dias", price: "R$ 1.197" },
                              { name: "Comunidade fechada de empresários", price: "Incluso" }
                           ].map((bonus, i) => (
                              <li key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 gap-4 hover:border-green-500/20 transition-colors">
                                 <span className="text-slate-200 font-medium flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                                       <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    </div>
                                    {bonus.name}
                                 </span>
                                 <span className="text-slate-600 line-through font-mono text-sm shrink-0">{bonus.price}</span>
                              </li>
                           ))}
                           <li className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-green-500/10 rounded-2xl border border-green-500/30 gap-4">
                              <span className="text-white font-black uppercase tracking-wider flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40 shrink-0">
                                    <Trophy className="text-green-400 w-5 h-5" />
                                 </div>
                                 Valor total real
                              </span>
                              <span className="text-green-400 font-black text-xl md:text-2xl tracking-tight shrink-0">R$ 6.691</span>
                           </li>
                        </ul>
                     </div>

                     {/* Caixa de oferta */}
                     <div className="text-center mb-10 p-6 md:p-8 rounded-2xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514]">
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#C5A572] font-black mb-3">Hoje, no lote de abertura:</p>
                        <p className="text-4xl md:text-6xl text-green-400 font-black tracking-tighter drop-shadow-[0_0_20px_rgba(34,197,94,0.4)] mb-2">R$ 697</p>
                        <p className="text-base md:text-lg text-white font-bold mb-3">à vista</p>
                        <p className="text-sm md:text-base text-slate-400 font-light mb-4">ou <strong className="text-white">12x de R$ 69,82</strong> sem juros</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5">
                           <Flame className="w-3.5 h-3.5 text-red-400" />
                           <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400">Lote limitado · próximo lote sobe pra R$ 1.197</span>
                        </div>
                     </div>

                     <div className="mt-4">
                        <RegistrationForm btnText="QUERO MINHA VAGA NO LOTE DE ABERTURA" />
                     </div>
                     <div className="mt-6 text-center">
                        <p className="text-[11px] text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
                           🛡️ <strong className="text-slate-300 uppercase tracking-wider text-[10px]">Garantia de 7 dias:</strong> Você entra, acessa todos os módulos, participa da Sessão 1:1, conhece o War Room. Se não for pra você, devolvemos 100%. Risco zero.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 12 — GARANTIA                                              */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden border-b border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/10 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center p-8 md:p-12 rounded-3xl border-2 border-green-500/40 bg-gradient-to-br from-green-900/20 via-[#0a0f25] to-[#070514] shadow-[0_0_80px_rgba(34,197,94,0.2)]">

                        <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto shrink-0">
                           <div className="absolute inset-0 rounded-full border-[3px] border-green-500/60 bg-green-500/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                              <div className="text-center">
                                 <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-green-400 mb-1">Garantia</div>
                                 <div className="text-4xl md:text-5xl font-black text-white">7</div>
                                 <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-green-400 mt-1">dias</div>
                              </div>
                           </div>
                           <div className="absolute -inset-2 rounded-full border border-green-500/20 animate-pulse pointer-events-none"></div>
                        </div>

                        <div>
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-green-400 mb-3 flex items-center gap-2">
                              🛡️ Garantia de 7 dias · Risco zero pra você
                           </p>
                           <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-6">
                              Você entra hoje.<br className="hidden md:block"/>
                              <span className="text-green-400">E testa tudo, sem risco.</span>
                           </h3>

                           <ul className="space-y-3 mb-6">
                              {[
                                 'Acessa todos os módulos do método H.AI',
                                 'Participa da Sessão 1:1 com o Rodrigo',
                                 'Entra no War Room',
                                 'Conhece a comunidade fechada'
                              ].map((item, i) => (
                                 <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0 mt-0.5">
                                       <Check className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-slate-200 text-base md:text-lg font-light leading-relaxed">{item}</span>
                                 </li>
                              ))}
                           </ul>

                           <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
                              <p className="text-white font-bold text-lg md:text-xl leading-snug">
                                 Se nos primeiros 7 dias achar que não é pra você, manda um e-mail. <span className="text-green-400">Devolvemos 100% do valor pago.</span>
                              </p>
                              <p className="text-slate-400 text-xs md:text-sm font-light italic mt-3 leading-relaxed">
                                 Sem pergunta, sem burocracia, sem ressentimento. <strong className="text-white not-italic">O risco é nosso. Não seu.</strong>
                              </p>
                           </div>
                        </div>

                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 13 — URGÊNCIA (vagas limitadas 38/50)                      */}
            {/* ============================================================== */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-b border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>

               <div className="max-w-4xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
                           <Flame className="w-4 h-4 text-red-400" />
                           <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-red-400">Urgência real</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           Lote de abertura.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#C5A572]">Vagas limitadas.</span>
                        </h2>
                     </div>
                  </Reveal>

                  {/* Barra de progresso */}
                  <Reveal delay={150}>
                     <div className="mb-10 p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#070514] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-4">
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#C5A572]">Vagas preenchidas</p>
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400"><span className="text-white">38</span> / 50</p>
                        </div>
                        <div className="relative h-4 rounded-full bg-white/5 overflow-hidden border border-white/10">
                           <div className="h-full bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572] rounded-full shadow-[0_0_20px_rgba(197,165,114,0.5)]" style={{ width: '76%' }}></div>
                        </div>
                        <p className="text-center text-base md:text-lg text-white font-bold mt-5">
                           Restam <span className="text-[#C5A572]">12 vagas</span> no lote de abertura.
                        </p>
                     </div>
                  </Reveal>

                  {/* Diferencial de preço */}
                  <Reveal delay={300}>
                     <div className="grid md:grid-cols-2 gap-5">
                        <div className="p-6 md:p-7 rounded-2xl border-2 border-green-500/40 bg-green-500/5 backdrop-blur-md text-center">
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-green-400 mb-2">Hoje</p>
                           <p className="text-3xl md:text-5xl font-black text-white mb-1">R$ 697</p>
                           <p className="text-xs md:text-sm text-slate-400 font-light">12x R$ 69,82 sem juros</p>
                        </div>
                        <div className="p-6 md:p-7 rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-md text-center opacity-70">
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400 mb-2">Próximo lote</p>
                           <p className="text-3xl md:text-5xl font-black text-slate-300 mb-1 line-through decoration-red-500/40">R$ 1.197</p>
                           <p className="text-xs md:text-sm text-slate-500 font-light">+R$ 500 quando esgotar</p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={500}>
                     <p className="text-center text-base md:text-lg text-slate-200 font-light italic mt-10 max-w-2xl mx-auto">
                        Quando essas 12 vagas esgotarem, o lote de abertura encerra.<br/>
                        <strong className="text-white not-italic">Próximo lote sobe automaticamente.</strong>
                     </p>
                  </Reveal>
               </div>
            </section>

            {/* ============================================================== */}
            {/* BLOCO 14 — CTA FINAL (com tensão + filtro Rodrigo)               */}
            {/* ============================================================== */}
            <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-gradient-to-b from-[#050410] to-[#020617] overflow-hidden border-t border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C5A572]/10 blur-[160px] rounded-full pointer-events-none"></div>
               <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>

               <div className="max-w-4xl mx-auto relative z-10">
                  <Reveal>
                     <p className="text-[#C5A572] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 text-center">A DECISÃO</p>
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white text-center uppercase tracking-tighter leading-[0.95] mb-10">
                        O mercado já mudou.<br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">A questão é se sua empresa acompanha.</span>
                     </h2>
                  </Reveal>

                  <Reveal delay={200}>
                     <div className="space-y-5 text-base md:text-lg text-slate-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                        <p>
                           Você leu até aqui porque alguma coisa fez sentido. Talvez você já sinta que está crescendo no <strong className="text-white">limite da sua própria energia.</strong>
                        </p>
                        <p>
                           Talvez já tenha visto concorrente menor te ultrapassando. Talvez já saiba que IA não é mais opcional.
                        </p>
                        <p className="text-lg md:text-xl text-white font-bold pt-4 border-t border-white/10">
                           A Imersão H.AI existe pra empresário que decidiu parar de operar no limite e começar a <span className="text-[#C5A572]">operar com alavanca.</span>
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={400}>
                     <div className="text-center mb-8">
                        <p className="text-[10px] md:text-xs text-[#C5A572] font-black uppercase tracking-[0.3em] mb-2">Seu investimento:</p>
                        <p className="text-3xl md:text-5xl font-black text-white mb-1">12x <span className="text-[#C5A572]">R$ 69,82</span></p>
                        <p className="text-sm md:text-base text-slate-400 font-light">ou R$ 697 à vista · Garantia 7 dias · Acesso imediato</p>
                     </div>
                  </Reveal>

                  <Reveal delay={550}>
                     <div className="flex flex-col items-center gap-6 mb-14">
                        <button onClick={scrollToOffer} className="relative overflow-hidden group px-10 md:px-14 py-5 md:py-6 rounded-2xl bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572] shadow-[0_0_60px_rgba(197,165,114,0.4)] hover:shadow-[0_0_100px_rgba(197,165,114,0.7)] hover:scale-105 transition-all text-white font-black uppercase tracking-widest text-sm md:text-base flex items-center gap-3">
                           QUERO ESCALAR MINHA EMPRESA COM IA — R$ 697
                           <ArrowRight className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/5">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-green-400">🛡️ Garantia 7 dias · Acesso imediato após pagamento</span>
                        </div>
                     </div>
                  </Reveal>

                  {/* Assinatura Rodrigo */}
                  <Reveal delay={700}>
                     <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-4 p-5 rounded-2xl border border-[#C5A572]/30 bg-[#C5A572]/5 backdrop-blur-md">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A572] to-[#6B2D8B] flex items-center justify-center text-slate-950 font-black text-lg">RB</div>
                           <div className="text-left">
                              <p className="text-white font-bold text-base">Rodrigo Braga</p>
                              <p className="text-[#C5A572] text-xs uppercase tracking-widest font-bold mt-0.5">Fundador PulsarH.AI</p>
                           </div>
                        </div>
                     </div>
                  </Reveal>

                  {/* Filtro final */}
                  <Reveal delay={850}>
                     <div className="max-w-3xl mx-auto p-8 rounded-3xl border-l-4 border-[#C5A572] bg-white/[0.02] backdrop-blur-md">
                        <p className="text-slate-300 text-base md:text-lg font-light italic leading-relaxed mb-4">
                           {`"`}Última coisa: se você procura atalho fácil, robozinho mágico que substitui funcionário, fórmula pronta sem trabalho — <strong className="text-white not-italic">sai dessa página.</strong> Aqui é trabalho de verdade, com método de verdade, pra empresário que quer construir empresa de verdade.{`"`}
                        </p>
                        <p className="text-slate-200 text-base md:text-lg font-light italic leading-relaxed">
                           {`"`}Se for isso que você quer — clica aí em cima e <strong className="text-[#C5A572] not-italic">a gente se vê do outro lado.</strong>{`"`}
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 px-6 bg-[#020617] text-center border-t border-white/5 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#6B2D8B]/40 to-transparent"></div>
               <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
                  <img
                     src="https://storage.googleapis.com/msgsndr/mUZEjZcfs8vJQPN3EnCF/media/69655adcf88d5a6b434054ac.png"
                     alt="Logo PulsarH"
                     className="h-8 w-auto object-contain"
                  />
                  <span className="font-heading font-black uppercase tracking-tight text-white">PulsarH<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">.AI</span></span>
               </div>
               <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">&copy; {new Date().getFullYear()} Todos os direitos reservados. PulsarH.AI - Rodrigo Braga.</p>
            </footer>
         </main>

      </div>
   );
}
