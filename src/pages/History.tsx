import dayjs from "dayjs";

import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import Typography from "@mui/material/Typography";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import NoData from "@/components/basic/NoData";
import PageWrapper from "@/components/PageWrapper";
import StatusIcon from "@/components/basic/StatusIcon";
import { getStatusTextColor, getStatusColor } from "@/helpers";
import { dateTimeFormat } from "@/constants";
import { TodoType } from "@/components/types";

function History() {
  const todos: TodoType[] | [] = [];

  return (
    <PageWrapper title="Todo history">
      <Timeline position="alternate">
        {todos.map((todo) => (
          <TimelineItem key={todo.id}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {dayjs(todo.updatedAt).format(dateTimeFormat)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color={getStatusColor(todo.status)}>
                <StatusIcon status={todo.status} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span" color={getStatusTextColor(todo.status)}>
                {todo.title}
              </Typography>
              <Typography>{todo.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {!todos.length && <NoData />}
    </PageWrapper>
  );
}

export default History;
