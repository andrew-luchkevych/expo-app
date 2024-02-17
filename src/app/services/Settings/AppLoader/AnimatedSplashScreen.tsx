import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { View } from "@gluestack-ui/themed";

SplashScreen.preventAutoHideAsync().catch(() => {
    /* reloading the app might trigger some race conditions, ignore them */
});

export interface AnimatedSplashScreenProps {
    children: ReactNode;
    img: Asset;
    isReady: boolean;
}

export const AnimatedSplashScreen = ({ children, isReady }: AnimatedSplashScreenProps) => {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (isReady) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isReady]);

    useEffect(() => {
        if (isSplashAnimationComplete) SplashScreen.hideAsync();
    }, [isSplashAnimationComplete]);

    return (
        <View flex={1} bg={Constants.expoConfig.splash.backgroundColor}>
            {isReady && <View flex={1}>{children}</View>}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: Constants.expoConfig.splash.backgroundColor,
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: Constants.expoConfig.splash.resizeMode || "contain",
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={require("../../../../assets/splash.png")}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default AnimatedSplashScreen;
