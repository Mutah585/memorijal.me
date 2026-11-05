import { Language } from '../i18n/translations';

const VCARD_CONTENT = `BEGIN:VCARD
VERSION:3.0
N:Repatrijacija 24/7;Memorijal;;;
FN:Memorijal Repatrijacija 24/7
ORG:Memorijal d.o.o. Crna Gora
TEL;TYPE=CELL,VOICE,PREF:+38268914816
EMAIL;TYPE=WORK:office@memorijal.me
URL:https://memorijal.me
NOTE:Dežurna služba međunarodne repatrijacije i kremacije. Tivat / Podgorica 24/7.
END:VCARD`;

export function downloadVCard(
  lang: Language = 'EN',
  onSuccess?: (msg: string) => void
): void {
  try {
    const blob = new Blob([VCARD_CONTENT], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'memorijal-dispatch-24-7.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const successMessage =
      lang === 'RU'
        ? 'Контакт сохранен в телефон'
        : lang === 'MNE'
        ? 'Kontakt je sačuvan u telefon'
        : 'Contact saved to phone';

    if (onSuccess) {
      onSuccess(successMessage);
    }
  } catch (err) {
    console.error('Failed to download vCard:', err);
  }
}

export function getVCardButtonLabel(lang: Language = 'EN'): string {
  switch (lang) {
    case 'RU':
      return 'Сохранить контакт 24/7 в телефон';
    case 'MNE':
      return 'Sačuvaj dežurni kontakt u telefon';
    case 'EN':
    default:
      return 'Save 24/7 Dispatch to Contacts';
  }
}

