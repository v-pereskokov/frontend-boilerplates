import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {Preload} from 'page';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import {compose} from 'redux';

import {bound as commonActions} from '__actions';
import makeModel from '__utils/infrastructure/makeModel';
import {CommonStore} from '__utils/infrastructure/store';

export default function preload<E>(params: Preload<E>) {
    const {withSpinner = true} = params;

    return (ComposedComponent: React.ComponentType<E>) => {
        interface StateProps {
            isReady: boolean;
        }

        type OwnProps<E> = E & RouteComponentProps<any>;

        type Props = StateProps & OwnProps<E>;

        interface PreloadProcessOptions {
            isRestart?: boolean;
        }

        const omittedProps = [
            makeModel<Props>(m => m.isReady),
        ];

        class PreloadPage extends React.PureComponent<Props> {
            public componentDidMount() {
                this.preload({isRestart: false});
            }

            public componentDidUpdate(prevProps: Readonly<Props>) {
                if (!isEqual(prevProps.location.pathname, this.props.location.pathname)) {
                    this.preload({isRestart: true});
                }
            }

            public componentWillUnmount() {
                const {onDispose} = params;

                if (onDispose) {
                    onDispose(omit(this.props, omittedProps));
                }
            }

            public render() {
                const {isReady} = this.props;

                return (
                    <React.Fragment>
                        {withSpinner && !isReady && 'Загрузка...'}

                        <ComposedComponent{...this.props}/>
                    </React.Fragment>
                );
            }

            private preload = ({isRestart}: PreloadProcessOptions) => {
                const {onLoad} = params;

                commonActions.preload[
                    (isRestart ? 'setAsReStart' : 'setAsStart') as keyof typeof commonActions.preload
                ]();

                if (onLoad) {
                    this.preloadProc()
                        .then(commonActions.preload.setAsReady)
                        .catch(commonActions.preload.setAsErrorReady);
                } else {
                    commonActions.preload.setAsReady();
                }
            };

            private preloadProc = () => {
                const {onLoad} = params;

                if (!onLoad) {
                    return;
                }

                return new Promise(async (resolve, reject) => {
                    try {
                        await onLoad(omit(this.props, omittedProps) as E);
                        return resolve();
                    } catch (e) {
                        return reject(e);
                    }
                });
            }
        }

        const mapStateToProps = (state: CommonStore): StateProps => ({
            isReady: state.preload.isReady,
        });

        return compose<any>(
            withRouter,
            connect(mapStateToProps),
        )(PreloadPage);
    };
}
