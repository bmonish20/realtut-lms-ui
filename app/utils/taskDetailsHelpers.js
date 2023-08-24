import { Badge } from "reactstrap";

export const getPriority = (priority) => {
  if (priority === "1")
    return (
      <span className="h2">
        <Badge color="danger">High</Badge>
      </span>
    );
  else if (priority === "2")
    return (
      <span className="h2">
        <Badge color="warning">Medium</Badge>
      </span>
    );
  else
    return (
      <span className="h2">
        <Badge color="success">Low</Badge>
      </span>
    );
};

export const getStatus = (status) => {
  if (status === "Completed")
    return (
      <span className="h2">
        <Badge color="success">Completed</Badge>
      </span>
    );
  else if (status === "On-Hold")
    return (
      <span className="h2">
        <Badge color="warning">On-Hold</Badge>
      </span>
    );
  else if (status === "In Progress")
    return (
      <span className="h2">
        <Badge color="default">In Progress</Badge>
      </span>
    );
  else
    return (
      <span className="h2">
        <Badge color="primary">Open</Badge>
      </span>
    );
};
