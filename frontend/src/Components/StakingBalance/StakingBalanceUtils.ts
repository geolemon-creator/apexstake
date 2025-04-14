export const calculateTimeRemainingAndProgress = (
  startDate?: string,
  endDate?: string,
  t?: (key: string, options?: any) => string
) => {
  if (!startDate || !endDate)
    return { timeRemaining: 'Нет данных', progress: 0 }; // Проверяем наличие данных

  const startMs = new Date(startDate).getTime(); // Время начала
  const endMs = new Date(endDate).getTime(); // Время окончания
  const currentClientTimeMs = Date.now(); // Время на клиенте в миллисекундах

  // Вычисляем разницу между текущим временем и временем окончания
  const diffMs = endMs - currentClientTimeMs;
  if (diffMs <= 0) return { timeRemaining: 'Время истекло', progress: 100 }; // Если время истекло

  const totalDurationMs = endMs - startMs; // Общее время от startDate до endDate
  const elapsedMs = currentClientTimeMs - startMs; // Время, прошедшее с начала

  // Вычисление процента
  const progress = Math.min(
    100,
    Math.max(0, (elapsedMs / totalDurationMs) * 100)
  );

  // Вычисление оставшегося времени
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    timeRemaining:
      t?.('remaining_time_format', { days, hours, minutes }) ??
      `${days} д: ${hours} ч: ${minutes} м`,
    progress: progress.toFixed(2), // округляем до двух знаков после запятой
  };
};

export const formatProfit = (profit: number) => {
  if (typeof profit !== 'number') return '0.000';
  return profit === 0
    ? profit.toFixed(3) // для нуля — 3 знака после точки
    : profit.toFixed(2); // иначе — 2 знака
};
