import React from 'react';
import { ShieldCheck, Plane, CheckCircle2 } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

interface IataCabinUrnNoticeProps {
  locale: LocaleSlug;
  className?: string;
}

export const IataCabinUrnNotice: React.FC<IataCabinUrnNoticeProps> = ({
  locale,
  className = '',
}) => {
  const content = {
    ru: {
      badge: 'IATA Cabin Urn Security Compliance',
      title: 'Регламент IATA: перевозка урны с прахом в ручной клади (TGD / TIV)',
      subtitle:
        'Для семей, перевозящих урну с прахом через аэропорты Тиват (TIV) или Подгорица (TGD):',
      points: [
        {
          title: 'Рентгенопрозрачный материал урны',
          desc: 'Предоставляемые для авиаперевозки урны полностью рентгенопрозрачны (дерево, природный камень, керамика) для беспрепятственного прохождения контроля безопасности в аэропорту без вскрытия.',
        },
        {
          title: 'Уставная документация',
          desc: 'Пакет включает официальное свидетельство о кремации (Potvrda o kremaciji) и справку о герметичной санитарной пломбировке.',
        },
        {
          title: 'Провоз в салоне самолета',
          desc: 'Перевозится пассажиром как ручная кладь с нулевыми надбавками авиакомпаний за ритуальный груз.',
        },
      ],
      airportBadge: 'Аэропорты TGD / TIV / BEG',
    },
    en: {
      badge: 'IATA Cabin Urn Security Compliance',
      title: 'IATA Security Notice: Carriage of Urn in Aircraft Cabin (TGD / TIV)',
      subtitle:
        'For families transporting cremation urns via Tivat (TIV) or Podgorica (TGD) airports:',
      points: [
        {
          title: 'Radiotransparent Urn Material',
          desc: 'Urns provided for air transport are X-ray transparent (wood, natural stone, ceramic) to clear airport security checkpoints smoothly without opening.',
        },
        {
          title: 'Statutory Documentation',
          desc: 'Package includes the official Certificate of Cremation (Potvrda o kremaciji) and sanitary seal statement.',
        },
        {
          title: 'Cabin Baggage Clearance',
          desc: 'Transported as carry-on baggage with zero airline mortuary surcharges.',
        },
      ],
      airportBadge: 'TGD / TIV / BEG Airports',
    },
    mne: {
      badge: 'IATA Cabin Urn Security Compliance',
      title: 'IATA bezbjednosni protokol: prevoz urne u kabini aviona (TGD / TIV)',
      subtitle:
        'Za porodice koje prevoze urnu sa pepelom preko aerodroma Tivat (TIV) ili Podgorica (TGD):',
      points: [
        {
          title: 'Rendgenski propustan materijal urne',
          desc: 'Urne obezbijeđene za avio-prevoz su rendgenski providne (drvo, prirodni kamen, keramika) za nesmetan prolazak aerodromske kontrole bez otvaranja.',
        },
        {
          title: 'Zakonska dokumentacija',
          desc: 'Komplet uključuje zvaničnu potvrdu o kremaciji (Potvrda o kremaciji) i sanitarnu potvrdu o pečaćenju.',
        },
        {
          title: 'Unošenje u putničku kabinu',
          desc: 'Prevozi se kao ručni prtljag bez naplate skupih avio-teretnih doplata za posmrtne ostatke.',
        },
      ],
      airportBadge: 'Aerodromi TGD / TIV / BEG',
    },
  }[locale];

  return (
    <div
      className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white to-porcelain border border-stoneBorder shadow-card ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{content.badge}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-stoneBorder">
          <Plane className="w-3.5 h-3.5 text-sapphire" />
          {content.airportBadge}
        </span>
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-bold text-slateDeep">
        {content.title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slateMuted">
        {content.subtitle}
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.points.map((pt, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white border border-stoneBorder/80 shadow-xs flex flex-col justify-start"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
              <span className="font-semibold text-xs sm:text-sm text-slateDeep">
                {pt.title}
              </span>
            </div>
            <p className="text-xs text-slateMuted leading-relaxed">
              {pt.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

