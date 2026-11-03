import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Shield,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
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

interface CoordinatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: TranslationContent;
  initialService: ServiceType;
  initialRegion: RegionType;
  initialLocation: LocationType;
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
  const [relation, setRelation] = useState<'family' | 'insurance' | 'embassy' | 'legal'>('family');
  const [service, setService] = useState<ServiceType>(initialService);
  const [region, setRegion] = useState<RegionType>(initialRegion);
  const [location, setLocation] = useState<LocationType>(initialLocation);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setService(initialService);
    setRegion(initialRegion);
    setLocation(initialLocation);
  }, [initialService, initialRegion, initialLocation]);

  if (!isOpen) return null;

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (trimmedName.length < 2 || trimmedContact.length < 5) {
      setError(t.modal.validationError);
      return;
    }

    setError('');
    const randomCode = `MNE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(randomCode);
  };

  const buildDirectWhatsAppUrl = () => {
    const serviceLabel = t.estimator.services[service].label;
    const regionLabel = t.estimator.regions[region].label;
    const locationLabel = t.estimator.locations[location].label;
    const relationLabel = t.modal.relations[relation];

    const summary =
      lang === 'RU'
        ? `Здравствуйте, Memorijal d.o.o.\n• Имя: ${name || 'Не указано'}\n• Статус: ${relationLabel}\n• Контакт: ${contact || 'В чате'}\n• Услуга: ${serviceLabel}\n• Направление: ${regionLabel}\n• Город в ЧГ: ${locationLabel}\n• Примечание: ${notes || '-'}`
        : lang === 'MNE'
        ? `Poštovani, Memorijal d.o.o.\n• Ime: ${name || 'Nije navedeno'}\n• Svojstvo: ${relationLabel}\n• Kontakt: ${contact || 'WhatsApp'}\n• Usluga: ${serviceLabel}\n• Region: ${regionLabel}\n• Lokacija u CG: ${locationLabel}\n• Napomena: ${notes || '-'}`
        : `Hello Memorijal d.o.o. Duty Coordinator,\n• Name: ${name || 'Not specified'}\n• Capacity: ${relationLabel}\n• Contact: ${contact || 'Via WhatsApp'}\n• Procedure: ${serviceLabel}\n• Destination: ${regionLabel}\n• Location in MNE: ${locationLabel}\n• Notes: ${notes || '-'}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slateDeep/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl border border-stoneBorder shadow-elevated max-w-2xl w-full overflow-hidden my-8">
        {/* Top Modal Header */}
        <div className="bg-sapphire text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
              <Shield className="w-4 h-4" />
              <span>MEMORIJAL d.o.o. • Tivat / Podgorica</span>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.nameLabel} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.modal.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.contactLabel} *
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.modal.contactPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.relationLabel}
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none"
                  >
                    <option value="family">{t.modal.relations.family}</option>
                    <option value="insurance">{t.modal.relations.insurance}</option>
                    <option value="embassy">{t.modal.relations.embassy}</option>
                    <option value="legal">{t.modal.relations.legal}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.locationLabel}
                  </label>
                  <select
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.serviceLabel}
                  </label>
                  <select
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                    {t.modal.regionLabel}
                  </label>
                  <select
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slateDeep mb-1.5">
                  {t.modal.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.modal.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-porcelain text-sm text-slateDeep focus:bg-white focus:border-sapphire outline-none resize-none"
                />
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
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

