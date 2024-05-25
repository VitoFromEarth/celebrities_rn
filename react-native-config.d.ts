declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    API_KEY?: string;
    IMAGE_BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
