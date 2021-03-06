import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  className?: string;
  loading: boolean;
};

export default function LoaderWrapper(props: Props) {
  const { children, className, loading } = props;
  return <>{loading ? <SSpinningLoader className={className} /> : children}</>;
}

const SSpinningLoader = styled.div`
  height: 20px;
  width: 20px;
  display: inline-block;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: white;
  animation: 1s spin infinite ease-in-out;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
