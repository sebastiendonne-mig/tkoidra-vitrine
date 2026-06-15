const dictionaries: Record<string, () => Promise<any>> = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

// C'est ce mot-clé "export" au début qui manquait à Next.js !
export const getDictionary = async (locale: string) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries['fr']();
};
