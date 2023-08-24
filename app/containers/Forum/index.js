import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import RtInput from "../../components/RtInput/index";
import { Row, Col, Button } from "reactstrap";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import { useCookies } from "react-cookie";
import moment from "moment-timezone";
import InfiniteScroll from "react-infinite-scroll-component";
import "./forumStyle.scss";

export default function Forum({ courseId, forumMessagesLength }) {
  useInjectReducer({ key: "forum", reducer });
  const dispatch = useDispatch();
  const changeInputText = operations.changeInputText(dispatch);
  const forumInit = operations.forumInit(dispatch);

  const { forumMessages, page, inputText } = useSelector((state) => ({
    forumMessages: selectors.forumMessages(state),
    page: selectors.page(state),
    inputText: selectors.inputText(state),
  }));
  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    dispatch(operations.fetchMessages(courseId, page));

    return () => forumInit();
  }, []);

  const fetchMoreData = () => {
    dispatch(operations.fetchMessages(courseId, page + 1));
  };

  const sendMessage = () => {
    dispatch(
      operations.sendMessage(
        {
          userId: selectors.getUserId(cookie),
          message: inputText,
          dateTime: new Date().getTime(),
          courseId,
        },
        courseId
      )
    );
    changeInputText("");
  };

  return (
    <div className="forum">
      <Helmet>
        <title>Forum</title>
        <meta name="description" content="Description of Forum" />
      </Helmet>
      <h1>Forum Messages</h1>
      {forumMessages.length > 0 ? (
        <InfiniteScroll
          dataLength={forumMessages.length}
          next={fetchMoreData}
          hasMore={forumMessagesLength - forumMessages.length}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {forumMessages.map((forumMessage, index) => {
            return selectors.getUserId(cookie) == forumMessage.userId._id ? (
              <Row key={index} className="mt-2 w-50 mr-1 ml-auto">
                <Col className="border rounded bg-gradient-primary text-white">
                  <div className="text-xs d-flex justify-content-between">
                    <span>
                      {moment().isSame(moment(forumMessage.dateTime), "day")
                        ? moment(forumMessage.dateTime).format("LT")
                        : moment(forumMessage.dateTime).format("hh:mm, DD/MMM")}
                    </span>
                    <span>You</span>
                  </div>
                  <div className="text-right">{forumMessage.message}</div>
                </Col>
              </Row>
            ) : (
              <Row key={index} className="mt-2 text-left ml-1 w-50">
                <Col className="border rounded  bg-gradient-secondary">
                  <div className="text-xs d-flex justify-content-between">
                    <span>{forumMessage.userId.name}</span>
                    <span>
                      {moment().isSame(moment(forumMessage.dateTime), "day")
                        ? moment(forumMessage.dateTime).format("LT")
                        : moment(forumMessage.dateTime).format("hh:mm, DD/MMM")}
                    </span>
                  </div>
                  <div>{forumMessage.message}</div>
                </Col>
              </Row>
            );
          })}
        </InfiniteScroll>
      ) : (
        <Row className="text-center text-muted">
          <Col>Be the first to send a message!</Col>
        </Row>
      )}

      <Row className="mt-3">
        <Col className="d-flex justify-content-between">
          <RtInput
            className="flex-shrink-1"
            onChange={changeInputText}
            type="textarea"
            placeholder="Type your message here"
            name="message"
            value={inputText}
          />
          <Button type="button" color="primary" onClick={(e) => sendMessage()}>
            <i class="far fa-paper-plane" />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

Forum.propTypes = {};
