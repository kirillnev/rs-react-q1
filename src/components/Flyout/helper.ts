import { Character } from '../../types';

export const generateCsvUrl = (characters: Character[]): string => {
  const characterKeys = [
    'id',
    'name',
    'status',
    'species',
    'type',
    'gender',
    'image',
  ] as const;

  const csvContent = [
    characterKeys,
    ...characters.map((character) =>
      characterKeys.map((key) => character[key] || 'unknown')
    ),
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};
