// ==============================|| THEME CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/dashboard/default';
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;

/**
 * Application configuration interface
 */
export interface Config {
  fontFamily: string;
}

const config: Config = {
  fontFamily: `'Vazir', 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`
};

export default config;
