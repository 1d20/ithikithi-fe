import s from 'to-snake-case';
import c from 'camelcase';

// required to make testing possible
export function snakeCase(str: string): string {
  return s(str);
}

export function camelCase(str: string): string {
  return c(str);
}
