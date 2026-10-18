import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeHighlightLine } from "./types";
import { THEME } from "./theme";

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: CodeHighlightLine[];
  fontSize?: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  highlightLines = [],
  fontSize = 26,
}) => {
  const getLineHighlight = (lineNumber: number) => {
    return highlightLines.find((h) => h.line === lineNumber);
  };

  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: "transparent",
            fontFamily: THEME.fonts.code,
            fontSize: `${fontSize}px`,
            lineHeight: 1.65,
            overflowX: "hidden",
          }}
        >
          {tokens.map((line, i) => {
            const lineNum = i + 1;
            const highlight = getLineHighlight(lineNum);

            let bgStyle = "transparent";
            let borderLeftStyle = "4px solid transparent";

            if (highlight) {
              if (highlight.type === "bad") {
                bgStyle = "rgba(244, 63, 94, 0.2)";
                borderLeftStyle = `4px solid ${THEME.colors.accentRose}`;
              } else if (highlight.type === "good") {
                bgStyle = "rgba(16, 185, 129, 0.2)";
                borderLeftStyle = `4px solid ${THEME.colors.accentEmerald}`;
              } else {
                bgStyle = "rgba(56, 189, 248, 0.15)";
                borderLeftStyle = `4px solid ${THEME.colors.accentCyan}`;
              }
            }

            return (
              <div
                key={i}
                {...getLineProps({ line })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: bgStyle,
                  borderLeft: borderLeftStyle,
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  margin: "2px -12px",
                  borderRadius: "4px",
                }}
              >
                {/* Line number */}
                <span
                  style={{
                    width: "36px",
                    display: "inline-block",
                    userSelect: "none",
                    color: highlight ? THEME.colors.textSecondary : THEME.colors.textMuted,
                    fontSize: `${fontSize - 6}px`,
                    fontWeight: 600,
                  }}
                >
                  {lineNum}
                </span>

                {/* Tokens */}
                <div style={{ flex: 1 }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
