import React from "react";
import { WebView } from "react-native-webview";

const WebViewWrapper = ({ content, htmlStyles }) => {
  const webViewRef = useRef(null);
  return (
    <WebView
      source={{ html: content + htmlStyles }}
      scalesPageToFit={false}
      scrollEnabled={false}
      ref={webViewRef}
      onNavigationStateChange={(event) => {
        if (event.url !== "about:blank") {
          webViewRef.current.stopLoading();
          Linking.openURL(event.url);
        }
      }}
    />
  );
};

export default WebViewWrapper;
