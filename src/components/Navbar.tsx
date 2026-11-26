import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { PROFILE } from '../data/profile';

const NAV_ITEMS = [
  { id: 'work', num: '01', label: 'Work', meta: '8 projects' },
  { id: 'stack', num: '02', label: 'Stack', meta: 'L1 → L5' },
  { id: 'journey', num: '03', label: 'Journey', meta: 'since 2021' },
  { id: 'contact', num: '04', label: 'Contact', meta: 'say hello' },
] as const;

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track active section in viewport
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll & support Escape when mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#161618] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:h-[76px] lg:px-20">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-3 text-sm text-[#EDEDED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F432]"
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#2A2A2E] bg-[#0F0F10] font-mono text-xs font-bold text-[#C6F432] transition-colors group-hover:border-[#C6F432]/60">
              DS
            </span>
            <span className="font-mono text-[13px] tracking-tight text-[#EDEDED] lg:text-sm">
              {PROFILE.handle}
            </span>
            <span className="hidden font-mono text-[#3A3A40] xl:inline">/</span>
            <span className="hidden font-mono text-[#6B6B73] xl:inline">{PROFILE.roleSuffix}</span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex lg:gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-mono text-xs tracking-[0.06em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F432] ${
                    isActive ? 'text-[#EDEDED]' : 'text-[#8A8A93] hover:text-[#EDEDED]'
                  }`}
                >
                  <span className={`mr-1.5 ${isActive ? 'text-[#C6F432]' : 'text-[#55555C]'}`}>
                    {item.num}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Status & Resume */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="hidden h-[30px] items-center gap-2 rounded-full border border-[#C6F432]/25 bg-[#C6F432]/[0.07] px-3 font-mono text-[11px] tracking-[0.04em] whitespace-nowrap text-[#C6F432] lg:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6F432] opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C6F432]" />
              </span>
              {PROFILE.availability}
            </span>

            <a
              href={PROFILE.resumeUrl}
              download="Danidu-Sennath-Resume.pdf"
              className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-3.5 text-[13px] font-semibold tracking-[-0.01em] text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#222226] bg-[#0F0F10] text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 md:hidden"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0A] md:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-[#161618] px-5">
              <div className="flex items-center gap-3">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#2A2A2E] bg-[#0F0F10] font-mono text-xs font-bold text-[#C6F432]">
                  DS
                </span>
                <span className="font-mono text-[13px] text-[#EDEDED]">{PROFILE.handle}</span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C6F432] text-[#C6F432]"
              >
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
              <div>
                <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-[#C6F432]/25 bg-[#C6F432]/[0.07] px-3 font-mono text-[11px] tracking-[0.04em] text-[#C6F432]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#C6F432]" />
                  {PROFILE.availability}
                </span>

                <nav className="mt-5" aria-label="Mobile sections">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.2 }}
                        className="flex items-baseline justify-between border-b border-[#18181B] py-5"
                      >
                        <div className="flex items-baseline gap-3.5">
                          <span
                            className={`font-mono text-xs ${
                              isActive ? 'text-[#C6F432]' : 'text-[#55555C]'
                            }`}
                          >
                            {item.num}
                          </span>
                          <span
                            className={`text-[38px] leading-none font-semibold tracking-[-0.045em] ${
                              isActive ? 'text-[#F2F2F2]' : 'text-[#8A8A93]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#55555C]">{item.meta}</span>
                      </motion.a>
                    );
                  })}
                </nav>

                {/* Direct social icon row */}
                <div className="mt-8 flex gap-2.5">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#222226] bg-[#0F0F10] text-[#B4B4BB] hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#222226] bg-[#0F0F10] text-[#B4B4BB] hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Email"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#222226] bg-[#0F0F10] text-[#B4B4BB] hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#222226] bg-[#0F0F10] text-[#B4B4BB] hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>

                <a
                  href={PROFILE.resumeUrl}
                  download="Danidu-Sennath-Resume.pdf"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#C6F432] text-[15px] font-semibold tracking-[-0.01em] text-[#0A0A0A]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download resume
                </a>
              </div>

              <div className="pt-8 font-mono text-[11px] leading-[1.7] text-[#3A3A40]">
                // ESC to close · focus managed
                <br />
                // prefers-reduced-motion respected
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
