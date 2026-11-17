import React from 'react';
import {
  Home,
  Car,
  Anchor,
  Lock,
  ShieldCheck,
  MessageCircle,
  FileCheck,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { WHATSAPP_NUMBER } from '../i18n/translations';
import { LEGAL_CREDENTIALS } from '../config/legalCredentials';

export interface ExpatEstateServicesProps {
  locale: LocaleSlug;
  className?: string;
}

export const ExpatEstateServices: React.FC<ExpatEstateServicesProps> = ({
  locale,
  className = '',
}) => {
  const t = {
    en: {
      badge: `Expat Estate & Post-Loss Concierge • ${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}`,
      title: 'Administrative Post-Loss, Expat Estate & Digital Legacy Coordination',
      subtitle:
        'Beyond repatriation or local municipal burial, Memorijal d.o.o. assists foreign families remotely under notarized Power of Attorney (Punomoćje) and Civil Mandate (Ugovor o nalogu) with property handover, vehicle custody, memorial sea ceremonies, and pre-need digital vaults in Montenegro.',
      cards: [
        {
          id: 'expat-estate-clearance',
          icon: Home,
          rate: 'From\u00A0€490',
          title: 'Expat Estate Clearance, Inventory & DHL Personal Effects Dispatch',
          desc: 'Detailed inventorying of personal effects in rented or owned apartments (Tivat, Budva, Kotor, Podgorica), secure DHL/diplomatic dispatch of valuables and original documents to heirs abroad, utility & lease termination, and final cleaning coordination.',
        },
        {
          id: 'vehicle-yacht-custody',
          icon: Car,
          rate: 'From\u00A0€390',
          title: 'Vehicle / Yacht Custody Storage, EU Driver Transfer or Brokerage',
          desc: 'Arrangement of secure guarded parking or marina custody for the deceased’s vehicle or vessel in Montenegro, customs regime compliance, and administrative/legal coordination for inheritance transfer or licensed driver return to EU countries.',
        },
        {
          id: 'boka-sea-pet-relocation',
          icon: Anchor,
          rate: 'From\u00A0€1,200 (Sea) / From\u00A0€650 (Pets)',
          title: 'Boka Bay Sea Ash Scattering & International Pet Relocation',
          desc: 'Chartering an authorized yacht/vessel for dignified sea memorial ash scattering in the Bay of Kotor (with an official GPS Coordinates Memorial Certificate) and veterinary passport/microchip clearance to return pets safely to family members abroad.',
        },
        {
          id: 'pre-need-vault',
          icon: Lock,
          rate: 'From\u00A0€190',
          title: 'Pre-Need Mandate, Zero-Knowledge Digital Safe & Time Capsules',
          desc: 'Lifetime legal directives (Ugovor o nalogu), client-side encrypted vault for transferring passwords, seed phrases, and banking instructions to heirs upon verified death certificate, plus scheduled video/letter legacy delivery.',
        },
      ],
      ctaLabel: 'Consult Coordinator on Estate & Pre-Need Vault (WhatsApp)',
      whatsappText:
        'Hello Memorijal d.o.o., I need administrative assistance with expat estate handover, memorial coordination, or the Pre-Need Digital Safe in Montenegro.',
      legalNote:
        'Performed strictly under Activity Code KD 2010: 82.99 as an authorized fiduciary representative acting on the family’s Power of Attorney (Punomoćje) or Civil Mandate (Ugovor o nalogu).',
    },
    ru: {
      badge: `Пост-сопровождение экспатов и Цифровой сейф • ${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}`,
      title: 'Административный консьерж-сервис для семей экспатов и прижизненный сейф',
      subtitle:
        'Помимо репатриации или организации местного захоронения, агентство Memorijal d.o.o. по нотариальной доверенности (Punomoćje) и договору поручения (Ugovor o nalogu) решает имущественные вопросы в Черногории без приезда наследников.',
      cards: [
        {
          id: 'expat-estate-clearance',
          icon: Home,
          rate: 'От\u00A0490\u00A0€',
          title: 'Опись имущества экспата, закрытие аренды и отправка личных вещей DHL',
          desc: 'Детальная опись личных вещей в арендованной или собственной квартире (Тиват, Будва, Котор, Подгорица), застрахованная отправка ценностей и документов наследникам (DHL / диппочта), закрытие договоров аренды и ЖКУ, организация клининга.',
        },
        {
          id: 'vehicle-yacht-custody',
          icon: Car,
          rate: 'От\u00A0390\u00A0€',
          title: 'Охраняемое хранение авто / яхты, перегон в ЕС или брокерское сопровождение',
          desc: 'Размещение автомобиля или судна усопшего на охраняемой стоянке / в марине в Черногории, а также правовая и организационная координация перегона лицензированным водителем в ЕС или оформления на наследников.',
        },
        {
          id: 'boka-sea-pet-relocation',
          icon: Anchor,
          rate: 'От\u00A01\u00A0200\u00A0€ (Бока) / От\u00A0650\u00A0€ (Питомцы)',
          title: 'Церемония развеивания праха в Боке и международная перевозка питомцев',
          desc: 'Фрахт яхты для церемонии развеивания праха в Боко-Которском заливе с выдачей официального сертификата с GPS-координатами, а также оформление ветеринарного паспорта и титров антител для возврата домашних животных семье.',
        },
        {
          id: 'pre-need-vault',
          icon: Lock,
          rate: 'От\u00A0190\u00A0€',
          title: 'Прижизненное планирование (Pre-Need), «Цифровой сейф» и Капсулы времени',
          desc: 'Прижизненные юридические распоряжения (Ugovor o nalogu), защищённое клиентское шифрование (Zero-Knowledge) для передачи паролей, seed-фраз и банковских инструкций наследникам строго после предъявления свидетельства о смерти, а также отложенная доставка видео-наследия и писем близким.',
        },
      ],
      ctaLabel: 'Обсудить консьерж или Цифровой сейф в WhatsApp',
      whatsappText:
        'Здравствуйте, Memorijal d.o.o.! Нужна консультация по имущественным вопросам экспата / Прижизненному договору и Цифровому сейфу в Черногории.',
      legalNote:
        'Выполняется строго в рамках кода деятельности KD 2010: 82.99 по доверенности (Punomoćje) и договору поручения (Ugovor o nalogu).',
    },
    mne: {
      badge: `Administrativna podrška za imovinu stranaca • ${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}`,
      title: 'Postmortalni konsijerž, briga o imovini i Pre-Need Digitalni sef u Crnoj Gori',
      subtitle:
        'Pored repatrijacije ili lokalne sahrane, Memorijal d.o.o. po ovjerenom punomoćju (Punomoćje) i ugovoru o nalogu (Ugovor o nalogu) rješava imovinske i administrativne obaveze u Crnoj Gori bez potrebe dolaska nasljednika.',
      cards: [
        {
          id: 'expat-estate-clearance',
          icon: Home,
          rate: 'Od\u00A0490\u00A0€',
          title: 'Popis imovine stranaca, raskid zakupa i DHL slanje ličnih stvari',
          desc: 'Detaljan popis ličnih stvari u zakupljenom ili sopstvenom stanu (Tivat, Budva, Kotor, Podgorica), bezbjedno slanje dragocjenosti i dokumenata nasljednicima u inostranstvo, raskid zakupa i komunalnih računa.',
        },
        {
          id: 'vehicle-yacht-custody',
          icon: Car,
          rate: 'Od\u00A0390\u00A0€',
          title: 'Obezbijeđeno čuvanje vozila / jahte, prevoz u EU ili posredovanje',
          desc: 'Smještaj vozila ili plovila preminulog lica na obezbijeđeni parking / marinu u Crnoj Gori i administrativna koordinacija za prenos na nasljednike ili povratak vozila u EU putem licenciranih vozača.',
        },
        {
          id: 'boka-sea-pet-relocation',
          icon: Anchor,
          rate: 'Od\u00A01.200\u00A0€ (Boka) / Od\u00A0650\u00A0€ (Ljubimci)',
          title: 'Prosipanje pepela u Boki i međunarodni prevoz kućnih ljubimaca',
          desc: 'Najam jahte/plovila za dostojanstvenu ceremoniju u Bokokotorskom zalivu uz izdavanje sertifikata sa GPS koordinatama, kao i veterinarska koordinacija pasoša za bezbjedan povratak ljubimaca porodici.',
        },
        {
          id: 'pre-need-vault',
          icon: Lock,
          rate: 'Od\u00A0190\u00A0€',
          title: 'Pre-Need punomoćje, Zero-Knowledge Digitalni sef i Vremenske kapsule',
          desc: 'Doživotne pravne instrukcije (Ugovor o nalogu), klijentski šifrovani trezor za prenos lozinki i bankarskih uputstava nasljednicima uz izvod iz matične knjige umrlih, kao i odložena isporuka video-poruka porodici.',
        },
      ],
      ctaLabel: 'Kontaktirajte koordinatora putem WhatsApp-a',
      whatsappText:
        'Poštovani Memorijal d.o.o., potrebna je administrativna podrška oko imovine stranaca ili Pre-Need Digitalnog sefa u Crnoj Gori.',
      legalNote:
        'Obavlja se isključivo u okviru šifre djelatnosti KD 2010: 82.99 u svojstvu ovlašćenog punomoćnika po Ugovoru o nalogu.',
    },
  }[locale];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.whatsappText
  )}`;

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {t.cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              className="p-5 rounded-xl bg-porcelain border border-stoneBorder flex flex-col justify-between space-y-3 scroll-mt-24"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-sapphire/10 text-sapphire flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    {card.rate}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-slateDeep leading-snug">
                  {card.title}
                </h4>
                <p className="text-xs text-slateMuted leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-stoneBorder flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-2 text-xs text-slateMuted">
          <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <span>{t.legalNote}</span>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.ctaLabel}</span>
        </a>
      </div>
    </div>
  );
};
