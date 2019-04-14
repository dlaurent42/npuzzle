const getFormatedDuration = (duration) => {
  if (duration < 1000) return `${duration} ms`;
  if (duration < 1000 * 60) return `${(duration / 1000).toFixed(3)} s`;
  return `${(duration / (1000 * 60)).toFixed(2)} min`;
};

export default getFormatedDuration;
