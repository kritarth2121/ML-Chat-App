import React, { useEffect, useState } from "react";
interface props {
  classes?:string;
  theme?: string;
  allow?: boolean;
  children?: string;
  border?: "Solidify" | "Outline";
  onclick?: () => void;
  type?:"submit" | "button" | "reset" | undefined
}
const Button: React.FC<props> = ({
  border,
  allow,
  children,
  theme,
  onclick,
  type,classes
}) => {
  console.log(onclick);
  let color = "";
  let textcolor = "";

  let b = "";

  if (theme === "Info") {
    color = "blue";
  } else if (theme === "Warning") {
    color = "yellow";
  } else if (theme === "Success") {
    color = "green";
  } else if (theme === "Primary") {
    color = "purple";
  } else {
    color = "gray";
  }

  if (border === "Solidify") {
    textcolor = "white ";
  } else if (border === "Outline") {
    textcolor = color;
    color = "white ";
    console.log(textcolor, color, theme);
  }

  return (
    <div>
      <button type={type}
        onClick={ ()=>onclick && onclick()}
        className={
          classes + " hover:shadow-xl border-2   py-1 px-2 rounded focus:outline-none focus:shadow-outline " +
          (allow
            ? "bg-" +
              color +
              "-600 text-" +
              textcolor +
              "-600 border-" +
              textcolor +
              "-600"
            : "bg-" +
              color +
              "-200 border-" +
              textcolor +
              "-200 text-" +
              textcolor +
              "-200")
        }
        // eslint-disable-next-line react/jsx-no-duplicate-props
      >
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  classes:"",
  theme: "Success",
  border: "Solidify",
  allow: true,
  children: "Sign In",
  type:"submit",
};

export default React.memo(Button);
