import React from "react";
import { Highlight } from "prism-react-renderer";
import { useCurrentFrame } from "remotion";
import { CodeHighlightLine } from "./types";
import { THEME } from "./theme";
import { darkHighContrastTheme } from "./syntaxTheme";

export interface CodeLineCustomStyle {
  opacity?: number;
  backgroundColor?: string;
  borderLeft?: string;
  boxShadow?: string;
  transform?: string;
  marker?: React.ReactNode;
  label?: string;
  labelStyle?: React.CSSProperties;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: CodeHighlightLine[];
  fontSize?: number;
  lineHeight?: number;
  getLineCustomStyle?: (lineNumber: number) => CodeLineCustomStyle | undefined;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  highlightLines = [],
  fontSize = 26,
  lineHeight = 1.65,
  getLineCustomStyle,
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
            lineHeight,
            overflowX: "hidden",
            whiteSpace: "pre",
            color: THEME.colors.textPrimary, // Enforce light text color constraint
          }}
        >
          {tokens.map((line, i) => {
            const lineNum = i + 1;
            const highlight = getLineHighlight(lineNum);
            const custom = getLineCustomStyle?.(lineNum);

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
                boxShadowStyle = `inset 0 0 16px rgba(56, 189, 248, ${0.12 * pulse})`;
              }
            }

            // Custom line overrides (e.g. from CodeFocus)
            if (custom) {
              if (custom.backgroundColor) bgStyle = custom.backgroundColor;
              if (custom.borderLeft) borderLeftStyle = custom.borderLeft;
              if (custom.boxShadow) boxShadowStyle = custom.boxShadow;
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
                  paddingLeft: "10px",
                  paddingRight: "12px",
                  margin: "2px -12px",
                  borderRadius: "4px",
                  color: THEME.colors.textPrimary, // Enforce row contrast
                  opacity: custom?.opacity !== undefined ? custom.opacity : 1,
                  transform: custom?.transform || "none",
                  minHeight: `${fontSize * lineHeight}px`,
                  boxSizing: "border-box",
                }}
              >
                {/* Optional line marker (e.g. caret or arrow) */}
                {custom?.marker !== undefined ? (
                  <span
                    style={{
                      width: "18px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "4px",
                    }}
                  >
                    {custom.marker}
                  </span>
                ) : null}

                {/* Line number */}
                <span
                  style={{
                    width: "36px",
                    display: "inline-block",
                    userSelect: "none",
                    color: highlight || custom?.borderLeft !== "4px solid transparent" ? "#CBD5E1" : "#64748B",
                    fontSize: `${fontSize - 6}px`,
                    fontWeight: 600,
                  }}
                >
                  {lineNum}
                </span>

                {/* Tokens */}
                <div style={{ flex: 1, color: THEME.colors.textPrimary, display: "flex", flexWrap: "nowrap" }}>
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

                {/* Optional right label */}
                {custom?.label ? (
                  <span
                    style={{
                      marginLeft: "12px",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontSize: `${fontSize - 8}px`,
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      ...custom.labelStyle,
                    }}
                  >
                    {custom.label}
                  </span>
                ) : null}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
