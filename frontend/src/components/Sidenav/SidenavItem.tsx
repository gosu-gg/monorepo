import React from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { NavLink } from "react-router-dom";

const activeClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : "";

type Props = {
  children: React.ReactNode;
  title: string;
  to: string;
};

export default function SidenavItem(props: Props) {
  const { children, title, to } = props;
  return (
    <CustomTooltip title={title} placement="right">
      <li>
        <SSidenavItemLink to={to} className={activeClassName}>
          {children}
        </SSidenavItemLink>
      </li>
    </CustomTooltip>
  );
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#475259",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#475259",
    fontSize: 13,
  },
}));

const SSidenavItemLink = styled(NavLink)`
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
