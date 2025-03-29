export const getDecodedAvatarUrl = (url: string) => {
  if (url && url.startsWith('/api/media/')) {
    url = url.replace('/api/media/', ''); // Убираем префикс /api/media/
  }

  // Декодируем URL, чтобы преобразовать %3A обратно в : и т.д.
  let decodedUrl = decodeURIComponent(url);

  // Проверяем, если URL начинается с https:/, добавляем второй слэш
  if (decodedUrl.startsWith('https:/')) {
    decodedUrl = decodedUrl.replace('https:/', 'https://'); // Добавляем второй слэш
  }

  return decodedUrl;
};
