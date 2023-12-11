import { PXToREM, PXToPT } from "../utils";
import {
  TModularScalesOptions,
  TSequencesOptions,
  IScaleVariation,
} from "../../../../types";

export const generateModularScales = (
  options: TModularScalesOptions
): IScaleVariation[] | number[] => {
  const { base, ratio, units, convert } = options;
  const scalesArray: number[] = [base];
  const convertedScalesArray: Array<IScaleVariation> = [];

  for (let i = 0; i < units - 1; i++) {
    const modulo = i % ratio.length;
    const ratioValue = ratio[modulo];
    const value = Number(scalesArray[scalesArray.length - 1]);

    scalesArray.push(value * ratioValue);

    if (convert)
      convertedScalesArray.push({
        px: value * ratioValue,
        rem: PXToREM(value * ratioValue),
        pt: PXToPT(value * ratioValue),
      });
  }

  return convert ? convertedScalesArray : scalesArray;
};
export const generateSequences = (options: TSequencesOptions): number[] => {
  const { base, units, steps, decimal } = options;
  const sequences: number[] = [];

  if (base <= 0 || units <= 0 || steps <= 0) {
    throw new Error("Base, units, and steps must be positive numbers.");
  }
  if (decimal && units * steps !== 100) {
    throw new Error("The sum of units*steps must equal 100");
  }

  for (let i = 0; i < units; i++) {
    if (decimal) sequences.push(((base + i) * steps) / 100);
    else sequences.push(base + i * steps);
  }

  return sequences;
};
