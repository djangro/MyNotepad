import { useMemo } from 'react';
import { Image } from 'react-native';
import { z } from 'zod';
import { useTheme } from '@/theme';
import getAssetsContext from '@/theme/assets/getAssetsContext';
const images = getAssetsContext('images');
function AssetByVariant({ extension = 'png', path, ...props }) {
    const { variant } = useTheme();
    const image = useMemo(() => {
        const getDefaultSource = () => z.custom().parse(images(`./${path}.${extension}`));
        try {
            if (variant === 'default') {
                return getDefaultSource();
            }
            try {
                return z
                    .custom()
                    .parse(images(`./${variant}/${path}.${extension}`));
            }
            catch (error) {
                console.warn(`Couldn't load the image: ${path}.${extension} for the variant ${variant}, Fallback to default`, error);
                return getDefaultSource();
            }
        }
        catch (error) {
            console.error(`Couldn't load the image: ${path}`, error);
            return undefined;
        }
    }, [path, extension, variant]);
    return image && <Image source={image} testID="variant-image" {...props}/>;
}
export default AssetByVariant;
