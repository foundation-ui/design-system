export type ResponseStreamStatus = "streaming" | "completed" | "pending";

export interface IResponseStreamProperties {
  /** Text to stream progressively. */
  content: string;
  /**
   * - `streaming`: animates the content.
   * - `completed`: no animation, content is shown.
   * - `pending`: no animation, content is hidden.
   * Defaults to `streaming`.
   */
  status?: ResponseStreamStatus;
  /** Streaming speed. Defaults to 248. */
  charactersPerSecond?: number;
  /** Keeps the nearest scrollable ancestor pinned to the bottom. */
  autoScroll?: boolean;
  /** Extra space (px) added below the stream. */
  offset?: number;
  /** Called with the content height on mount and on every resize. */
  onHeightChange?: (height: number) => void;
  /** Called once every character has been revealed. */
  onComplete?: () => void;
}
