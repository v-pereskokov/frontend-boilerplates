import {Layout} from 'antd';
import React from 'react';
import {Switch} from 'react-router';

import Header from '__components/Header';
import {getRoutes} from '__utils/routes/makeRoutes';

import {layoutStyles} from './styles';

import '__containers/NotFound';

export default class Wrapper extends React.PureComponent {
    public render() {
        return (
            <Layout style={layoutStyles}>
                <Layout>
                    <Layout.Content>
                        <Header/>
                        <Switch children={getRoutes()}/>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
