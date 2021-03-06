import React from 'react'
import ReactRender from 'react-test-renderer'

import Title from './Title.jsx'

const propsTitle = {
    title: 'My app title'
};

const createComponent = (props={}, content='') => ReactRender.create(
    <Title {...props}>
        {content}
    </Title>
);

const TitleComponent = createComponent(propsTitle);
const component = TitleComponent.toJSON();

describe('Component: Title', () => {
    test('render component without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders on component the title with additional icon', () => {
        expect(createComponent({...propsTitle, icon: 'browser'}))
            .toMatchSnapshot();
    });

    test('renders on component a additional icon', () => {
        expect(createComponent({icon: 'browser'})).toMatchSnapshot();
    });

    test('renders title with subtitle', () => {
        expect(createComponent({...propsTitle, subtitle: 'My subtitle'}))
            .toMatchSnapshot();
    });

    test('renders content children in', () => {
        expect(createComponent({}, <img src="logo.svg" alt="logo"/>))
            .toMatchSnapshot();
    });

    test('no renders content missing content, title and subtitle', () => {
        expect(createComponent()).toMatchSnapshot();
    });
});
