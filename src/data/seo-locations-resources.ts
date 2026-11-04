import type { SeoRouteEntry, LocaleSlug, WalkthroughStep, CostBreakdownItem } from './seo-routes.ts';

interface LocationSeed {
  id: string;
  slug: string;
  en: {
    city: string;
    catchmentAreas: string;
    hospitalMorgue: string;
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    h1: string;
    subtitle: string;
    specificFaqQ: string;
    specificFaqA: string;
  };
  ru: {
    cityNom: string;
    cityPrep: string;
    catchmentAreas: string;
    hospitalMorgue: string;
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    h1: string;
    subtitle: string;
    specificFaqQ: string;
    specificFaqA: string;
  };
  mne: {
    cityNom: string;
    cityLoc: string;
    catchmentAreas: string;
    hospitalMorgue: string;
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    h1: string;
    subtitle: string;
    specificFaqQ: string;
    specificFaqA: string;
  };
}

const LOCATION_SEEDS: LocationSeed[] = [
  {
    id: 'location-tivat',
    slug: '/location/tivat/',
    en: {
      city: 'Tivat',
      catchmentAreas: 'Tivat Municipality, Porto Montenegro, Luštica Bay, Donja Lastva, Krašići, Radovići & Tivat Airport (TIV)',
      hospitalMorgue: 'General Hospital Kotor Regional Morgue & Tivat Emergency Medical Unit (Hitna pomoć Tivat)',
      metaTitle: 'Repatriation & Funeral Assistance Tivat Montenegro 24/7',
      metaDesc: '24/7 international repatriation & cremation assistance in Tivat (Porto Montenegro, Luštica Bay, TIV Airport). On-site in 30 mins. +382 68 914 816.',
      keywords: [
        'Funeral assistance Tivat Montenegro',
        'Repatriation of remains Tivat Porto Montenegro',
        'Tivat airport cargo repatriation',
        'English speaking funeral director Tivat',
      ],
      h1: '24/7 International Repatriation & Cremation Assistance in Tivat, Montenegro',
      subtitle: 'Headquartered on the coast, our Tivat duty team responds within 30 minutes across Tivat center, Porto Montenegro, Luštica Bay, and Tivat Airport (TIV)—handling coroner clearance, Kotor Hospital mortuary transfer, Sprovodnica permits, and international air/road dispatch.',
      specificFaqQ: 'What happens if an expat or yacht crew member passes away in Porto Montenegro or Luštica Bay?',
      specificFaqA: 'Our Tivat duty coordinator arrives on site within 30 minutes to liaise with the Tivat Emergency Medical Team (Hitna pomoć) and Police Inspector, transfers the deceased to the regional clinical mortuary in Kotor, and executes all consular and repatriation procedures via Power of Attorney.',
    },
    ru: {
      cityNom: 'Тиват',
      cityPrep: 'Тивате',
      catchmentAreas: 'Тиват, Порто Монтенегро (Porto Montenegro), Луштица Бэй (Luštica Bay), Донья Ластва, Крашичи, аэропорт Тиват (TIV)',
      hospitalMorgue: 'Региональный морг Общей больницы г. Котор и скорая помощь г. Тиват (Dom zdravlja Tivat)',
      metaTitle: 'Ритуальная служба и репатриация в Тивате (Черногория) 24/7',
      metaDesc: 'Круглосуточная помощь при смерти в Тивате (Porto Montenegro, Luštica Bay). Выезд за 30 мин, морг Котора, Груз 200 и кремация. +382 68 914 816.',
      keywords: [
        'Умер человек в Тивате что делать',
        'Ритуальные услуги Тиват Черногория',
        'Репатриация из Тивата Груз 200',
        'Кремация для жителей Тивата',
      ],
      h1: 'Международная репатриация и помощь при смерти близкого в Тивате (24/7)',
      subtitle: 'Наш прибрежный оперативный центр находится в Тивате: выезд координатора за 30 минут в любой район Тивата, Porto Montenegro и Luštica Bay, перевод в региональный морг Котора, оформление Спроводницы и отправка на родину или на кремацию в Белград.',
      specificFaqQ: 'Куда доставляется тело, если смерть наступила дома или в отеле в Тивате?',
      specificFaqA: 'После констатации смерти врачом скорой помощи Тивата (Hitna pomoć) наш спецтранспорт перевозит усопшего в холодильную камеру регионального морга Общей больницы г. Котор, где проводится подготовка и опайка цинка.',
    },
    mne: {
      cityNom: 'Tivat',
      cityLoc: 'Tivtu',
      catchmentAreas: 'Opština Tivat, Porto Montenegro, Luštica Bay, Donja Lastva, Krašići, Radovići i Aerodrom Tivat (TIV)',
      hospitalMorgue: 'Regionalna mrtvačnica Opšte bolnice Kotor i Dom zdravlja / Hitna pomoć Tivat',
      metaTitle: 'Pogrebne usluge i međunarodna repatrijacija Tivat 24/7',
      metaDesc: 'Dežurna služba 24/7 za međunarodni prevoz pokojnika i kremaciju u Tivtu (Porto Montenegro, Luštica Bay). Izlazak za 30 min. +382 68 914 816.',
      keywords: [
        'Pogrebne usluge Tivat Budva međunarodni prevoz',
        'Prevoz pokojnika Tivat inostranstvo',
        'Kremacija Beograd prevoz iz Tivta',
        'Sprovodnica Tivat Kotor',
      ],
      h1: 'Međunarodna repatrijacija i pogrebna asistencija u Tivtu (24/7)',
      subtitle: 'Sa sjedištem u Boki Kotorskoj, naš tim u Tivtu izlazi na lice mjesta u roku od 30 minuta (Tivat, Porto Montenegro, Luštica Bay), vrši prevoz u kapelu Opšte bolnice Kotor i završava cjelokupnu dokumentaciju za inostranstvo ili kremaciju u Beogradu.',
      specificFaqQ: 'Koja je procedura kada strani državljanin premine u Tivtu?',
      specificFaqA: 'Po dolasku Hitne pomoći Tivat i mrtvozornika, preuzimamo preminulo lice specijalnim vozilom u Opštu bolnicu Kotor, prijavljujemo smrt u MUP-u Tivat i pribavljamo Sprovodnicu i konzularnu dozvolu u Podgorici.',
    },
  },
  {
    id: 'location-kotor',
    slug: '/location/kotor/',
    en: {
      city: 'Kotor',
      catchmentAreas: 'Kotor Old Town, Dobrota, Perast, Risan, Prčanj, Morinj, Stoliv & Cruise Port Kotor',
      hospitalMorgue: 'General Hospital Kotor (Opšta bolnica Kotor) & Special Hospital Risan (Specijalna bolnica Risan)',
      metaTitle: 'Kotor Hospital Mortuary Body Repatriation & Cremation 24/7',
      metaDesc: 'Direct 24/7 repatriation from General Hospital Kotor (Opšta bolnica Kotor) & Risan Hospital. Zinc sealing, Sprovodnica & air/road transit. +382 68 914 816.',
      keywords: [
        'What to do if someone dies in Kotor Montenegro',
        'Kotor hospital mortuary body repatriation',
        'Opšta bolnica Kotor repatriation of remains',
        'Cruise ship passenger death Kotor repatriation',
      ],
      h1: 'Kotor Hospital Mortuary (Opšta Bolnica Kotor) Repatriation & Cremation Hub',
      subtitle: 'Direct institutional protocol with General Hospital Kotor (Opšta bolnica Kotor) and Special Hospital Risan. We handle immediate mortuary release, forensic embalming, Republic Sanitary Inspector zinc sealing, and repatriation for tourists, cruise passengers, and expats.',
      specificFaqQ: 'What to do if someone dies at General Hospital Kotor (Opšta bolnica Kotor) or on a cruise ship in Kotor?',
      specificFaqA: 'Call our 24/7 Kotor duty coordinator immediately (+382 68 914 816). We work directly with the pathology department at Opšta bolnica Kotor and port authorities to retrieve the Medical Death Certificate (Potvrda o smrti), register the death at Opština Kotor, and execute air or road repatriation.',
    },
    ru: {
      cityNom: 'Котор',
      cityPrep: 'Которе',
      catchmentAreas: 'Котор, Доброта, Пераст, Рисан, Прчань, Столив, Моринь и Круизный порт Котора',
      hospitalMorgue: 'Морг Общей больницы г. Котор (Opšta bolnica Kotor) и Специальной больницы г. Рисан',
      metaTitle: 'Морг больницы Котора: репатриация и Груз 200 (24/7)',
      metaDesc: 'Оформление документов и отправка тела (Груз 200 / кремация) из морга Общей больницы Котора (Opšta bolnica Kotor) и больницы Рисана. +382 68 914 816.',
      keywords: [
        'Морг Которской больницы отправка тела',
        'Умер человек в Которе что делать',
        'Opšta bolnica Kotor морг документы',
        'Репатриация из Котора Черногория',
      ],
      h1: 'Репатриация и оформление документов в морге Общей больницы г. Котор (Opšta bolnica Kotor)',
      subtitle: 'Прямое оперативное взаимодействие с патологоанатомическим отделением Общей больницы Котора и нейрохирургической больницей в Рисане: получение справки о смерти, бальзамирование, опайка цинка с санитарным инспектором и отправка на родину.',
      specificFaqQ: 'Как забрать документы и организовать отправку тела из морга Которской больницы (Opšta bolnica Kotor)?',
      specificFaqA: 'По вашей дистанционной доверенности наш координатор в Которе получает врачебную справку о смерти (Potvrda o smrti) в больнице Котора, регистрирует смерть в муниципалитете Котора (MUP Kotor) и проводит герметичную опайку цинка непосредственно перед отправкой.',
    },
    mne: {
      cityNom: 'Kotor',
      cityLoc: 'Kotoru',
      catchmentAreas: 'Opština Kotor, Dobrota, Perast, Risan, Prčanj, Stoliv, Morinj i Luka Kotor',
      hospitalMorgue: 'Opšta bolnica Kotor (Bolnička mrtvačnica) i Specijalna bolnica „Vaso Ćuković“ Risan',
      metaTitle: 'Opšta bolnica Kotor: Međunarodni prevoz pokojnika 24/7',
      metaDesc: 'Preuzimanje iz kapele Opšte bolnice Kotor i bolnice u Risnu, lemljenje cinka, Sprovodnica i međunarodna repatrijacija ili kremacija. +382 68 914 816.',
      keywords: [
        'Opšta bolnica Kotor prevoz pokojnika',
        'Limeni uložak lemljenje Kotor Podgorica',
        'Pogrebne usluge Kotor međunarodni prevoz',
        'Specijalna bolnica Risan prevoz umrlih',
      ],
      h1: 'Međunarodna repatrijacija i preuzimanje iz Opšte bolnice Kotor i bolnice u Risnu',
      subtitle: 'Direktan operativni protokol sa Opštom bolnicom Kotor i Specijalnom bolnicom u Risnu: preuzimanje Potvrde o smrti, upis u Matični registar Kotor, hermetičko lemljenje cinka sa sanitarnim inspektorom i međunarodni transport.',
      specificFaqQ: 'Da li vršite lemljenje cink sanduka i plombiranje direktno u Kotoru?',
      specificFaqA: 'Da. U kapeli Opšte bolnice Kotor vršimo kompletnu pripremu i hermetičko lemljenje limenog uloška u prisustvu nadležnog republičkog sanitarnog inspektora za Boku Kotorsku.',
    },
  },
  {
    id: 'location-budva',
    slug: '/location/budva/',
    en: {
      city: 'Budva',
      catchmentAreas: 'Budva Riviera, Bečići, Rafailovići, Sveti Stefan, Pržno, Petrovac & Jaz',
      hospitalMorgue: 'Budva Emergency Medical Center (Dom zdravlja Budva) → General Hospital Kotor / Cetinje / KCCG Morgue',
      metaTitle: 'Repatriation & Funeral Assistance Budva Montenegro 24/7',
      metaDesc: '24/7 emergency repatriation & cremation assistance in Budva, Bečići, Sveti Stefan & Petrovac. Tourist & expat specialists. Call +382 68 914 816.',
      keywords: [
        'What to do if someone dies in Budva Montenegro',
        'Repatriation of remains Budva Montenegro',
        'Funeral assistance Budva Petrovac Sveti Stefan',
        'Travel insurance repatriation Budva',
      ],
      h1: '24/7 Repatriation & Cremation Assistance in Budva (Bečići, Sveti Stefan, Petrovac)',
      subtitle: 'Rapid 45-minute response across the entire Budva Riviera for tourists, expat residents, and travel insurance officers. Because Budva has no inpatient clinical hospital, we manage immediate transfer to Kotor or KCCG clinical mortuary and execute all international permits.',
      specificFaqQ: 'Why are deceased persons in Budva transferred to Kotor or Podgorica?',
      specificFaqA: 'Budva has a municipal health center (Dom zdravlja) but no clinical hospital mortuary. Following death verification in Budva, we immediately transport the deceased by refrigerated vehicle to General Hospital Kotor or KCCG Podgorica (if a forensic autopsy is ordered) and register the death at Opština Budva.',
    },
    ru: {
      cityNom: 'Будва',
      cityPrep: 'Будве',
      catchmentAreas: 'Будва, Бечичи, Рафаиловичи, Свети-Стефан, Пржно, Петровац, Ластва Грбальска',
      hospitalMorgue: 'Скорая помощь Будвы (Dom zdravlja Budva) → Региональный морг Котора или KCCG Подгорица',
      metaTitle: 'Умер человек в Будве: репатриация и кремация 24/7',
      metaDesc: 'Круглосуточная помощь при смерти в Будве, Бечичи, Петроваце. Выезд за 45 минут, оформление в ЗАГСе Будвы, Груз 200 и кремация в Сербии. +382 68 914 816.',
      keywords: [
        'Умер человек в Будве Тивате что делать',
        'Ритуальные услуги Будва Черногория',
        'Репатриация из Будвы в Россию Украину ЕС',
        'Кремация для жителей Будвы',
      ],
      h1: 'Экстренная помощь при смерти близкого и международная репатриация в Будве (24/7)',
      subtitle: 'Выезд дежурного координатора в Будву, Бечичи, Рафаиловичи, Свети-Стефан и Петровац в течение 45 минут. Берем на себя взаимодействие с полицией и врачами Будвы, перевозку в клинический морг Котора/Подгорицы, регистрацию в Opština Budva и отправку на родину.',
      specificFaqQ: 'Что делать в первые часы, если человек умер в квартире или отеле в Будве?',
      specificFaqA: 'Позвоните на нашу круглосуточную линию +382 68 914 816. Мы координируем выезд бригады скорой помощи Будвы (Hitna pomoć) и дежурного инспектора для выдачи первичного акта осмотра, после чего перевозим усопшего в клинический морг Котора и оформляем все документы по доверенности.',
    },
    mne: {
      cityNom: 'Budva',
      cityLoc: 'Budvi',
      catchmentAreas: 'Opština Budva, Bečići, Rafailovići, Sveti Stefan, Pržno, Petrovac',
      hospitalMorgue: 'Dom zdravlja / Hitna pomoć Budva → Regionalna mrtvačnica Opšte bolnice Kotor ili KCCG',
      metaTitle: 'Međunarodni prevoz pokojnika i pogrebne usluge Budva 24/7',
      metaDesc: 'Hitna asistencija 24/7 u Budvi, Bečićima i Petrovcu: preuzimanje preminulih, Sprovodnica, međunarodna repatrijacija i kremacija. +382 68 914 816.',
      keywords: [
        'Pogrebne usluge Tivat Budva međunarodni prevoz',
        'Prevoz pokojnika Budva inostranstvo',
        'Kremacija Beograd prevoz iz Budve',
        'Sprovodnica Budva',
      ],
      h1: 'Međunarodna repatrijacija i pogrebna asistencija u Budvi (Bečići, Sveti Stefan, Petrovac)',
      subtitle: 'Dežurna ekipa stiže na bilo koju lokaciju u opštini Budva u roku od 45 minuta, vrši zakonski prevoz u bolničku kapelu Kotor ili KCCG Podgorica, završava upis u Matični registar Budva i organizuje prevoz u inostranstvo ili na kremaciju.',
      specificFaqQ: 'Gdje se vrši smještaj i priprema preminulog lica iz Budve?',
      specificFaqA: 'S obzirom da Budva nema bolničku mrtvačnicu sa rashladnim komorama za međunarodnu pripremu, naše vozilo odmah po pregledu mrtvozornika prevozi pokojnika u Opštu bolnicu Kotor ili KCCG Podgorica, dok u Opštini Budva vadimo međunarodni izvod o smrti.',
    },
  },
  {
    id: 'location-podgorica',
    slug: '/location/podgorica/',
    en: {
      city: 'Podgorica',
      catchmentAreas: 'Podgorica Capital City, Clinical Center of Montenegro (KCCG), Diplomatic Quarter, Podgorica Airport (TGD), Danilovgrad & Cetinje',
      hospitalMorgue: 'Clinical Center of Montenegro (KCCG — Center for Pathology & Forensic Medicine)',
      metaTitle: 'KCCG Podgorica Repatriation, Consular & Cargo HUM Hub 24/7',
      metaDesc: '24/7 repatriation from Clinical Center of Montenegro (KCCG Podgorica). Direct forensic clearance, Embassy permits & TGD Airport Cargo HUM. +382 68 914 816.',
      keywords: [
        'KCCG Podgorica repatriation of remains',
        'Podgorica airport Cargo HUM repatriation',
        'Embassy mortuary passport Podgorica',
        'Forensic pathology KCCG Podgorica release',
      ],
      h1: 'Podgorica Repatriation Hub — KCCG Clinical Center, Embassies & TGD Airport Cargo',
      subtitle: 'Our central legal and clinical coordination desk in Podgorica operates directly with the Center for Pathology & Forensic Medicine at KCCG, Basic Court (Apostille), Ministry of Health Sanitary Inspection, all foreign Embassies, and Podgorica Airport (TGD) Cargo terminal.',
      specificFaqQ: 'How do you handle cases referred to KCCG Podgorica for forensic autopsy (Sudska medicina)?',
      specificFaqA: 'Whenever an accidental or sudden death in Montenegro requires a forensic autopsy at KCCG Podgorica, our Podgorica legal coordinators liaise directly with the state prosecutor and forensic pathologist to obtain the release order, autopsy certificate, and embalming clearance without delay.',
    },
    ru: {
      cityNom: 'Подгорица',
      cityPrep: 'Подгорице',
      catchmentAreas: 'Подгорица, Клинический центр Черногории (KCCG), Посольский квартал, Аэропорт Подгорица (TGD), Цетинье, Даниловград',
      hospitalMorgue: 'Клинический центр Черногории (KCCG Podgorica — Отделение патологии и судебной медицины)',
      metaTitle: 'Репатриация из KCCG Подгорица и аэропорта TGD 24/7',
      metaDesc: 'Оформление в морге KCCG Подгорица, судебно-медицинская экспертиза, все посольства и отправка Груза 200 из аэропорта TGD. +382 68 914 816.',
      keywords: [
        'Морг KCCG Подгорица репатриация',
        'Отправка Груза 200 аэропорт Подгорица',
        'Судебная медицина Подгорица документы о смерти',
        'Ритуальные услуги Подгорица Черногория',
      ],
      h1: 'Центральный хаб репатриации в Подгорице: KCCG, Посольства и Аэропорт TGD',
      subtitle: 'Прямая работа с Центром патологии и судебной медицины Клинического центра Черногории (KCCG Podgorica), проставление Апостиля в суде Подгорицы, получение разрешений во всех посольствах и приоритетная отправка через грузовой терминал аэропорта TGD.',
      specificFaqQ: 'Что делать, если тело направили на судебно-медицинскую экспертизу (обдукцию) в KCCG Подгорица?',
      specificFaqA: 'Все судебно-медицинские вскрытия с побережья и центра Черногории проводятся в KCCG Подгорица. Наш представитель в Подгорице контролирует выход медицинского заключения, организует бальзамирование и опайку цинка прямо в KCCG и в тот же день подает документы в посольство.',
    },
    mne: {
      cityNom: 'Podgorica',
      cityLoc: 'Podgorici',
      catchmentAreas: 'Glavni grad Podgorica, Klinički centar Crne Gore (KCCG), Aerodrom Podgorica (TGD), Cetinje i Danilovgrad',
      hospitalMorgue: 'Klinički centar Crne Gore (KCCG — Centar za patologiju i sudsku medicinu)',
      metaTitle: 'KCCG Podgorica: Međunarodna repatrijacija i Cargo HUM 24/7',
      metaDesc: 'Preuzimanje iz KCCG Podgorica (Sudska medicina i patologija), Apostille, sve ambasade, Sprovodnica i Cargo HUM sa aerodroma Podgorica. +382 68 914 816.',
      keywords: [
        'KCCG Podgorica prevoz pokojnika',
        'Sudska medicina Podgorica preuzimanje',
        'Limeni uložak lemljenje Kotor Podgorica',
        'Cargo HUM aerodrom Podgorica',
      ],
      h1: 'Centralni centar za međunarodnu repatrijaciju u Podgorici (KCCG, Ambasade i Aerodrom TGD)',
      subtitle: 'Direktna koordinacija sa Centrom za sudsku medicinu i patologiju KCCG Podgorica, Osnovnim sudom, Sanitarnom inspekcijom, diplomatsko-konzularnim predstavništvima i kargo terminalom Aerodroma Podgorica (TGD).',
      specificFaqQ: 'Koliko brzo preuzimate dokumentaciju nakon obdukcije na Sudskoj medicini u KCCG Podgorica?',
      specificFaqA: 'Naš tim u Podgorici svakodnevno koordinira sa KCCG-om: odmah po završetku obdukcije preuzimamo Potvrdu o smrti, vršimo zakonsko opremanje i lemljenje cinka i istog dana predajemo zahtjev za Sprovodnicu i ambasadu.',
    },
  },
  {
    id: 'location-herceg-novi',
    slug: '/location/herceg-novi/',
    en: {
      city: 'Herceg Novi',
      catchmentAreas: 'Herceg Novi, Igalo (Institute Dr. Simo Milošević), Meljine, Zelenika, Kumbor, Portonovi, Bijela & Kamenari',
      hospitalMorgue: 'Meljine Hospital / Igalo Institute & General Hospital Kotor Regional Morgue',
      metaTitle: 'Repatriation & Funeral Services Herceg Novi & Igalo 24/7',
      metaDesc: '24/7 international repatriation from Herceg Novi, Igalo, Portonovi & Meljine. Close to Dubrovnik Airport (DBV) & Croatia/Serbia borders. +382 68 914 816.',
      keywords: [
        'Repatriation Herceg Novi Montenegro',
        'Funeral assistance Herceg Novi Igalo Portonovi',
        'Consulate of Serbia Herceg Novi Sprovodnica',
        'Dubrovnik airport repatriation from Herceg Novi',
      ],
      h1: '24/7 International Repatriation & Cremation Assistance in Herceg Novi (Igalo & Portonovi)',
      subtitle: 'Serving Herceg Novi, Institute Igalo, Meljine Hospital, Portonovi Resort, and Bijela. Strategic proximity to the Croatia/EU border (Debeli Brijeg), Dubrovnik Airport (DBV), and the Consulate General of Serbia in Herceg Novi.',
      specificFaqQ: 'Can air repatriation from Herceg Novi depart via Dubrovnik Airport (DBV) or Tivat/Podgorica?',
      specificFaqA: 'Yes. Because Herceg Novi borders Croatia, we can clear either Podgorica Airport (TGD) or transit Debeli Brijeg border to Dubrovnik Airport (DBV) for direct EU/UK flights, as well as process Serbian clearances right at the Consulate General in Herceg Novi.',
    },
    ru: {
      cityNom: 'Херцег-Нови',
      cityPrep: 'Херцег-Нови',
      catchmentAreas: 'Херцег-Нови, Игало (Институт Симо Милошевича), Мелине, Зеленика, Кумбор, Портонови (Portonovi), Биела',
      hospitalMorgue: 'Госпиталь Мелине (Bolnica Meljine), Институт Игало и региональный морг г. Котор',
      metaTitle: 'Репатриация и ритуальные услуги в Херцег-Нови и Игало 24/7',
      metaDesc: 'Круглосуточная помощь при смерти в Херцег-Нови, Игало, Портонови. Оформление в Генконсульстве Сербии, Груз 200 и кремация в Белграде. +382 68 914 816.',
      keywords: [
        'Репатриация из Херцег-Нови Черногория',
        'Умер человек в Херцег-Нови Игало что делать',
        'Консульство Сербии в Херцег-Нови спровдница',
        'Кремация из Херцег-Нови в Белград',
      ],
      h1: 'Международная репатриация и кремация в Херцег-Нови (Игало, Мелине, Портонови) 24/7',
      subtitle: 'Оперативный выезд в Херцег-Нови, Институт Игало, госпиталь Мелине, Портонови и Биелу. Быстрое оформление транзитных документов через Генконсульство Сербии в Херцег-Нови, наземный выезд в ЕС через границу Дебели-Бриег или авиаотправка из Подгорицы.',
      specificFaqQ: 'Как быстро оформляется отправка на кремацию в Белград из Херцег-Нови?',
      specificFaqA: 'В Херцег-Нови расположено Генеральное консульство Республики Сербия, что позволяет нашим координаторам оформить консульские документы для кремации или репатриации в Сербию в максимально сжатые сроки — за 24 часа.',
    },
    mne: {
      cityNom: 'Herceg Novi',
      cityLoc: 'Herceg Novom',
      catchmentAreas: 'Opština Herceg Novi, Igalo (Institut Dr Simo Milošević), Meljine, Zelenika, Kumbor, Portonovi i Bijela',
      hospitalMorgue: 'Bolnica Meljine, Institut Igalo i Regionalna mrtvačnica Opšte bolnice Kotor',
      metaTitle: 'Međunarodni prevoz pokojnika i kremacija Herceg Novi 24/7',
      metaDesc: 'Dežurna služba 24/7 za međunarodnu repatrijaciju i prevoz za Srbiju, BiH, Hrvatsku i EU iz Herceg Novog, Igala i Meljina. +382 68 914 816.',
      keywords: [
        'Prevoz pokojnika Herceg Novi inostranstvo',
        'Generalni konzulat Srbije Herceg Novi sprovodnica',
        'Pogrebne usluge Herceg Novi Igalo',
        'Prevoz umrlih Bolnica Meljine Igalo',
      ],
      h1: 'Međunarodna repatrijacija i prevoz pokojnika u Herceg Novom (Igalo, Meljine, Portonovi)',
      subtitle: 'Brz izlazak u Herceg Novom, Institutu Igalo i Bolnici Meljine, direktna saradnja sa Generalnim konzulatom Republike Srbije u Herceg Novom i prioritetan prevoz preko graničnih prelaza Sitnica (BiH), Debeli Brijeg (Hrvatska/EU) ili za Beograd.',
      specificFaqQ: 'Da li završavate dokumentaciju u Generalnom konzulatu Srbije u Herceg Novom?',
      specificFaqA: 'Da. Za prevoz pokojnika ili kremaciju u Srbiji, naš tim direktno u Generalnom konzulatu Republike Srbije u Herceg Novom završava konzularnu proceduru u najkraćem zakonskom roku.',
    },
  },
  {
    id: 'location-bar',
    slug: '/location/bar/',
    en: {
      city: 'Bar',
      catchmentAreas: 'Bar Municipality, Stari Bar, Šušanj, Sutomore, Dobra Voda, Čanj, Petrovac & Ulcinj',
      hospitalMorgue: 'General Hospital "Blažo Orlandić" Stari Bar (Opšta bolnica Bar)',
      metaTitle: 'General Hospital Bar Repatriation & Cremation Services 24/7',
      metaDesc: '24/7 repatriation of remains from General Hospital Bar, Sutomore & Ulcinj. Sprovodnica, zinc sealing & air/road transit. +382 68 914 816.',
      keywords: [
        'General Hospital Bar Montenegro repatriation',
        'Opšta bolnica Bar mortuary repatriation',
        'Repatriation of remains Bar Sutomore Ulcinj',
        'Funeral assistance Bar Montenegro',
      ],
      h1: 'General Hospital Bar (Opšta Bolnica Bar) Repatriation & Cremation Hub — Southern Coast',
      subtitle: 'Direct coordination with General Hospital "Blažo Orlandić" in Stari Bar, serving Bar, Sutomore, Dobra Voda, and Ulcinj. We execute hospital mortuary release, sanitary inspection zinc sealing, and rapid transfer to Podgorica Airport (45 mins via Sozina tunnel) or cross-border road corridors.',
      specificFaqQ: 'How fast can you transfer from General Hospital Bar (Opšta bolnica Bar) to Podgorica Embassies and TGD Airport?',
      specificFaqA: 'General Hospital Bar is only 40 minutes from Podgorica Airport (TGD) via the Sozina tunnel. Our team collects the Medical Death Certificate at Opšta bolnica Bar, registers the death at Opština Bar, and completes consular legalization in Podgorica on the same day.',
    },
    ru: {
      cityNom: 'Бар',
      cityPrep: 'Баре',
      catchmentAreas: 'Бар, Стари-Бар, Шушань, Сутоморе, Добра-Вода, Утеха, Чань и Улцинь',
      hospitalMorgue: 'Общая больница «Блажо Орландич» г. Бар (Opšta bolnica Stari Bar)',
      metaTitle: 'Больница г. Бар (Черногория): репатриация и кремация 24/7',
      metaDesc: 'Круглосуточная помощь при смерти в Баре, Сутоморе и Улцине. Оформление в морге больницы Стари-Бар, Груз 200 и кремация. +382 68 914 816.',
      keywords: [
        'Больница Стари Бар морг репатриация',
        'Умер человек в Баре Сутоморе что делать',
        'Ритуальные услуги Бар Черногория',
        'Груз 200 из Бара Черногория',
      ],
      h1: 'Международная репатриация и оформление в Общей больнице г. Бар (Opšta bolnica Bar)',
      subtitle: 'Прямая работа с региональной больницей «Блажо Орландич» в Старом Баре (обслуживающей Бар, Сутоморе, Добра-Воду и Улцинь): получение врачебного свидетельства о смерти, опайка цинка, Спроводница и быстрая доставка в аэропорт Подгорицы (40 минут через тоннель Созина) или на кремацию в Белград.',
      specificFaqQ: 'Относятся ли Сутоморе и Улцинь к моргу Общей больницы города Бар?',
      specificFaqA: 'Да, Общая больница в Старом Баре (Opšta bolnica Bar) является главным стационаром для всего южного побережья (Бар, Сутоморе, Улцинь). Мы оформляем все медицинские и муниципальные документы непосредственно в Баре по вашей доверенности.',
    },
    mne: {
      cityNom: 'Bar',
      cityLoc: 'Baru',
      catchmentAreas: 'Opština Bar, Stari Bar, Šušanj, Sutomore, Dobra Voda, Čanj i Opština Ulcinj',
      hospitalMorgue: 'Opšta bolnica „Blažo Orlandić“ Stari Bar',
      metaTitle: 'Opšta bolnica Bar: Međunarodna repatrijacija i prevoz 24/7',
      metaDesc: 'Preuzimanje iz Opšte bolnice Stari Bar, Sutomora i Ulcinja. Sanitarna Sprovodnica, lemljenje cinka, avio Cargo HUM i kremacija u Beogradu. +382 68 914 816.',
      keywords: [
        'Opšta bolnica Bar prevoz pokojnika',
        'Pogrebne usluge Bar Ulcinj međunarodni prevoz',
        'Sprovodnica Bar Crna Gora',
        'Kremacija Beograd prevoz iz Bara',
      ],
      h1: 'Međunarodna repatrijacija i preuzimanje iz Opšte bolnice „Blažo Orlandić“ Bar (Južno primorje)',
      subtitle: 'Kompletna koordinacija sa Opštom bolnicom u Starom Baru za područje Bara, Sutomora i Ulcinja: preuzimanje Potvrde o smrti, upis u Matični registar Bar, hermetičko lemljenje cinka i brz transport ka Aerodromu Podgorica ili graničnim prelazima.',
      specificFaqQ: 'Da li pokrivate i opštinu Ulcinj i Sutomore?',
      specificFaqA: 'Da, naš tim za južno primorje pokriva cijelu opštinu Bar, Sutomore i Ulcinj, uz direktno rješavanje bolničke dokumentacije u Opštoj bolnici Stari Bar.',
    },
  },
];

