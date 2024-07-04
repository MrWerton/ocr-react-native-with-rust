import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { rustImageSize } from "./modules/ocr-lib";

export default function App() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [size, setSize] = useState<{ width: number; height: number } | null>({
    width: 0,
    height: 0,
  });
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  const captureImage = async () => {
    if (camera.current) {
      try {
        const file = await camera.current.takePhoto();
        const result = await fetch(`file://${file.path}`);
        const data = await result.blob();
        const arrayBuffer = await new Response(data).arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const { height, width } = await rustImageSize(uint8Array);
        console.log({ width, height });
        setSize({ width, height });
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const w = Dimensions.get("window").width;
  const h = Dimensions.get("window").height;
  if (device == null)
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        photo
        style={StyleSheet.absoluteFill}
        isActive
        device={device}
        ref={camera}
      />

      <View
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            left: 0,
            right: 0,
            width: 40,
            position: "absolute",
            height: 40,
            backgroundColor: "rgba(255, 0,0,0.5)",
          }}
        >
          <Text>lt</Text>
        </View>
        <View
          style={{
            left: 0,
            bottom: 0,
            width: 40,
            position: "absolute",
            height: 40,
            backgroundColor: "rgba(255, 0,0,0.5)",
          }}
        >
          <Text>lb</Text>
        </View>
        <View
          style={{
            width: 40,
            position: "absolute",
            right: 0,
            top: 0,
            height: 40,
            backgroundColor: "rgba(255, 0,0,0.5)",
          }}
        >
          <Text>rt</Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: w / 2 - 40,
            top: h / 2 - 40,

            backgroundColor: "rgba(255, 155,0,0.5)",
          }}
        >
          <Text>{size?.height}</Text>
          <Text>{size?.width}</Text>
        </View>
        <View
          style={{
            right: 0,
            bottom: 0,
            width: 40,
            position: "absolute",
            height: 40,
            backgroundColor: "rgba(255, 0,0,0.5)",
          }}
        >
          <Text>rb</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
