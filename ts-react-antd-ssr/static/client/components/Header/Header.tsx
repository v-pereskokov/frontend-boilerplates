import {Layout} from 'antd';
import cn from 'classnames';
import React, {PureComponent} from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import {Props} from './types';

import {b} from './Header.scss';

const logo = <img src="/dist/images/agm-logo.png" alt="logo" className={b('logoImage')}/>;

export default class Header extends PureComponent<Props> {
    public render() {
        return (
            <Layout.Header className={b()}>
                <div className={b('logo')}>
                    {logo}
                </div>

                <div className={cn(b('content'), b('content', {visible: true}))}>
                    <div className={b('contentRoot')}>
                        <div className={b('tabsWrapper')}>
                            <nav className={b('tabs')}>
                                <li
                                    className={cn(
                                        b('navLi'),
                                        b('tab'),
                                    )}
                                >
                                    <a
                                        className={cn(
                                            b('link'),
                                            b('link', {active: true}),
                                        )}
                                    >
                                        Игры
                                    </a>
                                </li>

                                <li className={cn(b('navLi'), b('tab'))}>
                                    <a className={cn(b('link'))}>
                                        Статьи
                                    </a>
                                </li>
                            </nav>

                            <SearchOutlined
                                className={cn(
                                    b('searchButton'),
                                    b('searchButton', {accent: true}),
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        b('avatar'),
                        b('avatar', {visible: true}),
                    )}
                >
                    <div className={b('avatarWrapper')}>
                        <UserOutlined/>
                    </div>
                </div>
            </Layout.Header>
        );
    }
}
