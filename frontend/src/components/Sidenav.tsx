import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SIDENAV_MARGIN = 1.5;

const activeClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : "";

export default function Sidenav() {
  return (
    <SidenavContainer>
      <SidenavItems>
        <SidenavItem>
          <SidenavItemLink to="/" className={activeClassName}>
            <svg
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1.1rem"
              width="1.1rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
            </svg>
          </SidenavItemLink>
        </SidenavItem>

        <SidenavItem className="active">
          <SidenavItemLink to="/battle" className={activeClassName}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1.3rem"
              width="1.3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill-rule="nonzero"
                  d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
                ></path>
              </g>
            </svg>
          </SidenavItemLink>
        </SidenavItem>

        <SidenavItem>
          <SidenavItemLink to="/leaderboard" className={activeClassName}>
            <svg
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1.4rem"
              width="1.4rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M64 199.9v208.2c0 4.4 3.5 7.9 7.9 7.9h96.2c4.4 0 7.9-3.5 7.9-7.9V199.9c0-4.4-3.5-7.9-7.9-7.9H71.9c-4.4 0-7.9 3.5-7.9 7.9zM199.9 96c-4.4 0-7.9 3.5-7.9 7.9V416h120.1c4.4 0 7.9-3.5 7.9-7.9V103.9c0-4.4-3.5-7.9-7.9-7.9H199.9zM440.1 256h-96.2c-4.4 0-7.9 3.5-7.9 7.9v144.2c0 4.4 3.5 7.9 7.9 7.9h96.2c4.4 0 7.9-3.5 7.9-7.9V263.9c0-4.4-3.5-7.9-7.9-7.9z"></path>
            </svg>
          </SidenavItemLink>
        </SidenavItem>

        <SidenavItem>
          <SidenavItemLink to="/profile" className={activeClassName}>
            <svg
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1rem"
              width="1rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
            </svg>
          </SidenavItemLink>
        </SidenavItem>
      </SidenavItems>
    </SidenavContainer>
  );
}

const SidenavContainer = styled.div`
  position: fixed;
  padding: 0.8rem;
  background-color: #2c2e32;
  top: ${SIDENAV_MARGIN}rem;
  left: ${SIDENAV_MARGIN}rem;
  bottom: ${SIDENAV_MARGIN}rem;
  border-radius: 10px;
`;

const SidenavItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const SidenavItem = styled.li``;

const SidenavItemLink = styled(NavLink)`
  background: #475259;
  border-radius: 10px;
  height: 45px;
  width: 45px;
  display: grid;
  place-items: center;
  transition: background 200ms;

  &.active {
    background: #6050dc;
    > svg {
      fill: white;
    }
  }

  > svg {
    fill: #88949b;
    transition: fill 100ms;
  }

  :hover,
  :focus {
    > svg {
      fill: white;
    }
  }
`;
