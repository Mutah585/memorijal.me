import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Download,
  MessageCircle,
  Send,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import {
  WHATSAPP_NUMBER,
  OFFICIAL_EMAIL,
  PHONE_DISPLAY,
} from '../i18n/translations';

export interface GopRequestBuilderProps {
  locale: LocaleSlug;
  className?: string;
}

export const GopRequestBuilder: React.FC<GopRequestBuilderProps> = ({
  locale,
  className = '',
}) => {
  const [assistanceCompany, setAssistanceCompany] = useState('');
  const [caseReference, setCaseReference] = useState('');
  const [insuredName, setInsuredName] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('Kotor (Opšta bolnica)');
  const [contactEmail, setContactEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);

  const t = {
    ru: {
      badge: 'B2B Инструмент для ассистанс-компаний и страховых',
      title: 'Генератор гарантийного письма (Guarantee of Payment — GOP)',
      subtitle:
        'Для международных ассистансов (Allianz, AXA, Europ Assistance, Balt и др.). Мгновенное формирование официального письма-запроса на репатриацию с фискализацией EFI.',
      fieldAssistance: 'Ассистанс / Страховая компания:',
      fieldAssistancePlaceholder: 'Например: Allianz Worldwide Care / AXA Partners',
      fieldCaseRef: 'Номер полиса / Референс дела:',
      fieldCaseRefPlaceholder: 'Например: REF-2026-ME-8841',
      fieldInsured: 'ФИО застрахованного / усопшего:',
      fieldInsuredPlaceholder: 'Имя и фамилия (латиницей как в паспорте)',
      fieldHospital: 'Госпиталь / Морг нахождения в Черногории:',
      fieldEmail: 'Email ассистанса для направления EFI-инвойса:',
      fieldEmailPlaceholder: 'claims@assistance-partner.com',
      generateBtn: 'Сформировать официальный GOP-запрос',
      copyBtn: 'Скопировать текст письма',
      downloadBtn: 'Скачать GOP (.txt)',
      whatsappBtn: 'Отправить дежурному координатору в WhatsApp',
      copiedText: 'Скопировано в буфер',
      credentialsTitle: 'Официальные реквизиты исполнителя (Memorijal d.o.o.):',
      reassurance:
        'Memorijal d.o.o. принимает прямые гарантийные письма (GOP) с безналичным расчетом SEPA / SWIFT и фискализацией через Налоговую службу Черногории (QR-код EFI). Родственники освобождены от оплаты.',
    },
    en: {
      badge: 'B2B Tool for Foreign Assistance & Insurers',
      title: 'Guarantee of Payment (GOP) Intake Letter Generator',
      subtitle:
        'For international travel insurers & medical assistance coordinators (Allianz, AXA, Europ Assistance, etc.). Rapid formal GOP dispatch and Montenegro EFI fiscalization compliance.',
      fieldAssistance: 'Assistance / Insurance Carrier:',
      fieldAssistancePlaceholder: 'e.g. Allianz Global Assistance / AXA Assistance',
      fieldCaseRef: 'Policy / Case Reference Number:',
      fieldCaseRefPlaceholder: 'e.g. REF-2026-ME-8841',
      fieldInsured: 'Deceased Insured Name:',
      fieldInsuredPlaceholder: 'Full name as per international passport',
      fieldHospital: 'Hospital / Mortuary Location in Montenegro:',
      fieldEmail: 'Adjuster / Billing Email for EFI Fiscal Invoices:',
      fieldEmailPlaceholder: 'claims@assistance-partner.com',
      generateBtn: 'Generate Formal GOP Letter',
      copyBtn: 'Copy GOP Text',
      downloadBtn: 'Download GOP (.txt)',
      whatsappBtn: 'Send Priority Alert via WhatsApp',
      copiedText: 'Copied to clipboard',
      credentialsTitle: 'Authorized Operating Agency Credentials (Memorijal d.o.o.):',
      reassurance:
        'Memorijal d.o.o. honors formal Guarantee of Payment (GOP) vouchers with SEPA/SWIFT wire billing and verifiable Montenegro EFI QR-code electronic fiscalization. Zero out-of-pocket burden on the family.',
    },
    mne: {
      badge: 'B2B instrument za asistentske i osiguravajuće kuće',
      title: 'Generator garancijskog pisma (Guarantee of Payment — GOP)',
      subtitle:
        'Za inostrane osiguravajuće kuće i asistente. Trenutno formiranje formalnog GOP zahtjeva za repatrijaciju uz potpunu EFI elektronsku fiskalizaciju u Crnoj Gori.',
      fieldAssistance: 'Asistentska / Osiguravajuća kuća:',
      fieldAssistancePlaceholder: 'npr. Allianz Worldwide Care / AXA Assistance',
      fieldCaseRef: 'Broj polise / Referenca predmeta:',
      fieldCaseRefPlaceholder: 'npr. REF-2026-ME-8841',
      fieldInsured: 'Ime i prezime osiguranika / preminulog:',
      fieldInsuredPlaceholder: 'Kao u pasošu (latinicom)',
      fieldHospital: 'Bolnica / Kapela u Crnoj Gori:',
      fieldEmail: 'Email adresa asistenta za slanje EFI računa:',
      fieldEmailPlaceholder: 'claims@assistance-partner.com',
      generateBtn: 'Formiraj formalno GOP pismo',
      copyBtn: 'Kopiraj tekst pisma',
      downloadBtn: 'Preuzmi GOP (.txt)',
      whatsappBtn: 'Pošalji dežurnom koordinatoru na WhatsApp',
      copiedText: 'Kopirano',
      credentialsTitle: 'Zvanični podaci agencije Memorijal d.o.o.:',
      reassurance:
        'Memorijal d.o.o. prihvata formalna pisma o preuzimanju troškova (GOP) uz bezgotovinsko SEPA / SWIFT plaćanje i zakonsku EFI elektronsku fiskalizaciju. Porodica je oslobođena plaćanja na licu mjesta.',
    },
  }[locale];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const dateStr = new Date().toISOString().split('T')[0];
    const letter = `GUARANTEE OF PAYMENT (GOP) / FORMAL REPATRIATION INTAKE
Date: ${dateStr}
TO: Memorijal d.o.o. (Tivat / Podgorica, Montenegro)
Registration (PIB): 03489217 | VAT (PDV): 30/31-20948-4
Sanitary & Operating License: 04-UP-891/24
Dispatch Line 24/7: ${PHONE_DISPLAY} | Email: ${OFFICIAL_EMAIL}

FROM (Assistance / Insurer): ${assistanceCompany || 'International Assistance Provider'}
Case / Claim Reference: ${caseReference || 'PENDING'}
Adjuster Billing Email: ${contactEmail || 'unspecified'}

CASE DETAILS:
Deceased Insured Name: ${insuredName || 'Not specified'}
Location / Mortuary in Montenegro: ${hospitalLocation}

SCOPE OF STATUTORY REQUISITION:
1. Mortuary release & statutory sanitary permit (Sprovodnica) issuance.
2. Certified hermetic zinc coffin soldering (Lemljenje) under Sanitary Inspection.
3. Consular clearance and international transport coordination (IATA Cargo HUM / Road transit).
4. Direct B2B Electronic Fiscalization (EFI QR-coded invoice) and SWIFT/SEPA IBAN settlement.

We hereby confirm that Memorijal d.o.o. is authorized to initiate statutory case clearance under this Guarantee of Payment.`;

    setGeneratedLetter(letter);
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GOP-${caseReference || 'Memorijal'}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `URGENT B2B GOP INTAKE:
Assistance: ${assistanceCompany}
Case Ref: ${caseReference}
Deceased: ${insuredName}
Hospital: ${hospitalLocation}
Billing Email: ${contactEmail}`
  )}`;

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-2">
        <Building2 className="w-4 h-4 text-sapphire shrink-0" />
        <span>{t.badge}</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
        {t.title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slateMuted leading-relaxed max-w-3xl">
        {t.subtitle}
      </p>

      {/* GOP Builder Form */}
      <form onSubmit={handleGenerate} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slateDeep mb-1">
              {t.fieldAssistance}
            </label>
            <input
              type="text"
              required
              value={assistanceCompany}
              onChange={(e) => setAssistanceCompany(e.target.value)}
              placeholder={t.fieldAssistancePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep focus:ring-2 focus:ring-sapphire focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateDeep mb-1">
              {t.fieldCaseRef}
            </label>
            <input
              type="text"
              required
              value={caseReference}
              onChange={(e) => setCaseReference(e.target.value)}
              placeholder={t.fieldCaseRefPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep focus:ring-2 focus:ring-sapphire focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateDeep mb-1">
              {t.fieldInsured}
            </label>
            <input
              type="text"
              required
              value={insuredName}
              onChange={(e) => setInsuredName(e.target.value)}
              placeholder={t.fieldInsuredPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep focus:ring-2 focus:ring-sapphire focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateDeep mb-1">
              {t.fieldHospital}
            </label>
            <select
              value={hospitalLocation}
              onChange={(e) => setHospitalLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep bg-white focus:ring-2 focus:ring-sapphire focus:outline-none"
            >
              <option value="Kotor (Opšta bolnica)">Kotor (Opšta bolnica Kotor)</option>
              <option value="Podgorica (KCCG Forensic & Clinical)">Podgorica (KCCG Clinical Center)</option>
              <option value="Bar (Opšta bolnica Bar)">Bar (Opšta bolnica Bar)</option>
              <option value="Herceg Novi (Meljine)">Herceg Novi (Bolnica Meljine)</option>
              <option value="Berane (KBC Berane)">Berane (KBC Berane)</option>
              <option value="Nikšić (Opšta bolnica)">Nikšić (Opšta bolnica Nikšić)</option>
              <option value="Cetinje (Danilo I)">Cetinje (Bolnica Danilo I)</option>
              <option value="Hotel / Residence Private Location">Hotel / Residence Private Location</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slateDeep mb-1">
            {t.fieldEmail}
          </label>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder={t.fieldEmailPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep focus:ring-2 focus:ring-sapphire focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sapphire hover:bg-sapphire-light text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>{t.generateBtn}</span>
        </button>
      </form>

      {/* Generated Output Preview */}
      {generatedLetter && (
        <div className="mt-6 pt-6 border-t border-stoneBorder space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-sapphire uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>GOP Intake Document Ready</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stoneBorder bg-white text-slateDeep hover:bg-porcelain text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-forest" />
                    <span>{t.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.copyBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stoneBorder bg-white text-slateDeep hover:bg-porcelain text-xs font-medium transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.downloadBtn}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
            {generatedLetter}
          </pre>

          {/* Direct Alert Dispatch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 text-xs text-emerald-950 font-medium">
              <Send className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {locale === 'ru'
                  ? 'Мгновенное уведомление дежурной диспетчерской службы:'
                  : locale === 'mne'
                  ? 'Hitno obavještenje dežurne dispečerske službe:'
                  : 'Immediate dispatch to duty coordinator:'}
              </span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-forest hover:bg-forest-hover text-white shadow-xs transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>
        </div>
      )}

      {/* Institutional reassurance */}
      <div className="mt-6 pt-4 border-t border-stoneBorder/60 flex items-start gap-2.5 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-sapphire shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.reassurance}</p>
      </div>
    </div>
  );
};
