import { useEffect, useState } from "react";

const colors = ["#0f53ff", "#ff3ed0"];

interface TextBlockProps {
  titles: string[][];
  text: string;
  groupIndex?: number;
  setGroupIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const TextBlock: React.FC<TextBlockProps> = ({
  titles,
  text,
  groupIndex: externalGroupIndex,
  setGroupIndex: externalSetGroupIndex
}) => {
  const [internalGroupIndex, setInternalGroupIndex] = useState(0);
  const groupIndex = externalGroupIndex ?? internalGroupIndex;
  const setGroupIndex = externalSetGroupIndex ?? setInternalGroupIndex;
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentGroup = titles[groupIndex];
  const [displayedLines, setDisplayedLines] = useState<string[]>(
    Array(currentGroup.length).fill("")
  );

  useEffect(() => {
    if (!titles.length) return;

    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      const currentLine = currentGroup[lineIndex];

      if (!isDeleting) {
        // ESCRIBIENDO
        if (charIndex < currentLine.length) {
          setDisplayedLines(prev => {
            const updated = [...prev];
            updated[lineIndex] = currentLine.slice(0, charIndex + 1);
            return updated;
          });
          setCharIndex(prev => prev + 1);
        } else {
          if (lineIndex < currentGroup.length - 1) {
            setLineIndex(prev => prev + 1);
            setCharIndex(0);
          } else {
            setTimeout(() => setIsDeleting(true), 1200);
          }
        }
      } else {
        // BORRANDO
        if (charIndex > 0) {
          setDisplayedLines(prev => {
            const updated = [...prev];
            updated[lineIndex] = currentLine.slice(0, charIndex - 1);
            return updated;
          });
          setCharIndex(prev => prev - 1);
        } else {
          if (lineIndex > 0) {
            setLineIndex(prev => prev - 1);
            setCharIndex(currentGroup[lineIndex - 1].length);
          } else {
            // CAMBIAR DE GRUPO
            setIsDeleting(false);
            setGroupIndex(prev => (prev + 1) % titles.length);
            setLineIndex(0);
            setCharIndex(0);
            setDisplayedLines(Array(titles[(groupIndex + 1) % titles.length].length).fill(""));
          }
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, isDeleting, groupIndex, titles]);

  return (
    <section className="text-block sectionInfo"
      style={{ color: colors[groupIndex % colors.length] }}
    >
      {displayedLines.map((line, i) => (
        <h2 key={i}>{line}</h2>
      ))}
      <p>{text}</p>
    </section>
  );
};

export default TextBlock;