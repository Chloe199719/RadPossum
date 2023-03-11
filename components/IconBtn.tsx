import { IconType } from "react-icons";
import type { ComponentPropsWithoutRef } from "react";
interface Props extends ComponentPropsWithoutRef<"button"> {
  Icon: IconType;
  isActive?: any;
  color?: string;
  children?: any;
}
function IconBtn({ Icon, isActive, color, children, ...props }: Props) {
  return (
    <button className={`${color ? color : null}`} {...props}>
      <span>
        <Icon />
      </span>
      {children}
    </button>
  );
}
export default IconBtn;
