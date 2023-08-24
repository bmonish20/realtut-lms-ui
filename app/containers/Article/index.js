/**
 *
 * Article
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import _debounce from "lodash/debounce";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import Can from "components/Can";
import ContentViewer from "components/ContentViewer";
import CopyToClipBoard from "components/CopyToClipBoard";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import { permissions } from "utils/permissions";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selector";
import * as operations from "./actions";
import "./articleStyle.scss";

export default function Article({ match }) {
  useInjectReducer({ key: "article", reducer });
  const [cookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const delayedLike = _debounce((id) => dispatch(operations.onLike(id)), 250);
  const delayedUnLike = _debounce((id) => dispatch(operations.onUnlike(id)), 250);

  const state = useSelector(state => ({
    title: selectors.title(state),
    category: selectors.category(state),
    description: selectors.discription(state),
    writtedById: selectors.writtedById(state),
    writtedBy: selectors.writtedBy(state),
    writtedByPicture: selectors.writtedByPicture(state),
    createdAt: selectors.createdAt(state),
    readDurationInMins: selectors.readDurationInMins(state),
    isLoading: selectors.isLoading(state),
    likes: selectors.likes(state),
    isLiked: selectors.isLiked(state),
  }));

  React.useEffect(() => {
    const { id } = match.params;
    if(!id) {
      history.push('/resources');
    }
    else {
      dispatch(operations.fetchArticle(id));
    }
    return () => dispatch(operations.articleInit());
  }, []);

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right mb-3">
        <Can permissions={[
            permissions.EDIT_ALL_ARTICLE,
            {
              permission: permissions.EDIT_MY_ARTICLE,
              value: isOwner
            }
          ]}>
            <i
              className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
              onClick={() => history.push(`/edit-resource?id=${match.params.id}`)}
            />
          </Can>
          <Can permissions={[
            permissions.DELETE_ALL_ARTICLE,
            {
              permission: permissions.DELETE_MY_ARTICLE,
              value: isOwner
            }
          ]}>
            <i
              className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
              onClick={() => onDelete(match.params.id, state.title)}
            />
          </Can>
        </Col>
    </>
  );

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: 'Delete',
      text: <>You are about to delete <span className="font-weight-bold font-italic">{title}</span>. Do you want to continue?</>,
      data: {},
      warning: true,
      customClass: 'text-xs',
      btnSize: 'sm'
    });
  }

  const getLoading = () => (
    <>
      <Card>
        <CardHeader>
          <Skeleton count={3}/>
        </CardHeader>
        <CardBody>
          <Skeleton count={2}/>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Skeleton count={3} />
          <div className="mt-4"/>
          <Skeleton count={5} />
          <div className="mt-4"/>
          <Skeleton count={2} />
        </CardBody>
      </Card>
    </>
  )

  const getComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col md="2" className="d-block d-md-none">
                { getOptions(state.writtedById === selectors.getUserId(cookie)) }
              </Col>
              <Col xs="12" md="10">
                <span className="h1 text-primary">{state.title}</span>
                <Row className="mx-0 mt-1 text-sm text-primary font-weight-bolder">
                  Type: <span className="ml-1 text-capitalize">{state.category}</span>
                </Row>
                <Row className="mx-2 mt-2">
                  <span className="text-sm text-muted">{state.createdAt}</span>
                  <span className="text-sm text-muted ml-2">.</span>
                  <span className="text-sm text-muted ml-2">
                    {state.readDurationInMins} min read
                  </span>
                  <span className="text-sm text-muted ml-2">.</span>
                  <span className="text-sm text-muted ml-2">
                    <i className="text-muted far fa-thumbs-up"/>
                    <span className="text-sm text-muted ml-1">{state.likes}</span>
                  </span>
                </Row>
              </Col>
              <Col md="2" className="d-none d-md-block">
                { getOptions(state.writtedById === selectors.getUserId(cookie)) }
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="mx-2 mb-3">
              <a
                className="avatar avatar-sm rounded-circle"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                {state.writtedByPicture ?
                  <img alt="..." src={state.writtedByPicture} />
                  :
                  <i className="ni ni-circle-08 text-xl" />
                }
              </a>
              <Col xs="9" md="6" className="ml-3 text-muted">
                <Row className="font-weight-bold">{state.writtedBy}</Row>
                <Row className="text-xs">{'Host'}</Row>
              </Col>
              <Col xs="12" md="5" className="mt-3 mt-md-0 text-right">
                {
                  state.isLiked ?
                    <Button
                      size="sm"
                      type="button"
                      color="primary"
                      className="btn-icon mt-0 mt-lg-3"
                      onClick={() => delayedUnLike(match.params.id)}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fas fa-thumbs-up"/>
                      </span>
                      <span className="btn-inner-text">Unlike</span>
                    </Button>
                  :
                  <Button
                    size="sm"
                    className="mt-0 mt-md-3"
                    outline
                    color="primary"
                    onClick={() => delayedLike(match.params.id)}
                  >
                    Like
                  </Button>
                }
                <CopyToClipBoard text={`${window.location.origin}${location.pathname}`}>
                  <Button
                      size="sm"
                      className="mt-0 mt-md-3"
                      outline
                      color="primary"
                  >
                    Share
                  </Button>
                </CopyToClipBoard>
                <Button
                    size="sm"
                    className="mt-0 mt-md-3"
                    outline
                    color="primary"
                >
                  Follow
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <ContentViewer
              className="text-left"
              content={state.description}
            />
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <div className="article mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Article</title>
        <meta name="description" content="Description of Article" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="9">
        {state.isLoading ? getLoading() : getComponent()}
        </Col>
      </Row>
    </div>
  );
}

Article.propTypes = {};
