export const rand50 = (): boolean => {
  const rand = Math.floor(Math.random() * 100);

  if (rand >= 50) {
    return true;
  }

  return false;
};
