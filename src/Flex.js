import styled from 'styled-components';
import { alignItems, flexDirection, flexWrap, justifyContent } from 'styled-system';

export const Flex = styled('div')(
    {
        display: 'flex',
    },
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
    (props) => props.css,
);
Flex.displayName = 'Flex';

export default Flex;
