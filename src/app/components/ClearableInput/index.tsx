import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent } from "react-native";
import { Input, InputField, HStack, Button, ButtonText, Text } from "@gluestack-ui/themed";

export interface ClearableInputProps {
    value: string;
    placeholder: string;
    helperText?: string;
    onChangeText: (value: string) => void;
}
export const ClearableInput = (props: ClearableInputProps) => {
    const { value, placeholder, onChangeText, helperText } = props;
    const animation = useRef(new Animated.Value(0));
    const btnAnimation = useRef(new Animated.Value(0));
    const [btnWidth, setBtnWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const onLayout = useCallback((e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        setContainerWidth(w);
    }, []);

    const onBtnLayout = useCallback((e: LayoutChangeEvent) => {
        setBtnWidth(e.nativeEvent.layout.width);
    }, []);

    useEffect(() => {
        if (btnWidth) {
            Animated.timing(animation.current, {
                toValue: btnWidth + 16,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(btnAnimation.current, {
                toValue: 1,
                delay: 200,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [containerWidth, btnWidth]);

    useEffect(() => {
        if (value) return;
        Animated.timing(animation.current, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        btnAnimation.current.setValue(0);
        setBtnWidth(0);
    }, [value]);

    const onClear = useCallback(() => onChangeText(""), [onChangeText]);

    return (
        <HStack space="md" onLayout={onLayout}>
            <Animated.View style={{ width: "100%", paddingRight: animation.current }}>
                <Input variant="rounded" width="100%">
                    <InputField value={value} placeholder={placeholder} onChangeText={onChangeText} p="$2" />
                </Input>
                <Text size="sm" px="$2">
                    {helperText}
                </Text>
            </Animated.View>
            {value && (
                <Animated.View
                    style={[{ position: "absolute", right: 0, opacity: 0 }, { opacity: btnAnimation.current }]}
                >
                    <Button variant="link" onPress={onClear} onLayout={onBtnLayout}>
                        <ButtonText>Clear</ButtonText>
                    </Button>
                </Animated.View>
            )}
        </HStack>
    );
};

export default ClearableInput;