function buildLocationWalkthrough(locale: LocaleSlug, seed: LocationSeed): WalkthroughStep[] {
  if (locale === 'ru') {
    return [
      {
        stepNumber: '01',
        title: `Выезд координатора в г. ${seed.ru.cityNom} (30–60 минут)`,
        authority: seed.ru.hospitalMorgue,
        timeframe: '0 – 1 час',
        description: `Прибытие дежурной бригады в ${seed.ru.cityPrep} (${seed.ru.catchmentAreas}), координация с врачом и полицией, размещение в клиническом морге.`,
      },
      {
        stepNumber: '02',
        title: `Регистрация смерти в муниципалитете (Opština ${seed.en.city})`,
        authority: `МВД и ЗАГС (Matični registar ${seed.en.city})`,
        timeframe: '4 – 12 часов',
        description: 'Получение врачебной справки о смерти и международного свидетельства Формы C по дистанционной доверенности от семьи.',
      },
      {
        stepNumber: '03',
        title: 'Бальзамирование, опайка цинка (Lemljenje) и Sprovodnica',
        authority: 'Санитарная инспекция Черногории',
        timeframe: 'День 1 – 2',
        description: 'Танатопраксия, герметичная опайка цинкового гроба при санитарном инспекторе и выдача санитарного паспорта Sprovodnica.',
      },
      {
        stepNumber: '04',
        title: 'Апостиль, судебный перевод и разрешение посольства',
        authority: 'Основной суд и Посольства в Подгорице',
        timeframe: '24 – 36 часов',
        description: 'Легализация документов штампом Апостиль, заверенный перевод (Sudski tumač) и оформление консульского пропуска Laissez-Passer.',
      },
      {
        stepNumber: '05',
        title: 'Отправка (Авиа Cargo HUM / Спецкатафалк / Кремация в Белграде)',
        authority: 'Аэропорт TGD/TIV или пограничный терминал',
        timeframe: 'По расписанию',
        description: 'Доставка в аэропорт вылета, прямой наземный рейс в ЕС/СНГ или трансфер в государственный крематорий Белграда с возвратом урны.',
      },
    ];
  }

  if (locale === 'mne') {
    return [
      {
        stepNumber: '01',
        title: `Izlazak dežurne ekipe u ${seed.mne.cityLoc} (30–60 minuta)`,
        authority: seed.mne.hospitalMorgue,
        timeframe: '0 – 1 sat',
        description: `Trenutni dolazak koordinatora na područje: ${seed.mne.catchmentAreas}, preuzimanje i smještaj u bolničku mrtvačnicu.`,
      },
      {
        stepNumber: '02',
        title: `Prijava smrti i Matični registar (${seed.mne.cityNom})`,
        authority: `MUP — Područna jedinica ${seed.mne.cityNom}`,
        timeframe: '4 – 12 sati',
        description: 'Pribavljanje Potvrde o smrti i međunarodnog izvoda iz matične knjige umrlih (Obrazac C) po punomoćju porodice.',
      },
      {
        stepNumber: '03',
        title: 'Balzamovanje, lemljenje cinka i Sprovodnica',
        authority: 'Republička sanitarna inspekcija Crne Gore',
        timeframe: 'Dan 1 – 2',
        description: 'Sanitarna priprema, hermetičko lemljenje limenog uloška uz državnu plombu i izdavanje sanitarne Sprovodnice.',
      },
      {
        stepNumber: '04',
        title: 'Apostille, sudski tumač i konzularna dozvola',
        authority: 'Osnovni sud i Ambasade u Podgorici / Herceg Novom',
        timeframe: '24 – 36 sati',
        description: 'Ovjera dokumenata, prevod sudskog tumača i pribavljanje konzularnog Laissez-Passer dokumenta.',
      },
      {
        stepNumber: '05',
        title: 'Međunarodni transport (Cargo HUM / Drumski / Kremacija)',
        authority: 'Aerodrom Podgorica (TGD) / Granični prelazi',
        timeframe: 'Po redu leta / vožnje',
        description: 'Otprema sa aerodroma, direktan drumski prevoz u inostranstvo ili transport na kremaciju u Beograd.',
      },
    ];
  }

  return [
    {
      stepNumber: '01',
      title: `Rapid On-Site Dispatch in ${seed.en.city} (30–60 Minutes)`,
      authority: seed.en.hospitalMorgue,
      timeframe: '0 – 1 Hour',
      description: `Immediate coordinator attendance across ${seed.en.catchmentAreas}, medical examiner liaison, and clinical mortuary transfer.`,
    },
    {
      stepNumber: '02',
      title: `Municipal Death Registration (Opština ${seed.en.city})`,
      authority: `Ministry of Interior Civil Registry — ${seed.en.city}`,
      timeframe: '4 – 12 Hours',
      description: 'Retrieval of the Medical Cause of Death Certificate (Potvrda o smrti) and multilingual Form C extract via remote Power of Attorney.',
    },
    {
      stepNumber: '03',
      title: 'Forensic Embalming, Zinc Soldering (Lemljenje) & Sprovodnica',
      authority: 'Montenegro Republic Sanitary Inspection',
      timeframe: 'Day 1 – 2',
      description: 'Clinical preparation, hermetic soldering of the zinc coffin liner in the presence of the Sanitary Inspector, and Sprovodnica issuance.',
    },
    {
      stepNumber: '04',
      title: 'Hague Apostille, Court Translation & Embassy Permit',
      authority: 'Basic Court & Foreign Embassies in Podgorica',
      timeframe: '24 – 36 Hours',
      description: 'Court legalization, sworn translation by a certified court interpreter (Sudski tumač), and Embassy Laissez-Passer clearance.',
    },
    {
      stepNumber: '05',
      title: 'International Handover (Air Cargo HUM / Road / Belgrade Cremation)',
      authority: 'Podgorica (TGD) / Tivat (TIV) or Border Customs',
      timeframe: 'Scheduled Window',
      description: 'Priority airport cargo departure, door-to-door European hearse transit, or cross-border cremation transfer to Belgrade with urn return.',
    },
  ];
}

