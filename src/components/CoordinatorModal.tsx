import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Shield,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
} from 'lucide-react';
import {
  Language,
  ServiceType,
  RegionType,
  LocationType,
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { sanitizeUserText } from '../utils/security';

interface CoordinatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: TranslationContent;
  initialService: ServiceType;
  initialRegion: RegionType;
  initialLocation: LocationType;
}

type RelationType = 'family' | 'insurance' | 'embassy' | 'legal';

const SESSION_STORAGE_KEY = 'memorijal_modal_draft';

interface FormDraft {
  name: string;
  contact: string;
  relation: RelationType;
  service: ServiceType;
  region: RegionType;
  location: LocationType;
  notes: string;
}

export const CoordinatorModal: React.FC<CoordinatorModalProps> = ({
  isOpen,
  onClose,
  lang,
  t,
  initialService,
  initialRegion,
  initialLocation,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [relation, setRelation] = useState<RelationType>('family');
  const [service, setService] = useState<ServiceType>(initialService);
  const [region, setRegion] = useState<RegionType>(initialRegion);
  const [location, setLocation] = useState<LocationType>(initialLocation);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Restore draft from sessionStorage on initial mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed: Partial<FormDraft> = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.contact) setContact(parsed.contact);
        if (parsed.relation) setRelation(parsed.relation);
        if (parsed.service) setService(parsed.service);
        if (parsed.region) setRegion(parsed.region);
        if (parsed.location) setLocation(parsed.location);
        if (parsed.notes) setNotes(parsed.notes);
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
  }, []);

  // Update selection when initial props change, unless draft exists
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) {
      setService(initialService);
      setRegion(initialRegion);
      setLocation(initialLocation);
    }
  }, [initialService, initialRegion, initialLocation]);

  // Persist draft changes to sessionStorage
  useEffect(() => {
    try {
      const draft: FormDraft = {
        name,
        contact,
        relation,
        service,
        region,
        location,
        notes,
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore quota errors
    }
  }, [name, contact, relation, service, region, location, notes]);

  const hasDraft = Boolean(name.trim() || contact.trim() || notes.trim());
  const isLocalNumberWithoutCode = contact.trim().startsWith('0');

  const contactHelperNote =
    lang === 'RU'
      ? 'Пожалуйста, укажите код страны (например, +44, +49, +382, +7)'
      : lang === 'MNE'
      ? 'Molimo navedite međunarodni pozivni broj (npr. +382, +381)'
      : 'Please include international country code (e.g. +44, +49, +382)';

  const contactPlaceholder = '+44 7911 123456 / +7 999 123-45-67';

  const handleClearDraft = () => {
    setName('');
    setContact('');
    setNotes('');
    setRelation('family');
    setService(initialService);
    setRegion(initialRegion);
    setLocation(initialLocation);
    setError('');
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = sanitizeUserText(name, 80).trim();
    const trimmedContact = sanitizeUserText(contact, 80).trim();

    if (trimmedName.length < 2 || trimmedContact.length < 5) {
      setError(t.modal.validationError);
      return;
    }

    setName(trimmedName);
    setContact(trimmedContact);
    setNotes((prev) => sanitizeUserText(prev, 500));
    setError('');
    const randomCode = `MNE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(randomCode);

    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const getWhatsAppMessageText = () => {
    const serviceLabel = t.estimator.services[service].label;
    const regionLabel = t.estimator.regions[region].label;
    const locationLabel = t.estimator.locations[location].label;
    const relationLabel = t.modal.relations[relation];
    const currentPrice = t.estimator.matrix[service][region].priceRange.toLowerCase();

    const safeName = sanitizeUserText(name, 80).trim();
    const safeContact = sanitizeUserText(contact, 80).trim();
    const safeNotes = sanitizeUserText(notes, 500).trim();

    return lang === 'RU'
      ? `Здравствуйте, Memorijal d.o.o.! Меня интересует репатриация (${regionLabel}), начальная оценка ${currentPrice}.\n• Имя: ${safeName || 'Не указано'}\n• Статус: ${relationLabel}\n• Контакт: ${safeContact || 'В чате'}\n• Услуга: ${serviceLabel}\n• Город в ЧГ: ${locationLabel}\n• Примечание: ${safeNotes || '-'}`
      : lang === 'MNE'
      ? `Poštovani Memorijal d.o.o., interesuje me repatrijacija za ${regionLabel}, početna procjena ${currentPrice}.\n• Ime: ${safeName || 'Nije navedeno'}\n• Svojstvo: ${relationLabel}\n• Kontakt: ${safeContact || 'WhatsApp'}\n• Usluga: ${serviceLabel}\n• Lokacija u CG: ${locationLabel}\n• Napomena: ${safeNotes || '-'}`
      : `Hello Memorijal d.o.o. Duty Coordinator, I am inquiring about repatriation to ${regionLabel}, starting estimate ${currentPrice}.\n• Name: ${safeName || 'Not specified'}\n• Capacity: ${relationLabel}\n• Contact: ${safeContact || 'Via WhatsApp'}\n• Procedure: ${serviceLabel}\n• Location in MNE: ${locationLabel}\n• Notes: ${safeNotes || '-'}`;
  };

  const buildDirectWhatsAppUrl = () => {
    const summary = getWhatsAppMessageText();
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setError('');
    onClose();
  };

  const handleBackdropClick = () => {
    // If the user has started filling out the form, do not accidentally dismiss via backdrop
    if (hasDraft) return;
    handleResetAndClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slateDeep/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl border border-stoneBorder shadow-elevated max-w-2xl w-full overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="bg-sapphire text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
              <Shield className="w-4 h-4" />
              <span>
                {lang === 'RU'
                  ? 'MEMORIJAL d.o.o. • Тиват / Подгорица'
                  : 'MEMORIJAL d.o.o. • Tivat / Podgorica'}
              </span>
            </div>
            <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              {t.modal.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={t.modal.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Urgent Direct Call Banner */}
        <div className="bg-forest-subtle border-b border-forest/20 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slateDeep">
          <span className="font-medium">{t.modal.urgentNotice}</span>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 font-bold text-forest hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submittedRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-full bg-forest-subtle text-forest mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slateDeep">
                {t.modal.successTitle}
              </h3>
              <p className="text-sm sm:text-base text-slateMuted max-w-lg mx-auto leading-relaxed">
                {t.modal.successMessage}
              </p>
              <div className="inline-block bg-alabaster px-4 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm">
                <span className="text-slateMuted mr-2">{t.modal.referenceLabel}</span>
                <span className="font-mono font-bold text-sapphire">{submittedRef}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={buildDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.modal.whatsappRedirectBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-alabaster hover:bg-stoneBorder/60 text-slateDeep font-semibold px-6 py-3 rounded-xl text-sm border border-stoneBorder transition-colors"
                >
                  {t.modal.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={validateAndSubmit} className="space-y-4" noValidate>
              <p className="text-xs sm:text-sm text-slateMuted leading-relaxed mb-2">
                {t.modal.subtitle}
              </p>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.nameLabel} *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    maxLength={80}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(sanitizeUserText(e.target.value, 80))}
                    placeholder={t.modal.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-contact"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.contactLabel} *
                  </label>
                  <input
                    id="modal-contact"
                    type="text"
                    maxLength={80}
                    autoComplete="tel"
                    value={contact}
                    onChange={(e) => setContact(sanitizeUserText(e.target.value, 80))}
                    placeholder={contactPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-porcelain text-sm text-slateDeep focus:bg-white outline-none transition-colors ${
                      isLocalNumberWithoutCode
                        ? 'border-amber-400 focus:border-amber-500'
                        : 'border-stoneBorder focus:border-sapphire'
                    }`}
                    required
                  />
                  {isLocalNumberWithoutCode && (
                    <p className="mt-1.5 text-[11px] text-amber-700 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{contactHelperNote}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-relation"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.relationLabel}
                  </label>
                  <select
                    id="modal-relation"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value as RelationType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                  >
                    <option value="family">{t.modal.relations.family}</option>
                    <option value="insurance">{t.modal.relations.insurance}</option>
                    <option value="embassy">{t.modal.relations.embassy}</option>
                    <option value="legal">{t.modal.relations.legal}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-location"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.locationLabel}
                  </label>
                  <select
                    id="modal-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value as LocationType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                  >
                    <option value="boka">{t.estimator.locations.boka.label}</option>
                    <option value="podgorica">{t.estimator.locations.podgorica.label}</option>
                    <option value="coast_south">{t.estimator.locations.coast_south.label}</option>
                    <option value="north">{t.estimator.locations.north.label}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-service"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.serviceLabel}
                  </label>
                  <select
                    id="modal-service"
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                  >
                    <option value="cremation">{t.estimator.services.cremation.label}</option>
                    <option value="air_cargo">{t.estimator.services.air_cargo.label}</option>
                    <option value="road_transport">{t.estimator.services.road_transport.label}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-region"
                    className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                  >
                    {t.modal.regionLabel}
                  </label>
                  <select
                    id="modal-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value as RegionType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                  >
                    <option value="balkans">{t.estimator.regions.balkans.label}</option>
                    <option value="eu_uk">{t.estimator.regions.eu_uk.label}</option>
                    <option value="cis_east">{t.estimator.regions.cis_east.label}</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5"
                >
                  {t.modal.notesLabel}
                </label>
                <textarea
                  id="modal-notes"
                  rows={3}
                  maxLength={500}
                  value={notes}
                  onChange={(e) => setNotes(sanitizeUserText(e.target.value, 500))}
                  placeholder={t.modal.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none resize-none"
                />
              </div>

              {/* WhatsApp Live Preview Container */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'RU'
                      ? 'Текст сообщения для WhatsApp (сформирован автоматически):'
                      : lang === 'MNE'
                      ? 'Pregled poruke za WhatsApp:'
                      : 'Generated WhatsApp message preview:'}
                  </span>
                </div>
                <div className="font-mono text-[11px] whitespace-pre-wrap bg-white/80 border border-slate-200/60 rounded-lg p-2.5 text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                  {getWhatsAppMessageText()}
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  {lang === 'RU'
                    ? 'Вы сможете отредактировать или дополнить этот текст в WhatsApp перед отправкой.'
                    : lang === 'MNE'
                    ? 'Tekst možete pregledati i izmijeniti u WhatsApp-u prije slanja.'
                    : 'You will be able to review or edit this text directly in WhatsApp before sending.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-3.5 px-6 rounded-xl shadow-sm transition-colors text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.modal.submitBtn}</span>
                </button>

                <a
                  href={buildDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 px-5 rounded-xl shadow-sm transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.modal.whatsappRedirectBtn}</span>
                </a>

                {hasDraft && (
                  <button
                    type="button"
                    onClick={handleClearDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 px-3 py-2 transition-colors border border-transparent hover:border-rose-200 rounded-lg"
                    title={
                      lang === 'RU'
                        ? 'Очистить черновик формы'
                        : lang === 'MNE'
                        ? 'Obriši nacrt forme'
                        : 'Clear form draft'
                    }
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'RU'
                        ? 'Очистить форму'
                        : lang === 'MNE'
                        ? 'Obriši formu'
                        : 'Clear draft'}
                    </span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

