import React from "react";
import htmlContent from "../../a.html";
import replaceImgWithNextImage from "@/utils/parseHtmlWithNextImage";

export default function Demo() {
  return (
    <div className="my-32">
      <div>{replaceImgWithNextImage(htmlContent)}</div>
    </div>
  );
}