function buildLocationCosts(locale: LocaleSlug, cityLabel: string): CostBreakdownItem[] {
  if (locale === 'ru') {
    return [
      {
        item: `Выезд спецтранспорта в г. ${cityLabel}, морг и государственные пошлины`,
        includedStatus: 'Фиксированный тариф',
        referenceCost: 'Od 220 €',
        detail: 'Круглосуточный выезд, холодильная камера морга, пошлины ЗАГСа, Апостиль и Sprovodnica.',
      },
      {
        item: 'Санитарная подготовка, бальзамирование и цинковый гроб (Lemljenje)',
        includedStatus: 'Стандарт IATA / ЕС',
        referenceCost: 'Od 750 €',
        detail: 'Полная танатопраксия, оцинкованный вкладыш, деревянный гроб и пломба инспектора.',
      },
      {
        item: 'Судебные переводы (Sudski tumač) и консульская легализация в Подгорице',
        includedStatus: 'По доверенности',
        referenceCost: 'Od 190 €',
        detail: 'Перевод всех медицинских и муниципальных актов без участия родственников.',
      },
      {
        item: 'Международная перевозка (Авиа Cargo HUM / Спецкатафалк / Кремация)',
        includedStatus: 'По выбранному маршруту',
        referenceCost: 'Od 650 €',
        detail: 'Зависит от выбранного направления: кремация в Белграде, авто в ЕС/СНГ или авиаперелет.',
      },
    ];
  }

  if (locale === 'mne') {
    return [
      {
        item: `Preuzimanje u opštini ${cityLabel}, bolnička kapela i državne takse`,
        includedStatus: 'Fiksno po cjenovniku',
        referenceCost: 'Od 220 €',
        detail: 'Dežurni izlazak 24/7, troškovi mrtvačnice, takse MUP-a, Apostille i sanitarna Sprovodnica.',
      },
      {
        item: 'Sanitarna obrada, balzamovanje i limeni (cink) uložak sa lemljenjem',
        includedStatus: 'IATA / EU standard',
        referenceCost: 'Od 750 €',
        detail: 'Kompletna priprema, atestirani cink uložak, drveni sanduk i plomba sanitarnog inspektora.',
      },
      {
        item: 'Prevodi sudskog tumača i konzularna sprovodnica u Podgorici',
        includedStatus: 'Po punomoćju',
        referenceCost: 'Od 190 €',
        detail: 'Završavanje svih konzularnih i sudskih procedura bez dolaska porodice.',
      },
      {
        item: 'Međunarodni prevoz (Cargo HUM / Drumski transport / Kremacija Beograd)',
        includedStatus: 'Prema odredištu',
        referenceCost: 'Od 650 €',
        detail: 'U zavisnosti od odabrane destinacije (Srbija, region, EU, UK ili ZND).',
      },
    ];
  }

  return [
    {
      item: `24/7 Collection in ${cityLabel}, Clinical Mortuary & Statutory Permits`,
      includedStatus: '100% Included',
      referenceCost: 'Od 220 €',
      detail: 'Immediate coastal/municipal transfer, hospital morgue refrigeration, Form C registry, Apostille & Sprovodnica.',
    },
    {
      item: 'Forensic Embalming, Export Casket & Hermetic Zinc Sealing (Lemljenje)',
      includedStatus: 'IATA & Berlin Convention',
      referenceCost: 'Od 750 €',
      detail: 'Certified thanatopraxy, galvanized zinc liner, wooden casket, and Republic Sanitary Inspector seal.',
    },
    {
      item: 'Sworn Court Translations (Sudski tumač) & Podgorica Embassy Clearance',
      includedStatus: 'Executed via Remote PoA',
      referenceCost: 'Od 190 €',
      detail: 'Complete diplomatic legalization in Podgorica without requiring family travel.',
    },
    {
      item: 'International Dispatch (Air Cargo HUM / EU Hearse / Belgrade Cremation)',
      includedStatus: 'Route-Specific Tariff',
      referenceCost: 'Od 650 €',
      detail: 'Itemized according to destination (Belgrade Crematorium, UK/EU Air Cargo, or European Road Hearse).',
    },
  ];
}

