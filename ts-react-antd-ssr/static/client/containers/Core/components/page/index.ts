import asPage from 'client/utils/hocs/asPage';

import {PAGE_SETTINGS} from '../../consts';
import Page from './Page';
import preloader from './preloader';

export default asPage({
    ...PAGE_SETTINGS,
    preloader,
})(Page);
