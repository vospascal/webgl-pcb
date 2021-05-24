import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Flex from '~/Flex';
import FlexBox from '~/FlexBox';
import theme from '~/theme';

const Left = () => null;
const Right = () => null;

const PageLayout = ({ children }) => {
    const left = children.find((child) => child.type === Left);
    const right = children.find((child) => child.type === Right);

    return (
        <ThemeProvider theme={theme}>
            <Flex flexWrap="wrap" alignItems="stretch" style={{ padding: '5px' }}>
                <FlexBox flex={['1 1 0%']} width={1}>
                    <React.Fragment>{left ? left.props.children : null}</React.Fragment>
                </FlexBox>
                <FlexBox width={['300px']} flexBasis={['300px']} p={['0', '0', '0', theme.padding[3]]} bg="#ccc" style={{ zIndex: '9999', height: 'calc(100vh - 30px)' }}>
                    <React.Fragment>{right ? right.props.children : null}</React.Fragment>
                </FlexBox>
            </Flex>
        </ThemeProvider>
    );
};

PageLayout.Left = Left;
PageLayout.Right = Right;

export default PageLayout;

PageLayout.propTypes = {
    children: PropTypes.node,
};
