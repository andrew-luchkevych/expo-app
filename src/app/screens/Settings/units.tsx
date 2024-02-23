import { UNITS } from "@app/redux/entities/OneCall/types";
import { SettingsStore, useUnits } from "@app/services/Settings/store";
import { Radio, RadioGroup, RadioIcon, RadioLabel, CircleIcon, RadioIndicator } from "@gluestack-ui/themed";
import { useCallback } from "react";

export const UnitsSwitcher = () => {
    const value = useUnits();
    const onChange = useCallback((v) => SettingsStore.setValue("units", v as UNITS), []);
    return (
        <RadioGroup value={value} onChange={onChange}>
            <Radio value={UNITS.standard} size="md" mb="$2">
                <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Standard</RadioLabel>
            </Radio>
            <Radio value={UNITS.metric} size="md" mb="$2">
                <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Metric</RadioLabel>
            </Radio>
            <Radio value={UNITS.imperial} size="md" mb="$2">
                <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Imperial</RadioLabel>
            </Radio>
        </RadioGroup>
    );
};

export default UnitsSwitcher;
