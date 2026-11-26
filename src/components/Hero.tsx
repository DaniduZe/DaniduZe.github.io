import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { HERO_STATS, MARQUEE_STACK, PROFILE } from '../data/profile';
import { AsciiPortrait } from './AsciiPortrait';

export function Hero() {
  const tickerItems = [...MARQUEE_STACK, ...MARQUEE_STACK];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 pt-4 pb-14 lg:px-20 lg:py-0">
        <div className="relative flex flex-col-reverse items-center gap-6 lg:min-h-[790px] lg:flex-row lg:items-center lg:justify-between">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative z-10 w-full lg:max-w-[640px] lg:py-16"
          >
            {/* Mobile & Tablet Availability Pill (Desktop displays in sticky Navbar) */}
            <div className="mb-5 lg:hidden">
              <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-[#C6F432]/25 bg-[#C6F432]/[0.07] px-3 font-mono text-[11px] tracking-[0.04em] text-[#C6F432]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6F432] opacity-50 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C6F432]" />
                </span>
                {PROFILE.availability}
              </span>
            </div>

            {/* Kicker */}
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-[#8A8A93] lg:text-xs">
              <span className="h-px w-7 bg-[#C6F432]" aria-hidden="true" />
              <span>{PROFILE.kicker}</span>
            </div>

            {/* Stacked Display Headline */}
            <h1 className="mt-5 text-[52px] leading-[0.94] font-semibold tracking-[-0.055em] text-[#F2F2F2] sm:text-[72px] lg:mt-7 lg:text-[98px] xl:text-[104px]">
              <span className="block">
                Hardware <span className="font-normal text-[#C6F432]">→</span>
              </span>
              <span className="block">
                Cloud <span className="font-normal text-[#C6F432]">→</span>
              </span>
              <span className="block">
                AI<span className="font-normal text-[#C6F432]">.</span>
              </span>
            </h1>

            {/* LinkedIn Hook & Engineering Positioning */}
            <p className="mt-6 text-[19px] leading-[1.35] font-medium tracking-[-0.02em] text-[#EDEDED] lg:mt-8 lg:text-[22px]">
              {PROFILE.tagline}
            </p>
            <p className="mt-3 max-w-[540px] text-[15px] leading-[1.6] text-[#8A8A93] lg:text-base">
              {PROFILE.summary}
            </p>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:mt-9">
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[10px] bg-[#C6F432] px-[22px] text-[15px] font-semibold tracking-[-0.01em] text-[#0A0A0A] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#d1f854] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
              >
                View projects
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[10px] border border-[#2A2A2E] bg-[#0F0F10] px-[22px] text-[15px] font-semibold tracking-[-0.01em] text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact / Resume
              </a>
            </div>

            {/* Verified Proof Stats */}
            <dl className="mt-9 grid max-w-[600px] grid-cols-3 border-t border-[#1A1A1D] pt-4 lg:mt-14">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="pr-2">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[21px] font-semibold tracking-[-0.03em] text-[#EDEDED] lg:text-[26px]">
                    {stat.value}
                  </dd>
                  <dd className="mt-1.5 font-mono text-[10.5px] tracking-[0.03em] text-[#6B6B73] lg:text-[11px]">
                    <span className="sm:hidden">{stat.mobileLabel}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right Portrait Focal Point (Top on Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative flex w-full max-w-[350px] flex-col items-center sm:max-w-[440px] lg:max-w-[590px] xl:max-w-[620px]"
          >
            {/* Subtle radial Signal-Lime atmosphere behind the ASCII face */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(198,244,50,0.065) 0%, rgba(10,10,10,0) 68%)',
              }}
            />

            {/* Corner Fiducial Crosshairs */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-1 hidden font-mono text-sm text-[#3A3A40] lg:block"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 right-1 hidden font-mono text-sm text-[#3A3A40] lg:block"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-7 left-1 hidden font-mono text-sm text-[#3A3A40] lg:block"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-1 bottom-7 hidden font-mono text-sm text-[#3A3A40] lg:block"
            >
              +
            </span>

            {/* Isolated Interactive ASCII Portrait */}
            <AsciiPortrait className="w-full" />

            {/* Telemetry Caption */}
            <div className="mt-1 flex w-full items-center justify-between px-2 font-mono text-[11px] tracking-[0.04em] text-[#55555C]">
              <span>
                <strong className="font-medium text-[#C6F432]">fig.01</strong> — ascii_portrait.tsx
              </span>
              <span className="hidden sm:inline">84 × 57 glyphs · hover or click</span>
              <span className="sm:hidden">tap to pulse</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Continuous Engineering Stack Ticker */}
      <div
        aria-label="Core engineering technologies"
        className="overflow-hidden border-y border-[#161618] bg-[#0A0A0A]"
      >
        <div className="animate-marquee flex w-max items-center gap-7 py-4 font-mono text-[13px] tracking-[0.04em] whitespace-nowrap text-[#6B6B73]">
          {tickerItems.map((tech, idx) => (
            <div key={`${tech}-${idx}`} className="flex items-center gap-7">
              <span className="transition-colors hover:text-[#EDEDED]">{tech}</span>
              <span aria-hidden="true" className="text-[#C6F432]">
                /
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
