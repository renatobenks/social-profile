import React from 'react'
import ReactRender from 'react-test-renderer'

import '../__mocks__/fetch'
import { window, eventMock, mockFriends } from '../__mocks__/components'
import FriendsList from './FriendsList.jsx'

const propsFriendsList = {
    friends: window.INITIAL_STATE.friends
};

const createComponent = props =>
    ReactRender.create(
        <FriendsList {...props} />
    );

const FriendsListComponent = createComponent(propsFriendsList);
const component = FriendsListComponent.toJSON();

describe('Component: FriendsList', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders initially with limit of 4 friends into list', () => {
        const props = {...propsFriendsList, limit: 4};
        expect(createComponent(props)).toMatchSnapshot();
    });

    test('renders only favorites friends into list', () => {
        const props = {...propsFriendsList, favoritesOnly: true};
        expect(createComponent(props)).toMatchSnapshot();
    });

    test('renders online friends', () => {
        const props = {
            ...propsFriendsList,
            friends: {...propsFriendsList.friends, data: [
                    ...propsFriendsList.friends.data,
                    {...mockFriends[0], online: true}
            ]}
        };

        expect(createComponent(props)).toMatchSnapshot();
    });

    test('no renders message to show more friends', () => {
        const props = {
            ...propsFriendsList,
            limit: window.INITIAL_STATE.friends.totalRows
        };

        expect(createComponent(props)).toMatchSnapshot();
    });

    describe('showMoreFriends', () => {
        jest.useFakeTimers();
        const getColumnToShowMoreFriends = component =>
            component.children[0].children[component.children[0]
                .children.length - 1
            ].children[1].children[0];

        const clickToShowMoreFriends = async component =>
            await getColumnToShowMoreFriends(component).props.onClick(eventMock);

        beforeEach(() => {
            clickToShowMoreFriends(component);
        });

        test('renders loading from show more button friends list', () => {
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        test('renders more friends got it', () => {
            jest.runAllTimers();
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        test('renders more favorites friends', () => {
            const FriendsListComponent = createComponent({
                ...propsFriendsList,
                favoritesOnly: true
            });

            const component = FriendsListComponent.toJSON();
            clickToShowMoreFriends(component);
            jest.runAllTimers();
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        test('renders the rest friends from fetch request', () => {
            const FriendsListComponent = createComponent({
                ...propsFriendsList,
                friends: {
                    ...window.INITIAL_STATE.friends,
                    totalRows: 21
                }
            });

            const component = FriendsListComponent.toJSON();
            clickToShowMoreFriends(component);
            jest.runAllTimers();
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        test('no renders more friends when all friends was listed', () => {
            const FriendsListComponent = createComponent({
                ...propsFriendsList,
                limit: window.INITIAL_STATE.friends.totalRows
            });

            const component = FriendsListComponent.toJSON();
            clickToShowMoreFriends(component);
            jest.runAllTimers();
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
    });

    describe('onFavorite', () => {
        const getFriend = (component, id=1) =>
            component.children[0].children[id].children[0];
        const getIcons = (component, id) => getFriend(component, id)
            .children[1].children[0].children[1];
        test('renders a favorites friend when click to favorite friend', () => {
            const favorite = getIcons(component).children[1];
            favorite.props.onClick(eventMock);
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });

        test('renders a friend not favorites when click to favorite a favorite friend', () => {
            const favorite = getIcons(component, 0).children[1];
            favorite.props.onClick(eventMock);
            expect(FriendsListComponent.toJSON()).toMatchSnapshot();
        });
    });
});
