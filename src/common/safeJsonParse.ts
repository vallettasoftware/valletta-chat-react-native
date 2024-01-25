type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error: unknown };

export const safeJSONParse = <T>(guard: (o: unknown) => o is T) => (text: string): ParseResult<T> => {
  try {
    const parsed = JSON.parse(text);
    return guard(parsed) ? { parsed, hasError: false } : { hasError: true, error: 'Wrong type of parsed string!' };
  } catch (error) {
    return { hasError: true, error };
  }
};
