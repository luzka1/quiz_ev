import TopVetor from "./customImages/TopVetor";
import BottomVetor from "./customImages/BottomVetor";
import * as motion from "motion/react-client";

const Background = ({ color }: { color: string }) => {
  return (
    <div className="fixed h-screen w-screen -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          y: { type: "spring", visualDuration: 0.8, bounce: 0.6 },
        }}
        className="w-full absolute sm:top-0 md:-top-10 lg:-top-32"
      >
        <TopVetor color={color} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          y: { type: "spring", visualDuration: 0.8, bounce: 0.6 },
        }}
        className="w-1/4 absolute bottom-0 sm:bottom-0 lg:-bottom-10"
      >
        <BottomVetor color={color} />
      </motion.div>
    </div>
  );
};

export default Background;
