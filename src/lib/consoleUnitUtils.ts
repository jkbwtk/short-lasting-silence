export interface ConsoleUnit {
  height: number;
  width: number;
}

export const cuId = `consoleUnitPrototypeID_${Math.random()}`;

export const getConsoleUnits = (): ConsoleUnit => {
  const prototype = document.getElementById(cuId);

  if (prototype === null) {
    throw new Error('No console unit prototype found');
  }

  const box = prototype.getBoundingClientRect();

  return {
    height: box.height,
    width: box.width,
  };
};
