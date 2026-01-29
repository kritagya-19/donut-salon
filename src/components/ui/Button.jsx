import React from 'react';

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ";
  
  const variants = {
    default: "bg-stone-900 text-white shadow-sm hover:bg-stone-800",
    secondary: "bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-200/80",
    ghost: "hover:bg-stone-100 hover:text-stone-900",
    link: "text-rose-500 underline-offset-4 hover:underline",
  };
  
  const sizes = {
    default: "h-9 px-4 py-2",
    icon: "h-10 w-10",
  };

  const classes = `${baseClasses} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className || ""}`;

  if (asChild && React.isValidElement(props.children)) {
    const { children, ...rest } = props;
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ""}`,
      ref,
      ...rest
    });
  }

  return (
    <button className={classes} ref={ref} {...props} />
  );
});

Button.displayName = "Button";

export default Button;
