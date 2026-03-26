
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
      <div className="border border-white/5 bg-slate-900/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-500/20 mb-4">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 text-left group"
         >
            <div className="flex items-center gap-4">
               {icon && <div className="text-yellow-500 group-hover:scale-110 transition-transform">{icon}</div>}
               <span className="text-slate-200 font-bold uppercase tracking-widest text-sm md:text-base">{title}</span>
            </div>
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-500' : 'text-slate-500'}`}>
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
      { question: "Isso é mais um curso de IA?", answer: "Não.\nCurso ensina ferramenta.\nAqui você aprende a LIDERAR gente + IA na operação real.\nSe você quer só 'aprender prompt'… isso não é pra você." },
      { question: "Eu preciso saber programar ou ter conhecimento técnico?", answer: "Não.\nVocê vai usar IA como líder, não como desenvolvedor.\nO foco é decisão, estratégia e execução — não código." },
      { question: "Isso funciona pra qualquer área ou só tecnologia?", answer: "Funciona pra qualquer área que tenha pessoas e operação.\nOu seja: praticamente TODAS." },
      { question: "Quanto tempo eu preciso dedicar?", answer: "Poucas horas já mudam sua forma de liderar.\nA diferença é que aqui você implementa enquanto aprende." },
      { question: "E se minha empresa ainda não usa IA?", answer: "Melhor ainda.\nVocê vai sair na frente e virar referência interna." },
      { question: "E se minha empresa já usa IA?", answer: "Então você já viu o problema:\nferramenta sem liderança não gera resultado.\nAqui você resolve isso." },
      { question: "Isso serve pra quem quer ser promovido?", answer: "Serve principalmente pra isso.\nEsse é o tipo de habilidade que a diretoria procura — e não encontra." },
      { question: "Sou empresário. Isso ajuda meu negócio ou só minha liderança?", answer: "Os dois.\nVocê aprende a estruturar operação com IA e formar líderes mais eficientes.\nIsso escala empresa, não só carreira." },
      { question: "Trabalho com RH. Isso faz sentido pra mim?", answer: "Faz mais do que sentido.\nVocê vai sair com base prática pra preparar líderes e times pra nova era.\nQuem não fizer isso agora… vai ficar obsoleto." },
      { question: "Isso é teórico ou prático?", answer: "Prático.\nTudo foi desenhado pra aplicação imediata na sua rotina." },
      { question: "E se eu não implementar?", answer: "Então nada muda.\nMas alguém no seu lugar vai implementar… e passar na sua frente." },
      { question: "Por que essa oferta está liberada com bônus hoje?", answer: "Porque a decisão precisa ser agora.\nEsse é o tipo de movimento que separa quem cresce de quem fica parado." }
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
         <SocialProofPopup />

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
               <span className="font-heading font-black text-lg tracking-tight uppercase text-white">PulsarH<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-yellow-500">.AI</span></span>
            </div>
            <button onClick={scrollToOffer} className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted hover:text-green-500 transition-colors">
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
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 glass-pill mb-8 border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 drop-shadow-md">O Novo Jogo Corporativo</span>
                        </div>
                     </Reveal>
                     
                     <Reveal delay={200}>
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-light leading-snug tracking-tight text-white mb-6">
                           Hoje, líderes disputados no mercado operam em um nível que a maioria sequer perceberam que existe. Eles lideram:
                        </h1>
                     </Reveal>
                     
                     <Reveal delay={300}>
                        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-[#D97706] to-[#9333EA] mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)] tracking-tighter leading-[1] pb-2">
                           Gente<br/>+ IA.gentes
                        </h2>
                     </Reveal>
                     
                     <Reveal delay={400}>
                        <p className="text-lg md:text-xl font-light text-slate-300 leading-relaxed max-w-xl mb-12 italic border-l-2 border-yellow-500/30 pl-6">
                           E enquanto alguns já estão sendo promovidos por isso, <strong className="font-bold text-white not-italic">outros estão sendo silenciosamente substituídos.</strong>
                        </p>
                     </Reveal>
                     
                     <Reveal delay={500}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                           <button onClick={scrollToOffer} className="relative overflow-hidden group px-10 py-5 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] flex items-center justify-center gap-3">
                              <span className="text-yellow-400 group-hover:text-yellow-300 font-bold uppercase tracking-widest text-xs md:text-sm relative z-10 transition-colors drop-shadow-md">
                                 👉 ENTRE PARA O LADO QUE SOBE
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-400/20 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                           </button>
                           
                           <p className="text-[10px] text-yellow-500/60 uppercase tracking-[0.3em] font-bold">
                              Você já sabe<br/> de qual lado está?
                           </p>
                        </div>
                     </Reveal>
                     
                  </div>
               </div>
            </section>

            {/* --- SECTION 2: THE SECOND WAVE --- */}
            <section className="relative py-32 px-6 lg:px-12 bg-[#070514] overflow-hidden">
               <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                  <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                  <div className="absolute inset-0 bg-tech-grid opacity-5"></div>
               </div>

               <div className="max-w-5xl mx-auto relative z-10">
                  <Reveal>
                     <div className="mb-24">
                        <h3 className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm mb-6 text-center">A segunda revolução da inteligência artificial</h3>
                        <h2 className="text-3xl md:text-6xl font-heading font-black text-white text-center leading-tight uppercase tracking-tight mb-8">
                           POR QUE A PRIMEIRA ONDA DA IA FOI <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">APENAS UM TESTE…</span><br/>
                           E A ERA DOS AGENTES VAI EXTERMINAR O <span className="text-yellow-400">LÍDER QUE SÓ GERE PESSOAS</span>
                        </h2>
                     </div>
                  </Reveal>

                  <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                     <Reveal>
                        <div className="space-y-8">
                           <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                              A primeira onda da IA gerou deslumbramento tecnológico. Foi barulhenta, mas mudou pouco a hierarquia das empresas. A segunda onda, a Era dos Agentes, está reescrevendo o organograma.
                           </p>
                           <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                              Hoje, algoritmos já tomam decisões e executam rotinas complexas de ponta a ponta. Se a sua única habilidade for "entender de pessoas" ou "cuidar de processos manuais", a sua cadeira está ameaçada. O líder que se recusa a comandar agentes de Inteligência Artificial ao lado do seu time humano será engolido pela velocidade dos concorrentes. Você não precisa aprender a programar, mas tem a obrigação inegociável de aprender a comandar. O futuro só tem espaço para o Líder Híbrido.
                           </p>
                        </div>
                     </Reveal>
                     <Reveal delay={100}>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm flex items-center gap-6 group hover:border-yellow-500/20 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                 <Users className="w-6 h-6" />
                              </div>
                              <span className="text-slate-200 text-lg font-light tracking-wide">Líderes curiosos.</span>
                           </div>
                           <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm flex items-center gap-6 group hover:border-yellow-500/20 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                 <Zap className="w-6 h-6" />
                              </div>
                              <span className="text-slate-200 text-lg font-light tracking-wide">Equipes experimentando.</span>
                           </div>
                           <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-sm flex items-center gap-6 group hover:border-yellow-500/20 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                 <Search className="w-6 h-6" />
                              </div>
                              <span className="text-slate-200 text-lg font-light tracking-wide">Empresas tentando entender.</span>
                           </div>
                        </div>
                     </Reveal>
                  </div>

                  <Reveal>
                     <div className="glass-card bg-[#0a0f25]/60 border border-red-500/20 p-10 md:p-16 rounded-[40px] mb-32 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
                        <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
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
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-10">
                           <Crown className="w-4 h-4" />
                           A Nova Orquestração
                        </div>
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-white uppercase mb-12 leading-tight">
                           O líder híbrido não usa IA pra trabalhar mais. <br/>
                           <span className="text-yellow-400">Ele usa IA pra liderar melhor.</span>
                        </h3>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
                           {[
                              { label: 'IA executa', icon: Cpu, desc: 'Sistemas inteligentes cuidam do braço robótico da operação.' },
                              { label: 'Pessoas evoluem', icon: TrendingUp, desc: 'O líder foca na evolução humana e estratégica do time.' },
                              { label: 'O resultado escala', icon: RocketIcon, desc: 'A operação cresce sem depender da sua presença 24/7.' }
                           ].map((item, i) => (
                              <div key={i} className="glass-card p-8 border-white/5 bg-slate-900/40 rounded-2xl hover:border-yellow-500/30 transition-all group">
                                 <item.icon className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
                                 <p className="text-white font-black uppercase tracking-wider mb-2">{item.label}</p>
                                 <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                              </div>
                           ))}
                        </div>

                        <div className="p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-[#0a0f25] to-[#070514] border border-yellow-500/40 relative shadow-[0_0_80px_rgba(234,179,8,0.15)] flex flex-col items-center">
                           <p className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-12">
                              A segunda onda não é sobre ferramenta. <br className="hidden md:block"/> 
                              É sobre quem consegue integrar: <br className="hidden md:block"/>
                              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-black uppercase text-2xl md:text-5xl block mt-4">Pessoas + IA</strong>
                              na mesma operação.
                           </p>
                           <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest flex items-center justify-center gap-3">
                              🔵 CLIQUE AGORA E COMECE A SE TORNAR UM LÍDER HÍBRIDO
                           </button>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* --- NEW SECTION: THE SYSTEM REVELATION --- */}
            <section className="relative min-h-[70vh] flex items-center justify-center py-32 px-6 lg:px-12 overflow-hidden">
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
                     <h2 className="text-3xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
                        ISSO NÃO É CURSO. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
                           É SISTEMA OPERACIONAL.
                        </span>
                     </h2>
                     
                     <div className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[40px] shadow-[0_0_100px_rgba(234,179,8,0.1)] inline-block max-w-4xl">
                        <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed mb-8">
                           Nossa imersão é objetiva e direto ao ponto. <br className="hidden md:block"/> 
                           E para você que pensa: <span className="italic text-yellow-500">"Mas eu já fiz cursos de liderança..."</span>
                        </p>
                        <p className="text-2xl md:text-3xl text-white font-medium mb-10 leading-snug">
                           Nenhum treinamento que você fez te ensinou a <br className="hidden md:block"/>
                           <span className="font-black text-yellow-400">CRIAR UM AGENTE DE IA</span> e <span className="font-black text-yellow-400">LIDERAR PESSOAS</span> <br className="hidden md:block"/> 
                           ao mesmo tempo. <span className="uppercase text-yellow-500 tracking-widest font-black ml-2 underline underline-offset-8">Esse ensina.</span>
                        </p>
                        <div className="p-6 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 inline-block">
                           <p className="text-yellow-500 font-bold tracking-widest uppercase text-sm">
                              🛡️ SE NADA MUDAR EM 7 DIAS, DEVOLVO SEU DINHEIRO.
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
                        <h3 className="text-4xl md:text-6xl font-heading font-black text-white text-center mb-12 uppercase tracking-tight">Aqui você vai <span className="text-yellow-400">aprender...</span></h3>
                        
                        <div className="space-y-4">
                           <AccordionItem title="MÓDULO 1 — O PONTO DE RUPTURA (O CHÃO SUMIU)" icon={<Eye className="w-5 h-5" />}>
                              <div className="space-y-8">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Desconstruir a falsa sensação de segurança do líder tradicional e injetar a urgência da ação imediata.</p>
                                 </div>
                                 <div className="grid md:grid-cols-1 gap-6">
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 1.1 — O Código da Sobrevivência: Os 3 Dados que Mudam Tudo</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">O choque de realidade através dos números que Google, McKinsey e Microsoft já dominam. Você entenderá por que 5% dos líderes ganham 4,5x mais e por que 82% das empresas consideram este o "ano pivotal". Ao final, você saberá exatamente de qual lado da mesa quer estar.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 1.2 — A Extinção dos Líderes Unidimensionais</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Por que "entender de gente" ou "entender de tecnologia" isoladamente virou sentença de morte profissional. Através de exemplos reais, você descobrirá por que o mercado não aceita mais "metade de um líder" e como se tornar o terceiro tipo: o líder que domina humanos e algoritmos.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 1.3 — A Era dos Agentes: A Revolução em Tempo Real</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Deixe de ver a IA como futuro e entenda como a gestão de agentes (IA.gentes) já é a norma na HBR e nas empresas de elite. Você fará seu primeiro autodiagnóstico para mapear sua posição nesta transição histórica de 100 milhões de agentes no mercado.</p>
                                    </div>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 2 — AS 5 DIMENSÕES DO COMANDO (QUEM FICA E QUEM SAI)" icon={<Layers className="w-5 h-5" />}>
                              <div className="space-y-8">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Instalar o mapa de competências da elite e identificar as vulnerabilidades ocultas na sua liderança.</p>
                                 </div>
                                 <div className="grid md:grid-cols-1 gap-6">
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 2.1 — O Líder Conector (Dimensão Tecnológica)</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Domine a arte de conectar mercado, gente e tecnologia sem precisar escrever uma linha de código. Você aprenderá a ser o arquiteto da solução, não o operário da ferramenta.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 2.2 — O Líder Hiperprodutivo (Dimensão Estratégica)</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Instale a IA como o seu "exoesqueleto mental". Aprenda a terceirizar o trabalho robótico para focar no que realmente gera ROI. Exercício: O Extermínio das 5 Tarefas Inúteis.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 2.3 — O Líder Humilde (Dimensão Psicológica)</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Como vencer o ego e adotar a "Mente de Principiante" para manter o discernimento acima do excesso de informação. Identifique onde seu orgulho está travando o crescimento do seu time.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 2.4 — O Líder Sistêmico (Dimensão Cultural)</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Aprenda a criar uma cultura que sobrevive à troca de pessoas, usando decisões baseadas em dados sem perder a essência humana. O sistema trabalha para você, não o contrário.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 2.5 — O Líder Humano (Dimensão Comportamental)</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">O domínio da "Biologia da Confiança". Entenda por que nenhum IA.gente gera pertencimento ou evita demissões. Descubra como usar o tempo livre da tecnologia para focar na única coisa que as máquinas nunca farão: olhar no olho e liderar almas.</p>
                                    </div>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 3 — IMPACTO IMEDIATO: 7 DIAS PARA A VIRADA" icon={<Zap className="w-5 h-5" />}>
                              <div className="space-y-8">
                                 <div>
                                    <p className="text-white text-lg font-light italic">Implementação prática e ROI instantâneo. Três ferramentas prontas para rodar na sua operação na mesma semana.</p>
                                 </div>
                                 <div className="grid md:grid-cols-1 gap-6">
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 3.1 — A 1:1 Magnética: O Script da Retenção</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Saia da conversa morna e aplique a Estrutura PulsarH em 6 momentos. Você receberá o template pronto para transformar sua próxima reunião individual em um motor de engajamento e clareza.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 3.2 — O Método dos Andares: Conversas Difíceis sem Medo</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Como resolver conflitos e cobrar resultados usando a técnica de Empatia + Fato + Acordo. Um roteiro pronto para você ter aquela conversa que está adiando há meses em até 72 horas.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 3.3 — Nascimento do seu Primeiro IA.gente Operacional</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">O fim da teoria. Em 30 minutos e sem código, você criará um agente de IA real para preparar suas reuniões e monitorar dados. É o momento onde você sente, na prática, o poder de ter um braço digital de execução.</p>
                                    </div>
                                 </div>
                              </div>
                           </AccordionItem>

                           <AccordionItem title="MÓDULO 4 — O SISTEMA OPERACIONAL PULSARH" icon={<Cpu className="w-5 h-5" />}>
                              <div className="space-y-8">
                                 <div>
                                    <p className="text-white text-lg font-light italic">A visão do todo. O mapa completo para sair da imersão e entrar na jornada de mestre da nova era.</p>
                                 </div>
                                 <div className="grid md:grid-cols-1 gap-6">
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 4.1 — O Decálogo do Novo Mundo: Os 10 Mandamentos do Líder</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">Conheça os pilares inegociáveis de quem lidera o mercado atual. Você verá o "antes e depois" de quem aplicou o método e entenderá que a fundação foi apenas o começo de um edifício de autoridade.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 4.2 — O Ciclo PULSAR + IA.gentes: A Máquina Híbrida em Ação</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">A demonstração final. Veja como Planejar, Executar, Lapidar e Alavancar usando humanos e agentes em sincronia total. É a visão da sua futura operação: produtividade infinita com engajamento humano real.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                       <h5 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider">Aula 4.3 — O Convite de Elite: Sua Cadeira na Formação Líder PulsarH.ai</h5>
                                       <p className="text-slate-400 text-sm leading-relaxed">O acesso ao programa completo de 12 módulos e 65 aulas. Depoimentos, resultados de ROI comprovado e a oferta exclusiva para quem não quer apenas "assistir à revolução", mas liderá-la.</p>
                                    </div>
                                 </div>
                              </div>
                           </AccordionItem>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal>
                     <div className="glass-card bg-[#0a0f25]/60 border border-yellow-500/20 p-10 md:p-16 rounded-[40px] relative overflow-hidden group">
                        <div className="text-center mb-10">
                           <h4 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest mb-10">
                              E antes que pense: "Não tenho tempo." ou "é muito barato — deve ser raso." eu te digo:
                           </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/20 transition-all">
                              <p className="text-yellow-500 font-black text-3xl mb-4">01</p>
                              <p className="text-white text-lg font-light leading-relaxed">São 12 aulas de ~15 minutos. Menos de 3 horas no total. E você tem uma reunião 1:1 de 30 minutos direto com Rodrigo Braga pra focar exatamente onde o calo aperta. Zero teoria inútil. Só o que muda resultado.</p>
                           </div>
                           <div className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/20 transition-all">
                              <p className="text-yellow-500 font-black text-3xl mb-4">02</p>
                              <p className="text-white text-lg font-light leading-relaxed">O preço é um filtro. Queremos achar os líderes comprometidos que vão pra Formação Core. Por isso entregamos desproporcional: 12 aulas + 1:1 individual + seu primeiro IA.gente funcionando. Se fosse pelo valor real, seria R$2.000+. Estamos investindo em você antes de você investir na formação.</p>
                           </div>
                        </div>
                        <div className="mt-16 text-center">
                           <button onClick={scrollToOffer} className="btn-neon px-12 py-5 text-sm md:text-base tracking-widest flex items-center justify-center gap-3 mx-auto">
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
                     <div className="glass-card bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-3xl h-full flex flex-col shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                        <h3 className="text-xl md:text-3xl font-heading font-black text-white uppercase mb-8 flex items-center gap-4">
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
                              "Procura mais um curso pra consumir e esquecer",
                              "Fica brincando de fazer pergunta no ChatGPT e acha que já “domina IA”",
                              "Grita com o time, pressiona resultado e chama isso de liderança",
                              "Acredita que delegar tecnologia pro TI resolve o problema",
                              "Se esconde atrás de excesso de reunião porque não sabe estruturar operação",
                              "Vive ocupado o dia inteiro… mas não consegue escalar resultado",
                              "Acha que produtividade individual resolve problema de time",
                              "Espera a empresa “se adaptar primeiro” pra depois agir",
                              "Já percebeu que está ficando para trás… e mesmo assim não faz nada"
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
                           <button onClick={scrollToOffer} className="btn-neon w-full px-6 py-5 text-xs md:text-sm tracking-widest flex items-center justify-center gap-2">
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
                              <div className="p-6 pt-0 text-slate-400 font-light text-sm leading-relaxed border-t border-white/5 bg-slate-900/20 text-left whitespace-pre-wrap">
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
                  <span className="font-heading font-black uppercase tracking-tight text-white">PulsarH<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-yellow-500">.AI</span></span>
               </div>
               <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">&copy; {new Date().getFullYear()} Todos os direitos reservados. PulsarH - Rodrigo Braga.</p>
            </footer>
         </main>

      </div>
   );
}
