import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { OFFICIAL_EMAIL, PHONE_DISPLAY } from '../i18n/translations';

export interface PoaDrafterProps {
  locale: LocaleSlug;
  className?: string;
}

type NotaryJurisdiction = 'de' | 'uk' | 'ru' | 'ua' | 'fr' | 'rs' | 'eu';

export const PoaDrafter: React.FC<PoaDrafterProps> = ({
  locale,
  className = '',
}) => {
  const [deceasedName, setDeceasedName] = useState('Alexander Smith');
  const [principalName, setPrincipalName] = useState('Elena Smith');
  const [relationship, setRelationship] = useState('Spouse / Супруга');
  const [jurisdiction, setJurisdiction] = useState<NotaryJurisdiction>(
    locale === 'ru' ? 'ru' : locale === 'mne' ? 'rs' : 'de'
  );
  const [copied, setCopied] = useState(false);

  const t = {
    ru: {
      badge: 'Генератор уставной доверенности (Punomoćje)',
      title: 'Интерактивный конструктор двуязычной доверенности для нотариуса',
      subtitle:
        'Сформируйте юридически выверенный проект доверенности на двух языках (черногорский + язык вашей юрисдикции). Документ заверяется у любого местного нотариуса за 10–15 минут.',
      deceasedLabel: 'ФИО усопшего (латиницей как в загранпаспорте):',
      deceasedPlaceholder: 'Например: ALEXANDER SMITH',
      principalLabel: 'ФИО родственника-заявителя:',
      principalPlaceholder: 'Например: ELENA SMITH',
      relationLabel: 'Степень родства:',
      relationPlaceholder: 'Супруг(а), сын, дочь, родитель',
      jurisdictionLabel: 'Юрисдикция нотариального заверения:',
      btnSample: 'Заполнить пример',
      btnPrint: 'Печать / Сохранить в PDF',
      btnCopy: 'Скопировать текст',
      copySuccess: 'Текст скопирован в буфер',
      mneColTitle: 'Текст на черногорском языке (Zvanični tekst):',
      transColTitle: 'Официальный перевод (Перевод для нотариуса):',
      agencyHeader: 'Уполномоченное лицензированное агентство в Черногории:',
      legalNotice:
        'Проект содержит обязательные ссылки на Закон о здравоохранении Черногории (Zakon o zdravstvenoj zaštiti) и регламент санитарной инспекции для получения Sprovodnica. Документ признается нотариусами стран Гаагской конвенции.',
    },
    en: {
      badge: 'Statutory Power of Attorney Generator (Punomoćje)',
      title: 'Interactive Bilingual Power of Attorney Drafter for Foreign Notaries',
      subtitle:
        'Generate a legally compliant, side-by-side bilingual draft (Montenegrin + English/German/French) for your local notary public. Authorized representation for swift mortuary & transit clearance.',
      deceasedLabel: 'Deceased Full Name (as in International Passport):',
      deceasedPlaceholder: 'e.g. ALEXANDER SMITH',
      principalLabel: 'Authorizing Family Member (Principal):',
      principalPlaceholder: 'e.g. ELENA SMITH',
      relationLabel: 'Relationship to Deceased:',
      relationPlaceholder: 'Spouse, Son, Daughter, Next of Kin',
      jurisdictionLabel: 'Notary Signing Jurisdiction:',
      btnSample: 'Load Sample Data',
      btnPrint: 'Print / Save as PDF',
      btnCopy: 'Copy Bilingual Text',
      copySuccess: 'Text copied to clipboard',
      mneColTitle: 'Official Montenegrin Text (Zvanični tekst):',
      transColTitle: 'Certified Translation (For Notary Public):',
      agencyHeader: 'Authorized Case Coordination Agency in Montenegro:',
      legalNotice:
        'This statutory draft explicitly cites the Montenegrin Healthcare Law (Zakon o zdravstvenoj zaštiti) and Sanitary Inspection requirements for cross-border transit permit (Sprovodnica). Compliant with Hague Apostille Convention standards.',
    },
    mne: {
      badge: 'Generator zakonskog punomoćja (Punomoćje)',
      title: 'Interaktivni sastavljač dvojezičnog punomoćja za notara',
      subtitle:
        'Kreirajte pravno usklađen nacrt punomoćja na crnogorskom i stranom jeziku za overu kod lokalnog notara u inostranstvu radi preuzimanja dokumentacije i sprovodnice.',
      deceasedLabel: 'Ime i prezime preminulog (kao u pasošu):',
      deceasedPlaceholder: 'npr. ALEXANDER SMITH',
      principalLabel: 'Ime i prezime nalogodavca (srodnika):',
      principalPlaceholder: 'npr. ELENA SMITH',
      relationLabel: 'Srodstvo sa preminulim:',
      relationPlaceholder: 'Suprug/a, sin, kćerka, roditelj',
      jurisdictionLabel: 'Nadležnost notara za overu:',
      btnSample: 'Učitaj primjer',
      btnPrint: 'Štampaj / Snimi u PDF',
      btnCopy: 'Kopiraj dvojezični tekst',
      copySuccess: 'Tekst uspješno kopiran',
      mneColTitle: 'Zvanični tekst na crnogorskom jeziku:',
      transColTitle: 'Prevod za inostranog notara:',
      agencyHeader: 'Ovlašćena agencija za koordinaciju u Crnoj Gori:',
      legalNotice:
        'Nacrt sadrži precizna ovlašćenja prema Zakonu o zdravstvenoj zaštiti Crne Gore za izdavanje Sprovodnice i zastupanje pred sanitarnom inspekcijom i diplomatskim misijama.',
    },
  }[locale];

  const loadSample = () => {
    setDeceasedName('ALEXANDER SMITH');
    setPrincipalName('ELENA SMITH');
    setRelationship(
      locale === 'ru'
        ? 'Супруга (Spouse)'
        : locale === 'mne'
        ? 'Supruga (Spouse)'
        : 'Spouse / Next of Kin'
    );
  };

  // Generate Montenegrin legal text
  const mneText = `P U N O M O Ć J E

Ja, dolje potpisani/a ${principalName || '[IME I PREZIME NALOGODAVCA]'}, u svojstvu: ${
    relationship || '[SRODSTVO]'
  }, ovim putem neopozivo

O V L A Š Ć U J E M

Preduzeće "MEMORIJAL D.O.O." Podgorica (PIB: 03456789), sa sjedištem u Podgorici, Crna Gora, odnosno njegove ovlašćene koordinatore, da u moje ime i za račun porodice preduzmu sve pravne, administrativne i sanitarne radnje u vezi sa preminulim:

Ime i prezime preminulog: ${deceasedName || '[IME PREMINULOG LICA]'}

Ovlašćenje obuhvata:
1. Prijavu činjenice smrti i preuzimanje Ljekarske potvrde o smrti (Potvrda o smrti) u nadležnoj zdravstvenoj ustanovi (KBC Podgorica, Opšta bolnica Kotor, ili druga ustanova).
2. Zastupanje pred Matičnom službom (Sekretarijat za lokalnu samoupravu) radi upisa u Matičnu knjigu umrlih i preuzimanja međunarodnog Izvoda iz MKU (Bečka konvencija 1976).
3. Podnošenje zahtjeva i zastupanje pred Sanitarnom inspekcijom Crne Gore radi dobijanja Sprovodnice za prenos posmrtnih ostataka u inostranstvo.
4. Nadzor nad postupkom lemljenja hermetičkog cinkovog sanduka u skladu sa međunarodnim standardima.
5. Zastupanje pred diplomatsko-konzularnim predstavništvom u Podgorici radi pribavljanja konzularne sprovodnice / saglasnosti.
6. Organizaciju carinskih formalnosti i predaju posmrtnih ostataka licenciranom međunarodnom prevozniku ili kargo službi aerodroma (TGD/TIV).

U __________________, dana ____________ 2026. godine.

Davalac punomoćja: __________________________`;

  // Generate translated text (Russian or English depending on selected jurisdiction)
  const isRussian = jurisdiction === 'ru' || jurisdiction === 'ua' || (locale === 'ru' && jurisdiction !== 'de' && jurisdiction !== 'uk' && jurisdiction !== 'fr');

  const transText = isRussian
    ? `Д О В Е Р Е Н Н О С Т Ь

Я, нижеподписавшийся(-аяся) ${principalName || '[ФИО ДОВЕРИТЕЛЯ]'}, в качестве: ${
        relationship || '[СТЕПЕНЬ РОДСТВА]'
      }, настоящим безотзывно

У П О Л Н О М О Ч И В А Ю

Компанию "MEMORIJAL D.O.O." Подгорица (Черногория, рег. № 03456789), а также её уполномоченных координаторов, совершать от моего имени и в интересах семьи все юридические, административные и санитарные действия в отношении умершего:

ФИО умершего: ${deceasedName || '[ФИО УМЕРШЕГО ЛАТИНИЦЕЙ]'}

Полномочия включают:
1. Получение Врачебного свидетельства о смерти (Potvrda o smrti) в медицинском учреждении (KCCG Подгорица, больница Котора и др.).
2. Регистрацию смерти в органах ЗАГС Черногории (Matična služba) и получение Международного свидетельства о смерти (Form C, Венская конвенция).
3. Представительство в Санитарной инспекции Черногории для получения разрешения на международный вывоз (Sprovodnica).
4. Контроль герметичной запайки цинкового саркофага под надзором санитарного инспектора.
5. Представительство в консульском отделе посольства в Подгорице для оформления консульских пропусков и аннулирования паспорта.
6. Оформление таможенных деклараций и передачу аккредитованному международному перевозчику или грузовому терминалу аэропорта (TGD/TIV).

Место: __________________, дата: ____________ 2026 г.

Доверитель: __________________________`
    : `P O W E R  O F  A T T O R N E Y

I, the undersigned ${principalName || '[FULL NAME OF PRINCIPAL]'}, acting in the capacity of: ${
        relationship || '[RELATIONSHIP]'
      }, hereby irrevocably

A P P O I N T  A N D  A U T H O R I Z E

"MEMORIJAL D.O.O." Podgorica (Reg. No: 03456789), registered in Podgorica, Montenegro, and its statutory case coordinators, to perform on my behalf and on behalf of the bereaved family all legal, administrative, and sanitary proceedings regarding the deceased:

Full Name of Deceased: ${deceasedName || '[DECEASED FULL NAME]'}

Scope of Authority includes:
1. Requesting and collecting the official Medical Certificate of Cause of Death (Potvrda o smrti) from the attending hospital or forensic institute (KCCG Podgorica, Kotor General Hospital, etc.).
2. Representing before the Municipal Civil Registry (Matična služba) to register the vital record and procure the Multilingual Death Extract (Vienna Convention 1976 Form C).
3. Filing statutory petitions with the Sanitary Inspection of Montenegro to obtain the cross-border Mortuary Transit Passport (Sprovodnica).
4. Supervising statutory zinc hermetic sealing and official certification by the state sanitary inspector.
5. Representing before the designated Consular Mission in Podgorica for consular clearance, Leichenpass, or Letter of No Objection.
6. Completing customs clearance and handing over to accredited licensed carriers or air cargo handlers at Podgorica (TGD) or Tivat (TIV) airports.

Executed at: __________________, Date: ____________ 2026.

Principal: __________________________`;

  const handleCopy = () => {
    const fullContent = `${mneText}\n\n========================================\n${transText}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.badge}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={loadSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stoneBorder bg-porcelain text-slate-700 hover:bg-stone-200 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.btnSample}</span>
        </button>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-alabaster border border-stoneBorder text-xs">
        <div>
          <label className="block font-semibold text-slateDeep mb-1">
            {t.deceasedLabel}
          </label>
          <input
            type="text"
            value={deceasedName}
            onChange={(e) => setDeceasedName(e.target.value)}
            placeholder={t.deceasedPlaceholder}
            className="w-full px-3 py-2 rounded-lg border border-stoneBorder bg-white text-slateDeep font-mono font-medium focus:outline-none focus:ring-1 focus:ring-sapphire"
          />
        </div>

        <div>
          <label className="block font-semibold text-slateDeep mb-1">
            {t.principalLabel}
          </label>
          <input
            type="text"
            value={principalName}
            onChange={(e) => setPrincipalName(e.target.value)}
            placeholder={t.principalPlaceholder}
            className="w-full px-3 py-2 rounded-lg border border-stoneBorder bg-white text-slateDeep font-medium focus:outline-none focus:ring-1 focus:ring-sapphire"
          />
        </div>

        <div>
          <label className="block font-semibold text-slateDeep mb-1">
            {t.relationLabel}
          </label>
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder={t.relationPlaceholder}
            className="w-full px-3 py-2 rounded-lg border border-stoneBorder bg-white text-slateDeep font-medium focus:outline-none focus:ring-1 focus:ring-sapphire"
          />
        </div>

        <div>
          <label className="block font-semibold text-slateDeep mb-1">
            {t.jurisdictionLabel}
          </label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value as NotaryJurisdiction)}
            className="w-full px-3 py-2 rounded-lg border border-stoneBorder bg-white text-slateDeep font-medium focus:outline-none focus:ring-1 focus:ring-sapphire cursor-pointer"
          >
            <option value="de">Германия / Germany (DE Notar)</option>
            <option value="uk">Великобритания / UK (Notary Public)</option>
            <option value="ru">Россия / РФ (Нотариус РФ)</option>
            <option value="ua">Украина / Ukraine (Нотаріус)</option>
            <option value="rs">Сербия / Serbia (Javni beležnik)</option>
            <option value="fr">Франция / France (Notaire)</option>
            <option value="eu">Другие страны ЕС / Other EU</option>
          </select>
        </div>
      </div>

      {/* Bilingual Side-by-Side Output Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Montenegrin Statutory Text */}
        <div className="p-5 rounded-xl border border-stoneBorder bg-porcelain/40 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-stoneBorder pb-2">
            <span className="text-xs font-bold text-sapphire uppercase tracking-wider">
              {t.mneColTitle}
            </span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Crnogorski (MNE)
            </span>
          </div>

          <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed select-all bg-white p-4 rounded-lg border border-stoneBorder/80 overflow-x-auto max-h-[380px]">
            {mneText}
          </pre>
        </div>

        {/* Right: Translated Column */}
        <div className="p-5 rounded-xl border border-stoneBorder bg-porcelain/40 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-stoneBorder pb-2">
            <span className="text-xs font-bold text-sapphire uppercase tracking-wider">
              {t.transColTitle}
            </span>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sapphire/10 text-sapphire">
              {isRussian ? 'Русский (RU)' : 'English (EN)'}
            </span>
          </div>

          <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed select-all bg-white p-4 rounded-lg border border-stoneBorder/80 overflow-x-auto max-h-[380px]">
            {transText}
          </pre>
        </div>
      </div>

      {/* Institutional Legal Guarantee Box */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-semibold text-emerald-900">
            {t.agencyHeader} Memorijal d.o.o. Podgorica
          </strong>
          <p className="text-emerald-800 text-[11px] leading-relaxed">
            {t.legalNotice}
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-500 font-medium">
          Hotline: <span className="font-semibold text-slateDeep">{PHONE_DISPLAY}</span> • Email: <span className="font-semibold text-slateDeep">{OFFICIAL_EMAIL}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stoneBorder hover:bg-porcelain text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{t.copySuccess}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{t.btnCopy}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.btnPrint}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
