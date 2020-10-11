import React from 'react';

import {bound as commonActions} from 'client/actions';
import NotifyPage, {NotifyPageProps} from 'client/components/notify-page';
import {ROUTES} from 'client/routes';

const notifyAction: NotifyPageProps['action'] = {
    handleClick: () => {
        commonActions.router.push(ROUTES.HELLO.USER.ID);
    },
    title: 'Ура!',
};

export default function Page() {
    return (
        <NotifyPage
            title="Привет!"
            action={notifyAction}
        />
    );
}
