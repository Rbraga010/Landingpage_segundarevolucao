const fs = require('fs');

const path = 'App.tsx';
let data = fs.readFileSync(path, 'utf8');
const lines = data.split('\n');

// Extrair/Modificar as partes.
// IMPORT: precisamos adicionar Crown e TrendingUp se não existirem
if (!lines.slice(0, 30).join('\n').includes('Crown')) {
    data = data.replace('X,', 'Crown,\n   TrendingUp,\n   X,');
}

// 1. Substituir "DIFFERENCE & JOURNEY" (linhas 444 a 564, note que arrays são 0-indexed, então 443 a 563)
const newSystemAndForWhom = `            {/* --- SECTION 5: NEW OPERATIONAL SYSTEM --- */}
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
            </section>`;

// 2. Substituir OFFER (linhas 566 a 706)
const newOffer = `            {/* --- SECTION 7: OFFER --- */}
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
            </section>`;

// Vamos usar string replacement usando regex pra pegar os blocos exatos e com segurança

let updatedData = data;

// Find "DIFFERENCE & JOURNEY" section block block
const startDiff = updatedData.indexOf('{/* --- DIFFERENCE & JOURNEY --- */}');
const endDiff = updatedData.indexOf('{/* --- SECTION: OFFER (RETAIL STYLE REWORK) --- */}');

if (startDiff !== -1 && endDiff !== -1) {
    updatedData = updatedData.slice(0, startDiff) + newSystemAndForWhom + '\\n\\n            ' + updatedData.slice(endDiff);
}

// Find OFFER block
const startOffer = updatedData.indexOf('{/* --- SECTION: OFFER (RETAIL STYLE REWORK) --- */}');
const endOffer = updatedData.indexOf('{/* --- TESTIMONIALS --- */}');

if (startOffer !== -1 && endOffer !== -1) {
    updatedData = updatedData.slice(0, startOffer) + newOffer + '\\n\\n            ' + updatedData.slice(endOffer);
}

// Find "FOR WHOM?" block
const startForWhom = updatedData.indexOf('{/* --- FOR WHOM? --- */}');
const endForWhom = updatedData.indexOf('{/* --- BIO --- */}');

if (startForWhom !== -1 && endForWhom !== -1) {
    updatedData = updatedData.slice(0, startForWhom) + updatedData.slice(endForWhom);
}

fs.writeFileSync(path, updatedData, 'utf8');
console.log('App.tsx substituido com sucesso via script Node.');
