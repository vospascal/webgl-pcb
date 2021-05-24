import styled from 'styled-components';
import { alignItems, alignSelf, color, display, flex, flexBasis, fontSize, justifyContent, order, space, textAlign, width } from 'styled-system';

export const FlexBox = styled('div')(
    {
        boxSizing: 'border-box',
    },
    width,
    space,
    flex,
    fontSize,
    color,
    order,
    textAlign,
    alignItems,
    justifyContent,
    alignSelf,
    flexBasis,
    display,
    (props) => props.css,
);
FlexBox.displayName = 'FlexBox';

export default FlexBox;
