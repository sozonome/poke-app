export const rand50 = (): boolean => {
  const rand = Math.random();

  if (rand >= 0.5) {
    return true;
  }

  return false;
};
