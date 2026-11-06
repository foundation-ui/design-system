"use client";

import React from "react";

import { VideoWrapper } from "./styles";
import { isSafeUrl } from "./utils";

import type { IVideoProperties } from "./types";

/**
 * Videos are used to display time-based media while preserving layout,
 * performance and accessibility.
 *
 * **Best practices:**
 *
 * - Always provide a meaningful `label` describing the video.
 * - Provide `tracks` (captions/subtitles) for spoken content.
 * - Provide `width` and `height` to prevent layout shift, or use `fill`
 *   inside a positioned parent.
 * - Use `priority` only for above-the-fold videos (e.g. hero background).
 * - Provide a `poster` to avoid a blank frame before playback.
 * - Prefer modern formats (WebM/AV1, MP4/H.264) through `sources`.
 *
 * @param {IVideoProperties} props - The props for the Video component.
 * @param {string} props.src - The video source URL. Unsafe protocols are ignored.
 * @param {string} props.label - The accessible label of the video.
 * @param {IVideoSource[]} props.sources - Additional sources used for format fallback. Defaults to `[]`.
 * @param {IVideoTrack[]} props.tracks - Text tracks (captions, subtitles, etc.). Defaults to `[]`.
 * @param {string} props.poster - The image shown before playback. Unsafe protocols are ignored.
 * @param {number} props.width - The intrinsic width of the video. Not allowed with `fill`.
 * @param {number} props.height - The intrinsic height of the video. Not allowed with `fill`.
 * @param {boolean} props.fill - Define whether the video fills its positioned parent. Defaults to `false`.
 * @param {boolean} props.priority - Define whether the video preloads eagerly. Defaults to `false`.
 * @param {string} props.fallbackSrc - The video source used if `src` fails to load.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {Function} props.onError - The callback fired when the video fails to load.
 * @returns {ReactElement | null} The Video component, or `null` if no safe source is available.
 */
const Video = React.forwardRef<HTMLVideoElement, IVideoProperties>(
  (
    {
      shape = "smooth",
      src,
      label,
      sources = [],
      tracks = [],
      poster,
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
    const safeSources = useFallback
      ? []
      : sources.filter(({ src: s }) => isSafeUrl(s));
    const safePoster = isSafeUrl(poster) ? poster : undefined;
    const safeTracks = tracks.filter(({ src: s }) => isSafeUrl(s));

    const hasSource = isSafeUrl(currentSrc) || safeSources.length > 0;

    React.useEffect(() => setFailed(false), [src]);

    if (!hasSource) return null;

    return (
      <VideoWrapper
        {...rest}
        ref={ref}
        aria-label={label}
        src={isSafeUrl(currentSrc) ? currentSrc : undefined}
        poster={safePoster}
        width={width ?? "100%"}
        height={height ?? "auto"}
        preload={priority ? "auto" : "metadata"}
        playsInline
        data-shape={shape}
        $fill={fill}
        onError={(e) => {
          if (!failed && fallbackSrc) setFailed(true);
          onError?.(e);
        }}
      >
        {safeSources.map(({ src: s, type }, i) => (
          <source key={i} src={s} type={type} />
        ))}
        {safeTracks.map(
          ({
            src: s,
            srcLang,
            label: trackLabel,
            kind,
            default: isDefault,
          }) => (
            <track
              key={s}
              src={s}
              srcLang={srcLang}
              label={trackLabel}
              kind={kind}
              default={isDefault}
            />
          ),
        )}
      </VideoWrapper>
    );
  },
);
Video.displayName = "Video";

export { Video };
