'use client';

import React, { useState, useEffect } from 'react';

const cssVariables = `
  :root {
    --color-primary: #00B388;
    --color-primary-hover: #00C99A;
    --color-primary-active: #009A74;
    --color-primary-subtle: rgba(0, 179, 136, 0.12);
    --color-primary-glow: rgba(0, 179, 136, 0.25);

    --color-bg-default: #050810;
    --color-bg-surface: #111827;
    --color-bg-elevated: #1C2B3A;
    --color-bg-glass: rgba(17, 24, 39, 0.60);

    --color-text-primary: #E8EAF0;
    --color-text-secondary: #B0B7C8;
    --color-text-tertiary: #6D7890;
    --color-text-accent: #00B388;
    --color-text-inverse: #0A0E1A;

    --color-border-default: #2A3A4A;
    --color-border-subtle: #1C2B3A;
    --color-border-strong: #4A5878;
    --color-border-accent: rgba(0, 179, 136, 0.40);
    --color-border-glow: rgba(0, 179, 136, 0.60);

    --gradient-nebula-primary: linear-gradient(135deg, #050810 0%, #0A1628 50%, #0A2A2A 100%);
    --gradient-nebula-accent: linear-gradient(135deg, #050810 0%, #0D2040 60%, #002B21 100%);
    --gradient-cosmic-surface: linear-gradient(180deg, #111827 0%, #0A0E1A 100%);
    --gradient-hero-overlay: linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.60) 60%, #050810 100%);
    --gradient-starlight: radial-gradient(ellipse at 50% 0%, rgba(0,179,136,0.20) 0%, rgba(5,8,16,0) 70%);
    --gradient-electric-line: linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%);

    --font-heading: 'Mercedes-Benz Head', 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
    --font-body: 'Mercedes-Benz Text', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    --font-korean: 'Noto Serif KR', 'KoPub Batang', '나눔명조', serif;

    --text-display-2xl: 96px;
    --text-display-xl: 72px;
    --text-display-lg: 60px;
    --text-h1: 48px;
    --text-h2: 36px;
    --text-h3: 28px;
    --text-h4: 22px;
    --text-body-xl: 20px;
    --text-body-lg: 17px;
    --text-base: 15px;
    --text-sm: 13px;
    --text-xs: 11px;

    --spacing-section-padding: 128px;
    --spacing-section-md: 96px;
    --spacing-section-sm: 64px;
    --spacing-element-gap: 32px;
    --spacing-page-horizontal: 80px;

    --shadow-nav: 0 2px 20px rgba(5, 8, 16, 0.80);
    --shadow-card: 0 4px 24px rgba(5, 8, 16, 0.60), 0 1px 4px rgba(5, 8, 16, 0.40);
    --shadow-card-hover: 0 8px 40px rgba(5, 8, 16, 0.80), 0 0 20px rgba(0, 179, 136, 0.15);
    --shadow-accent-glow-md: 0 0 24px rgba(0, 179, 136, 0.35);
    --shadow-modal: 0 24px 80px rgba(5, 8, 16, 0.95), 0 0 0 1px rgba(42, 58, 74, 0.60);

    --transition-default: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-transform: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
    --transition-fluid: all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

    --border-radius-default: 2px;
    --border-radius-xl: 4px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--color-bg-default);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  .nav-link-item {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 13px;
    font-family: var(--font-body);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: var(--transition-default);
    padding: 4px 0;
    position: relative;
  }
  .nav-link-item:hover { color: var(--color-text-primary); }
  .nav-link-item.active { color: var(--color-text-accent); }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border: none;
    padding: 14px 32px;
    font-size: 14px;
    font-family: var(--font-body);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: var(--border-radius-default);
    cursor: pointer;
    transition: var(--transition-default);
  }
  .btn-primary:hover {
    background: var(--color-primary-hover);
    box-shadow: 0 0 24px rgba(0, 179, 136, 0.40);
  }
  .btn-primary:active { background: var(--color-primary-active); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    padding: 13px 32px;
    font-size: 14px;
    font-family: var(--font-body);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: var(--border-radius-default);
    cursor: pointer;
    transition: var(--transition-default);
  }
  .btn-secondary:hover {
    color: var(--color-primary);
    border-color: rgba(0, 179, 136, 0.60);
    box-shadow: 0 0 12px rgba(0, 179, 136, 0.15);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--color-primary);
    border: none;
    padding: 14px 0;
    font-size: 14px;
    font-family: var(--font-body);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition-default);
  }
  .btn-ghost:hover { color: var(--color-primary-hover); }

  .section-label-tag {
    display: inline-block;
    font-size: 11px;
    font-family: var(--font-body);
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-primary);
    margin-bottom: 16px;
  }

  .card-hover-effect {
    transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-hover-effect:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(0, 179, 136, 0.35) !important;
  }

  .electric-divider {
    height: 1px;
    background: var(--gradient-electric-line);
    border: none;
    margin: 0;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes starPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(0, 179, 136, 0.2); }
    50% { box-shadow: 0 0 40px rgba(0, 179, 136, 0.4); }
  }

  .fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .pill-item-style {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background: rgba(42, 58, 74, 0.60);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius-default);
    font-size: 13px;
    font-family: var(--font-body);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: var(--transition-default);
    cursor: pointer;
    white-space: nowrap;
  }
  .pill-item-style:hover {
    color: var(--color-primary);
    border-color: var(--color-border-accent);
    background: var(--color-primary-subtle);
  }

  .model-card {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius-default);
    overflow: hidden;
    transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    text-decoration: none;
    display: block;
  }
  .model-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(0, 179, 136, 0.35);
  }
  .model-card:hover .model-card-img {
    filter: brightness(1.0) contrast(1.08);
  }

  .model-card-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    filter: brightness(0.90) contrast(1.05);
    transition: var(--transition-fluid);
    display: block;
  }

  .service-card {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border-default);
    border-left: 2px solid var(--color-primary);
    border-radius: var(--border-radius-default);
    padding: 20px 24px;
    transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    text-decoration: none;
    display: block;
  }
  .service-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(0, 179, 136, 0.35);
    border-left-color: var(--color-primary);
    background: rgba(17, 24, 39, 0.95);
  }

  .brand-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius-default);
    border: 1px solid var(--color-border-default);
    cursor: pointer;
    transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
    text-decoration: none;
    display: block;
    aspect-ratio: 4/3;
  }
  .brand-card:hover {
    border-color: rgba(0, 179, 136, 0.35);
    box-shadow: var(--shadow-card-hover);
  }
  .brand-card:hover .brand-card-img {
    transform: scale(1.04);
    filter: brightness(1.0) contrast(1.08);
  }
  .brand-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.70) contrast(1.05);
    transition: var(--transition-fluid);
    display: block;
  }
  .brand-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.80) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 28px;
  }

  .star-particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(200, 208, 224, 0.6);
    animation: starPulse 3s ease-in-out infinite;
  }

  footer a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: var(--transition-default);
    font-size: 14px;
  }
  footer a:hover { color: var(--color-primary); }

  @media (max-width: 768px) {
    :root {
      --spacing-section-padding: 64px;
      --spacing-page-horizontal: 16px;
    }
    .nav-desktop { display: none !important; }
  }
  @media (min-width: 769px) {
    .nav-mobile-btn { display: none !important; }
  }
`;

