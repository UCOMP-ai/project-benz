'use client';

import React, { useState } from 'react';

const CSS_VARIABLES = `
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
    --text-h1: 60px;
    --text-h2: 48px;
    --text-h3: 36px;
    --text-base: 15px;
    --spacing-section-padding: 96px;
    --spacing-element-gap: 32px;
  }
`;

interface CategoryItem {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
  count: string;
  tag?: string;
  imageKeyword: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    id: 'electric',
    label: '전기 자동차',
    labelEn: 'Electric Vehicles',
    icon: '⚡',
    description: '고요하고 강렬한 전기의 에너지. EQ 라인업이 전달하는 새로운 주행 경험.',
    count: '12',
    tag: 'EQ',
    imageKeyword: 'electric car mercedes luxury dark',
    href: '#electric',
  },
  {
    id: 'phev',
    label: '플러그인 하이브리드',
    labelEn: 'Plug-In Hybrid',
    icon: '🔋',
    description: '전기와 연료의 경계를 허물다. 지속 가능한 럭셔리의 실용적 선택.',
    count: '8',
    tag: 'PHEV',
    imageKeyword: 'hybrid mercedes car night city',
    href: '#phev',
  },
  {
    id: 'sedan',
    label: '세단',
    labelEn: 'Sedan',
    icon: '🚗',
    description: '독일 장인 정신이 빚어낸 완벽한 비율. 정밀함이 가능성을 만날 때.',
    count: '10',
    imageKeyword: 'mercedes sedan luxury automobile studio',
    href: '#sedan',
  },
  {
    id: 'suv',
    label: 'SUV',
    labelEn: 'SUV',
    icon: '🛻',
    description: '지평선 너머를 향한 의지. 어떤 지형도 품위 있게 정복한다.',
    count: '14',
    imageKeyword: 'mercedes suv luxury offroad mountain',
    href: '#suv',
  },
  {
    id: 'hatchback',
    label: '해치백',
    labelEn: 'Hatchback',
    icon: '🚙',
    description: '도시의 리듬에 맞는 민첩함. 작지만 결코 타협하지 않는 품격.',
    count: '4',
    imageKeyword: 'mercedes compact hatchback urban street',
    href: '#hatchback',
  },
  {
    id: 'coupe',
    label: '쿠페',
    labelEn: 'Coupé',
    icon: '🏎️',
    description: '유선형 실루엣이 새기는 속도의 시. 달리기 위해 태어난 형태.',
    count: '6',
    imageKeyword: 'mercedes coupe sports car sleek dark',
    href: '#coupe',
  },
  {
    id: 'cabriolet',
    label: '카브리올레 & 로드스터',
    labelEn: 'Cabriolet & Roadster',
    icon: '🌬️',
    description: '하늘을 열고 바람을 가르다. 개방된 자유로움과 프리미엄의 공존.',
    count: '3',
    imageKeyword: 'mercedes cabriolet convertible open road sunset',
    href: '#cabriolet',
  },
];

function StarParticles() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
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
            background: 'rgba(200, 208, 224, 0.8)',
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

function NavBar() {
  return (
    <nav
      data-section="nav"
      role="navigation"
      aria-label="메인 네비게이션"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(5, 8, 16, 0.92)',
        borderBottom: '1px solid rgba(42, 58, 74, 0.60)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 80px',
        zIndex: 200,
        boxShadow: '0 2px 20px rgba(5, 8, 16, 0.80)',
      }}
    >
      <a
        href="/"
        data-role="logo"
        aria-label="Mercedes-Benz Korea 홈으로"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'var(--color-text-primary)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
          }}
          aria-hidden="true"
        >
          ✦
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            fontWeight: '300',
            letterSpacing: '0.04em',
            color: 'var(--color-text-primary)',
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
        {[
          { label: '모델', href: '/passengercars/models.html' },
          { label: 'EQ 전기차', href: '/eq' },
          { label: '딜러 찾기', href: '/dealer' },
          { label: '시승 신청', href: '/test-drive' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color:
                item.href === '/passengercars/models.html'
                  ? 'var(--color-text-accent)'
                  : 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              if (item.href !== '/passengercars/models.html') {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (item.href !== '/passengercars/models.html') {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-secondary)';
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href="/configure"
        data-role="nav-cta"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#0A0E1A',
          background: 'var(--color-primary)',
          border: 'none',
          padding: '10px 24px',
          borderRadius: '2px',
          textDecoration: 'none',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            'var(--color-primary-hover)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 0 24px rgba(0, 179, 136, 0.40)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            'var(--color-primary)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
        }}
      >
        견적 문의
      </a>
    </nav>
  );
}

