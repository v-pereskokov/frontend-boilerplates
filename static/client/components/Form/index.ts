import {connect} from 'react-redux';

import {CommonStore} from '__utils/infrastructure/store';

import Form from './Form';
import {StateProps, OwnProps} from './types';
export {b as formB} from './Form.scss';

const mapStateToProps = (state: CommonStore, ownProps: OwnProps): StateProps => {
    return {
        formData: state.form.data[ownProps.modelId],
    };
};

export default connect(mapStateToProps)(Form);