interface StarParticle {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

const generateStars = (count: number): StarParticle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() < 0.5 ? 1 : 2}px`,
    height: `${Math.random() < 0.5 ? 1 : 2}px`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 3}s`,
  }));
};

const modelItems = [
  { name: 'A-Class', category: 'Sedan', image: 'mercedes benz a class sedan luxury' },
  { name: 'C-Class', category: 'Sedan', image: 'mercedes benz c class sedan' },
  { name: 'E-Class', category: 'Sedan', image: 'mercedes benz e class sedan dark' },
  { name: 'S-Class', category: 'Sedan', image: 'mercedes benz s class luxury sedan' },
  { name: 'S-Class Long', category: 'Sedan', image: 'luxury sedan limousine dark' },
  { name: 'EQE', category: 'Electric', image: 'electric car luxury dark studio' },
  { name: 'EQS Long', category: 'Electric', image: 'electric luxury car night' },
  { name: 'Mercedes-Maybach S-Class', category: 'Maybach', image: 'maybach luxury car dark' },
  { name: 'GLA', category: 'SUV', image: 'compact suv luxury night' },
  { name: 'GLB', category: 'SUV', image: 'mercedes suv dark road' },
  { name: 'GLC', category: 'SUV', image: 'mercedes glc suv dark' },
  { name: 'GLC Coupé', category: 'SUV', image: 'suv coupe sporty dark' },
  { name: 'GLE', category: 'SUV', image: 'luxury suv road night' },
  { name: 'GLE Coupé', category: 'SUV', image: 'gle coupe luxury dark' },
  { name: 'GLS', category: 'SUV', image: 'large suv luxury dark road' },
  { name: 'Mercedes-Maybach GLS', category: 'Maybach', image: 'maybach gls luxury suv' },
  { name: 'G-Class', category: 'SUV', image: 'g wagon off road dark' },
  { name: 'G-Class EV', category: 'Electric', image: 'electric off road suv' },
  { name: 'EQA', category: 'Electric', image: 'electric compact suv' },
  { name: 'EQB', category: 'Electric', image: 'electric suv dark studio' },
  { name: 'EQE SUV', category: 'Electric', image: 'electric luxury suv night' },
  { name: 'EQS SUV', category: 'Electric', image: 'electric flagship suv dark' },
  { name: 'Maybach EQS SUV', category: 'Maybach', image: 'maybach electric luxury' },
  { name: 'A-Class Hatch', category: 'Hatch', image: 'luxury hatchback dark' },
  { name: 'CLA Coupé', category: 'Coupé', image: 'mercedes cla coupe dark' },
  { name: 'CLE Coupé', category: 'Coupé', image: 'mercedes coupe sporty dark' },
  { name: 'Mercedes-AMG GT Coupé', category: 'AMG', image: 'amg gt sports car dark' },
  { name: 'Mercedes-AMG GT 4-Door', category: 'AMG', image: 'amg performance sedan dark' },
  { name: 'CLE Cabriolet', category: 'Cabriolet', image: 'convertible luxury night' },
  { name: 'SL Roadster', category: 'Roadster', image: 'roadster luxury dark night' },
  { name: 'Maybach SL Monogram', category: 'Maybach', image: 'maybach sl special edition dark' },
];

