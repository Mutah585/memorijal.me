export type Language = 'EN' | 'RU' | 'MNE';

export type ServiceType = 'cremation' | 'air_cargo' | 'road_transport';
export type RegionType = 'balkans' | 'eu_uk' | 'cis_east';
export type LocationType = 'boka' | 'podgorica' | 'coast_south' | 'north';

export interface TranslationContent {
  meta: {
    langCode: string;
    langName: string;
  };
  topBar: {
    badge247: string;
    emergencyLine: string;
    jurisdiction: string;
    whatsappCta: string;
    callCta: string;
  };
  header: {
    brandSubtitle: string;
    navServices: string;
    navEstimator: string;
    navProcess: string;
    navCredentials: string;
    navContact: string;
    emergencyBtn: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappDirect: string;
    trustMetrics: {
      timeLabel: string;
      timeValue: string;
      presenceLabel: string;
      presenceValue: string;
      complianceLabel: string;
      complianceValue: string;
    };
    captionTitle: string;
    captionSubtitle: string;
    protocolCard: {
      header: string;
      status: string;
      items: {
        label: string;
        detail: string;
      }[];
      footerNote: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    includedLabel: string;
    inquireServiceCta: string;
    cards: {
      id: ServiceType;
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      legalReference: string;
    }[];
  };
  estimator: {
    eyebrow: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    services: Record<ServiceType, {
      label: string;
      shortDesc: string;
      tag: string;
    }>;
    regions: Record<RegionType, {
      label: string;
      countries: string;
    }>;
    locations: Record<LocationType, {
      label: string;
      facility: string;
    }>;
    output: {
      summaryHeader: string;
      timeframeLabel: string;
      costEstimateLabel: string;
      billingNote: string;
      proceduresTitle: string;
      documentChecklistTitle: string;
      whatsappBtn: string;
      modalBtn: string;
      disclaimer: string;
    };
    matrix: Record<ServiceType, Record<RegionType, {
      timeframe: string;
      priceRange: string;
      routeSummary: string;
      procedures: string[];
      documentsIssued: string[];
    }>>;
  };
  timeline: {
    eyebrow: string;
    title: string;
    subtitle: string;
    remoteAssuranceBadge: string;
    steps: {
      number: string;
      timeframe: string;
      title: string;
      description: string;
      deliverable: string;
    }[];
  };
  trust: {
    eyebrow: string;
    title: string;
    subtitle: string;
    institutionsTitle: string;
    institutions: {
      name: string;
      role: string;
      location: string;
    }[];
    complianceTitle: string;
    compliancePoints: {
      title: string;
      description: string;
    }[];
    legalBanner: {
      title: string;
      text: string;
      badges: string[];
    };
  };
  director: {
    eyebrow: string;
    name: string;
    role: string;
    credentials: string;
    quote: string;
    secondaryParagraph: string;
    directContactLabel: string;
    guaranteeItems: string[];
  };
  modal: {
    title: string;
    subtitle: string;
    urgentNotice: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    relationLabel: string;
    relations: {
      family: string;
      insurance: string;
      embassy: string;
      legal: string;
    };
    serviceLabel: string;
    regionLabel: string;
    locationLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    whatsappRedirectBtn: string;
    closeBtn: string;
    validationError: string;
    successTitle: string;
    successMessage: string;
    referenceLabel: string;
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    emergencyDispatchTitle: string;
    legalEntityTitle: string;
    officeTivat: string;
    officePodgorica: string;
    fiscalNotice: string;
    copyright: string;
    privacyNote: string;
    creditPrefix: string;
    creditStudio: string;
  };
}

export const PHONE_DISPLAY = '+382 68 914 816';
export const PHONE_HREF = 'tel:+38268914816';
export const SECONDARY_PHONE_DISPLAY = '+382 20 664 112';
export const WHATSAPP_NUMBER = '38268914816';
export const OFFICIAL_EMAIL = 'dispatch@memorijal.me';

export const translations: Record<Language, TranslationContent> = {
  EN: {
    meta: {
      langCode: 'en',
      langName: 'English',
    },
    topBar: {
      badge247: '24/7 Support Available',
      emergencyLine: '24/7 Duty Coordinator (Tivat & Podgorica):',
      jurisdiction: 'Licensed International Repatriation Agency • Montenegro',
      whatsappCta: 'WhatsApp 24/7',
      callCta: 'Direct Call',
    },
    header: {
      brandSubtitle: 'International Repatriation & Cremation • Montenegro',
      navServices: 'Core Services',
      navEstimator: 'Route & Cost Estimator',
      navProcess: '4-Step Procedure',
      navCredentials: 'Hospital & Legal Trust',
      navContact: 'Coordinator',
      emergencyBtn: '24/7 Emergency Line',
    },
    hero: {
      eyebrow: 'OFFICIAL CONSULAR, SANITARY & LOGISTICAL ASSISTANCE',
      headline: 'Compassionate, Lawful & Swift International Repatriation from Montenegro.',
      subheadline:
        'We handle 100% of sanitary permits, consular procedures, zinc soldering, and international transport (Air Cargo & Road) to EU, UK, CIS, and cremation in Serbia.',
      primaryCta: 'Speak with Coordinator 24/7',
      secondaryCta: 'Explore 4-Step Process',
      whatsappDirect: 'Instant WhatsApp Dispatch',
      trustMetrics: {
        timeLabel: 'Document & Permit Execution',
        timeValue: '24 – 48 Hours',
        presenceLabel: 'Family Presence Required',
        presenceValue: '0% (Remote PoA)',
        complianceLabel: 'International Standards',
        complianceValue: 'IATA Cargo HUM & EU',
      },
      captionTitle: 'Boka Kotorska & Adriatic Coast, Montenegro',
      captionSubtitle: 'Dignified cross-border coordination across all Montenegrin municipalities',
      protocolCard: {
        header: 'Live Operations & Legal Protocol',
        status: 'Duty Desk Active • Tivat / Podgorica',
        items: [
          {
            label: 'Hospital & Morgue Clearance',
            detail: 'Direct protocol with KCCG Podgorica, General Hospital Kotor, Bar & Berane',
          },
          {
            label: 'Sanitary & Customs Pass (Sprovodnica)',
            detail: 'Ministry of Health sanitary inspection & hermetic zinc sealing (lemljenje)',
          },
          {
            label: 'Consular & Court Translation',
            detail: 'Apostille, multilingual death certificates (Form C) & Embassy Laissez-Passer',
          },
        ],
        footerNote: 'Accepted by European Assistance Insurers • Official EFI Fiscal Invoicing & SEPA/SWIFT',
      },
    },
    services: {
      eyebrow: 'THREE PILLARS OF SPECIALIZED CARE',
      title: 'Comprehensive Cross-Border Repatriation & Cremation Services',
      subtitle:
        'Every legal, medical, and logistical step is executed by our licensed team in Montenegro—shielding families and assistance partners from bureaucratic friction.',
      includedLabel: 'Mandatory Procedures Included:',
      inquireServiceCta: 'Configure Route & Request Assistance',
      cards: [
        {
          id: 'cremation',
          badge: 'PILLAR A • OFFICIAL SERBIA PROTOCOL',
          title: 'Cremation in Serbia (Belgrade / Novi Sad)',
          subtitle: 'Complete Cross-Border Transfer & Urn Return with International Permits',
          description:
            'Because Montenegro currently has no operating crematorium, lawful cremation requires full international repatriation of the deceased to state facilities in Belgrade (JPK Pogrebne usluge) or Novi Sad. We manage the entire cross-border transport, cremation scheduling, and return or onward air dispatch of the sealed urn.',
          highlights: [
            'Bilateral Montenegro–Serbia sanitary transit pass (Sprovodnica)',
            'Consular authorization & verified family Power of Attorney',
            'Priority slot reservation at Belgrade or Novi Sad official crematorium',
            'Hermetic urn sealing with multilingual Cremation Certificate for airline cabin or cargo transport',
          ],
          legalReference: 'Compliant with Law on Burial Activity of Montenegro & Republic of Serbia Customs Law',
        },
        {
          id: 'air_cargo',
          badge: 'PILLAR B • IATA CARGO HUM & ROAD',
          title: 'International Road & Air Repatriation (Cargo HUM)',
          subtitle: 'EU, United Kingdom, Scandinavia, Eastern Europe & CIS Destinations',
          description:
            'Full preparation and international transport of the deceased by specialized refrigerated hearse or IATA Cargo HUM air freight from Podgorica (TGD), Tivat (TIV), or Dubrovnik/Tirana hubs to any destination in the UK, EU member states, Russia, Ukraine, or North America.',
          highlights: [
            'Hermetic zinc container soldering (lemljenje) & official sanitary lead wax seal',
            'Embalming / thanatopraxy certificate issued by licensed forensic specialist',
            'Priority Air Waybill (AWB Cargo HUM) booking & airport customs clearance',
            'Door-to-door handover to receiving funeral home in EU, UK, Ukraine, or CIS',
          ],
          legalReference: 'Strasbourg Agreement (1973), Berlin Convention & IATA Live/HUM Handling Regulations',
        },
        {
          id: 'road_transport',
          badge: 'PILLAR C • CONSULAR & LEGAL REPRESENTATION',
          title: 'Consular & Legal Assistance',
          subtitle: '100% Remote Execution via Power of Attorney Without Family Travel Required',
          description:
            'Grieving relatives do not need to fly to Montenegro to navigate police, hospital, or embassy procedures. Acting under an official Power of Attorney, our legal coordinators obtain all medical certificates, court translations, and diplomatic clearances in Podgorica.',
          highlights: [
            'Remote Power of Attorney (Punomoćje) execution within 2 hours of first contact',
            'Retrieval of Medical Certificate of Cause of Death (Potvrda o smrti) & autopsy reports',
            'Sworn court-certified translations (Sudski tumač) into English, German, Russian, or French',
            'Direct representation at Embassies & Consulates in Podgorica and Belgrade',
          ],
          legalReference: 'Vienna Convention on Consular Relations & Montenegrin Administrative Procedure Act',
        },
      ],
    },
    estimator: {
      eyebrow: 'TRANSPARENT ROUTE & PROCEDURE ESTIMATOR',
      title: 'Interactive Timeframe, Protocol & Cost Calculator',
      subtitle:
        'Select the required service and destination region to inspect exact regulatory timeframes, included statutory procedures, and transparent fiscal reference ranges.',
      step1Title: '1. Select Primary Service',
      step2Title: '2. Select Destination Region',
      step3Title: '3. Collection Location in Montenegro',
      services: {
        cremation: {
          label: 'Cremation Transfer to Belgrade',
          shortDesc: 'Cross-border transfer to Serbia, official cremation & urn return/dispatch',
          tag: 'Most Requested for Expats & Tourists',
        },
        air_cargo: {
          label: 'Air Cargo Repatriation (Cargo HUM)',
          shortDesc: 'Zinc container sealing, AWB booking & air freight from Podgorica / Tivat',
          tag: 'IATA Certified Air Protocol',
        },
        road_transport: {
          label: 'Regional & EU Road Repatriation',
          shortDesc: 'Dedicated specialized climate-controlled hearse door-to-door across Europe',
          tag: 'Direct Border Transit',
        },
      },
      regions: {
        balkans: {
          label: 'Serbia / Regional Balkans',
          countries: 'Serbia (Belgrade/Novi Sad), Croatia, Bosnia & Herzegovina, Slovenia, Albania',
        },
        eu_uk: {
          label: 'European Union / United Kingdom',
          countries: 'Germany, UK, France, Italy, Austria, Switzerland, Scandinavia, Benelux, Poland',
        },
        cis_east: {
          label: 'Eastern Europe / CIS & International',
          countries: 'Ukraine, Baltic States, Kazakhstan, Israel, USA, Canada, Turkey & connecting hubs',
        },
      },
      locations: {
        boka: {
          label: 'Boka Bay (Tivat / Kotor / Herceg Novi)',
          facility: 'General Hospital Kotor / Regional Morgue',
        },
        podgorica: {
          label: 'Central (Podgorica / Cetinje / Danilovgrad)',
          facility: 'Clinical Center of Montenegro (KCCG Podgorica)',
        },
        coast_south: {
          label: 'Southern Coast (Budva / Bar / Ulcinj)',
          facility: 'General Hospital Stari Bar',
        },
        north: {
          label: 'Northern Region (Nikšić / Berane / Žabljak)',
          facility: 'Regional General Hospitals North',
        },
      },
      output: {
        summaryHeader: 'ESTIMATED PROTOCOL & LOGISTICS BRIEF',
        timeframeLabel: 'Estimated Completion Timeframe',
        costEstimateLabel: 'Transparent Reference Cost (All Permits Included)',
        billingNote: 'Official Montenegro EFI Fiscal Invoice • Direct Insurance Settlement or SEPA/SWIFT',
        proceduresTitle: 'Included Statutory & Logistical Procedures',
        documentChecklistTitle: 'Official Documentation Package Delivered',
        whatsappBtn: 'Send Parameters via WhatsApp',
        modalBtn: 'Request Formal Written Quote',
        disclaimer:
          'Timeframes begin upon Power of Attorney authorization. Official state fees, zinc container specification, and customs clearance are itemized transparently without hidden surcharges.',
      },
      matrix: {
        cremation: {
          balkans: {
            timeframe: '48 – 72 Hours (Full Urn Return)',
            priceRange: '€1,850 – €2,450',
            routeSummary: 'Montenegro Hospital → Border Dobrakovo/Gostun → Belgrade State Crematorium → Urn Return',
            procedures: [
              'Morgue collection, hygienic preparation & statutory transit coffin',
              'Montenegrin Ministry of Health Sanitary Permit (Sprovodnica)',
              'Customs export/import clearance & Belgrade Crematorium fee',
              'Sealed Urn delivery back to Montenegro or family handover in Belgrade',
            ],
            documentsIssued: [
              'International Death Certificate (Multilingual Vienna Convention Form C)',
              'Official Cremation Certificate (Potvrda o kremaciji)',
              'Sanitary Urn Transit Permit for border/airline carry-on',
            ],
          },
          eu_uk: {
            timeframe: '72 – 96 Hours (Cremation + EU/UK Urn Dispatch)',
            priceRange: '€2,150 – €2,850',
            routeSummary: 'Montenegro → Belgrade Crematorium → Embassy Urn Clearance → EU/UK Handover or Air Cabin Permit',
            procedures: [
              'Full cross-border transport to Belgrade / Novi Sad Crematorium',
              'Embassy consular clearance in Podgorica & Belgrade',
              'Court-certified translation of medical & cremation records (EN/DE/FR)',
              'Hermetic urn sealing & customs certificate for EU/UK flight or courier',
            ],
            documentsIssued: [
              'Apostilled Death Certificate + Sworn Translation',
              'Consular Laissez-Passer for Cinerary Urn',
              'IATA Cabin / Diplomatic Cargo Urn Clearance Certificate',
            ],
          },
          cis_east: {
            timeframe: '72 – 96 Hours (Cremation + CIS/East Dispatch)',
            priceRange: '€2,100 – €2,750',
            routeSummary: 'Montenegro → Belgrade State Crematorium → Consular Legalization → International Urn Transit',
            procedures: [
              'Remote Power of Attorney execution (no family travel to Montenegro required)',
              'Bilateral sanitary clearance & state cremation in Serbia',
              'Sworn translation into Russian/Ukrainian/English & consular verification',
              'Accompanied urn delivery or flight cabin documentation package',
            ],
            documentsIssued: [
              'Official Death Certificate with Court Translation & Stamp',
              'Belgrade Crematorium Certificate & Hermetic Seal Protocol',
              'Customs Declaration for Unimpeded Border Crossing',
            ],
          },
        },
        air_cargo: {
          balkans: {
            timeframe: '24 – 48 Hours',
            priceRange: '€2,400 – €3,100',
            routeSummary: 'Podgorica (TGD) / Tivat (TIV) Airport → Regional Hub Cargo HUM',
            procedures: [
              'Sanitary embalming & hermetic zinc container soldering (lemljenje)',
              'Sanitary Inspector verification & lead seal placement',
              'Airport customs forwarder processing & Cargo HUM Air Waybill',
              'Coordination with receiving funeral director at destination airport',
            ],
            documentsIssued: [
              'International Sprovodnica (Mortuary Passport)',
              'Certificate of Hermetic Zinc Soldering & Non-Contagious Status',
              'IATA Master Air Waybill (MAWB - Cargo HUM)',
            ],
          },
          eu_uk: {
            timeframe: '36 – 72 Hours',
            priceRange: '€2,950 – €3,900',
            routeSummary: 'Podgorica (TGD) / Dubrovnik / Tirana → Frankfurt, London, Vienna, Zurich, Paris or EU Hub',
            procedures: [
              'Full regulatory embalming (thanatopraxy) & zinc liner soldering',
              'Embassy Mortuary Passport (Laissez-Passer) in Podgorica',
              'Priority Cargo HUM flight booking & airport security screening',
              'Full EFI fiscal breakdown for EU/UK assistance insurance reimbursement',
            ],
            documentsIssued: [
              'Multilingual Death Certificate (Form C) + Apostille',
              'Embassy Laissez-Passer & Sanitary Sprovodnica',
              'Embalming & Hermetic Zinc Sealing Certificates',
            ],
          },
          cis_east: {
            timeframe: '48 – 72 Hours',
            priceRange: '€3,100 – €4,250',
            routeSummary: 'Podgorica (TGD) / Belgrade (BEG) / Istanbul Hub → Destination Airport or Combined Transit',
            procedures: [
              'Consular registration of death & notary translation of all medical records',
              'Hermetic zinc container with wooden air-freight outer casing',
              'Multi-leg IATA Cargo HUM routing via Belgrade, Istanbul, or Warsaw',
              '24/7 tracking updates for family and receiving funeral agency',
            ],
            documentsIssued: [
              'Consular Mortuary Permit & Legalized Death Certificate',
              'Forensic Embalming & Sanitary Zinc Seal Protocol',
              'International Customs Transit & Air Waybill Manifest',
            ],
          },
        },
        road_transport: {
          balkans: {
            timeframe: '24 – 36 Hours',
            priceRange: '€1,250 – €1,950',
            routeSummary: 'Direct Specialized Hearse from Montenegro to Serbia, Bosnia, Croatia, Slovenia or Albania',
            procedures: [
              'Collection from hospital morgue & hygienic dressing/preparation',
              'Statutory zinc liner or cross-border sanitary coffin per bilateral treaty',
              'Ministry of Health Sprovodnica & priority border customs clearance',
              'Direct delivery to cemetery or municipal chapel at destination',
            ],
            documentsIssued: [
              'International Death Certificate (Izvod iz matične knjige umrlih)',
              'Sanitary Border Transit Pass (Sprovodnica)',
              'Customs Export Transit Declaration',
            ],
          },
          eu_uk: {
            timeframe: '48 – 72 Hours',
            priceRange: '€2,450 – €3,500',
            routeSummary: 'Montenegro → Croatia / Hungary Schengen Border → Germany, Austria, Italy, Switzerland, Poland',
            procedures: [
              'Hermetic zinc container soldering & sanitary inspector sealing',
              'Schengen transit permit & Embassy consular authorization',
              'Two-driver specialized climate-controlled hearse for continuous transit',
              'Direct handover to local parish or municipal funeral home in EU',
            ],
            documentsIssued: [
              'Form C International Death Certificate',
              'EU/Schengen Sanitary Mortuary Laissez-Passer',
              'Hermetic Zinc Sealing & Sanitary Compliance Certificate',
            ],
          },
          cis_east: {
            timeframe: '60 – 96 Hours',
            priceRange: '€2,650 – €3,800',
            routeSummary: 'Montenegro → Serbia → Hungary / Romania / Poland Corridor → Ukraine, Baltics & Eastern Europe',
            procedures: [
              'Complete consular legalization & sworn translations (UA/RU/EN)',
              'Hermetic zinc container soldering & sanitary lead seal',
              'Priority diplomatic & humanitarian border customs corridor clearance',
              'Direct handover to family-designated city across Ukraine or Eastern Europe',
            ],
            documentsIssued: [
              'Notarized & Translated Death Certificate + Medical Cause of Death',
              'Sanitary Sprovodnica & Consular Transit Authorization',
              'Full Customs Manifest & Official Fiscal Invoice',
            ],
          },
        },
      },
    },
    timeline: {
      eyebrow: 'CLEAR & REASSURING 4-STEP PROCEDURE',
      title: 'How We Handle Everything From the First Phone Call',
      subtitle:
        'Designed for clarity during difficult moments. Every step is documented, photographed for official records if requested, and shared with the family or insurer in real time.',
      remoteAssuranceBadge: 'No Family Travel to Montenegro Required • 100% Handled via Power of Attorney',
      steps: [
        {
          number: '01',
          timeframe: '0 – 2 Hours',
          title: 'Initial Call & Power of Attorney',
          description:
            'Immediate consultation with our duty coordinator in English, Russian, or Montenegrin. We verify the location of the deceased, coordinate transfer to the nearest clinical morgue (Kotor, Podgorica, Bar), and issue a bilingual Power of Attorney so we can act on your behalf immediately.',
          deliverable: 'Case Registration & Signed Remote Power of Attorney',
        },
        {
          number: '02',
          timeframe: '24 – 48 Hours',
          title: 'Medical, Sanitary & Consular Clearance',
          description:
            'Our legal specialists obtain the Medical Certificate of Death (Potvrda o smrti), civil registry extract, Apostille stamps, sworn court translations, and Embassy Laissez-Passer in Podgorica without requiring relatives to appear in person.',
          deliverable: 'International Death Certificate & Embassy Transit Permit',
        },
        {
          number: '03',
          timeframe: 'Day 2 – 3',
          title: 'Zinc Sealing & Sanitary Inspection (Sprovodnica)',
          description:
            'In the presence of the Republic Sanitary Inspector, the zinc liner is hermetically soldered (lemljenje) and sealed with an official state wax/lead stamp, issuing the mandatory Sprovodnica for international air or border crossing.',
          deliverable: 'Sanitary Sprovodnica & Hermetic Soldering Certificate',
        },
        {
          number: '04',
          timeframe: 'Scheduled Window',
          title: 'Scheduled Transport (Air/Road) & Final Documentation',
          description:
            'We execute the scheduled Cargo HUM flight from Podgorica/Tivat, road repatriation to EU/CIS, or cremation transfer to Belgrade—providing live airwaybill/GPS tracking and handing over the complete folder of original documents.',
          deliverable: 'AWB / Customs Handover & Original Legal Document Dossier',
        },
      ],
    },
    trust: {
      eyebrow: 'INSTITUTIONAL CREDENTIALS & COMPLIANCE',
      title: 'Trusted by Hospitals, Embassies & European Assistance Insurers',
      subtitle:
        'Memorijal d.o.o. operates strictly within Montenegrin public health law and international consular conventions, providing verifiable institutional documentation for every case.',
      institutionsTitle: 'Direct Operational Coordination With:',
      institutions: [
        {
          name: 'Clinical Center of Montenegro (KCCG)',
          role: 'Pathology & Forensic Medicine Department clearances',
          location: 'Podgorica',
        },
        {
          name: 'General Hospital Kotor (Opšta bolnica Kotor)',
          role: 'Coastal municipal hospital & regional morgue coordination',
          location: 'Kotor / Tivat / Boka Bay',
        },
        {
          name: 'Foreign Embassies & Consular Sections',
          role: 'Diplomatic mortuary passports, notarization & citizen registry',
          location: 'Podgorica & Belgrade',
        },
        {
          name: 'European Assistance & Travel Insurers',
          role: 'Direct cost-coverage guarantees (GOP), SEPA/SWIFT & EFI invoicing',
          location: 'EU, UK & International',
        },
      ],
      complianceTitle: 'Financial & Regulatory Transparency',
      compliancePoints: [
        {
          title: 'Licensed Montenegrin Legal Entity (d.o.o.)',
          description:
            'Registered in the Central Registry of Business Entities of Montenegro (CRPS) for specialized funeral and international repatriation services.',
        },
        {
          title: 'Electronic Fiscal Invoicing (EFI)',
          description:
            'Every invoice bears a verifiable QR code issued through the Montenegro Tax Administration (Poreska uprava)—mandatory for state pension reimbursement and insurance claims.',
        },
        {
          title: 'International SWIFT / SEPA IBAN Settlements',
          description:
            'We accept direct corporate bank transfers from international insurers, embassies, and family accounts across EU, UK, and international jurisdictions.',
        },
      ],
      legalBanner: {
        title: 'Official Documentation for Insurance & State Compensation',
        text: 'All itemized invoices, sanitary permits, and consular receipts are formatted to meet strict audit requirements of EU/UK assistance companies and national social security authorities.',
        badges: ['CRPS Registered DOO', 'EFI QR Fiscalization', 'SEPA / SWIFT IBAN', 'IATA Cargo HUM Compliant'],
      },
    },
    director: {
      eyebrow: 'PERSONAL ACCOUNTABILITY & SUPERVISION',
      name: 'Maksym Kovalenko',
      role: 'Executive Coordinator • Memorijal d.o.o. Montenegro',
      credentials: 'International Repatriation, Consular Protocol & Cross-Border Logistics',
      quote:
        '“When a loss occurs far from home, families should never have to navigate foreign ministries, hospital morgues, or customs borders alone. Every case entrusted to Memorijal is supervised personally from the first phone call until final arrival—with quiet dignity, absolute legal precision, and complete financial transparency.”',
      secondaryParagraph:
        'Our duty team speaks fluent English, Russian, Ukrainian, and Montenegrin/Serbian. Whether you are a family member calling at night or an international assistance officer coordinating an urgent Cargo HUM dispatch, you speak directly with a decision-maker who knows Montenegrin health regulations inside out.',
      directContactLabel: 'Direct Executive Line (24/7):',
      guaranteeItems: [
        'Personal oversight of hospital, forensic & sanitary inspection protocols',
        'Written fixed-scope quotation before any commitment',
        'Direct updates via WhatsApp, phone, or email at every milestone',
      ],
    },
    modal: {
      title: '24/7 Coordinator Dispatch & Case Consultation',
      subtitle:
        'Provide the initial details below. Our duty coordinator in Montenegro will respond immediately via phone or WhatsApp with a clear action plan and exact written estimate.',
      urgentNotice: 'For immediate voice assistance, call +382 68 914 816 at any hour.',
      nameLabel: 'Your Full Name / Officer Name',
      namePlaceholder: 'e.g., Anna Lindqvist / EuroCross Assistance',
      contactLabel: 'Phone Number (WhatsApp) or Official Email',
      contactPlaceholder: '+44 7700 900000 or name@domain.com',
      relationLabel: 'Your Capacity',
      relations: {
        family: 'Family Member / Next of Kin',
        insurance: 'Insurance / Assistance Coordinator',
        embassy: 'Embassy / Consular Official',
        legal: 'Legal Representative / Employer',
      },
      serviceLabel: 'Required Procedure',
      regionLabel: 'Destination Country / Region',
      locationLabel: 'Current Location in Montenegro',
      notesLabel: 'Additional Context (Citizenship, Hospital Name, or Policy Ref.)',
      notesPlaceholder: 'Optional: Citizenship of the deceased, municipality in Montenegro, or urgent flight questions...',
      submitBtn: 'Submit Urgent Dispatch Request',
      whatsappRedirectBtn: 'Open Directly in WhatsApp',
      closeBtn: 'Close Window',
      validationError: 'Please provide your name and a valid phone number or email address so our coordinator can reach you.',
      successTitle: 'Dispatch Request Logged — Coordinator Notified',
      successMessage:
        'Your case brief has been assigned highest priority. Executive Coordinator Maksym Kovalenko or our on-duty specialist will contact you within 10–15 minutes.',
      referenceLabel: 'Protocol Reference ID:',
    },
    footer: {
      description:
        'Specialized agency for international repatriation of the deceased, sanitary clearance (Sprovodnica), consular legalization, Cargo HUM air freight, and cross-border cremation transfers to Serbia.',
      quickLinksTitle: 'Procedures & Navigation',
      emergencyDispatchTitle: '24/7 Duty Operations',
      legalEntityTitle: 'Registered Legal Entity',
      officeTivat: 'Coastal Operations: Tivat & Kotor (Boka Kotorska), Montenegro',
      officePodgorica: 'Consular & Clinical Hub: Podgorica (near KCCG & Embassies), Montenegro',
      fiscalNotice: 'MEMORIJAL d.o.o. • PIB: 03489217 • PDV: 30/31-20948-4 • Official EFI Fiscal Invoicing • SWIFT/SEPA IBAN',
      copyright: '© 2026 Memorijal d.o.o. Montenegro. All rights reserved.',
      privacyNote: 'Strict confidentiality & GDPR / Montenegrin Personal Data Protection compliance.',
      creditPrefix: 'Designed, engineered & maintained by',
      creditStudio: 'Corebit Studio',
    },
  },
  RU: {
    meta: {
      langCode: 'ru',
      langName: 'Русский',
    },
    topBar: {
      badge247: 'Дежурная линия 24/7',
      emergencyLine: 'Координатор 24/7 (Тиват и Подгорица):',
      jurisdiction: 'Лицензированная служба репатриации и кремации • Черногория',
      whatsappCta: 'WhatsApp 24/7',
      callCta: 'Позвонить',
    },
    header: {
      brandSubtitle: 'Международная репатриация и кремация • Черногория',
      navServices: 'Услуги',
      navEstimator: 'Расчет маршрута и сроков',
      navProcess: 'Этапы процедуры',
      navCredentials: 'Лицензии и госпитали',
      navContact: 'Руководитель',
      emergencyBtn: 'Экстренная связь 24/7',
    },
    hero: {
      eyebrow: 'ОФИЦИАЛЬНОЕ КОНСУЛЬСКОЕ, САНИТАРНОЕ И ЛОГИСТИЧЕСКОЕ СОПРОВОЖДЕНИЕ',
      headline: 'Бережная, законная и оперативная международная репатриация из Черногории.',
      subheadline:
        'Мы берем на себя 100% санитарных разрешений, консульских процедур, опайку цинкового гроба и международную перевозку (авиа Груз 200 / Cargo HUM и автотранспорт) в страны ЕС, Великобританию, СНГ, а также официальную кремацию в Сербии.',
      primaryCta: 'Связаться с координатором 24/7',
      secondaryCta: 'Изучить 4 этапа процедуры',
      whatsappDirect: 'Написать в WhatsApp',
      trustMetrics: {
        timeLabel: 'Оформление разрешений',
        timeValue: '24 – 48 часов',
        presenceLabel: 'Присутствие семьи в ЧГ',
        presenceValue: 'Не требуется (по доверенности)',
        complianceLabel: 'Международный стандарт',
        complianceValue: 'IATA Cargo HUM и ЕС',
      },
      captionTitle: 'Бока-Которский залив и побережье Адриатики, Черногория',
      captionSubtitle: 'Официальная координация во всех муниципалитетах Черногории',
      protocolCard: {
        header: 'Оперативный и правовой протокол',
        status: 'Дежурная служба активна • Тиват / Подгорица',
        items: [
          {
            label: 'Взаимодействие с больницами и моргами',
            detail: 'Прямой протокол с KCCG в Подгорице, госпиталем Котора, Бара и Беране',
          },
          {
            label: 'Санитарный паспорт (Sprovodnica)',
            detail: 'Санитарная инспекция Минздрава ЧГ и герметичная опайка цинка (lemljenje)',
          },
          {
            label: 'Консульства и судебные переводы',
            detail: 'Апостиль, международные свидетельства (Форма C) и разрешения посольств',
          },
        ],
        footerNote: 'Работаем со страховыми и ассистанс-компаниями • Фискальные чеки EFI и оплата SEPA/SWIFT',
      },
    },
    services: {
      eyebrow: 'ТРИ КЛЮЧЕВЫХ НАПРАВЛЕНИЯ ПОМОЩИ',
      title: 'Полный комплекс услуг по репатриации и кремации под ключ',
      subtitle:
        'Каждая юридическая, медицинская и таможенная процедура выполняется нашей лицензированной командой в Черногории — освобождая семью от бюрократических сложностей.',
      includedLabel: 'Обязательные процедуры в составе услуги:',
      inquireServiceCta: 'Рассчитать маршрут и запросить помощь',
      cards: [
        {
          id: 'cremation',
          badge: 'НАПРАВЛЕНИЕ A • КРЕМАЦИЯ В СЕРБИИ',
          title: 'Кремация в Сербии (Белград / Нови-Сад)',
          subtitle: 'Международная перевозка в государственный крематорий и возврат урны с документами',
          description:
            'В связи с отсутствием действующего крематория на территории Черногории официальная процедура кремации проводится в государственных крематориях Белграда или Нови-Сада. Мы полностью организуем трансграничную перевозку, кремацию и возврат герметичной урны в Черногорию или ее отправку в любую страну мира.',
          highlights: [
            'Оформление санитарного пропуска (Sprovodnica) для пересечения границы Черногория–Сербия',
            'Консульское согласование и работа по дистанционной доверенности от родственников',
            'Приоритетная бронь времени в государственном крематории Белграда или Нови-Сада',
            'Герметичное опломбирование урны и справка о кремации для беспрепятственного перелета',
          ],
          legalReference: 'В строгом соответствии с законодательством Черногории и таможенным регламентом Сербии',
        },
        {
          id: 'air_cargo',
          badge: 'НАПРАВЛЕНИЕ B • АВИА (CARGO HUM) И АВТО',
          title: 'Международная авиа- и авторепатриация (Груз 200 / Cargo HUM)',
          subtitle: 'Доставка в страны ЕС, Великобританию, Украину, РФ, СНГ и по всему миру',
          description:
            'Полная подготовка и транспортировка усопшего специализированным катафалком или авиарейсом (IATA Cargo HUM) из аэропортов Подгорицы (TGD), Тивата (TIV), Дубровника или Тираны в страны Евросоюза, Великобританию, Украину, Россию, Казахстан и Северную Америку.',
          highlights: [
            'Герметичная опайка цинкового вкладыша (lemljenje) и государственная пломба инспектора',
            'Бальзамирование (танатопраксия) с выдачей официального медицинского сертификата',
            'Приоритетное бронирование авианакладной (AWB Cargo HUM) и таможенное оформление',
            'Передача принимающей похоронной службе в ЕС, Великобритании, Украине или странах СНГ',
          ],
          legalReference: 'Страсбургское соглашение (1973), Берлинская конвенция и правила IATA Cargo HUM',
        },
        {
          id: 'road_transport',
          badge: 'НАПРАВЛЕНИЕ C • КОНСУЛЬСКАЯ И ЮРИДИЧЕСКАЯ ПОМОЩЬ',
          title: 'Консульское и юридическое сопровождение',
          subtitle: '100% дистанционное оформление по доверенности без приезда семьи в Черногорию',
          description:
            'Родственникам не нужно прилетать в Черногорию для посещения моргов, полиции, судов или посольств. Действуя по официальной доверенности, наши юристы получают все медицинские справки, переводы судебных переводчиков и консульские разрешения в Подгорице.',
          highlights: [
            'Оформление дистанционной доверенности (Punomoćje) в течение 2 часов после обращения',
            'Получение медицинского свидетельства о смерти (Potvrda o smrti) и заключений патологоанатома',
            'Заверенные переводы судебного переводчика (Sudski tumač) на русский, украинский, английский и др.',
            'Прямое представительство в посольствах и консульствах в Подгорице и Белграде',
          ],
          legalReference: 'Венская конвенция о консульских сношениях и Закон об административной процедуре ЧГ',
        },
      ],
    },
    estimator: {
      eyebrow: 'ПРОЗРАЧНЫЙ КАЛЬКУЛЯТОР МАРШРУТА И СРОКОВ',
      title: 'Расчет сроков, регламента и ориентировочной стоимости',
      subtitle:
        'Выберите необходимую процедуру и регион назначения, чтобы увидеть точные нормативные сроки, перечень включенных государственных процедур и прозрачный диапазон стоимости.',
      step1Title: '1. Выберите тип процедуры',
      step2Title: '2. Выберите регион назначения',
      step3Title: '3. Город / госпиталь в Черногории',
      services: {
        cremation: {
          label: 'Трансфер на кремацию в Белград',
          shortDesc: 'Перевозка в Сербию, официальная кремация и возврат/отправка урны',
          tag: 'Оптимальное решение для экспатов и туристов',
        },
        air_cargo: {
          label: 'Авиарепатриация (Cargo HUM / Груз 200)',
          shortDesc: 'Опайка цинка, бронь AWB и авиаперелет из Подгорицы / Тивата',
          tag: 'Сертифицированный протокол IATA',
        },
        road_transport: {
          label: 'Авторепатриация (Балканы / ЕС / СНГ)',
          shortDesc: 'Специализированный рефрижераторный катафалк «от двери до двери»',
          tag: 'Прямой наземный транзит',
        },
      },
      regions: {
        balkans: {
          label: 'Сербия и страны Балкан',
          countries: 'Сербия (Белград / Нови-Сад), Хорватия, Босния и Герцеговина, Словения, Албания',
        },
        eu_uk: {
          label: 'Европейский Союз и Великобритания',
          countries: 'Германия, Великобритания, Франция, Италия, Австрия, Швейцария, Польша, страны Балтии',
        },
        cis_east: {
          label: 'Восточная Европа, СНГ и другие страны',
          countries: 'Украина, РФ, Беларусь, Казахстан, Израиль, США, Канада, Турция (транзитные хабы)',
        },
      },
      locations: {
        boka: {
          label: 'Бока-Которский залив (Тиват / Котор / Херцег-Нови)',
          facility: 'Общая больница г. Котор (Opšta bolnica Kotor)',
        },
        podgorica: {
          label: 'Центральный регион (Подгорица / Цетинье)',
          facility: 'Клинический центр Черногории (KCCG Podgorica)',
        },
        coast_south: {
          label: 'Южное побережье (Будва / Бар / Улцинь)',
          facility: 'Общая больница г. Бар (Opšta bolnica Bar)',
        },
        north: {
          label: 'Северный регион (Никшич / Беране / Жабляк)',
          facility: 'Региональные клинические больницы Севера',
        },
      },
      output: {
        summaryHeader: 'РЕГЛАМЕНТ И СПЕЦИФИКАЦИЯ МАРШРУТА',
        timeframeLabel: 'Нормативный срок выполнения',
        costEstimateLabel: 'Ориентировочная стоимость (все пошлины включены)',
        billingNote: 'Официальный фискальный счет (EFI) • Прямая работа со страховыми или оплата по IBAN (SEPA/SWIFT)',
        proceduresTitle: 'Включенные государственные и логистические процедуры',
        documentChecklistTitle: 'Пакет выдаваемых официальных документов',
        whatsappBtn: 'Отправить расчет в WhatsApp',
        modalBtn: 'Запросить официальную смету',
        disclaimer:
          'Отсчет сроков начинается с момента подписания доверенности. Все государственные пошлины, цинковый контейнер и таможенное оформление фиксируются в договоре без скрытых доплат.',
      },
      matrix: {
        cremation: {
          balkans: {
            timeframe: '48 – 72 часа (с возвратом урны)',
            priceRange: '€1,850 – €2,450',
            routeSummary: 'Госпиталь в ЧГ → Таможня Добраково/Гостун → Гос. крематорий Белграда → Возврат урны',
            procedures: [
              'Забор из морга, санитарная подготовка и транспортировочный гроб',
              'Санитарное разрешение Минздрава Черногории (Sprovodnica)',
              'Таможенное оформление на границе и оплата государственного крематория в Белграде',
              'Доставка опломбированной урны обратно в Черногорию или передача семье в Белграде',
            ],
            documentsIssued: [
              'Международное свидетельство о смерти (Форма C / Венская конвенция)',
              'Официальная справка о кремации (Potvrda o kremaciji)',
              'Санитарный сертификат на провоз урны через границу и в ручной клади самолета',
            ],
          },
          eu_uk: {
            timeframe: '72 – 96 часов (Кремация + отправка урны в ЕС/UK)',
            priceRange: '€2,150 – €2,850',
            routeSummary: 'Черногория → Крематорий Белграда → Консульское разрешение → Передача урны в ЕС / Британии',
            procedures: [
              'Международная перевозка в государственный крематорий Белграда / Нови-Сада',
              'Консульское согласование в посольствах в Подгорице и Белграде',
              'Заверенный судебный перевод медицинских и кремационных документов (EN/DE/FR)',
              'Герметичное опломбирование урны и таможенный допуск для авиаперелета в ЕС/UK',
            ],
            documentsIssued: [
              'Свидетельство о смерти с Апостилем и заверенным переводом',
              'Консульский пропуск (Laissez-Passer) на урну с прахом',
              'Сертификат безопасности IATA для провоза урны в салоне самолета или авиапочтой',
            ],
          },
          cis_east: {
            timeframe: '72 – 96 часов (Кремация + документы для СНГ/Украины)',
            priceRange: '€2,100 – €2,750',
            routeSummary: 'Черногория → Гос. крематорий Белграда → Консульская легализация → Возврат или отправка урны',
            procedures: [
              'Полное оформление по дистанционной доверенности без приезда родственников',
              'Двусторонний санитарный пропуск и официальная кремация в Сербии',
              'Судебный перевод всех документов на русский/украинский/английский языки',
              'Доставка урны или подготовка полного пакета для вылета сопровождающего лица',
            ],
            documentsIssued: [
              'Свидетельство о смерти с печатью судебного переводчика и Апостилем',
              'Справка государственного крематория Белграда и акт герметизации урны',
              'Таможенная декларация для беспрепятственного ввоза урны',
            ],
          },
        },
        air_cargo: {
          balkans: {
            timeframe: '24 – 48 часов',
            priceRange: '€2,400 – €3,100',
            routeSummary: 'Аэропорт Подгорица (TGD) / Тиват (TIV) → Региональный авиахаб Cargo HUM',
            procedures: [
              'Санитарное бальзамирование и герметичная опайка цинкового контейнера (lemljenje)',
              'Осмотр государственным санитарным инспектором и установка пломбы',
              'Таможенное оформление в аэропорту и выпуск авианакладной Cargo HUM',
              'Координация с принимающей ритуальной службой в аэропорту прибытия',
            ],
            documentsIssued: [
              'Международный санитарный паспорт (Sprovodnica)',
              'Справка о герметичной опайке цинка и отсутствии инфекционной опасности',
              'Мастер-авианакладная IATA (MAWB - Cargo HUM)',
            ],
          },
          eu_uk: {
            timeframe: '36 – 72 часа',
            priceRange: '€2,950 – €3,900',
            routeSummary: 'Подгорица (TGD) / Дубровник / Тирана → Франкфурт, Лондон, Вена, Цюрих, Париж и др.',
            procedures: [
              'Полная танатопраксия (бальзамирование) и герметичная опайка цинкового вкладыша',
              'Получение консульского паспорта (Laissez-Passer) в посольстве в Подгорице',
              'Приоритетное бронирование рейса Cargo HUM и прохождение службы безопасности аэропорта',
              'Полный пакет фискальных документов EFI для возмещения по европейской страховке',
            ],
            documentsIssued: [
              'Многоязычное свидетельство о смерти (Форма C) + Апостиль',
              'Консульский пропуск Laissez-Passer и санитарная Sprovodnica',
              'Сертификаты бальзамирования и герметичной опайки цинка',
            ],
          },
          cis_east: {
            timeframe: '48 – 72 часа',
            priceRange: '€3,100 – €4,250',
            routeSummary: 'Подгорица (TGD) / Белград (BEG) / Стамбул → Аэропорт назначения или комбинированный транзит',
            procedures: [
              'Консульская регистрация смерти и нотариальный перевод всех медицинских актов',
              'Герметичный цинковый контейнер в деревянном транспортировочном коробе по стандарту IATA',
              'Организация стыковочного авиамаршрута Cargo HUM через Белград, Стамбул или Варшаву',
              'Круглосуточный мониторинг стыковок и информирование семьи на каждом этапе',
            ],
            documentsIssued: [
              'Консульское разрешение на ввоз и легализованное свидетельство о смерти',
              'Акт судебно-медицинского бальзамирования и протокол опайки цинка',
              'Международная таможенная декларация и авианакладная Cargo HUM',
            ],
          },
        },
        road_transport: {
          balkans: {
            timeframe: '24 – 36 часов',
            priceRange: '€1,250 – €1,950',
            routeSummary: 'Прямой спецтранспорт из Черногории в Сербию, Боснию, Хорватию, Словению или Албанию',
            procedures: [
              'Забор из больничного морга, омовение, облачение и санитарная подготовка',
              'Международный гроб с цинковым вкладышем согласно двусторонним конвенциям',
              'Санитарный пропуск Минздрава (Sprovodnica) и приоритетный проход границы',
              'Прямая доставка к месту прощания или захоронения в городе назначения',
            ],
            documentsIssued: [
              'Международное свидетельство о смерти (Izvod iz matične knjige umrlih)',
              'Санитарный пограничный пропуск (Sprovodnica)',
              'Экспортная таможенная декларация',
            ],
          },
          eu_uk: {
            timeframe: '48 – 72 часа',
            priceRange: '€2,450 – €3,500',
            routeSummary: 'Черногория → Граница Шенгена (Хорватия/Венгрия) → Германия, Австрия, Италия, Польша, Чехия',
            procedures: [
              'Герметичная опайка цинкового контейнера и пломбирование санитарным инспектором',
              'Оформление транзитного разрешения ЕС/Шенгена и консульского допуска',
              'Рейс специализированного катафалка с экипажем из двух водителей без задержек',
              'Передача принимающему муниципальному или частному похоронному дому в ЕС',
            ],
            documentsIssued: [
              'Международное свидетельство о смерти (Форма C)',
              'Санитарный паспорт ЕС/Шенгена (Mortuary Laissez-Passer)',
              'Сертификат герметичной опайки и эпидемиологической безопасности',
            ],
          },
          cis_east: {
            timeframe: '60 – 96 часов',
            priceRange: '€2,650 – €3,800',
            routeSummary: 'Черногория → Сербия → Коридор Венгрия / Румыния / Польша → Украина, страны Балтии и СНГ',
            procedures: [
              'Полная консульская легализация и заверенные переводы документов (UA/RU/EN)',
              'Герметичная опайка цинкового вкладыша и государственная свинцовая пломба',
              'Приоритетное прохождение пограничных таможенных пунктов по дипломатическому регламенту',
              'Адресная доставка в любой регион Украины, стран Балтии или Восточной Европы',
            ],
            documentsIssued: [
              'Нотариально переведенное свидетельство о смерти и врачебная справка о причине смерти',
              'Санитарная Sprovodnica и консульское разрешение на транзит',
              'Полный таможенный манифест и официальный фискальный счет',
            ],
          },
        },
      },
    },
    timeline: {
      eyebrow: 'ПОНЯТНЫЙ И НАДЕЖНЫЙ ПРОЦЕСС ИЗ 4 ЭТАПОВ',
      title: 'Как мы организуем всю процедуру с первого звонка',
      subtitle:
        'Максимальная ясность в сложной ситуации. Каждый шаг фиксируется документально и согласуется с семьей или страховым координатором в режиме реального времени.',
      remoteAssuranceBadge: 'Приезд родственников в Черногорию не требуется • 100% оформление по доверенности',
      steps: [
        {
          number: '01',
          timeframe: '0 – 2 часа',
          title: 'Первичный звонок и оформление доверенности',
          description:
            'Немедленная консультация дежурного координатора на русском, английском или черногорском языке. Мы фиксируем местонахождение усопшего, координируем перевод в клинический морг (Котор, Подгорица, Бар) и направляем двуязычную доверенность для немедленного начала работы.',
          deliverable: 'Регистрация дела и дистанционная доверенность (Punomoćje)',
        },
        {
          number: '02',
          timeframe: '24 – 48 часов',
          title: 'Медицинские, санитарные и консульские разрешения',
          description:
            'Наши юристы получают медицинское свидетельство о смерти (Potvrda o smrti), выписку из реестра, штампы Апостиль, переводы судебного переводчика и разрешение посольства в Подгорице без личного присутствия родственников.',
          deliverable: 'Международное свидетельство о смерти и консульский пропуск',
        },
        {
          number: '03',
          timeframe: 'День 2 – 3',
          title: 'Опайка цинка и санитарная инспекция (Sprovodnica)',
          description:
            'В присутствии республиканского санитарного инспектора производится герметичная опайка цинкового контейнера (lemljenje) с установкой государственной пломбы и выдачей обязательной «Спроводницы» для границы или аэропорта.',
          deliverable: 'Санитарный паспорт (Sprovodnica) и акт опайки цинка',
        },
        {
          number: '04',
          timeframe: 'По расписанию рейса',
          title: 'Международная перевозка (авиа / авто) и передача документов',
          description:
            'Мы выполняем запланированный авиарейс Cargo HUM из Подгорицы/Тивата, авторепатриацию в ЕС/СНГ или трансфер на кремацию в Белград — предоставляя трекинг авианакладной/GPS и полный пакет оригиналов документов.',
          deliverable: 'Авианакладная AWB / таможенный акт и папка оригиналов документов',
        },
      ],
    },
    trust: {
      eyebrow: 'ОФИЦИАЛЬНЫЙ СТАТУС И ВЗАИМОДЕЙСТВИЕ С ГОСОРГАНАМИ',
      title: 'Прямая работа с госпиталями, консульствами и страховыми компаниями',
      subtitle:
        'Компания Memorijal d.o.o. действует в строгом соответствии с санитарным законодательством Черногории и международными конвенциями, обеспечивая безупречную юридическую чистоту документов.',
      institutionsTitle: 'Прямое оперативное взаимодействие:',
      institutions: [
        {
          name: 'Клинический центр Черногории (KCCG)',
          role: 'Отделение патологии и судебной медицины, оформление медицинских заключений',
          location: 'Подгорица',
        },
        {
          name: 'Общая больница г. Котор (Opšta bolnica Kotor)',
          role: 'Координация по всему побережью Бока-Которского залива и региональному моргу',
          location: 'Котор / Тиват / Херцег-Нови',
        },
        {
          name: 'Посольства и консульские отделы',
          role: 'Оформление консульских паспортов (Laissez-Passer), нотариат и реестр граждан',
          location: 'Подгорица и Белград',
        },
        {
          name: 'Европейские и международные страховые компании',
          role: 'Прием гарантий оплаты (GOP), расчеты по SEPA/SWIFT и фискальные счета EFI',
          location: 'ЕС, Великобритания, СНГ и мир',
        },
      ],
      complianceTitle: 'Финансовая и правовая прозрачность',
      compliancePoints: [
        {
          title: 'Лицензированное юридическое лицо в Черногории (d.o.o.)',
          description:
            'Официальная регистрация в Центральном реестре субъектов хозяйствования Черногории (CRPS) для выполнения международных ритуальных и репатриационных процедур.',
        },
        {
          title: 'Электронная фискализация счетов (EFI QR)',
          description:
            'Каждый счет содержит верифицируемый QR-код Налоговой службы Черногории — обязательное требование для выплат от страховых компаний и государственных фондов.',
        },
        {
          title: 'Международные банковские расчеты SWIFT / SEPA IBAN',
          description:
            'Официальные безналичные платежи по инвойсу от физических лиц, страховых ассистансов, работодателей и дипломатических миссий.',
        },
      ],
      legalBanner: {
        title: 'Официальная документация для страховых выплат и государственных пособий',
        text: 'Все спецификации, санитарные акты и консульские квитанции оформляются по стандартам аудита европейских страховых компаний и социальных служб.',
        badges: ['Лицензия CRPS DOO', 'Фискальные чеки EFI QR', 'Расчетный счет SEPA / SWIFT', 'Стандарт IATA Cargo HUM'],
      },
    },
    director: {
      eyebrow: 'ЛИЧНАЯ ОТВЕТСТВЕННОСТЬ И КОНТРОЛЬ',
      name: 'Максим Коваленко (Maksym Kovalenko)',
      role: 'Исполнительный координатор • Memorijal d.o.o. Montenegro',
      credentials: 'Международная репатриация, консульский протокол и трансграничная логистика',
      quote:
        '«Когда беда случается вдали от дома, близкие не должны оставаться один на один с иностранными ведомствами, больничными моргами и таможенными правилами. Каждое обращение в Memorijal находится под моим личным контролем с первой минуты звонка и до достойного завершения процедуры — с максимальным тактом, юридической точностью и полной финансовой прозрачностью».',
      secondaryParagraph:
        'Наша дежурная служба свободно владеет русским, английским, украинским и черногорским/сербским языками. Звоните ли вы как член семьи в ночное время или как координатор международной страховой компании — вы общаетесь напрямую со специалистом, досконально знающим регламент Минздрава и консульств Черногории.',
      directContactLabel: 'Прямая линия руководителя (24/7):',
      guaranteeItems: [
        'Личный контроль судебно-медицинских, санитарных и консульских процедур',
        'Фиксированная письменная смета до начала выполнения работ',
        'Постоянная связь и отчетность в WhatsApp, по телефону или электронной почте',
      ],
    },
    modal: {
      title: 'Круглосуточная связь с координатором и расчет процедуры',
      subtitle:
        'Оставьте контактные данные ниже. Дежурный координатор в Черногории свяжется с вами в течение 10–15 минут по телефону или WhatsApp с четким планом действий и письменной сметой.',
      urgentNotice: 'Для немедленной голосовой консультации звоните +382 68 914 816 в любое время суток.',
      nameLabel: 'Ваше имя / название организации',
      namePlaceholder: 'Например: Александр Иванов / Ассистанс-служба',
      contactLabel: 'Номер телефона (WhatsApp) или Email',
      contactPlaceholder: '+382 ... / +7 ... / +380 ... или email',
      relationLabel: 'Ваш статус',
      relations: {
        family: 'Родственник / близкий семьи',
        insurance: 'Координатор страховой / ассистанс-компании',
        embassy: 'Сотрудник посольства / консульства',
        legal: 'Юридический представитель / работодатель',
      },
      serviceLabel: 'Необходимая процедура',
      regionLabel: 'Страна / регион назначения',
      locationLabel: 'Местонахождение в Черногории',
      notesLabel: 'Дополнительная информация (гражданство, больница, номер страхового полиса)',
      notesPlaceholder: 'Необязательно: гражданство усопшего, город в Черногории или вопросы по срокам...',
      submitBtn: 'Отправить срочный запрос координатору',
      whatsappRedirectBtn: 'Перейти сразу в чат WhatsApp',
      closeBtn: 'Закрыть окно',
      validationError: 'Пожалуйста, укажите ваше имя и телефон или email для оперативной связи.',
      successTitle: 'Запрос принят в работу — координатор уведомлен',
      successMessage:
        'Вашему обращению присвоен высший приоритет. Исполнительный координатор Максим Коваленко или дежурный специалист свяжется с вами в течение 10–15 минут.',
      referenceLabel: 'Номер протокола:',
    },
    footer: {
      description:
        'Специализированное агентство международной репатриации, санитарного оформления (Sprovodnica), консульской легализации, авиаперевозок Cargo HUM (Груз 200) и организации официальной кремации в Сербии.',
      quickLinksTitle: 'Навигация и процедуры',
      emergencyDispatchTitle: 'Дежурная служба 24/7',
      legalEntityTitle: 'Юридические реквизиты',
      officeTivat: 'Оперативный центр на побережье: Тиват и Котор (Бока-Которский залив), Черногория',
      officePodgorica: 'Консульский и клинический отдел: Подгорица (рядом с KCCG и посольствами), Черногория',
      fiscalNotice: 'MEMORIJAL d.o.o. • PIB: 03489217 • PDV: 30/31-20948-4 • Официальная фискализация EFI • SWIFT/SEPA IBAN',
      copyright: '© 2026 Memorijal d.o.o. Черногория. Все права защищены.',
      privacyNote: 'Строгая конфиденциальность и соблюдение законодательства о защите персональных данных.',
      creditPrefix: 'Сайт создан и поддерживается',
      creditStudio: 'Corebit Studio',
    },
  },
  MNE: {
    meta: {
      langCode: 'sr-Latn-ME',
      langName: 'Crnogorski / Srpski',
    },
    topBar: {
      badge247: 'Dežurna služba 24/7',
      emergencyLine: 'Dežurni koordinator 24/7 (Tivat i Podgorica):',
      jurisdiction: 'Licencirana agencija za međunarodnu repatrijaciju i kremaciju • Crna Gora',
      whatsappCta: 'WhatsApp 24/7',
      callCta: 'Pozovite odmah',
    },
    header: {
      brandSubtitle: 'Međunarodna repatrijacija i kremacija • Crna Gora',
      navServices: 'Usluge',
      navEstimator: 'Kalkulator rute i troškova',
      navProcess: 'Procedura u 4 koraka',
      navCredentials: 'Licenca i institucije',
      navContact: 'Koordinator',
      emergencyBtn: 'Hitna linija 24/7',
    },
    hero: {
      eyebrow: 'ZVANIČNA KONZULARNA, SANITARNA I LOGISTIČKA ASISTENCIJA',
      headline: 'Dostojanstvena, zakonita i brza međunarodna repatrijacija iz Crne Gore.',
      subheadline:
        'Preuzimamo 100% sanitarnih dozvola (Sprovodnica), konzularnih procedura, lemljenja limenog sanduka i međunarodnog transporta (Air Cargo HUM i drumski prevoz) za EU, UK, zemlje ZND, kao i kremaciju u Srbiji.',
      primaryCta: 'Razgovarajte sa koordinatorom 24/7',
      secondaryCta: 'Pogledajte proceduru u 4 koraka',
      whatsappDirect: 'Direktan WhatsApp kontakt',
      trustMetrics: {
        timeLabel: 'Izdavanje dozvola i Sprovodnice',
        timeValue: '24 – 48 sati',
        presenceLabel: 'Prisustvo porodice u CG',
        presenceValue: '0% (Po punomoćju)',
        complianceLabel: 'Međunarodni standardi',
        complianceValue: 'IATA Cargo HUM & EU',
      },
      captionTitle: 'Boka Kotorska i Jadranska obala, Crna Gora',
      captionSubtitle: 'Dostojanstvena prekogranična koordinacija u svim opštinama Crne Gore',
      protocolCard: {
        header: 'Operativni i zakonski protokol',
        status: 'Dežurni centar aktivan • Tivat / Podgorica',
        items: [
          {
            label: 'Bolnice i kliničke mrtvačnice',
            detail: 'Direktan protokol sa KCCG Podgorica, Opštom bolnicom Kotor, Bar i Berane',
          },
          {
            label: 'Sanitarna sprovodnica i carina',
            detail: 'Rješenje Sanitarne inspekcije Ministarstva zdravlja i hermetičko lemljenje cinka',
          },
          {
            label: 'Konzulati i sudski tumači',
            detail: 'Apostille, međunarodni izvodi (Obrazac C) i sprovodnice stranih ambasada',
          },
        ],
        footerNote: 'Direktna saradnja sa evropskim osiguranjima • Zvanični EFI fiskalni računi i SEPA/SWIFT',
      },
    },
    services: {
      eyebrow: 'TRI STUBA SPECIJALIZOVANE PODRŠKE',
      title: 'Kompletna međunarodna repatrijacija i kremacija po zakonskom protokolu',
      subtitle:
        'Svaki pravni, medicinski i transportni korak sprovodi naš licencirani tim u Crnoj Gori — štiteći porodicu i osiguravajuće kuće od administrativnih prepreka.',
      includedLabel: 'Obavezne zakonske procedure uključene u uslugu:',
      inquireServiceCta: 'Izračunajte rutu i zatražite asistenciju',
      cards: [
        {
          id: 'cremation',
          badge: 'STUB A • ZVANIČNI PROTOKOL ZA SRBIJU',
          title: 'Kremacija u Srbiji (Beograd / Novi Sad)',
          subtitle: 'Kompletan prekogranični transport, zvanična kremacija i povrat urne sa dozvolama',
          description:
            'Budući da u Crnoj Gori trenutno ne postoji aktivni krematorijum, zakonska procedura kremacije zahtijeva međunarodni prevoz pokojnika u državne krematorijume u Beogradu (JKP Pogrebne usluge) ili Novom Sadu. Organizujemo kompletan transport preko granice, termin kremacije i povrat ili dalju avio-otpremu zapečaćene urne.',
          highlights: [
            'Bilateralna sanitarna sprovodnica između Crne Gore i Republike Srbije',
            'Konzularna saglasnost i zastupanje porodice putem ovjerenog punomoćja',
            'Prioritetno zakazivanje termina u državnom krematorijumu u Beogradu ili Novom Sadu',
            'Hermetičko pečaćenje urne i višejezična Potvrda o kremaciji za avio ili drumski prenos',
          ],
          legalReference: 'U skladu sa Zakonom o pogrebnoj djelatnosti CG i carinskim propisima Republike Srbije',
        },
        {
          id: 'air_cargo',
          badge: 'STUB B • IATA CARGO HUM I DRUMSKI PREVOZ',
          title: 'Međunarodna drumska i avio repatrijacija (Cargo HUM)',
          subtitle: 'Transport za Evropsku uniju, Veliku Britaniju, Skandinaviju, Ukrajinu i ZND',
          description:
            'Kompletna priprema i međunarodni prevoz pokojnika specijalizovanim klimatizovanim pogrebnim vozilom ili IATA Cargo HUM vazdušnim transportom sa aerodroma Podgorica (TGD), Tivat (TIV), Dubrovnik ili Tirana ka bilo kojoj destinaciji u EU, Velikoj Britaniji, Ukrajini, Rusiji ili Sjevernoj Americi.',
          highlights: [
            'Hermetičko lemljenje limenog (cink) uloška i zvanični pečat sanitarne inspekcije',
            'Balzamovanje / tanatopraksija sa potvrdom ovlašćenog specijaliste sudske medicine',
            'Prioritetna rezervacija avio-tovarnog lista (AWB Cargo HUM) i špeditersko carinjenje',
            'Direktna primopredaja pogrebnom preduzeću u EU, UK, Ukrajini ili zemljama regiona',
          ],
          legalReference: 'Strazburški sporazum (1973), Berlinska konvencija i IATA Cargo HUM pravilnik',
        },
        {
          id: 'road_transport',
          badge: 'STUB C • KONZULARNO I PRAVNO ZASTUPANJE',
          title: 'Konzularna i pravna asistencija',
          subtitle: '100% završavanje dokumentacije po punomoćju bez dolaska porodice u Crnu Goru',
          description:
            'Članovi porodice ne moraju putovati u Crnu Goru radi procedura u bolnici, policiji, opštini ili ambasadi. Na osnovu punomoćja, naši pravni koordinatori pribavljaju sve medicinske potvrde, prevode sudskih tumača i konzularne sprovodnice u Podgorici.',
          highlights: [
            'Izdavanje i aktivacija punomoćja u roku od 2 sata od prvog poziva',
            'Preuzimanje Potvrde o smrti, otpusnih lista i obdukcionih zapisnika (KCCG / bolnice)',
            'Ovjereni prevodi sudskih tumača na engleski, njemački, ruski, francuski ili ukrajinski',
            'Direktno zastupanje pred ambasadama i konzulatima u Podgorici i Beogradu',
          ],
          legalReference: 'Bečka konvencija o konzularnim odnosima i Zakon o upravnom postupku Crne Gore',
        },
      ],
    },
    estimator: {
      eyebrow: 'TRANSPARENTNI KALKULATOR RUTE I PROCEDURA',
      title: 'Interaktivni proračun rokova, protokola i troškova',
      subtitle:
        'Odaberite vrstu usluge i region odredišta kako biste pregledali zakonske rokove, uključene obavezne procedure i transparentan raspon troškova.',
      step1Title: '1. Odaberite primarnu uslugu',
      step2Title: '2. Odaberite region odredišta',
      step3Title: '3. Opština / bolnica preuzimanja u Crnoj Gori',
      services: {
        cremation: {
          label: 'Transport na kremaciju u Beograd',
          shortDesc: 'Prekogranični prevoz u Srbiju, zvanična kremacija i povrat/slanje urne',
          tag: 'Najčešći izbor za strane državljane',
        },
        air_cargo: {
          label: 'Avio repatrijacija (Cargo HUM)',
          shortDesc: 'Lemljenje cinka, AWB rezervacija i avio-kargo iz Podgorice / Tivta',
          tag: 'IATA sertifikovani avio-protokol',
        },
        road_transport: {
          label: 'Regionalni i EU drumski prevoz',
          shortDesc: 'Specijalizovano pogrebno vozilo „od vrata do vrata“ širom Evrope',
          tag: 'Direktan granični tranzit',
        },
      },
      regions: {
        balkans: {
          label: 'Srbija i region Balkana',
          countries: 'Srbija (Beograd / Novi Sad), Hrvatska, Bosna i Hercegovina, Slovenija, Albanija',
        },
        eu_uk: {
          label: 'Evropska unija i Velika Britanija',
          countries: 'Njemačka, UK, Francuska, Italija, Austrija, Švajcarska, Skandinavija, Poljska',
        },
        cis_east: {
          label: 'Istočna Evropa, ZND i međunarodne rute',
          countries: 'Ukrajina, Baltičke zemlje, Kazahstan, Izrael, SAD, Kanada, Turska (tranzitni habovi)',
        },
      },
      locations: {
        boka: {
          label: 'Boka Kotorska (Tivat / Kotor / Herceg Novi)',
          facility: 'Opšta bolnica Kotor / Regionalna kapela',
        },
        podgorica: {
          label: 'Centralna regija (Podgorica / Cetinje)',
          facility: 'Klinički centar Crne Gore (KCCG Podgorica)',
        },
        coast_south: {
          label: 'Južno primorje (Budva / Bar / Ulcinj)',
          facility: 'Opšta bolnica Stari Bar',
        },
        north: {
          label: 'Sjeverna regija (Nikšić / Berane / Žabljak)',
          facility: 'Regionalne opšte bolnice Sjever',
        },
      },
      output: {
        summaryHeader: 'SPECIFIKACIJA PROTOKOLA I LOGISTIKE',
        timeframeLabel: 'Procijenjeni rok realizacije',
        costEstimateLabel: 'Okvirni trošak (sve takse i dozvole uključene)',
        billingNote: 'Zvanični EFI fiskalni račun u CG • Direktna naplata od osiguranja ili SEPA/SWIFT IBAN',
        proceduresTitle: 'Uključene zakonske i logističke procedure',
        documentChecklistTitle: 'Paket zvanične dokumentacije koji se predaje',
        whatsappBtn: 'Pošaljite parametre na WhatsApp',
        modalBtn: 'Zatražite zvaničnu pisanu ponudu',
        disclaimer:
          'Rokovi počinju teći od trenutka ovjere punomoćja. Sve državne takse, limeni uložak i carinska špedicija su transparentno iskazani bez skrivenih troškova.',
      },
      matrix: {
        cremation: {
          balkans: {
            timeframe: '48 – 72 sata (sa povratom urne)',
            priceRange: '€1,850 – €2,450',
            routeSummary: 'Bolnica u CG → Granični prelaz Dobrakovo/Gostun → Državni krematorijum Beograd → Povrat urne',
            procedures: [
              'Preuzimanje iz bolničke mrtvačnice, higijenska priprema i zakonski sanduk',
              'Sanitarna sprovodnica Ministarstva zdravlja Crne Gore',
              'Izvozno/uvozno carinjenje na granici i taksa krematorijuma u Beogradu',
              'Povrat zapečaćene urne u Crnu Goru ili predaja porodici u Beogradu',
            ],
            documentsIssued: [
              'Međunarodni izvod iz matične knjige umrlih (Obrazac C)',
              'Zvanična Potvrda o izvršenoj kremaciji',
              'Sanitarna dozvola za prenos urne preko granice i u avio-kabini',
            ],
          },
          eu_uk: {
            timeframe: '72 – 96 sati (Kremacija + otprema urne u EU/UK)',
            priceRange: '€2,150 – €2,850',
            routeSummary: 'Crna Gora → Krematorijum Beograd → Konzularna dozvola → EU/UK predaja ili avio-sertifikat',
            procedures: [
              'Kompletan prekogranični transport do krematorijuma u Beogradu ili Novom Sadu',
              'Konzularna saglasnost ambasade u Podgorici i Beogradu',
              'Ovjereni prevodi sudskog tumača (EN/DE/FR/IT)',
              'Hermetičko pečaćenje urne i carinski sertifikat za unos u EU/UK',
            ],
            documentsIssued: [
              'Izvod iz matične knjige umrlih sa Apostille pečatom i prevodom',
              'Konzularna sprovodnica (Laissez-Passer) za urnu',
              'IATA sertifikat za prenos urne u putničkoj kabini ili diplomskim kargom',
            ],
          },
          cis_east: {
            timeframe: '72 – 96 sati (Kremacija + dokumentacija za ZND/Ukrajinu)',
            priceRange: '€2,100 – €2,750',
            routeSummary: 'Crna Gora → Državni krematorijum Beograd → Konzularna legalizacija → Međunarodni prenos urne',
            procedures: [
              'Kompletna procedura po daljinskom punomoćju bez dolaska porodice u CG',
              'Bilateralna sanitarna sprovodnica i zvanična kremacija u Srbiji',
              'Ovjereni prevod sudskog tumača na ruski/ukrajinski/engleski jezik',
              'Dostava urne ili priprema dokumentacije za lični avio-prenos',
            ],
            documentsIssued: [
              'Zvanični izvod o smrti sa pečatom sudskog tumača',
              'Potvrda krematorijuma u Beogradu i zapisnik o pečaćenju urne',
              'Carinska deklaracija za nesmetan prelazak granice',
            ],
          },
        },
        air_cargo: {
          balkans: {
            timeframe: '24 – 48 sati',
            priceRange: '€2,400 – €3,100',
            routeSummary: 'Aerodrom Podgorica (TGD) / Tivat (TIV) → Regionalni Cargo HUM hab',
            procedures: [
              'Sanitarno balzamovanje i hermetičko lemljenje limenog sanduka (cinka)',
              'Pregled republičkog sanitarnog inspektora i stavljanje državne plombe',
              'Aerodromska carinska špedicija i izdavanje Cargo HUM avio-tovarnog lista',
              'Koordinacija sa pogrebnim preduzećem na odredišnom aerodromu',
            ],
            documentsIssued: [
              'Međunarodna sanitarna Sprovodnica',
              'Potvrda o hermetičkom lemljenju cinka i nezaraznosti',
              'IATA glavni avio-tovarni list (MAWB - Cargo HUM)',
            ],
          },
          eu_uk: {
            timeframe: '36 – 72 sata',
            priceRange: '€2,950 – €3,900',
            routeSummary: 'Podgorica (TGD) / Dubrovnik / Tirana → Frankfurt, London, Beč, Cirih, Pariz ili EU hab',
            procedures: [
              'Propisana tanatopraksija (balzamovanje) i lemljenje cink uloška',
              'Pribavljanje sprovodnice ambasade (Laissez-Passer) u Podgorici',
              'Prioritetna Cargo HUM rezervacija leta i bezbjednosna kontrola na aerodromu',
              'Kompletan EFI fiskalni obračun za refundaciju kod EU/UK osiguranja',
            ],
            documentsIssued: [
              'Višejezični izvod iz matične knjige umrlih (Obrazac C) + Apostille',
              'Ambasadorski Laissez-Passer i sanitarna Sprovodnica',
              'Sertifikati o balzamovanju i hermetičkom lemljenju cinka',
            ],
          },
          cis_east: {
            timeframe: '48 – 72 sata',
            priceRange: '€3,100 – €4,250',
            routeSummary: 'Podgorica (TGD) / Beograd (BEG) / Istanbul hab → Odredišni aerodrom ili kombinovani tranzit',
            procedures: [
              'Konzularna prijava smrti i ovjereni prevod cjelokupne medicinske dokumentacije',
              'Hermetički cink uložak u drvenom zaštitnom kargo sanduku po IATA standardu',
              'Organizacija vezanih Cargo HUM letova preko Beograda, Istanbula ili Varšave',
              '24/7 praćenje pošiljke i izvještavanje porodice i pogrebne službe',
            ],
            documentsIssued: [
              'Konzularna dozvola za unos posmrtnih ostataka i legalizovan izvod',
              'Zapisnik o sudsko-medicinskom balzamovanju i lemljenju cinka',
              'Međunarodna carinska deklaracija i AWB manifest',
            ],
          },
        },
        road_transport: {
          balkans: {
            timeframe: '24 – 36 sati',
            priceRange: '€1,250 – €1,950',
            routeSummary: 'Direktan prevoz specijalnim pogrebnim vozilom iz CG za Srbiju, BiH, Hrvatsku, Sloveniju ili Albaniju',
            procedures: [
              'Preuzimanje iz bolničke kapele i kompletna higijenska priprema',
              'Propisani limeni uložak i sanduk u skladu sa međudržavnim ugovorima',
              'Sprovodnica Ministarstva zdravlja i prioritetan prelazak granice',
              'Direktna dostava do gradske kapele ili groblja u mjestu odredišta',
            ],
            documentsIssued: [
              'Međunarodni izvod iz matične knjige umrlih',
              'Sanitarna granična Sprovodnica',
              'Izvozna carinska deklaracija',
            ],
          },
          eu_uk: {
            timeframe: '48 – 72 sata',
            priceRange: '€2,450 – €3,500',
            routeSummary: 'Crna Gora → Šengen granica (Hrvatska / Mađarska) → Njemačka, Austrija, Italija, Švajcarska, Poljska',
            procedures: [
              'Hermetičko lemljenje cink sanduka i plombiranje od strane sanitarnog inspektora',
              'Tranzitna dozvola za EU/Šengen i konzularna saglasnost ambasade',
              'Specijalizovano klimatizovano vozilo sa posadom od dva vozača za neprekidan tranzit',
              'Direktna predaja lokalnom pogrebnom preduzeću u zemlji Evropske unije',
            ],
            documentsIssued: [
              'Međunarodni izvod iz matične knjige umrlih (Obrazac C)',
              'EU/Šengen sanitarna sprovodnica (Mortuary Laissez-Passer)',
              'Potvrda o hermetičkom lemljenju i sanitarnoj ispravnosti',
            ],
          },
          cis_east: {
            timeframe: '60 – 96 sati',
            priceRange: '€2,650 – €3,800',
            routeSummary: 'Crna Gora → Srbija → Koridor Mađarska / Rumunija / Poljska → Ukrajina, Baltik i Istočna Evropa',
            procedures: [
              'Kompletna konzularna legalizacija i prevodi sudskih tumača (UA/RU/EN)',
              'Hermetičko lemljenje cink uloška i državna olovna plomba',
              'Prioritetni diplomatski i humanitarni carinski prolaz na granicama',
              'Direktna isporuka u odabrani grad u Ukrajini ili Istočnoj Evropi',
            ],
            documentsIssued: [
              'Ovjereni i prevedeni Izvod o smrti i Potvrda o uzroku smrti',
              'Sanitarna Sprovodnica i konzularno odobrenje tranzita',
              'Kompletan carinski manifest i zvanični fiskalni račun',
            ],
          },
        },
      },
    },
    timeline: {
      eyebrow: 'JASNA I POUZDANA PROCEDURA U 4 KORAKA',
      title: 'Kako vodimo cjelokupan postupak od prvog telefonskog poziva',
      subtitle:
        'Dizajnirano da pruži potpunu sigurnost i mir u teškim trenucima. Svaki korak se dokumentuje i u realnom vremenu dijeli sa porodicom ili osiguravajućom kućom.',
      remoteAssuranceBadge: 'Bez potrebe dolaska porodice u Crnu Goru • 100% realizacija po punomoćju',
      steps: [
        {
          number: '01',
          timeframe: '0 – 2 sata',
          title: 'Prvi poziv i aktivacija punomoćja',
          description:
            'Trenutna konsultacija sa dežurnim koordinatorom na crnogorskom, engleskom ili ruskom jeziku. Utvrđujemo lokaciju, organizujemo prevoz u kliničku mrtvačnicu (Kotor, Podgorica, Bar) i šaljemo dvojezično punomoćje kako bismo odmah preuzeli sve obaveze.',
          deliverable: 'Registracija slučaja i potpisano daljinsko punomoćje',
        },
        {
          number: '02',
          timeframe: '24 – 48 sati',
          title: 'Medicinske, sanitarne i konzularne dozvole',
          description:
            'Naš pravni tim pribavlja Potvrdu o smrti, izvod iz matičnog registra, Apostille ovjere, prevode sudskog tumača i sprovodnicu ambasade u Podgorici bez potrebe da članovi porodice lično dolaze u institucije.',
          deliverable: 'Međunarodni izvod o smrti i sprovodnica ambasade',
        },
        {
          number: '03',
          timeframe: 'Dan 2 – 3',
          title: 'Lemljenje cinka i sanitarna inspekcija (Sprovodnica)',
          description:
            'U prisustvu Republičkog sanitarnog inspektora vrši se hermetičko lemljenje limenog uloška i postavljanje državne plombe, čime se izdaje obavezna Sprovodnica za međunarodni avio ili drumski prelaz.',
          deliverable: 'Sanitarna Sprovodnica i sertifikat o lemljenju cinka',
        },
        {
          number: '04',
          timeframe: 'Po redu vožnje / leta',
          title: 'Planirani transport (Avio / Drumski) i predaja dokumentacije',
          description:
            'Realizujemo zakazani Cargo HUM let iz Podgorice/Tivta, drumski prevoz za EU/region ili transport na kremaciju u Beograd — uz praćenje AWB/GPS statusa i predaju kompletne fascikle originalnih dokumenata.',
          deliverable: 'AWB / Carinska primopredaja i dosije originalnih dokumenata',
        },
      ],
    },
    trust: {
      eyebrow: 'INSTITUCIONALNI KREDIBILITET I ZAKONITOST',
      title: 'Povjerenje bolnica, ambasada i međunarodnih osiguravajućih društava',
      subtitle:
        'Memorijal d.o.o. posluje isključivo u okvirima zdravstvenog zakonodavstva Crne Gore i međunarodnih konzularnih konvencija, obezbjeđujući provjerljivu dokumentaciju za svaki slučaj.',
      institutionsTitle: 'Direktna operativna koordinacija sa:',
      institutions: [
        {
          name: 'Klinički centar Crne Gore (KCCG)',
          role: 'Centar za sudsku medicinu i patologiju — preuzimanje i medicinska dokumentacija',
          location: 'Podgorica',
        },
        {
          name: 'Opšta bolnica Kotor',
          role: 'Regionalna bolnička koordinacija za Boku Kotorsku i primorske opštine',
          location: 'Kotor / Tivat / Herceg Novi',
        },
        {
          name: 'Strane ambasade i konzularna odjeljenja',
          role: 'Izdavanje posmrtnih pasoša (Laissez-Passer), ovjere i prijava činjenice smrti',
          location: 'Podgorica i Beograd',
        },
        {
          name: 'Evropske asistentske i osiguravajuće kuće',
          role: 'Prihvatanje garancija plaćanja (GOP), SEPA/SWIFT obračun i EFI fiskalizacija',
          location: 'EU, UK i međunarodno',
        },
      ],
      complianceTitle: 'Finansijska i pravna transparentnost',
      compliancePoints: [
        {
          title: 'Licencirano privredno društvo u Crnoj Gori (d.o.o.)',
          description:
            'Registrovano u Centralnom registru privrednih subjekata (CRPS) za specijalizovane pogrebne usluge i međunarodnu repatrijaciju.',
        },
        {
          title: 'Elektronska fiskalizacija računa (EFI QR)',
          description:
            'Svaki račun posjeduje verifikacioni QR kod Poreske uprave Crne Gore — neophodan za refundaciju troškova kod fondova PIO i stranih osiguranja.',
        },
        {
          title: 'Međunarodna SWIFT / SEPA IBAN plaćanja',
          description:
            'Prihvatamo direktne devizne uplate od međunarodnih osiguravajućih kuća, ambasada i porodica iz EU, UK i svijeta.',
        },
      ],
      legalBanner: {
        title: 'Zvanična dokumentacija za osiguravajuća društva i državne fondove',
        text: 'Sve specifikacije troškova, sanitarna rješenja i konzularne priznanice izdaju se u skladu sa revizorskim standardima evropskih osiguranja.',
        badges: ['CRPS Registrovani DOO', 'EFI QR Fiskalizacija', 'SEPA / SWIFT IBAN', 'IATA Cargo HUM Standard'],
      },
    },
    director: {
      eyebrow: 'LIČNA ODGOVORNOST I NADZOR',
      name: 'Maksym Kovalenko',
      role: 'Izvršni koordinator • Memorijal d.o.o. Crna Gora',
      credentials: 'Međunarodna repatrijacija, konzularni protokol i prekogranična logistika',
      quote:
        '„Kada se gubitak dogodi daleko od doma, porodica nikada ne smije biti prepuštena sama sebi pred stranim institucijama, bolničkim procedurama i carinskim granicama. Svaki slučaj povjeren agenciji Memorijal nadzirem lično od prvog poziva do konačnog dolaska — uz puno dostojanstvo, pravnu preciznost i apsolutnu finansijsku transparentnost.“',
      secondaryParagraph:
        'Naš dežurni tim tečno govori crnogorski/srpski, engleski, ruski i ukrajinski jezik. Bilo da nas pozivate kao član porodice u kasnim satima ili kao koordinator međunarodnog osiguranja radi hitne Cargo HUM otpreme, razgovarate direktno sa odgovornim licem koje u potpunosti poznaje propise Crne Gore.',
      directContactLabel: 'Direktna linija koordinatora (24/7):',
      guaranteeItems: [
        'Lični nadzor nad bolničkim, sudsko-medicinskim i sanitarnim procedurama',
        'Pisana fiksna ponuda prije preuzimanja bilo kakve obaveze',
        'Direktno izvještavanje putem WhatsApp-a, telefona ili e-maila u svakom koraku',
      ],
    },
    modal: {
      title: '24/7 Kontakt sa koordinatorom i prijava slučaja',
      subtitle:
        'Unesite osnovne podatke ispod. Naš dežurni koordinator u Crnoj Gori će vas kontaktirati u roku od 10–15 minuta putem telefona ili WhatsApp-a sa jasnim planom i pisanom specifikacijom.',
      urgentNotice: 'Za trenutnu telefonsku asistenciju pozovite +382 68 914 816 u bilo koje doba dana ili noći.',
      nameLabel: 'Vaše ime i prezime / Naziv institucije',
      namePlaceholder: 'npr. Marko Petrović / Assistance Partner',
      contactLabel: 'Broj telefona (WhatsApp) ili zvanični E-mail',
      contactPlaceholder: '+382 ... / +381 ... / +44 ... ili email',
      relationLabel: 'Vaoj svojstvo',
      relations: {
        family: 'Član porodice / Srodnik',
        insurance: 'Koordinator osiguranja / Asistentske kuće',
        embassy: 'Predstavnik ambasade / Konzulata',
        legal: 'Pravni zastupnik / Poslodavac',
      },
      serviceLabel: 'Potrebna procedura',
      regionLabel: 'Država / Region odredišta',
      locationLabel: 'Trenutna lokacija u Crnoj Gori',
      notesLabel: 'Dodatne napomene (državljanstvo, naziv bolnice ili broj polise)',
      notesPlaceholder: 'Opciono: državljanstvo preminulog lica, opština u Crnoj Gori ili specifični zahtjevi...',
      submitBtn: 'Pošaljite hitan zahtjev koordinatoru',
      whatsappRedirectBtn: 'Otvorite direktno u WhatsApp-u',
      closeBtn: 'Zatvorite prozor',
      validationError: 'Molimo unesite Vaše ime i validan broj telefona ili e-mail adresu radi kontakta.',
      successTitle: 'Zahtjev je evidentiran — Koordinator je obaviješten',
      successMessage:
        'Vaš zahtjev ima najviši prioritet. Izvršni koordinator Maksym Kovalenko ili dežurni specijalista će Vas kontaktirati u roku od 10–15 minuta.',
      referenceLabel: 'Broj protokola:',
    },
    footer: {
      description:
        'Specijalizovana agencija za međunarodnu repatrijaciju preminulih, pribavljanje sanitarne Sprovodnice, konzularnu legalizaciju, Cargo HUM vazdušni transport i prekogranični prevoz na kremaciju u Srbiju.',
      quickLinksTitle: 'Procedure i navigacija',
      emergencyDispatchTitle: 'Dežurni centar 24/7',
      legalEntityTitle: 'Registrovano pravno lice',
      officeTivat: 'Primorski operativni centar: Tivat i Kotor (Boka Kotorska), Crna Gora',
      officePodgorica: 'Konzularni i klinički centar: Podgorica (uz KCCG i ambasade), Crna Gora',
      fiscalNotice: 'MEMORIJAL d.o.o. • PIB: 03489217 • PDV: 30/31-20948-4 • Zvanična EFI fiskalizacija • SWIFT/SEPA IBAN',
      copyright: '© 2026 Memorijal d.o.o. Crna Gora. Sva prava zadržana.',
      privacyNote: 'Stroga povjerljivost i usklađenost sa Zakonom o zaštiti podataka o ličnosti i GDPR-om.',
      creditPrefix: 'Sajt kreirao i održava',
      creditStudio: 'Corebit Studio',
    },
  },
};

