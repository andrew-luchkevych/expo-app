import { ReactNode, useCallback } from "react";
import { Button, ButtonIcon, HStack, View, SettingsIcon, MenuIcon, CopyIcon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import routes from "@app/routes";
import { useViewMode, ViewMode, HomeStore } from "../store";
import { useIsConnected } from "@app/services/Settings/store";

export interface FooterProps {
    children?: ReactNode;
}
export const Footer = (props: FooterProps) => {
    const { children } = props;
    const mode = useViewMode();
    const navigation = useNavigation();
    const isConnected = useIsConnected();
    const openSettings = useCallback(() => {
        navigation.navigate(routes.settings);
    }, [navigation]);
    const toggleViewMode = useCallback(() => {
        const { mode } = HomeStore.getState();
        HomeStore.setValue("mode", mode === ViewMode.cards ? ViewMode.list : ViewMode.cards);
    }, []);
    return (
        <HStack alignItems="center" justifyContent="space-between" px="$4" pt="$1" pb="$2">
            <Button size="lg" variant="link" onPress={toggleViewMode}>
                <ButtonIcon h="$8" w="$8" as={mode === ViewMode.cards ? MenuIcon : CopyIcon} />
            </Button>
            <View flex={1}>{children}</View>
            <Button size="lg" variant="link" onPress={openSettings} disabled={!isConnected}>
                <ButtonIcon h="$8" w="$8" as={SettingsIcon} />
            </Button>
        </HStack>
    );
};

export default Footer;