const buyItems = [
  { name: '메르세데스-벤츠 스토어', icon: '🛒', desc: '신차 온라인 구매' },
  { name: '온라인 라이브 상담', icon: '💬', desc: '실시간 전문가 상담' },
  { name: '인증 중고차 스토어', icon: '🔑', desc: '믿을 수 있는 중고차' },
  { name: '인증 중고차 소개', icon: '📋', desc: '인증 프로그램 안내' },
  { name: '금융 서비스 안내', icon: '💰', desc: '맞춤형 금융 솔루션' },
  { name: '금융 프로모션', icon: '🎯', desc: '특별 금융 혜택' },
  { name: '법인 우대 프로그램', icon: '🏢', desc: '기업 고객 전용' },
  { name: '온라인 시승 신청', icon: '🚗', desc: '드라이브 경험 예약' },
  { name: '디지털 서비스 상품', icon: '📱', desc: '커넥티드 서비스' },
  { name: '메르세데스 순정 액세서리', icon: '⚙️', desc: '정품 액세서리' },
  { name: '컬렉션', icon: '👔', desc: '브랜드 라이프스타일' },
  { name: '카케어 용품', icon: '✨', desc: '차량 관리 용품' },
];

const serviceItems = [
  { name: '충전 서비스', icon: '⚡', desc: '전기차 충전 솔루션' },
  { name: '온라인 서비스 예약', icon: '📅', desc: '간편한 서비스 예약' },
  { name: '서비스 상품 안내', icon: '🔧', desc: '정기 점검 상품' },
  { name: '수리 서비스', icon: '🔩', desc: '전문 수리 서비스' },
  { name: '고장 및 손상 지원', icon: '🛡️', desc: '24시간 긴급 지원' },
  { name: '보험 상품', icon: '📄', desc: '맞춤형 보험 안내' },
  { name: '장기 렌터카 프로그램', icon: '🔑', desc: '합리적인 장기 렌트' },
  { name: '메르세데스-벤츠 앱', icon: '📱', desc: '스마트 차량 관리' },
  { name: 'Mercedes me Care', icon: '💎', desc: '프리미엄 멤버십' },
  { name: '사용 설명서', icon: '📖', desc: '차량 매뉴얼' },
  { name: '배터리셀 제조사 현황', icon: '🔋', desc: '전기차 배터리 정보' },
  { name: '사용 영상 가이드', icon: '▶️', desc: '비디오 튜토리얼' },
  { name: '고객 컨택 센터', icon: '☎️', desc: '전화 및 이메일 문의' },
];

