import { View } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";

export interface DataCardProps {
    children: ReactNode;
    cardProps: Omit<ComponentProps<typeof View>, "children">;
    childrenContainerProps: Omit<ComponentProps<typeof View>, "children">;
}

export const DataCard = ({ children, cardProps, childrenContainerProps }: DataCardProps) => (
    <View pr="$2" mt="$4" {...cardProps}>
        <View p="$4" borderRadius="$md" bg="rgba(255, 255, 255, 0.2)" {...childrenContainerProps}>
            {children}
        </View>
    </View>
);

export default DataCard;
