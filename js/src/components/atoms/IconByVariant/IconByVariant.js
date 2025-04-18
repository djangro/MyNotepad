import { useMemo } from 'react';
import { z } from 'zod';
import { useTheme } from '@/theme';
import getAssetsContext from '@/theme/assets/getAssetsContext';
const icons = getAssetsContext('icons');
const EXTENSION = 'svg';
const SIZE = 24;
function IconByVariant({ height = SIZE, path, width = SIZE, ...props }) {
    const { variant } = useTheme();
    const iconProperties = { ...props, height, width };
    const Icon = useMemo(() => {
        try {
            const getDefaultSource = () => z
                .object({
                default: z.function().returns(z.custom()),
            })
                .parse(icons(`./${path}.${EXTENSION}`)).default;
            if (variant === 'default') {
                return getDefaultSource();
            }
            try {
                const fetchedModule = z
                    .object({
                    default: z.function().returns(z.custom()),
                })
                    .parse(icons(`./${variant}/${path}.${EXTENSION}`));
                return fetchedModule.default;
            }
            catch (error) {
                console.warn(`Couldn't load the icon: ${path}.${EXTENSION} for the variant ${variant}, Fallback to default`, error);
                return getDefaultSource();
            }
        }
        catch (error) {
            console.error(`Couldn't load the icon: ${path}.${EXTENSION}`, error);
            throw error;
        }
    }, [variant, path]);
    return <Icon {...iconProperties}/>;
}
export default IconByVariant;
