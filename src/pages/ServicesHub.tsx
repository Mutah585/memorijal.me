import React from 'react';
import {
  Shield,
  Plane,
  Truck,
  Flame,
  Landmark,
  Anchor,
  FileCheck,
  Building2,
  HeartHandshake,
  Home,
  Car,
  Heart,
  Lock,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Phone,
  MessageCircle,
} from 'lucide-react';
import {
  LocaleSlug,
  SeoRouteEntry,
  buildLocalizedPath,
} from '../data/seo-routes';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { LEGAL_CREDENTIALS } from '../config/legalCredentials';
import { ExpatEstateServices } from '../components/ExpatEstateServices';
import { FaqSection } from '../components/FaqSection';

interface ServicesHubProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  onNavigate: (localizedPath: string) => void;
  onOpenModal: () => void;
}

interface ServiceCardItem {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: Record<LocaleSlug, string>;
  rate: Record<LocaleSlug, string>;
  desc: Record<LocaleSlug, string>;
  targetPath?: string;
}

interface ServiceTier {
  badge: Record<LocaleSlug, string>;
  heading: Record<LocaleSlug, string>;
  subtitle: Record<LocaleSlug, string>;
  items: ServiceCardItem[];
}

const SERVICE_TIERS: ServiceTier[] = [
  {
    badge: {
      en: 'Tier 1 • Core Repatriation & Memorial (5 Services)',
      ru: 'Уровень 1 • Базовая репатриация и захоронение (5 услуг)',
      mne: 'Nivo 1 • Osnovna repatrijacija i sahrana (5 usluga)',
    },
    heading: {
      en: 'International Repatriation, Cremation & Municipal Burials',
      ru: 'Международная репатриация, кремация в Сербии и местные похороны',
      mne: 'Međunarodna repatrijacija, kremacija i lokalne sahrane',
    },
    subtitle: {
      en: 'Physical transport, zinc soldering, and grave interment are performed by accredited licensed partner carriers and municipal Komunalno enterprises under Memorijal d.o.o. case supervision.',
      ru: 'Физическая перевозка, пайка цинка и работы на кладбище выполняются лицензированными партнерами-перевозчиками и муниципальными службами Komunalno под контролем Memorijal d.o.o.',
      mne: 'Fizički transport, lemljenje cinka i sahranjivanje obavljaju licencirani partneri i opštinska Komunalna preduzeća pod nadzorom Memorijal d.o.o.',
    },
    items: [
      {
        num: '01',
        icon: Flame,
        title: {
          en: 'Turnkey Cremation in Serbia (Belgrade / Novi Sad)',
          ru: 'Кремация в Сербии (Белград / Нови-Сад) под ключ',
          mne: 'Kremacija u Srbiji (Beograd / Novi Sad)',
        },
        rate: { en: 'From €1,850', ru: 'От 1 850 €', mne: 'Od 1.850 €' },
        desc: {
          en: 'Cross-border transfer to the state crematorium, bilateral Sprovodnica permits, priority cremation slot, and sealed urn return in 3–5 business days.',
          ru: 'Перевозка в госкрематорий Сербии, санитарная Спроводница, приоритетный слот кремации и возврат опломбированной урны за 3–5 дней.',
          mne: 'Prevoz do državnog krematorijuma, sanitarna Sprovodnica, prioritetni termin kremacije i povrat zapečaćene urne za 3–5 dana.',
        },
        targetPath: '/services/cremation-serbia/',
      },
      {
        num: '02',
        icon: Plane,
        title: {
          en: 'International Air Cargo Repatriation (IATA Cargo HUM)',
          ru: 'Авиарепатриация (IATA Cargo HUM / Груз 200)',
          mne: 'Međunarodni avio-transport (IATA Cargo HUM)',
        },
        rate: { en: 'From €4,500', ru: 'От 4 500 €', mne: 'Od 4.500 €' },
        desc: {
          en: 'Priority MAWB air freight coordination from Podgorica (TGD) and Tivat (TIV), hermetic zinc sealing supervision, and destination customs handover.',
          ru: 'Приоритетная авиаотправка из Подгорицы (TGD) и Тивата (TIV), контроль опайки цинка, накладная MAWB и таможенное оформление.',
          mne: 'Prioritetni avio-kargo iz Podgorice (TGD) i Tivta (TIV), nadzor lemljenja cinka, MAWB i carinska procedura.',
        },
        targetPath: '/services/repatriation-air-cargo/',
      },
      {
        num: '03',
        icon: Truck,
        title: {
          en: 'Regional & European Road Repatriation',
          ru: 'Авторепатриация спецтранспортом (Балканы / ЕС / СНГ)',
          mne: 'Drumska repatrijacija (Region / EU)',
        },
        rate: {
          en: 'From €2,400 (Region) / From €3,800 (EU)',
          ru: 'От 2 400 € (Балканы) / От 3 800 € (ЕС)',
          mne: 'Od 2.400 € (Region) / Od 3.800 € (EU)',
        },
        desc: {
          en: 'Door-to-door refrigerated mortuary transport via accredited licensed partner carriers across Serbia, Croatia, Bosnia, Germany, Austria, Italy, and Ukraine.',
          ru: 'Прямая доставка лицензированным рефрижераторным катафалком партнера без перегрузок в Сербию, страны ЕС и Украину.',
          mne: 'Direktan prevoz specijalizovanim vozilom licenciranog partnera do Srbije, Hrvatske, BiH, Njemačke, Austrije i EU.',
        },
        targetPath: '/services/repatriation-road/',
      },
      {
        num: '04',
        icon: Landmark,
        title: {
          en: 'Local Municipal Burial Coordination in Montenegro (DOO Komunalno)',
          ru: 'Координация местных похорон в Черногории (DOO Komunalno)',
          mne: 'Koordinacija lokalne sahrane u Crnoj Gori (DOO Komunalno)',
        },
        rate: {
          en: 'From\u00A0€850',
          ru: 'От\u00A0850\u00A0€',
          mne: 'Od\u00A0850\u00A0€',
        },
        desc: {
          en: 'Full representation with municipal DOO Komunalno utilities (Tivat, Kotor, Budva, Podgorica), Matičar registry, and Orthodox, Catholic, Islamic, or civil rites.',
          ru: 'Представительство в муниципальных службах DOO Komunalno (Тиват, Котор, Будва, Подгорица), ЗАГСе и организация обрядов любой конфессии.',
          mne: 'Zastupanje pred opštinskim DOO Komunalno preduzećima, Matičnom službom i organizacija vjerskih ili građanskih obreda.',
        },
        targetPath: '/services/local-burial-coordination/',
      },
      {
        num: '05',
        icon: Anchor,
        title: {
          en: 'Boka Bay Sea Ash Scattering Ceremony (Yacht Charter & Eco-Floristry)',
          ru: 'Морская церемония развеивания праха в Боке (фрахт яхты и эко-флористика)',
          mne: 'Ceremonija prosipanja pepela u Boki (najam jahte i eko-floristika)',
        },
        rate: {
          en: 'From\u00A0€950',
          ru: 'От\u00A0950\u00A0€',
          mne: 'Od\u00A0950\u00A0€',
        },
        desc: {
          en: 'Chartering an authorized yacht/vessel for memorial ash scattering in the Bay of Kotor, eco-floristry, and an official GPS Coordinates Memorial Certificate.',
          ru: 'Фрахт яхты для достойной церемонии развеивания праха в Боко-Которском заливе, эко-флористика и выдача официального сертификата с GPS-координатами.',
          mne: 'Najam jahte/plovila za ceremoniju u Bokokotorskom zalivu, eko-floristika i izdavanje zvaničnog sertifikata sa GPS koordinatama.',
        },
        targetPath: '/services/local-burial-coordination/',
      },
    ],
  },
  {
    badge: {
      en: 'Tier 2 • Legal, B2B & Family Concierge (3 Services)',
      ru: 'Уровень 2 • Правовое, B2B и семейное сопровождение (3 услуги)',
      mne: 'Nivo 2 • Pravna, B2B i porodična podrška (3 usluge)',
    },
    heading: {
      en: 'Consular Legalization, Insurance GOP Billing & Family Support',
      ru: 'Консульская легализация, B2B-расчеты со страховыми и поддержка семьи',
      mne: 'Konzularna legalizacija, B2B GOP naplata i podrška porodici',
    },
    subtitle: {
      en: 'Executed 100% remotely under notarized Power of Attorney (Punomoćje) and Civil Mandate (Ugovor o nalogu) without requiring relatives to fly to Montenegro.',
      ru: 'Выполняется полностью дистанционно по нотариальной доверенности (Punomoćje) и договору поручения (Ugovor o nalogu) без прилета родственников.',
      mne: 'Sprovodi se 100% na daljinu po ovjerenom Punomoćju i Ugovoru o nalogu bez potrebe dolaska srodnika u Crnu Goru.',
    },
    items: [
      {
        num: '06',
        icon: FileCheck,
        title: {
          en: 'Consular & Sanitary Clearance (Sprovodnica, Apostille & Sudski tumač)',
          ru: 'Консульское и санитарное оформление (Sprovodnica, Апостиль и Sudski tumač)',
          mne: 'Konzularno i sanitarno zastupanje (Sprovodnica, Apostille i Sudski tumač)',
        },
        rate: {
          en: 'From\u00A0€250 / From\u00A0€450',
          ru: 'От\u00A0250\u00A0€ / От\u00A0450\u00A0€',
          mne: 'Od\u00A0250\u00A0€ / Od\u00A0450\u00A0€',
        },
        desc: {
          en: 'Procurement of Potvrda o smrti, Vienna Form C death extracts, Court Apostille (From €250), sworn translations, Sanitary Sprovodnica, and Embassy Laissez-Passer (From €450).',
          ru: 'Получение Potvrda o smrti, свидетельства Формы C, Апостиля суда и присяжных переводов (От 250 €), санитарной Sprovodnica и визы посольства (От 450 €).',
          mne: 'Pribavljanje Potvrde o smrti, Izvoda Obrazac C, Apostille pečata i sudskih prevoda (Od 250 €), Sprovodnice i konzularne dozvole (Od 450 €).',
        },
        targetPath: '/services/legal-consular/',
      },
      {
        num: '07',
        icon: Building2,
        title: {
          en: 'Insurer Guarantee of Payment (GOP) Direct Case Management',
          ru: 'Прямое ведение дела по гарантии страховой компании (GOP)',
          mne: 'Direktno vođenje slučaja po garanciji osiguranja (GOP)',
        },
        rate: {
          en: 'From\u00A0€0 for family (Direct GOP Billing)',
          ru: 'От\u00A00\u00A0€ для семьи (прямой биллинг по GOP)',
          mne: 'Od\u00A00\u00A0€ za porodicu (Direktna GOP naplata)',
        },
        desc: {
          en: 'Cashless case execution for Allianz, AXA, Europ Assistance, Balt Assistance & Savitar under formal Guarantee of Payment (GOP) and itemized SEPA/SWIFT invoicing.',
          ru: 'Беззатратное для семьи сопровождение по гарантийным письмам (GOP) международных ассистансов с раздельной детализацией сметы.',
          mne: 'Realizacija bez troškova za porodicu na osnovu garancije plaćanja (GOP) stranih osiguravajućih kuća.',
        },
        targetPath: '/assistance/direct-insurer-invoice/',
      },
      {
        num: '08',
        icon: HeartHandshake,
        title: {
          en: 'Family Travel Concierge, Live Farewell Stream & Memorial Catering',
          ru: 'Семейный тревел-консьерж, онлайн-трансляция прощания и поминальный обед',
          mne: 'Porodični putni konsijerž, video-prenos oproštaja i memorijalni ručak',
        },
        rate: {
          en: 'From\u00A0€350',
          ru: 'От\u00A0350\u00A0€',
          mne: 'Od\u00A0350\u00A0€',
        },
        desc: {
          en: 'Airport meet-and-greet at TIV/TGD, hotel logistics, hospital chapel viewing, encrypted HD live farewell stream for relatives abroad, and memorial catering.',
          ru: 'Встреча в аэропорту, проживание, прощание в капелле, зашифрованная видеотрансляция прощания для близких за рубежом и организация поминального обеда.',
          mne: 'Doček na aerodromu, smještaj, oproštaj u kapeli, zaštićeni video-prenos oproštaja i organizacija memorijalnog ručka.',
        },
      },
    ],
  },
  {
    badge: {
      en: 'Tier 3 • Expat Assets & Pre-Need Tech (4 Services)',
      ru: 'Уровень 3 • Имущество экспатов и превентивные сервисы (4 услуги)',
      mne: 'Nivo 3 • Imovina stranaca i unaprijed ugovorene usluge (4 usluge)',
    },
    heading: {
      en: 'Expat Property Handover, Vehicle Custody, Pets & Pre-Need Vault',
      ru: 'Опись имущества, автомобиль, возврат питомцев и Цифровой сейф',
      mne: 'Imovina stranaca, čuvanje vozila, ljubimci i Digitalni sef',
    },
    subtitle: {
      en: 'Specialized administrative concierge solutions protecting expat families from logistical, housing, and legal complications in Montenegro.',
      ru: 'Специализированные консьерж-решения по коду KD 82.99, избавляющие семьи экспатов от имущественных и бытовых рисков в Черногории.',
      mne: 'Specijalizovana administrativna rješenja (KD 82.99) koja štite porodice stranih državljana od imovinskih i pravnih komplikacija.',
    },
    items: [
      {
        num: '09',
        icon: Home,
        title: {
          en: 'Expat Estate Clearance, Inventory & DHL Personal Effects Dispatch',
          ru: 'Опись имущества экспата, закрытие аренды и отправка личных вещей DHL',
          mne: 'Popis imovine stranaca, raskid zakupa i DHL slanje ličnih stvari',
        },
        rate: {
          en: 'From\u00A0€490',
          ru: 'От\u00A0490\u00A0€',
          mne: 'Od\u00A0490\u00A0€',
        },
        desc: {
          en: 'Documented inventory of personal belongings in Tivat/Budva/Kotor residences, insured DHL/diplomatic dispatch of valuables, utility & lease closure.',
          ru: 'Опись личных вещей в квартире, застрахованная отправка документов и ценностей наследникам через DHL, закрытие аренды и ЖКУ.',
          mne: 'Detaljan popis stvari u stanu, bezbjedno DHL slanje dokumenata nasljednicima, raskid ugovora o zakupu i komunalija.',
        },
      },
      {
        num: '10',
        icon: Car,
        title: {
          en: 'Vehicle / Yacht Custody Storage, EU Driver Transfer or Brokerage',
          ru: 'Охраняемое хранение авто / яхты, перегон в ЕС или брокерское сопровождение',
          mne: 'Obezbijeđeno čuvanje vozila / jahte, prevoz u EU ili posredovanje',
        },
        rate: {
          en: 'From\u00A0€390',
          ru: 'От\u00A0390\u00A0€',
          mne: 'Od\u00A0390\u00A0€',
        },
        desc: {
          en: 'Guarded parking or marina custody of the deceased’s vehicle/vessel in Montenegro and legal coordination for heir transfer or licensed driver return to the EU.',
          ru: 'Размещение автомобиля или катера на охраняемой стоянке / в марине в Черногории и юридическая координация перегона в ЕС или оформления на наследников.',
          mne: 'Smještaj vozila ili plovila na obezbijeđenom parkingu / marini i pravna koordinacija za prenos na nasljednike ili povratak u EU.',
        },
      },
      {
        num: '11',
        icon: Heart,
        title: {
          en: 'International Pet Relocation & Veterinary Passport Clearance',
          ru: 'Международная перевозка домашних питомцев и ветеринарный паспорт',
          mne: 'Međunarodni prevoz kućnih ljubimaca i veterinarski pasoš',
        },
        rate: {
          en: 'From\u00A0€650',
          ru: 'От\u00A0650\u00A0€',
          mne: 'Od\u00A0650\u00A0€',
        },
        desc: {
          en: 'Temporary boarding, microchip verification, EU/UK veterinary export passport & titer clearance to reunite pets safely with family members abroad.',
          ru: 'Временная передержка, проверка чипа, оформление ветеринарного паспорта и титра антител для безопасного перелета питомца к родным.',
          mne: 'Privremeni smještaj, provjera mikročipa i veterinarska dokumentacija za bezbjedan povratak ljubimca porodici.',
        },
      },
      {
        num: '12',
        icon: Lock,
        title: {
          en: 'Pre-Need Mandate, Zero-Knowledge Digital Safe & Time Capsules',
          ru: 'Прижизненное планирование (Pre-Need), «Цифровой сейф» и Капсулы времени',
          mne: 'Pre-Need punomoćje, Zero-Knowledge Digitalni sef i Vremenske kapsule',
        },
        rate: {
          en: 'From\u00A0€190',
          ru: 'От\u00A0190\u00A0€',
          mne: 'Od\u00A0190\u00A0€',
        },
        desc: {
          en: 'Lifetime legal directives (Ugovor o nalogu), client-side encrypted vault for transferring passwords, seed phrases, and banking instructions to heirs upon verified death certificate, plus scheduled video/letter legacy delivery.',
          ru: 'Прижизненные юридические распоряжения (Ugovor o nalogu), защищённое клиентское шифрование (Zero-Knowledge) для передачи паролей, seed-фраз и банковских инструкций наследникам строго после предъявления свидетельства о смерти, а также отложенная доставка видео-наследия и писем близким.',
          mne: 'Doživotne pravne instrukcije (Ugovor o nalogu), klijentski šifrovani trezor za prenos lozinki i bankarskih uputstava nasljednicima uz izvod iz matične knjige umrlih, kao i odložena isporuka video-poruka porodici.',
        },
      },
    ],
  },
];

