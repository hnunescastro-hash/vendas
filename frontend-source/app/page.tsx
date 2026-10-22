import Experience from './experience';
import { ArrowUpRight, Play, TvMinimalPlay as Youtube, Music2, AudioLines } from 'lucide-react';
export default function Home() {
  return <>
    <a className="skip-link" href="#amostras">Pular para as amostras</a>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#inicio" aria-label="Karaokê no Tom — início"><img src="/images/channel-logo.jpg" alt="" width="48" height="48"/><span>KARAOKÊ <strong>NO TOM<span className="brand-dot">.</span></strong></span></a>
      <nav aria-label="Navegação principal"><a href="#amostras">Ouça o som</a><a href="#pacote">O pacote</a><a href="#duvidas">Dúvidas</a></nav>
      <a href="#pacote" className="button button-small">Quero meu pacote <ArrowUpRight size={17}/></a>
    </div></header>
    <main id="inicio">
      <section className="hero"><img className="hero-image" src="/images/hero-singer.jpg" alt="Mulher soltando a voz no microfone sob uma luz verde-limão" fetchPriority="high"/><div className="hero-shade"/>
        <div className="container hero-inner"><div className="hero-copy"><a href="https://www.youtube.com/@karaokenotom" className="eyebrow hero-eyebrow" target="_blank" rel="noreferrer"><Youtube size={19}/> DO YOUTUBE PARA O SEU PALCO <ArrowUpRight size={14}/></a><h1>DÊ PLAY.<br/>SOLTE A VOZ.<br/><span>O SHOW É SEU.</span></h1><p>Os hits que você ama. A qualidade que sua voz merece.<br className="desktop-break"/> Transforme qualquer momento em uma noite de karaokê.</p><div className="hero-actions"><a href="#pacote" className="button">Quero o pacote por R$ 197 <ArrowUpRight size={20}/></a><a href="#amostras" className="listen-link"><span><Play size={14} fill="currentColor"/></span> Ouvir amostras</a></div><div className="hero-note"><AudioLines size={16}/> Áudio limpo <span>•</span> Letras sincronizadas <span>•</span> Sua voz em destaque</div><div className="hero-caption"><span className="live-dot"/> SEU MOMENTO DE BRILHAR<span className="caption-line"/></div></div><a className="hero-sticker" href="#amostras"><span className="sticker-icon"><Music2 size={22}/></span><span><small>A próxima voz pode ser a sua.</small><strong>Encontre o seu tom.</strong></span><ArrowUpRight size={22}/></a></div>
      </section>
      <section className="social-proof container" aria-label="Números do canal"><div className="proof-label"><Youtube/><span>QUEM AMA CANTAR<br/><strong>JÁ ESTÁ NO TOM.</strong></span></div><div><strong>48,4 mil<span>+</span></strong><small>inscritos no YouTube</small></div><div><strong>16,9 milhões<span>+</span></strong><small>de visualizações no canal</small></div><div><strong>373</strong><small>vídeos para soltar a voz</small></div></section>
      <Experience/>
    </main>
  </>;
}
