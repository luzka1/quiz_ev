const TopVetor = ({ color }: { color: string }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 276"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 77.7619C0 77.7619 290.075 276 573.149 276C856.223 276 922.74 173.048 1223.32 119.746C1523.9 66.4444 1924 276 1924 276V0H0V77.7619Z"
        fill={color}
      />
    </svg>
  );
};

export default TopVetor;
