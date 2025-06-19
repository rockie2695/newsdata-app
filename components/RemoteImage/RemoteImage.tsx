import React, { useEffect, useState } from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";

interface RemoteImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  maxWidth?: number;
  [x: string]: any;
}

const RemoteImage: React.FC<RemoteImageProps> = ({
  uri,
  style,
  maxWidth,
  ...rest
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        setDimensions({ width, height });
      },
      (error) => {
        console.error("Failed to get image size:", error);
      }
    );
  }, [uri]);

  return (
    <View>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Image
          source={{ uri }}
          style={[
            {
              width: maxWidth ? maxWidth : dimensions.width,
              height: maxWidth
                ? (maxWidth * dimensions.height) / dimensions.width
                : dimensions.height,
            },
            style,
          ]}
          {...rest}
        />
      )}
    </View>
  );
};

export default RemoteImage;
