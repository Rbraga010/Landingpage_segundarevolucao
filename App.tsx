
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
                  message: "A página do Workshop LHA + IA está totalmente configurada e pronta para o disparo.",
                  url: window.location.href
               })
            });
         } catch (e) {
            console.warn("⚠️ Falha ao enviar sinal de prontidão.");
         }
      };
      signalReady();
   }, []);

   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
   const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

   const faqs = [
      { question: "📹 O workshop será ao vivo ou gravado?", answer: "O conteúdo foi gravado com qualidade profissional e foco total em aplicação prática. Você assiste no seu ritmo, quantas vezes quiser." },
      { question: "⏳ Por quanto tempo terei acesso?", answer: "Você terá acesso completo por 12 meses, com possibilidade de rever e aplicar no seu tempo e no ritmo da sua operação." },
      { question: "💬 Posso começar agora?", answer: "Sim. O acesso é liberado imediatamente após a confirmação do pagamento. Você recebe login por e-mail em poucos minutos." },
      { question: "💰 E se eu não gostar?", answer: "Você tem 7 dias de garantia incondicional. Se não fizer sentido pra você, devolvemos 100% do valor. Sem burocracia." },
      { question: "📈 Preciso ter equipe grande para aplicar?", answer: "Não. O conteúdo é pensado tanto para quem lidera equipes pequenas quanto para quem já lidera gestores. O foco é estrutura, não tamanho." },
      { question: "🧠 Tem alguma parte que ensina sobre IA na liderança?", answer: "Sim. Você vai acessar o Kit de IA Decisiva, com prompts e orientações práticas pra usar IA em decisões estratégicas, liderança e gestão de tempo." },
      { question: "👥 Posso indicar para meu time?", answer: "Sim. Inclusive, muitos gestores usam o conteúdo como base para desenvolver novos líderes internamente." },
      { question: "📄 Vai ter certificado?", answer: "Sim. Após completar o workshop, você poderá emitir seu certificado digital de participação com reconhecimento do Instituto PulsarH." }
   ];

   const testimonials = [
      { name: "Jussara Silva", role: "CLARO", text: "Passei a liderar outros líderes com muito mais clareza e segurança." },
      { name: "Junior Lemos", role: "ARRDMKT", text: "Conteúdo direto, profissional e totalmente conectado à realidade." },
      { name: "Eduardo Ramos", role: "Grupo Boticário", text: "Trouxe maturidade para decisões que antes eram só experiênca." },
      { name: "Carlos Menezes", role: "Magazine Luiza", text: "Clareza imediata sobre onde eu estava travando the time." },
      { name: "Mariana Goes", role: "C&A", text: "Consegui sair mais da execução e focar no estratégico." },
      { name: "Rafael Pires", role: "Assaí Atacadista", text: "Aplicável desde o dia seguinte. Mudou a dinâmica da liderança." },
      { name: "Juliana Costa", role: "Grupo Carrefour Brasil", text: "Mais governança, menos improviso. Impacto real no time." },
      { name: "Patrícia Almeida", role: "Hering", text: "Desenvolvi líderes sem centralizar tudo em mim." },
      { name: "Marcos Vinícius", role: "Pão de Açúcar", text: "Decisões mais claras e times mais autônomos." },
      { name: "Maria Clara", role: "Renner", text: "Não é motivação. É método aplicado à liderança real." }
   ];

   const audience = [
      { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", text: "Estão sobrecarregados com decisões operacionais" },
      { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", text: "Precisam formar líderes de verdade, não apenas executores caros" },
      { image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", text: "Querem sair do “modo incêndio” e voltar ao foco estratégico" },
      { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", text: "Já perceberam que não escalam sem formar sucessores" },
      { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", text: "Sabem que IA é necessária — mas querem usar com critério e responsabilidade" },
      { image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800", text: "Desejam reduzir riscos emocionais, jurídicos e financeiros na liderança" },
   ];

   const journeyModules = [
      { title: "Base de Consciência", desc: "Onde sua liderança realmente trava — e por que isso passa despercebido.", icon: Eye },
      { title: "Diagnóstico Profundo", desc: "Leitura real da maturidade, riscos e pontos cegos da sua atuação como líder.", icon: Activity },
      { title: "Caminho Prático", desc: "O que muda imediatamente: estrutura, foco e rituais essenciais.", icon: Route },
      { title: "Impulso", desc: "Como gerar movimento real no time e sair do ciclo de exaustão.", icon: Zap },
      { title: "Ferramentas de IA Aplicada", desc: "Decisões mais rápidas, cobranças mais claras e liderança mais leve.", icon: Cpu },
      { title: "Fechamento Estratégico", desc: "Consolidação, plano de ação e protocolo prático de implementação.", icon: Award }
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
               <span className="font-heading font-bold text-lg tracking-tight uppercase text-white">PulsarH</span>
            </div>
            <button onClick={scrollToOffer} className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
               Workshop PulsarH
            </button>
         </nav>

         <main className="relative z-10">

            {/* --- SECTION 1: HERO --- */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 lg:px-12">
               <div className="max-w-4xl mx-auto w-full text-center">
                  <Reveal>
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Workshop Liderança Humanizada + IA</span>
                     </div>
                  </Reveal>
                  <Reveal delay={100}>
                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-8 uppercase">
                        Como formar líderes, instalar governança e decidir melhor — sem centralizar tudo em você.
                     </h1>
                  </Reveal>
                  <Reveal delay={200}>
                     <h2 className="text-xl md:text-2xl font-light text-slate-400 leading-relaxed mb-10 max-w-3xl mx-auto border-l-0 md:border-l-4 border-primary/50 md:pl-6">
                        Aprenda como sair da dependência operacional <span className="italic font-normal text-white">sem perder o controle e o comando</span> com método, governança e IA aplicada.
                     </h2>
                  </Reveal>
                  <Reveal delay={300}>
                     <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button onClick={scrollToOffer} className="btn-neon w-full md:w-auto px-12 py-6 text-sm md:text-base tracking-widest gap-3">
                           🔵 QUERO BLINDAR MINHA EMPRESA
                           <ArrowRight className="w-5 h-5 relative z-10" />
                        </button>
                     </div>
                  </Reveal>
                  <Reveal delay={400}>
                     <div className="flex flex-wrap justify-center gap-4 mt-12 opacity-60">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                           <span className="text-[10px] md:text-[12px] uppercase tracking-widest text-white font-bold">100% online • direto ao ponto • assista onde quiser</span>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- TARGET AUDIENCE --- */}
            <section className="relative py-16 px-6 lg:px-12 bg-background border-t border-white/5">
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight">
                           Esse workshop é para empresários, gestores e executivos que:
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"></div>
                     </div>
                  </Reveal>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                     {audience.map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="glass-card p-0 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group h-full flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                              <div className="h-48 relative overflow-hidden group-hover:h-44 transition-all duration-500">
                                 <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-0"></div>
                                 <img src={item.image} alt="Público-alvo" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0" />
                                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20"></div>
                              </div>
                              <div className="p-8 flex-1 flex items-start text-left relative z-30 -mt-6">
                                 <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-4 shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                                 <p className="text-base text-white/90 font-light leading-relaxed group-hover:text-white transition-colors uppercase tracking-tight">
                                    {item.text}
                                 </p>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>
                  <div className="mt-16 text-center">
                     <button onClick={scrollToOffer} className="btn-neon px-8 py-3 text-xs tracking-widest inline-flex items-center gap-2 mx-auto">
                        🔵 ESSE WORKSHOP É PARA MIM <ArrowRight className="w-4 h-4 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- CONTEXT --- */}
            <section className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden">
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                  <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
               </div>
               <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-24">
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                        A maioria dos líderes não é mal-intencionada. <br />
                        <span className="text-text-muted">Está pouco preparada para sustentar decisões em ambientes mais complexos.</span>
                     </h2>
                     <p className="text-xl text-blue-400 font-medium tracking-wide max-w-3xl mx-auto mb-10">
                        Foram promovidos por tempo de casa, carisma ou performance individual — mas raramente passaram por uma formação estruturada de liderança.
                     </p>
                     <p className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4">O reflexo aparece rápido:</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                     {[
                        { icon: UserMinus, text: "Times exaustos" },
                        { icon: Zap, text: "Decisões reativas" },
                        { icon: ShieldAlert, text: "Clima instável" },
                        { icon: BarChart4, text: "Crescimento travado" },
                     ].map((item, i) => (
                        <div key={i} className="glass-card p-8 rounded-xl flex flex-col items-center gap-6 text-center hover:border-blue-500/50 transition-colors duration-300 group border-white/5 bg-slate-900/40">
                           <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <p className="text-white font-bold text-lg uppercase tracking-wide">{item.text}</p>
                        </div>
                     ))}
                  </div>
                  <div className="text-center mt-20">
                     <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto border-blue-500/30 bg-blue-900/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px]"></div>
                        <p className="text-2xl md:text-4xl text-white font-bold leading-relaxed mb-6">
                           E, no fim, <br className="hidden md:block" />
                           <span className="text-blue-400 font-bold">tudo continua passando por você.</span>
                        </p>
                        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                           Neste workshop, você aprende como romper esse ciclo com método, clareza e ferramentas práticas — sem perder clareza, autoridade ou humanidade na liderança.
                        </p>
                        <button onClick={scrollToOffer} className="btn-neon px-8 py-4 text-xs md:text-sm tracking-widest inline-flex items-center gap-3 mx-auto">
                           🔵 QUERO APRENDER COMO MUDAR ESSE CENÁRIO <ArrowRight className="w-4 h-4 relative z-10" />
                        </button>
                     </div>
                  </div>
               </div>
            </section>

            {/* --- METHODOLOGY --- */}
            <section className="py-32 px-6 lg:px-12 relative bg-background">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-1 lg:order-1 text-left">
                     <Reveal>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                           Este não é mais um <br />
                           <span className="text-neon">curso sobre liderança.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed max-w-lg">
                           É uma intervenção prática com método, diagnóstico e aplicação direta para:
                        </p>
                     </Reveal>
                  </div>
                  <div className="order-2 lg:order-2">
                     <div className="grid sm:grid-cols-2 gap-6">
                        {[
                           { icon: UserMinus, text: "Reduzir a dependência da operação em você" },
                           { icon: Target, text: "Conectar decisões de liderança aos indicadores certos" },
                           { icon: Network, text: "Implantar uma governança simples, moderna e funcional" },
                           { icon: Brain, text: "Usar a IA como ferramenta executiva, not como distração" },
                        ].map((item, i) => (
                           <Reveal key={i} delay={i * 100}>
                              <div className="relative overflow-hidden rounded-xl p-[1px] group h-full">
                                 <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#0f172a_50%,#22d3ee_100%)]" />
                                 <div className="relative h-full bg-slate-950 rounded-xl p-8 flex flex-col gap-6 items-start border border-slate-800/50 hover:bg-slate-900 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                                       <item.icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-lg text-white font-medium leading-snug">{item.text}</p>
                                 </div>
                              </div>
                           </Reveal>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* --- DIFFERENCE & JOURNEY --- */}
            <section className="py-32 px-6 lg:px-12 relative bg-slate-950 overflow-hidden border-y border-white/5">
               <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
               <div className="max-w-7xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-6">
                           O QUE FAZ ESSE WORKSHOP <br className="hidden md:block" /> SER <span className="text-primary">DIFERENTE</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-4xl mx-auto italic">
                           Não é motivação disfarçada de conteúdo. <br className="hidden md:block" />
                           É método testado, liderança treinável e inteligência aplicada na rotina real.
                        </p>
                     </div>
                  </Reveal>
                  <div className="grid lg:grid-cols-3 gap-8 mb-32">
                     {[
                        {
                           icon: Brain,
                           title: "📦 1 — Liderança Humanizada Aplicada (LHA)",
                           desc: "Você não precisa ser “gente boa”. Precisa aprender a:",
                           items: ["Escutar de verdade", "Corrigir sem humilhar", "Acompanhar sem sufocar"],
                           footer: "Treinável. Prático. E 100% aplicável. Sem mimimi."
                        },
                        {
                           icon: Zap,
                           title: "📦 2 — Inteligência Artificial funcional",
                           desc: "Chega de IA só pra fazer post bonito. Use pra:",
                           items: ["Tomar decisões mais rápidas", "Padronizar rituais de time", "Reduzir ruídos em feedbacks"],
                           footer: "A IA como braço direito, not distração."
                        },
                        {
                           icon: LayoutGrid,
                           title: "📦 3 — Governança que Destrava Escala",
                           desc: "Liderança sem governança é reatividade disfarçada. Instale:",
                           items: ["Rituais simples e modernos", "Indicadores que importam", "Regras claras pra delegar"],
                           footer: "Resultado? Autonomia sem caos atrás de método replicável"
                        }
                     ].map((box, i) => (
                        <Reveal key={i} delay={i * 150}>
                           <div className="glass-card p-10 rounded-2xl h-full flex flex-col border-white/10 hover:border-primary/40 transition-all group bg-slate-900/40">
                              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:scale-110 transition-transform">
                                 <box.icon className="w-8 h-8" />
                              </div>
                              <h4 className="text-xl font-heading font-bold text-white mb-6 uppercase leading-snug">{box.title}</h4>
                              <p className="text-slate-400 mb-6 font-medium">{box.desc}</p>
                              <ul className="space-y-3 mb-8 flex-1">
                                 {box.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white/90">
                                       <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                                       {item}
                                    </li>
                                 ))}
                              </ul>
                              <p className="pt-6 border-t border-white/5 text-primary font-bold text-sm uppercase tracking-wider italic">
                                 {box.footer}
                              </p>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  {/* STATIC TIMELINE SECTION */}
                  <div className="text-center">
                     <Reveal>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                           <Compass className="w-4 h-4 animate-spin-slow" />
                           Trilha de Evolução
                        </div>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-white uppercase mb-6">
                           SUA JORNADA DENTRO DO WORKSHOP
                        </h3>
                        <p className="text-lg text-slate-400 font-light max-w-3xl mx-auto mb-20 leading-relaxed">
                           Você não vai apenas assistir. Vai avançar por etapas claras, com método e aplicação prática. <br className="hidden md:block" />
                           A trilha que conduz sua liderança do desgaste à estrutura:
                        </p>
                     </Reveal>

                     {/* STATIC HORIZONTAL TIMELINE */}
                     <div className="relative max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar pb-12">
                        <div className="flex min-w-[1000px] lg:min-w-0 lg:grid lg:grid-cols-6 gap-6 relative">
                           {/* Line connecting the dots */}
                           <div className="absolute top-10 left-10 right-10 h-[2px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 hidden lg:block z-0"></div>

                           {journeyModules.map((m, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-6 relative z-10 px-4">
                                 {/* Brilliant/Glowing Indicator with Icon */}
                                 <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-primary/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(34,211,238,0.1)] group cursor-default">
                                    <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-20"></div>
                                    <div className="absolute inset-0 rounded-full border-2 border-primary opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                                    <m.icon className="w-8 h-8 text-primary drop-shadow-glow" />
                                 </div>

                                 {/* Step Content */}
                                 <div className="text-center group-hover:translate-y-[-4px] transition-transform">
                                    <h5 className="text-white font-bold text-lg mb-3 leading-tight uppercase tracking-tight min-h-[50px] flex items-center justify-center">{m.title}</h5>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed max-w-[180px] mx-auto">{m.desc}</p>
                                 </div>

                                 <div className="h-1 w-8 bg-primary/20 rounded-full mt-2 lg:hidden"></div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <Reveal delay={300}>
                        <div className="mt-20 flex flex-col items-center text-center">
                           <p className="text-xl md:text-2xl text-white font-bold leading-relaxed mb-10 max-w-4xl">
                              <span className="text-primary">Tudo 100% aplicável.</span> Sem teoria de palco. Sem enrolação. <br className="hidden md:block" />
                              Você entra com dúvidas. Sai com método, visão e prontidão para escalar.
                           </p>
                           <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest gap-3 mx-auto">
                              🔵 QUERO ACESSAR AGORA
                              <ArrowRight className="w-5 h-5 relative z-10" />
                           </button>
                        </div>
                     </Reveal>
                  </div>
               </div>
            </section>

            {/* --- SECTION: OFFER (RETAIL STYLE REWORK) --- */}
            <section id="section-offer" className="py-24 px-6 lg:px-12 relative overflow-hidden bg-slate-950 border-y border-primary/20 scroll-mt-28">
               <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

               <div className="max-w-7xl mx-auto relative z-10">

                  <div className="text-center mb-16">
                     <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">ACESSO LIBERADO</p>
                     <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight uppercase mb-4">
                        Oportunidade única para executivos e líderes
                     </h2>
                     <p className="text-slate-400 text-lg md:text-xl font-light italic">Vagas prioritárias para quem quer estruturar liderança e governança com método — não improviso.</p>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">

                     {/* LEFT: VALUE STACK (Retail Style) */}
                     <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Main Deliverables */}
                        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                           <h3 className="text-2xl font-heading font-black text-white italic uppercase mb-2 flex items-center gap-3">
                              ⚡ IMPACTO IMEDIATO
                           </h3>
                           <p className="text-slate-400 text-sm mb-8 font-light">O que você sai sabendo fazer na prática</p>

                           <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                              {[
                                 { title: "Reduzir a dependência da operação em você", icon: Users },
                                 { title: "Estruturar liderança com método treinável", icon: BookOpen },
                                 { title: "Conectar decisões aos KPIs reais do negócio", icon: BarChart },
                                 { title: "Criar rotina de governança que sustenta escala", icon: Zap },
                                 { title: "Sensibilizar, engajar e educar o time", icon: Target },
                                 { title: "Tomar decisões críticas com apoio funcional da IA", icon: Cpu }
                              ].map((item, i) => (
                                 <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                       <item.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                       <p className="text-white font-bold text-base leading-tight">{item.title}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* BONUSES (High Contrast) */}
                        <div className="relative bg-gradient-to-br from-slate-900 to-black border border-primary/40 rounded-2xl p-6 sm:p-8 overflow-hidden group shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                           {/* Animated Shine Effect */}
                           <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>

                           <div className="mb-6 border-b border-white/10 pb-6">
                              <h3 className="text-xl font-heading font-black text-primary uppercase flex items-center gap-2 mb-1">
                                 🎁 ACESSO VIP — BÔNUS EXCLUSIVOS DE LANÇAMENTO
                              </h3>
                              <p className="text-slate-500 text-xs font-light">Liberados para garantir que o aprendizado vire ação real.</p>
                           </div>

                           <ul className="space-y-6">
                              {[
                                 {
                                    name: "🔥 Bônus 1 — Mentoria 1:1 com Rodrigo Braga",
                                    desc: "Sessão individual para leitura do seu cenário, correção de gargalos e direcionamento estratégico.",
                                    price: "R$ 600"
                                 },
                                 {
                                    name: "🔥 Bônus 2 — Kit IA Decisiva para Gestores",
                                    desc: "Prompts prontos para decisão, feedback, cobrança, alinhamento e rituais de liderança.",
                                    price: "R$ 300"
                                 },
                                 {
                                    name: "🔥 Bônus 3 — Diagnóstico PulsarH.AI Scan™",
                                    desc: "Leitura estrutural de dependência, maturidade do time e riscos ocultos da operação.",
                                    price: "R$ 99"
                                 }
                              ].map((item, i) => (
                                 <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between group/li gap-3 sm:gap-0 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-start gap-4 w-full sm:w-auto">
                                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                          <Check className="w-3.5 h-3.5 text-primary" />
                                       </div>
                                       <div>
                                          <span className="block text-white font-bold text-sm sm:text-base leading-tight">{item.name}</span>
                                          <span className="block text-slate-500 text-[11px] mt-1">{item.desc}</span>
                                       </div>
                                    </div>
                                    <div className="text-left sm:text-right w-full sm:w-auto pl-10 sm:pl-0">
                                       <span className="block text-[10px] text-slate-500 line-through decoration-slate-600 font-mono">{item.price}</span>
                                       <span className="block text-xs sm:text-sm text-green-400 font-bold uppercase tracking-widest">Incluso</span>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* PRICE ANCHOR */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="text-center md:text-left">
                              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Valor total em bônus</p>
                              <p className="text-xl text-slate-600 font-bold line-through decoration-slate-700 font-mono">R$ 1.000</p>
                              <p className="text-[10px] text-green-500 font-black uppercase tracking-widest mt-1">Incluído hoje: R$ 0</p>
                           </div>
                           <div className="h-px w-full md:h-12 md:w-px bg-white/10"></div>
                           <div className="text-center md:text-right">
                              <p className="text-primary text-sm uppercase tracking-widest font-black mb-1">💳 INVESTIMENTO NO WORKSHOP</p>
                              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter shadow-sm">
                                 R$ 297<span className="text-2xl text-slate-500 font-medium">,00</span>
                              </p>
                              <p className="text-[10px] text-slate-400 font-light mt-2 italic">Pagamento único • 12 meses de acesso completo</p>
                              <p className="text-[10px] text-amber-400 font-black uppercase tracking-wider mt-1">Oferta por tempo limitado. Vagas limitadas.</p>
                           </div>
                        </div>

                     </div>

                     {/* RIGHT: CAPTURE FORM (Sticky) */}
                     <div className="lg:col-span-5 relative">
                        <div className="sticky top-24 bg-slate-900 border border-primary/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.15)] h-full lg:h-auto flex flex-col">
                           <div className="absolute -top-3 -right-3 z-20">
                              <div className="bg-green-500 text-slate-950 font-black text-[10px] md:text-xs px-3 py-2 rounded-lg shadow-lg md:rotate-3 uppercase tracking-wider text-center max-w-[200px] md:max-w-none ml-auto">
                                 CONDIÇÃO ESPECIAL DE LANÇAMENTO
                              </div>
                           </div>
                           {/* Componente do Formulário */}
                           <RegistrationForm btnText="🔵 INSCREVER-ME AGORA" />

                           <div className="mt-6 pt-6 border-t border-white/5">
                              <div className="flex items-center justify-center gap-4 opacity-20 grayscale hover:opacity-40 transition-all duration-300">
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                 <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo.png" alt="Pix" className="h-6 invert" />
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-[#020617] border-b border-white/5 overflow-hidden relative">
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none mix-blend-overlay"></div>
               <div className="w-full relative z-10">
                  <Reveal>
                     <div className="text-center mb-16 px-6">
                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                           💬 Quem participou sentiu a diferença na prática
                        </h3>
                        <p className="text-xl text-primary font-medium tracking-wide">
                           Mais clareza na liderança. Menos improviso. Decisões mais seguras.
                        </p>
                     </div>
                  </Reveal>
                  <div className="relative w-full overflow-hidden mb-16">
                     <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none"></div>
                     <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none"></div>
                     <div className="flex w-max animate-scroll hover:[animation-play-state:paused] group">
                        {[...testimonials, ...testimonials].map((t, i) => (
                           <div key={i} className="w-[300px] md:w-[400px] mx-3 md:mx-5 p-6 md:p-8 rounded-2xl border border-primary/20 bg-slate-900/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group/card shrink-0">
                              <div className="mb-4 md:mb-6">
                                 <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex gap-1">
                                       {[1, 2, 3, 4, 5].map(star => (
                                          <svg key={star} className="w-4 h-4 text-cyan-400 fill-cyan-400" viewBox="0 0 20 20">
                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                       ))}
                                    </div>
                                    <Quote className="w-8 h-8 text-primary/20 group-hover/card:text-primary/40 transition-colors" />
                                 </div>
                                 <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed">"{t.text}"</p>
                              </div>
                              <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-slate-950 font-bold text-sm">
                                    {t.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-white font-bold text-base">{t.name}</p>
                                    <p className="text-cyan-400 text-xs uppercase tracking-widest font-bold mt-0.5">{t.role}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="text-center px-6">
                     <p className="text-slate-400 text-lg mb-8 font-light italic">Junte-se a centenas de líderes que transformaram sua gestão.</p>
                     <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest gap-3 mx-auto">
                        🔵 QUERO TER ESSE NÍVEL DE CLAREZA NA MINHA LIDERANÇA
                        <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- FOR WHOM? --- */}
            <section className="py-32 px-6 lg:px-12 relative bg-background border-b border-white/5">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-6">
                           ESSA FORMAÇÃO É PRA QUEM?
                        </h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
                           Pra quem sente o peso de liderar sem ter sido preparado. <br className="hidden md:block" />
                           Pra quem foi jogado no campo e teve que aprender tudo na marra.
                        </p>
                     </div>
                  </Reveal>
                  <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-16">
                     <Reveal delay={100} className="h-full">
                        <div className="glass-card p-10 rounded-2xl h-full border-primary/20 bg-primary/5 flex flex-col">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                 <CheckCircle2 className="w-7 h-7" />
                              </div>
                              <h3 className="text-2xl font-heading font-bold text-white">É pra você, se:</h3>
                           </div>
                           <ul className="space-y-6 flex-1">
                              {[
                                 "Já lidera pessoas, mas sabe que está improvisando",
                                 "Precisa dar feedbacks difíceis, mas trava pra não criar conflito",
                                 "Se sente culpado por cobrar e esgotado por não cobrar",
                                 "Sabe que seus líderes “ajudam”, mas não sustentam nada sozinhos",
                                 "Percebe que tudo ainda gira em torno de você — e isso está te matando",
                                 "Quer formar um time que decida, entregue e escale com clareza"
                              ].map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                                    <span className="text-white/90 text-lg font-light leading-snug">{item}</span>
                                 </li>
                              ))}
                           </ul>
                           <div className="mt-10 pt-8 border-t border-white/10">
                              <p className="text-slate-300 italic font-medium">
                                 Você não quer ser um “chefe legal”. Quer ser um líder respeitado — sem se desumanizar. <br />
                                 E essa formação vai te mostrar como fazer isso com método.
                              </p>
                           </div>
                        </div>
                     </Reveal>
                     <Reveal delay={200} className="h-full">
                        <div className="glass-card p-10 rounded-2xl h-full border-white/10 bg-white/5 flex flex-col">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400">
                                 <XCircle className="w-7 h-7" />
                              </div>
                              <h3 className="text-2xl font-heading font-bold text-white">NÃO É PRA VOCÊ, SE:</h3>
                           </div>
                           <ul className="space-y-6 flex-1">
                              {[
                                 "Ainda acha que liderar é “ter carisma” ou “gritar mais alto”",
                                 "Busca frases bonitas, mas foge de rituais, método e estrutura",
                                 "Espera que o time mude sem mudar sua forma de liderar",
                                 "Não está disposto a se olhar no espelho da liderança real",
                                 "Vai terceirizar o resultado pra “falta de tempo”, “perfil do time” ou “o mercado”"
                              ].map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-4">
                                    <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-1" />
                                    <span className="text-white/90 text-lg font-light leading-snug">{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </Reveal>
                  </div>

                  <div className="text-center px-6">
                     <p className="text-white text-xl md:text-2xl font-bold mb-8">Se você se identificou com os pontos acima, este workshop foi desenhado para você.</p>
                     <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest gap-3 mx-auto">
                        SIM, ESSE WORKSHOP É PARA MIM
                        <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- BIO --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-background border-b border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  <div className="relative order-1">
                     <Reveal>
                        <div className="relative z-10">
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-2xl blur-xl -z-10 transform translate-y-4 translate-x-4"></div>
                           <img src="https://storage.googleapis.com/msgsndr/mUZEjZcfs8vJQPN3EnCF/media/693c55bae918008870673d5d.png" alt="Rodrigo Braga" className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
                           <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl border border-primary/20 shadow-xl hidden md:block">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Fingerprint className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="text-white font-bold text-sm">Método L.H.A.</p>
                                    <p className="text-[10px] text-primary uppercase tracking-wider">Criador Oficial</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Reveal>
                  </div>
                  <div className="order-2">
                     <Reveal delay={200}>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                           Rodrigo Braga
                        </h2>
                        <p className="text-primary font-bold tracking-wider uppercase text-sm mb-8 flex items-center gap-2">
                           <div className="w-8 h-[2px] bg-primary"></div>
                           Mentor de Executivos
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                           Ex-executivo da C&A por 21 anos, fundador do Instituto PulsarH e criador do Método L.H.A. (Liderança Humanizada Aplicada). Atua na formação de líderes preparados para sustentar resultados com consciência, consistência e autoridade no cenário real de 2026.
                        </p>
                        <ul className="space-y-6 mb-12">
                           {[
                              "+3.700 líderes formados e treinados",
                              "21 anos de experiência prática em liderança corporativa",
                              "Criador do Método L.H.A., usado por líderes que não aceitam perder espaço para algoritmos, RH despreparado ou modismos"
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                 <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                    <Check className="w-3.5 h-3.5 text-primary" />
                                 </div>
                                 <span className="text-white/90 font-medium">{item}</span>
                              </li>
                           ))}
                        </ul>

                        <div className="pt-4">
                           <p className="text-slate-400 text-sm mb-6 font-light">Aprenda com quem viveu a liderança na prática por mais de duas décadas.</p>
                           <button onClick={scrollToOffer} className="btn-neon px-8 py-4 text-xs tracking-widest gap-3">
                              QUERO APRENDER COM RODRIGO BRAGA
                              <ArrowRight className="w-4 h-4 relative z-10" />
                           </button>
                        </div>
                     </Reveal>
                  </div>
               </div>
            </section>

            {/* --- FAQ --- */}
            <section className="py-32 px-6 lg:px-12 relative bg-background border-t border-white/5">
               <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-heading font-bold text-white mb-16 uppercase tracking-tight">Perguntas Frequentes</h2>
                  <div className="space-y-4 mb-16">
                     {faqs.map((faq, index) => (
                        <div key={index} className="glass-card rounded-lg overflow-hidden border border-white/5 hover:border-primary/30 transition-all">
                           <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-6 text-left group">
                              <span className={`font-bold uppercase tracking-tight text-sm ${openFaqIndex === index ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`}>{faq.question}</span>
                              {openFaqIndex === index ? <Minus className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-slate-600" />}
                           </button>
                           {openFaqIndex === index && (
                              <div className="p-6 pt-0 text-slate-400 font-light text-sm leading-relaxed border-t border-white/5 bg-slate-900/20 text-left">
                                 {faq.answer}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>

                  <div className="px-6">
                     <p className="text-slate-400 text-lg mb-8 font-light italic">Ainda tem alguma dúvida? Comece agora e veja na prática.</p>
                     <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest gap-3 mx-auto">
                        GARANTIR MEU ACESSO AGORA
                        <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 px-6 bg-[#020617] text-center border-t border-white/5 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
               <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
                  <img
                     src="https://storage.googleapis.com/msgsndr/mUZEjZcfs8vJQPN3EnCF/media/69655adcf88d5a6b434054ac.png"
                     alt="Logo PulsarH"
                     className="h-8 w-auto object-contain"
                  />
                  <span className="font-heading font-bold uppercase tracking-tight text-white">PulsarH</span>
               </div>
               <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">&copy; {new Date().getFullYear()} Todos os direitos reservados. PulsarH - Rodrigo Braga.</p>
            </footer>
         </main>

      </div>
   );
}
