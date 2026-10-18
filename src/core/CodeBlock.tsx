import React from "react";
import { Highlight } from "prism-react-renderer";
import { useCurrentFrame } from "remotion";
import { CodeHighlightLine } from "./types";
import { THEME } from "./theme";
import { darkHighContrastTheme } from "./syntaxTheme";

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
  const frame = useCurrentFrame();

  const getLineHighlight = (lineNumber: number) => {
    return highlightLines.find((h) => h.line === lineNumber);
  };

  return (
    <Highlight theme={darkHighContrastTheme} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            margin: 0,
            padding: 0,
            backgroundColor: "transparent",
            fontFamily: THEME.fonts.code,
            fontSize: `${fontSize}px`,
            lineHeight: 1.65,
            overflowX: "hidden",
            color: THEME.colors.textPrimary, // Enforce light text color constraint
          }}
        >
          {tokens.map((line, i) => {
            const lineNum = i + 1;
            const highlight = getLineHighlight(lineNum);

            // Breathing pulse effect for highlighted lines
            const pulse = 0.75 + 0.25 * Math.sin((frame + lineNum * 8) / 8);

            let bgStyle = "transparent";
            let borderLeftStyle = "4px solid transparent";
            let boxShadowStyle = "none";

            if (highlight) {
              if (highlight.type === "bad") {
                bgStyle = `rgba(244, 63, 94, ${0.18 * pulse})`;
                borderLeftStyle = `4px solid ${THEME.colors.accentRose}`;
                boxShadowStyle = `inset 0 0 16px rgba(244, 63, 94, ${0.15 * pulse})`;
              } else if (highlight.type === "good") {
                bgStyle = `rgba(16, 185, 129, ${0.18 * pulse})`;
                borderLeftStyle = `4px solid ${THEME.colors.accentEmerald}`;
                boxShadowStyle = `inset 0 0 16px rgba(16, 185, 129, ${0.15 * pulse})`;
              } else {
                bgStyle = `rgba(56, 189, 248, ${0.15 * pulse})`;
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
                  boxShadow: boxShadowStyle,
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  margin: "2px -12px",
                  borderRadius: "4px",
                  color: THEME.colors.textPrimary, // Enforce row contrast
                }}
              >
                {/* Line number */}
                <span
                  style={{
                    width: "36px",
                    display: "inline-block",
                    userSelect: "none",
                    color: highlight ? "#CBD5E1" : "#64748B",
                    fontSize: `${fontSize - 6}px`,
                    fontWeight: 600,
                  }}
                >
                  {lineNum}
                </span>

                {/* Tokens */}
                <div style={{ flex: 1, color: THEME.colors.textPrimary }}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token });
                    return (
                      <span
                        key={key}
                        {...tokenProps}
                        style={{
                          ...tokenProps.style,
                          // Fallback to bright color if any token style has undefined or dark color
                          color: tokenProps.style?.color || "#F8FAFC",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
