import React from 'react';

// Роуты приложения лучше объявлять на уровне компонент
const prepareRoutes = (fragments: JSX.Element[]) => {
    return fragments.reduce((result, fragment) => {
        React.Children.forEach(fragment.props.children, subroute => {
            result.push(subroute);
        });

        return result;
    }, []);
};

export default prepareRoutes;
