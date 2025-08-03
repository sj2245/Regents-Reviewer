// declarations.d.ts
declare module 'katex/contrib/auto-render' {
  interface Delimiter {
    left: string;
    right: string;
    display: boolean;
  }

  interface RenderMathInElementOptions {
    delimiters?: Delimiter[];
    ignoredTags?: string[];
    errorCallback?: (msg: string, err: any) => void;
  }

  export default function renderMathInElement(
    el: HTMLElement,
    options?: RenderMathInElementOptions
  ): void;
}