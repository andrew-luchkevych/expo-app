import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsStoreProps, settingsStoreInitialValue, useSettingsStore } from "./store";

const STORAGE_KEY = "user_settings";

export const useInitSettingsStore = () => {
    const [isReady, setIsReady] = useState(false);
    const settings = useSettingsStore((s) => s);
    useEffect(() => {
        const abort = new AbortController();
        const getInitalSettings = async (abortSignal: AbortSignal) => {
            let settings: SettingsStoreProps = {
                ...settingsStoreInitialValue,
            };
            try {
                settings = {
                    ...settings,
                    ...JSON.parse((await AsyncStorage.getItem(STORAGE_KEY)) || "{}"),
                };
            } catch {
                console.warn("No settings found");
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            }

            if (!abortSignal.aborted) setIsReady(true);
        };

        getInitalSettings(abort.signal);
        return () => abort.abort();
    }, []);

    useEffect(() => {
        if (isReady) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            (async () => {
                console.log("settings updated");
                console.log(JSON.parse((await AsyncStorage.getItem(STORAGE_KEY)) || "{}"));
            })();
        }
    }, [isReady, settings]);

    return {
        isReady,
    };
};

export default useInitSettingsStore;
