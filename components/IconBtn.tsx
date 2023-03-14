import { IconType } from "react-icons";
import type { ComponentPropsWithoutRef } from "react";
interface Props extends ComponentPropsWithoutRef<"button"> {
  Icon: IconType;
  isActive?: any;
  color?: string;
  children?: any;
  disabled?: boolean;
}
function IconBtn({
  Icon,
  isActive,
  color,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={`${color ? color : null}`}
      {...props}
      disabled={disabled}
    >
      <span>
        <Icon />
      </span>
      {children}
    </button>
  );
}
export default IconBtn;
