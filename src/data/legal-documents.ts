import type { LocaleSlug } from './seo-routes';
import { LEGAL_CREDENTIALS, getCrpsPibDisplay } from '../config/legalCredentials';

export type LegalDocId = 'legal-terms' | 'legal-privacy' | 'legal-disclosure';

export interface LegalSection {
  id: string;
  pillarBadge: string;
  heading: string;
  statutes: string[];
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocumentContent {
  id: LegalDocId;
  path: string;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export function getLegalDocuments(locale: LocaleSlug): LegalDocumentContent[] {
  const crpsDisplay = getCrpsPibDisplay(locale);
  const vatNotice = LEGAL_CREDENTIALS.VAT_STATUS[locale];
  const effectiveDate = LEGAL_CREDENTIALS.EFFECTIVE_DATE[locale];

  if (locale === 'ru') {
    return [
      {
        id: 'legal-terms',
        path: '/legal/terms-of-service/',
        shortTitle: 'Публичная оферта и договор поручения',
        fullTitle:
          'Публичная оферта, Договор поручения и Общие условия оказания координационных услуг',
        subtitle:
          'Регулирует правоотношения между Заказчиком (семьей, представителем или страховой ассистанс-компанией) и агентством Memorijal d.o.o. в соответствии с Законом об обязательственных отношениях Черногории (ZOO).',
        effectiveDate,
        sections: [
          {
            id: 'mandate-nature',
            pillarBadge: 'Раздел 1 • Правовая природа поручения',
            heading: '1. Агентский характер деятельности (Ugovor o nalogu)',
            statutes: [
              'Zakon o obligacionim odnosima Crne Gore (ст. 757–779 — Договор поручения)',
              'KD 2010: 82.99 и 52.29',
            ],
            paragraphs: [
              `${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${LEGAL_CREDENTIALS.ACTIVITY_CODES}; ${crpsDisplay}; ${vatNotice}) действует исключительно как независимое административно-правовое и транспортно-экспедиционное координационное агентство (case manager).`,
              'Все действия в больницах, моргах, муниципальных органах ЗАГС (Matični registar), Санитарной инспекции (Uprava za inspekcijske poslove), дипломатических представительствах и таможенных органах совершаются строго в качестве уполномоченного представителя от имени и за счет Заказчика на основании нотариальной доверенности (Punomoćje) либо официального поручения / гарантийного письма страховой компании (GOP).',
            ],
          },
          {
            id: 'pricing-disbursements',
            pillarBadge: 'Раздел 2 • Тарифы и транзитные расходы',
            heading: '2. Индикативный характер цен и транзитные расходы (Prefakturisanje)',
            statutes: [
              'Zakon o obligacionim odnosima CG (ст. 769 — Возмещение расходов поверенного)',
            ],
            paragraphs: [
              'Все цены, калькуляторы (RouteEstimator, RemoteSavingsEstimator, MortuaryTimeTracker) и таблицы тарифов на сайте memorijal.me носят исключительно справочно-индикативный характер (формат «От ...») и не являются публичной офертой с фиксированной ценой (Ponuda).',
              'Обязательное финансовое обязательство возникает исключительно с момента согласования индивидуальной письменной Сметы / Спецификации и подписания (или подтверждения в электронной/мессенджер-форме) Договора поручения либо получения GOP от ассистанса.',
            ],
            bullets: [
              'В счете четко разделяются: (а) Агентское вознаграждение за координацию Memorijal d.o.o. и (б) возмещаемые транзитные расходы третьих лиц (prolazne stavke / prefakturisanje).',
              'К транзитным расходам относятся: консульские сборы, государственные санитарные пошлины, тарифы больничных моргов, сборы крематория в Белграде/Нови-Саде, авиафрахт по накладной AWB (IATA Cargo HUM) и услуги лицензированных автоперевозчиков.',
            ],
          },
          {
            id: 'liability-force-majeure',
            pillarBadge: 'Раздел 3 • Ответственность и форс-мажор',
            heading: '3. Ограничение ответственности и государственный/сторонний форс-мажор',
            statutes: [
              'Zakon o obligacionim odnosima CG (ст. 266–270)',
            ],
            paragraphs: [
              'Совокупная финансовая ответственность Memorijal d.o.o. по любым претензиям, связанным с координацией дела, строго ограничивается суммой чистого агентского вознаграждения за координацию, фактически полученного Memorijal d.o.o. от Заказчика (за вычетом транзитных платежей третьим лицам).',
              'Memorijal d.o.o. не несет ответственности за задержки, изменение расписания или дополнительные расходы на хранение в морге, вызванные действиями или решениями суверенных и сторонних органов:',
            ],
            bullets: [
              'Прокуратуры (Više / Osnovno državno tužilaštvo) или полиции, назначивших обязательную судебно-медицинскую экспертизу / вскрытие (obdukcija) или задерживающих выдачу тела.',
              'Посольств и консульств в Подгорице/Белграде, изменяющих сроки выдачи пропусков или работающих по графику государственных праздников.',
              'Пограничных таможенных органов (Debeli Brijeg, Dobrakovo и др.) и санитарных инспекторов.',
              'Авиакомпаний (Air Montenegro, Air Serbia, Turkish Airlines и др.), вводящих грузовые эмбарго, снимающих груз Cargo HUM из-за центровки/лимитов отсека, отменяющих или переносящих рейсы.',
              'Расписанием государственных крематориев Республики Сербия (JKP Pogrebne usluge Beograd / Novi Sad).',
            ],
          },
          {
            id: 'urgent-waiver',
            pillarBadge: 'Раздел 4 • Отказ от права на отзыв (14 дней)',
            heading: '4. Неотложное исполнение и отказ от 14-дневного периода охлаждения',
            statutes: [
              'Zakon o zaštiti potrošača Crne Gore (Закон о защите прав потребителей ЧГ)',
              'Директива ЕС 2011/83/EU (ст. 16(a) и ст. 16(c)/(e))',
            ],
            paragraphs: [
              'Ввиду того что организация репатриации и взаимодействие с моргом требуют немедленного экстренного выезда (в течение первых часов после кончины), а также предполагают заказ индивидуально изготавливаемых и герметизируемых санитарных изделий (оцинкованный вкладыш с пайкой, не подлежащий повторному использованию по санитарно-гигиеническим нормам), Заказчик прямо просит приступить к исполнению поручения немедленно до истечения 14-дневного срока, предусмотренного для дистанционных договоров.',
              'Заказчик подтверждает, что с момента начала координационного выезда или закупки/герметизации санитарной тары право на односторонний отказ (возврат) утрачивается в соответствии с законом.',
            ],
          },
          {
            id: 'informational-tools',
            pillarBadge: 'Раздел 5 • Информационные виджеты',
            heading: '5. Информационный характер калькуляторов, чеклистов и образцов документов',
            statutes: ['Информационный стандарт сервиса'],
            paragraphs: [
              'Интерактивные инструменты на сайте (MortuaryTimeTracker, HotelIncidentProtocol, HomeDeathProtocol, PoaDrafter, DocumentChecklist, DocumentSpecimenViewer) предоставляются исключительно для ориентировочного ознакомления и не заменяют официальную юридическую консультацию нотариуса/адвоката, распоряжения полиции или медицинские предписания.',
            ],
          },
          {
            id: 'governing-law-jurisdiction',
            pillarBadge: 'Раздел 6 • Применимое право и подсудность',
            heading: '6. Применимое право, досудебный порядок и исключительная подсудность',
            statutes: [
              'Законодательство Черногории (Materijalno pravo Crne Gore)',
              'Исключительная территориальная подсудность (Isključiva mjesna nadležnost)',
            ],
            paragraphs: [
              'Настоящие условия и все договоры поручения регулируются исключительно материальным правом Черногории. До обращения в суд обязателен письменный претензионный (досудебный) порядок урегулирования спора со сроком рассмотрения претензии 30 (тридцать) календарных дней.',
              'Любые неурегулированные споры подлежат исключительной юрисдикции компетентного суда Черногории — Основного суда в Которе (Osnovni sud u Kotoru) или Хозяйственного суда Черногории в Подгорице (Privredni sud Crne Gore u Podgorici). Стороны отказываются от инициирования судебных разбирательств в иностранных юрисдикциях (forum shopping) в максимально допустимой законом степени.',
            ],
          },
        ],
      },
      {
        id: 'legal-privacy',
        path: '/legal/privacy-gdpr/',
        shortTitle: 'Политика конфиденциальности (GDPR / ZZPL)',
        fullTitle:
          'Политика конфиденциальности, защиты персональных данных и трансграничной передачи сведений',
        subtitle:
          'Двойной режим соответствия: Закон о защите персональных данных Черногории (ZZPL) и Регламент ЕС/Великобритании GDPR (2016/679).',
        effectiveDate,
        sections: [
          {
            id: 'data-controller',
            pillarBadge: 'Раздел 1 • Оператор данных',
            heading: '1. Оператор персональных данных и правовые основания',
            statutes: [
              'Zakon o zaštiti podataka o ličnosti Crne Gore (ZZPL)',
              'EU / UK GDPR (Regulation 2016/679)',
            ],
            paragraphs: [
              `Оператором данных выступает ${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${crpsDisplay}; контакт по вопросам данных: office@memorijal.me).`,
              'Данные умерших лиц: согласно Пункту 27 Преамбулы (Recital 27) GDPR, европейские правила защиты персональных данных не распространяются на данные умерших лиц; тем не менее Memorijal d.o.o. обеспечивает строгую профессиональную и медицинскую конфиденциальность всех документов умершего (Potvrda o smrti, причина смерти, копии паспорта).',
            ],
            bullets: [
              'Данные живых заявителей (родственников, доверителей, представителей страховых компаний) обрабатываются строго на основании ст. 6(1)(b) GDPR (исполнение договора поручения), ст. 6(1)(c) (соблюдение санитарного и пограничного законодательства Черногории) и ст. 6(1)(d) (защита жизненно важных интересов в экстренной ситуации).',
            ],
          },
          {
            id: 'cross-border-transfers',
            pillarBadge: 'Раздел 2 • Трансграничная передача',
            heading: '2. Трансграничная передача данных (ст. 49(1)(b) и (c) GDPR)',
            statutes: ['GDPR Art. 49(1)(b) & (c)', 'ZZPL Crne Gore'],
            paragraphs: [
              'Заявитель прямо уведомляется и соглашается с тем, что копии документов заявителя и умершего в объеме, строго необходимом для исполнения поручения по репатриации или кремации, передаются через государственные границы следующим получателям:',
            ],
            bullets: [
              'Государственным органам, больницам и моргам Черногории (KCCG Подгорица, больницы Котора, Бара и др.), Санитарной инспекции и органам ЗАГС.',
              'Государственным крематориям и муниципальным службам Республики Сербия (Белград / Нови-Сад) при организации кремации.',
              'Посольствам и консульствам стран назначения, авиакомпаниям (Cargo HUM) и принимающим похоронным операторам в ЕС, Великобритании, Украине, России или странах СНГ.',
            ],
          },
          {
            id: 'local-processing',
            pillarBadge: 'Раздел 3 • Локальная обработка без серверных БД',
            heading: '3. Отсутствие серверных баз данных черновиков (Zero Server Storage)',
            statutes: ['Принцип минимизации данных (Data Minimization)'],
            paragraphs: [
              'Интерактивные инструменты на сайте (PoaDrafter, DocumentChecklist, CoordinatorModal, GopRequestBuilder) обрабатывают введенный текст исключительно локально в браузере пользователя (в оперативной памяти или sessionStorage) без сохранения в централизованных серверных базах данных.',
              'Передача данных координатору происходит только по инициативе самого пользователя через выбранный им защищенный канал связи: мессенджер WhatsApp (сквозное шифрование E2EE), почтовый клиент (mailto:) или прямой телефонный звонок.',
              'Пользователь может в любой момент мгновенно очистить все локальные данные сессии в браузере с помощью встроенной функции «Очистить данные сессии» (PrivacyDataWipe) в подвале сайта или в модальном окне.',
            ],
          },
          {
            id: 'privacy-rights',
            pillarBadge: 'Раздел 4 • Права субъектов и юрисдикция',
            heading: '4. Права субъектов данных и надзорный орган',
            statutes: ['GDPR Art. 15–22', 'ZZPL Crne Gore'],
            paragraphs: [
              'Живые заявители имеют право запрашивать доступ, исправление или удаление своих контактных данных, направив обращение на office@memorijal.me (срок рассмотрения — до 30 дней), за исключением сведений, подлежащих обязательному хранению по налоговому и санитарному законодательству Черногории.',
              'Все споры по вопросам защиты данных регулируются материальным правом Черногории и подлежат исключительной подсудности компетентного суда в Черногории (Osnovni sud u Kotoru / Privredni sud Crne Gore u Podgorici) после 30-дневной письменной претензии.',
            ],
          },
        ],
      },
      {
        id: 'legal-disclosure',
        path: '/legal/regulatory-disclosure/',
        shortTitle: 'Раскрытие агентской модели и прав потребителей',
        fullTitle:
          'Официальное раскрытие агентской модели, ответственности субподрядчиков и прав потребителей',
        subtitle:
          'Прозрачное разграничение компетенций между координационным агентством Memorijal d.o.o., перевозчиками, медицинскими учреждениями и производителями ритуальных принадлежностей.',
        effectiveDate,
        sections: [
          {
            id: 'non-carrier-non-retail',
            pillarBadge: 'Раздел 1 • Отсутствие автопарка, магазина и медлицензии',
            heading:
              '1. Статус не-перевозчика, отсутствие розничного магазина и медицинской практики',
            statutes: [
              'Zakon o komunalnim djelatnostima CG',
              'Zakon o prevozu u drumskom saobraćaju CG',
              'Zakon o vazdušnom saobraćaju CG',
              'Zakon o zdravstvenoj zaštiti CG',
            ],
            paragraphs: [
              `${LEGAL_CREDENTIALS.COMPANY_NAME} осуществляет деятельность строго по кодам ${LEGAL_CREDENTIALS.ACTIVITY_CODES} (${crpsDisplay}; ${vatNotice}). Компания не использует код 96.03 в качестве основного операционного вида деятельности и не ведет розничную торговлю (код 47.78).`,
            ],
            bullets: [
              'Отсутствие собственного автопарка и воздушных судов: Memorijal d.o.o. не владеет и не эксплуатирует катафалки, машины скорой помощи или воздушные суда и не выступает прямым автомобильным или авиационным перевозчиком. Физическая перевозка тел, герметичная пайка цинка (lemljenje) и авиафрахт (IATA Cargo HUM) выполняются исключительно независимыми лицензированными операторами ритуальных услуг, аккредитованными перевозчиками и сертифицированными авиакомпаниями.',
              'Отсутствие розничного магазина (Nema maloprodajnog objekta): Memorijal d.o.o. не содержит открытого розничного магазина или выставочного зала ритуальных товаров. Необходимые транспортировочные гробы, цинковые вкладыши и урны закупаются строго под конкретное дело у лицензированных производителей/субподрядчиков как транзитные возмещаемые расходы (prefakturisanje troškova) в рамках поручения клиента.',
              'Отсутствие медицинской деятельности: Memorijal d.o.o. не проводит медицинских осмотров, судебно-медицинских вскрытий и клинического бальзамирования. Все посмертные медицинские процедуры и врачебные свидетельства (Potvrda o smrti) выполняются и выдаются исключительно государственными больницами (KCCG Подгорица, Opšta bolnica Kotor и др.) и лицензированными патологоанатомами.',
            ],
          },
          {
            id: 'subcontractor-liability',
            pillarBadge: 'Раздел 2 • Ответственность субподрядчиков',
            heading: '2. Разграничение ответственности с лицензированными подрядчиками',
            statutes: ['Zakon o obligacionim odnosima CG (ст. 762–765)'],
            paragraphs: [
              'Привлекая аккредитованных лицензированных перевозчиков, авиакомпании, таможенных брокеров и государственные крематории Сербии в интересах Заказчика, Memorijal d.o.o. несет ответственность за добросовестный выбор (culpa in eligendo) и координацию документооборота.',
              'Memorijal d.o.o. не несет ответственности за задержки рейсов, снятие груза Cargo HUM, пограничные проверки, решения прокуратуры об обдукции или изменения графика крематория, а общая финансовая ответственность агентства ограничена фактически уплаченным Заказчиком чистым агентским вознаграждением.',
            ],
          },
          {
            id: 'consumer-rights-disputes',
            pillarBadge: 'Раздел 3 • Права потребителей и подсудность',
            heading: '3. Права потребителей при экстренных заказах и порядок споров',
            statutes: [
              'Zakon o zaštiti potrošača CG',
              'EU Directive 2011/83/EU (Art. 16)',
            ],
            paragraphs: [
              'С учетом неотложного характера координации (выезд в течение часов) и индивидуального санитарно-гигиенического характера герметизированных цинковых контейнеров, Заказчик, инициируя срочное исполнение, соглашается с утратой 14-дневного права на отказ от дистанционного договора после начала оказания услуг или закупки/пайки санитарной тары.',
              'Применимым правом является материальное право Черногории. Обязателен письменный досудебный претензионный порядок (30 дней). Все споры рассматриваются исключительно компетентным судом Черногории (Osnovni sud u Kotoru / Privredni sud Crne Gore u Podgorici).',
            ],
          },
        ],
      },
    ];
  }

  if (locale === 'mne') {
    return [
      {
        id: 'legal-terms',
        path: '/legal/terms-of-service/',
        shortTitle: 'Opšti uslovi i Ugovor o nalogu',
        fullTitle:
          'Javna ponuda, Ugovor o nalogu i Opšti uslovi pružanja agencijskih usluga koordinacije',
        subtitle:
          'Uređuje pravni odnos između Nalogodavca (porodice, zastupnika ili osiguravajuće kuće) i agencije Memorijal d.o.o. shodno Zakonu o obligacionim odnosima Crne Gore (ZOO).',
        effectiveDate,
        sections: [
          {
            id: 'mandate-nature',
            pillarBadge: 'Odjeljak 1 • Pravna priroda naloga',
            heading: '1. Agencijski karakter poslovanja (Ugovor o nalogu i posredovanju)',
            statutes: [
              'Zakon o obligacionim odnosima Crne Gore (čl. 757–779)',
              'KD 2010: 82.99 i 52.29',
            ],
            paragraphs: [
              `${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${LEGAL_CREDENTIALS.ACTIVITY_CODES}; ${crpsDisplay}; ${vatNotice}) posluje isključivo kao nezavisna administrativna, pravna i špeditersko-koordinaciona agencija (case manager).`,
              'Sve radnje pred bolnicama, kapelama, matičnim službama, Sanitarnom inspekcijom (Uprava za inspekcijske poslove), ambasadama i carinskim organima preduzimaju se isključivo u svojstvu ovlašćenog punomoćnika u ime i za račun Nalogodavca na osnovu ovjerenog Punomoćja ili pisanog naloga / garantnog pisma osiguranja (GOP).',
            ],
          },
          {
            id: 'pricing-disbursements',
            pillarBadge: 'Odjeljak 2 • Cijene i prolazne stavke',
            heading: '2. Indikativni karakter cijena i prefakturisanje troškova',
            statutes: ['Zakon o obligacionim odnosima CG (čl. 769)'],
            paragraphs: [
              'Sve cijene, kalkulatori (RouteEstimator, RemoteSavingsEstimator, MortuaryTimeTracker) i cjenovnici na sajtu memorijal.me predstavljaju isključivo informativne orijentacione procjene („Od ...“) i ne čine obavezujuću javnu ponudu sa fiksnom cijenom.',
              'Obavezujući finansijski odnos nastaje isključivo izdavanjem individualnog pisanog Proračuna / Specifikacije i potvrdom Ugovora o nalogu od strane Nalogodavca ili prijemom GOP-a osiguranja.',
            ],
            bullets: [
              'Na računu se jasno razdvajaju: (a) Agencijska naknada za koordinaciju društva Memorijal d.o.o. i (b) nadoknadivi troškovi trećih lica (prolazne stavke / prefakturisanje).',
              'Prolazne stavke obuhvataju: konzularne takse, državne sanitarne takse, bolničke naknade za kapelu, takse krematorijuma u Beogradu/Novom Sadu, avio-kargo prevoz (AWB / IATA Cargo HUM) i naknade licenciranih drumskih prevoznika.',
            ],
          },
          {
            id: 'liability-force-majeure',
            pillarBadge: 'Odjeljak 3 • Ograničenje odgovornosti i viša sila',
            heading: '3. Ograničenje odgovornosti i viša sila trećih strana',
            statutes: ['Zakon o obligacionim odnosima CG (čl. 266–270)'],
            paragraphs: [
              'Maksimalna ukupna finansijska odgovornost društva Memorijal d.o.o. za bilo koji zahtjev proistekao iz usluga koordinacije strogo je ograničena na iznos neto agencijske naknade za koordinaciju koju je Nalogodavac stvarno uplatio društvu Memorijal d.o.o. (isključujući prolazne stavke trećih lica).',
              'Memorijal d.o.o. ne snosi odgovornost za kašnjenja, izmjene rasporeda ili dodatne troškove ležarine u kapeli prouzrokovane od strane:',
            ],
            bullets: [
              'Državnog tužilaštva (Više / Osnovno državno tužilaštvo) ili policije koji nalože obaveznu sudsko-medicinsku obdukciju ili odlože predaju tijela.',
              'Ambasada i konzulata u Podgorici/Beogradu usljed obrade zahtjeva ili državnih praznika.',
              'Graničnih carinskih organa (Debeli Brijeg, Dobrakovo i dr.) i sanitarnih inspektora.',
              'Avio-kompanija (Air Montenegro, Air Serbia, Turkish Airlines i dr.) usljed kargo embarga, istovara Cargo HUM pošiljke zbog ograničenja težine/balansa ili otkazivanja letova.',
              'Rasporeda državnih krematorijuma u Republici Srbiji (JKP Pogrebne usluge Beograd / Novi Sad).',
            ],
          },
          {
            id: 'urgent-waiver',
            pillarBadge: 'Odjeljak 4 • Odricanje od prava na jednostrani raskid (14 dana)',
            heading: '4. Hitno izvršenje i odricanje od zakonskog roka za odustanak',
            statutes: [
              'Zakon o zaštiti potrošača Crne Gore',
              'EU Direktiva 2011/83/EU (čl. 16)',
            ],
            paragraphs: [
              'Budući da koordinacija repatrijacije zahtijeva hitno postupanje odmah po nastupanju smrti (u roku od nekoliko sati) i uključuje izradu i hermetičko lemljenje sanitarne cinkane ambalaže koja se iz zdravstveno-higijenskih razloga ne može ponovo upotrijebiti, Nalogodavac izričito zahtijeva hitan početak izvršenja prije isteka zakonskog roka od 14 dana za ugovore na daljinu.',
              'Nalogodavac potvrđuje da se pravo na odustanak gubi trenutkom započinjanja hitne koordinacije ili nabavke/lemljenja sanitarne opreme.',
            ],
          },
          {
            id: 'informational-tools',
            pillarBadge: 'Odjeljak 5 • Informativni alati',
            heading: '5. Informativni karakter kalkulatora, kontrolnih listi i obrazaca',
            statutes: ['Informativni standard'],
            paragraphs: [
              'Interaktivni alati na sajtu (MortuaryTimeTracker, HotelIncidentProtocol, HomeDeathProtocol, PoaDrafter, DocumentChecklist, DocumentSpecimenViewer) služe isključivo za informativnu orijentaciju i ne zamjenjuju formalno pravno savjetovanje, policijske naloge ili medicinska uputstva.',
            ],
          },
          {
            id: 'governing-law-jurisdiction',
            pillarBadge: 'Odjeljak 6 • Mjerodavno pravo i nadležnost',
            heading: '6. Mjerodavno pravo, obavezna reklamacija i isključiva nadležnost suda',
            statutes: [
              'Materijalno pravo Crne Gore',
              'Isključiva mjesna nadležnost suda u Crnoj Gori',
            ],
            paragraphs: [
              'Ovi uslovi i svi ugovori o nalogu podliježu isključivo materijalnom pravu Crne Gore. Prije pokretanja sudskog postupka obavezan je pisani postupak mirnog rješavanja spora u roku od 30 (trideset) dana.',
              'Za sve neriješene sporove isključivo je nadležan stvarno nadležni sud u Crnoj Gori — Osnovni sud u Kotoru ili Privredni sud Crne Gore u Podgorici. Korisnici i treća lica odriču se pokretanja postupaka pred stranim sudovima u punom obimu dozvoljenom zakonom.',
            ],
          },
        ],
      },
      {
        id: 'legal-privacy',
        path: '/legal/privacy-gdpr/',
        shortTitle: 'Politika privatnosti (ZZPL / GDPR)',
        fullTitle:
          'Politika privatnosti, zaštita podataka o ličnosti i prekogranični prenos podataka',
        subtitle:
          'Usklađenost sa Zakonom o zaštiti podataka o ličnosti Crne Gore (ZZPL) i EU/UK GDPR Uredbom (2016/679).',
        effectiveDate,
        sections: [
          {
            id: 'data-controller',
            pillarBadge: 'Odjeljak 1 • Rukovalac podacima',
            heading: '1. Rukovalac podacima i pravni osnov obrade',
            statutes: [
              'Zakon o zaštiti podataka o ličnosti Crne Gore (ZZPL)',
              'EU / UK GDPR (Regulation 2016/679)',
            ],
            paragraphs: [
              `Rukovalac podacima je ${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${crpsDisplay}; kontakt: office@memorijal.me).`,
              'Podaci preminulih lica: shodno tački 27 Preambule (Recital 27) GDPR-a, evropska pravila zaštite podataka se ne primjenjuju na podatke o ličnosti preminulih lica; uprkos tome, Memorijal d.o.o. čuva svu dokumentaciju preminulog (Potvrda o smrti, uzrok smrti, kopije pasoša) pod strogom profesionalnom povjerljivošću.',
            ],
            bullets: [
              'Podaci živih podnosilaca zahtjeva (srodnika, nalogodavaca, osiguravača) obrađuju se strogo na osnovu čl. 6(1)(b) GDPR (izvršenje ugovora o nalogu), čl. 6(1)(c) (poštovanje sanitarnih i graničnih propisa Crne Gore) i čl. 6(1)(d) (zaštita ključnih interesa u hitnim slučajevima).',
            ],
          },
          {
            id: 'cross-border-transfers',
            pillarBadge: 'Odjeljak 2 • Prekogranični prenos',
            heading: '2. Prekogranični prenos podataka (GDPR čl. 49(1)(b) i (c))',
            statutes: ['GDPR Art. 49(1)(b) & (c)', 'ZZPL Crne Gore'],
            paragraphs: [
              'Podnosilac zahtjeva je izričito obaviješten i saglasan da se dokumentacija neophodna za realizaciju repatrijacije ili kremacije prenosi preko granice sljedećim primaocima:',
            ],
            bullets: [
              'Državnim organima, bolnicama i kapelama u Crnoj Gori (KCCG Podgorica, Opšta bolnica Kotor i dr.), Sanitarnom inspektoratu i matičnim službama.',
              'Državnim krematorijumima u Republici Srbiji (Beograd / Novi Sad) u postupcima kremacije.',
              'Ambasadama, konzulatima, avio-kompanijama (Cargo HUM) i ovlašćenim pogrebnim operaterima u državi odredišta (EU, UK, Ukrajina, Rusija, ZND).',
            ],
          },
          {
            id: 'local-processing',
            pillarBadge: 'Odjeljak 3 • Lokalna obrada bez serverskih baza',
            heading: '3. Nulta pohrana nacrta na serveru (Zero Server-Side Storage)',
            statutes: ['Princip minimizacije podataka'],
            paragraphs: [
              'Interaktivni alati na sajtu (PoaDrafter, DocumentChecklist, CoordinatorModal, GopRequestBuilder) obrađuju uneseni tekst lokalno u pregledaču korisnika (sessionStorage) bez skladištenja u serverskim bazama podataka.',
              'Slanje podataka koordinatoru vrši se isključivo putem kanala koji odabere korisnik (WhatsApp end-to-end enkripcija, mailto: ili direktni telefonski poziv). Korisnik u svakom trenutku može obrisati sve lokalne podatke putem alata „Obriši podatke sesije“ (PrivacyDataWipe).',
            ],
          },
          {
            id: 'privacy-rights',
            pillarBadge: 'Odjeljak 4 • Prava i nadležnost',
            heading: '4. Prava ispitanika i rješavanje sporova',
            statutes: ['GDPR čl. 15–22', 'ZZPL Crne Gore'],
            paragraphs: [
              'Živi podnosioci zahtjeva mogu zatražiti uvid, ispravku ili brisanje svojih kontakt podataka putem office@memorijal.me (rok 30 dana), osim podataka čije čuvanje nalažu poreski i sanitarni propisi Crne Gore.',
              'Svi sporovi podliježu pravu Crne Gore i isključivoj nadležnosti suda u Crnoj Gori (Osnovni sud u Kotoru / Privredni sud Crne Gore u Podgorici) nakon 30-dnevnog pisanog zahtjeva.',
            ],
          },
        ],
      },
      {
        id: 'legal-disclosure',
        path: '/legal/regulatory-disclosure/',
        shortTitle: 'Obavještenje o agencijskom modelu',
        fullTitle:
          'Zakonsko obavještenje o agencijskom modelu, odgovornosti podizvođača i pravima potrošača',
        subtitle:
          'Jasno razgraničenje uloge koordinacione agencije Memorijal d.o.o. u odnosu na licencirane prevoznike, zdravstvene ustanove i proizvođače opreme.',
        effectiveDate,
        sections: [
          {
            id: 'non-carrier-non-retail',
            pillarBadge: 'Odjeljak 1 • Bez sopstvenog voznog parka, maloprodaje i medicine',
            heading:
              '1. Status agencije (bez sopstvenog prevoza, maloprodajnog objekta i medicinske prakse)',
            statutes: [
              'Zakon o komunalnim djelatnostima CG',
              'Zakon o prevozu u drumskom saobraćaju CG',
              'Zakon o vazdušnom saobraćaju CG',
              'Zakon o zdravstvenoj zaštiti CG',
            ],
            paragraphs: [
              `${LEGAL_CREDENTIALS.COMPANY_NAME} posluje pod šiframa djelatnosti ${LEGAL_CREDENTIALS.ACTIVITY_CODES} (${crpsDisplay}; ${vatNotice}). Šifra 96.03 nije pretežna djelatnost, niti društvo obavlja maloprodajnu trgovinu (47.78).`,
            ],
            bullets: [
              'Bez sopstvenog voznog parka i vazduhoplova: Memorijal d.o.o. ne posjeduje pogrebna vozila, sanitete niti vazduhoplove i ne nastupa kao direktni drumski ili avio prevoznik. Fizički transport, lemljenje cinka i avio-kargo prevoz (IATA Cargo HUM) obavljaju isključivo nezavisni, licencirani komunalni/pogrebni operateri, ovlašćeni prevoznici i sertifikovane avio-kompanije.',
              'Bez maloprodajnog objekta: Memorijal d.o.o. nema maloprodajnu prodavnicu niti izložbeni salon pogrebne opreme. Neophodni transportni sanduci, cinkani ulošci i urne nabavljaju se pojedinačno za konkretan slučaj od licenciranih proizvođača kao prolazne stavke (prefakturisanje troškova) po nalogu klijenta.',
              'Bez medicinske djelatnosti: Memorijal d.o.o. ne vrši ljekarske preglede, obdukcije niti kliničko balzamovanje. Sve postmortalne medicinske radnje i Potvrde o smrti izdaju isključivo državne bolnice (KCCG Podgorica, Opšta bolnica Kotor itd.) i licencirani patolozi.',
            ],
          },
          {
            id: 'subcontractor-liability',
            pillarBadge: 'Odjeljak 2 • Odgovornost podizvođača',
            heading: '2. Razgraničenje odgovornosti za rad licenciranih partnera',
            statutes: ['Zakon o obligacionim odnosima CG (čl. 762–765)'],
            paragraphs: [
              'Pri angažovanju licenciranih prevoznika, avio-kompanija, špeditera i državnih krematorijuma u Srbiji u ime Nalogodavca, Memorijal d.o.o. odgovara za savjestan izbor partnera i koordinaciju dokumentacije, dok je ukupna finansijska odgovornost agencije ograničena na stvarno plaćenu neto agencijsku naknadu za koordinaciju.',
            ],
          },
          {
            id: 'consumer-rights-disputes',
            pillarBadge: 'Odjeljak 3 • Prava potrošača i nadležnost',
            heading: '3. Prava potrošača kod hitnih naloga i isključiva nadležnost',
            statutes: [
              'Zakon o zaštiti potrošača CG',
              'EU Direktiva 2011/83/EU (čl. 16)',
            ],
            paragraphs: [
              'Zbog hitnosti postupanja i sanitarne prirode hermetički zalemljene opreme, Nalogodavac zahtjevom za hitan izlazak prihvata prestanak prava na 14-dnevni odustanak nakon početka izvršenja.',
              'Mjerodavno je materijalno pravo Crne Gore, uz obavezan 30-dnevni pisani postupak reklamacije i isključivu nadležnost suda u Crnoj Gori (Osnovni sud u Kotoru / Privredni sud Crne Gore u Podgorici).',
            ],
          },
        ],
      },
    ];
  }

  // English ('en')
  return [
    {
      id: 'legal-terms',
      path: '/legal/terms-of-service/',
      shortTitle: 'Terms of Service & Mandate',
      fullTitle:
        'Public Offer, Mandate Agreement & Terms of Service (Opšti uslovi poslovanja i Ugovor o nalogu)',
      subtitle:
        'Governs the legal relationship between the Client (family, legal representative, or travel insurance assistance provider) and Memorijal d.o.o. under the Law on Obligations of Montenegro (ZOO).',
      effectiveDate,
      sections: [
        {
          id: 'mandate-nature',
          pillarBadge: 'Section 1 • Agency Mandate Nature',
          heading: '1. Nature of Business & Agency Mandate (Ugovor o nalogu i posredovanju)',
          statutes: [
            'Law on Obligations of Montenegro (Zakon o obligacionim odnosima, Art. 757–779)',
            'Activity Codes KD 2010: 82.99 & 52.29',
          ],
          paragraphs: [
            `${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${LEGAL_CREDENTIALS.ACTIVITY_CODES}; ${crpsDisplay}; ${vatNotice}) operates exclusively as an independent administrative, legal, and transport-forwarding coordination agency (case manager).`,
            'All actions before hospitals, mortuaries, municipal civil registries (Matični registar), the Sanitary Inspection (Uprava za inspekcijske poslove), embassies, and customs authorities are executed strictly as an authorized representative acting on behalf of the Client/family under a notarized Power of Attorney (Punomoćje) or formal insurer instruction / Guarantee of Payment (GOP).',
          ],
        },
        {
          id: 'pricing-disbursements',
          pillarBadge: 'Section 2 • Indicative Pricing & Disbursements',
          heading: '2. Non-Binding Pricing Disclaimer & Pass-Through Disbursements (Prefakturisanje)',
          statutes: ['Law on Obligations of Montenegro (Art. 769 — Reimbursement of Mandate Expenses)'],
          paragraphs: [
            'All prices, interactive calculators (RouteEstimator, RemoteSavingsEstimator, MortuaryTimeTracker), and tariff tables displayed on memorijal.me are non-binding indicative reference estimates ("Starting From") and do NOT constitute a binding fixed-price public offer (Ponuda).',
            'A binding financial commitment arises solely upon issuance of an individual written Estimate/Specification and a Formal Mandate Agreement signed or confirmed by the Client or Assistance Insurer (GOP).',
          ],
          bullets: [
            'Invoices clearly separate Memorijal’s Agency Coordination Fee from Reimbursable Third-Party Disbursements (prolazne stavke / prefakturisanje troškova).',
            'Pass-through disbursements include: consular tariffs, state sanitary taxes, hospital mortuary fees, Belgrade/Novi Sad state crematorium fees, airline AWB freight (IATA Cargo HUM), and licensed carrier charges.',
          ],
        },
        {
          id: 'liability-force-majeure',
          pillarBadge: 'Section 3 • Limitation of Liability & Force Majeure',
          heading: '3. Limitation of Liability & Sovereign / Third-Party Force Majeure',
          statutes: ['Law on Obligations of Montenegro (Art. 266–270)'],
          paragraphs: [
            'Memorijal d.o.o.’s maximum aggregate financial liability for any claim arising out of its coordination services is strictly limited to the amount of the net agency coordination fee actually paid by the Client to Memorijal d.o.o. (excluding third-party pass-through disbursements).',
            'Memorijal d.o.o. bears zero liability for delays, schedule changes, or additional mortuary storage costs caused by:',
          ],
          bullets: [
            'State Prosecutors (Više / Osnovno državno tužilaštvo) or police ordering mandatory forensic autopsy (obdukcija) or delaying body release.',
            'Foreign Embassies or Consulates in Podgorica/Belgrade delaying transit permits or operating on holiday schedules.',
            'Border customs authorities (Debeli Brijeg, Dobrakovo, etc.) or Sanitary Inspectors delaying clearance.',
            'Airlines (Air Montenegro, Air Serbia, Turkish Airlines, etc.) imposing cargo embargoes, off-loading Cargo HUM due to aircraft weight/balance or fuselage gauge limits, weather cancellations, or flight rescheduling.',
            'State crematorium schedules in the Republic of Serbia (JKP Pogrebne usluge Beograd / Novi Sad).',
          ],
        },
        {
          id: 'urgent-waiver',
          pillarBadge: 'Section 4 • Urgent Execution & 14-Day Withdrawal Waiver',
          heading: '4. Waiver of 14-Day Consumer Withdrawal Right for Urgent Execution',
          statutes: [
            'Law on Consumer Protection of Montenegro (Zakon o zaštiti potrošača)',
            'EU Directive 2011/83/EU (Art. 16(a), (c) & (e))',
          ],
          paragraphs: [
            'Because repatriation and mortuary coordination require immediate emergency dispatch (within hours of death) and involve custom-sealed sanitary goods (hermetically soldered zinc coffins that cannot be reused for health and hygiene protection reasons), the Client explicitly requests immediate performance prior to the expiration of the statutory 14-day distance-contract withdrawal period.',
            'The Client acknowledges that the statutory right of withdrawal is waived once emergency dispatch or custom sanitary procurement/soldering begins.',
          ],
        },
        {
          id: 'informational-tools',
          pillarBadge: 'Section 5 • Informational Tools',
          heading: '5. Website Calculators, Checklists & Specimens as Informational Tools Only',
          statutes: ['Informational Reference Standard'],
          paragraphs: [
            'Interactive widgets on memorijal.me (MortuaryTimeTracker, HotelIncidentProtocol, HomeDeathProtocol, PoaDrafter, DocumentChecklist, DocumentSpecimenViewer) are provided solely for informational convenience and do not substitute formal legal counsel, police directives, or official medical instructions.',
          ],
        },
        {
          id: 'governing-law-jurisdiction',
          pillarBadge: 'Section 6 • Governing Law & Exclusive Jurisdiction',
          heading: '6. Governing Law, Mandatory Pre-Suit Claim & Exclusive Jurisdiction',
          statutes: [
            'Material Laws of Montenegro',
            'Exclusive Territorial Jurisdiction (Isključiva mjesna nadležnost)',
          ],
          paragraphs: [
            'These Terms and all mandate agreements are governed exclusively by the material laws of Montenegro. Prior to any judicial filing, a mandatory written pre-litigation settlement claim with a 30-day review period is required.',
            'Any unresolved dispute shall be subject to the exclusive jurisdiction of the competent court in Montenegro (Osnovni sud u Kotoru or Privredni sud Crne Gore u Podgorici). Consumers and third parties waive the right to initiate forum-shopping litigation in foreign jurisdictions to the fullest extent permitted by law.',
          ],
        },
      ],
    },
    {
      id: 'legal-privacy',
      path: '/legal/privacy-gdpr/',
      shortTitle: 'Privacy Policy (ZZPL & GDPR)',
      fullTitle:
        'Privacy Policy, Personal Data Protection & Cross-Border Transfer Notice (ZZPL & EU/UK GDPR)',
      subtitle:
        'Dual-regime compliance notice under the Personal Data Protection Law of Montenegro (ZZPL) and EU/UK General Data Protection Regulation (GDPR 2016/679).',
      effectiveDate,
      sections: [
        {
          id: 'data-controller',
          pillarBadge: 'Section 1 • Data Controller & Lawful Basis',
          heading: '1. Data Controller, Deceased Records & Lawful Processing Basis',
          statutes: [
            'Personal Data Protection Law of Montenegro (ZZPL)',
            'EU / UK GDPR (Regulation 2016/679, Recital 27 & Art. 6)',
          ],
          paragraphs: [
            `The data controller is ${LEGAL_CREDENTIALS.COMPANY_NAME} (${LEGAL_CREDENTIALS.HEADQUARTERS}; ${crpsDisplay}; privacy contact: office@memorijal.me).`,
            'Data of the Deceased: Pursuant to Recital 27 of the GDPR, European data protection rules do not apply to the personal data of deceased persons; however, Memorijal d.o.o. protects all deceased records (Potvrda o smrti, medical cause of death, passport copies) under strict professional and institutional confidentiality.',
          ],
          bullets: [
            'Data of Living Applicants (Next-of-Kin / Insurers) is processed strictly under Art. 6(1)(b) GDPR (performance of a mandate contract), Art. 6(1)(c) (compliance with Montenegrin public health & border laws), and Art. 6(1)(d) (vital interests in an emergency).',
          ],
        },
        {
          id: 'cross-border-transfers',
          pillarBadge: 'Section 2 • Cross-Border Transfers',
          heading: '2. Cross-Border Data Transfers (GDPR Art. 49(1)(b) & (c))',
          statutes: ['GDPR Art. 49(1)(b) & (c)', 'ZZPL Montenegro'],
          paragraphs: [
            'The Client explicitly acknowledges and consents that applicant and deceased documents are transmitted across borders strictly as necessary to execute the repatriation or cremation mandate to:',
          ],
          bullets: [
            'State authorities, public hospitals, and mortuaries in Montenegro (KCCG Podgorica, Kotor General Hospital, etc.), the Sanitary Inspection, and Municipal Civil Registries.',
            'State crematoriums in the Republic of Serbia (Belgrade / Novi Sad) when cross-border cremation is instructed.',
            'Designated embassies/consulates, airlines (IATA Cargo HUM), and destination funeral directors in the EU, UK, Ukraine, Russia, or CIS.',
          ],
        },
        {
          id: 'local-processing',
          pillarBadge: 'Section 3 • Zero Server-Side Database Storage',
          heading: '3. Local Browser Draft Processing & Instant Session Purge',
          statutes: ['GDPR Art. 5(1)(c) — Data Minimization'],
          paragraphs: [
            'Interactive tools on memorijal.me (PoaDrafter, DocumentChecklist, CoordinatorModal, GopRequestBuilder) process entered text locally in the user’s browser (memory / sessionStorage) with zero server-side database storage of drafts.',
            'Transmission occurs exclusively via the user’s chosen encrypted channel (WhatsApp end-to-end encryption, mailto:, or direct telephone call). Users can purge all local browser state at any time via the built-in PrivacyDataWipe control.',
          ],
        },
        {
          id: 'privacy-rights',
          pillarBadge: 'Section 4 • Data Subject Rights & Jurisdiction',
          heading: '4. Data Subject Rights & Governing Jurisdiction',
          statutes: ['GDPR Art. 15–22', 'ZZPL Montenegro'],
          paragraphs: [
            'Living applicants may request access, rectification, or erasure of their contact records via office@memorijal.me (30-day response window), subject to mandatory Montenegrin tax and sanitary record retention laws.',
            'All privacy disputes are governed by the laws of Montenegro and subject to the exclusive jurisdiction of the competent court in Montenegro (Osnovni sud u Kotoru / Privredni sud Crne Gore u Podgorici) following a 30-day written notice.',
          ],
        },
      ],
    },
    {
      id: 'legal-disclosure',
      path: '/legal/regulatory-disclosure/',
      shortTitle: 'Regulatory & Agency Disclosure',
      fullTitle:
        'Statutory Agency Disclosure, Subcontractor Liability & Consumer Rights Notice',
      subtitle:
        'Transparent regulatory boundary notice pursuant to Montenegrin Municipal Utility, Road Transport, Aviation, and Health Care statutes.',
      effectiveDate,
      sections: [
        {
          id: 'non-carrier-non-retail',
          pillarBadge: 'Section 1 • Non-Carrier, Non-Retail & Non-Medical Status',
          heading: '1. Non-Carrier, Non-Retail & Non-Medical Statutory Disclaimer',
          statutes: [
            'Zakon o komunalnim djelatnostima CG',
            'Zakon o prevozu u drumskom saobraćaju CG',
            'Zakon o vazdušnom saobraćaju CG',
            'Zakon o zdravstvenoj zaštiti CG',
          ],
          paragraphs: [
            `${LEGAL_CREDENTIALS.COMPANY_NAME} operates exclusively under ${LEGAL_CREDENTIALS.ACTIVITY_CODES} (${crpsDisplay}; ${vatNotice}). Activity code 96.03 is not used as a primary operational code, and retail trade code 47.78 is not conducted.`,
          ],
          bullets: [
            'No In-House Vehicle Fleet or Aircraft: Memorijal d.o.o. does not own or operate hearses, ambulances, or aircraft, and does not act as a direct road or air carrier. All physical road transport, hermetic zinc soldering (lemljenje), and air cargo movements (IATA Cargo HUM) are executed exclusively by independent, licensed funeral utility operators, accredited road carriers, and certified airlines.',
            'No Brick-and-Mortar Retail Store (Nema maloprodajnog objekta): Memorijal d.o.o. does not operate a public retail shop or funeral equipment showroom. Necessary transport containers, zinc liners, and cinerary urns are procured strictly case-by-case from licensed manufacturers/subcontractors as pass-through disbursements (prefakturisanje troškova) under the client’s mandate.',
            'No Medical Practice: Memorijal d.o.o. does not perform medical examinations, forensic pathology, or clinical embalming. All post-mortem medical procedures and certificates (Potvrda o smrti) are issued exclusively by state hospitals (KCCG Podgorica, Opšta bolnica Kotor, etc.) and licensed forensic pathologists.',
          ],
        },
        {
          id: 'subcontractor-liability',
          pillarBadge: 'Section 2 • Subcontractor Boundary',
          heading: '2. Subcontractor Execution & Liability Boundary',
          statutes: ['Law on Obligations of Montenegro (Art. 762–765)'],
          paragraphs: [
            'When engaging licensed carriers, airlines, customs brokers, or state crematoriums in Serbia on the Client’s behalf, Memorijal d.o.o. is responsible for diligent partner selection and documentary coordination. Aggregate financial liability is strictly capped at the net agency coordination fee actually paid to Memorijal d.o.o.',
          ],
        },
        {
          id: 'consumer-rights-disputes',
          pillarBadge: 'Section 3 • Consumer Rights & Exclusive Court',
          heading: '3. Urgent Consumer Waiver & Exclusive Montenegrin Jurisdiction',
          statutes: ['Zakon o zaštiti potrošača CG', 'EU Directive 2011/83/EU (Art. 16)'],
          paragraphs: [
            'Due to emergency dispatch requirements and custom-sealed sanitary goods, the 14-day distance-contract withdrawal right is waived upon the start of urgent coordination or custom zinc procurement/soldering.',
            'Governed exclusively by Montenegrin law, subject to a 30-day mandatory written pre-suit claim and the exclusive jurisdiction of Osnovni sud u Kotoru or Privredni sud Crne Gore u Podgorici.',
          ],
        },
      ],
    },
  ];
}

