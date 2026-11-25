import { EmailPartRule } from "./types";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function parseEmailToParts(email: string): EmailPartRule[] {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return [];

  const atIndex = trimmed.indexOf("@");
  if (atIndex === -1) {
    return [
      {
        id: "part-1",
        originalText: trimmed,
        type: "wildcard",
        options: [],
        digitPrefixes: [],
        digitsMode: "any",
        isOptional: false,
        delimiter: "",
      },
    ];
  }

  const localPart = trimmed.slice(0, atIndex);
  const domainPart = trimmed.slice(atIndex + 1);

  const parts: EmailPartRule[] = [];
  let partIndex = 1;

  const dotChunks = localPart.split(".");
  dotChunks.forEach((chunk, chunkIdx) => {
    const delimiter = chunkIdx > 0 ? "." : "";

    const match = chunk.match(/^([a-zA-Z]+)([0-9]+)$/);
    if (match) {
      parts.push({
        id: `part-${partIndex++}`,
        originalText: match[1],
        type: "options",
        options: [],
        digitPrefixes: [],
        digitsMode: "any",
        isOptional: false,
        delimiter,
      });

      const yearMatch = match[2].match(/^(20[1-3][0-9])(.*)$/);
      const defaultYearPrefix = yearMatch ? yearMatch[1] : "";
      const trailingLength =
        yearMatch && yearMatch[2].length > 0 ? yearMatch[2].length : null;

      parts.push({
        id: `part-${partIndex++}`,
        originalText: match[2],
        type: "digits",
        options: [],
        digitPrefixes: defaultYearPrefix ? [defaultYearPrefix] : [],
        digitsMode: defaultYearPrefix ? "prefix" : "any",
        digitLength: trailingLength,
        isOptional: false,
        delimiter: "",
      });
    } else {
      const isDigits = /^[0-9]+$/.test(chunk);
      parts.push({
        id: `part-${partIndex++}`,
        originalText: chunk,
        type: isDigits ? "digits" : "wildcard",
        options: [],
        digitPrefixes: [],
        digitsMode: "any",
        digitLength: isDigits ? chunk.length : null,
        isOptional: false,
        delimiter,
      });
    }
  });

  parts.push({
    id: `part-${partIndex++}`,
    originalText: domainPart,
    type: "exact",
    options: [],
    digitPrefixes: [],
    digitsMode: "any",
    isOptional: false,
    delimiter: "@",
  });

  return parts;
}

export function compilePartsToRegex(parts: EmailPartRule[]): string {
  if (parts.length === 0) return ".*";

  let pattern = "^";

  for (const part of parts) {
    let segmentPattern = "";
    const delim = part.delimiter ? escapeRegex(part.delimiter) : "";

    if (part.type === "exact") {
      segmentPattern = `${delim}${escapeRegex(part.originalText.toLowerCase())}`;
    } else if (part.type === "wildcard") {
      segmentPattern = `${delim}[a-zA-Z0-9_-]+`;
    } else if (part.type === "digits") {
      const hasLength = part.digitLength && part.digitLength > 0;
      const quant = hasLength ? `{${part.digitLength}}` : null;

      if (part.digitsMode === "prefix" && part.digitPrefixes.length > 0) {
        const cleanPrefixes = part.digitPrefixes
          .map((p) => p.replace(/[^0-9]/g, "").trim())
          .filter(Boolean)
          .map(escapeRegex);
        if (cleanPrefixes.length > 0) {
          segmentPattern = `${delim}(?:${cleanPrefixes.join("|")})[0-9]${quant ?? "+"}`;
        } else {
          segmentPattern = `${delim}[0-9]${quant ?? "+"}`;
        }
      } else {
        segmentPattern = `${delim}[0-9]${quant ?? "+"}`;
      }
    } else if (part.type === "options") {
      const allChoices = Array.from(
        new Set(
          [
            part.originalText.toLowerCase(),
            ...part.options.map((o) => o.toLowerCase()),
          ].filter(Boolean),
        ),
      );
      const choicesPattern = allChoices.map(escapeRegex).join("|");
      segmentPattern = `${delim}(${choicesPattern})`;
    }

    if (part.isOptional) {
      pattern += `(?:${segmentPattern})?`;
    } else {
      pattern += segmentPattern;
    }
  }

  pattern += "$";
  return pattern;
}
