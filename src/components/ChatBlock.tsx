import { useState } from "react";
import ImageBlock from "../components/ImageBlock";
import TextBlock from "../components/TextBlock";

import img1 from "../assets/chat1.png";
import img2 from "../assets/chat2.png";
import img3 from "../assets/chat3.png";

const images = [img1, img2, img3];

const ChatBlock: React.FC = () => {
  const [groupIndex, setGroupIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false)

  const titles = [
    ["Redes Sociales"],
    ["Automatización IA"],
    ["Chat Inteligente"]
  ];

  return (
    <section className="chat-block">
      <TextBlock
        titles={titles}
        text=""
        groupIndex={groupIndex}
        setGroupIndex={setGroupIndex}
        isPaused={isPaused}
      />
      <ImageBlock
        src={images[groupIndex]}
        alt="Imagen dinámica"
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
    </section>
  );
};

export default ChatBlock;