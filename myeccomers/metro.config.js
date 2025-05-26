const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Configuración base de Expo
const config = getDefaultConfig(__dirname);

// Añade estas opciones al "resolver"
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "react-dom": path.resolve(__dirname, "node_modules/react-native"), // Redirige react-dom a react-native
  },
  unstable_enablePackageExports: true, // Opcional: para soporte de exports modernos
};

// Aplica NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
