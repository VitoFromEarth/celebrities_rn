export function getEnumKeys(enumObj: any): string[] {
  return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
