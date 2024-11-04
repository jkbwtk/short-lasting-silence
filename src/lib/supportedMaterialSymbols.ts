export const MaterialSymbol = [
  'question_mark',
  'cloud_upload',
  'check_box',
] as const;

export type MaterialSymbol = (typeof MaterialSymbol)[number];
