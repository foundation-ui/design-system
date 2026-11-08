import js_design_tokens from "../assets/js/ds-tokens";
import { DTCG_NAMESPACE } from "@usefui/core";
import type { IDTCGDesignTokensSet } from "@usefui/core";

/**
 * Resolve a DTCG token from a CSS-variable name.
 */
export const GetDesignToken = (
  sourceOrName: IDTCGDesignTokensSet | string,
  name?: string,
  unit?: string,
): any => {
  const source =
    typeof sourceOrName === "string" ? js_design_tokens : sourceOrName;
  const tokenName =
    typeof sourceOrName === "string" ? sourceOrName : (name as string);

  const parts = String(tokenName ?? "")
    .replace(/^--/, "")
    .split("-")
    .filter(Boolean);

  if (parts.length === 0) return undefined;

  const isNumber = (v: string) => /^\d+$/.test(v);
  const last = parts[parts.length - 1] ?? "";

  let category: string = "";
  let variant: string | null = null; // alpha | tint | shade
  let itemName: string = "";
  let step: string | null = null;

  const first = parts[0] ?? "";

  if (first === "color") {
    category = "color";
    itemName = parts.slice(1).join("-");
  } else if (first === "alpha" || first === "tint" || first === "shade") {
    variant = first;
    category = "color";
    if (isNumber(last)) {
      step = last;
      itemName = parts.slice(1, -1).join("-");
    } else {
      itemName = parts.slice(1).join("-");
    }
  } else {
    category = first; // fontsize | measurement | depth | opacity
    if (isNumber(last) && parts.length > 1) {
      step = last;
      itemName = parts.slice(1, -1).join("-");
    } else {
      itemName = parts.slice(1).join("-");
    }
  }

  const group = (source as any)?.[category];
  if (!group) return undefined;

  // color base token lives under $root
  if (category === "color") {
    const colorGroup = group[itemName];
    if (!colorGroup) return undefined;

    const token =
      variant && step
        ? colorGroup?.[variant]?.[step]
        : (colorGroup?.$root ?? colorGroup);

    if (!token) return undefined;

    const root = token?.$root ?? token;
    const value = root?.$value;
    const ext = root?.$extensions?.[DTCG_NAMESPACE] ?? {};

    if (unit) {
      const u = unit.toLowerCase();
      if (ext[u] !== undefined) return ext[u];
      if (value && value[u] !== undefined) return value[u];
      if (u === "hex") return value?.hex ?? ext?.hex;
      if (u === "rgb") return ext?.rgb ?? value?.hex;
      if (u === "hsl") return ext?.hsl;
    }

    if (ext.rgb && String(ext.rgb).includes("rgba")) return ext.rgb;
    if (ext.hex !== undefined) return ext.hex;
    if (value?.hex !== undefined) return value.hex;
    if (ext.rgb !== undefined) return ext.rgb;
    if (typeof value === "number") return value;
    if (value?.value !== undefined) return value.value;
    return value;
  }

  // scale / sequence tokens
  const itemGroup = group[itemName];
  if (!itemGroup) return undefined;

  const token = step ? itemGroup?.[step] : itemGroup;
  if (!token) return undefined;

  const value = token?.$value ?? token?.value;
  const ext = token?.$extensions?.[DTCG_NAMESPACE] ?? {};

  if (unit) {
    const u = unit.toLowerCase();
    if (ext[u] !== undefined) return ext[u];
    if (value && typeof value === "object" && value[u] !== undefined)
      return value[u];

    // measurement canonical is px;
    const px =
      typeof ext.px === "number"
        ? ext.px
        : typeof value?.value === "number" && value?.unit === "px"
          ? value.value
          : undefined;

    if (px !== undefined) {
      if (u === "rem") return px / 16;
      if (u === "pt") return (px * 3) / 4;
      if (u === "px") return px;
    }
  }

  if (ext.rem !== undefined) return ext.rem;
  if (ext.px !== undefined) return ext.px;
  if (ext.pt !== undefined) return ext.pt;
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && value.value !== undefined) {
    return value.value;
  }
  return value;
};