function HeroBanner() {
  return (
    <section
      data-layout="hero"
      data-section="hero"
      data-bg="#050810"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #050810 0%, #0A1628 50%, #0A2A2A 100%)',
        paddingTop: '72px',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <StarParticles />

      {/* Nebula glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,179,136,0.18) 0%, rgba(5,8,16,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 80px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <span
            data-role="section-label"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '24px',
              padding: '4px 12px',
              border: '1px solid rgba(0, 179, 136, 0.30)',
              background: 'rgba(0, 179, 136, 0.08)',
              borderRadius: '2px',
            }}
          >
            Passenger Cars
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '60px',
              fontWeight: '300',
              lineHeight: '1.1',
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
            }}
          >
            Our Models
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: '400',
              letterSpacing: '-0.01em',
              color: 'var(--color-text-secondary)',
              margin: '0 0 24px 0',
            }}
          >
            별을 넘어, 미래를 달린다.
          </p>

          <div
            style={{
              height: '1px',
              width: '80px',
              background:
                'linear-gradient(90deg, var(--color-primary) 0%, rgba(0,179,136,0) 100%)',
              marginBottom: '24px',
            }}
            aria-hidden="true"
          />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              fontWeight: '400',
              lineHeight: '1.65',
              color: 'var(--color-text-secondary)',
              margin: 0,
              maxWidth: '480px',
            }}
          >
            메르세데스-벤츠의 전 라인업을 확인하세요. 전기차와 플러그인 하이브리드
            모델도 포함됩니다.
          </p>
        </div>
      </div>

      {/* Bottom electric line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%)',
          opacity: 0.5,
        }}
      />
    </section>
  );
}

function FilterTabs({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const filters = [
    { id: 'all', label: '전체 모델' },
    { id: 'electric', label: '전기 자동차' },
    { id: 'phev', label: '플러그인 하이브리드' },
    { id: 'sedan', label: '세단' },
    { id: 'suv', label: 'SUV' },
  ];

  return (
    <div
      role="tablist"
      aria-label="차량 카테고리 필터"
      style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '48px',
      }}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          role="tab"
          aria-selected={active === f.id}
          onClick={() => onSelect(f.id)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color:
              active === f.id
                ? 'var(--color-primary)'
                : 'var(--color-text-secondary)',
            background:
              active === f.id
                ? 'rgba(0, 179, 136, 0.12)'
                : 'rgba(42, 58, 74, 0.40)',
            border:
              active === f.id
                ? '1px solid rgba(0, 179, 136, 0.40)'
                : '1px solid #2A3A4A',
            padding: '8px 16px',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            if (active !== f.id) {
              (e.currentTarget as HTMLButtonElement).style.color =
                'var(--color-text-primary)';
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                '#4A5878';
            }
          }}
          onMouseLeave={(e) => {
            if (active !== f.id) {
              (e.currentTarget as HTMLButtonElement).style.color =
                'var(--color-text-secondary)';
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                '#2A3A4A';
            }
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.outline =
              '2px solid #00B388';
            (e.currentTarget as HTMLButtonElement).style.outlineOffset = '3px';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.outline = 'none';
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function CategoryCard({ item }: { item: CategoryItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-role="card-item"
      data-variant="feature"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered
          ? 'linear-gradient(180deg, #1C2B3A 0%, #111827 100%)'
          : 'linear-gradient(180deg, #111827 0%, #0A0E1A 100%)',
        border: hovered
          ? '1px solid rgba(0, 179, 136, 0.35)'
          : '1px solid #1C2B3A',
        borderRadius: '2px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 40px rgba(5, 8, 16, 0.80), 0 0 20px rgba(0, 179, 136, 0.12)'
          : '0 4px 24px rgba(5, 8, 16, 0.60)',
        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
    >
      {/* Image Area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: '#0A0E1A',
        }}
      >
        <img
          src={`https://source.unsplash.com/featured/800x450/?${encodeURIComponent(item.imageKeyword)}`}
          alt={item.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered
              ? 'brightness(1.0) contrast(1.08)'
              : 'brightness(0.75) contrast(1.05)',
            transition: 'filter 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(5,8,16,0.60) 100%)',
          }}
        />

        {/* Tag badge */}
        {item.tag && (
          <span
            data-role="card-badge"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0A0E1A',
              background: 'var(--color-primary)',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            {item.tag}
          </span>
        )}

        {/* Count badge */}
        <div
          aria-label={`${item.count}개 모델`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.06em',
            color: 'var(--color-text-secondary)',
            background: 'rgba(5, 8, 16, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(42, 58, 74, 0.60)',
            padding: '4px 10px',
            borderRadius: '2px',
          }}
        >
          {item.count} 모델
        </div>

        {/* Shimmer effect on hover */}
        {hovered && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 40%, rgba(200,208,224,0.06) 50%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 24px 24px',
          position: 'relative',
        }}
      >
        {/* Left accent line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: hovered
              ? 'var(--color-primary)'
              : 'transparent',
            transition: 'background 350ms cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: '0 2px 2px 0',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div>
            <span
              data-role="card-tag"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: hovered
                  ? 'var(--color-primary)'
                  : 'var(--color-text-tertiary)',
                marginBottom: '6px',
                transition: 'color 200ms ease',
              }}
            >
              {item.labelEn}
            </span>
            <h3
              data-role="card-title"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '400',
                lineHeight: '1.2',
                letterSpacing: '-0.005em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {item.label}
            </h3>
          </div>
          <span
            data-role="card-icon"
            aria-hidden="true"
            style={{
              fontSize: '24px',
              opacity: 0.7,
              flexShrink: 0,
              marginLeft: '12px',
            }}
          >
            {item.icon}
          </span>
        </div>

        <p
          data-role="card-description"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: '400',
            lineHeight: '1.6',
            letterSpacing: '0.01em',
            color: 'var(--color-text-secondary)',
            margin: '0 0 20px 0',
          }}
        >
          {item.description}
        </p>

        <a
          href={item.href}
          aria-label={`${item.label} 모델 살펴보기`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: hovered ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition: 'color 200ms ease',
          }}
        >
          살펴보기
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <path
              d="M1 7h12M8 3l5 4-5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

function CtaBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      data-layout="banner"
      data-section="cta-models"
      data-bg="#0A0E1A"
      style={{
        background: 'linear-gradient(180deg, #0A0E1A 0%, #050810 100%)',
        padding: '96px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(ellipse, rgba(0,179,136,0.12) 0%, rgba(5,8,16,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <span
            data-role="section-label"
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '16px',
            }}
          >
            Model Exploration
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '48px',
              fontWeight: '300',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            모델 탐색
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              fontWeight: '400',
              lineHeight: '1.65',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            당신의 이동이 세상을 바꿉니다.
            <br />
            전 라인업을 직접 탐색하고, 나에게 맞는 메르세데스-벤츠를 발견하세요.
          </p>

          {/* Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '24px',
            }}
          >
            {['EQ 전기차', 'PHEV', 'AMG', 'Maybach', 'G-Class'].map(
              (pill) => (
                <span
                  key={pill}
                  data-role="pill-item"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)',
                    background: 'rgba(42, 58, 74, 0.60)',
                    border: '1px solid #2A3A4A',
                    padding: '5px 12px',
                    borderRadius: '2px',
                  }}
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="/passengercars/models.html"
            data-role="button"
            data-variant="primary"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0A0E1A',
              background: hovered
                ? 'var(--color-primary-hover)'
                : 'var(--color-primary)',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: hovered
                ? '0 0 24px rgba(0, 179, 136, 0.40)'
                : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            모델 탐색
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8h12M9 4l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </a>

          <a
            href="/test-drive"
            data-role="button"
            data-variant="secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              background: 'transparent',
              border: '1px solid #2A3A4A',
              padding: '15px 36px',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                'var(--color-primary)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(0, 179, 136, 0.60)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 0 12px rgba(0, 179, 136, 0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                'var(--color-text-primary)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                '#2A3A4A';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            시승 신청
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      data-section="footer"
      data-bg="#020408"
      style={{
        background: '#020408',
        borderTop: '1px solid #1C2B3A',
        padding: '64px 80px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
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
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: '300',
                letterSpacing: '0.04em',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span aria-hidden="true">✦</span> Mercedes-Benz
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: '1.7',
                color: 'var(--color-text-tertiary)',
                margin: '0 0 20px 0',
                maxWidth: '280px',
              }}
            >
              별을 넘어, 미래를 달린다.
              <br />
              Beyond the Stars.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-tertiary)',
                margin: 0,
                lineHeight: '1.6',
              }}
            >
              메르세데스-벤츠 코리아
              <br />
              서울특별시 강남구 테헤란로 521
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: '모델',
              links: ['전기 자동차', '세단', 'SUV', '쿠페', '카브리올레'],
            },
            {
              title: '서비스',
              links: ['시승 신청', '딜러 찾기', '견적 문의', '금융 서비스'],
            },
            {
              title: '회사',
              links: ['메르세데스-벤츠', '지속가능성', '뉴스룸', '채용'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-secondary)',
                  margin: '0 0 16px 0',
                }}
              >
                {col.title}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--color-text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color 150ms ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--color-text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--color-text-tertiary)';
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

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid #1C2B3A',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-text-tertiary)',
              margin: 0,
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
            {['개인정보처리방침', '이용약관', '쿠키 설정'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-text-tertiary)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--color-text-secondary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--color-text-tertiary)';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ModelsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories =
    activeFilter === 'all'
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <>
      <style>{CSS_VARIABLES}</style>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050810; color: #E8EAF0; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 50ms !important;
            transition-duration: 50ms !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-default)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <NavBar />
        <HeroBanner />

        {/* Main Grid Section */}
        <section
          data-layout="grid"
          data-section="models-grid"
          data-bg="#050810"
          data-columns="3"
          style={{
            background:
              'linear-gradient(180deg, #050810 0%, #0A0E1A 50%, #050810 100%)',
            padding: '80px 80px',
            position: 'relative',
          }}
        >
          {/* Background nebula texture */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 20% 50%, rgba(0,179,136,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(13,32,64,0.30) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '40px',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <span
                  data-role="section-label"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    marginBottom: '12px',
                  }}
                >
                  Full Lineup
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '36px',
                    fontWeight: '400',
                    lineHeight: '1.2',
                    letterSpacing: '-0.015em',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  전체 라인업
                </h2>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '400px',
                  textAlign: 'right',
                  margin: 0,
                }}
              >
                메르세데스-벤츠의 전 라인업을 확인하세요.
                <br />
                전기차와 플러그인 하이브리드 모델도 포함됩니다.
              </p>
            </div>

            {/* Electric line divider */}
            <div
              aria-hidden="true"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, rgba(0,179,136,0) 0%, #00B388 50%, rgba(0,179,136,0) 100%)',
                marginBottom: '40px',
                opacity: 0.4,
              }}
            />

            {/* Filter Tabs */}
            <FilterTabs active={activeFilter} onSelect={setActiveFilter} />

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
              role="tabpanel"
              aria-label="필터링된 차량 목록"
            >
              {filteredCategories.map((item) => (
                <CategoryCard key={item.id} item={item} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '64px',
              }}
            >
              <a
                href="/passengercars/models.html"
                data-role="button"
                data-variant="primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#0A0E1A',
                  background: 'var(--color-primary)',
                  border: 'none',
                  padding: '16px 40px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    'var(--color-primary-hover)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 0 24px rgba(0, 179, 136, 0.40)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    'var(--color-primary)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                모델 탐색
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8h12M9 4l5 4-5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <CtaBanner />
        <Footer />
      </div>
    </>
  );
}