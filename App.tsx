
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
   Crown,
   TrendingUp,
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

            {/* --- SECTION 1: HERO (GOLD / TECH REDESIGN) --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
               {/* Ambient Glow for Gold */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

               <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                  
                  {/* LEFT: CENTRALIZED COPY */}
                  <div className="text-center flex flex-col items-center">
                     <Reveal delay={100}>
                        <div className="inline-flex items-center gap-3 px-5 py-2 glass-pill mb-8 border-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all">
                           <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400 drop-shadow-md">O Novo Jogo Corporativo</span>
                        </div>
                     </Reveal>
                     
                     <Reveal delay={200}>
                        <h1 className="text-2xl md:text-2xl lg:text-3xl font-light leading-snug tracking-tight text-slate-300 mb-6 max-w-lg mx-auto">
                           Hoje, líderes disputados no mercado combinam duas forças que a maioria sequer sabem que existe, liderar:
                        </h1>
                     </Reveal>
                     
                     <Reveal delay={300}>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-[#D97706] to-[#9333EA] mb-8 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] tracking-tighter leading-[1.1] pb-2">
                           Gente + IA.gentes
                        </h2>
                     </Reveal>
                     
                     <Reveal delay={400}>
                        <p className="text-lg md:text-xl font-light text-slate-300 leading-relaxed max-w-lg mx-auto mb-8 italic">
                           E enquanto alguns já estão sendo promovidos por isso, <span className="font-medium text-white">outros estão sendo silenciosamente substituídos.</span>
                        </p>
                     </Reveal>
                     
                     <Reveal delay={500}>
                        <p className="text-xs md:text-sm text-yellow-500 uppercase tracking-[0.3em] font-bold mb-8">
                           Você já sabe de qual lado está?
                        </p>
                     </Reveal>
                     
                     <Reveal delay={600}>
                        <button onClick={scrollToOffer} className="relative overflow-hidden group w-full md:w-auto px-8 py-4 rounded-xl border border-yellow-500/50 bg-yellow-500/5 hover:bg-yellow-500/20 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] flex items-center justify-center gap-3">
                           <span className="text-yellow-400 group-hover:text-yellow-300 font-bold uppercase tracking-widest text-xs md:text-sm relative z-10 transition-colors drop-shadow-md">
                              👉 CLIQUE AGORA E ENTRE PARA O LADO QUE SOBE
                           </span>
                           <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-400/20 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                        </button>
                     </Reveal>
                  </div>

                  {/* RIGHT: IMAGE W/ TECH EFFECTS */}
                  <Reveal>
                     <div className="relative group w-full max-w-2xl mx-auto flex justify-center mb-10 lg:mb-0">
                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-amber-300 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative rounded-2xl bg-[#070514]/80 p-2 ring-1 ring-white/10 backdrop-blur-xl w-full">
                           <img src="/hero_new.png" alt="Liderança Tech" className="rounded-xl w-full lg:h-[600px] h-[400px] object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                           {/* Floating elements */}
                           <div className="absolute -top-6 -right-6 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-bounce" style={{animationDuration: '3s'}}>
                              <Zap className="w-10 h-10 text-yellow-400" />
                           </div>
                           <div className="absolute -bottom-6 -left-6 bg-black/60 border border-white/10 px-6 py-4 rounded-xl backdrop-blur-md flex items-center gap-4 shadow-xl">
                              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                              <span className="text-white font-heading font-bold tracking-wider text-sm md:text-base">IA ATIVADA</span>
                           </div>
                        </div>
                     </div>
                  </Reveal>

               </div>
            </section>

            {/* --- SECTION 2: THE TWO FORCES --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#0a0f25] border-t border-yellow-500/10">
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-light text-white tracking-tight">
                           Se você já lidera pessoas ou quer assumir uma posição de liderança:
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-6"></div>
                     </div>
                  </Reveal>
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 justify-center mb-20">
                     {/* Card 1: IA */}
                     <Reveal delay={100}>
                        <div className="glass-card glass-card-purple p-8 md:p-12 border-purple-500/30 bg-purple-900/10 rounded-2xl flex flex-col h-full hover:border-purple-400/50 transition-all duration-300 group shadow-[0_0_40px_rgba(142,45,226,0.1)]">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white glow-fill group-hover:scale-110 transition-transform relative">
                                 <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                                 <Brain className="w-7 h-7 relative z-10" />
                              </div>
                              <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Use a IA para:</h3>
                           </div>
                           <ul className="space-y-6 flex-1">
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Automatizar decisões operacionais que consomem 12h+ por semana</span>
                              </li>
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Multiplicar a produtividade do time sem contratar ninguém</span>
                              </li>
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Criar sistemas que executam enquanto você pensa estratégico</span>
                              </li>
                           </ul>
                        </div>
                     </Reveal>
                     
                     {/* Card 2: Humanizada */}
                     <Reveal delay={200}>
                        <div className="glass-card p-8 md:p-12 border-yellow-500/30 bg-yellow-900/10 rounded-2xl flex flex-col h-full hover:border-yellow-400/50 transition-all duration-300 group shadow-[0_0_40px_rgba(234,179,8,0.1)] relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 blur-[80px]"></div>
                           <div className="flex items-center gap-4 mb-8 relative z-10">
                              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-110 transition-transform relative">
                                 <Users className="w-7 h-7 relative z-10" />
                              </div>
                              <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Use a liderança para:</h3>
                           </div>
                           <ul className="space-y-6 flex-1 relative z-10">
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Manter o time engajado mesmo num cenário dominado por tecnologia</span>
                              </li>
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Evitar resistência interna à implementação de IA</span>
                              </li>
                              <li className="flex gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0" />
                                 <span className="text-slate-300 text-lg">Transformar pressão por resultado em respeito e autoridade real</span>
                              </li>
                           </ul>
                        </div>
                     </Reveal>
                  </div>
                  
                  <Reveal delay={300}>
                     <div className="text-center bg-[#070b1a] border border-white/5 p-10 rounded-2xl max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-yellow-900/20 to-purple-900/20"></div>
                        <p className="text-xl md:text-2xl font-light text-slate-400 italic mb-6 relative z-10">Porque no novo jogo…</p>
                        <p className="text-2xl md:text-3xl text-slate-300 mb-2 relative z-10">não vence quem domina pessoas.</p>
                        <p className="text-2xl md:text-3xl text-slate-300 mb-8 relative z-10">não vence quem domina tecnologia.</p>
                        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 mb-10 drop-shadow-lg relative z-10 uppercase">
                           Vence quem domina os DOIS.
                        </h3>
                        <button onClick={scrollToOffer} className="relative z-10 overflow-hidden group w-full md:w-auto px-8 py-5 rounded-xl border border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/30 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] flex items-center justify-center gap-3 mx-auto">
                           <span className="text-yellow-400 group-hover:text-yellow-300 font-bold uppercase tracking-widest text-xs md:text-sm relative z-10 transition-colors drop-shadow-md">
                              🔵 ENTRE AGORA E COMECE A OPERAR COMO LÍDER HÍBRIDO
                           </span>
                        </button>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 3: THE HYBRID LEADER (REPLACES CONTEXT) --- */}
            <section className="relative py-32 px-6 lg:px-12 bg-[#070b1a] overflow-hidden">
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                  <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-yellow-600/10 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                  <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
               </div>
               <div className="max-w-5xl mx-auto relative z-10 text-center">
                  <Reveal>
                     <p className="text-2xl md:text-4xl text-white font-light leading-snug mb-4">
                        Uma nova revolução já começou dentro das empresas.
                     </p>
                     <p className="text-xl md:text-3xl text-yellow-500 font-bold tracking-widest uppercase mb-16">
                        Silenciosa. Irreversível.
                     </p>
                  </Reveal>
                  
                  <Reveal delay={100}>
                     <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
                        <div className="border border-white/5 bg-slate-900/40 p-8 rounded-2xl flex flex-col items-center">
                           <UserMinus className="w-10 h-10 text-slate-500 mb-4" />
                           <p className="text-slate-400 text-lg uppercase tracking-wide">Ou sabem lidar com pessoas</p>
                        </div>
                        <div className="border border-white/5 bg-slate-900/40 p-8 rounded-2xl flex flex-col items-center">
                           <MonitorPlay className="w-10 h-10 text-slate-500 mb-4" />
                           <p className="text-slate-400 text-lg uppercase tracking-wide">Ou sabem usar tecnologia</p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={200}>
                     <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-10 leading-relaxed">
                        E a maioria dos líderes ainda está presa no modelo antigo... <br/>
                        <span className="text-red-400 font-bold block mt-4">E os dois estão sendo substituídos.</span>
                     </h2>
                     <p className="text-2xl text-slate-300 font-light mb-12">
                        O mercado agora busca um terceiro tipo:
                     </p>
                  </Reveal>

                  <Reveal delay={300}>
                     <div className="glass-card p-10 md:p-16 rounded-3xl max-w-4xl mx-auto border-yellow-500/40 bg-gradient-to-br from-yellow-900/20 to-purple-900/20 relative shadow-[0_0_60px_rgba(234,179,8,0.15)] flex flex-col items-center">
                        <Crown className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" />
                        <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 uppercase tracking-tighter mb-8 text-center drop-shadow-md">
                           O LÍDER HÍBRIDO
                        </h3>
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed max-w-2xl text-center mb-10">
                           Aquele que orquestra gente e <span className="font-bold text-yellow-400">IA.gentes</span> na mesma operação gerando resultados que nenhum dos dois conseguiria sozinho.
                        </p>
                        <button onClick={scrollToOffer} className="relative overflow-hidden group w-full md:w-auto px-10 py-5 rounded-xl border border-yellow-500/50 bg-yellow-500 hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-3">
                           <span className="text-black font-black uppercase tracking-widest text-sm md:text-base relative z-10 transition-colors">
                              🔵 CLIQUE E ENTRE NO NOVO JOGO ANTES QUE SEJA TARDE
                           </span>
                        </button>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 4: IMPACT RUN (REPLACES METHODOLOGY) --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-[#0a0f25] border-t border-purple-500/20">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-1 lg:order-1 text-left">
                     <Reveal>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight uppercase tracking-tight">
                           Em poucas horas de <span className="text-yellow-400">implementação prática</span>, você começa a:
                        </h2>
                     </Reveal>
                     <Reveal delay={100}>
                        <ul className="space-y-4 mb-10 mt-10">
                           <li className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-sm">
                              <Target className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                              <span className="text-slate-200 text-lg md:text-xl font-medium">Reduzir retrabalho invisível que está drenando sua operação</span>
                           </li>
                           <li className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-sm">
                              <Zap className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                              <span className="text-slate-200 text-lg md:text-xl font-medium">Tomar decisões com mais velocidade e menos desgaste mental</span>
                           </li>
                           <li className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-sm">
                              <Award className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                              <span className="text-slate-200 text-lg md:text-xl font-medium">Se posicionar como o tipo de líder que a diretoria promove e o mercado disputa</span>
                           </li>
                        </ul>
                     </Reveal>
                  </div>
                  <div className="order-2 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                     <Reveal delay={200}>
                        <div className="space-y-6 mb-12 w-full">
                           <div className="flex items-center gap-4 bg-black/40 p-4 rounded-lg border border-red-500/20">
                              <X className="w-6 h-6 text-red-500 shrink-0" />
                              <span className="text-slate-300 text-lg uppercase tracking-wider font-medium">Sem precisar virar programador.</span>
                           </div>
                           <div className="flex items-center gap-4 bg-black/40 p-4 rounded-lg border border-red-500/20">
                              <X className="w-6 h-6 text-red-500 shrink-0" />
                              <span className="text-slate-300 text-lg uppercase tracking-wider font-medium">Sem depender do time de TI.</span>
                           </div>
                           <div className="flex items-center gap-4 bg-black/40 p-4 rounded-lg border border-red-500/20">
                              <X className="w-6 h-6 text-red-500 shrink-0" />
                              <span className="text-slate-300 text-lg uppercase tracking-wider font-medium">Sem mais um curso que vira gaveta.</span>
                           </div>
                        </div>
                        <button onClick={scrollToOffer} className="relative overflow-hidden group w-full px-8 py-5 rounded-xl border border-yellow-500/50 bg-yellow-500 hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-3">
                           <span className="text-black font-black uppercase tracking-widest text-sm relative z-10 transition-colors">
                              🔵 COMECE HOJE E VEJA RESULTADOS JÁ NOS PRIMEIROS DIAS
                           </span>
                        </button>
                     </Reveal>
                  </div>
               </div>
            </section>

                        {/* --- SECTION 5: NEW OPERATIONAL SYSTEM --- */}
            <section className="py-32 px-6 lg:px-12 relative bg-slate-950 overflow-hidden border-y border-white/5">
               <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
               <div className="max-w-4xl mx-auto text-center relative z-10">
                  <Reveal>
                     <p className="text-2xl md:text-4xl text-white font-light mb-6">Isso não é sobre aprender ferramenta.</p>
                     <p className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-10 uppercase tracking-tight leading-tight">
                        É sobre instalar um novo sistema operacional de liderança.
                     </p>
                     <div className="glass-card bg-slate-900/40 p-10 md:p-14 rounded-3xl border border-yellow-500/20 mb-12 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-8">Um modelo onde:</p>
                        <div className="flex flex-col gap-6 text-2xl md:text-3xl font-black text-white uppercase tracking-wider items-center">
                           <span className="flex items-center gap-4"><Zap className="text-yellow-400 w-8 h-8" /> IA executa</span>
                           <span className="flex items-center gap-4"><TrendingUp className="text-yellow-400 w-8 h-8" /> Pessoas evoluem</span>
                           <span className="flex items-center gap-4 text-yellow-400"><Crown className="text-yellow-400 w-8 h-8 drop-shadow-md" /> E você controla o jogo</span>
                        </div>
                     </div>
                     <button onClick={scrollToOffer} className="btn-neon px-10 py-5 text-sm md:text-base tracking-widest inline-flex items-center gap-3 mx-auto">
                        🔵 ATIVE ESSE SISTEMA AGORA <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 6: FOR WHOM? (REWORKED) --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-[#0a0f25] border-b border-white/5">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
                  <Reveal>
                     <div className="glass-card bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-3xl h-full flex flex-col shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase mb-8 flex items-center gap-4">
                           Isso aqui é pra você que:
                        </h3>
                        <ul className="space-y-6 flex-1 mb-10">
                           {[
                              "Já lidera pessoas e sente que está ficando para trás na tecnologia",
                              "Sabe que está sobrecarregado e precisa escalar resultado sem trabalhar mais",
                              "Quer ser promovido, reconhecido e disputado — não apenas “mais um gestor”",
                              "Percebe que IA não é opcional… mas não sabe como implementar no time",
                              "É empresário e precisa aprender a liderar Gente + IA.gentes enquanto forma novos líderes dentro da operação",
                              "Atua em RH e precisa preparar líderes e times para a nova era da liderança"
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                 <span className="text-slate-300 text-lg leading-relaxed font-light">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <div className="mt-auto border-t border-white/10 pt-8">
                           <p className="text-slate-400 font-light italic mb-6">Se você leu isso e pensou: <br/> <strong className="text-white text-lg block mt-2 not-italic">“é exatamente isso que está acontecendo comigo”</strong></p>
                           <button onClick={scrollToOffer} className="btn-neon w-full px-6 py-4 text-xs md:text-sm tracking-widest flex items-center justify-center gap-2">
                              🔵 ENTÃO CLIQUE E ENTRE AGORA
                           </button>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={100}>
                     <div className="glass-card bg-red-900/10 border border-red-500/20 p-8 md:p-12 rounded-3xl h-full flex flex-col shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase mb-8 flex items-center gap-4">
                           Isso NÃO é pra você que:
                        </h3>
                        <ul className="space-y-6 flex-1 mb-10">
                           {[
                              "Quer só “entender IA” por curiosidade",
                              "Acha que liderança é só motivar equipe",
                              "Não está disposto a mudar como trabalha",
                              "Procura mais um curso pra consumir e esquecer"
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                 <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                 <span className="text-slate-300 text-lg leading-relaxed font-light">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <div className="mt-auto border-t border-white/10 pt-8">
                           <p className="text-slate-400 font-light italic mb-4">Se você quer conforto…</p>
                           <p className="text-white font-black text-2xl uppercase tracking-widest mb-8">Sai agora.</p>
                           <button onClick={scrollToOffer} className="w-full px-6 py-5 rounded-xl border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                              SE QUER DOMÍNIO, ENTRE AGORA
                           </button>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>\n\n                        {/* --- SECTION 7: OFFER --- */}
            <section id="section-offer" className="py-24 px-6 lg:px-12 relative overflow-hidden bg-background border-y border-white/5 scroll-mt-28">
               <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                     <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6 animate-pulse">ACESSO LIBERADO</p>
                     <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight uppercase mb-8 leading-tight">
                        Você não vai receber <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">só conteúdo.</span>
                     </h2>
                     <p className="text-xl md:text-3xl font-light text-slate-300">
                        Você vai entrar em uma <strong className="text-white font-medium">imersão com Rodrigo</strong> e levar:
                     </p>
                  </div>

                  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
                     <div className="glass-card bg-slate-900/60 p-10 border border-primary/20 rounded-3xl text-center shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:-translate-y-2 transition-transform">
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">4</div>
                        <p className="text-slate-300 text-lg font-light">Módulos estruturados pra reprogramar sua forma de liderar</p>
                     </div>
                     <div className="glass-card bg-slate-900/60 p-10 border border-primary/20 rounded-3xl text-center shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:-translate-y-2 transition-transform">
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">12</div>
                        <p className="text-slate-300 text-lg font-light">Aulas focadas em aplicação real para liderar gente + IA.gentes</p>
                     </div>
                     <div className="glass-card bg-slate-900/60 p-10 border border-primary/20 rounded-3xl text-center shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:-translate-y-2 transition-transform">
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">1</div>
                        <p className="text-slate-300 text-lg font-light">Sessão de mentoria INDIVIDUAL estratégica pra ajustar sua liderança na era da IA</p>
                     </div>
                  </div>

                  <div className="text-center mb-24">
                     <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest inline-flex items-center gap-3">
                        🔵 GARANTA SUA VAGA E COMECE HOJE <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>

                  <div className="max-w-4xl mx-auto glass-card border-yellow-500/40 bg-gradient-to-br from-slate-900 to-[#0a0f25] p-10 md:p-16 rounded-[40px] relative shadow-[0_0_80px_rgba(234,179,8,0.15)]">
                     <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-black text-yellow-500 uppercase tracking-widest mb-6">Agora presta atenção.</h3>
                        <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">Isso aqui NÃO é só um curso. <br className="hidden md:block"/> <strong className="text-white font-black uppercase text-2xl md:text-3xl mt-2 block">É um upgrade de posicionamento profissional.</strong></p>
                     </div>

                     <div className="bg-black/30 rounded-3xl p-8 border border-white/5 mb-12">
                        <p className="text-primary font-black uppercase tracking-widest text-center mb-4 text-lg">Você recebe 3 bônus especiais:</p>
                        <p className="text-slate-400 font-light text-center mb-8">Além da Imersão líder de Gente + IA.gentes, você ganha:</p>
                        <ul className="space-y-4">
                           <li className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 gap-4">
                              <span className="text-white font-medium flex items-center gap-4 text-lg"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" /> Curso Liderança Humanizada Aplicada</span>
                              <span className="text-slate-500 line-through font-mono">R$297</span>
                           </li>
                           <li className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 gap-4">
                              <span className="text-white font-medium flex items-center gap-4 text-lg"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" /> Kit c/ 10 Ferramentas Práticas do Líder</span>
                              <span className="text-slate-500 line-through font-mono">R$470</span>
                           </li>
                           <li className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 gap-4">
                              <span className="text-white font-medium flex items-center gap-4 text-lg"><CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" /> PulsarH System Prompt</span>
                              <span className="text-slate-500 line-through font-mono">R$227</span>
                           </li>
                        </ul>
                     </div>

                     <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-10 pb-12 gap-6">
                        <div className="text-center md:text-left">
                           <p className="text-slate-500 font-black uppercase tracking-widest text-sm mb-2">Valor real:</p>
                           <p className="text-3xl text-slate-400 line-through decoration-red-500/50 font-mono">R$994+</p>
                        </div>
                        <div className="text-center md:text-right">
                           <p className="text-yellow-400 font-black uppercase tracking-widest text-sm md:text-base mb-2">Hoje, tudo isso está:</p>
                           <p className="text-4xl md:text-5xl text-green-400 font-black uppercase tracking-tighter">Incluso gratuitamente</p>
                        </div>
                     </div>

                     <div className="mt-4">
                        <RegistrationForm btnText="🔵 CLIQUE AGORA E GARANTA ACESSO COMPLETO" />
                     </div>
                  </div>
               </div>
            </section>\n\n            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-surface border-b border-white/5 overflow-hidden relative">
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
