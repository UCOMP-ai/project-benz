'use client';

import React, { useState, useEffect, useRef } from 'react';

const cssVariables = `
  :root {
    --color-primary: #00B388;
    --color-primary-hover: #00C99A;
    --color-primary-active: #009A74;
    --color-bg-default: #050810;
    --color-bg-surface: #111827;
    --color-bg-elevated: #1C2B3A;
    --color-bg-glass: rgba(17, 24, 39, 0.60);
    --color-text-primary: #E8EAF0;
    --color-text-secondary: #B0B7C8;
    --color-text-tertiary: #6D7890;
    --color-text-accent: #00B388;
    --color-border-default: #2A3A4A;
    --color-border-subtle: #1C2B3A;
    --color-border-accent: rgba(0, 179, 136, 0.40);
    --color-border-glow: rgba(0, 179, 136, 0.60);
    --font-heading: 'Mercedes-Benz Head', 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
    --font-body: 'Mercedes-Benz Text', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    --font-korean: 'Noto Serif KR', 'KoPub Batang', '나눔명조', serif;
    --text-display-2xl: 96px;
    --text-display-xl: 72px;
    --text-display-lg: 60px;
    --text-h1: 48px;
    --text-h2: 36px;
    --text-h3: 28px;
    --text-h4: 22px;
    --text-base: 17px;
    --text-md: 15px;
    --text-sm: 13px;
    --text-label: 14px;
    --text-overline: 11px;
    --spacing-section-padding: 128px;
    --spacing-element-gap: 32px;
    --gradient-nebula-primary: linear-gradient(135deg, #050810 0%, #0A1628 50%, #0A2A2A 100%);
    --gradient-nebula-accent: linear-gradient(135deg, #050810 0%, #0D2040 60%, #002B21 100%);
    --gradient-starlight: radial-gradient(ellipse at 50% 0%, rgba(0,179,136,0.20) 0%, rgba(5,8,16,0) 70%);
    --gradient-electric-line: linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%);
    --gradient-hero-overlay: linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.60) 60%, #050810 100%);
    --shadow-card: 0 4px 24px rgba(5, 8, 16, 0.60), 0 1px 4px rgba(5, 8, 16, 0.40);
    --shadow-card-hover: 0 8px 40px rgba(5, 8, 16, 0.80), 0 0 20px rgba(0, 179, 136, 0.15);
    --shadow-accent-glow-md: 0 0 24px rgba(0, 179, 136, 0.35);
    --transition-default: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-transform: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
    --transition-fluid: all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

interface NavItem {
  label: string;
  href: string;
}

interface BrandCard {
  id: string;
  label: string;
  englishTitle: string;
  koreanTitle: string;
  description: string;
  imageKeyword: string;
  tag: string;
  href: string;
  accentColor: string;
}

interface CoreValue {
  name: string;
  description: string;
  keyword: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Passenger Cars', href: '/passengercars' },
  { label: 'Brand', href: '/passengercars/brand' },
  { label: 'Models', href: '/passengercars/models' },
  { label: 'EQ', href: '/passengercars/eq' },
  { label: 'AMG', href: '/passengercars/amg' },
  { label: 'Maybach', href: '/passengercars/maybach' },
];

const brandCards: BrandCard[] = [
  {
    id: 'history',
    label: '01',
    englishTitle: 'History & Brand',
    koreanTitle: '히스토리 & 브랜드',
    description: '135년 이상의 자동차 역사. 칼 벤츠의 특허 자동차에서 시작된 혁신의 계보가 오늘의 전동화 시대로 이어집니다.',
    imageKeyword: 'vintage luxury automobile heritage museum',
    tag: 'Legacy',
    href: '/passengercars/brand/history',
    accentColor: '#00B388',
  },
  {
    id: 'amg',
    label: '02',
    englishTitle: 'Mercedes-AMG',
    koreanTitle: '메르세데스-AMG',
    description: '순수한 퍼포먼스의 결정체. 레이스트랙에서 태어난 열정이 도로 위의 극한 주행 경험으로 완성됩니다.',
    imageKeyword: 'mercedes amg sports car performance racing',
    tag: 'Performance',
    href: '/passengercars/brand/amg',
    accentColor: '#E05252',
  },
  {
    id: 'maybach',
    label: '03',
    englishTitle: 'Mercedes-Maybach',
    koreanTitle: '메르세데스-마이바흐',
    description: '럭셔리의 새로운 정의. 시간을 초월한 장인 정신과 현대적 감각이 만나 최고의 이동 경험을 선사합니다.',
    imageKeyword: 'maybach luxury limousine ultra premium elegant',
    tag: 'Luxury',
    href: '/passengercars/brand/maybach',
    accentColor: '#C8D0E0',
  },
];

const coreValues: CoreValue[] = [
  {
    name: 'Legacy & Evolution',
    description: '전통과 혁신의 공존. 135년 이상의 자동차 역사를 기반으로 전동화 시대를 선도한다.',
    keyword: '딥 스페이스 · 코스믹 블랙',
    icon: '◆',
  },
  {
    name: 'Cosmic Ambition',
    description: '지상을 넘어 우주로 향하는 도전 정신. 엔진의 의지가 항공을 넘어 우주로 확장된다.',
    keyword: '성운 그라디언트 · 별빛 포인트',
    icon: '★',
  },
  {
    name: 'Eco Humanism',
    description: '인간과 지구를 위한 책임 있는 럭셔리. 친환경 전동화는 의무가 아닌 철학이다.',
    keyword: '오로라 그린 · 친환경 빛',
    icon: '◉',
  },
  {
    name: 'Electric Soul',
    description: '전동화 시대의 새로운 감각과 에너지. EQ 라인업이 전달하는 고요하고 강렬한 주행 경험.',
    keyword: '전기 실버 · 유체 모션',
    icon: '⚡',
  },
  {
    name: 'Precision Elegance',
    description: '독일 장인 정신에서 비롯된 완벽한 디테일. 화려하지 않지만 깊이가 있는 미니멀 럭셔리.',
    keyword: '미니멀 럭셔리 · 정밀 라인',
    icon: '▸',
  },
];

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    color: i % 5 === 0 ? 'rgba(0,179,136,0.5)' : 'rgba(200,208,224,0.4)',
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
        />
      ))}
    </div>
  );
}

function ElectricLine() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: '1px',
        background: 'var(--gradient-electric-line)',
        opacity: 0.6,
      }}
    />
  );
}

export default function BrandPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = cssVariables;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <>
      {/* NAV */}
      <nav
        data-section="nav"
        role="navigation"
        aria-label="주요 네비게이션"
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
          padding: '0 80px',
          background: isNavScrolled
            ? 'rgba(5, 8, 16, 0.95)'
            : 'rgba(5, 8, 16, 0.75)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          borderBottom: '1px solid rgba(42, 58, 74, 0.60)',
          boxShadow: isNavScrolled ? '0 2px 20px rgba(5, 8, 16, 0.80)' : 'none',
          transition: 'var(--transition-fluid)',
        }}
      >
        <a
          href="/"
          data-role="logo"
          aria-label="Mercedes-Benz Korea 홈"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="15" stroke="var(--color-text-primary)" strokeWidth="1" fill="none" />
            <path
              d="M16 2 L16 16 L5 26"
              stroke="var(--color-text-primary)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M16 16 L27 26"
              stroke="var(--color-text-primary)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M16 2 L16 16"
              stroke="var(--color-text-primary)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: '400',
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: '500',
                color:
                  item.href === '/passengercars/brand'
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'var(--transition-default)',
                borderBottom:
                  item.href === '/passengercars/brand'
                    ? '1px solid var(--color-primary)'
                    : '1px solid transparent',
                paddingBottom: '2px',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/passengercars/models"
          data-role="nav-cta"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--color-bg-default)',
            background: 'var(--color-primary)',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            borderRadius: '2px',
            transition: 'var(--transition-default)',
          }}
        >
          차량 살펴보기
        </a>
      </nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        data-layout="hero"
        data-section="hero"
        data-bg="#050810"
        aria-label="브랜드 히어로"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--gradient-nebula-primary)',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${parallaxOffset}px)`,
            transition: 'none',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80&fit=crop"
            alt="메르세데스-벤츠 브랜드 히어로"
            style={{
              width: '100%',
              height: '110%',
              objectFit: 'cover',
              filter: 'brightness(0.35) contrast(1.1)',
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-hero-overlay)',
          }}
        />

        {/* Starlight Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-starlight)',
          }}
        />

        <StarField />

        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            maxWidth: '900px',
            padding: '0 80px',
          }}
        >
          <span
            data-role="section-label"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-overline)',
              fontWeight: '500',
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '32px',
              padding: '6px 16px',
              border: '1px solid rgba(0, 179, 136, 0.30)',
              background: 'rgba(0, 179, 136, 0.08)',
              borderRadius: '2px',
            }}
          >
            Brand Story
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: '300',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.04em',
              lineHeight: '1.0',
              margin: '0 0 24px 0',
            }}
          >
            Beyond the Stars.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-korean)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: '400',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.02em',
              lineHeight: '1.5',
              margin: '0 0 20px 0',
            }}
          >
            별을 넘어, 미래를 달린다.
          </p>

          <div
            aria-hidden="true"
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--gradient-electric-line)',
              margin: '32px auto',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: '400',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.65',
              margin: '0 0 48px 0',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            메르세데스-벤츠의 역사, 브랜드 철학, Mercedes-AMG와 Mercedes-Maybach 서브 브랜드 스토리를 소개합니다.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/passengercars/brand/story"
              data-role="button"
              data-variant="primary"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: '500',
                color: 'var(--color-bg-default)',
                background: 'var(--color-primary)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '14px 32px',
                borderRadius: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'var(--transition-default)',
              }}
            >
              브랜드 스토리 보기
              <span aria-hidden="true" style={{ fontSize: '16px' }}>→</span>
            </a>

            <a
              href="#brand-sections"
              data-role="button"
              data-variant="secondary"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                background: 'transparent',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '13px 32px',
                borderRadius: '2px',
                border: '1px solid var(--color-border-default)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'var(--transition-default)',
              }}
            >
              더 알아보기
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          aria-hidden="true"
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
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: '500',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(180deg, rgba(0,179,136,0.8) 0%, rgba(0,179,136,0) 100%)',
            }}
          />
        </div>
      </section>

      {/* BRAND PHILOSOPHY — SPLIT */}
      <section
        data-layout="split"
        data-section="philosophy"
        data-bg="#0A0E1A"
        aria-labelledby="philosophy-heading"
        style={{
          background: 'var(--color-semantic-primary, #0A0E1A)',
          backgroundColor: '#0A0E1A',
          position: 'relative',
          overflow: 'hidden',
        }}
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

        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '700px',
          }}
        >
          {/* Split Left — Image */}
          <div
            data-role="split-left"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=80&fit=crop"
              alt="메르세데스-벤츠 브랜드 철학"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7) contrast(1.05)',
                display: 'block',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(10,14,26,0) 0%, rgba(10,14,26,0.6) 100%)',
              }}
            />
            {/* Floating Label */}
            <div
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '48px',
                padding: '12px 20px',
                background: 'rgba(5, 8, 16, 0.80)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 179, 136, 0.25)',
                borderRadius: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-overline)',
                  fontWeight: '500',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Since 1886
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                칼 벤츠의 특허 자동차
              </span>
            </div>
          </div>

          {/* Split Right — Text */}
          <div
            data-role="split-right"
            style={{
              padding: '96px 80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <span
              data-role="section-label"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-overline)',
                fontWeight: '500',
                color: 'var(--color-primary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Brand Philosophy
            </span>

            <h2
              id="philosophy-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: '400',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: '1.15',
                margin: '0 0 32px 0',
              }}
            >
              Beyond the Stars —<br />오랜 유산 위에<br />미래를 쌓는다.
            </h2>

            <ElectricLine />

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: '400',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.65',
                margin: '32px 0',
                maxWidth: '480px',
              }}
            >
              메르세데스-벤츠는 단순한 자동차 브랜드를 넘어, 인류의 이동 방식과 지구의 내일을 함께 설계하는 테크-휴머니즘 기업이다. 별을 향한 엔진의 의지는 이제 전기의 에너지로, 우주의 깊이로 이어진다.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {[
                { en: 'Drive Electric. Live Responsibly.', ko: '전기로 달리고, 책임으로 앞서갑니다.' },
                { en: 'Silence is the New Power.', ko: '고요함이 새로운 힘입니다.' },
              ].map((copy, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 20px',
                    background: 'rgba(17, 24, 39, 0.60)',
                    border: '1px solid var(--color-border-default)',
                    borderLeft: '2px solid var(--color-primary)',
                    borderRadius: '2px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: '400',
                      color: 'var(--color-text-primary)',
                      margin: '0 0 4px 0',
                      fontStyle: 'italic',
                    }}
                  >
                    {copy.en}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-korean)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-tertiary)',
                      margin: 0,
                    }}
                  >
                    {copy.ko}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SECTIONS — GRID */}
      <section
        id="brand-sections"
        data-layout="grid"
        data-section="brand-categories"
        data-bg="#050810"
        data-columns="3"
        aria-labelledby="brand-categories-heading"
        style={{
          background: 'var(--color-bg-default)',
          backgroundColor: '#050810',
          padding: '128px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <StarField />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-nebula-primary)',
            opacity: 0.7,
          }}
        />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '80px',
            }}
          >
            <span
              data-role="section-label"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-overline)',
                fontWeight: '500',
                color: 'var(--color-primary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Our Brands
            </span>

            <h2
              id="brand-categories-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 4vw, 60px)',
                fontWeight: '300',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.025em',
                lineHeight: '1.1',
                margin: '0 0 20px 0',
              }}
            >
              The Brand Universe
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.65',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              하나의 별에서 세 개의 세계가 빛난다. 각각의 브랜드는 고유한 철학과 정체성으로 최고의 이동 경험을 정의합니다.
            </p>
          </div>

          <ElectricLine />

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginTop: '64px',
            }}
          >
            {brandCards.map((card) => (
              <article
                key={card.id}
                data-role="card-item"
                data-variant="feature"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: hoveredCard === card.id
                    ? `1px solid rgba(0, 179, 136, 0.35)`
                    : '1px solid var(--color-border-default)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: hoveredCard === card.id ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === card.id
                    ? 'var(--shadow-card-hover)'
                    : 'var(--shadow-card)',
                  transition: 'var(--transition-fluid)',
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Image */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${card.id === 'history' ? '1617788138017-80ad40651399' : card.id === 'amg' ? '1544636331-e26879cd4d9b' : '1558618666-fcd25c85cd64'}?w=700&q=80&fit=crop`}
                    alt={card.koreanTitle}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: hoveredCard === card.id
                        ? 'brightness(0.85) contrast(1.08)'
                        : 'brightness(0.65) contrast(1.05)',
                      transform: hoveredCard === card.id ? 'scale(1.03)' : 'scale(1)',
                      transition: 'var(--transition-fluid)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.60) 100%)',
                    }}
                  />

                  {/* Number Label */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                    }}
                  >
                    <span
                      data-role="card-tag"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-overline)',
                        fontWeight: '500',
                        color: 'var(--color-primary)',
                        letterSpacing: '0.15em',
                        display: 'block',
                      }}
                    >
                      {card.label}
                    </span>
                  </div>

                  {/* Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                    }}
                  >
                    <span
                      data-role="card-badge"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                        border: '1px solid rgba(0, 179, 136, 0.40)',
                        background: 'rgba(0, 179, 136, 0.10)',
                        padding: '4px 10px',
                        borderRadius: '2px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: '28px 28px 32px',
                  }}
                >
                  <h3
                    data-role="card-title"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      fontWeight: '400',
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.2',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {card.englishTitle}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-korean)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-primary)',
                      margin: '0 0 16px 0',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {card.koreanTitle}
                  </p>

                  <div
                    aria-hidden="true"
                    style={{
                      width: '32px',
                      height: '1px',
                      background: 'var(--color-primary)',
                      marginBottom: '16px',
                      opacity: 0.5,
                    }}
                  />

                  <p
                    data-role="card-description"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-md)',
                      fontWeight: '400',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 28px 0',
                    }}
                  >
                    {card.description}
                  </p>

                  <a
                    href={card.href}
                    data-role="button"
                    data-variant="secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-label)',
                      fontWeight: '500',
                      color: hoveredCard === card.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'var(--transition-default)',
                    }}
                    aria-label={`${card.koreanTitle} 알아보기`}
                  >
                    알아보기
                    <span
                      aria-hidden="true"
                      style={{
                        transform: hoveredCard === card.id ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'var(--transition-default)',
                        fontSize: '16px',
                      }}
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES — SPLIT / LIST */}
      <section
        data-layout="list"
        data-section="core-values"
        data-bg="#0A0E1A"
        aria-labelledby="core-values-heading"
        style={{
          background: '#0A0E1A',
          backgroundColor: '#0A0E1A',
          padding: '128px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-nebula-accent)',
            opacity: 0.6,
          }}
        />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            {/* Left Column */}
            <div>
              <span
                data-role="section-label"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-overline)',
                  fontWeight: '500',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                Core Values
              </span>

              <h2
                id="core-values-heading"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: '300',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1.1',
                  margin: '0 0 32px 0',
                }}
              >
                Precision<br />Meets<br />
                <em
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--color-primary)',
                  }}
                >
                  Possibility.
                </em>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.65',
                  margin: '0 0 48px 0',
                  maxWidth: '420px',
                }}
              >
                다섯 가지 핵심 가치가 메르세데스-벤츠를 정의합니다. 전통의 깊이에서 미래의 빛까지, 각각의 가치는 우리의 모든 결정을 이끕니다.
              </p>

              <div
                style={{
                  padding: '24px',
                  background: 'rgba(0, 179, 136, 0.06)',
                  border: '1px solid rgba(0, 179, 136, 0.20)',
                  borderRadius: '2px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.5',
                    margin: '0 0 8px 0',
                    fontStyle: 'italic',
                  }}
                >
                  "The Future Has Always Been Our Direction."
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-korean)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                  }}
                >
                  미래는 언제나 우리의 방향이었습니다.
                </p>
              </div>

              <div style={{ marginTop: '48px' }}>
                <a
                  href="/passengercars/brand/story"
                  data-role="button"
                  data-variant="primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-label)',
                    fontWeight: '500',
                    color: 'var(--color-bg-default)',
                    background: 'var(--color-primary)',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '14px 32px',
                    borderRadius: '2px',
                    transition: 'var(--transition-default)',
                  }}
                >
                  브랜드 스토리 보기 →
                </a>
              </div>
            </div>

            {/* Right Column — Values List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {coreValues.map((value, index) => (
                <div
                  key={value.name}
                  style={{
                    padding: '24px 28px',
                    background: hoveredValue === index
                      ? 'rgba(17, 24, 39, 0.80)'
                      : 'rgba(17, 24, 39, 0.40)',
                    border: '1px solid',
                    borderColor: hoveredValue === index
                      ? 'rgba(0, 179, 136, 0.30)'
                      : 'var(--color-border-subtle)',
                    borderLeft: hoveredValue === index
                      ? '2px solid var(--color-primary)'
                      : '2px solid transparent',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'var(--transition-fluid)',
                    transform: hoveredValue === index ? 'translateX(4px)' : 'translateX(0)',
                  }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        color: hoveredValue === index ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                        lineHeight: '1',
                        marginTop: '2px',
                        transition: 'var(--transition-default)',
                        flexShrink: 0,
                        width: '24px',
                        textAlign: 'center',
                      }}
                    >
                      {value.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '18px',
                          fontWeight: '400',
                          color: 'var(--color-text-primary)',
                          margin: '0 0 8px 0',
                          letterSpacing: '-0.005em',
                          lineHeight: '1.3',
                        }}
                      >
                        {value.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-md)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: '1.6',
                          margin: '0 0 10px 0',
                          maxHeight: hoveredValue === index ? '100px' : '0',
                          overflow: 'hidden',
                          opacity: hoveredValue === index ? 1 : 0,
                          transition: 'var(--transition-fluid)',
                        }}
                      >
                        {value.description}
                      </p>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '10px',
                          fontWeight: '500',
                          color: 'var(--color-text-tertiary)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {value.keyword}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: hoveredValue === index ? 'var(--color-primary)' : 'var(--color-border-default)',
                        transition: 'var(--transition-default)',
                        transform: hoveredValue === index ? 'rotate(90deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        data-layout="stats"
        data-section="brand-stats"
        data-bg="#050810"
        aria-labelledby="stats-heading"
        style={{
          background: '#050810',
          backgroundColor: '#050810',
          padding: '96px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ElectricLine />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-starlight)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            <span
              data-role="section-label"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-overline)',
                fontWeight: '500',
                color: 'var(--color-primary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              By the Numbers
            </span>
            <h2
              id="stats-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: '300',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              숫자로 보는 메르세데스-벤츠
            </h2>
          </div>

          <div
            data-role="stats-group"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'var(--color-border-default)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {[
              { value: '135+', label: '년의 자동차 혁신', sub: 'Years of Innovation' },
              { value: '2.04M', label: '2023년 글로벌 판매량', sub: 'Vehicles Sold Globally' },
              { value: '56+', label: '국가 생산 거점', sub: 'Production Locations' },
              { value: '170+', label: '국가 판매 네트워크', sub: 'Countries Worldwide' },
            ].map((stat, i) => (
              <div
                key={i}
                data-role="stat-item"
                style={{
                  background: 'var(--color-bg-default)',
                  padding: '48px 32px',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <span
                  data-role="stat-value"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: '300',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: '1',
                    marginBottom: '12px',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  data-role="stat-label"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-md)',
                    fontWeight: '400',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.4',
                    marginBottom: '6px',
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-overline)',
                    fontWeight: '500',
                    color: 'var(--color-text-tertiary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        data-layout="banner"
        data-section="cta-banner"
        data-bg="#0A2A2A"
        aria-labelledby="cta-banner-heading"
        style={{
          background: 'linear-gradient(135deg, #050810 0%, #002B21 50%, #0A1628 100%)',
          padding: '128px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,179,136,0.15) 0%, rgba(5,8,16,0) 70%)',
          }}
        />

        <StarField />

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span
            data-role="section-label"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-overline)',
              fontWeight: '500',
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Explore More
          </span>

          <h2
            id="cta-banner-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: '300',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 24px 0',
            }}
          >
            Born from Stars.<br />
            <em
              style={{
                fontStyle: 'italic',
                color: 'var(--color-primary)',
              }}
            >
              Built for Earth.
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-korean)',
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: '400',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.5',
              margin: '0 0 48px 0',
            }}
          >
            별에서 태어나, 지구를 위해 달린다.
          </p>

          {/* Pill Items */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            {['히스토리 & 브랜드', 'Mercedes-AMG', 'Mercedes-Maybach', 'EQ 전기차', '지속가능성'].map((pill) => (
              <span
                key={pill}
                data-role="pill-item"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '500',
                  color: 'var(--color-text-secondary)',
                  padding: '8px 18px',
                  border: '1px solid rgba(0, 179, 136, 0.25)',
                  background: 'rgba(0, 179, 136, 0.06)',
                  borderRadius: '2px',
                  letterSpacing: '0.04em',
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/passengercars/brand/story"
              data-role="button"
              data-variant="primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: '500',
                color: 'var(--color-bg-default)',
                background: 'var(--color-primary)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '14px 32px',
                borderRadius: '2px',
                transition: 'var(--transition-default)',
                boxShadow: 'var(--shadow-accent-glow-md)',
              }}
            >
              브랜드 스토리 보기 →
            </a>

            <a
              href="/passengercars/models"
              data-role="button"
              data-variant="secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                background: 'transparent',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '13px 32px',
                borderRadius: '2px',
                border: '1px solid var(--color-border-default)',
                transition: 'var(--transition-default)',
              }}
            >
              차량 살펴보기
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        data-section="footer"
        data-bg="#0A0C12"
        style={{
          background: '#0A0C12',
          backgroundColor: '#0A0C12',
          borderTop: '1px solid var(--color-border-subtle)',
          padding: '64px 80px 40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '48px',
              marginBottom: '64px',
            }}
          >
            {/* Brand Column */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="15" stroke="var(--color-text-primary)" strokeWidth="1" fill="none" />
                  <path d="M16 2 L16 16 L5 26" stroke="var(--color-text-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M16 16 L27 26" stroke="var(--color-text-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    fontWeight: '400',
                    color: 'var(--color-text-primary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  Mercedes-Benz
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-tertiary)',
                  lineHeight: '1.65',
                  margin: '0 0 16px 0',
                }}
              >
                별을 넘어, 미래를 달린다.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                Beyond the Stars.
              </p>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-overline)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 20px 0',
                }}
              >
                브랜드
              </h4>
              <nav aria-label="브랜드 링크">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: '히스토리 & 브랜드', href: '/passengercars/brand/history' },
                    { label: 'Mercedes-AMG', href: '/passengercars/brand/amg' },
                    { label: 'Mercedes-Maybach', href: '/passengercars/brand/maybach' },
                    { label: 'EQ 전기차', href: '/passengercars/eq' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-tertiary)',
                          textDecoration: 'none',
                          transition: 'var(--transition-default)',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-overline)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 20px 0',
                }}
              >
                서비스
              </h4>
              <nav aria-label="서비스 링크">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: '시승 신청', href: '/service/test-drive' },
                    { label: '견적 요청', href: '/service/quote' },
                    { label: '서비스 예약', href: '/service/booking' },
                    { label: '딜러 찾기', href: '/dealers' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-tertiary)',
                          textDecoration: 'none',
                          transition: 'var(--transition-default)',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Links Column 3 */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-overline)',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 20px 0',
                }}
              >
                회사 정보
              </h4>
              <nav aria-label="회사 정보 링크">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: '회사 소개', href: '/about' },
                    { label: '지속가능성', href: '/sustainability' },
                    { label: '미디어 센터', href: '/media' },
                    { label: '채용 정보', href: '/careers' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-tertiary)',
                          textDecoration: 'none',
                          transition: 'var(--transition-default)',
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Footer Bottom */}
          <ElectricLine />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-overline)',
                color: 'var(--color-text-tertiary)',
                margin: 0,
                letterSpacing: '0.06em',
              }}
            >
              © 2025 Mercedes-Benz Korea. All rights reserved.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '24px',
              }}
            >
              {['개인정보 처리방침', '이용약관', '법적 고지'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-overline)',
                    color: 'var(--color-text-tertiary)',
                    textDecoration: 'none',
                    letterSpacing: '0.06em',
                    transition: 'var(--transition-default)',
                  }}
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