
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
                  message: "A página da Imersão PulsarH.AI — Pare de ser o gargalo da sua empresa está totalmente configurada e pronta para o disparo.",
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
      { question: "Preciso saber tecnologia pra fazer a Imersão?", answer: "Não. Zero código, zero ferramenta complicada.\nVocê aprende a USAR IA estrategicamente — não a construir IA.\nÉ gestão de dono, não engenharia." },
      { question: "Sou dono de loja sozinho. Serve pra mim?", answer: "Serve. Na verdade, é perfeito.\nVocê vai aprender a amplificar VOCÊ mesmo com IA antes de contratar ninguém.\nMuitos alunos da PulsarH.AI são donos solo preparando a escalada." },
      { question: "Quando acontece a Sessão Estratégica 1:1?", answer: "Você agenda no seu ritmo, em até 30 dias após a matrícula.\nIdeal é depois de assistir os 5 módulos — a sessão rende muito mais.\nMas você tem até 90 dias pra agendar. Não deixa pra última hora, porque eu opero pessoalmente e vagas são limitadas por mês." },
      { question: "As 23 aulas são vitalícias?", answer: "Acesso por 12 meses pelas atualizações.\nMétodo evolui — você evolui junto, sem custo extra durante o período." },
      { question: "Qual a diferença entre a Imersão e a Mentoria PulsarH.AI?", answer: "Imersão = método autoservido + 1 Sessão 1:1 (R$697).\nMentoria = acompanhamento individual 3-6 meses, eu dentro do seu negócio toda semana (R$5.000).\n\nA Imersão é o onboarding perfeito pra decidir se a Mentoria faz sentido — e você ganha R$1.000 de desconto na Mentoria se avançar em até 30 dias." },
      { question: "Meu time tem acesso às aulas também?", answer: "Sim. Até 5 logins por matrícula (você + 4 colaboradores).\nPorque o sentido da Imersão é VOCÊ e SEU TIME aprenderem juntos.\nSem isso, a tese quebra." },
      { question: "Como funciona a Garantia de 7 dias?", answer: "Você entra, assiste o que quiser, participa da Sessão 1:1, acessa o War Room.\nSe nos primeiros 7 dias achar que não é pra você, devolvemos 100%.\nSem pergunta, sem burocracia, sem cara feia. Risco zero." },
      { question: "Parcela no cartão tem juros?", answer: "Não. 12x no cartão sem juros.\nPIX tem 5% de desconto." },
      { question: "E se eu não conseguir fazer a Sessão logo após a matrícula?", answer: "Sem problema — você tem até 90 dias pra agendar.\nMas assiste os 5 módulos antes: a sessão rende 3x mais quando você chega com o diagnóstico já feito." },
      { question: "Posso fazer mais de uma Sessão Estratégica?", answer: "Na Imersão, 1 sessão inclusa.\nSessões adicionais: R$1.497 cada.\nOu avança pra Mentoria (R$5.000 / 3 meses) — sessões semanais." }
   ];

   const testimonials = [
      { name: "Rafael", role: "Gerente de Operações", text: "Eu achava que IA era coisa do time técnico. Depois disso, eu virei o ponto de referência na empresa." },
      { name: "Juliana", role: "Coordenadora", text: "Eu estava sobrecarregada, liderando no improviso. Hoje meu time entrega mais e eu trabalho com muito mais clareza." },
      { name: "André", role: "Líder Comercial", text: "Não é sobre ferramenta. É sobre mentalidade. Isso aqui muda como você lidera." },
      { name: "Marcos", role: "Supervisor", text: "Implementei coisas simples e já cortei horas de retrabalho da equipe." },
      { name: "Camila", role: "RH", text: "Finalmente entendi como usar IA sem perder o lado humano da liderança." },
      { name: "Felipe", role: "Gerente", text: "Me deu segurança pra tomar decisão mais rápido. Isso já mudou minha posição dentro da empresa." },
      { name: "Bruno", role: "Empresário", text: "Eu entrei pensando em aprender IA. Saí entendendo como escalar time." },
      { name: "Daniela", role: "Diretora", text: "Usei isso pra treinar meus líderes. O impacto foi imediato." },
      { name: "Ricardo", role: "Coordenador", text: "Antes eu apagava incêndio o dia todo. Agora eu consigo pensar estratégico." },
      { name: "Patrícia", role: "RH", text: "Isso deveria ser obrigatório pra qualquer líder hoje." },
      { name: "Gustavo", role: "Supervisor", text: "Simples, direto e aplicável. Não tem enrolação." },
      { name: "Renata", role: "Gerente", text: "Eu percebi que estava ficando pra trás. Isso aqui foi o ponto de virada." }
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
         {/* SocialProofPopup removed */}

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
               Imersão PulsarH.AI
            </button>
         </nav>

         <main className="relative z-10">

            {/* --- SECTION 1: HERO (CINEMATIC FULL-SCREEN) --- */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden bg-[#070514]">
               
               {/* --- BACKGROUND IMAGE & OVERLAYS --- */}
               <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[url('/hero_cinematic.jpg')] bg-cover bg-right md:bg-center bg-no-repeat opacity-60 md:opacity-100 mix-blend-screen mix-blend-lighten"></div>
                  
                  {/* Left Gradient Cover for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070514] via-[#070514]/90 lg:via-[#070514]/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070514] via-[#070514]/90 lg:via-[#070514]/10 to-transparent"></div>
                  
                  {/* Bottom & Top dark blends */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070514] via-[#070514]/80 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#070514] via-[#070514]/80 to-transparent"></div>
                  
                  {/* Cover for weird text in base image */}
                  <div className="absolute bottom-[10%] left-[2%] w-[45%] h-32 bg-[#070514] blur-3xl opacity-95"></div>
               </div>

               <div className="max-w-7xl mx-auto w-full relative z-10 flex text-left">
                  
                  {/* LEFT: CONTENT OVERLAY */}
                  <div className="max-w-3xl flex flex-col justify-center">
                     

                     <Reveal delay={100}>
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 glass-pill mb-8 border-[#C5A572]/20 bg-[#C5A572]/5 backdrop-blur-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse shadow-[0_0_10px_rgba(197,165,114,0.8)]"></div>
                           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A572] drop-shadow-md">LOTE DE ABERTURA · VAGAS LIMITADAS</span>
                        </div>
                     </Reveal>

                     <Reveal delay={200}>
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-black leading-tight tracking-tight text-white mb-4">
                           Pare de ser o gargalo da sua empresa.<br/>
                           <span className="text-slate-300 font-bold">Em 90 dias, sua operação roda sem você travar tudo.</span>
                        </h1>
                     </Reveal>

                     <Reveal delay={400}>
                        <p className="text-base md:text-lg font-light text-slate-300 leading-relaxed max-w-xl mb-10 italic border-l-2 border-[#C5A572]/30 pl-6">
                           Sua empresa cresce, sua equipe entrega mais, seus custos param de subir — e você volta a dormir tranquilo. <strong className="font-bold text-white not-italic">Sem demitir ninguém.</strong> Sem virar o {`"cara de tecnologia"`}. Sem destruir a cultura que você levou anos pra construir.
                        </p>
                     </Reveal>

                     <Reveal delay={500}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                           <button onClick={scrollToOffer} className="relative overflow-hidden group px-8 py-4 rounded-xl md:rounded-2xl border border-[#C5A572]/40 bg-[#C5A572]/10 hover:bg-[#C5A572]/20 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(197,165,114,0.15)] hover:shadow-[0_0_50px_rgba(197,165,114,0.4)] flex items-center justify-center gap-3">
                              <span className="text-[#C5A572] group-hover:text-[#E8D5B0] font-bold uppercase tracking-widest text-xs md:text-sm relative z-10 transition-colors drop-shadow-md">
                                 🎯 QUERO TIRAR MINHA EMPRESA DE MIM — R$ 697
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A572]/0 via-[#C5A572]/20 to-[#C5A572]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                           </button>
                           <div className="text-xs md:text-sm text-slate-400 font-light">
                              <div>ou 12x de <strong className="text-white font-bold">R$ 69,82</strong> sem juros</div>
                              <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Garantia 7 dias · Sessão 1:1 inclusa</div>
                           </div>
                        </div>
                     </Reveal>
                     
                  </div>
               </div>
            </section>

            {/* --- SECTION 2: CONTADORES + MUV PULSARH.AI --- */}
            <section className="relative py-20 px-6 lg:px-12 bg-[#050410] overflow-hidden border-y border-white/5">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-12">
                        <h3 className="text-[#C5A572]/70 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">A operação que roda enquanto você lê este texto</h3>
                        <h2 className="text-xl md:text-3xl font-heading font-black text-white uppercase tracking-tight leading-tight">
                           A prova do método é <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">a minha própria empresa.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
                     <Reveal delay={100}>
                        <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md h-full">
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-6">Rodrigo Braga · ANTES (corporate)</p>
                           <div className="grid grid-cols-3 gap-2 md:gap-4">
                              <div className="text-center px-2">
                                 <div className="text-xl md:text-3xl font-black text-white mb-2">15 anos</div>
                                 <div className="text-[10px] md:text-xs text-slate-400 font-light leading-tight">no corporate</div>
                              </div>
                              <div className="text-center px-2 border-x border-white/5">
                                 <div className="text-xl md:text-3xl font-black text-white mb-2">200+<br/><span className="text-sm md:text-lg font-light text-slate-300">pessoas</span></div>
                                 <div className="text-[10px] md:text-xs text-slate-400 font-light leading-tight">lideradas direto</div>
                              </div>
                              <div className="text-center px-2">
                                 <div className="text-xl md:text-3xl font-black text-white mb-2">Topo<br/><span className="text-sm md:text-lg font-light text-slate-300">da carreira</span></div>
                                 <div className="text-[10px] md:text-xs text-slate-400 font-light leading-tight">e não dormia mais</div>
                              </div>
                           </div>
                        </div>
                     </Reveal>

                     <Reveal delay={250}>
                        <div className="p-6 md:p-8 rounded-2xl border-2 border-[#C5A572]/40 bg-gradient-to-br from-[#C5A572]/10 to-[#6B2D8B]/10 backdrop-blur-md shadow-[0_0_40px_rgba(197,165,114,0.15)] h-full">
                           <p className="text-[10px] text-[#C5A572] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse"></div>
                              Rodrigo Braga · HOJE (PulsarH.AI)
                           </p>
                           <div className="grid grid-cols-3 gap-2 md:gap-4">
                              <div className="text-center px-2">
                                 <div className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-2">4</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">humanos no time</div>
                              </div>
                              <div className="text-center px-2 border-x border-white/5">
                                 <div className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-2">18</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">IA.gentes operando 24h por dia</div>
                              </div>
                              <div className="text-center px-2">
                                 <div className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A572] to-[#E8D5B0] mb-2">0</div>
                                 <div className="text-[10px] md:text-xs text-slate-200 font-light leading-tight">vezes que sou o gargalo</div>
                              </div>
                           </div>
                        </div>
                     </Reveal>
                  </div>

                  <Reveal delay={350}>
                     <div className="flex items-center justify-center gap-3 my-10 text-slate-500">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A572]/30"></div>
                        <span className="text-xs md:text-sm font-light italic text-[#C5A572]/80">↓ Saí de operador a arquiteto da minha empresa ↓</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A572]/30"></div>
                     </div>
                  </Reveal>

                  {/* === MUV PulsarH.AI — Mecanismo Único de Venda === */}
                  <Reveal delay={400}>
                     <div className="relative p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] via-[#070514] to-[#0a0f25] shadow-[0_0_100px_rgba(197,165,114,0.12)] overflow-hidden mt-4">
                        <div className="absolute top-0 left-0 p-3 bg-gradient-to-r from-[#6B2D8B] to-[#C5A572] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-br-2xl z-20">
                           ★ Mecanismo Único de Venda
                        </div>
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#6B2D8B]/10 blur-[120px] rounded-full pointer-events-none"></div>
                        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C5A572]/10 blur-[120px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                           <div className="text-center mb-10 pt-4">
                              <p className="text-[10px] md:text-xs text-[#C5A572]/80 font-black uppercase tracking-[0.3em] mb-3">Como eu fiz essa virada</p>
                              <h3 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tighter leading-none mb-3">
                                 PulsarH<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">.AI</span>
                              </h3>
                              <p className="text-sm md:text-base text-slate-400 font-light italic max-w-xl mx-auto">
                                 Não é sigla. É a metodologia que roda na minha empresa — e que você vai levar pra sua.
                              </p>
                           </div>

                           <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                              <div className="p-5 md:p-6 rounded-2xl border border-[#6B2D8B]/40 bg-[#6B2D8B]/10 backdrop-blur-md">
                                 <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8B5CB8] to-[#6B2D8B] leading-none">P</span>
                                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8B5CB8]">ULSAR</span>
                                 </div>
                                 <p className="text-sm md:text-base text-white font-bold leading-snug mb-2">Modelo de gestão híbrida</p>
                                 <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">do líder que lidera <strong className="text-white">gente + IA.gentes</strong> na mesma operação.</p>
                              </div>

                              <div className="p-5 md:p-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 backdrop-blur-md">
                                 <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-500 leading-none">H</span>
                                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-emerald-400">UMANO</span>
                                 </div>
                                 <p className="text-sm md:text-base text-white font-bold leading-snug mb-2">Humanização + respeito</p>
                                 <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">e <strong className="text-white">qualidade de vida</strong> pra cada pessoa do seu time.</p>
                              </div>

                              <div className="p-5 md:p-6 rounded-2xl border border-[#C5A572]/50 bg-[#C5A572]/10 backdrop-blur-md">
                                 <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#E8D5B0] to-[#C5A572] leading-none">.AI</span>
                                 </div>
                                 <p className="text-sm md:text-base text-white font-bold leading-snug mb-2">Potência, velocidade</p>
                                 <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">e <strong className="text-white">produtividade acima da média</strong> — com IA trabalhando junto, não no lugar.</p>
                              </div>
                           </div>

                           <div className="mt-10 text-center">
                              <p className="text-sm md:text-base text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
                                 Isso não é teoria. É o método <strong className="text-[#C5A572]">PulsarH.AI</strong> aplicado na minha própria empresa — rodando todos os dias, com resultados auditáveis. <strong className="text-white">E replicável pro seu negócio.</strong>
                              </p>
                           </div>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 3: VSL 2min — TOUR WAR ROOM --- */}
            <section className="relative py-20 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6B2D8B]/10 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-4">
                           Me mostra a operação rodando. <br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Eu vou te mostrar.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <Reveal delay={150}>
                     <div className="relative aspect-video rounded-2xl border-2 border-[#C5A572]/20 bg-gradient-to-br from-[#0a0f25] to-[#070514] overflow-hidden shadow-[0_0_80px_rgba(107,45,139,0.2)] mb-8">
                        {/* Placeholder pra VSL — substituir por <iframe> YouTube/Vimeo quando Rodrigo gravar */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                           <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C5A572]/20 border-2 border-[#C5A572]/40 flex items-center justify-center backdrop-blur-md hover:bg-[#C5A572]/30 hover:scale-110 transition-all cursor-pointer group shadow-[0_0_40px_rgba(197,165,114,0.3)]">
                              <Play className="w-8 h-8 md:w-10 md:h-10 text-[#C5A572] fill-[#C5A572] ml-1 group-hover:scale-110 transition-transform" />
                           </div>
                           <div className="text-center">
                              <p className="text-white font-bold text-sm md:text-base uppercase tracking-widest">VSL · 2 minutos</p>
                              <p className="text-slate-500 font-light text-xs md:text-sm mt-1">Em breve — Rodrigo grava o tour no War Room</p>
                           </div>
                        </div>
                        {/* Borda superior estilo "player" */}
                        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center gap-2 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                           <span className="text-[10px] font-mono text-slate-500 ml-2">tour-war-room.mp4</span>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={300}>
                     <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm md:text-base text-slate-400 font-light italic leading-relaxed mb-3">
                           <strong className="text-slate-200 not-italic">Sobre o que é este vídeo:</strong> em 2 minutos eu te mostro o War Room — a mesma infra que roda minha empresa hoje — e explico em 3 atos como virou o motor de <strong className="text-[#C5A572] not-italic">IA + Gente</strong> que gera 3x mais resultado com menos da metade da equipe que o mercado acha que precisa.
                        </p>
                        <p className="text-[10px] md:text-xs text-slate-600 uppercase tracking-[0.2em] font-bold mt-4">
                           Legendas automáticas · Som ligado recomendado · 2:00 min
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 4: LOGO BAR FERRAMENTAS IA --- */}
            <section className="relative py-16 px-6 lg:px-12 bg-[#050410] overflow-hidden border-y border-white/5">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <p className="text-center text-[10px] md:text-xs text-[#C5A572]/70 font-black uppercase tracking-[0.3em] mb-6">
                        As ferramentas que você vai dominar na prática
                     </p>
                  </Reveal>

                  <Reveal delay={100}>
                     <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-6">
                        {[
                           'ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'n8n', 'Zapier', 'Make', 'Notion AI'
                        ].map((tool, i) => (
                           <div key={i} className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-[#C5A572]/30 hover:bg-[#C5A572]/5 transition-all backdrop-blur-sm">
                              <span className="text-xs md:text-sm font-bold">{tool}</span>
                           </div>
                        ))}
                     </div>
                  </Reveal>

                  <Reveal delay={250}>
                     <div className="text-center space-y-2 max-w-3xl mx-auto">
                        <p className="text-xs md:text-sm text-slate-500 font-light italic">
                           + integrações customizadas com WhatsApp, Instagram, Hotmart, Vercel — o stack que roda na PulsarH.AI hoje.
                        </p>
                        <p className="text-sm md:text-base text-white font-bold">
                           Nada é teoria. Tudo é o que eu uso pra operar.
                        </p>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 5: DOR-MARTELO (5 DORES VAREJO) --- */}
            <section className="relative py-20 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-10">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">SE ALGUMA DESSAS FRASES TÁ NA SUA CABEÇA, LÊ ATÉ O FINAL</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-4">
                           Você toca um negócio que funciona.<br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Mas tá começando a doer.</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mt-6">
                           Você não tá quebrado. Mas tá apertado. E sabe que do jeito que tá, não chega no próximo ano inteiro. <strong className="text-white">Marca uma das que pesam:</strong>
                        </p>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
                     {[
                        {
                           emoji: '✅',
                           title: 'Sua empresa depende de você pra tudo.',
                           body: 'Você tira uma semana de férias e volta com o caixa atrasado, vendedor confuso e cliente reclamando. Você é o dono — e o gerente, o RH, o financeiro e o atendimento.',
                           color: '#EF4444'
                        },
                        {
                           emoji: '✅',
                           title: 'Seu time é lento e refaz o que já foi feito.',
                           body: 'Você explica três vezes a mesma coisa. Pedido sai errado, planilha desatualiza, ninguém acha o que precisa. O dia inteiro apagando incêndio.',
                           color: '#C5A572'
                        },
                        {
                           emoji: '✅',
                           title: 'Os custos não param de subir e a margem virou pó.',
                           body: 'Folha aumenta, fornecedor reajusta, conta de luz dispara — e você não consegue repassar pro cliente. No fim do mês, sobra menos que ano passado.',
                           color: '#6B2D8B'
                        },
                        {
                           emoji: '✅',
                           title: 'Seu concorrente tá automatizando e ganhando velocidade.',
                           body: 'Você vê o cara do mesmo segmento respondendo cliente em 30 segundos, fechando venda no fim de semana, dobrando equipe sem dobrar folha. E você ainda manda planilha por WhatsApp.',
                           color: '#8B5CB8'
                        },
                        {
                           emoji: '✅',
                           title: 'Você quer crescer mas não consegue sem inflar folha.',
                           body: 'Cada cliente novo é uma pessoa nova. Cada filial é uma estrutura inteira nova. E você sabe que mais gente nem sempre é mais lucro — às vezes é só mais dor de cabeça.',
                           color: '#3B82F6'
                        }
                     ].map((card, i, arr) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className={`relative h-full p-6 md:p-7 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-white/20 transition-all group overflow-hidden ${i === arr.length - 1 ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}>
                              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}></div>
                              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-15 group-hover:opacity-30 transition-opacity" style={{ background: card.color }}></div>
                              <div className="relative z-10">
                                 <div className="text-3xl mb-3">{card.emoji}</div>
                                 <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-3">{card.title}</h3>
                                 <p className="text-slate-400 text-sm font-light leading-relaxed">{card.body}</p>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  <Reveal delay={500}>
                     <p className="text-center text-base md:text-lg text-slate-200 font-light italic mt-12 max-w-2xl mx-auto">
                        Se você marcou 3 ou mais, você não tem um problema de vendas.<br/>
                        <strong className="text-white not-italic text-lg md:text-xl">Você tem um problema de estrutura.</strong>
                     </p>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION: RESULTADO TANGÍVEL (5 CARDS — O QUE VOCÊ LEVA EMBORA) --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-16">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">O QUE VOCÊ LEVA EMBORA EM 90 DIAS</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4">
                           Não é teoria.<br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">É a sua empresa, diferente.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mt-6">
                           5 mudanças concretas que entram no seu CNPJ — <strong className="text-white">e ficam.</strong>
                        </p>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                     {[
                        { icon: "💰", title: "Mais lucro no fim do mês", desc: "Mesma receita, custo menor, margem que você não via há 2 anos." },
                        { icon: "⚡", title: "Time 2x mais produtivo", desc: "Mesma equipe, sem contratar ninguém, entregando o dobro do que entrega hoje." },
                        { icon: "🚪", title: "Você saindo da operação", desc: "Empresa rodando 1 semana sem você sem nada quebrar. Pela primeira vez." },
                        { icon: "📈", title: "Crescimento sem inflar folha", desc: "Mais clientes, mais filiais, mais venda — sem o pesadelo de gerenciar mais gente." },
                        { icon: "❤️", title: "Cultura preservada", desc: "Time mais leve, menos retrabalho, menos atrito. Ninguém demitido. Todo mundo crescendo junto." },
                     ].map((item, i, arr) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className={`glass-card p-6 md:p-8 border-[#6B2D8B]/20 bg-gradient-to-b from-[#6B2D8B]/10 to-transparent rounded-2xl hover:border-[#C5A572]/40 transition-all h-full text-left group hover:shadow-[0_0_40px_rgba(197,165,114,0.1)] ${i === arr.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                              <p className="text-lg md:text-xl font-black uppercase tracking-tight text-white mb-3 leading-tight">{item.title}</p>
                              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">{item.desc}</p>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  <Reveal delay={500}>
                     <div className="text-center">
                        <p className="text-xl text-slate-300 font-light mb-4">
                           Não é palestra. Não é curso pra assistir. É <strong className="text-white font-bold">implementação no seu CNPJ.</strong>
                        </p>
                        <p className="text-2xl text-[#C5A572] font-black mb-8">
                           R$ 697 à vista · ou 12x R$ 69,82 sem juros
                        </p>
                        <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest flex items-center justify-center gap-3 mx-auto">
                           QUERO TIRAR MINHA EMPRESA DE MIM
                        </button>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- NEW SECTION: AS 5 DIMENSOES DO LIDER NA ERA DA IA --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-16">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">COMO A GENTE FAZ</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4">
                           3 pilares. 1 ordem.<br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Sem atalho.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mt-6">
                           A maioria tenta colocar IA numa empresa quebrada. <strong className="text-white">A gente faz o contrário:</strong>
                        </p>
                     </div>
                  </Reveal>

                  <div className="grid md:grid-cols-3 gap-5 mb-16">
                     {[
                        { num: "1", title: "ORGANIZAR PROCESSOS", color: "#8B5CF6", desc: "Antes de qualquer tecnologia, a gente arruma a casa. Mapeia o que trava, o que repete, o que pode sair de cima de você." },
                        { num: "2", title: "FORMAR E RETER TALENTOS", color: "#C5A572", desc: "Seu time aprende a operar com IA do lado — não no lugar dele. Cada pessoa fica 2x mais forte. Ninguém é demitido. Cultura preservada." },
                        { num: "3", title: "IMPLEMENTAR IA", color: "#6B2D8B", desc: "Aí sim, com a casa organizada e o time pronto, a IA entra. Não como ferramenta legal — como IA.gente, agente que executa tarefa real, 24h por dia, no padrão da sua empresa." }
                     ].map((card, i) => (
                        <Reveal key={i} delay={i * 100}>
                           <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(197,165,114,0.12)] group h-full" style={{ background: `linear-gradient(135deg, ${card.color}10 0%, rgba(7,5,20,0.8) 100%)` }}>
                              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: card.color }} />
                              <div className="relative z-10">
                                 <span className="text-5xl md:text-6xl font-black leading-none block mb-4" style={{ color: card.color }}>{card.num}</span>
                                 <h4 className="font-black uppercase tracking-wider text-base md:text-lg text-white mb-4 leading-tight">{card.title}</h4>
                                 <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">{card.desc}</p>
                              </div>
                           </div>
                        </Reveal>
                     ))}
                  </div>

                  <Reveal delay={400}>
                     <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] shadow-[0_0_60px_rgba(197,165,114,0.15)]">
                        <p className="text-2xl md:text-3xl font-black text-white text-center leading-tight mb-4">
                           A IA não substitui o humano.<br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Ela multiplica o humano.</span>
                        </p>
                        <p className="text-base md:text-lg text-slate-300 font-light text-center leading-relaxed mt-6">
                           Esse é o método <strong className="text-[#C5A572]">PULSAR+H</strong> — Planejar, Usar, Lapidar, Sustentar, Alavancar, Replicar — sempre com <strong className="text-[#C5A572]">+H (Humanização)</strong> no centro. É o oposto de demitir e botar bot. <strong className="text-white">É crescer com a equipe que você tem.</strong>
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={600}>
                     <div className="text-center mt-12">
                        <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest flex items-center justify-center gap-3 mx-auto">
                           QUERO O MÉTODO PULSAR+H
                        </button>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 2: SECOND WAVE — HIDDEN (content now in hero + 5 dimensions) --- */}
            <section className="hidden">
               <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-[#6B2D8B]/10 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                  <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-[#C5A572]/10 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                  <div className="absolute inset-0 bg-tech-grid opacity-5"></div>
               </div>

                   <div className="max-w-5xl mx-auto relative z-10">
                      <Reveal>
                         <div className="mb-24 relative">
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C5A572]/10 blur-[100px] rounded-full"></div>
                            <div className="flex justify-center mb-6">
                               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A572]/30 bg-[#C5A572]/5 backdrop-blur-md">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse"></div>
                                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A572]/80">System Status: Evolution Active</span>
                               </div>
                            </div>
                            <h3 className="text-[#C5A572]/60 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 text-center">A segunda revolução da inteligência artificial</h3>
                            <h2 className="text-2xl md:text-5xl font-heading font-black text-white text-center leading-[0.9] uppercase tracking-tighter mb-8">
                               POR QUE A PRIMEIRA ONDA DA IA FOI <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-300">APENAS UM TESTE…</span><br/>
                               E A ERA DOS AGENTES VAI EXTERMINAR O <span className="text-[#C5A572] drop-shadow-[0_0_15px_rgba(197,165,114,0.3)]">LÍDER QUE SÓ GERE PESSOAS</span>
                            </h2>
                         </div>
                      </Reveal>
    
                      <div className="grid lg:grid-cols-12 gap-12 items-start mb-32">
                         <div className="lg:col-span-7 space-y-10">
                            <Reveal>
                               <div className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl group hover:border-[#C5A572]/30 transition-all duration-500">
                                  <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-600 tracking-widest uppercase">Log // 01.A</div>
                                  <div className="absolute -left-1 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#C5A572]/40 to-transparent"></div>
                                  <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                     A primeira onda da IA gerou <span className="text-white font-medium">deslumbramento tecnológico.</span> Foi barulhenta, mas mudou pouco a hierarquia das empresas. A segunda onda, a Era dos Agentes, está <span className="text-[#C5A572]">reescrevendo o organograma.</span>
                                  </p>
                               </div>
                            </Reveal>
                            
                            <Reveal delay={100}>
                               <div className="relative p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.02] backdrop-blur-xl group hover:border-red-500/40 transition-all duration-500">
                                  <div className="absolute top-4 right-6 flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
                                     <span className="text-[10px] font-mono text-red-500/60 tracking-widest uppercase">Critical // Threat Detected</span>
                                  </div>
                                  <div className="absolute -left-1 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-red-500/40 to-transparent"></div>
                                  <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                     Hoje, algoritmos já tomam decisões e <span className="text-white font-medium">executam rotinas complexas</span> de ponta a ponta. Se a sua única habilidade for "entender de pessoas" ou "cuidar de processos manuais", a sua cadeira está ameaçada. 
                                  </p>
                                  <div className="mt-6 pt-6 border-t border-red-500/10">
                                     <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed italic">
                                        O líder que se recusa a comandar agentes de Inteligência Artificial ao lado do seu time humano será engolido pela velocidade dos concorrentes. Você não precisa aprender a programar, mas tem a <span className="text-white font-bold not-italic">obrigação inegociável de aprender a comandar.</span>
                                     </p>
                                  </div>
                                  <div className="mt-8 flex justify-center">
                                     <div className="px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                                        O futuro só tem espaço para o Líder Híbrido
                                     </div>
                                  </div>
                               </div>
                            </Reveal>
                         </div>
    
                         <div className="lg:col-span-5 relative">
                            <div className="absolute inset-0 bg-[#C5A572]/5 blur-[80px] rounded-full pointer-events-none"></div>
                            <Reveal delay={200}>
                               <div className="grid grid-cols-1 gap-6 relative z-10">
                                  {[
                                     { icon: Users, title: "Líderes curiosos.", status: "Phase 01" },
                                     { icon: Zap, title: "Equipes experimentando.", status: "Phase 02" },
                                     { icon: Search, title: "Empresas tentando entender.", status: "Phase 03" }
                                  ].map((item, i) => (
                                     <div key={i} className="group relative p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md flex items-center justify-between hover:bg-slate-900/60 transition-all duration-300 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A572]/0 group-hover:bg-[#C5A572]/60 transition-all"></div>
                                        <div className="flex items-center gap-6">
                                           <div className="w-14 h-14 rounded-xl bg-[#C5A572]/10 border border-[#C5A572]/20 flex items-center justify-center text-[#C5A572] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(197,165,114,0.1)]">
                                              <item.icon className="w-7 h-7" />
                                           </div>
                                           <span className="text-slate-200 text-lg font-light tracking-wide group-hover:text-white transition-colors">{item.title}</span>
                                        </div>
                                        <div className="hidden md:block">
                                           <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{item.status}</span>
                                        </div>
                                     </div>
                                  ))}
                                  
                                  {/* Technical Decoration */}
                                  <div className="mt-4 p-6 border-t border-white/5 border-dashed flex justify-between items-center opacity-40">
                                     <div className="flex gap-2">
                                        <div className="w-1 h-1 bg-[#C5A572] rounded-full"></div>
                                        <div className="w-1 h-1 bg-[#C5A572] rounded-full"></div>
                                        <div className="w-1 h-1 bg-[#C5A572] rounded-full"></div>
                                     </div>
                                     <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Targeting: Hybrid Efficiency</div>
                                  </div>
                               </div>
                            </Reveal>
                         </div>
                      </div>

                  <Reveal>
                     <div className="glass-card bg-[#0a0f25]/60 border border-red-500/20 p-6 md:p-10 rounded-2xl md:rounded-3xl mb-32 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
                        <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
                           <ShieldAlert className="text-red-500 w-10 h-10" />
                           O PROBLEMA QUE ESTÁ CRIANDO LÍDERES OBSOLETOS
                        </h4>
                        <p className="text-xl text-slate-400 font-light mb-12 leading-relaxed">
                           Enquanto todo mundo tentava aprender ferramenta… Um erro começou a se repetir dentro das empresas:
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                           <div className="border-l-2 border-red-500/30 pl-6 py-4">
                              <p className="text-white font-bold text-lg mb-2">Profissionais mais rápidos.</p>
                              <p className="text-slate-500 text-sm">Mas com os mesmos gargalos de sempre.</p>
                           </div>
                           <div className="border-l-2 border-red-500/30 pl-6 py-4">
                              <p className="text-white font-bold text-lg mb-2">Times desalinhados.</p>
                              <p className="text-slate-500 text-sm">Cada um usando IA pra um lado.</p>
                           </div>
                           <div className="border-l-2 border-red-500/30 pl-6 py-4">
                              <p className="text-white font-bold text-lg mb-2">Líderes sobrecarregados.</p>
                              <p className="text-slate-500 text-sm">Tentando segurar tudo sozinho.</p>
                           </div>
                        </div>
                        <div className="mt-12 p-8 bg-red-500/5 rounded-2xl border border-red-500/10">
                           <p className="text-xl text-white font-light text-center">
                              "Saber usar IA não te transforma em um líder melhor. <br className="hidden md:block"/> Só te transforma em alguém mais produtivo. <br className="hidden md:block"/> 
                              <strong className="text-red-400 font-black uppercase text-2xl mt-4 block tracking-widest">E É EXATAMENTE AQUI QUE SURGE O LÍDER HÍBRIDO</strong>"
                           </p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal>
                     <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#C5A572]/20 bg-[#C5A572]/5 text-[#C5A572] text-xs font-bold uppercase tracking-widest mb-10">
                           <Crown className="w-4 h-4" />
                           A Nova Orquestração
                        </div>
                        <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase mb-12 leading-tight">
                           O líder híbrido não usa IA pra trabalhar mais. <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Ele usa IA pra liderar melhor.</span>
                        </h3>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
                           {[
                              { label: 'IA executa', icon: Cpu, desc: 'Sistemas inteligentes cuidam do braço robótico da operação.' },
                              { label: 'Pessoas evoluem', icon: TrendingUp, desc: 'O líder foca na evolução humana e estratégica do time.' },
                              { label: 'O resultado escala', icon: RocketIcon, desc: 'A operação cresce sem depender da sua presença 24/7.' }
                           ].map((item, i) => (
                              <div key={i} className="glass-card p-8 border-white/5 bg-slate-900/40 rounded-2xl hover:border-[#C5A572]/30 transition-all group">
                                 <item.icon className="w-10 h-10 text-[#C5A572] mb-6 group-hover:scale-110 transition-transform" />
                                 <p className="text-white font-black uppercase tracking-wider mb-2">{item.label}</p>
                                 <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                              </div>
                           ))}
                        </div>

                        <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0a0f25] to-[#070514] border border-[#C5A572]/40 relative shadow-[0_0_80px_rgba(197,165,114,0.15)] flex flex-col items-center">
                           <p className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-12">
                              A segunda onda não é sobre ferramenta. <br className="hidden md:block"/> 
                              É sobre quem consegue integrar: <br className="hidden md:block"/>
                              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572] font-black uppercase text-2xl md:text-5xl block mt-4">Pessoas + IA</strong>
                              na mesma operação.
                           </p>
                           <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest flex items-center justify-center gap-3">
                              🔵 CLIQUE AGORA E COMECE A SE TORNAR UM LÍDER HÍBRIDO
                           </button>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- NEW SECTION: THE SYSTEM REVELATION --- */}
            <section className="relative min-h-[70vh] flex items-center justify-center py-16 md:py-24 px-6 lg:px-12 overflow-hidden">
               {/* Background Video */}
               <div className="absolute inset-0 z-0">
                  <video 
                     autoPlay 
                     loop 
                     muted 
                     playsInline 
                     className="w-full h-full object-cover opacity-40 mix-blend-lighten"
                  >
                     <source src="/grok-video-4d234136-c90e-412d-8d33-51ad10546e9d (1).mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#070514] via-transparent to-[#070514] z-10"></div>
                  <div className="absolute inset-0 bg-black/40 z-[5]"></div>
               </div>

               <div className="max-w-5xl mx-auto relative z-20 text-center">
                  <Reveal>
                     <h2 className="text-2xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
                        ISSO NÃO É CURSO. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">
                           É IMPLEMENTAÇÃO NO SEU CNPJ.
                        </span>
                     </h2>
                     
                     <div className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_0_100px_rgba(197,165,114,0.1)] inline-block max-w-4xl">
                        <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed mb-8">
                           A imersão é objetiva e direto ao ponto. <br className="hidden md:block"/> 
                           E pra você que pensa: <span className="italic text-[#C5A572]">"Já fiz curso de IA, já tentei ChatGPT..."</span>
                        </p>
                        <p className="text-xl md:text-2xl text-white font-medium mb-10 leading-snug">
                           Nenhum treinamento que você fez te ensinou a <br className="hidden md:block"/>
                           <span className="font-black text-[#C5A572]">ARRUMAR PROCESSO</span>, <span className="font-black text-[#C5A572]">FORMAR TIME</span> e <span className="font-black text-[#C5A572]">RODAR IA.GENTE</span> <br className="hidden md:block"/> 
                           na ordem certa, dentro do SEU negócio. <span className="uppercase text-[#C5A572] tracking-widest font-black ml-2 underline underline-offset-8">Esse ensina.</span>
                        </p>
                        <div className="p-8 md:p-10 bg-green-500/5 rounded-2xl border-2 border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.15)] max-w-2xl mx-auto">
                           <h4 className="text-green-400 font-black uppercase tracking-widest text-lg mb-4 text-center">Garantia Cristal de 7 dias</h4>
                           <p className="text-slate-200 text-lg font-light leading-relaxed text-center">
                              Entra, assiste o que quiser, participa da Sessão 1:1, acessa o War Room. Se nos primeiros 7 dias achar que não é pra você, <strong className="text-white font-bold">devolvemos 100%. Risco zero.</strong>
                           </p>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 4: THE MODULES --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-[#070514]">
               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="mb-16">
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 text-center">A IMERSÃO POR DENTRO</p>
                        <h3 className="text-2xl md:text-5xl font-heading font-black text-white text-center mb-4 uppercase tracking-tight">5 módulos. Cada um vira <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">uma mudança no seu CNPJ.</span></h3>
                        <p className="text-base md:text-lg text-slate-300 font-light text-center max-w-3xl mx-auto mb-12 leading-relaxed">Não é curso pra assistir. <strong className="text-white">É treinamento pra aplicar enquanto faz.</strong></p>

                        <div className="space-y-4">
                           <AccordionItem title="MÓDULO 1 — A RUPTURA" icon={<Eye className="w-5 h-5" />}>
                              <div className="space-y-6">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Por que 90% dos donos de loja vão ficar pra trás nos próximos 24 meses — e por que você não vai ser um deles.</p>
                                 </div>
                                 <div className="p-6 bg-[#C5A572]/5 rounded-xl border border-[#C5A572]/20">
                                    <h5 className="text-[#C5A572] font-bold mb-3 uppercase tracking-wider text-sm">Você sai com:</h5>
                                    <p className="text-slate-300 text-base leading-relaxed">Clareza brutal de onde sua empresa está e o que precisa mudar antes de dezembro.</p>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 2 — DNA DO LÍDER QUE NÃO TRAVA O NEGÓCIO" icon={<Layers className="w-5 h-5" />}>
                              <div className="space-y-6">
                                 <div>
                                    <p className="text-white text-lg font-light italic">5 traços que transformam dono-operador em dono-arquiteto. Conector, Hiperprodutivo, Humilde, Sistêmico, Humano.</p>
                                 </div>
                                 <div className="p-6 bg-[#C5A572]/5 rounded-xl border border-[#C5A572]/20">
                                    <h5 className="text-[#C5A572] font-bold mb-3 uppercase tracking-wider text-sm">Você sai com:</h5>
                                    <p className="text-slate-300 text-base leading-relaxed">Mapa pessoal das suas 2 forças e 2 buracos como líder. Dá pra trabalhar a partir de segunda.</p>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 3 — IA.GENTES: SEUS NOVOS FUNCIONÁRIOS DIGITAIS" icon={<Zap className="w-5 h-5" />}>
                              <div className="space-y-6">
                                 <div>
                                    <p className="text-white text-lg font-light italic">O que são, os 4 tipos, como conversar com eles e o erro nº1 que faz 80% dos empresários desistirem.</p>
                                 </div>
                                 <div className="p-6 bg-[#C5A572]/5 rounded-xl border border-[#C5A572]/20">
                                    <h5 className="text-[#C5A572] font-bold mb-3 uppercase tracking-wider text-sm">Você sai com:</h5>
                                    <p className="text-slate-300 text-base leading-relaxed">Seu primeiro IA.gente prototipado, pronto pra rodar uma tarefa real da sua operação.</p>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 4 — S.E.R: COMO COLOCAR O TIME JUNTO SEM RESISTÊNCIA" icon={<Users className="w-5 h-5" />}>
                              <div className="space-y-6">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Sensibilizar, Engajar, Respeitar/Educar. O passo a passo pra equipe abraçar IA em vez de boicotar.</p>
                                 </div>
                                 <div className="p-6 bg-[#C5A572]/5 rounded-xl border border-[#C5A572]/20">
                                    <h5 className="text-[#C5A572] font-bold mb-3 uppercase tracking-wider text-sm">Você sai com:</h5>
                                    <p className="text-slate-300 text-base leading-relaxed">Roteiro pronto da reunião que você vai fazer com seu time pra apresentar a virada.</p>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 5 — PULSAR+H: O MOTOR QUE ROLA SOZINHO" icon={<Cpu className="w-5 h-5" />}>
                              <div className="space-y-6">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Os 6 movimentos do método + os 10 Mandamentos do Líder Híbrido. Da primeira automação até o pitch da empresa nova.</p>
                                 </div>
                                 <div className="p-6 bg-[#C5A572]/5 rounded-xl border border-[#C5A572]/20">
                                    <h5 className="text-[#C5A572] font-bold mb-3 uppercase tracking-wider text-sm">Você sai com:</h5>
                                    <p className="text-slate-300 text-base leading-relaxed">Plano de 90 dias escrito, com prioridade, prazo e responsável. Não é PDF. É operação.</p>
                                 </div>
                              </div>
                           </AccordionItem>
                        </div>

                        <div className="mt-12 p-6 md:p-8 rounded-2xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] shadow-[0_0_40px_rgba(197,165,114,0.1)]">
                           <p className="text-[#C5A572] font-black uppercase tracking-widest text-xs md:text-sm mb-4 text-center">Bônus inclusos:</p>
                           <ul className="space-y-3 max-w-2xl mx-auto">
                              <li className="flex items-start gap-3">
                                 <span className="text-2xl shrink-0">🎯</span>
                                 <p className="text-slate-200 text-base font-light leading-relaxed"><strong className="text-white">Sessão Estratégica 1:1 com Rodrigo (90 minutos)</strong> — você, ele, sua empresa na tela. Diagnóstico real e plano feito junto.</p>
                              </li>
                              <li className="flex items-start gap-3">
                                 <span className="text-2xl shrink-0">🚪</span>
                                 <p className="text-slate-200 text-base font-light leading-relaxed"><strong className="text-white">Acesso ao War Room ao vivo</strong> — você entra na operação real da PulsarH.AI rodando.</p>
                              </li>
                              <li className="flex items-start gap-3">
                                 <span className="text-2xl shrink-0">🤖</span>
                                 <p className="text-slate-200 text-base font-light leading-relaxed"><strong className="text-white">1 IA.gente operacional rodando na sua empresa em 7 dias.</strong></p>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal>
                     <div className="glass-card bg-[#0a0f25]/60 border border-[#C5A572]/20 p-6 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden group">
                        <div className="text-center mb-10">
                           <h4 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest mb-10">
                              E antes que pense: "Não tenho tempo." ou "é muito barato — deve ser raso." eu te digo:
                           </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-[#C5A572]/20 transition-all">
                              <p className="text-[#C5A572] font-black text-3xl mb-4">01</p>
                              <p className="text-white text-lg font-light leading-relaxed">São 23 aulas curtas em 5 módulos. Você assiste no seu ritmo, no horário que dá. Mais a Sessão 1:1 de 90 minutos comigo, focada exatamente onde o calo aperta. Zero teoria inútil. Só o que muda resultado no seu CNPJ.</p>
                           </div>
                           <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-[#C5A572]/20 transition-all">
                              <p className="text-[#C5A572] font-black text-3xl mb-4">02</p>
                              <p className="text-white text-lg font-light leading-relaxed">O preço é um filtro. Quero achar os donos de loja comprometidos que vão pra Mentoria. Por isso entrego desproporcional: 23 aulas + 1:1 individual + seu primeiro IA.gente funcionando + War Room ao vivo. Valor cheio: R$ 6.691. Aqui: R$ 697. Estou investindo em você antes de você investir na continuidade.</p>
                           </div>
                        </div>
                        <div className="mt-16 text-center">
                           <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest flex items-center justify-center gap-3 mx-auto">
                              🔵 COMECE HOJE E VEJA OS RESULTADOS NOS PRIMEIROS DIAS
                           </button>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 6: FOR WHOM? (REWORKED) --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-[#0a0f25] border-b border-white/5">
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
                  <Reveal>
                     <div className="glass-card bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-3xl h-full flex flex-col shadow-[0_0_30px_rgba(197,165,114,0.05)]">
                        <h3 className="text-xl md:text-3xl font-heading font-black text-white uppercase mb-8 flex items-center gap-4">
                           ✅ A Imersão É pra você se...
                        </h3>
                        <ul className="space-y-6 flex-1 mb-10">
                           {[
                              "Você é dono de loja ou pequeno empresário do varejo (até ~50 funcionários)",
                              "Fatura entre R$80k e R$1,2M/mês e quer escalar sem inflar folha",
                              "Entende que IA exige método — não é só plugar ChatGPT",
                              "Valoriza seu time e quer amplificar cada pessoa (não demitir)",
                              "Topa pôr a mão na massa no próprio negócio",
                              "Entende que R$697 é investimento, não despesa"
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                 <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                 <span className="text-slate-300 text-lg leading-relaxed font-light">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <div className="mt-auto border-t border-white/10 pt-8">
                           <p className="text-slate-400 font-light italic mb-6">Se você leu isso e pensou: <br/> <strong className="text-white text-lg block mt-2 not-italic">"é exatamente o meu momento"</strong></p>
                           <button onClick={scrollToOffer} className="btn-neon w-full px-6 py-4 text-xs md:text-sm tracking-widest flex items-center justify-center gap-2">
                              🎯 QUERO MEU PLANO DE IA
                           </button>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={100}>
                     <div className="glass-card bg-red-900/10 border border-red-500/20 p-8 md:p-12 rounded-3xl h-full flex flex-col shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                        <h3 className="text-xl md:text-2xl font-heading font-black text-white uppercase mb-8 flex items-center gap-4">
                           ❌ NÃO é pra você se...
                        </h3>
                        <ul className="space-y-6 flex-1 mb-10">
                           {[
                              "Você é funcionário CLT sem poder de decisão sobre implementação",
                              'Você tá procurando "IA milagre" que fatura sozinha enquanto você dorme',
                              "Você não tem tempo de dedicar à Sessão Estratégica 1:1",
                              "Seu plano é demitir gente e trocar por bots",
                              "Você quer alguém fazer por você (aí é mentoria, não imersão)",
                              "Você não tem R$697 disponível — sem problema, volta quando tiver"
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                 <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                 <span className="text-slate-300 text-lg leading-relaxed font-light">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <div className="mt-auto border-t border-white/10 pt-8">
                           <p className="text-slate-400 font-light italic mb-4">Se você quer atalho fácil…</p>
                           <p className="text-white font-black text-2xl uppercase tracking-widest mb-8">Sai agora.</p>
                           <button onClick={scrollToOffer} className="btn-neon w-full px-6 py-4 text-xs md:text-sm tracking-widest flex items-center justify-center gap-2">
                              SE TOPA O JOGO DE VERDADE, ENTRA
                           </button>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 8: SESSÃO ESTRATÉGICA 1:1 (DIFERENCIAL ÚNICO) --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-b border-white/5">
               <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#C5A572]/10 blur-[140px] rounded-full pointer-events-none"></div>
               <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-[#6B2D8B]/10 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C5A572]/30 bg-[#C5A572]/5 mb-6">
                           <Crown className="w-4 h-4 text-[#C5A572]" />
                           <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#C5A572]">Diferencial único no mercado BR</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                           O que NENHUM curso, NENHUMA mentoria <br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572]">e NENHUM guru te entrega.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white font-black mt-8">
                           90 minutos. 1 a 1. <span className="text-[#C5A572]">Eu, você e seu negócio.</span>
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={150}>
                     <p className="text-center text-base md:text-lg text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                        Depois que você assiste as 23 aulas, agenda comigo uma <strong className="text-white">Sessão Estratégica Individual.</strong> Aqui o jogo muda: sai da teoria, entra no SEU CNPJ.
                     </p>
                  </Reveal>

                  {/* Timeline dos 90 min */}
                  <Reveal delay={250}>
                     <div className="mb-14">
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-[#C5A572]/80 text-center mb-8">O que acontece nos 90 minutos:</h3>
                        <div className="space-y-3 max-w-4xl mx-auto">
                           {[
                              { time: '0-10min', task: 'Revisão do seu diagnóstico (você preenche um template antes da call)', color: '#6B2D8B' },
                              { time: '10-40min', task: 'Mapeamento dos 3 processos prioritários pra IA entrar no seu negócio primeiro — baseado no SEU faturamento, equipe, dores', color: '#8B5CB8' },
                              { time: '40-70min', task: 'Desenho ao vivo do seu Roadmap de Implementação de 90 dias — semana por semana', color: '#C5A572' },
                              { time: '70-85min', task: 'Te mostro onde faz sentido ir além (Mentoria ou Formação, se servir) + suas perguntas', color: '#E8D5B0' },
                              { time: '85-90min', task: 'Você sai com o Plano de Implementação Personalizado PDF — com seu nome, seu CNPJ, seus processos', color: '#FFD700' }
                           ].map((row, i) => (
                              <div key={i} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:border-[#C5A572]/20 transition-all">
                                 <div className="shrink-0 w-20 md:w-28 text-right">
                                    <span className="text-xs md:text-sm font-black uppercase tracking-wider" style={{ color: row.color }}>{row.time}</span>
                                 </div>
                                 <div className="w-[1px] h-8 bg-white/10"></div>
                                 <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed flex-1">{row.task}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Reveal>

                  {/* O que você sai levando */}
                  <Reveal delay={400}>
                     <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] shadow-[0_0_60px_rgba(197,165,114,0.15)]">
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-[#C5A572] mb-6 text-center">No final, você leva:</h3>
                        <ul className="space-y-4">
                           {[
                              'PDF personalizado de implementação de IA pro seu negócio',
                              '3 processos identificados e priorizados',
                              'Roadmap de 90 dias (o que fazer na semana 1, 2-4, 5-8, 9-12)',
                              'KPIs pra medir se tá funcionando',
                              'Acesso ao meu WhatsApp por 7 dias após a sessão pra dúvidas de execução'
                           ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                 <CheckCircle2 className="w-5 h-5 text-[#C5A572] shrink-0 mt-0.5" />
                                 <span className="text-slate-200 text-base font-light leading-relaxed">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10">
                           <p className="text-slate-300 italic font-light text-base md:text-lg leading-relaxed text-center">
                              "O que eu faria no seu lugar, semana por semana. Por escrito. Com seu nome em cima."
                           </p>
                           <p className="text-[#C5A572] text-xs uppercase tracking-widest font-bold text-center mt-3">— Rodrigo, durante a Sessão</p>
                        </div>
                     </div>
                  </Reveal>

                  {/* Escassez */}
                  <Reveal delay={600}>
                     <div className="mt-10 text-center">
                        <p className="text-sm md:text-base text-slate-400 font-light italic">
                           <strong className="text-[#C5A572] not-italic">Vagas limitadas por mês</strong> — porque eu faço pessoalmente. Sem delegação.
                        </p>
                        <button onClick={scrollToOffer} className="btn-neon mt-6 py-4 px-8 text-sm md:text-base tracking-widest flex items-center justify-center gap-3 mx-auto">
                           🎯 QUERO MINHA SESSÃO 1:1
                        </button>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- NEW SECTION: WAR ROOM AO VIVO --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden border-b border-white/5">
               <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6B2D8B]/10 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C5A572]/20 bg-[#C5A572]/5 mb-6">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A572] animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A572]">Operação ao vivo</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-6">
                           Não é apresentação de slide. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">É a empresa rodando na sua frente.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                           Você entra no <strong className="text-white">War Room</strong> — o cockpit operacional da PulsarH.AI — e assiste em tempo real funcionários digitais reais, executando tarefa real, da minha empresa real.
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={150}>
                     <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#070514] overflow-hidden shadow-[0_0_80px_rgba(107,45,139,0.2)]">
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                           <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                           </div>
                           <div className="text-[10px] font-mono text-slate-500 ml-2">sala-de-guerra-pulsar-h.vercel.app/cerebro</div>
                        </div>
                        <div className="pt-10 pb-6 px-6 md:px-10 grid md:grid-cols-2 gap-6">
                           <div className="space-y-4">
                              <div className="p-4 rounded-xl border border-[#C5A572]/20 bg-[#C5A572]/5">
                                 <div className="flex items-center gap-3 mb-2">
                                    <Brain className="w-5 h-5 text-[#C5A572]"/>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A572]">Cérebro</span>
                                 </div>
                                 <p className="text-slate-300 text-sm font-light">18 agentes especialistas com persona, metodologia e memória ativa — Alfredo (comercial), Betina (copy), Léo Dias (radar), Dani (SDR), Donna (agenda)…</p>
                              </div>
                              <div className="p-4 rounded-xl border border-[#6B2D8B]/20 bg-[#6B2D8B]/5">
                                 <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-[#8B5CB8]"/>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B5CB8]">Prospecção</span>
                                 </div>
                                 <p className="text-slate-300 text-sm font-light">Dani atendendo lead no WhatsApp e Instagram automaticamente — com handoff humano no clique.</p>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                                 <div className="flex items-center gap-3 mb-2">
                                    <BarChart4 className="w-5 h-5 text-green-400"/>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-green-400">Performance</span>
                                 </div>
                                 <p className="text-slate-300 text-sm font-light">ROAS por campanha em tempo real — Pixel + Conversions API + atribuição via UTM por Sale.</p>
                              </div>
                              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                                 <div className="flex items-center gap-3 mb-2">
                                    <MessageCircle className="w-5 h-5 text-red-400"/>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">Cockpit</span>
                                 </div>
                                 <p className="text-slate-300 text-sm font-light">Pulse mandando report diário de vendas e ROAS às 20h no meu Telegram — Donna agendando tudo às 14h.</p>
                              </div>
                           </div>
                        </div>
                        <div className="px-6 md:px-10 py-6 border-t border-white/5 bg-black/20">
                           <p className="text-xs text-center text-slate-500 font-mono uppercase tracking-widest">&gt; O que roda aqui, roda no seu também — com SEU método, SEU time, SEU cliente.</p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={300}>
                     <p className="text-center text-sm md:text-base text-slate-300 font-light mt-10 max-w-3xl mx-auto leading-relaxed">
                        São funcionários digitais reais, executando tarefa real, da minha empresa real. <strong className="text-white">Você vê funcionando antes de comprar.</strong> Sem teatro, sem demo fake, sem {`"imagina que…"`}. É a operação que você quer ter, acontecendo na sua frente.
                     </p>
                  </Reveal>
               </div>
            </section>

            {/* --- SECTION 10: CONTRA-NARRATIVA (anti-Startse/G-bot/Olist) --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#070514] overflow-hidden border-b border-white/5">
               <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/5 blur-[140px] rounded-full pointer-events-none"></div>
               <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C5A572]/10 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-6xl mx-auto relative z-10">
                  <Reveal>
                     <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
                           <ShieldAlert className="w-4 h-4 text-red-500" />
                           <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-red-400">Aviso importante</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                           A indústria da IA te vende uma mentira. <br className="hidden md:block"/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">Eu vou te contar a verdade.</span>
                        </h2>
                     </div>
                  </Reveal>

                  <Reveal delay={150}>
                     <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0f25] to-[#070514] overflow-hidden backdrop-blur-md">
                        {/* Header */}
                        <div className="grid md:grid-cols-2 border-b border-white/10">
                           <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-red-500/5">
                              <div className="flex items-center gap-3">
                                 <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                 <span className="text-xs md:text-sm font-black uppercase tracking-widest text-red-400">❌ A indústria da IA diz...</span>
                              </div>
                           </div>
                           <div className="p-5 md:p-6 bg-[#C5A572]/5">
                              <div className="flex items-center gap-3">
                                 <CheckCircle2 className="w-5 h-5 text-[#C5A572] shrink-0" />
                                 <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#C5A572]">✅ A Imersão H.AI entrega...</span>
                              </div>
                           </div>
                        </div>

                        {/* 4 pares de comparação */}
                        {[
                           {
                              them: '"Tenha um time de agentes IA que trabalham 24/7 — demita o seu"',
                              us: 'Tenha um time de gente potencializada por IA que rende 3x — sem demitir uma pessoa'
                           },
                           {
                              them: '"De R$240k pra R$10k — economize trocando humano por IA"',
                              us: 'De R$240k pra R$720k — escale com o mesmo time, só amplificando cada um com IA'
                           },
                           {
                              them: '"Automação plug-and-play — é só plugar e esquecer"',
                              us: 'Método PulsarH.AI — IA personalizada pro SEU processo, feita com quem conhece seu negócio: você'
                           },
                           {
                              them: '"Compra a ferramenta, vê vídeos no YouTube, vira especialista"',
                              us: 'Assiste 22 aulas dirigidas + 1 Sessão 1:1 dentro do seu CNPJ — sai do mesmo dia com um plano'
                           }
                        ].map((row, i, arr) => (
                           <div key={i} className={`grid md:grid-cols-2 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                              <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/5 bg-red-500/[0.02] hover:bg-red-500/[0.04] transition-colors">
                                 <p className="text-slate-400 text-sm md:text-base font-light italic leading-relaxed line-through decoration-red-500/30 decoration-[1px]">{row.them}</p>
                              </div>
                              <div className="p-5 md:p-6 bg-[#C5A572]/[0.02] hover:bg-[#C5A572]/[0.05] transition-colors">
                                 <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed">{row.us}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Reveal>

                  {/* Manifesto final */}
                  <Reveal delay={400}>
                     <div className="mt-12 text-center max-w-3xl mx-auto">
                        <div className="space-y-4 p-6 md:p-10 rounded-3xl border-2 border-[#C5A572]/30 bg-gradient-to-br from-[#0a0f25] to-[#070514] shadow-[0_0_60px_rgba(197,165,114,0.15)]">
                           <p className="text-lg md:text-2xl text-white font-bold leading-snug">
                              A indústria quer que você <span className="text-red-400">demita pra lucrar.</span>
                           </p>
                           <p className="text-lg md:text-2xl text-white font-bold leading-snug">
                              Eu quero que você <span className="text-[#C5A572]">amplifique pra crescer.</span>
                           </p>
                           <p className="text-base md:text-lg text-slate-300 font-light italic pt-4 border-t border-white/10">
                              São duas visões de mundo diferentes. <strong className="text-white not-italic">Escolhe a sua.</strong>
                           </p>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

                        {/* --- SECTION 7: OFFER --- */}
            <section id="section-offer" className="py-24 px-6 lg:px-12 relative overflow-hidden bg-background border-y border-white/5 scroll-mt-28">
               <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                     <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6 animate-pulse">ACESSO LIBERADO</p>
                     <h2 className="text-2xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight uppercase mb-8 leading-tight">
                        Você não vai receber <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">só conteúdo.</span>
                     </h2>
                     <p className="text-xl md:text-3xl font-light text-slate-300">
                        Você vai entrar em uma <strong className="text-white font-medium">imersão com Rodrigo</strong> e levar:
                     </p>
                  </div>

                  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
                     <div className="glass-card bg-slate-900/60 p-10 border border-primary/20 rounded-3xl text-center shadow-[0_0_30px_rgba(197,165,114,0.1)] hover:-translate-y-2 transition-transform">
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">23</div>
                        <p className="text-slate-300 text-lg font-light">Aulas práticas em 5 módulos — Ruptura → DNA do Líder → IA.gentes → S.E.R → PULSAR+H</p>
                     </div>
                     <div className="glass-card bg-slate-900/60 p-10 border-2 border-[#C5A572]/50 rounded-3xl text-center shadow-[0_0_40px_rgba(197,165,114,0.2)] hover:-translate-y-2 transition-transform relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C5A572] text-black text-[9px] font-black uppercase tracking-widest rounded-full">DIFERENCIAL ÚNICO</div>
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">1:1</div>
                        <p className="text-slate-300 text-lg font-light"><strong className="text-white">Sessão Estratégica 90min comigo</strong> — você, eu e sua empresa na tela. Diagnóstico real e plano feito junto.</p>
                     </div>
                     <div className="glass-card bg-slate-900/60 p-10 border border-primary/20 rounded-3xl text-center shadow-[0_0_30px_rgba(197,165,114,0.1)] hover:-translate-y-2 transition-transform">
                        <div className="text-6xl font-black text-primary mb-6 drop-shadow-md">7d</div>
                        <p className="text-slate-300 text-lg font-light"><strong className="text-white">1 IA.gente operacional</strong> rodando na sua empresa em 7 dias + Acesso ao War Room ao vivo</p>
                     </div>
                  </div>


                  <div className="max-w-4xl mx-auto glass-card border-2 border-green-500/50 bg-gradient-to-br from-slate-900 to-[#0a0f25] p-6 md:p-10 rounded-2xl md:rounded-3xl relative shadow-[0_0_120px_rgba(34,197,94,0.25)]">
                     <div className="text-center mb-12">
                        <h3 className="text-xl md:text-2xl font-black text-[#C5A572] uppercase tracking-widest mb-6">Agora presta atenção.</h3>
                        <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic">Isso aqui NÃO é só um curso. <br className="hidden md:block"/> <strong className="text-white font-black uppercase text-xl md:text-2xl mt-2 block not-italic">É um upgrade de posicionamento profissional.</strong></p>
                     </div>

                     <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/10 py-12 mb-12 gap-8 relative">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-green-500 rounded-full blur-sm"></div>
                        <div className="text-center md:text-left">
                           <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-3">Valor real do pacote: <span className="line-through text-slate-600">R$ 6.691</span></p>
                           <p className="text-[10px] uppercase tracking-widest text-[#C5A572] font-black mb-2">Seu investimento hoje:</p>
                           <p className="text-3xl md:text-5xl text-green-400 font-black tracking-tighter drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">R$ 697</p>
                           <p className="text-sm text-slate-400 font-light mt-2">à vista · ou 12x R$ 69,82 sem juros · PIX com 5% off</p>
                        </div>
                        <div className="text-center md:text-right">
                           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A572]/30 bg-[#C5A572]/5 mb-4">
                              <div className="w-2 h-2 rounded-full bg-[#C5A572] animate-pulse"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A572]">Lote de Abertura</span>
                           </div>
                           <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Quando esgotar,<br/>próximo lote sobe pra R$ 1.197</p>
                        </div>
                     </div>

                     <div className="bg-white/[0.03] rounded-2xl p-6 md:p-8 border border-white/5 mb-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 bg-green-500 text-black text-[12px] font-black uppercase tracking-widest rounded-bl-2xl shadow-xl z-20">Incluso</div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 text-center mb-10">
                           <p className="text-primary font-black uppercase tracking-widest text-sm mb-4">Tudo o que você recebe ao entrar:</p>
                           <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                              O PACOTE COMPLETO <br/>
                              <span className="text-green-400 underline decoration-green-500/30 underline-offset-8">R$ 6.691 POR R$ 697</span>
                           </h4>
                        </div>

                        <ul className="space-y-4 relative z-10">
                           {[
                              { name: "23 aulas práticas em 5 módulos (acesso 12 meses)", price: "R$1.997" },
                              { name: "Sessão Estratégica 1:1 com Rodrigo (90min)", price: "R$2.500" },
                              { name: "Acesso ao War Room ao vivo", price: "R$997" },
                              { name: "1 IA.gente operacional em 7 dias", price: "R$1.197" },
                              { name: "Comunidade de donos de loja em transformação", price: "Incluso" },
                              { name: "Garantia Cristal de 7 dias", price: "Inestimável" }
                           ].map((bonus, i) => (
                              <li key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 gap-4 group/item hover:border-green-500/20 transition-colors">
                                 <span className="text-slate-200 font-medium flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                       <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    </div>
                                    {bonus.name}
                                 </span>
                                 <span className="text-slate-600 line-through font-mono text-sm">{bonus.price}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="mt-4">
                        <RegistrationForm btnText="🎯 QUERO MEU PLANO DE IA" />
                     </div>
                     <div className="mt-6 text-center">
                        <p className="text-[11px] text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
                           🛡️ <strong className="text-slate-300 uppercase tracking-wider text-[10px]">Garantia Cristal de 7 dias:</strong> Você entra, assiste o que quiser, participa da Sessão 1:1, acessa o War Room. Se nos primeiros 7 dias achar que não é pra você, devolvemos 100%. Risco zero.
                        </p>
                     </div>
                  </div>
               </div>
            </section>\n\n            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-surface border-b border-white/5 overflow-hidden relative">
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none mix-blend-overlay"></div>
               <div className="w-full relative z-10">
                  <Reveal>
                     <div className="text-center mb-16 px-6">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                           💬 Quem passou pela imersão sentiu a diferença na prática
                        </h3>
                        <p className="text-xl text-primary font-medium tracking-wide">
                           Mais lucro. Time mais leve. Empresa rodando sem o dono ser o gargalo.
                        </p>
                     </div>
                  </Reveal>
                  <div className="relative w-full overflow-hidden mb-16">
                     <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none"></div>
                     <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none"></div>
                     <div className="flex w-max animate-scroll hover:[animation-play-state:paused] group">
                        {[...testimonials, ...testimonials].map((t, i) => (
                           <div key={i} className="w-[300px] md:w-[400px] mx-3 md:mx-5 p-6 md:p-8 rounded-2xl border border-primary/20 bg-slate-900/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(107,45,139,0.15)] group/card shrink-0">
                              <div className="mb-4 md:mb-6">
                                 <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex gap-1">
                                       {[1, 2, 3, 4, 5].map(star => (
                                          <svg key={star} className="w-4 h-4 text-[#C5A572] fill-[#C5A572]" viewBox="0 0 20 20">
                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                       ))}
                                    </div>
                                    <Quote className="w-8 h-8 text-primary/20 group-hover/card:text-primary/40 transition-colors" />
                                 </div>
                                 <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed">"{t.text}"</p>
                              </div>
                              <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#6B2D8B] flex items-center justify-center text-slate-950 font-bold text-sm">
                                    {t.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-white font-bold text-base">{t.name}</p>
                                    <p className="text-[#C5A572] text-xs uppercase tracking-widest font-bold mt-0.5">{t.role}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="text-center px-6">
                     <p className="text-slate-400 text-lg mb-3 font-light italic">+200 donos de loja já passaram pela imersão.</p>
                     <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-[#C5A572]/20 bg-[#C5A572]/5 mb-8">
                        <p className="text-slate-200 italic text-base md:text-lg font-light leading-relaxed mb-3">"Saí de operador 60h/semana pra arquiteto 25h/semana. Mesma loja, mais lucro, time mais leve. O método funciona."</p>
                        <p className="text-[#C5A572] font-bold text-sm uppercase tracking-widest">— NAP Tintas · Sorocaba/SP <span className="text-slate-500 normal-case font-light">(case ativo de mentoria PulsarH.AI)</span></p>
                     </div>
                     <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest gap-3 mx-auto">
                        🔵 QUERO MINHA EMPRESA RODANDO SEM MIM
                        <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- BIO --- */}
            <section className="py-24 px-6 lg:px-12 relative bg-background border-b border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0D1847]/20 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  <div className="relative order-1">
                     <Reveal>
                        <div className="relative z-10">
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#6B2D8B]/30 rounded-2xl blur-xl -z-10 transform translate-y-4 translate-x-4"></div>
                           <img src="https://storage.googleapis.com/msgsndr/mUZEjZcfs8vJQPN3EnCF/media/693c55bae918008870673d5d.png" alt="Rodrigo Braga" className="w-full h-auto rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
                           <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl border border-primary/20 shadow-xl hidden md:block">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Fingerprint className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="text-white font-bold text-sm">Método PulsarH.AI</p>
                                    <p className="text-[10px] text-primary uppercase tracking-wider">Fundador PulsarH.AI</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Reveal>
                  </div>
                  <div className="order-2">
                     <Reveal delay={200}>
                        <p className="text-[#C5A572]/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">QUEM TÁ DO OUTRO LADO DA TELA</p>
                        <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
                           Eu já fui você. <span className="text-[#C5A572]">E saí.</span>
                        </h2>
                        <p className="text-primary font-bold tracking-wider uppercase text-sm mb-8 flex items-center gap-2">
                           <div className="w-8 h-[2px] bg-primary"></div>
                           Rodrigo Braga · Fundador da PulsarH.AI
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-4 font-light">
                           Passei <strong className="text-white font-bold">15 anos no corporate.</strong> Liderei mais de 200 pessoas, toquei operações grandes, ganhei prêmio, aprendi a apagar incêndio com elegância. Cheguei no topo da carreira que prometeram pra mim — e não dormia mais.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-4 font-light">
                           Saí. Montei a <strong className="text-white font-bold">PulsarH.AI do zero.</strong> Hoje somos <strong className="text-[#C5A572] font-bold">4 humanos e 18 IA.gentes operando 24 horas por dia</strong>. Empresa real, faturando, atendendo cliente, vendendo, crescendo. Eu não sou o gargalo de nada. Trabalho menos do que trabalhava como gerente — e ganho mais.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                           Não sou guru. Não vendo {`"`}mindset{`"`}. Não tenho fórmula mágica. Construí um método porque precisei sair de operador pra arquiteto da minha própria empresa, e descobri que o caminho serve pra qualquer dono de negócio entre <strong className="text-white">R$80 mil e R$1,2 milhão de faturamento</strong> que tá no mesmo lugar onde eu estava.
                        </p>
                        <ul className="space-y-6 mb-12">
                           {[
                              "Se funcionou pra mim, funciona pra você. Mesmo nicho, mesmo tamanho, mesma dor.",
                              "Empresa real rodando — você vê funcionando antes de comprar.",
                              "Único programa no Brasil com Sessão Estratégica 1:1 dentro do SEU negócio"
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
                           <p className="text-slate-200 text-base mb-6 font-light"><strong className="text-white">Se funcionou pra mim, funciona pra você.</strong> Só falta alguém te mostrar a saída.</p>
                           <button onClick={scrollToOffer} className="btn-neon px-8 py-4 text-xs tracking-widest gap-3">
                              QUERO TIRAR MINHA EMPRESA DE MIM
                              <ArrowRight className="w-4 h-4 relative z-10" />
                           </button>
                        </div>
                     </Reveal>
                  </div>
               </div>
            </section>

            {/* --- SECTION 13: GARANTIA CRISTAL CLARA (dedicada) --- */}
            <section className="relative py-24 px-6 lg:px-12 bg-[#050410] overflow-hidden border-b border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/10 blur-[140px] rounded-full pointer-events-none"></div>

               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center p-8 md:p-12 rounded-3xl border-2 border-green-500/40 bg-gradient-to-br from-green-900/20 via-[#0a0f25] to-[#070514] shadow-[0_0_80px_rgba(34,197,94,0.2)]">

                        {/* Selo Visual */}
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

                        {/* Copy */}
                        <div>
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-green-400 mb-3 flex items-center gap-2">
                              🛡️ Garantia PulsarH.AI Cristal Clara
                           </p>
                           <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight mb-6">
                              Você entra. Testa. <br className="hidden md:block"/>
                              <span className="text-green-400">Se não for pra você, devolvemos 100%.</span>
                           </h3>

                           <ul className="space-y-3 mb-6">
                              {[
                                 'Você entra na Imersão e assiste o que quiser',
                                 'Participa da Sessão Estratégica 1:1 com Rodrigo',
                                 'Acessa o War Room ao vivo da PulsarH.AI'
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
                                 Se nos primeiros 7 dias achar que não é pra você, <span className="text-green-400">devolvemos 100%.</span>
                              </p>
                              <p className="text-slate-400 text-xs md:text-sm font-light italic mt-3 leading-relaxed">
                                 Sem pergunta, sem burocracia, sem cara feia. Risco zero. Quem topa o jogo entra. Quem não topa, sai inteiro.
                              </p>
                           </div>
                        </div>

                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- FAQ --- */}
            <section className="py-16 md:py-24 px-6 lg:px-12 relative bg-background border-t border-white/5">
               <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572] mb-16 uppercase tracking-tight">Perguntas Frequentes</h2>
                  <div className="space-y-4 mb-16">
                     {faqs.map((faq, index) => (
                        <div key={index} className="glass-card rounded-lg overflow-hidden border border-white/5 hover:border-primary/30 transition-all">
                           <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-6 text-left group">
                              <span className={`font-bold uppercase tracking-tight text-sm ${openFaqIndex === index ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`}>{faq.question}</span>
                              {openFaqIndex === index ? <Minus className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-slate-600" />}
                           </button>
                           {openFaqIndex === index && (
                              <div className="p-6 pt-0 text-slate-400 font-light text-sm leading-relaxed border-t border-white/5 bg-slate-900/20 text-left whitespace-pre-wrap">
                                 {faq.answer}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>

                  <div className="px-6">
                     <p className="text-slate-400 text-lg mb-8 font-light italic">Ainda tem alguma dúvida? Comece agora e veja na prática.</p>
                     <button onClick={scrollToOffer} className="btn-neon py-4 px-8 text-sm md:text-base tracking-widest gap-3 mx-auto">
                        GARANTIR MEU ACESSO AGORA
                        <ArrowRight className="w-5 h-5 relative z-10" />
                     </button>
                  </div>
               </div>
            </section>

            {/* --- SECTION 15: CTA FINAL + ASSINATURA --- */}
            <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-gradient-to-b from-[#050410] to-[#020617] overflow-hidden border-t border-white/5">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C5A572]/10 blur-[160px] rounded-full pointer-events-none"></div>
               <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>

               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <h2 className="text-3xl md:text-6xl font-heading font-black text-white text-center uppercase tracking-tighter leading-[0.9] mb-8">
                        Em 90 dias, <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2D8B] to-[#C5A572]">o jogo vira.</span>
                     </h2>
                     <p className="text-2xl md:text-3xl font-black text-white text-center mb-16">
                        Você vai estar em qual lado?
                     </p>
                  </Reveal>

                  <Reveal delay={150}>
                     <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16 max-w-4xl mx-auto">
                        <div className="p-6 md:p-7 rounded-2xl border border-[#C5A572]/30 bg-[#C5A572]/5 backdrop-blur-md">
                           <div className="flex items-start gap-3 mb-3">
                              <Trophy className="w-6 h-6 text-[#C5A572] shrink-0 mt-0.5" />
                              <p className="text-[#C5A572] text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Lado que arruma a casa primeiro</p>
                           </div>
                           <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed">
                              Empresa rodando sem o dono virar gargalo. Margem blindada. Time mais leve, mais produtivo, ninguém demitido. Concorrente olhando sem entender.
                           </p>
                        </div>
                        <div className="p-6 md:p-7 rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-md">
                           <div className="flex items-start gap-3 mb-3">
                              <UserMinus className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                              <p className="text-red-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Lado que esperou pra ver</p>
                           </div>
                           <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed">
                              Assistiu o concorrente automatizar e ganhar velocidade. Travou no medo. Continuou sendo o gargalo da própria empresa até o caixa não fechar mais.
                           </p>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal delay={300}>
                     <div className="text-center mb-10">
                        <p className="text-xl md:text-2xl text-white font-bold mb-2">
                           A Imersão é o atalho. <span className="text-[#C5A572]">Eu criei.</span>
                        </p>
                        <p className="text-base md:text-lg text-slate-300 font-light">
                           23 aulas. 1 Sessão 1:1 comigo. Plano de 90 dias por escrito, com seu nome em cima.
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={450}>
                     <div className="text-center mb-8">
                        <p className="text-[10px] md:text-xs text-[#C5A572] font-black uppercase tracking-[0.3em] mb-2">Seu investimento:</p>
                        <p className="text-3xl md:text-5xl font-black text-white mb-1">12x <span className="text-[#C5A572]">R$69,82</span></p>
                        <p className="text-sm md:text-base text-slate-400 font-light">ou R$697 à vista · PIX com 5% off</p>
                     </div>
                  </Reveal>

                  <Reveal delay={600}>
                     <div className="flex flex-col items-center gap-6 mb-14">
                        <button onClick={scrollToOffer} className="relative overflow-hidden group px-10 md:px-14 py-5 md:py-6 rounded-2xl bg-gradient-to-r from-[#6B2D8B] via-[#8B5CB8] to-[#C5A572] shadow-[0_0_60px_rgba(197,165,114,0.4)] hover:shadow-[0_0_100px_rgba(197,165,114,0.7)] hover:scale-105 transition-all text-white font-black uppercase tracking-widest text-sm md:text-base flex items-center gap-3">
                           🎯 QUERO MINHA EMPRESA RODANDO SEM MIM
                           <ArrowRight className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/5">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-green-400">🛡️ Garantia Cristal de 7 dias · Risco zero</span>
                        </div>

                        <p className="text-[10px] md:text-xs text-slate-500 font-light text-center max-w-md">
                           Pagamento seguro Hotmart · SSL · Aceita todos os cartões · PIX com 5% off · Acesso imediato às 23 aulas
                        </p>
                     </div>
                  </Reveal>

                  <Reveal delay={800}>
                     <div className="max-w-2xl mx-auto p-8 rounded-3xl border-l-4 border-[#C5A572] bg-white/[0.02] backdrop-blur-md">
                        <p className="text-slate-300 text-base md:text-lg font-light italic leading-relaxed mb-4">
                           "Última coisa: se você tá procurando atalho fácil, fórmula de 7 dias ou robozinho que substitui funcionário, sai dessa página agora. Aqui é trabalho de verdade, com método de verdade, pra dono de loja que quer construir empresa de verdade. Se for isso que você quer — clica aí em cima e vamos. <strong className="text-white not-italic">Te espero na sessão.</strong>"
                        </p>
                        <p className="text-[#C5A572] text-sm font-black uppercase tracking-widest">— Rodrigo Braga, fundador PulsarH.AI</p>
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
               <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">&copy; {new Date().getFullYear()} Todos os direitos reservados. PulsarH - Rodrigo Braga.</p>
            </footer>
         </main>

      </div>
   );
}
