import {CSPDirectives} from 'csp-header';

import defaultConfig from './defaults';
import apiCspPreset from './presets/api';
import passportCspPreset from './presets/passport';

const presets: CSPDirectives[] = [
    ...defaultConfig,
    apiCspPreset,
    passportCspPreset,
];

export default presets;