export const LOCATION_ROUTES: SeoRouteEntry[] = LOCATION_SEEDS.map((seed) => ({
  id: seed.id,
  category: 'location',
  path: seed.slug,
  priority: 0.85,
  changefreq: 'weekly',
  lastmod: '2026-11-03',
  locales: {
    en: {
      metaTitle: seed.en.metaTitle,
      metaDescription: seed.en.metaDesc,
      keywords: seed.en.keywords,
      breadcrumbLabel: `${seed.en.city} Hub`,
      eyebrow: `MUNICIPAL & HOSPITAL CATCHMENT HUB • ${seed.en.city.toUpperCase()}, MONTENEGRO`,
      h1: seed.en.h1,
      heroSubtitle: seed.en.subtitle,
      whatsappPrefill: `Hello Memorijal d.o.o., I need 24/7 assistance in ${seed.en.city}, Montenegro.`,
      emergencyBannerText: `Coordinator on site in ${seed.en.city} & ${seed.en.hospitalMorgue.split('&')[0]} within 60 minutes`,
      explainerHeading: `Statutory Procedure When a Death Occurs in ${seed.en.city}`,
      explainerIntro: `Our local duty team covers ${seed.en.catchmentAreas} with direct hospital and municipal clearance.`,
      walkthroughSteps: buildLocationWalkthrough('en', seed),
      matrixHeading: `${seed.en.city} Municipal & Hospital Operations Matrix`,
      specs: {
        transitTime: 'On-Site within 30–60 Mins • Full Repatriation Ready in 24–48 Hours',
        transportMode: '24/7 Refrigerated Municipal Removal + Air Cargo HUM / Road Hearse',
        consularTimeframe: '24 – 36 Hours (Executed by Our Podgorica Diplomatic Team)',
        embassyJurisdiction: 'All Foreign Embassies in Podgorica & Consulate in Herceg Novi',
        morgueCatchment: seed.en.hospitalMorgue,
        requiredDocuments: [
          'Passport of the deceased',
          'Remote Power of Attorney (Punomoćje)',
          'Insurance policy details (if covered by travel/expat assistance)',
        ],
        receivingRequirements: [
          `Local areas covered: ${seed.en.catchmentAreas}`,
          'Direct dispatch to Belgrade Crematorium, Podgorica Airport (TGD), or European road corridors',
        ],
        estimatedTotalRange: 'From €2,400',
      },
      costHeading: `Transparent Cost Breakdown — ${seed.en.city} Operations`,
      costSubtitle: 'Official Montenegro EFI fiscal invoices accepted by all European travel insurers and assistance partners.',
      costItems: buildLocationCosts('en', seed.en.city),
      faqHeading: `Frequently Asked Questions — ${seed.en.city}, Montenegro`,
      faqs: [
        {
          question: seed.en.specificFaqQ,
          answer: seed.en.specificFaqA,
        },
        {
          question: `How quickly can your coordinator arrive at a hotel, marina, or residence in ${seed.en.city}?`,
          answer: `Our duty team operates 24/7 and arrives anywhere in ${seed.en.city} (${seed.en.catchmentAreas}) within 30 to 60 minutes of your phone call or WhatsApp dispatch.`,
        },
        {
          question: `Can you arrange cremation in Belgrade for someone who passed away in ${seed.en.city}?`,
          answer: `Yes. We handle the collection in ${seed.en.city}, obtain the municipal Death Certificate and Sanitary Sprovodnica, transport to Belgrade State Crematorium, and return the sealed urn within 48–72 hours.`,
        },
        {
          question: `Do relatives need to come to ${seed.en.city} in person?`,
          answer: `No. Every hospital, police, municipal, and embassy step is completed by our licensed coordinators via a bilingual remote Power of Attorney.`,
        },
      ],
    },
    ru: {
      metaTitle: seed.ru.metaTitle,
      metaDescription: seed.ru.metaDesc,
      keywords: seed.ru.keywords,
      breadcrumbLabel: `${seed.ru.cityNom}`,
      eyebrow: `МУНИЦИПАЛЬНЫЙ И БОЛЬНИЧНЫЙ ЦЕНТР • Г. ${seed.ru.cityNom.toUpperCase()}, ЧЕРНОГОРИЯ`,
      h1: seed.ru.h1,
      heroSubtitle: seed.ru.subtitle,
      whatsappPrefill: `Здравствуйте, необходима срочная помощь координатора в г. ${seed.ru.cityNom} (Черногория).`,
      emergencyBannerText: `Прибытие координатора в г. ${seed.ru.cityNom} и морг в течение 60 минут • Дежурная служба 24/7`,
      explainerHeading: `Порядок действий при смерти человека в г. ${seed.ru.cityNom}`,
      explainerIntro: `Полное оперативное покрытие районов: ${seed.ru.catchmentAreas}.`,
      walkthroughSteps: buildLocationWalkthrough('ru', seed),
      matrixHeading: `Оперативная матрица по г. ${seed.ru.cityNom}`,
      specs: {
        transitTime: 'Выезд за 30–60 минут • Готовность документов к вылету/выезду за 24–48 часов',
        transportMode: 'Круглосуточный спецтранспорт + Авиа Cargo HUM / Спецкатафалк',
        consularTimeframe: '24 – 36 часов (через наш консульский отдел в Подгорице)',
        embassyJurisdiction: 'Все посольства в Подгорице и Генконсульство в Херцег-Нови',
        morgueCatchment: seed.ru.hospitalMorgue,
        requiredDocuments: [
          'Паспорт усопшего',
          'Дистанционная доверенность (Punomoćje)',
          'Данные страхового полиса (если случай страховой)',
        ],
        receivingRequirements: [
          `Зона обслуживания: ${seed.ru.catchmentAreas}`,
          'Прямая отправка на кремацию в Белград, в аэропорт TGD или спецкатафалком в ЕС/СНГ',
        ],
        estimatedTotalRange: 'От 2 400 €',
      },
      costHeading: `Прозрачная стоимость услуг в г. ${seed.ru.cityNom}`,
      costSubtitle: 'Официальные фискальные счета EFI с QR-кодом для страховых выплат и компенсаций.',
      costItems: buildLocationCosts('ru', seed.ru.cityNom),
      faqHeading: `Частые вопросы — Помощь в г. ${seed.ru.cityNom}`,
      faqs: [
        {
          question: seed.ru.specificFaqQ,
          answer: seed.ru.specificFaqA,
        },
        {
          question: `Как быстро координатор приезжает по вызову в ${seed.ru.cityPrep}?`,
          answer: `Дежурный специалист выезжает круглосуточно и прибывает в любую точку (${seed.ru.catchmentAreas}) в течение 30–60 минут.`,
        },
        {
          question: `Можно ли организовать кремацию в Белграде, если смерть наступила в ${seed.ru.cityPrep}?`,
          answer: `Да. Мы забираем усопшего в ${seed.ru.cityPrep}, оформляем свидетельство о смерти и Спроводницу, проводим государственную кремацию в Белграде и возвращаем опломбированную урну за 48–72 часа.`,
        },
        {
          question: `Нужно ли родственникам лично приезжать в г. ${seed.ru.cityNom}?`,
          answer: `Нет. 100% процедур в больнице, полиции, ЗАГСе и посольстве мы выполняем по дистанционной доверенности.`,
        },
      ],
    },
    mne: {
      metaTitle: seed.mne.metaTitle,
      metaDescription: seed.mne.metaDesc,
      keywords: seed.mne.keywords,
      breadcrumbLabel: `${seed.mne.cityNom}`,
      eyebrow: `OPŠTINSKI I BOLNIČKI OPERATIVNI CENTAR • ${seed.mne.cityNom.toUpperCase()}, CRNA GORA`,
      h1: seed.mne.h1,
      heroSubtitle: seed.mne.subtitle,
      whatsappPrefill: `Poštovani, potrebna mi je hitna asistencija koordinatora u opštini ${seed.mne.cityNom}.`,
      emergencyBannerText: `Dolazak koordinatora u ${seed.mne.cityLoc} u roku od 60 minuta • Dežurna linija 24/7`,
      explainerHeading: `Zakonska procedura kada smrt nastupi u ${seed.mne.cityLoc}`,
      explainerIntro: `Pokrivamo cjelokupno područje: ${seed.mne.catchmentAreas}.`,
      walkthroughSteps: buildLocationWalkthrough('mne', seed),
      matrixHeading: `Operativna specifikacija — Opština ${seed.mne.cityNom}`,
      specs: {
        transitTime: 'Izlazak za 30–60 min • Kompletna dokumentacija za 24–48 sati',
        transportMode: 'Specijalno rashladno vozilo 24/7 + Avio Cargo HUM / Drumski prevoz',
        consularTimeframe: '24 – 36 sati (preko našeg tima u Podgorici)',
        embassyJurisdiction: 'Sve ambasade u Podgorici i Generalni konzulat u Herceg Novom',
        morgueCatchment: seed.mne.hospitalMorgue,
        requiredDocuments: [
          'Pasoš ili lična karta preminulog lica',
          'Ovjereno punomoćje porodice',
          'Polisa putnog osiguranja (ukoliko postoji)',
        ],
        receivingRequirements: [
          `Pokrivena naselja: ${seed.mne.catchmentAreas}`,
          'Direktan transport za Beograd (kremacija), Aerodrom Podgorica ili EU koridore',
        ],
        estimatedTotalRange: 'Od 2.400 €',
      },
      costHeading: `Transparentna struktura troškova — ${seed.mne.cityNom}`,
      costSubtitle: 'Zvanični EFI fiskalni računi za osiguravajuća društva i refundaciju troškova.',
      costItems: buildLocationCosts('mne', seed.mne.cityNom),
      faqHeading: `Česta pitanja — ${seed.mne.cityNom}, Crna Gora`,
      faqs: [
        {
          question: seed.mne.specificFaqQ,
          answer: seed.mne.specificFaqA,
        },
        {
          question: `Koliko brzo vaš tim stiže po pozivu u ${seed.mne.cityLoc}?`,
          answer: `Naša dežurna služba je aktivna 24/7 i stiže na svaku lokaciju (${seed.mne.catchmentAreas}) u roku od 30 do 60 minuta.`,
        },
        {
          question: `Da li organizujete prevoz iz opštine ${seed.mne.cityNom} na kremaciju u Beograd?`,
          answer: `Da, preuzimamo kompletnu proceduru u ${seed.mne.cityLoc}, pribavljamo Sprovodnicu, vršimo prevoz u krematorijum u Beogradu i vraćamo zapečaćenu urnu u roku od 48–72 sata.`,
        },
        {
          question: `Da li porodica mora lično dolaziti u ${seed.mne.cityNom}?`,
          answer: `Ne. Sve bolničke, opštinske i konzularne procedure završavamo po daljinskom punomoćju.`,
        },
      ],
    },
  },
}));

