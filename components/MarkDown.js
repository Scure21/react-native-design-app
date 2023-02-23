import React from "react";
import Markdown from "react-native-showdown";

const MarkDownWrapper = ({ content, htmlStyles }) => {
  return (
    <Markdown
      markdown={content}
      css={htmlStyles}
      scalesPageToFit={false}
      scrollEnabled={false}
    />
  );
};

export default MarkDownWrapper;
