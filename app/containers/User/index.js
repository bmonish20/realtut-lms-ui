/**
 *
 * User
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardBody,Row, Col} from "reactstrap";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import Tag from "../../components/Tag";
import "./userStyle.scss";

export default function User() {
  useInjectReducer({ key: "user", reducer });
  const dispatch = useDispatch();
  const{ isLoading, user}=useSelector((state)=>({
    isLoading: selectors.isLoading(state),
    user: selectors.user(state),
  }));

  React.useEffect(()=>{
    const id = qs.parse(location.search).id;
    if(id){
      dispatch(operations.fetchUser(id));
    }
  },[]);

  const getComponent = () => { 
    return (<Row>
      <Col xs="3">
        <Row>
          {user.imageUrl ? (
            <a
              className=" avatar avatar-lg rounded-circle"
              onClick={(e) => e.preventDefault()}
            >
              <img alt="..." src={user.imageUrl} />
            </a>
          ) : (
            <i className="ni ni-circle-08 text-primary text-lg pt-2" />
          )}
        </Row>
      </Col>
      <Col xs="6">
        <Row>
          <Card className="mt-5 w-100">
            <CardBody>
              <Row className="justify-content-between">
                <Col className="text-lg text-primary">{`${user.firstName} ${user.lastName}`}</Col>
                {user.otherProfile ? <Col sm={3}>
                  {user.otherProfile.websiteUrl ? <a href={user.otherProfile.websiteUrl}><i class="fas fa-globe ml-3"></i></a> : ""}
                  {user.otherProfile.twitterLink ? <a href={user.otherProfile.twitterLink}><i class="fab fa-twitter ml-3"></i></a> : ""}
                  {user.otherProfile.linkedInLink ? <a href={user.otherProfile.linkedInLink}><i class="fab fa-linkedin ml-3"></i></a> : ""}
                  {user.otherProfile.githubLink ? <a href={user.otherProfile.githubLink}><i class="fab fa-github ml-3"></i></a> : ""}
                </Col> : ""}
              </Row>
              <Row>
                <Col className="text-muted text-sm">{user.currentRole}</Col>
              </Row>
              <Row>
                <Col>{user.email}</Col>
              </Row>
              <Row>
                <Col>{user.phoneNumber}</Col>
              </Row>
              <Row className="mt-1">
                <Col>{user.bio}</Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Row>
          {user.companyInfo ?
            <Card className="w-100">
              <CardHeader className="text-lg text-primary">Work Experience</CardHeader>
              <CardBody>
                <Row>
                  {user.companyInfo.title ? <Col> <strong>{user.companyInfo.title}</strong></Col> : ""}
                </Row>
                <Row>
                  {user.companyInfo.companyName ? <Col > {user.companyInfo.companyName}</Col> : ""}
                </Row>
                <Row>
                  {user.companyInfo.startDate ? <Col className="text-muted text-sm"> {`${user.companyInfo.startDate}  ${user.companyInfo.currentWorking ? "- Present" : "-" + user.companyInfo.endDate}`}</Col> : ""}
                </Row>
                <Row>
                  {user.companyInfo.description ? <Col> {user.companyInfo.description}</Col> : ""}
                </Row>
              </CardBody>
            </Card> : ""}
        </Row>
        <Row>
          {user.collegeInfo ?
            <Card className="w-100">
              <CardHeader className="text-lg text-primary">Education</CardHeader>
              <CardBody>
                <Row>
                  <Col> <strong>{`${user.collegeInfo.degree ? user.collegeInfo.degree : ""}  ${user.collegeInfo.major ? user.collegeInfo.major : ""}`}</strong></Col>
                </Row>
                <Row>
                  {user.collegeInfo.university ? <Col > {user.collegeInfo.university}</Col> : ""}
                </Row>
                <Row>
                  {user.collegeInfo.gpa ? <Col className="text-muted text-sm"> {`${user.collegeInfo.gpa}  ${user.collegeInfo.max ? "/" + user.collegeInfo.max : ""}`}</Col> : ""}
                </Row>
                <Row>
                  {user.collegeInfo.graduationDate ? <Col> {user.collegeInfo.graduationDate}</Col> : ""}
                </Row>
              </CardBody>
            </Card>
            : ""}
        </Row>
        <Row>
          {user.skills ?
            <Card className="w-100">
              <CardHeader className="text-lg text-primary">Skills</CardHeader>
              <CardBody>
                <Row>
                  {user.skills.map((skill, index) =>
                    <Tag key={index} className="my-1 mx-2" title={skill} />
                  )}
                </Row>
              </CardBody>
            </Card>
            : ""}
        </Row>
        <Row>
          {user.achievements ?
            <Card className="w-100">
              <CardHeader className="text-lg text-primary">Achievements</CardHeader>
              <CardBody>
                {user.achievements}
              </CardBody>
            </Card>
            : ""}
        </Row>
      </Col>
    </Row>)
  }

  return (
    <div className="user mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>User</title>
        <meta name="description" content="Description of User" />
      </Helmet>
      {getComponent()}
    </div>
  );
}

User.ropTypes = {};
