import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import { QuizReviewSkeleton, ReviewCard } from "../../components/Cards/Quiz";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./reviewsStyle.scss";

export default function Reviews() {
  useInjectReducer({ key: "reviews", reducer });
  const dispatch = useDispatch();
  const { isLoading, reviews } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    reviews: selectors.reviews(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    dispatch(operations.fetchReviews(id));
  }, []);

  const onDelete = (id) => {
    AlertPopupHandler.open({
      onConfirm: () => {
        const quizId = qs.parse(location.search).id;
        dispatch(operations.deleteOneReview(id, quizId));
      },
      confirmBtnText: "Delete",
      text: `You are about to delete the review. Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onReview = (id) => {
    history.push(`/review?id=${id}`);
  };

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4">
            <QuizReviewSkeleton />
          </Col>
          <Col xs="12" md="4">
            <QuizReviewSkeleton />
          </Col>
        </>
      );
    return reviews.map((review, index) => (
      <>
        <Col xs="12" md="6" lg="4" key={index}>
          <ReviewCard
            key={index}
            id={review.id}
            attendedBy={review.attendedBy.name}
            response={review.response}
            onDelete={onDelete}
            onReview={onReview}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${review.id}-${index}`} className="w-100" />
        ) : null}
      </>
    ));
  };

  return (
    <div className="reviews mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Reviews</title>
        <meta name="description" content="Reviews Page" />
      </Helmet>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

Reviews.propTypes = {};
