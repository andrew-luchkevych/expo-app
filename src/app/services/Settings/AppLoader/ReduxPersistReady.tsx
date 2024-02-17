import { useEffect } from "react";

export interface ReduxPersistReadyListenerProps {
    onReady: () => void;
}
export const ReduxPersistReadyListener = ({ onReady }: ReduxPersistReadyListenerProps) => {
    useEffect(() => {
        onReady();
    }, []);
    return null;
};

export default ReduxPersistReadyListener;
