import { Badge, BadgeProps, Collapse, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Notification } from "./notification";
import { useState } from "react";
import styled from "@emotion/styled";

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  position?: string;
}
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 9,
    top: 10,
    padding: "0 6px",
    borderRadius: "100px",
    fontSize: "0.8rem",
  },
}));
export const NoticeIcon = ({
  count,
  setCount,
  position = "right-0",
}: Props) => {
  const [noticeOpen, setNoticeOpen] = useState(false);

  return (
    <div className="mx-[1rem] p-[0.4rem] ">
      <IconButton
        className="h-full "
        onClick={() => {
          setNoticeOpen(!noticeOpen);
          setCount(0);
        }}
      >
        <StyledBadge color="error" badgeContent={count}>
          {count !== 0 ? (
            <NotificationsIcon
              fontSize="large"
              className="absolute top-1 left-1 min-h-[2.5rem] min-w-[2.5rem] animate-ping text-white opacity-70"
            />
          ) : (
            <></>
          )}
          <NotificationsIcon
            fontSize="large"
            className="min-h-[3rem] min-w-[3rem] text-white"
          />
        </StyledBadge>
      </IconButton>
      <div className={`absolute ${position} z-10 flex justify-end`}>
        <Collapse in={noticeOpen} translate="yes" className="w-[35rem]">
          <Notification
            count={count}
            setCount={setCount}
            setOpen={setNoticeOpen}
          />
        </Collapse>
      </div>
    </div>
  );
};
