import { motion, Variants } from "motion/react";

const Loading = () => {
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const dotClass = "w-5 h-5 rounded-full bg-blue-500 will-change-transform";

  return (
    <div className="fixed h-screen w-full flex items-center justify-center bg-black">
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex gap-2"
      >
        <motion.div className={dotClass} variants={dotVariants} />
        <motion.div className={dotClass} variants={dotVariants} />
        <motion.div className={dotClass} variants={dotVariants} />
      </motion.div>
    </div>
  );
};

export default Loading;
