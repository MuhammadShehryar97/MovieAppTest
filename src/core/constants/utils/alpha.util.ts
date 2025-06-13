import _ from 'lodash';

export const alpha = (color: string, opacity: number): string => {
  const hexOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);

  return _.toUpper(`${color}${opacity !== 0 ? hexOpacity.toString(16) : '00'}`);
};