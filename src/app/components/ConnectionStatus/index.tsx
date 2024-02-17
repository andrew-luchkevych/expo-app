import { useIsConnected } from "@app/services/Settings/store";
// import { Toast, Text } from "@gluestack-ui/themed";
import Toast from "react-native-root-toast";

export const ConnectionStatus = () => {
    const isConnected = useIsConnected();
    if (isConnected) return null;
    return (
        <Toast visible={true} backgroundColor="#ae1616" textColor="white">
            No internet connection
        </Toast>
    );
};

export default ConnectionStatus;
