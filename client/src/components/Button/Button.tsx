import React from "react";
import Button from "@material-ui/core/Button";

interface props {
    classes?: string;
    theme?: string;
    allow?: boolean;
    children?: string;
    border?: "Solidify" | "Outline";
    onclick?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
}
const Butto: React.FC<props> = ({
    border,
    allow,
    children,
    theme,
    onclick,
    type,
    classes,
}) => {
    let color = "";
    let textcolor = "";

    //let b = "";

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
        //console.log(textcolor, color, theme);
    }

    return (
        <div>
                <button
                    type={type}
                    onClick={() => onclick && onclick()}
                    className={
                        classes +
                        " hover:bg-" +
                        color +
                        "-400 md:py-1 md:px-2 py-0.5 px-1 rounded focus:outline-none focus:shadow-outline " +
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
                >
                    {children}
                </button>
        </div>
    );
};

Butto.defaultProps = {
    classes: "",
    theme: "",
    border: "Solidify",
    allow: true,
    children: "Sign In",
    type: "submit",
};

export default React.memo(Butto);
