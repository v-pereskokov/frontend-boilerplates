import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import React from 'react';

import {Props} from './types';

import {b} from './Spinner.scss';

export default class Spinner extends React.PureComponent<Props> {
    private defaultIcon = <LoadingOutlined
        style={{
            fontSize: this.props.pageMode ? 75 : 24,
            color: '#F8D830',
        }}
        spin
    />;

    render() {
        const {pageMode, ...otherProps} = this.props;

        if (pageMode) {
            return (
                <div className={b('base')}>
                    <Spin
                        {...otherProps}
                        indicator={this.defaultIcon}
                    />
                </div>
            );
        }

        return (
            <div className={b('root')}>
                <Spin
                    {...otherProps}
                    indicator={this.defaultIcon}
                />
            </div>
        );
    }
}