export const ServicesHub: React.FC<ServicesHubProps> = ({
  locale,
  route,
  onNavigate,
  onOpenModal,
}) => {
  const page = route.locales[locale];
  const homePath = buildLocalizedPath(locale, '/');
  const pricingPath = buildLocalizedPath(locale, '/pricing-breakdown/');
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    page.whatsappPrefill
  )}`;

  const ui =
    locale === 'ru'
      ? {
          home: 'Главная',
          backToHome: 'Вернуться на главную',
          callBtn: 'Позвонить 24/7',
          whatsappBtn: 'Написать в WhatsApp',
          requestBtn: 'Запросить смету по поручению',
          pricingLink: 'Открыть полную тарифную сетку и калькулятор',
          detailsLabel: 'Подробнее о процедуре',
          inquireLabel: 'Запросить координацию',
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          backToHome: 'Povratak na početnu',
          callBtn: 'Pozovite 24/7',
          whatsappBtn: 'WhatsApp 24/7',
          requestBtn: 'Zatražite pisanu specifikaciju',
          pricingLink: 'Otvorite kompletan cjenovnik i kalkulator',
          detailsLabel: 'Detaljnije o proceduri',
          inquireLabel: 'Zatražite koordinaciju',
        }
      : {
          home: 'Home',
          backToHome: 'Return to Main Overview',
          callBtn: 'Call 24/7',
          whatsappBtn: 'WhatsApp 24/7',
          requestBtn: 'Request Mandate Quote',
          pricingLink: 'Open Full Pricing Breakdown & Calculator',
          detailsLabel: 'View Protocol Details',
          inquireLabel: 'Request Coordination',
        };

  return (
    <article className="bg-porcelain text-slateDeep">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stoneBorder breadcrumbs-nav no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-slate-500 font-sans tracking-wide flex items-center gap-1.5 flex-wrap"
          >
            <a
              href={homePath}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(homePath);
              }}
              className="hover:text-sapphire transition-colors font-medium"
            >
              {ui.home}
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slateDeep font-semibold">
              {page.breadcrumbLabel}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate(homePath)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.backToHome}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#EEF3F8] via-[#F5F7FA] to-porcelain border-b border-stoneBorder py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stoneBorder shadow-sm">
              <Shield className="w-4 h-4 text-sapphire shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-sapphire">
                {page.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-semibold text-slateDeep leading-[1.15]">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg text-slateMuted leading-relaxed">
              {page.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>
                  {ui.callBtn} ({PHONE_DISPLAY})
                </span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{ui.whatsappBtn}</span>
              </a>

              <a
                href={pricingPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(pricingPath);
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-alabaster text-slateDeep font-semibold py-3 px-5 rounded-xl text-sm border border-stoneBorder transition-colors"
              >
                <span>{ui.pricingLink}</span>
                <ArrowRight className="w-4 h-4 text-sapphire" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Tiers of 12 Services */}
      <section className="py-12 sm:py-16 space-y-14">
        {SERVICE_TIERS.map((tier, tIdx) => (
          <div key={tIdx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-sapphire bg-sapphire-subtle px-3 py-1 rounded-full border border-sapphire/15 mb-3">
                {tier.badge[locale]}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slateDeep">
                {tier.heading[locale]}
              </h2>
              <p className="mt-2 text-sm text-slateMuted leading-relaxed">
                {tier.subtitle[locale]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {tier.items.map((item) => {
                const Icon = item.icon;
                const href = item.targetPath
                  ? buildLocalizedPath(locale, item.targetPath)
                  : undefined;

                return (
                  <article
                    key={item.num}
                    className="bg-white rounded-2xl border border-stoneBorder p-6 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-sapphire-subtle border border-sapphire/15 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-sapphire" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          {item.rate[locale]}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono font-semibold text-warmStone mb-1">
                        {LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT} • #{item.num}
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-slateDeep leading-snug">
                        {item.title[locale]}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-slateMuted leading-relaxed">
                        {item.desc[locale]}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stoneBorder/70">
                      {href ? (
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(href);
                          }}
                          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-alabaster hover:bg-sapphire hover:text-white text-slateDeep font-semibold text-xs sm:text-sm border border-stoneBorder transition-colors group"
                        >
                          <span>{ui.detailsLabel}</span>
                          <ArrowRight className="w-4 h-4 text-sapphire group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenModal}
                          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-alabaster hover:bg-forest hover:text-white text-slateDeep font-semibold text-xs sm:text-sm border border-stoneBorder transition-colors group cursor-pointer"
                        >
                          <span>{ui.inquireLabel}</span>
                          <ArrowRight className="w-4 h-4 text-forest group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Expat Estate Concierge Deep Dive */}
      <section className="py-10 bg-alabaster border-t border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExpatEstateServices locale={locale} />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection heading={page.faqHeading} faqs={page.faqs} locale={locale} />
    </article>
  );
};
