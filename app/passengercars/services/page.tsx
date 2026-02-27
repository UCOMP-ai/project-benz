'use client';

import React, { useState } from 'react';

const cssVariables = `
  :root {
    --color-primary: #00B388;
    --color-primary-hover: #00C99A;
    --color-primary-active: #009A74;
    --color-bg-default: #050810;
    --color-bg-surface: #111827;
    --color-bg-elevated: #1C2B3A;
    --color-text-primary: #E8EAF0;
    --color-text-secondary: #B0B7C8;
    --color-text-tertiary: #6D7890;
    --color-text-accent: #00B388;
    --color-border-default: #2A3A4A;
    --color-border-subtle: #1C2B3A;
    --color-border-accent: rgba(0, 179, 136, 0.40);
    --font-heading: 'Mercedes-Benz Head', 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
    --font-body: 'Mercedes-Benz Text', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    --font-korean: 'Noto Serif KR', 'KoPub Batang', serif;
    --text-h1: 72px;
    --text-h2: 48px;
    --text-h3: 36px;
    --text-base: 15px;
    --spacing-section-padding: 128px;
    --spacing-element-gap: 32px;
    --transition-default: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-card: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
    --transition-smooth: all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z"/>
        <path d="M16 10v6l4 2"/>
        <path d="M8 16h2M22 16h2M16 8V6M16 26v-2"/>
      </svg>
    ),
    title: '충전 서비스',
    description: '전국 충전 네트워크와 스마트 충전 솔루션으로 언제 어디서나 편리하게.',
    tag: 'EV',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="18" rx="2"/>
        <path d="M4 12h24"/>
        <path d="M10 17h4M10 21h8"/>
      </svg>
    ),
    title: '온라인 서비스 예약',
    description: '24시간 온라인으로 정비 예약부터 상담까지 간편하게 진행하세요.',
    tag: '디지털',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h24M4 16h16M4 24h20"/>
        <circle cx="26" cy="24" r="4"/>
        <path d="M24 24l1.5 1.5L28 22"/>
      </svg>
    ),
    title: '서비스 상품 안내',
    description: '고객 맞춤형 서비스 패키지와 정비 상품을 한눈에 비교하세요.',
    tag: '패키지',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18l4-8 4 4 4-6 4 4 4-4"/>
        <path d="M4 26h24"/>
        <circle cx="10" cy="10" r="2"/>
      </svg>
    ),
    title: '수리 서비스',
    description: '공인 기술진이 순정 부품으로 완벽한 수리를 보장합니다.',
    tag: '정비',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>
        <path d="M8 24l-4 4M24 24l4 4"/>
        <path d="M4 20h24"/>
      </svg>
    ),
    title: '고장 및 손상 지원',
    description: '24시간 긴급출동 서비스로 위기 상황에서 신속하게 대응합니다.',
    tag: '긴급',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6l2.5 5 5.5.8-4 3.9.9 5.5L16 19l-4.9 2.2.9-5.5L8 11.8l5.5-.8z"/>
        <path d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10"/>
      </svg>
    ),
    title: '보험 상품',
    description: '메르세데스-벤츠 전용 보험으로 차량과 일상을 안전하게 보호하세요.',
    tag: '보험',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="24" height="10" rx="2"/>
        <path d="M8 14V10a8 8 0 0116 0v4"/>
        <circle cx="16" cy="19" r="2"/>
      </svg>
    ),
    title: '장기 렌터카 프로그램',
    description: '합리적인 월 비용으로 메르세데스-벤츠의 프리미엄을 경험하세요.',
    tag: '렌터카',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="4" width="16" height="24" rx="2"/>
        <path d="M12 8h8M12 12h8M12 16h5"/>
        <circle cx="20" cy="22" r="3"/>
        <path d="M19 22l.8.8L22 20.5"/>
      </svg>
    ),
    title: '메르세데스-벤츠 앱',
    description: '스마트폰으로 차량 제어, 서비스 예약, 충전 현황을 실시간으로.',
    tag: '앱',
    href: '#',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z"/>
        <path d="M12 16l3 3 5-6"/>
        <path d="M16 8v2M16 22v2M8 16H6M26 16h-2"/>
      </svg>
    ),
    title: 'Mercedes me Care 멤버십',
    description: '프리미엄 멤버십으로 더 넓은 혜택과 특별한 경험을 누리세요.',
    tag: '멤버십',
    href: '#',
  },
];

export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredCta, setHoveredCta] = useState(false);

  return (
    <>
      <style>{cssVariables}</style>
      <style>{`
        @keyframes starFloat {
          0%, 100% { opacity: 0.3; transform: translateY(0px); }
          50% { opacity: 0.8; transform: translateY(-3px); }
        }
        @keyframes auroraPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes electricLine {
          0% { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        .star-particle {
          position: absolute;
          border-radius: 50%;
          animation: starFloat ease-in-out infinite;
        }
        .service-card-inner {
          transition: var(--transition-card);
        }
        .service-card-inner:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-title {
            font-size: 40px !important;
          }
          .hero-subtitle {
            font-size: 16px !important;
          }
          .section-heading {
            font-size: 32px !important;
          }
          .nav-links-wrapper {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-default)',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-primary)',
          overflowX: 'hidden',
        }}
      >
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
            padding: '0 80px',
            background: 'rgba(5, 8, 16, 0.92)',
            borderBottom: '1px solid rgba(42, 58, 74, 0.60)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            boxShadow: '0 2px 20px rgba(5, 8, 16, 0.80)',
          }}
          aria-label="주요 네비게이션"
        >
          <a
            href="/"
            data-role="logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Mercedes-Benz Korea 홈으로"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="17" stroke="#B0B7C8" strokeWidth="1.5"/>
              <path d="M18 4l4.5 8.5L32 14l-7 6.5 1.5 9.5L18 26l-8.5 4L11 20.5 4 14l9.5-1.5z" stroke="#B0B7C8" strokeWidth="1" fill="none"/>
              <circle cx="18" cy="18" r="3" fill="#B0B7C8"/>
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
              }}
            >
              Mercedes-Benz
            </span>
          </a>

          <div
            data-role="nav-links"
            className="nav-links-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {[
              { label: '승용차', href: '/passengercars' },
              { label: '서비스', href: '/passengercars/services.html' },
              { label: '전기차', href: '/eq' },
              { label: '혁신', href: '/innovation' },
              { label: '브랜드', href: '/brand' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  color: hoveredNav === item.label ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'var(--transition-default)',
                  borderBottom: item.href.includes('services') ? '1px solid var(--color-primary)' : 'none',
                  paddingBottom: '2px',
                }}
                aria-current={item.href.includes('services') ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#service-booking"
            data-role="nav-cta"
            onMouseEnter={() => setHoveredCta(true)}
            onMouseLeave={() => setHoveredCta(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 24px',
              background: hoveredCta ? 'var(--color-primary-hover)' : 'var(--color-primary)',
              color: '#0A0E1A',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              transition: 'var(--transition-default)',
              boxShadow: hoveredCta ? '0 0 24px rgba(0, 179, 136, 0.40)' : 'none',
            }}
          >
            서비스 예약
          </a>
        </nav>

        {/* HERO SECTION */}
        <section
          data-layout="hero"
          data-section="hero"
          data-bg="#050810"
          style={{
            position: 'relative',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'flex-end',
            paddingTop: '72px',
            overflow: 'hidden',
          }}
          aria-labelledby="hero-heading"
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #050810 0%, #0A1628 50%, #0A2A2A 100%)',
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Starlight radial */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,179,136,0.20) 0%, rgba(5,8,16,0) 70%)',
              zIndex: 1,
              animation: 'auroraPulse 6s ease-in-out infinite',
            }}
            aria-hidden="true"
          />

          {/* Star particles */}
          {[
            { top: '15%', left: '8%', size: '1.5px', delay: '0s', opacity: 0.6 },
            { top: '25%', left: '22%', size: '1px', delay: '1s', opacity: 0.4 },
            { top: '10%', left: '45%', size: '2px', delay: '2s', opacity: 0.7 },
            { top: '35%', left: '68%', size: '1px', delay: '0.5s', opacity: 0.5 },
            { top: '20%', left: '85%', size: '1.5px', delay: '1.5s', opacity: 0.6 },
            { top: '50%', left: '12%', size: '1px', delay: '3s', opacity: 0.3 },
            { top: '45%', left: '55%', size: '2px', delay: '2.5s', opacity: 0.5 },
            { top: '60%', left: '78%', size: '1px', delay: '1s', opacity: 0.4 },
            { top: '70%', left: '32%', size: '1.5px', delay: '0.8s', opacity: 0.35 },
            { top: '30%', left: '92%', size: '1px', delay: '3.5s', opacity: 0.6 },
          ].map((star, i) => (
            <div
              key={i}
              className="star-particle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                background: i % 3 === 0 ? 'rgba(0,179,136,0.8)' : 'rgba(200,208,224,0.6)',
                animationDelay: star.delay,
                animationDuration: `${3 + i * 0.5}s`,
                zIndex: 2,
              }}
              aria-hidden="true"
            />
          ))}

          {/* Electric line */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%)',
              zIndex: 3,
            }}
            aria-hidden="true"
          />

          <div
            style={{
              position: 'relative',
              zIndex: 4,
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '80px 80px 80px',
              width: '100%',
            }}
          >
            <span
              data-role="section-label"
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '24px',
              }}
            >
              Customer Services
            </span>

            <h1
              id="hero-heading"
              className="hero-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '64px',
                fontWeight: '300',
                lineHeight: '1.05',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
                margin: '0 0 12px',
                maxWidth: '700px',
              }}
            >
              Your Journey,
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Our Commitment.</span>
            </h1>

            <p
              className="hero-subtitle"
              style={{
                fontFamily: 'var(--font-korean)',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '1.6',
                color: 'var(--color-text-secondary)',
                margin: '0 0 40px',
                maxWidth: '560px',
              }}
            >
              별을 넘어, 미래를 달린다.
            </p>

            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                maxWidth: '520px',
                margin: 0,
              }}
            >
              메르세데스-벤츠는 차량 구매 이후에도 충전, 정비, 보험, 렌터카 등
              <br />
              폭넓은 서비스로 고객과 함께합니다.
            </p>
          </div>
        </section>

        {/* SERVICES GRID SECTION */}
        <section
          data-layout="grid"
          data-section="services"
          data-bg="#050810"
          data-columns="3"
          style={{
            padding: '96px 80px 128px',
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative',
          }}
          aria-labelledby="services-heading"
        >
          {/* Section header */}
          <div
            style={{
              marginBottom: '64px',
              maxWidth: '600px',
            }}
          >
            <span
              data-role="section-label"
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '16px',
              }}
            >
              All Services
            </span>

            <h2
              id="services-heading"
              className="section-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '48px',
                fontWeight: '400',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                margin: '0 0 20px',
              }}
            >
              Precision Meets Possibility.
            </h2>

            <p
              style={{
                fontSize: '17px',
                lineHeight: '1.65',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              정밀함이 가능성을 만날 때, 모든 순간이 완벽해집니다.
            </p>

            {/* Accent divider */}
            <div
              style={{
                marginTop: '32px',
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, #00B388 0%, rgba(0,179,136,0) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Grid */}
          <div
            className="services-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            role="list"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                isHovered={hoveredCard === index}
                onHover={() => setHoveredCard(index)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            id="service-booking"
            style={{
              marginTop: '80px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <CtaButton
              href="#"
              variant="primary"
              label="서비스 예약"
            />
            <CtaButton
              href="#"
              variant="secondary"
              label="서비스 상담 문의"
            />
          </div>
        </section>

        {/* BANNER SECTION */}
        <section
          data-layout="banner"
          data-section="service-banner"
          data-bg="#0A1628"
          style={{
            background: 'linear-gradient(135deg, #050810 0%, #0D2040 60%, #002B21 100%)',
            borderTop: '1px solid rgba(42, 58, 74, 0.60)',
            borderBottom: '1px solid rgba(42, 58, 74, 0.60)',
            padding: '80px',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-labelledby="banner-heading"
        >
          {/* Aurora glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,179,136,0) 0%, rgba(0,179,136,0.08) 50%, rgba(0,179,136,0) 100%)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />

          <div
            style={{
              position: 'relative',
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '40px',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <span
                data-role="section-label"
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                }}
              >
                Mercedes me Care
              </span>

              <h2
                id="banner-heading"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '36px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 16px',
                }}
              >
                Silence is the New Power.
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.65',
                  color: 'var(--color-text-secondary)',
                  margin: '0 0 28px',
                }}
              >
                고요함이 새로운 힘입니다. Mercedes me Care 멤버십으로
                더 넓고 특별한 혜택을 경험하세요.
              </p>

              {/* Pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
                role="list"
                aria-label="멤버십 혜택 목록"
              >
                {['24시간 긴급출동', '정비 우선 예약', '전용 고객센터', '충전 크레딧', '특별 할인 혜택'].map((pill) => (
                  <span
                    key={pill}
                    data-role="pill-item"
                    role="listitem"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 14px',
                      background: 'rgba(0, 179, 136, 0.12)',
                      border: '1px solid rgba(0, 179, 136, 0.30)',
                      borderRadius: '2px',
                      fontSize: '12px',
                      fontWeight: '500',
                      letterSpacing: '0.06em',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <a
                href="#"
                data-role="button"
                data-variant="primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  background: 'var(--color-primary)',
                  color: '#0A0E1A',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  transition: 'var(--transition-default)',
                  whiteSpace: 'nowrap',
                }}
                aria-label="멤버십 가입하기"
              >
                멤버십 가입하기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
              <a
                href="#"
                data-role="button"
                data-variant="secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  cursor: 'pointer',
                }}
                aria-label="멤버십 혜택 자세히 보기"
              >
                혜택 자세히 보기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* SPLIT SECTION — App */}
        <section
          data-layout="split"
          data-section="app-section"
          data-bg="#050810"
          style={{
            padding: '128px 80px',
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative',
          }}
          aria-labelledby="app-heading"
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            {/* Left - Image */}
            <div
              data-role="split-left"
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: '1px solid var(--color-border-subtle)',
                background: 'var(--color-bg-surface)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80&auto=format&fit=crop"
                alt="메르세데스-벤츠 앱 서비스"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.90) contrast(1.05)',
                  display: 'block',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.50) 100%)',
                }}
                aria-hidden="true"
              />
              {/* Accent glow bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Right - Content */}
            <div data-role="split-right">
              <span
                data-role="section-label"
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                }}
              >
                Digital Experience
              </span>

              <h2
                id="app-heading"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '40px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 20px',
                }}
              >
                Drive Electric.
                <br />
                Live Responsibly.
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.65',
                  color: 'var(--color-text-secondary)',
                  margin: '0 0 40px',
                }}
              >
                전기로 달리고, 책임으로 앞서갑니다. 메르세데스-벤츠 앱으로
                차량 상태, 충전 현황, 서비스 예약을 언제 어디서나 관리하세요.
              </p>

              {/* Accordion items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {[
                  {
                    title: '실시간 차량 모니터링',
                    content: '배터리 상태, 주행 거리, 차량 진단 정보를 실시간으로 확인하세요.',
                  },
                  {
                    title: '원격 제어 기능',
                    content: '에어컨 예약, 문 잠금/해제, 충전 스케줄 설정을 원격으로 제어합니다.',
                  },
                  {
                    title: '스마트 충전 관리',
                    content: '가장 가까운 충전소 찾기, 충전 예약, 충전 이력 관리 기능을 제공합니다.',
                  },
                  {
                    title: '서비스 예약 통합',
                    content: '정비 예약, 서비스 이력, 담당 어드바이저 연결까지 한 앱에서 완성됩니다.',
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} title={item.title} content={item.content} />
                ))}
              </div>

              <div style={{ marginTop: '40px' }}>
                <a
                  href="#"
                  data-role="button"
                  data-variant="primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 32px',
                    background: 'transparent',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(0, 179, 136, 0.40)',
                    borderRadius: '2px',
                    transition: 'var(--transition-default)',
                  }}
                  aria-label="앱 다운로드 페이지로 이동"
                >
                  앱 다운로드
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M8 3v10M4 9l4 4 4-4"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          data-section="footer"
          data-bg="#0A0C12"
          style={{
            background: '#0A0C12',
            borderTop: '1px solid var(--color-border-subtle)',
            padding: '64px 80px 40px',
          }}
          aria-label="푸터"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: '48px',
                marginBottom: '48px',
              }}
            >
              {/* Brand */}
              <div>
                <a
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    marginBottom: '20px',
                  }}
                  aria-label="Mercedes-Benz Korea 홈으로"
                >
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" stroke="#6D7890" strokeWidth="1.5"/>
                    <path d="M18 4l4.5 8.5L32 14l-7 6.5 1.5 9.5L18 26l-8.5 4L11 20.5 4 14l9.5-1.5z" stroke="#6D7890" strokeWidth="1" fill="none"/>
                    <circle cx="18" cy="18" r="3" fill="#6D7890"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: '500',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    Mercedes-Benz Korea
                  </span>
                </a>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '1.7',
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                    maxWidth: '280px',
                  }}
                >
                  별에서 태어나, 지구를 위해 달린다.<br />
                  Born from Stars. Built for Earth.
                </p>
              </div>

              {/* Links */}
              {[
                {
                  title: '서비스',
                  links: ['충전 서비스', '정비 예약', '보험 상품', '장기 렌터카'],
                },
                {
                  title: '차량',
                  links: ['EQ 전기차', '세단', 'SUV', 'AMG'],
                },
                {
                  title: '고객지원',
                  links: ['고객 센터', 'FAQ', '딜러 찾기', '약관 안내'],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h3
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 20px',
                    }}
                  >
                    {col.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          style={{
                            color: 'var(--color-text-tertiary)',
                            textDecoration: 'none',
                            fontSize: '13px',
                            lineHeight: '1.4',
                            transition: 'var(--transition-default)',
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLAnchorElement).style.color = 'var(--color-text-tertiary)';
                          }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer bottom */}
            <div
              style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '28px',
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
                  margin: 0,
                  letterSpacing: '0.04em',
                }}
              >
                © 2025 Mercedes-Benz Korea Ltd. All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                {['개인정보처리방침', '이용약관', '쿠키 설정'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-tertiary)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'var(--transition-default)',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.color = 'var(--color-text-tertiary)';
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ServiceCard({ service, isHovered, onHover, onLeave }: ServiceCardProps) {
  return (
    <article
      data-role="card-item"
      data-variant="feature"
      role="listitem"
      className="service-card-inner"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        background: isHovered
          ? 'linear-gradient(135deg, #111827 0%, #1C2B3A 100%)'
          : '#111827',
        border: isHovered
          ? '1px solid rgba(0, 179, 136, 0.35)'
          : '1px solid #2A3A4A',
        borderRadius: '2px',
        padding: '28px',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 8px 40px rgba(5, 8, 16, 0.80), 0 0 20px rgba(0, 179, 136, 0.12)'
          : '0 4px 24px rgba(5, 8, 16, 0.60)',
        overflow: 'hidden',
      }}
    >
      {/* Left accent border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '2px',
          background: isHovered
            ? '#00B388'
            : 'rgba(0, 179, 136, 0.30)',
          transition: 'var(--transition-card)',
        }}
        aria-hidden="true"
      />

      {/* Card shimmer on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(200,208,224,0.04) 50%, transparent 60%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon + Tag row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <span
          data-role="card-icon"
          style={{
            color: isHovered ? '#00B388' : '#B0B7C8',
            transition: 'var(--transition-card)',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-hidden="true"
        >
          {service.icon}
        </span>

        <span
          data-role="card-tag"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 8px',
            background: isHovered ? 'rgba(0, 179, 136, 0.15)' : 'rgba(42, 58, 74, 0.60)',
            border: isHovered ? '1px solid rgba(0, 179, 136, 0.35)' : '1px solid #2A3A4A',
            borderRadius: '2px',
            fontSize: '10px',
            fontWeight: '600',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: isHovered ? '#00B388' : '#B0B7C8',
            transition: 'var(--transition-card)',
          }}
        >
          {service.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        data-role="card-title"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '1.3',
          letterSpacing: '-0.005em',
          color: 'var(--color-text-primary)',
          margin: '0 0 10px',
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        data-role="card-description"
        style={{
          fontSize: '13px',
          lineHeight: '1.65',
          color: 'var(--color-text-secondary)',
          margin: '0 0 24px',
        }}
      >
        {service.description}
      </p>

      {/* CTA Link */}
      <a
        href={service.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: isHovered ? '#00B388' : '#6D7890',
          textDecoration: 'none',
          transition: 'var(--transition-card)',
        }}
        aria-label={`${service.title} 자세히 보기`}
      >
        자세히 보기
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'var(--transition-card)',
          }}
          aria-hidden="true"
        >
          <path d="M2 7h10M8 3l4 4-4 4"/>
        </svg>
      </a>
    </article>
  );
}

