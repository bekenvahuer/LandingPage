interface ImageBlockProps {
  src: string;
  alt: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt }) => {
  return (
    <section className="image-block">
      <img src={src} alt={alt} />
    </section>
  );
};

export default ImageBlock;