const brandItems = [
  {
    name: '히스토리 & 브랜드',
    desc: '135년 이상의 자동차 역사와 혁신의 여정',
    image: 'mercedes benz heritage classic car vintage',
    label: 'Heritage',
    href: '/brand/history',
  },
  {
    name: 'Mercedes-AMG',
    desc: '퍼포먼스의 정수. 트랙에서 태어난 스트리트 레전드.',
    image: 'amg performance racing sports car dark',
    label: 'Performance',
    href: '/brand/amg',
  },
  {
    name: 'Mercedes-Maybach',
    desc: '최고의 럭셔리를 정의하는 이름. Maybach.',
    image: 'maybach luxury ultra premium dark studio',
    label: 'Ultra Luxury',
    href: '/brand/maybach',
  },
];

const footerLinks = [
  {
    title: '모델 안내',
    links: ['세단', 'SUV', '쿠페 & 카브리올레', '전기차 (EQ)', 'AMG', 'Maybach'],
  },
  {
    title: '온라인 구매',
    links: ['신차 구매', '인증 중고차', '금융 서비스', '시승 신청', '법인 프로그램'],
  },
  {
    title: '서비스',
    links: ['서비스 예약', '충전 서비스', 'Mercedes me Care', '수리 서비스', '고객 컨택 센터'],
  },
  {
    title: '브랜드',
    links: ['히스토리', 'Mercedes-AMG', 'Mercedes-Maybach', '지속가능성', '뉴스룸'],
  },
  {
    title: '밴(Vans)',
    links: ['Sprinter', 'Vito', 'V-Class', '밴 서비스', '밴 금융'],
  },
];

