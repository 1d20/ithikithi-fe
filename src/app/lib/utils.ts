import s from 'to-snake-case';

// required to make testing possible
export function snakeCase(str: string): string {
  return s(str);
}
