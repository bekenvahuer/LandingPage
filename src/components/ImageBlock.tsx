interface ImageBlockProps {
  src: string;
  alt: string;
  isPaused?: boolean;
  setIsPaused?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt, setIsPaused }) => {
  const handleToggle = () => {
    if (setIsPaused) {
      setIsPaused(prev => !prev);
    }
  };
  return (
    <section className="image-block">
      <img src={src} alt={alt} onClick={handleToggle} style={{ cursor: setIsPaused ? "pointer" : "default" }} />
      {/*{setIsPaused && (
        <button onClick={handleToggle}>
          {isPaused ? "▶ Reanudar" : "⏸ Pausar"}
        </button>
      )}*/}
    </section>
  );
};

export default ImageBlock;