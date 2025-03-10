import "./FlipCard.css";

const FlipCard = ({
  bgColor,
  message,
}: {
  bgColor: string;
  message: string;
}) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div
          style={{ backgroundColor: bgColor }}
          className={`${bgColor} flip-card-front flip-card-front flex items-center justify-center font-bold text-3xl`}
        >
          Vire a carta!
        </div>
        <div
          style={{ borderColor: bgColor, color: bgColor }}
          className="flip-card-back border-8 p-4 bg-white flex justify-center font-bold text-3xl"
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
