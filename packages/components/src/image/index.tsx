"use client";

import React from "react";

import { Img } from "./styles";
import { isSafeUrl, sanitizeSrcSet } from "./utils";

import type { IImageProperties } from "./types";

/**
 * Images are used to display visual content while preserving layout,
 * performance and accessibility.
 *
 * **Best practices:**
 *
 * - Always provide a meaningful `alt` text. Use `""` for decorative images.
 * - Provide `width` and `height` to prevent layout shift, or use `fill`
 *   inside a positioned parent.
 * - Use `priority` only for above-the-fold images (e.g. hero, LCP).
 * - Provide `sizes` when using `srcSet` or `sources` for responsive images.
 * - Prefer modern formats (AVIF, WebP) through `sources`.
 *
 * @param {IImageProperties} props - The props for the Image component.
 * @param {string} props.src - The image source URL. Unsafe protocols are ignored.
 * @param {string} props.alt - The alternative text of the image. Use `""` for decorative images.
 * @param {string} props.srcSet - The responsive image candidates of the default source.
 * @param {string} props.sizes - The responsive sizes hint applied to the image and its sources.
 * @param {IImageSource[]} props.sources - The additional sources used for format or art direction. Defaults to `[]`.
 * @param {number} props.width - The intrinsic width of the image. Not allowed with `fill`.
 * @param {number} props.height - The intrinsic height of the image. Not allowed with `fill`.
 * @param {boolean} props.fill - Define whether the image fills its positioned parent. Defaults to `false`.
 * @param {boolean} props.priority - Define whether the image is loaded eagerly with high priority. Defaults to `false`.
 * @param {string} props.fallbackSrc - The image source used if `src` fails to load.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {Function} props.onError - The callback fired when the image fails to load.
 * @returns {ReactElement | null} The Image component, or `null` if no safe source is available.
 */
const Image = React.forwardRef<HTMLImageElement, IImageProperties>(
  (
    {
      shape = "smooth",
      src,
      srcSet,
      sources = [],
      alt,
      width,
      height,
      fill = false,
      priority = false,
      fallbackSrc,
      onError,
      ...rest
    },
    ref,
  ) => {
    const [failed, setFailed] = React.useState(false);

    const useFallback = failed && isSafeUrl(fallbackSrc);
    const currentSrc = useFallback ? fallbackSrc : src;

    React.useEffect(() => setFailed(false), [src]);

    if (!isSafeUrl(currentSrc)) return null;

    return (
      <picture>
        {!useFallback &&
          sources.map(({ srcSet, type, media }, i) => (
            <source
              key={i}
              srcSet={sanitizeSrcSet(srcSet)}
              type={type}
              media={media}
              sizes={rest.sizes}
            />
          ))}
        <Img
          {...rest}
          ref={ref}
          src={currentSrc}
          srcSet={useFallback ? undefined : sanitizeSrcSet(srcSet)}
          alt={alt}
          width={width ?? "100%"}
          height={height ?? "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...({ fetchpriority: priority ? "high" : "auto" } as object)}
          onError={(e) => {
            if (!failed && fallbackSrc) setFailed(true);
            onError?.(e);
          }}
          data-shape={shape}
          $fill={fill}
        />
      </picture>
    );
  },
);
Image.displayName = "Image";

export { Image };
