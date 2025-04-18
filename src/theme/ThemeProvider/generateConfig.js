import { config } from '@/theme/_config';
function hasProperty(configuration, property) {
    const parts = property.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentObject = configuration;
    for (const part of parts) {
        if (!(part in currentObject)) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        currentObject = currentObject[part];
    }
    return true;
}
const buildConfig = (variant) => {
    const { variants, ...defaultConfig } = config;
    const variantConfig = variant === 'default' ? undefined : variants[variant];
    const fontColors = {
        ...defaultConfig.fonts.colors,
        ...(variantConfig && hasProperty(variantConfig, 'fonts.colors')
            ? variantConfig.fonts.colors
            : {}),
    };
    const backgroundColors = {
        ...defaultConfig.backgrounds,
        ...(variantConfig && hasProperty(variantConfig, 'backgrounds')
            ? variantConfig.backgrounds
            : {}),
    };
    const borderColors = {
        ...defaultConfig.borders.colors,
        ...(variantConfig && hasProperty(variantConfig, 'borders.colors')
            ? variantConfig.borders.colors
            : {}),
    };
    const navigationColors = {
        ...defaultConfig.navigationColors,
        ...(variantConfig && hasProperty(variantConfig, 'navigationColors')
            ? variantConfig.navigationColors
            : {}),
    };
    const colors = {
        ...defaultConfig.colors,
        ...(variantConfig && hasProperty(variantConfig, 'colors')
            ? variantConfig.colors
            : {}),
    };
    return {
        backgrounds: backgroundColors,
        borders: {
            colors: borderColors,
            radius: defaultConfig.borders.radius,
            widths: defaultConfig.borders.widths,
        },
        colors,
        fonts: {
            colors: fontColors,
            sizes: defaultConfig.fonts.sizes,
        },
        gutters: defaultConfig.gutters,
        navigationColors,
    };
};
export default buildConfig;
