import {Button as VendorButton} from 'antd';
import cn from 'classnames';
import React, {PureComponent} from 'react';

import {Props, State} from './types';

import {b} from './Button.scss';

export default class Button extends PureComponent<Props, State> {
    public state = {
        isPending: false,
    };

    public render() {
        const {children, className, ...props} = this.props;
        const {loading} = props;
        const {isPending} = this.state;

        return (
            <VendorButton
                {...props}
                onClick={this.handleClick}
                loading={loading || isPending}
                className={cn(b(), className)}
            >
                {children}
            </VendorButton>
        );
    }

    private handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const {onClick} = this.props;

        if (onClick) {
            new Promise(resolve => {
                this.setState({isPending: true});
                return resolve(onClick(event));
            })
                .then(this.stopPending)
                .catch(this.stopPending);
        }
    };

    private stopPending = () => {
        this.setState({isPending: false});
    }
}
