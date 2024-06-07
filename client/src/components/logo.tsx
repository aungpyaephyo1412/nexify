import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const Logo = ({ size = 40, ...props }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={size / 2} cy={size / 2} r={size * 0.4} fill="#1DA1F2" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size * 0.3}
        fill="none"
        stroke="white"
        strokeWidth={size * 0.03}
      />
      <circle cx={size / 2} cy={size / 2} r={size * 0.15} fill="white" />
    </svg>
  );
};

export default Logo;