// ==========================================
// 4. RESOURCE / LEGAL / TRANSPARENCY PAGES
// ==========================================
export const RESOURCE_ROUTES: SeoRouteEntry[] = [
  {
    id: 'resource-pricing',
    category: 'resource',
    path: '/pricing-breakdown/',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'Repatriation & Cremation Cost Breakdown Montenegro 24/7',
        metaDescription: 'Transparent itemized pricing for repatriation & cremation in Montenegro: Sprovodnica fees, zinc coffin sealing, translations & Cargo HUM. +382 68 914 816.',
        keywords: ['Repatriation cost Montenegro', 'Cremation cost Montenegro Belgrade', 'Zinc coffin price Montenegro', 'Funeral invoice EFI Montenegro'],
        breadcrumbLabel: 'Pricing & Statutory Fee Breakdown',
        eyebrow: '100% FINANCIAL TRANSPARENCY • EFI FISCAL INVOICING',
        h1: 'Transparent Pricing & Statutory Fee Breakdown for Repatriation & Cremation',
        heroSubtitle: 'We protect grieving families and European assistance insurers from hidden surcharges. Every state fee, zinc container specification, court translation, and freight tariff is itemized in writing before work begins.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I would like a formal written cost breakdown for repatriation / cremation.',
        emergencyBannerText: 'Written Fixed-Scope Quotation Within 30 Minutes • Direct Insurance GOP & SEPA/SWIFT Accepted',
        explainerHeading: 'How International Repatriation & Cremation Costs Are Structured in Montenegro',
        explainerIntro: 'Every invoice issued by Memorijal d.o.o. is fiscalized through the Montenegro Tax Administration Electronic Fiscal Invoicing (EFI) system with a verifiable QR code.',
        walkthroughSteps: buildLocationWalkthrough('en', LOCATION_SEEDS[3]),
        matrixHeading: 'Reference Tariff Schedule by Service & Corridor (2026)',
        specs: {
          transitTime: 'Written Fixed Quote Issued Within 30 Minutes of Inquiry',
          transportMode: 'Itemized per Road Corridor (km) or IATA Cargo HUM Weight/Volume Tariff',
          consularTimeframe: 'Official Consular & Court Receipts Attached to Final Dossier',
          embassyJurisdiction: 'Compliant with EU/UK Assistance Audit & National Social Security Funds',
          morgueCatchment: 'Standardized Rates Across Tivat, Kotor, Budva, Podgorica, Bar & Herceg Novi',
          requiredDocuments: ['Written Cost Estimate Approval', 'Insurance GOP or SEPA/SWIFT Transfer Confirmation'],
          receivingRequirements: ['Full EFI QR Fiscal Invoice + Itemized Specification Sheet in English/German/Russian'],
          estimatedTotalRange: '€1,250 (Regional Road) | From €1,850 | From €2,400',
        },
        costHeading: 'Detailed Line-By-Line Statutory & Logistical Cost Table',
        costSubtitle: 'No unexpected morgue storage surprises or unapproved add-ons.',
        costItems: [
          {
            item: '1. Municipal Civil Registry, Hague Apostille & Republic Sanitary Inspector (Sprovodnica)',
            includedStatus: 'Mandatory Statutory',
            referenceCost: 'From €180',
            detail: 'Includes Form C international death certificates, Basic Court Apostille stamps, and inspector attendance.',
          },
          {
            item: '2. Clinical Mortuary Refrigeration, Forensic Embalming & Hermetic Zinc Coffin (Lemljenje)',
            includedStatus: 'IATA & Consular Standard',
            referenceCost: 'From €750',
            detail: 'Certified formaline embalming, galvanized zinc liner, soldering, wooden export coffin, and air packing.',
          },
          {
            item: '3. Sworn Court Translations (Sudski tumač) & Embassy Mortuary Passport',
            includedStatus: 'Remote PoA Execution',
            referenceCost: 'From €190',
            detail: 'Certified translation of medical & civil records per page + official consular tariff.',
          },
          {
            item: '4. Cross-Border Transport (Belgrade Cremation / EU Hearse / IATA Cargo HUM Air Waybill)',
            includedStatus: 'Corridor-Specific',
            referenceCost: 'From €650',
            detail: 'Exact airline Cargo HUM rate from TGD/BEG or fixed kilometer rate for specialized two-driver hearse.',
          },
        ],
        faqHeading: 'FAQ — Billing, Insurance Coverage & Payment Methods',
        faqs: [
          {
            question: 'Can our travel insurance or European assistance company pay Memorijal d.o.o. directly?',
            answer: 'Yes. As soon as your assistance provider sends a Guarantee of Payment (GOP), we execute the entire repatriation without requiring upfront out-of-pocket payment from the family.',
          },
          {
            question: 'What payment methods do you accept for private family arrangements?',
            answer: 'We accept international SWIFT and SEPA bank transfers to our corporate IBAN in Montenegro, as well as official card/fiscal settlements accompanied by a Montenegro Tax Administration EFI QR invoice.',
          },
          {
            question: 'Can we use your invoice to claim state funeral grants or pension reimbursements at home?',
            answer: 'Yes. Because our invoices carry an official Montenegro Tax Administration QR code and itemized breakdown, they are accepted by state social security funds across the EU, UK, Serbia, Russia, and Ukraine.',
          },
          {
            question: 'Is the price fixed once we sign the written quotation?',
            answer: 'Yes. Once we issue your written quotation based on the selected route, the scope and price are contractually fixed with zero hidden fees.',
          },
        ],
      },
      ru: {
        metaTitle: 'Цены на репатриацию (Груз 200) и кремацию в Черногории 24/7',
        metaDescription: 'Прозрачный прайс-лист на репатриацию и кремацию из Черногории: госпошлины, цинковый гроб, переводы, авиатариф Cargo HUM и счета EFI. +382 68 914 816.',
        keywords: ['Стоимость репатриации из Черногории', 'Цена Груз 200 Черногория', 'Стоимость кремации в Сербии из Черногории', 'Цинковый гроб цена Черногория'],
        breadcrumbLabel: 'Цены и структура расходов',
        eyebrow: '100% ФИНАНСОВАЯ ПРОЗРАЧНОСТЬ • ФИСКАЛЬНЫЕ СЧЕТА EFI QR',
        h1: 'Прозрачная стоимость репатриации и кремации: детальная смета расходов',
        heroSubtitle: 'Мы фиксируем полную стоимость всех государственных пошлин, цинкового контейнера, судебных переводов и авиа/авто фрахта в письменной смете до начала работ — без скрытых доплат.',
        whatsappPrefill: 'Здравствуйте, пришлите, пожалуйста, детальный расчет стоимости репатриации / кремации.',
        emergencyBannerText: 'Письменная фиксированная смета за 30 минут • Работаем со страховыми (GOP) и по счету SEPA/SWIFT',
        explainerHeading: 'Из чего складывается официальная стоимость процедуры в Черногории',
        explainerIntro: 'Каждый счет Memorijal d.o.o. проходит электронную фискализацию в Налоговой службе Черногории (EFI QR) и принимается страховыми компаниями и государственными фондами.',
        walkthroughSteps: buildLocationWalkthrough('ru', LOCATION_SEEDS[3]),
        matrixHeading: 'Сводная таблица базовых тарифов по направлениям (2026)',
        specs: {
          transitTime: 'Подготовка точной письменной сметы за 30 минут',
          transportMode: 'Расчет по километражу спецкатафалка или авиатарифу IATA Cargo HUM',
          consularTimeframe: 'Квитанции госпошлин и консульских сборов прилагаются к договору',
          embassyJurisdiction: 'Соответствие стандартам страхового аудита ЕС, Великобритании и СНГ',
          morgueCatchment: 'Единые государственные расценки в Тивате, Которе, Будве, Подгорице, Баре и Херцег-Нови',
          requiredDocuments: ['Согласование письменной сметы', 'Гарантийное письмо страховой (GOP) или оплата по инвойсу IBAN'],
          receivingRequirements: ['Официальный фискальный счет EFI с QR-кодом и закрывающий акт'],
          estimatedTotalRange: '€1,250 (Авто Балканы) | От 1 850 € | От 2 400 €',
        },
        costHeading: 'Постатейная расшифровка обязательных расходов',
        costSubtitle: 'Никаких непредвиденных сборов в морге или на таможне.',
        costItems: [
          {
            item: '1. Госпошлины ЗАГС (Matičar), судебный Апостиль и санитарная Sprovodnica',
            includedStatus: 'Обязательный гос. сбор',
            referenceCost: 'От 180 €',
            detail: 'Международное свидетельство о смерти, штампы Апостиль и выезд санитарного инспектора.',
          },
          {
            item: '2. Сохранение в морге, бальзамирование и цинковый гроб с опайкой (Lemljenje)',
            includedStatus: 'Стандарт IATA / ЕС',
            referenceCost: 'От 750 €',
            detail: 'Сертифицированное бальзамирование, оцинкованный вкладыш, деревянный гроб и пломбирование.',
          },
          {
            item: '3. Переводы судебного переводчика (Sudski tumač) и консульский сбор',
            includedStatus: 'По доверенности',
            referenceCost: 'От 190 €',
            detail: 'Заверенный перевод всех медицинских и ЗАГС документов + оформление в посольстве.',
          },
          {
            item: '4. Международная логистика (Кремация в Белграде / Авто в ЕС и СНГ / Авиа Cargo HUM)',
            includedStatus: 'По выбранному маршруту',
            referenceCost: 'От 650 €',
            detail: 'Тариф авиакомпании по авианакладной MAWB или фиксированный рейс спецкатафалка.',
          },
        ],
        faqHeading: 'Частые вопросы — Оплата, страховка и фискальные документы',
        faqs: [
          {
            question: 'Может ли страховая компания оплатить ваши услуги напрямую без участия семьи?',
            answer: 'Да. При наличии действующего страхового полиса мы связываемся с ассистанс-компанией, получаем гарантию оплаты (GOP) и выполняем всю репатриацию без затрат со стороны семьи.',
          },
          {
            question: 'Как можно оплатить услуги, если страховки нет?',
            answer: 'Оплата производится по официальному банковскому инвойсу (SWIFT / SEPA IBAN) на расчетный счет юридического лица Memorijal d.o.o. в Черногории с выдачей фискального чека EFI.',
          },
          {
            question: 'Подходят ли ваши документы для получения пособия на погребение или компенсации?',
            answer: 'Да, наш официальный фискальный счет с QR-кодом Налоговой службы Черногории и детализацией услуг принимается государственными органами, работодателями и страховыми фондами.',
          },
          {
            question: 'Меняется ли цена после подписания сметы?',
            answer: 'Нет. Согласованная в письменной смете сумма фиксируется в договоре и не подлежит увеличению.',
          },
        ],
      },
      mne: {
        metaTitle: 'Cijene međunarodnog prevoza pokojnika i kremacije Crna Gora',
        metaDescription: 'Transparentan cjenovnik za međunarodnu repatrijaciju i kremaciju u Beogradu: državne takse, cink uložak, prevodi i Cargo HUM. +382 68 914 816.',
        keywords: ['Cijena prevoza pokojnika Crna Gora', 'Kremacija u Beogradu cijena iz Crne Gore', 'Limeni sanduk cijena Crna Gora', 'Fiskalni račun pogrebne usluge'],
        breadcrumbLabel: 'Cjenovnik i struktura troškova',
        eyebrow: '100% FINANSIJSKA TRANSPARENTNOST • ZVANIČNI EFI FISKALNI RAČUNI',
        h1: 'Transparentan prikaz troškova međunarodne repatrijacije i kremacije',
        heroSubtitle: 'Svaka državna taksa, limeni (cink) uložak, sudski prevod i trošak prevoza precizno su navedeni u pisanoj ponudi prije početka rada — bez skrivenih doplata.',
        whatsappPrefill: 'Poštovani, molim Vas za pisanu specifikaciju troškova za repatrijaciju / kremaciju.',
        emergencyBannerText: 'Pisana fiksna ponuda u roku od 30 minuta • Prihvatamo GOP osiguranja i SEPA/SWIFT uplate',
        explainerHeading: 'Struktura zakonskih i transportnih troškova u Crnoj Gori',
        explainerIntro: 'Za svaku uslugu izdajemo zvanični EFI fiskalni račun sa verifikacionim QR kodom Poreske uprave Crne Gore.',
        walkthroughSteps: buildLocationWalkthrough('mne', LOCATION_SEEDS[3]),
        matrixHeading: 'Okvirni pregled troškova po vrsti usluge (2026)',
        specs: {
          transitTime: 'Izdavanje pisane ponude u roku od 30 minuta',
          transportMode: 'Obračun po kilometraži specijalnog vozila ili IATA Cargo HUM tarifi',
          consularTimeframe: 'Sve priznanice državnih i konzularnih taksi prilažu se uz dokumentaciju',
          embassyJurisdiction: 'Usklađeno sa zahtjevima evropskih osiguranja i fondova PIO',
          morgueCatchment: 'Standardizovane cijene za Tivat, Kotor, Budvu, Podgoricu, Bar i Herceg Novi',
          requiredDocuments: ['Prihvatanje pisane specifikacije', 'GOP garancija osiguranja ili uplata po predračunu'],
          receivingRequirements: ['Zvanični EFI QR fiskalni račun i detaljna specifikacija usluga'],
          estimatedTotalRange: '€1,250 (Region drumski) | Od 1.850 € | Od 2.400 €',
        },
        costHeading: 'Detaljna specifikacija obaveznih stavki',
        costSubtitle: 'Potpuna zaštita porodice od nepredviđenih troškova.',
        costItems: [
          {
            item: '1. Administrativne takse MUP-a, Apostille ovjera i Sanitarna Sprovodnica',
            includedStatus: 'Zakonska obaveza',
            referenceCost: 'Od 180 €',
            detail: 'Međunarodni izvodi (Obrazac C), sudski Apostille pečati i izlazak sanitarnog inspektora.',
          },
          {
            item: '2. Bolnička mrtvačnica, balzamovanje i limeni (cink) uložak sa lemljenjem',
            includedStatus: 'IATA / EU standard',
            referenceCost: 'Od 750 €',
            detail: 'Tanatopraksija, atestirani cink uložak, hermetičko lemljenje, drveni sanduk i plomba.',
          },
          {
            item: '3. Ovjereni prevodi sudskog tumača i konzularna sprovodnica u Podgorici',
            includedStatus: 'Po punomoćju',
            referenceCost: 'Od 190 €',
            detail: 'Prevod medicinske i matične dokumentacije i konzularne takse ambasade.',
          },
          {
            item: '4. Međunarodni transport (Kremacija Beograd / Drumski EU / Avio Cargo HUM)',
            includedStatus: 'Prema odredištu',
            referenceCost: 'Od 650 €',
            detail: 'Tarifa avio-karga (MAWB) sa aerodroma TGD ili fiksni drumski prevoz po ruti.',
          },
        ],
        faqHeading: 'Česta pitanja — Plaćanje, osiguranje i refundacija',
        faqs: [
          {
            question: 'Da li prihvatate garanciju plaćanja (GOP) stranog putnog osiguranja?',
            answer: 'Da, ukoliko je preminulo lice imalo polisu putnog ili zdravstvenog osiguranja, direktno preuzimamo komunikaciju i naplatu od asistentske kuće.',
          },
          {
            question: 'Koji su načini plaćanja za fizička lica?',
            answer: 'Uplate se mogu izvršiti putem deviznog SWIFT/SEPA IBAN računa, kao i na žiro-račun u Crnoj Gori uz izdavanje zvaničnog EFI fiskalnog računa.',
          },
          {
            question: 'Da li vaš račun važi za refundaciju pogrebnih troškova kod Fonda PIO?',
            answer: 'Da, zvanični EFI fiskalni račun sa QR kodom Poreske uprave Crne Gore je zakonski validan dokument za refundaciju u Crnoj Gori, Srbiji, EU i drugim državama.',
          },
          {
            question: 'Da li je cijena iz ponude konačna?',
            answer: 'Da, svaka pisana ponuda koju izdamo je fiksna i obuhvata sve navedene zakonske korake bez skrivenih troškova.',
          },
        ],
      },
    },
  },
  {
    id: 'resource-guide',
    category: 'resource',
    path: '/step-by-step-guide/',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'What to Do When a Foreigner Dies in Montenegro | Guide',
        metaDescription: 'Complete legal & practical step-by-step guide on what to do when a foreign citizen or tourist passes away in Montenegro. 24/7 help: +382 68 914 816.',
        keywords: [
          'What to do if someone dies in Kotor Montenegro',
          'Foreigner dies in Montenegro procedure',
          'Death of a tourist in Montenegro guide',
          'Power of attorney repatriation Montenegro',
        ],
        breadcrumbLabel: 'Step-by-Step Guide (Foreign Citizen Death)',
        eyebrow: 'OFFICIAL PROTOCOL GUIDE FOR FAMILIES, EXPATS & INSURERS',
        h1: 'What to Do When a Foreign Citizen Passes Away in Montenegro — Complete 4-Step Guide',
        heroSubtitle: 'A clear, calm, step-by-step manual explaining exact legal procedures when a death occurs in a hospital, hotel, residence, or yacht in Montenegro—and how our team executes everything remotely on your behalf.',
        whatsappPrefill: 'Hello Memorijal d.o.o., a death has occurred in Montenegro and we need immediate step-by-step guidance.',
        emergencyBannerText: 'Step 1 Starts With One Call (+382 68 914 816) • Do Not Book Unnecessary Flights to Montenegro',
        explainerHeading: 'Chronological Action Plan (From Hour 0 to Final Arrival)',
        explainerIntro: 'Follow these five verified steps. Our duty coordinator guides your family or insurance desk through each milestone in English, Russian, or Montenegrin.',
        walkthroughSteps: buildLocationWalkthrough('en', LOCATION_SEEDS[1]),
        matrixHeading: 'Document & Authority Checklist for Foreign Citizens in Montenegro',
        specs: {
          transitTime: 'Hour 0–2: Morgue Transfer & PoA | Hour 24–48: Permits | Hour 48–72: Arrival',
          transportMode: 'Choice of Air Cargo HUM, European Road Hearse, or Belgrade Cremation',
          consularTimeframe: '24 – 36 Hours (All Police, Court & Embassy Steps Included)',
          embassyJurisdiction: 'British, German, Russian, Ukrainian, Polish, French, Italian, Serbian & Turkish Embassies',
          morgueCatchment: 'Kotor General Hospital, KCCG Podgorica, Bar General Hospital & Northern Hospitals',
          requiredDocuments: ['Photo/Scan of Deceased Passport', 'Signed Remote Power of Attorney (sent via email/WhatsApp)', 'Next-of-Kin ID Scan'],
          receivingRequirements: ['No family travel to Montenegro required at any stage'],
          estimatedTotalRange: '100% Managed Under Fixed Written Contract or Insurance GOP',
        },
        costHeading: 'Key Statutory Milestones Covered in Our Turnkey Service',
        costSubtitle: 'Every administrative obstacle is handled by our licensed team.',
        costItems: buildLocationCosts('en', 'Montenegro'),
        faqHeading: 'FAQ — Practical Questions When a Death Occurs in Montenegro',
        faqs: [
          {
            question: 'What if the death occurred suddenly outside a hospital (in a hotel, apartment, or at sea)?',
            answer: 'In any out-of-hospital death of a foreign national, Montenegrin police and the emergency medical examiner attend the scene. In many cases, the prosecutor orders a routine forensic autopsy at KCCG Podgorica. Our coordinator attends immediately, coordinates the transfer to KCCG, and obtains the forensic release.',
          },
          {
            question: 'How do we retrieve the deceased’s personal belongings, luggage, or passport from the hospital or hotel?',
            answer: 'Under your Power of Attorney, our coordinator collects the official passport, personal effects, jewelry, and luggage under a signed inventory protocol and returns them safely with the repatriation or via courier.',
          },
          {
            question: 'Should family members immediately buy plane tickets to Montenegro?',
            answer: 'No. In 95% of cases, flying to Montenegro only adds emotional and financial strain because hospital morgues, courts, and ministries operate through licensed funeral representatives. We execute 100% of procedures remotely while keeping you updated hourly.',
          },
          {
            question: 'What if the deceased held travel or expat health insurance?',
            answer: 'Provide us with the policy number and assistance hotline. We contact the insurer directly to register the claim and secure a Guarantee of Payment (GOP).',
          },
        ],
      },
      ru: {
        metaTitle: 'Что делать, если умер человек в Черногории | Гид 24/7',
        metaDescription: 'Пошаговая инструкция: что делать, если родственник или турист умер в Черногории (Будва, Тиват, Котор, Подгорица). Оформление без приезда. +382 68 914 816.',
        keywords: [
          'Умер человек в Будве Тивате что делать',
          'Что делать если умер родственник в Черногории',
          'Смерть туриста в Черногории инструкция',
          'Оформление документов о смерти в Черногории по доверенности',
        ],
        breadcrumbLabel: 'Пошаговая инструкция (Что делать)',
        eyebrow: 'ОФИЦИАЛЬНОЕ РУКОВОДСТВО ДЛЯ СЕМЕЙ, ЭКСПАТОВ И СТРАХОВЫХ КОМПАНИЙ',
        h1: 'Что делать, если близкий человек умер в Черногории — пошаговая инструкция',
        heroSubtitle: 'Четкий и понятный алгоритм действий при наступлении смерти в больнице, отеле или апартаментах в Черногории — и как наша служба оформляет 100% документов дистанционно без вашего прилета.',
        whatsappPrefill: 'Здравствуйте, у нас умер близкий человек в Черногории, нужна срочная консультация по дальнейшим шагам.',
        emergencyBannerText: 'Шаг 1 начинается с одного звонка (+382 68 914 816) • Прилетать в Черногорию не требуется',
        explainerHeading: 'Хронологический план действий (от первых минут до завершения)',
        explainerIntro: 'Следуйте этим пяти проверенным шагам. Наш дежурный координатор возьмет на себя общение с врачами, полицией, судом и консульством.',
        walkthroughSteps: buildLocationWalkthrough('ru', LOCATION_SEEDS[1]),
        matrixHeading: 'Памятка по документам и инстанциям для иностранных граждан',
        specs: {
          transitTime: 'Час 0–2: Перевод в морг и доверенность | 24–48ч: Документы | 48–72ч: Вылет / Кремация',
          transportMode: 'На выбор: Авиа Груз 200, Спецкатафалк в ЕС/Украину или Кремация в Белграде',
          consularTimeframe: '24 – 36 часов (включая полицию, суд, Апостиль и посольство)',
          embassyJurisdiction: 'Посольства РФ, Украины, стран ЕС, Великобритании, Сербии и др. в Подгорице',
          morgueCatchment: 'Больница Котора, Клинический центр KCCG Подгорица, Больница Бара',
          requiredDocuments: ['Фото/скан загранпаспорта усопшего', 'Подписанная дистанционная доверенность (по email/WhatsApp)', 'Скан паспорта родственника'],
          receivingRequirements: ['Личное присутствие родственников в Черногории не требуется ни на одном этапе'],
          estimatedTotalRange: 'Фиксируется в официальном договоре или покрывается страховой компанией (GOP)',
        },
        costHeading: 'Ключевые этапы, которые мы полностью берем на себя',
        costSubtitle: 'Освобождаем семью от поездок по иностранным моргам, судам и министерствам.',
        costItems: buildLocationCosts('ru', 'Черногория'),
        faqHeading: 'Частые вопросы — Первые действия при смерти в Черногории',
        faqs: [
          {
            question: 'Что происходит, если смерть наступила вне больницы (в апартаментах, отеле или на море)?',
            answer: 'При смерти иностранного гражданина вне стационара на место выезжает врач скорой помощи (Hitna pomoć) и полиция. По закону прокурор часто назначает судебно-медицинскую экспертизу в KCCG Подгорица. Наш координатор выезжает на место, организует перевозку в KCCG и получает документы сразу после вскрытия.',
          },
          {
            question: 'Как забрать паспорт, личные вещи или багаж усопшего из больницы или отеля?',
            answer: 'По вашей доверенности наш координатор по описи забирает загранпаспорт (необходимый для ЗАГСа и консульства), а также личные вещи усопшего из больницы, полиции или отеля и передает их семье.',
          },
          {
            question: 'Нужно ли родственникам срочно покупать билеты и лететь в Черногорию?',
            answer: 'Нет. В 95% случаев прилет родственников не ускоряет процедуру, так как морги, санитарная инспекция и таможня работают только с лицензированной ритуальной службой. Мы оформляем все по доверенности и держим вас в курсе каждого шага в WhatsApp.',
          },
          {
            question: 'Что делать, если у усопшего был туристический страховой полис?',
            answer: 'Сообщите нам номер полиса и название страховой компании. Мы сами свяжемся с сервисным центром (ассистансом), зарегистрируем страховой случай и запросим гарантию оплаты (GOP).',
          },
        ],
      },
      mne: {
        metaTitle: 'Šta uraditi kada stranac premine u Crnoj Gori | Vodič 24/7',
        metaDescription: 'Detaljan vodič korak po korak: procedura kada strani državljanin ili turista premine u Crnoj Gori. Bolnica, MUP, Sprovodnica i konzulat. +382 68 914 816.',
        keywords: [
          'Smrt stranog državljanina u Crnoj Gori procedura',
          'Šta raditi kada neko umre u Kotoru Budvi Tivtu',
          'Punomoćje za prevoz pokojnika Crna Gora',
          'Sprovodnica za prenos umrlog lica zdravstvena inspekcija',
        ],
        breadcrumbLabel: 'Vodič korak po korak',
        eyebrow: 'ZVANIČNI PROTOKOL ZA PORODICE, AMBASADE I OSIGURAVAJUĆE KUĆE',
        h1: 'Šta uraditi kada strani državljanin premine u Crnoj Gori — Kompletan vodič u 4 koraka',
        heroSubtitle: 'Jasan pregled svih zakonskih koraka kada smrt nastupi u bolnici, hotelu ili apartmanu u Crnoj Gori — i kako naš licencirani tim završava 100% procedure po punomoćju.',
        whatsappPrefill: 'Poštovani, potreban nam je hitan savjet i preuzimanje procedure za preminulo lice u Crnoj Gori.',
        emergencyBannerText: 'Korak 1 počinje jednim pozivom (+382 68 914 816) • Bez potrebe dolaska porodice u Crnu Goru',
        explainerHeading: 'Hronološki plan aktivnosti (od prvog sata do konačne primopredaje)',
        explainerIntro: 'Naš dežurni koordinator vodi cjelokupan postupak pred bolnicama, MUP-om, sudovima, Sanitarnom inspekcijom i ambasadama.',
        walkthroughSteps: buildLocationWalkthrough('mne', LOCATION_SEEDS[1]),
        matrixHeading: 'Pregled dokumentacije i nadležnih institucija u Crnoj Gori',
        specs: {
          transitTime: 'Sat 0–2: Smještaj u kapelu i punomoćje | 24–48h: Dozvole | 48–72h: Transport / Kremacija',
          transportMode: 'Izbor: Avio Cargo HUM, Drumski prevoz ili Kremacija u Beogradu',
          consularTimeframe: '24 – 36 sati (uključujući MUP, Sud, Apostille i Ambasadu)',
          embassyJurisdiction: 'Sve strane ambasade u Podgorici i konzulati u Crnoj Gori',
          morgueCatchment: 'Opšta bolnica Kotor, KCCG Podgorica, Opšta bolnica Bar i regionalni centri',
          requiredDocuments: ['Fotografija/sken pasoša preminulog', 'Potpisano punomoćje (putem e-maila/WhatsApp-a)', 'Identifikacioni dokument srodnika'],
          receivingRequirements: ['Porodica ne mora putovati u Crnu Goru radi administrativnih procedura'],
          estimatedTotalRange: 'Fiksno po pisanom ugovoru ili direktno preko GOP garancije osiguranja',
        },
        costHeading: 'Ključne zakonske obaveze obuhvaćene našom uslugom',
        costSubtitle: 'Potpuna pravna i logistička sigurnost u svakom koraku.',
        costItems: buildLocationCosts('mne', 'Crna Gora'),
        faqHeading: 'Česta pitanja — Procedura u slučaju smrti u Crnoj Gori',
        faqs: [
          {
            question: 'Koja je procedura ako je smrt nastupila van bolnice (u hotelu, stanu ili na plaži)?',
            answer: 'Kod smrti stranog državljanina van zdravstvene ustanove izlaze Hitna pomoć, mrtvozornik i policija, a nadležni tužilac često nalaže sudsko-medicinsku obdukciju u KCCG Podgorica. Naš tim odmah preuzima koordinaciju prevoza i podizanja dokumentacije iz KCCG-a.',
          },
          {
            question: 'Kako preuzeti pasoš i lične stvari preminulog iz bolnice ili hotela?',
            answer: 'Na osnovu Vašeg punomoćja, naš koordinator zapisnički preuzima pasoš (neophodan za prijavu smrti i ambasadu) i lične stvari preminulog i bezbjedno ih dostavlja porodici.',
          },
          {
            question: 'Da li članovi porodice moraju odmah putovati za Crnu Goru?',
            answer: 'Ne. Cjelokupnu zakonsku proceduru u bolnici, opštini, sudu i ambasadi završavamo na osnovu ovjerenog punomoćja, uz redovno izvještavanje porodice.',
          },
          {
            question: 'Šta ukoliko je preminulo lice imalo polisu putnog osiguranja?',
            answer: 'Dovoljno je da nam proslijedite broj polise i kontakt asistentske kuće — naš tim direktno pribavlja garanciju plaćanja (GOP) i realizuje repatrijaciju.',
          },
        ],
      },
    },
  },
  {
    id: 'resource-director',
    category: 'resource',
    path: '/about/director/',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'Maksym Kovalenko | Executive Coordinator Memorijal d.o.o.',
        metaDescription: 'Personal accountability & E-E-A-T credentials of Maksym Kovalenko, Executive Coordinator at Memorijal d.o.o. Montenegro. Call 24/7: +382 68 914 816.',
        keywords: ['Maksym Kovalenko Memorijal Montenegro', 'Licensed repatriation agency Montenegro DOO', 'Memorijal doo Tivat Podgorica', 'Consular repatriation specialist Montenegro'],
        breadcrumbLabel: 'About & Executive Supervision (Maksym Kovalenko)',
        eyebrow: 'E-E-A-T INSTITUTIONAL CREDENTIALS & PERSONAL ACCOUNTABILITY',
        h1: 'Executive Supervision & Corporate Credentials — Maksym Kovalenko, Memorijal d.o.o.',
        heroSubtitle: 'Every international repatriation and cremation case entrusted to Memorijal d.o.o. is personally supervised by Executive Coordinator Maksym Kovalenko in strict compliance with Montenegrin public health law and consular conventions.',
        whatsappPrefill: 'Hello Maksym Kovalenko / Memorijal d.o.o., I would like to discuss an international repatriation case.',
        emergencyBannerText: 'Direct Executive Oversight on Every Case • CRPS Registered DOO • EFI Fiscal & SEPA/SWIFT Compliant',
        explainerHeading: 'Our Institutional Standards & Legal Compliance Framework',
        explainerIntro: 'Memorijal d.o.o. was established to bring Scandinavian/Swiss transparency, multilingual legal precision, and compassionate dignity to cross-border repatriation in Montenegro.',
        walkthroughSteps: buildLocationWalkthrough('en', LOCATION_SEEDS[0]),
        matrixHeading: 'Corporate & Regulatory Verification Record',
        specs: {
          transitTime: '24/7 Direct Executive Availability (+382 68 914 816)',
          transportMode: 'Licensed International Mortuary Fleet & IATA Cargo HUM Forwarding',
          consularTimeframe: 'Direct Working Protocols with 20+ Diplomatic Missions in Podgorica & Belgrade',
          embassyJurisdiction: 'Registered in the Central Registry of Business Entities of Montenegro (CRPS)',
          morgueCatchment: 'Coastal Hub (Tivat / Kotor) & Capital Clinical Hub (Podgorica / KCCG)',
          requiredDocuments: [' PIB: 03489217 • PDV: 30/31-20948-4 • Montenegro Tax Administration EFI QR'],
          receivingRequirements: ['Full GDPR & Montenegrin Personal Data Protection Compliance'],
          estimatedTotalRange: 'Written Fixed-Scope Contracts • SWIFT/SEPA Corporate IBAN & Insurance GOP',
        },
        costHeading: 'Core Pillars of Our Corporate Guarantee',
        costSubtitle: 'Why embassies, hospital pathology departments, and international insurers rely on Memorijal d.o.o.',
        costItems: buildLocationCosts('en', 'Tivat & Podgorica'),
        faqHeading: 'FAQ — Corporate Licensing & Executive Supervision',
        faqs: [
          {
            question: 'Who supervises my family’s case at Memorijal d.o.o.?',
            answer: 'Executive Coordinator Maksym Kovalenko personally oversees the legal, forensic, sanitary, and flight/road scheduling of every international case from initial call to final arrival.',
          },
          {
            question: 'What languages does your coordination desk speak fluently?',
            answer: 'Our team operates natively in English, Russian, Ukrainian, and Montenegrin/Serbian, eliminating any communication barrier with local authorities or foreign families.',
          },
          {
            question: 'How can an assistance company or embassy verify your corporate registration in Montenegro?',
            answer: 'Memorijal d.o.o. is a fully licensed Montenegrin limited liability company (PIB: 03489217, PDV: 30/31-20948-4) issuing electronic fiscal invoices (EFI) verifiable in real time via the Montenegro Tax Administration QR system.',
          },
          {
            question: 'Do you adhere to strict ethical and non-commercial standards?',
            answer: 'Yes. We strictly prohibit aggressive sales tactics or hidden hospital charges. Families receive calm, factual legal counsel and an itemized written quotation prior to any commitment.',
          },
        ],
      },
      ru: {
        metaTitle: 'Максим Коваленко | Руководитель Memorijal d.o.o. Черногория',
        metaDescription: 'Личный контроль и официальные лицензии: Максим Коваленко, исполнительный координатор Memorijal d.o.o. в Черногории (Тиват / Подгорица). +382 68 914 816.',
        keywords: ['Максим Коваленко Memorijal Черногория', 'Memorijal doo Tivat Podgorica', 'Лицензированная ритуальная служба Черногория'],
        breadcrumbLabel: 'О компании и руководителе (Максим Коваленко)',
        eyebrow: 'ЛИЧНАЯ ОТВЕТСТВЕННОСТЬ И ОФИЦИАЛЬНАЯ ГОСУДАРСТВЕННАЯ ЛИЦЕНЗИЯ',
        h1: 'Персональный контроль и юридический статус — Максим Коваленко, Memorijal d.o.o.',
        heroSubtitle: 'Каждое дело по международной репатриации и кремации в Memorijal d.o.o. находится под личным контролем исполнительного координатора Максима Коваленко в строгом соответствии с законодательством Черногории.',
        whatsappPrefill: 'Здравствуйте, Максим! Необходима консультация по организации репатриации / кремации в Черногории.',
        emergencyBannerText: 'Личный контроль каждого дела 24/7 • Лицензия CRPS DOO • Фискализация EFI QR и счета SEPA/SWIFT',
        explainerHeading: 'Принципы работы и государственная аккредитация Memorijal d.o.o.',
        explainerIntro: 'Мы обеспечиваем европейский стандарт прозрачности, безупречную юридическую точность документов и бережное отношение к семьям.',
        walkthroughSteps: buildLocationWalkthrough('ru', LOCATION_SEEDS[0]),
        matrixHeading: 'Регистрационные и правовые реквизиты компании',
        specs: {
          transitTime: 'Прямая связь с руководителем 24/7 (+382 68 914 816)',
          transportMode: 'Собственный спецтранспорт и аккредитация по стандарту IATA Cargo HUM',
          consularTimeframe: 'Прямой рабочий протокол с более чем 20 посольствами в Подгорице и Белграде',
          embassyJurisdiction: 'Зарегистрировано в Центральном реестре субъектов хозяйствования Черногории (CRPS)',
          morgueCatchment: 'Оперативный центр в Тивате/Которе и консульский офис в Подгорице (у KCCG)',
          requiredDocuments: ['PIB: 03489217 • PDV: 30/31-20948-4 • Электронная фискализация EFI QR'],
          receivingRequirements: ['Строгая конфиденциальность и защита персональных данных (GDPR)'],
          estimatedTotalRange: 'Официальный письменный договор • Расчеты SEPA/SWIFT IBAN и страховые GOP',
        },
        costHeading: 'Гарантии прозрачности и надежности для семей и страховых компаний',
        costSubtitle: 'Почему посольства, госпитали и международные ассистансы доверяют Memorijal d.o.o.',
        costItems: buildLocationCosts('ru', 'Тиват и Подгорица'),
        faqHeading: 'Частые вопросы — Юридический статус и контроль качества',
        faqs: [
          {
            question: 'Кто лично контролирует выполнение процедуры в Черногории?',
            answer: 'Исполнительный координатор Максим Коваленко лично курирует каждое обращение с момента первого звонка до передачи гроба или урны семье.',
          },
          {
            question: 'На каких языках говорит ваша команда?',
            answer: 'Мы свободно говорим на русском, украинском, английском и черногорском/сербском языках, обеспечивая прямое взаимодействие с местными властями и родственниками.',
          },
          {
            question: 'Как проверить официальную регистрацию компании Memorijal d.o.o.?',
            answer: 'Memorijal d.o.o. — официально зарегистрированное в Черногории юридическое лицо (PIB: 03489217, PDV: 30/31-20948-4). Каждый выдаваемый нами счет имеет QR-код Налоговой службы Черногории (EFI).',
          },
          {
            question: 'Предоставляете ли вы фото- и документальный отчет по этапам оформления?',
            answer: 'Да, по запросу семьи или страховой компании мы направляем подтверждения в WhatsApp/Email на каждом этапе: получение свидетельства о смерти, Апостиль, пломбирование цинка и выпуск авианакладной.',
          },
        ],
      },
      mne: {
        metaTitle: 'Maksym Kovalenko | Izvršni koordinator Memorijal d.o.o. CG',
        metaDescription: 'Lična odgovornost i zvanične licence: Maksym Kovalenko, izvršni koordinator agencije Memorijal d.o.o. Crna Gora (Tivat / Podgorica). +382 68 914 816.',
        keywords: ['Maksym Kovalenko Memorijal Crna Gora', 'Memorijal doo Tivat Podgorica', 'Licencirana pogrebna agencija Crna Gora'],
        breadcrumbLabel: 'O nama i nadzor (Maksym Kovalenko)',
        eyebrow: 'LIČNA ODGOVORNOST I INSTITUCIONALNI KREDIBILITET',
        h1: 'Lični nadzor i korporativne garancije — Maksym Kovalenko, Memorijal d.o.o.',
        heroSubtitle: 'Svaki slučaj međunarodne repatrijacije i kremacije povjeren agenciji Memorijal d.o.o. nadzire lično izvršni koordinator Maksym Kovalenko u punom skladu sa zakonima Crne Gore i međunarodnim konvencijama.',
        whatsappPrefill: 'Poštovani g. Kovalenko, potrebna mi je konsultacija povodom međunarodne repatrijacije.',
        emergencyBannerText: 'Lični nadzor svakog slučaja 24/7 • CRPS Registrovani DOO • EFI Fiskalizacija i SEPA/SWIFT',
        explainerHeading: 'Standardi rada i zakonska usklađenost Memorijal d.o.o.',
        explainerIntro: 'Naša misija je pružanje dostojanstvene, pravno besprijekorne i finansijski transparentne podrške porodicama i osiguravajućim kućama.',
        walkthroughSteps: buildLocationWalkthrough('mne', LOCATION_SEEDS[0]),
        matrixHeading: 'Korporativni i registarski podaci',
        specs: {
          transitTime: 'Direktna dostupnost koordinatora 24/7 (+382 68 914 816)',
          transportMode: 'Licencirana flota pogrebnih vozila i IATA Cargo HUM špedicija',
          consularTimeframe: 'Direktna saradnja sa preko 20 ambasada i konzulata u Podgorici i Beogradu',
          embassyJurisdiction: 'Upisano u Centralni registar privrednih subjekata Crne Gore (CRPS)',
          morgueCatchment: 'Primorski centar (Tivat / Kotor) i Centralni centar (Podgorica / KCCG)',
          requiredDocuments: ['PIB: 03489217 • PDV: 30/31-20948-4 • Poreska uprava CG EFI QR'],
          receivingRequirements: ['Potpuna usklađenost sa Zakonom o zaštiti podataka o ličnosti i GDPR-om'],
          estimatedTotalRange: 'Pisani ugovori sa fiksnom cijenom • SEPA/SWIFT IBAN i GOP osiguranja',
        },
        costHeading: 'Garancije kvaliteta i pravne sigurnosti',
        costSubtitle: 'Zašto bolnice, ambasade i evropska osiguranja biraju Memorijal d.o.o.',
        costItems: buildLocationCosts('mne', 'Tivat i Podgorica'),
        faqHeading: 'Česta pitanja — Licenca i nadzor kvaliteta',
        faqs: [
          {
            question: 'Ko nadzire realizaciju svakog pojedinačnog slučaja?',
            answer: 'Izvršni koordinator Maksym Kovalenko lično nadzire pravnu, sanitarnu i transportnu proceduru svakog slučaja od prvog poziva do konačnog dolaska.',
          },
          {
            question: 'Na kojim jezicima komunicira vaš dežurni tim?',
            answer: 'Naš tim tečno govori crnogorski/srpski, engleski, ruski i ukrajinski jezik.',
          },
          {
            question: 'Kako osiguravajuće kuće mogu provjeriti registraciju firme?',
            answer: 'Memorijal d.o.o. je registrovano privredno društvo u Crnoj Gori (PIB: 03489217, PDV: 30/31-20948-4) i svaki račun posjeduje verifikacioni EFI QR kod Poreske uprave Crne Gore.',
          },
          {
            question: 'Da li porodica dobija izvještaje u svakoj fazi postupka?',
            answer: 'Da, u realnom vremenu putem WhatsApp-a ili e-maila dostavljamo potvrde o svakom završenom koraku (izvod o smrti, Sprovodnica, AWB broj leta).',
          },
        ],
      },
    },
  },
  {
    id: 'resource-contact',
    category: 'resource',
    path: '/contact/',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: '24/7 Emergency Repatriation Contact Montenegro | Memorijal',
        metaDescription: 'Contact Memorijal d.o.o. 24/7 Duty Coordinator in Tivat & Podgorica, Montenegro. Direct Call & WhatsApp +382 68 914 816. Hospital & Embassy dispatch.',
        keywords: ['Memorijal Montenegro phone number', 'Emergency repatriation hotline Montenegro', 'Funeral director Tivat Podgorica contact'],
        breadcrumbLabel: '24/7 Emergency Contact & Dispatch',
        eyebrow: '24/7 DUTY DESK • TIVAT (BOKA BAY) & PODGORICA (KCCG)',
        h1: '24/7 Emergency Repatriation & Cremation Dispatch — Contact Our Coordinator',
        heroSubtitle: 'Immediate voice and WhatsApp consultation in English, Russian, or Montenegrin at any hour of the day or night. Our duty teams in Tivat/Kotor and Podgorica respond within 15 minutes.',
        whatsappPrefill: 'Hello Memorijal d.o.o. 24/7 Duty Desk, I require immediate coordinator assistance.',
        emergencyBannerText: '24/7 Emergency Hotline: +382 68 914 816 • Podgorica Desk: +382 20 664 112 • dispatch@memorijal.me',
        explainerHeading: 'How Our 24/7 Dispatch Desk Responds to Your Call',
        explainerIntro: 'Whether you are a grieving relative abroad or an assistance officer on night shift, your call connects directly to a senior coordinator.',
        walkthroughSteps: buildLocationWalkthrough('en', LOCATION_SEEDS[0]),
        matrixHeading: 'Operational Offices & Direct Dispatch Channels',
        specs: {
          transitTime: 'Phone Answer: Immediate (24/7) • Written Action Plan: Within 15–30 Minutes',
          transportMode: 'Coastal Dispatch Fleet (Tivat/Kotor/Budva/Bar) & Capital Fleet (Podgorica/KCCG)',
          consularTimeframe: 'Same-Day Power of Attorney Issuance via Email / WhatsApp',
          embassyJurisdiction: 'Podgorica Diplomatic Hub & Herceg Novi Consulate Coordination',
          morgueCatchment: 'All Hospitals & Municipalities Across Montenegro',
          requiredDocuments: ['Initial Call Requires Only Deceased Name, Current Location & Citizenship'],
          receivingRequirements: ['Official Email: dispatch@memorijal.me • WhatsApp: +382 68 914 816'],
          estimatedTotalRange: 'Free Initial Consultation & Written Cost Specification',
        },
        costHeading: 'Information to Have Ready When Contacting Us (If Available)',
        costSubtitle: 'Even if you do not yet have all documents, call us immediately so we can secure the hospital transfer.',
        costItems: buildLocationCosts('en', 'Montenegro'),
        faqHeading: 'FAQ — Contacting Memorijal d.o.o. 24/7 Duty Desk',
        faqs: [
          {
            question: 'Can we call +382 68 914 816 during the night, on weekends, or on public holidays?',
            answer: 'Yes. Our emergency line and WhatsApp dispatch operate 24 hours a day, 365 days a year, including nights, weekends, and state holidays.',
          },
          {
            question: 'What information should we provide on the first phone call?',
            answer: 'Simply share the name and citizenship of the deceased, the municipality or hospital where they are located in Montenegro, and whether your family prefers repatriation of the casket or cremation in Belgrade.',
          },
          {
            question: 'How do international insurance and assistance companies send Guarantees of Payment (GOP)?',
            answer: 'Assistance desks can email GOP documents directly to dispatch@memorijal.me and notify our duty officer via WhatsApp at +382 68 914 816 for instant case activation.',
          },
          {
            question: 'Where are your operational centers located in Montenegro?',
            answer: 'We maintain our Coastal Operations Center in Tivat/Kotor (serving Boka Bay, Budva, and Bar) and our Consular & Clinical Hub in Podgorica adjacent to KCCG and foreign embassies.',
          },
        ],
      },
      ru: {
        metaTitle: 'Контакты 24/7 | Репатриация Memorijal d.o.o. Черногория',
        metaDescription: 'Дежурная линия Memorijal d.o.o. 24/7 в Тивате и Подгорице (Черногория). Телефон и WhatsApp: +382 68 914 816. Экстренный выезд во все госпитали.',
        keywords: ['Контакты ритуальной службы Черногория', 'Телефон репатриация Черногория', 'Memorijal doo контакты Тиват Подгорица'],
        breadcrumbLabel: 'Контакты и дежурная линия 24/7',
        eyebrow: 'КРУГЛОСУТОЧНАЯ ДИСПЕТЧЕРСКАЯ СЛУЖБА • ТИВАТ И ПОДГОРИЦА',
        h1: 'Круглосуточная связь с координатором (24/7) — Тиват, Котор, Будва и Подгорица',
        heroSubtitle: 'Немедленная консультация на русском, английском, украинском или черногорском языке в любое время дня и ночи. Письменный план действий и расчет стоимости в течение 15–30 минут.',
        whatsappPrefill: 'Здравствуйте, обращаюсь на круглосуточную дежурную линию Memorijal d.o.o.',
        emergencyBannerText: 'Дежурная линия 24/7: +382 68 914 816 • Офис в Подгорице: +382 20 664 112 • dispatch@memorijal.me',
        explainerHeading: 'Как работает наша экстренная служба при обращении',
        explainerIntro: 'Ваш звонок или сообщение в WhatsApp принимает непосредственно дежурный координатор без автоответчиков и посредников.',
        walkthroughSteps: buildLocationWalkthrough('ru', LOCATION_SEEDS[0]),
        matrixHeading: 'Оперативные центры и каналы экстренной связи',
        specs: {
          transitTime: 'Ответ по телефону: Немедленно (24/7) • Письменная смета: за 15–30 минут',
          transportMode: 'Прибрежный центр (Тиват/Котор/Будва/Бар) и Центральный отдел (Подгорица/KCCG)',
          consularTimeframe: 'Отправка бланка дистанционной доверенности за 15 минут в WhatsApp / Email',
          embassyJurisdiction: 'Прямая работа с посольствами в Подгорице и Генконсульством в Херцег-Нови',
          morgueCatchment: 'Все больницы, морги и муниципалитеты Черногории',
          requiredDocuments: ['Для первого звонка достаточно знать имя усопшего, город в ЧГ и гражданство'],
          receivingRequirements: ['Email: dispatch@memorijal.me • WhatsApp / Тел.: +382 68 914 816'],
          estimatedTotalRange: 'Бесплатная первичная консультация и составление официальной сметы',
        },
        costHeading: 'Что желательно сообщить при первом обращении',
        costSubtitle: 'Даже если у вас на руках еще нет документов, позвоните нам сразу для координации морга.',
        costItems: buildLocationCosts('ru', 'Черногория'),
        faqHeading: 'Частые вопросы — Связь с дежурным координатором',
        faqs: [
          {
            question: 'Можно ли звонить на номер +382 68 914 816 ночью или в выходные дни?',
            answer: 'Да, дежурная телефонная линия и WhatsApp работают круглосуточно (24/7/365) без выходных и праздничных перерывов.',
          },
          {
            question: 'Какую информацию нужно сообщить при первом звонке?',
            answer: 'Достаточно назвать гражданство усопшего, город или больницу в Черногории и предпочтительный вариант (авиа/авто репатриация гроба или кремация в Белграде с возвратом урны).',
          },
          {
            question: 'Куда страховые компании могут направить гарантийное письмо (GOP)?',
            answer: 'Гарантийные письма от страховых и ассистанс-компаний принимаются на официальный адрес dispatch@memorijal.me с дублированием уведомления в WhatsApp +382 68 914 816.',
          },
          {
            question: 'Где расположены ваши офисы в Черногории?',
            answer: 'Прибрежный оперативный центр расположен в Тивате/Которе (Бока-Которский залив), а консульский и клинический отдел — в Подгорице рядом с KCCG и посольствами.',
          },
        ],
      },
      mne: {
        metaTitle: '24/7 Kontakt i dežurna služba | Memorijal d.o.o. Crna Gora',
        metaDescription: 'Kontaktirajte dežurnog koordinatora Memorijal d.o.o. 24/7 u Tivtu i Podgorici. Telefon i WhatsApp: +382 68 914 816. Hitna bolnička i konzularna podrška.',
        keywords: ['Memorijal Crna Gora kontakt', 'Dežurna pogrebna služba Tivat Podgorica', 'Hitni prevoz pokojnika telefon Crna Gora'],
        breadcrumbLabel: 'Kontakt i dežurni centar 24/7',
        eyebrow: 'DEŽURNI OPERATIVNI CENTAR 24/7 • TIVAT I PODGORICA',
        h1: '24/7 Hitni kontakt i prijava slučaja — Dežurni koordinator u Crnoj Gori',
        heroSubtitle: 'Trenutna telefonska i WhatsApp konsultacija na crnogorskom/srpskom, engleskom ili ruskom jeziku u bilo koje doba dana ili noći. Naši timovi u Tivtu/Kotoru i Podgorici reaguju odmah po pozivu.',
        whatsappPrefill: 'Poštovani, kontaktiram dežurni centar Memorijal d.o.o. radi hitne asistencije.',
        emergencyBannerText: 'Dežurna linija 24/7: +382 68 914 816 • Podgorica: +382 20 664 112 • dispatch@memorijal.me',
        explainerHeading: 'Kako naš dežurni centar postupa po vašem pozivu',
        explainerIntro: 'Bilo da nas pozivate kao član porodice ili kao koordinator međunarodnog osiguranja, dobijate direktnu vezu sa odgovornim licem.',
        walkthroughSteps: buildLocationWalkthrough('mne', LOCATION_SEEDS[0]),
        matrixHeading: 'Operativni centri i direktni kanali komunikacije',
        specs: {
          transitTime: 'Odgovor na poziv: Odmah (24/7) • Pisana ponuda: u roku od 15–30 minuta',
          transportMode: 'Primorski centar (Tivat/Kotor/Budva/Bar) i Centralni centar (Podgorica/KCCG)',
          consularTimeframe: 'Slanje dvojezičnog punomoćja u roku od 15 minuta putem e-maila ili WhatsApp-a',
          embassyJurisdiction: 'Direktna koordinacija sa ambasadama u Podgorici i konzulatom u Herceg Novom',
          morgueCatchment: 'Sve bolnice, mrtvačnice i opštine u Crnoj Gori',
          requiredDocuments: ['Za prvi poziv dovoljno je navesti ime, lokaciju u CG i državljanstvo'],
          receivingRequirements: ['E-mail: dispatch@memorijal.me • WhatsApp / Tel: +382 68 914 816'],
          estimatedTotalRange: 'Besplatna konsultacija i izrada zvanične pisane specifikacije',
        },
        costHeading: 'Osnovni podaci za brzu aktivaciju postupka',
        costSubtitle: 'Čak i ako još nemate svu dokumentaciju, pozovite nas odmah radi koordinacije sa bolnicom.',
        costItems: buildLocationCosts('mne', 'Crna Gora'),
        faqHeading: 'Česta pitanja — Kontakt sa dežurnom službom 24/7',
        faqs: [
          {
            question: 'Da li je broj +382 68 914 816 dostupan noću, vikendom i praznicima?',
            answer: 'Da, naša dežurna linija i WhatsApp su aktivni 24 sata dnevno, 365 dana u godini.',
          },
          {
            question: 'Koje informacije su potrebne prilikom prvog poziva?',
            answer: 'Dovoljno je da nam saopštite državljanstvo preminulog lica, opštinu ili bolnicu u kojoj se nalazi u Crnoj Gori i željeni vid transporta ili kremacije.',
          },
          {
            question: 'Na koju adresu osiguravajuće kuće šalju garanciju plaćanja (GOP)?',
            answer: 'Garancije plaćanja (GOP) šalju se na zvanični e-mail dispatch@memorijal.me uz obavještenje na WhatsApp +382 68 914 816.',
          },
          {
            question: 'Gdje se nalaze vaši operativni centri u Crnoj Gori?',
            answer: 'Primorski operativni centar nalazi se u Tivtu/Kotoru (za Boku, Budvu i Bar), dok se konzularni i klinički centar nalazi u Podgorici u neposrednoj blizini KCCG-a i ambasada.',
          },
        ],
      },
    },
  },
];

