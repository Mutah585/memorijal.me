import React from 'react';
import {
  Home,
  Car,
  Anchor,
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
      title: 'Administrative Post-Loss & Expat Estate Coordination',
      subtitle:
        'Beyond repatriation or local municipal burial, Memorijal d.o.o. assists foreign families remotely under notarized Power of Attorney (Punomoćje) with property handover, vehicle custody, and memorial arrangements in Montenegro.',
      cards: [
        {
          icon: Home,
          title: 'Expat Property & Apartment Handover (Estate Clearance)',
          desc: 'Detailed inventorying of personal effects in rented or owned apartments (Tivat, Budva, Kotor), secure DHL/diplomatic dispatch of valuables and original documents to heirs abroad, utility & lease termination, and final cleaning coordination.',
        },
        {
          icon: Car,
          title: 'Vehicle Custody & Legal Brokerage Support',
          desc: 'Arrangement of secure guarded parking custody for the deceased’s vehicle in Montenegro and administrative/legal coordination for inheritance transfer or licensed driver return to EU countries.',
        },
        {
          icon: Anchor,
          title: 'Boka Bay Sea Ash Scattering & Pet Return',
          desc: 'Chartering an authorized vessel for dignified sea memorial ash scattering in the Bay of Kotor (with an official GPS Coordinates Memorial Certificate) and veterinary passport/microchip coordination to return pets to family members abroad.',
        },
      ],
      ctaLabel: 'Consult Coordinator on Estate Concierge (WhatsApp)',
      whatsappText:
        'Hello Memorijal d.o.o., I need administrative assistance with expat estate / property handover or memorial coordination in Montenegro.',
      legalNote:
        'Performed strictly under Activity Code KD 2010: 82.99 as an authorized representative acting on the family’s Power of Attorney (Punomoćje).',
    },
    ru: {
      badge: `Пост-сопровождение экспатов и имущества • ${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}`,
      title: 'Административный консьерж-сервис для семей экспатов (по доверенности)',
      subtitle:
        'Помимо репатриации или организации местного захоронения, агентство Memorijal d.o.o. по нотариальной доверенности (Punomoćje) решает бытовые и имущественные вопросы в Черногории без приезда наследников.',
      cards: [
        {
          icon: Home,
          title: 'Опись и передача апартаментов (Estate Clearance)',
          desc: 'Детальная опись личных вещей в арендованной или собственной квартире (Тиват, Будва, Котор), застрахованная отправка ценностей и документов наследникам (DHL / диппочта), закрытие договоров аренды и ЖКУ, организация клининга.',
        },
        {
          icon: Car,
          title: 'Сохранность автомобиля и юридическое сопровождение',
          desc: 'Размещение автомобиля усопшего на охраняемой стоянке в Черногории, а также правовая и организационная координация перегона лицензированным водителем в ЕС или оформления на наследников.',
        },
        {
          icon: Anchor,
          title: 'Церемония развеивания праха в Боке и перевозка питомцев',
          desc: 'Фрахт катера для церемонии развеивания праха в Боко-Которском заливе с выдачей официального сертификата с GPS-координатами, а также оформление ветеринарного паспорта и чипирования для возврата домашних животных семье.',
        },
      ],
      ctaLabel: 'Обсудить консьерж-сопровождение в WhatsApp',
      whatsappText:
        'Здравствуйте, Memorijal d.o.o.! Нужна административная помощь по имущественным / бытовым вопросам экспата в Черногории.',
      legalNote:
        'Выполняется строго в рамках кода деятельности KD 2010: 82.99 как уполномоченным представителем семьи по доверенности (Punomoćje).',
    },
    mne: {
      badge: `Administrativna podrška za imovinu stranaca • ${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}`,
      title: 'Postmortalni konsijerž i administrativna briga o imovini u Crnoj Gori',
      subtitle:
        'Pored repatrijacije ili lokalne sahrane, Memorijal d.o.o. po ovjerenom punomoćju (Punomoćje) rješava imovinske i administrativne obaveze u Crnoj Gori bez potrebe dolaska nasljednika.',
      cards: [
        {
          icon: Home,
          title: 'Popis i primopredaja stana (Estate Clearance)',
          desc: 'Detaljan popis ličnih stvari u zakupljenom ili sopstvenom stanu (Tivat, Budva, Kotor), bezbjedno slanje dragocjenosti i dokumenata nasljednicima u inostranstvo, raskid zakupa i komunalnih računa.',
        },
        {
          icon: Car,
          title: 'Čuvanje vozila i pravna koordinacija',
          desc: 'Smještaj vozila preminulog lica na obezbijeđeni parking u Crnoj Gori i administrativna koordinacija za prenos na nasljednike ili povratak vozila u EU putem licenciranih vozača.',
        },
        {
          icon: Anchor,
          title: 'Prosipanje pepela u Boki i povratak kućnih ljubimaca',
          desc: 'Najam plovila za dostojanstvenu ceremoniju u Bokokotorskom zalivu uz izdavanje sertifikata sa GPS koordinatama, kao i veterinarska koordinacija pasoša za bezbjedan povratak ljubimaca porodici.',
        },
      ],
      ctaLabel: 'Kontaktirajte koordinatora putem WhatsApp-a',
      whatsappText:
        'Poštovani Memorijal d.o.o., potrebna je administrativna podrška oko imovine / primopredaje stana u Crnoj Gori.',
      legalNote:
        'Obavlja se isključivo u okviru šifre djelatnosti KD 2010: 82.99 u svojstvu ovlašćenog punomoćnika porodice.',
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {t.cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-porcelain border border-stoneBorder flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-sapphire/10 text-sapphire flex items-center justify-center">
                  <Icon className="w-4 h-4" />
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
