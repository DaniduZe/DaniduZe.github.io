import { useState, type FormEvent } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { CONTACT_CHANNELS, PROFILE, type ContactChannel } from '../data/profile';

const TOPICS = ['Freelance', 'Project', 'Hiring', 'Other'] as const;
type Topic = (typeof TOPICS)[number];

function ChannelIcon({ id }: { id: ContactChannel['id'] }) {
  switch (id) {
    case 'email':
      return <Mail className="h-[18px] w-[18px]" aria-hidden="true" />;
    case 'phone':
      return <Phone className="h-[18px] w-[18px]" aria-hidden="true" />;
    case 'whatsapp':
      return <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />;
    case 'github':
      return <Github className="h-[18px] w-[18px]" aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />;
  }
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<Topic>('Freelance');
  const [message, setMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMsg) return;

    const subject = encodeURIComponent(`[${topic}] Inquiry from ${trimmedName}`);
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nTopic: ${topic}\n\n${trimmedMsg}`
    );

    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmittedNotice('Opened your email client with the formatted message.');
    window.setTimeout(() => setSubmittedNotice(null), 5000);
  };

  return (
    <>
      <section id="contact" className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 lg:mb-12 lg:flex-row lg:items-end">
            <div>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432] lg:text-xs">
                <span className="text-[#55555C]">04 /</span> Contact
              </div>
              <h2 className="mt-3.5 max-w-[740px] text-[36px] leading-[1.03] font-semibold tracking-[-0.045em] text-[#EDEDED] sm:text-[46px] lg:mt-4 lg:text-[56px]">
                Have a device that needs{' '}
                <span className="text-[#55555C]">software — or the other way round?</span>
              </h2>
            </div>

            <div className="max-w-[360px] text-[15px] leading-[1.6] text-[#8A8A93]">
              <div className="inline-flex items-center gap-2 text-[#B4B4BB]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C6F432]" aria-hidden="true" />
                <span>
                  Ginigathhena, Sri Lanka · {PROFILE.timezone}
                </span>
              </div>
              <p className="mt-1">{PROFILE.collaborationNote}</p>
            </div>
          </div>

          {/* 2-Column Direct Channels + Composer */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Left Direct Contact Channels */}
            <div className="flex w-full flex-col gap-2.5 lg:w-[540px] lg:shrink-0">
              {CONTACT_CHANNELS.map((channel) => {
                const isEmail = channel.id === 'email';

                if (isEmail) {
                  return (
                    <div
                      key={channel.id}
                      className="flex min-h-[72px] items-center gap-3.5 rounded-[14px] border border-[#C6F432]/35 bg-[#0F0F10] px-4 py-3 sm:min-h-[76px] sm:gap-4 sm:px-[18px]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#C6F432]/35 text-[#C6F432] sm:h-[42px] sm:w-[42px]">
                        <ChannelIcon id={channel.id} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]">
                          {channel.label}
                        </div>
                        <a
                          href={channel.href}
                          className="mt-0.5 block truncate text-[15px] font-medium tracking-[-0.01em] text-[#EDEDED] hover:text-[#C6F432] sm:text-[17px]"
                        >
                          {channel.value}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex h-[34px] shrink-0 items-center gap-2 rounded-lg bg-[#C6F432] px-3 font-mono text-[11px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#d2f857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="group flex min-h-[72px] items-center gap-3.5 rounded-[14px] border border-[#1C1C1F] bg-[#0F0F10] px-4 py-3 transition-colors hover:border-[#2E2E34] sm:min-h-[76px] sm:gap-4 sm:px-[18px]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#26262A] text-[#EDEDED] transition-colors group-hover:border-[#C6F432]/40 group-hover:text-[#C6F432] sm:h-[42px] sm:w-[42px]">
                      <ChannelIcon id={channel.id} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]">
                        {channel.label}
                      </div>
                      <div className="mt-0.5 truncate text-[15px] font-medium tracking-[-0.01em] text-[#EDEDED] sm:text-[17px]">
                        {channel.value}
                      </div>
                    </div>
                    <span className="inline-flex h-[34px] shrink-0 items-center gap-1.5 rounded-lg border border-[#2A2A2E] px-3 font-mono text-[11px] text-[#EDEDED] transition-colors group-hover:border-[#C6F432]/50 group-hover:text-[#C6F432]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{channel.actionLabel}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right Clean Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col rounded-[18px] border border-[#1C1C1F] bg-[#0F0F10] p-5 sm:p-7"
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-[#EDEDED] sm:text-[22px]">
                Send a message
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-2 h-12 w-full rounded-[10px] border border-[#222226] bg-[#0A0A0A] px-3.5 text-[15px] text-[#EDEDED] placeholder-[#55555C] outline-none transition-all focus:border-[#C6F432] focus:ring-3 focus:ring-[#C6F432]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 h-12 w-full rounded-[10px] border border-[#222226] bg-[#0A0A0A] px-3.5 text-[15px] text-[#EDEDED] placeholder-[#55555C] outline-none transition-all focus:border-[#C6F432] focus:ring-3 focus:ring-[#C6F432]/15"
                  />
                </div>
              </div>

              <div className="mt-5">
                <span className="block font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]">
                  Topic
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`inline-flex h-[34px] items-center rounded-lg border px-3 text-[13px] font-medium transition-colors ${
                          active
                            ? 'border-[#C6F432]/55 bg-[#C6F432]/[0.07] text-[#C6F432]'
                            : 'border-[#222226] text-[#8A8A93] hover:border-[#3A3A40] hover:text-[#EDEDED]'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex-1">
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[10.5px] tracking-[0.08em] uppercase text-[#6B6B73]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the system you want to build…"
                  className="mt-2 w-full resize-none rounded-[10px] border border-[#222226] bg-[#0A0A0A] px-3.5 py-3 text-[15px] text-[#EDEDED] placeholder-[#55555C] outline-none transition-all focus:border-[#C6F432] focus:ring-3 focus:ring-[#C6F432]/15"
                />
              </div>

              <div className="mt-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                <span className="font-mono text-[11px] text-[#55555C]">
                  {submittedNotice ? (
                    <span className="text-[#C6F432]">{submittedNotice}</span>
                  ) : (
                    `Direct to ${PROFILE.email}`
                  )}
                </span>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[10px] bg-[#C6F432] px-[22px] text-[15px] font-semibold tracking-[-0.01em] text-[#0A0A0A] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#d2f857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
                >
                  Send message
                  <Send className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with Monumental Wordmark */}
      <footer className="border-t border-[#161618] pt-10 pb-28 md:pb-12">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
          <div
            aria-hidden="true"
            className="hidden select-none overflow-hidden text-center text-[clamp(72px,10.6vw,164px)] leading-[0.88] font-bold tracking-[-0.06em] whitespace-nowrap text-[#141416] md:block"
          >
            DANIDU SENNATH
          </div>

          <div className="mt-2 flex flex-col justify-between gap-3 font-mono text-[11.5px] tracking-[0.04em] text-[#55555C] md:mt-8 md:flex-row md:items-center">
            <span>© 2026 Danidu Sennath · Where circuits think and code moves.</span>
            <div className="flex items-center gap-5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#EDEDED]"
              >
                github/DaniduZe
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#EDEDED]"
              >
                in/danidu-sennath
              </a>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-[#8A8A93] transition-colors hover:text-[#C6F432]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Quick-Contact Dock */}
      <div className="fixed inset-x-4 bottom-4 z-30 md:hidden">
        <div className="flex h-[60px] items-center justify-between rounded-2xl border border-[#26262A] bg-[#111113]/95 pr-2 pl-4 shadow-[0_20px_40px_rgba(0,0,0,0.65)] backdrop-blur-md">
          <div className="min-w-0 pr-2">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#6B6B73]">
              Quick contact
            </div>
            <div className="truncate text-[13.5px] font-medium text-[#EDEDED]">{PROFILE.email}</div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message on WhatsApp"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#222226] bg-[#0F0F10] text-[#EDEDED]"
            >
              <MessageCircle className="h-[17px] w-[17px]" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#C6F432] text-[#0A0A0A]"
            >
              {copied ? <Check className="h-[17px] w-[17px]" /> : <Copy className="h-[17px] w-[17px]" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
