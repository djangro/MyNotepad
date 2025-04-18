const getAssetsContext = (type) => type === 'images'
    ? require.context('./images', true, /\.(png|jpg|jpeg|gif|webp)$/)
    : require.context('/icons', true, /\.svg$/);
export default getAssetsContext;
