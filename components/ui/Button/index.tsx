import React, {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "darkPrimary" | "success" | "custom";
type HoverStyle = "outline" | "highlight";

type ButtonProps<C extends ElementType = "button"> = {
  as?: C;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  hoverStyle?: HoverStyle;
  disabled?: boolean;
} & ComponentPropsWithoutRef<C>;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary white-text",
  darkPrimary: "bg-white text-primary",
  success: "bg-green-600 white-text",
  custom: "",
};

const HOVER_CLASSES: Record<HoverStyle, string> = {
  outline: "hover:bg-transparent hover:text-primary border border-primary",
  highlight: "hover:brightness-110",
};

const Button = <C extends ElementType = "button">({
  as,
  children,
  className = "",
  variant = "primary",
  hoverStyle = "highlight",
  disabled = false,
  ...rest
}: ButtonProps<C>) => {
  const Component = as || "button";
  const variantClass = VARIANT_CLASSES[variant] || "";
  const hoverClass = HOVER_CLASSES[hoverStyle] || "";

  return (
    <Component
      className={`
        inline-flex items-center justify-center px-4 py-3 rounded
        transition duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClass} ${hoverClass} ${className}
      `}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Button;
