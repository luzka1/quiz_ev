import { motion } from "motion/react";
import Card from "./UI/Card";
import UserForm from "./UserForm";

const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        x: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
      }}
      className="flex flex-col items-center gap-10"
    >
      <h1 className="text-2xl">Faça seu cadastro!</h1>

      <Card className="w-[450px] h-[350px] max-w-[80vw] p-6 flex flex-col justify-between">
        <UserForm />
      </Card>
    </motion.div>
  );
};

export default Register;