interface CtaButtonProps {
  href: string;
  variant: 'primary' | 'secondary';
  label: string;
}

function CtaButton({ href, variant, label }: CtaButtonProps) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: '2px',
    transition: 'var(--transition-default)',
    cursor: 'pointer',
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: hovered ? '#00C99A' : '#00B388',
    color: '#0A0E1A',
    border: 'none',
    boxShadow: hovered ? '0 0 24px rgba(0, 179, 136, 0.40)' : 'none',
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: hovered ? '#00B388' : '#E8EAF0',
    border: hovered ? '1px solid rgba(0, 179, 136, 0.60)' : '1px solid #2A3A4A',
    boxShadow: hovered ? '0 0 12px rgba(0, 179, 136, 0.15)' : 'none',
  };

  return (
    <a
      href={href}
      data-role="button"
      data-variant={variant}
      style={variant === 'primary' ? primaryStyle : secondaryStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4"/>
      </svg>
    </a>
  );
}

interface AccordionItemProps {
  title: string;
  content: string;
}

function AccordionItem({ title, content }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-role="accordion-item"
      style={{
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: open ? '#00B388' : '#E8EAF0',
          transition: 'var(--transition-default)',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            fontWeight: '500',
            letterSpacing: '-0.005em',
            color: 'inherit',
          }}
        >
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'var(--transition-default)',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <path d="M10 4v12M4 10h12"/>
        </svg>
      </button>

      {open && (
        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.65',
            color: 'var(--color-text-secondary)',
            margin: '0 0 16px',
            paddingRight: '32px',
          }}
        >
          {content}
        </p>
      )}
    </div>
  );
}