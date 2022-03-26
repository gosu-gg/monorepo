import React from "react";
import styled from "styled-components";
import { SIDENAV_MARGIN } from "./Sidenav";

type Props = { children?: React.ReactNode };

export default function Page(props: Props) {
  const { children } = props;
  return <SPageContainer>{children}</SPageContainer>;
}

const SPageContainer = styled.main`
  padding: ${SIDENAV_MARGIN}rem ${SIDENAV_MARGIN}rem ${SIDENAV_MARGIN}rem
    ${SIDENAV_MARGIN + 5.885}rem;
`;