export default function HomePage() {
  const [stars] = useState<StarParticle[]>(() => generateStars(60));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModelFilter, setActiveModelFilter] = useState<string>('All');
  const [visibleModels, setVisibleModels] = useState(12);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modelCategories = ['All', 'Sedan', 'SUV', 'Electric', 'AMG', 'Maybach', 'Coupé'];
  const filteredModels = activeModelFilter === 'All'
    ? modelItems
    : modelItems.filter(m => m.category === activeModelFilter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />

      {/* NAV */}
      <nav
        data-section="nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--spacing-page-horizontal)',
          background: scrolled ? 'rgba(5, 8, 16, 0.96)' : 'rgba(5, 8, 16, 0.60)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          borderBottom: `1px solid ${scrolled ? 'rgba(42, 58, 74, 0.80)' : 'rgba(42, 58, 74, 0.40)'}`,
          boxShadow: scrolled ? 'var(--shadow-nav)' : 'none',
          transition: 'var(--transition-fluid)',
        }}
        role="navigation"
        aria-label="주요 내비게이션"
      >
        <a
          href="/"
          data-role="logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
          aria-label="Mercedes-Benz Korea 홈"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle cx="18" cy="18" r="17" stroke="var(--color-text-primary)" strokeWidth="1.5" />
            <path d="M18 4L18 18L7 28" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 18L29 28" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Mercedes-Benz
          </span>
        </a>

        <div
          data-role="nav-links"
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <a href="/models" className="nav-link-item">Models</a>
          <a href="/electric" className="nav-link-item active">Electric</a>
          <a href="/buy" className="nav-link-item">구매</a>
          <a href="/services" className="nav-link-item">서비스</a>
          <a href="/brand" className="nav-link-item">브랜드</a>
          <a href="/vans" className="nav-link-item">밴</a>
        </div>

        <a
          href="/store"
          data-role="nav-cta"
          className="btn-primary nav-desktop"
          style={{ padding: '10px 24px', fontSize: '12px' }}
        >
          온라인 구매
        </a>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="모바일 메뉴 열기"
          aria-expanded={mobileMenuOpen}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--color-text-primary)',
                transition: 'var(--transition-default)',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 8, 16, 0.98)',
            zIndex: 199,
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
          role="dialog"
          aria-label="모바일 메뉴"
        >
          {['Models', 'Electric', '구매', '서비스', '브랜드', '밴'].map(item => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              style={{
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                fontSize: '24px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                padding: '8px 0',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <main>
        {/* ============ HERO ============ */}
        <section
          data-layout="hero"
          data-section="hero"
          data-bg="#050810"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'var(--gradient-nebula-primary)',
          }}
          aria-label="히어로 섹션"
        >
          {/* Star particles */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {stars.map(star => (
              <span
                key={star.id}
                className="star-particle"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.width,
                  height: star.height,
                  animationDelay: star.animationDelay,
                  animationDuration: star.animationDuration,
                }}
              />
            ))}
          </div>

          {/* Starlight glow top */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--gradient-starlight)',
              pointerEvents: 'none',
            }}
          />

          {/* Background image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
            aria-hidden="true"
          >
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&auto=format&fit=crop&q=80"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.35) contrast(1.10) saturate(0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--gradient-hero-overlay)',
              }}
            />
          </div>

          {/* Hero content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 var(--spacing-page-horizontal)',
              paddingTop: '120px',
              paddingBottom: '120px',
              width: '100%',
            }}
          >
            <div
              className="fade-in-up"
              style={{ maxWidth: '760px' }}
            >
              <span
                data-role="section-label"
                className="section-label-tag"
              >
                Beyond the Stars
              </span>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 7vw, var(--text-display-xl))',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '20px',
                }}
              >
                별을 넘어,
                <br />
                <span style={{ color: 'var(--color-primary)' }}>미래를 달린다.</span>
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-korean)',
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '32px',
                  textTransform: 'uppercase',
                }}
                aria-hidden="true"
              >
                Drive Electric. Live Responsibly.
              </p>

              <p
                style={{
                  fontSize: 'clamp(15px, 1.8vw, var(--text-body-xl))',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  marginBottom: '48px',
                }}
              >
                메르세데스-벤츠 코리아 공식 홈페이지. 최신 모델 탐색, 온라인 구매, 시승 신청, 서비스 예약까지 한 곳에서.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="/models"
                  data-role="button"
                  data-variant="primary"
                  className="btn-primary"
                >
                  모델 탐색하기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
                <a
                  href="/electric"
                  data-role="button"
                  data-variant="secondary"
                  className="btn-secondary"
                >
                  EQ 전기차
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                opacity: 0.5,
              }}
              aria-hidden="true"
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                Scroll
              </span>
              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: 'linear-gradient(180deg, var(--color-primary) 0%, transparent 100%)',
                }}
              />
            </div>
          </div>
        </section>

        {/* Electric line divider */}
        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ MODEL GRID ============ */}
        <section
          data-layout="grid"
          data-section="features"
          data-bg="#0A0E1A"
          data-columns="4"
          style={{
            background: 'var(--color-bg-default)',
            padding: 'var(--spacing-section-padding) var(--spacing-page-horizontal)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="모델 라인업"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '300px',
              background: 'var(--gradient-starlight)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            {/* Section header */}
            <div style={{ marginBottom: '64px' }}>
              <span data-role="section-label" className="section-label-tag">
                Our Models
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(32px, 4vw, var(--text-h1))',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  전 라인업을
                  <br />
                  탐색하세요
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', maxWidth: '380px', lineHeight: 1.6 }}>
                  메르세데스-벤츠의 다양한 차종을 탐색하세요. 전기차, 플러그인 하이브리드 포함 전 라인업을 제공합니다.
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '40px',
              }}
              role="tablist"
              aria-label="모델 카테고리 필터"
            >
              {modelCategories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeModelFilter === cat}
                  onClick={() => { setActiveModelFilter(cat); setVisibleModels(12); }}
                  style={{
                    padding: '8px 18px',
                    background: activeModelFilter === cat ? 'var(--color-primary-subtle)' : 'rgba(42, 58, 74, 0.40)',
                    border: activeModelFilter === cat ? '1px solid var(--color-border-accent)' : '1px solid var(--color-border-default)',
                    borderRadius: 'var(--border-radius-default)',
                    color: activeModelFilter === cat ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'var(--transition-default)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Model grid */}
            <div
              role="tabpanel"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
                marginBottom: '48px',
              }}
            >
              {filteredModels.slice(0, visibleModels).map((model) => (
                <a
                  key={model.name}
                  href={`/models/${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                  data-role="card-item"
                  data-variant="feature"
                  className="model-card"
                  aria-label={`${model.name} 상세 보기`}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=75`}
                      alt={model.name}
                      className="model-card-img"
                    />
                    <span
                      data-role="card-badge"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '3px 8px',
                        background: model.category === 'Electric'
                          ? 'var(--color-primary)'
                          : model.category === 'AMG'
                            ? '#E05252'
                            : model.category === 'Maybach'
                              ? 'rgba(200, 208, 224, 0.15)'
                              : 'rgba(42, 58, 74, 0.80)',
                        color: model.category === 'Electric'
                          ? 'var(--color-text-inverse)'
                          : 'var(--color-text-primary)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        borderRadius: 'var(--border-radius-default)',
                        backdropFilter: 'blur(8px)',
                        border: model.category === 'Maybach' ? '1px solid rgba(200,208,224,0.2)' : 'none',
                      }}
                    >
                      {model.category === 'Electric' ? 'EQ Electric' : model.category}
                    </span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3
                      data-role="card-title"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                      }}
                    >
                      {model.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        data-role="card-tag"
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-text-tertiary)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {model.category}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Load more / All models CTA */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {visibleModels < filteredModels.length && (
                <button
                  onClick={() => setVisibleModels(prev => Math.min(prev + 8, filteredModels.length))}
                  className="btn-secondary"
                  style={{ minWidth: '200px' }}
                >
                  더 보기 ({filteredModels.length - visibleModels}개 남음)
                </button>
              )}
              <a
                href="/models"
                data-role="button"
                data-variant="primary"
                className="btn-primary"
                style={{ minWidth: '200px', justifyContent: 'center' }}
              >
                All Models 보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ BUY/SERVICES BANNER ============ */}
        <section
          data-layout="banner"
          data-section="services"
          data-bg="#0A1628"
          style={{
            background: 'var(--gradient-nebula-accent)',
            padding: 'var(--spacing-section-padding) var(--spacing-page-horizontal)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="구매 및 서비스"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 80% 50%, rgba(0,179,136,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            {/* Section header */}
            <div style={{ marginBottom: '56px' }}>
              <span data-role="section-label" className="section-label-tag">
                Buy & Finance
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, var(--text-h1))',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  나만의 방식으로
                  <br />
                  소유하세요
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', maxWidth: '420px', lineHeight: 1.6 }}>
                  메르세데스-벤츠 스토어에서 신차를 온라인으로 구매하거나, 인증 중고차를 탐색하고, 온라인 라이브 상담을 이용해보세요.
                </p>
              </div>
            </div>

            {/* Buy pills grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              {buyItems.map((item) => (
                <a
                  key={item.name}
                  href="/store"
                  data-role="pill-item"
                  className="pill-item-style"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    whiteSpace: 'normal',
                  }}
                  aria-label={item.name}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: '20px',
                      flexShrink: 0,
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-primary-subtle)',
                      border: '1px solid var(--color-border-accent)',
                      borderRadius: 'var(--border-radius-default)',
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>
                      {item.name}
                    </div>
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                      {item.desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <a
                href="/store"
                data-role="button"
                data-variant="primary"
                className="btn-primary"
              >
                메르세데스-벤츠 스토어 바로가기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ SERVICES GRID ============ */}
        <section
          data-layout="grid"
          data-section="features-2"
          data-bg="#050810"
          data-columns="3"
          style={{
            background: 'var(--color-bg-default)',
            padding: 'var(--spacing-section-padding) var(--spacing-page-horizontal)',
            position: 'relative',
          }}
          aria-label="서비스 안내"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '64px' }}>
              <span data-role="section-label" className="section-label-tag">
                Services
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, var(--text-h1))',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  고요함이
                  <br />
                  새로운 힘입니다
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', maxWidth: '420px', lineHeight: 1.6 }}>
                  충전 서비스, 온라인 서비스 예약, 수리 서비스, 고장 및 손상 지원, 보험 상품, 장기 렌터카 프로그램 등 폭넓은 서비스를 제공합니다.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              {serviceItems.map((item) => (
                <a
                  key={item.name}
                  href="/services"
                  data-role="card-item"
                  data-variant="feature"
                  className="service-card"
                  aria-label={item.name}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <span
                      data-role="card-icon"
                      aria-hidden="true"
                      style={{
                        fontSize: '18px',
                        flexShrink: 0,
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--color-primary-subtle)',
                        border: '1px solid var(--color-border-accent)',
                        borderRadius: 'var(--border-radius-default)',
                      }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <h3
                        data-role="card-title"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          marginBottom: '4px',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        data-role="card-description"
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-text-tertiary)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <a
                href="/services"
                data-role="button"
                data-variant="primary"
                className="btn-primary"
              >
                All Services 보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ STATS ============ */}
        <section
          data-layout="stats"
          data-section="stats"
          data-bg="#111827"
          style={{
            background: 'var(--color-bg-surface)',
            padding: '80px var(--spacing-page-horizontal)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="주요 지표"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 100%, rgba(0,179,136,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              data-role="stats-group"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
              }}
            >
              {[
                { value: '135+', label: 'Years of Innovation', suffix: '' },
                { value: '30', label: 'EQ Electric Models', suffix: '+' },
                { value: '500', label: '전국 서비스 센터', suffix: '+' },
                { value: '2050', label: 'Carbon Neutral Goal', suffix: '' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  data-role="stat-item"
                  style={{
                    textAlign: 'center',
                    padding: '32px 24px',
                    borderRadius: 'var(--border-radius-default)',
                    border: '1px solid var(--color-border-subtle)',
                    background: 'rgba(17, 24, 39, 0.40)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--gradient-electric-line)',
                    }}
                  />
                  <span
                    data-role="stat-value"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(40px, 5vw, 64px)',
                      fontWeight: 300,
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      marginBottom: '12px',
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </span>
                  <span
                    data-role="stat-label"
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-secondary)',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ BRAND SECTION ============ */}
        <section
          data-layout="ecosystem"
          data-section="brand"
          data-bg="#050810"
          data-columns="3"
          style={{
            background: 'var(--color-bg-default)',
            padding: 'var(--spacing-section-padding) var(--spacing-page-horizontal)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="브랜드 소개"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--gradient-starlight)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div style={{ marginBottom: '64px' }}>
              <span data-role="section-label" className="section-label-tag">
                Our Brand
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, var(--text-h1))',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  별에서 태어나,
                  <br />
                  지구를 위해 달린다
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', maxWidth: '380px', lineHeight: 1.6 }}>
                  메르세데스-벤츠의 히스토리와 브랜드 스토리, Mercedes-AMG, Mercedes-Maybach 서브 브랜드를 소개합니다.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '48px',
              }}
            >
              {brandItems.map((item) => (
                <div
                  key={item.name}
                  data-role="group-item"
                >
                  <a
                    href={item.href}
                    className="brand-card"
                    aria-label={`${item.name} 더 알아보기`}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=800&auto=format&fit=crop&q=80`}
                      alt={item.name}
                      className="brand-card-img"
                    />
                    <div className="brand-card-overlay">
                      <span
                        data-role="group-description"
                        style={{
                          display: 'inline-block',
                          fontSize: '10px',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--color-primary)',
                          marginBottom: '8px',
                          padding: '3px 8px',
                          background: 'var(--color-primary-subtle)',
                          border: '1px solid var(--color-border-accent)',
                          borderRadius: 'var(--border-radius-default)',
                        }}
                      >
                        {item.label}
                      </span>
                      <h3
                        data-role="group-title"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '24px',
                          fontWeight: 400,
                          color: 'var(--color-text-primary)',
                          letterSpacing: '-0.01em',
                          marginBottom: '8px',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-text-secondary)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 1.5,
                          marginBottom: '16px',
                        }}
                      >
                        {item.desc}
                      </p>
                      <div
                        data-role="group-links"
                        style={{ display: 'flex' }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--color-primary)',
                            fontSize: '12px',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                          aria-hidden="true"
                        >
                          더 알아보기
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <a
                href="/brand"
                data-role="button"
                data-variant="secondary"
                className="btn-secondary"
              >
                브랜드 더 알아보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <hr className="electric-divider" aria-hidden="true" />

        {/* ============ EQ SPLIT BANNER ============ */}
        <section
          data-layout="split"
          data-section="eq-electric"
          data-bg="#0A2A2A"
          style={{
            background: 'linear-gradient(135deg, #050810 0%, #0A1628 40%, #0A2A2A 100%)',
            padding: 'var(--spacing-section-padding) var(--spacing-page-horizontal)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="EQ 전기차"
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 60% 50%, rgba(0,179,136,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div data-role="split-left">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--border-radius-default)',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  border: '1px solid var(--color-border-accent)',
                  boxShadow: '0 20px 60px rgba(0, 179, 136, 0.20)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&auto=format&fit=crop&q=80"
                  alt="EQ 전기차"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) contrast(1.10) saturate(0.9)',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,179,136,0.05) 0%, transparent 60%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div data-role="split-right">
              <span data-role="section-label" className="section-label-tag">
                Electric Intelligence
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, var(--text-h1))',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                }}
              >
                전기로 달리고,
                <br />
                <span style={{ color: 'var(--color-primary)' }}>책임으로 앞서갑니다</span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-korean)',
                  fontSize: '12px',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                }}
                aria-hidden="true"
              >
                Silence is the New Power.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '40px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                EQ 전기차 라인업은 고요하지만 강렬한 주행 경험을 제공합니다.
                지속 가능한 럭셔리의 새로운 기준 — 메르세데스-벤츠의 전동화 비전을 만나보세요.
              </p>

              {/* Accordion items */}
              {[
                { title: 'EQ 전기차 라인업', desc: 'EQA부터 EQS까지, 모든 세그먼트의 전기차를 만나보세요.' },
                { title: '충전 인프라', desc: '집, 직장, 여행 중 언제 어디서나 편리한 충전 솔루션.' },
                { title: 'Mercedes me 앱', desc: '스마트폰으로 차량 상태를 실시간 모니터링하고 제어하세요.' },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  data-role="accordion-item"
                  style={{
                    borderTop: idx === 0 ? '1px solid var(--color-border-default)' : 'none',
                    borderBottom: '1px solid var(--color-border-default)',
                    padding: '16px 0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6L8 10L12 6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}

              <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="/electric"
                  data-role="button"
                  data-variant="primary"
                  className="btn-primary"
                >
                  EQ 전기차 보기
                </a>
                <a
                  href="/charging"
                  data-role="button"
                  data-variant="secondary"
                  className="btn-secondary"
                >
                  충전 서비스
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer
        data-section="footer"
        data-bg="#0A0C12"
        data-layout="footer"
        style={{
          background: '#0A0C12',
          borderTop: '1px solid var(--color-border-subtle)',
          position: 'relative',
          overflow: 'hidden',
        }}
        role="contentinfo"
        aria-label="사이트 푸터"
      >
        {/* Top footer CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #050810 0%, #0A1628 60%, #0A2A2A 100%)',
            padding: '64px var(--spacing-page-horizontal)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '32px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 300,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}
              >
                정밀함이 가능성을
                <br />
                만날 때
              </h2>
              <p style={{ color: 'var(--color-text-tertiary)', fontSize: '13px', letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                Precision Meets Possibility.
              </p>
            </div>
            <a
              href="/contact"
              data-role="button"
              data-variant="primary"
              className="btn-primary"
            >
              고객 컨택 센터 문의
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Main footer */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '64px var(--spacing-page-horizontal) 48px',
          }}
        >
          {/* Logo + tagline */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '32px',
            }}
          >
            <div>
              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  marginBottom: '12px',
                }}
                aria-label="Mercedes-Benz Korea 홈"
              >
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <circle cx="18" cy="18" r="17" stroke="var(--color-text-secondary)" strokeWidth="1.5" />
                  <path d="M18 4L18 18L7 28" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M18 18L29 28" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Mercedes-Benz Korea
                </span>
              </a>
              <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
                메르세데스-벤츠, 메르세데스-AMG, 메르세데스-마이바흐 공식 한국 사이트
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Instagram', 'YouTube', 'Facebook'].map(social => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(42, 58, 74, 0.40)',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: 'var(--border-radius-default)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontFamily: 'var(--font-body)',
                    transition: 'var(--transition-default)',
                  }}
                  aria-label={`${social} 바로가기`}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-accent)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-default)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Footer nav grid */}
          <nav aria-label="푸터 내비게이션">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '40px',
                marginBottom: '48px',
              }}
            >
              {footerLinks.map(group => (
                <div key={group.title}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                    }}
                  >
                    {group.title}
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {group.links.map(link => (
                      <li key={link}>
                        <a
                          href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                          style={{
                            color: 'var(--color-text-tertiary)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontFamily: 'var(--font-body)',
                            transition: 'var(--transition-default)',
                            lineHeight: 1.5,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-tertiary)'; }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <hr
            style={{
              border: 'none',
              borderTop: '1px solid var(--color-border-subtle)',
              marginBottom: '32px',
            }}
            aria-hidden="true"
          />

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
              }}
            >
              © 2025 Mercedes-Benz Korea Ltd. All Rights Reserved.
              <br />
              <span style={{ fontSize: '11px' }}>
                메르세데스-벤츠코리아 유한회사 | 서울시 중구 | 사업자등록번호: 000-00-00000
              </span>
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {['개인정보처리방침', '이용약관', '쿠키 설정', '법적 고지'].map(item => (
                <a
                  key={item}
                  href={`/${item}`}
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-tertiary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    transition: 'var(--transition-default)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-tertiary)'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}