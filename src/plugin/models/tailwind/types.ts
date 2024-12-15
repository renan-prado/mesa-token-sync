
export type TailwindKey = string | { [key: string]: TailwindKey };

type FontName = {
  family: string;
  style: string;
};

type LetterSpacing = {
  unit: "PERCENT" | "PIXELS";
  value: number;
};

type LineHeight = {
  unit: "AUTO" | "PIXELS" | "PERCENT";
  value?: string
};

export type FigmaTextStyle = {
  id: string; // Por exemplo: "S:5a662438a9afa06a37357b0b1df66c66c3a7e165,"
  boundVariables: Record<string, any>; // Pode ser detalhado mais se necessário
  consumers: any[]; // Detalhe o tipo dos elementos, se aplicável
  description: string;
  documentationLinks: any[]; // Links documentacionais, tipo específico se conhecido
  fontName: FontName;
  fontSize: number;
  hangingList: boolean;
  hangingPunctuation: boolean;
  key: string; // Exemplo: "5a662438a9afa06a37357b0b1df66c66c3a7e165"
  leadingTrim: "NONE" | string; // Enum pode ser estendido
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  listSpacing: number;
  name: string; // Exemplo: "heading-1"
  paragraphIndent: number;
  paragraphSpacing: number;
  remote: boolean;
  textCase: "ORIGINAL" | "UPPERCASE" | "LOWERCASE" | string;
  textDecoration:
    | "NONE"
    | "UNDERLINE"
    | "LINE_THROUGH"
    | "OVERLINE"
    | string;
  textDecorationColor: string | null;
  textDecorationOffset: number | null;
  textDecorationSkipInk: boolean | null;
  textDecorationStyle: string | null; // Pode ser mais detalhado
  textDecorationThickness: number | null;
  type: "TEXT" | string; // Expandir se houver outros tipos
};
