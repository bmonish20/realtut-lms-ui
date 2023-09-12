/**
 *
 * Webinars
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button, CardGroup, CardDeck } from "reactstrap";
import Select from "components/RtDropDown";
import { dropdownOptions } from "./helpers";
import WebinarCard, {
  WebinarCardSkeleton,
} from "../../components/Cards/Webinar";
import Can from "../../components/Can";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { permissions } from "utils/permissions";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./webinarsStyle.scss";

export default function Webinars() {
  useInjectReducer({ key: "webinars", reducer });
  const dispatch = useDispatch();
  const { isLoading, webinars, webinarType } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    webinars: selectors.webinars(state),
    webinarType: selectors.webinarType(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchWebinars());
  }, []);

  const onClick = (id) =>
    history.push({
      pathname: `/event/${id}`,
      state: { id },
    });

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteEvent(id)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{title}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onEdit = (id) => {
    history.push(`/add-event?id=${id}`);
  };

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4">
            <WebinarCardSkeleton />
          </Col>
          <Col xs="12" md="4">
            <WebinarCardSkeleton />
          </Col>
        </>
      );
    return webinars.map((webinar, index) => (
      <React.Fragment key={webinar.id}>
        <Col xs="12" md="6" lg="4">
          <WebinarCard
            key={`EventCard-${webinar.id}`}
            id={webinar.id}
            title={webinar.title}
            type={webinar.type}
            dateTime={webinar.dateTime}
            hostedBy={webinar.hostedBy}
            description={webinar.shortDescription}
            onClick={onClick}
            onDelete={onDelete}
            onEdit={onEdit}
            registeredCount={webinar.registeredUsers}
            isUserRegistered={webinar.isUserRegistered}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${webinar.id}-${index}`} className="w-100 mt-3" />
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <div className="webinars mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Events</title>
        <meta name="description" content="Description of Webinars" />
      </Helmet>

      <Row className="mt-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Select text={webinarType} options={dropdownOptions(dispatch)} />
          <Can permissions={[permissions.ADD_EVENT]}>
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/add-event")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Event</span>
            </Button>
          </Can>
        </div>
      </Row>
      <Row className="mt-3">
        {getComponent()}
      </Row>
    </div>
  );
}

Webinars.propTypes = {};
