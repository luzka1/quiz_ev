import React from "react";

const Card = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  const bgColor = className ? className : "bg-[--principal-color]";
  return (
    <div className={`card bg-[--principal-color] ${bgColor}`}>{children}</div>
  );
};

export default Card;
