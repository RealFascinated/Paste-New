"use client";

import hljs from "highlight.js";
import { useEffect } from "react";
import { CodeHighlighter } from "../types/components/code-highlighter";

import "highlight.js/styles/atom-one-dark.css"; // Import the default Highlight.js style

export function HighlightCode({ text }: CodeHighlighter) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <pre>
      <code className="!bg-transparent text-sm !overflow-x-hidden text-wrap break-all">{text}</code>
    </pre>
  );
}
