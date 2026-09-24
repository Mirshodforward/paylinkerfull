export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "note"; text: string }
  | { t: "warn"; text: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type Section = {
  /** Anchor va raqamlash: "1", "2.3" */
  n: string;
  title: string;
  blocks: Block[];
};

export type LegalDoc = {
  title: string;
  subtitle?: string;
  /** "Oxirgi tahrir: ..." */
  updated: string;
  intro: Block[];
  sections: Section[];
};

export type Bilingual = { uz: LegalDoc; ru: LegalDoc };
