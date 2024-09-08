import React from "react";
import parse, { domToReact } from "html-react-parser";
import Image from "next/image";

const replaceImgWithNextImage = (htmlContent) => {
  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === "img") {
        const { src, alt, style } = attribs;

        let width = 500; // Default width
        let height = 300; // Default height

        const styleObj = style
          ? style.split(";").reduce((acc, item) => {
              const [key, value] = item.split(":");
              if (key && value) {
                acc[key.trim()] = value.trim();
              }
              return acc;
            }, {})
          : {};

        if (styleObj.width) {
          width = parseInt(styleObj.width.replace(/[^\d]/g, ""), 10);
        }

        if (styleObj.height) {
          height = parseInt(styleObj.height.replace(/[^\d]/g, ""), 10);
        }

        return (
          <div
            className="image-wrapper"
            style={{
              ...styleObj,
              //width: "50%",
              //maxWidth: "403px",
              margin: "0 0",
            }}
          >
            <Image
              src={src}
              alt={alt || ""}
              width={width}
              height={height}
              layout="responsive"
              objectFit="contain"
            />
          </div>
        );
      }

      if (
        name === "p" &&
        children.some(
          (child) =>
            child.name === "img" || child.attribs?.class === "image-wrapper"
        )
      ) {
        // Separate image divs and other content
        const imageDivs = children.filter(
          (child) =>
            !(child.name === "div" && child.attribs?.class === "image-wrapper")
        );
        const otherContent = children.filter(
          (child) =>
            child.name === "div" && child.attribs?.class === "image-wrapper"
        );

        //  console.log(otherContent);

        return (
          <>
            {imageDivs.length > 1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {domToReact(imageDivs, options)}
              </div>
            ) : (
              <div className="flex-container">
                {domToReact(imageDivs, options)}
              </div>
            )}
            {domToReact(otherContent, options)}
          </>
        );
      }
    },
  };

  return parse(htmlContent, options);
};

export default replaceImgWithNextImage;
