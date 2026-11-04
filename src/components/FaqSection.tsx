import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { FAQItem, LocaleSlug } from '../data/seo-routes';
import { WHATSAPP_NUMBER } from '../i18n/translations';

interface FaqSectionProps {
  heading: string;
  faqs: FAQItem[];
  locale: LocaleSlug;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ heading, faqs, locale }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const searchPlaceholder =
    locale === 'ru'
      ? 'Поиск по вопросам (паспорт, сроки, цинк, морг, стоимость)...'
      : locale === 'mne'
      ? 'Pretraga pitanja (pasoš, rokovi, cink, kapela, cijena)...'
      : 'Search questions (passport, zinc, mortuary, costs, timeline)...';

  const noResultsPrompt =
    locale === 'ru'
      ? 'Не нашли ответ на ваш вопрос? Напишите координатору в WhatsApp — ответим за 5 минут.'
      : locale === 'mne'
      ? 'Niste pronašli odgovor? Pišite koordinatoru na WhatsApp — odgovaramo za 5 minuta.'
      : "Couldn't find what you need? Message our 24/7 coordinator on WhatsApp — 5-minute reply.";

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    locale === 'ru'
      ? 'Здравствуйте! У меня есть вопрос по процедуре репатриации / кремации в Черногории.'
      : locale === 'mne'
      ? 'Poštovani, imam pitanje u vezi sa procedurom repatrijacije / kremacije u Crnoj Gori.'
      : 'Hello! I have a question regarding international repatriation / cremation in Montenegro.'
  )}`;

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-14 sm:py-20 bg-porcelain border-b border-stoneBorder">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep text-center">
          {heading}
        </h2>

        {/* Real-time FAQ Search Bar */}
        <div className="mt-6 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stoneBorder bg-white text-xs sm:text-sm text-slateDeep placeholder:text-slate-400 focus:bg-white focus:border-sapphire outline-none shadow-xs transition-colors"
              aria-label={searchPlaceholder}
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stoneBorder shadow-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-alabaster/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-semibold text-slateDeep">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sapphire shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slateMuted leading-relaxed border-t border-stoneBorder/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-6 rounded-2xl bg-white border border-stoneBorder text-center space-y-3 shadow-xs">
              <p className="text-xs sm:text-sm text-slateMuted">
                {noResultsPrompt}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp 24/7</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
