import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBar: '#000000',
      textWhite: '#ffffff',
      errorMessage: '#ff0000'
    },
    fontSizes: {
      body: 13,
      subheading: 18,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;