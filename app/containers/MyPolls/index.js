/**
 *
 * MyPolls
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import Poll from "react-polls";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./myPollsStyle.scss";

export default function MyPolls() {
  useInjectReducer({ key: "myPolls", reducer });
  const dispatch = useDispatch();

  const { polls, isLoading } = useSelector((state) => ({
    polls: selectors.polls(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchMyPolls());
  }, []);

  const getPollsComponent = () => {
    if (isLoading) return <></>;
    return polls.map(({ options, title }) => (
      <Col xs="12" md="4">
        <Poll
          question={title}
          answers={options}
          customStyles={{ theme: "blue", questionBold: true }}
        />
      </Col>
    ));
  };

  return (
    <div className="myPolls mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>MyPolls</title>
        <meta name="description" content="Description of MyPolls" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12" md="6">
          <div className="text-primary font-weight-bold text-lg">My Polls</div>
        </Col>
      </Row>
      <Row>{getPollsComponent()}</Row>
    </div>
  );
}

MyPolls.propTypes = {};
