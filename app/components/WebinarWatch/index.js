/**
 *
 * WebinarWatch
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Row,
} from "reactstrap";
import qs from "query-string";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Zoom from "../Zoom";
import history from "utils/history";
import { getDifference } from "utils/dateTimeHelpers";
import "./webinarWatchStyle.scss";

function WebinarWatch({ location }) {
  const [iframeVisible, toggleIFrame] = React.useState(false);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const { link, startTime, isHost } = qs.parse(location.search);
    if(!link || !startTime) {
      history.push('/events');
    }
    else {
      setState({ link, startTime, isHost});
    }
  }, []);

  return <div className="webinarWatch mx-3 mx-md-4 ml-lg-7" >
    {iframeVisible ?
      <Zoom
        meetingId={state.link}
        isHost={state.isHost}
        launchOnLoad={true}
      />
    :
    <div className="center-screen mt-7 ml-0 ml-lg-6">
      <div className="text-xl text-primary text-center">The Host is yet to start the webinar. Kindly be back to watch it live in</div>
      <div className="mt-6 ml-0 ml-md-6 ml-lg-9">
        <CountdownCircleTimer
          isPlaying
          // duration={10}
          duration={21600}
          initialRemainingTime={getDifference(state.startTime)}
          size={300}
          colors={[
            ['#5e72e4', 1]
          ]}
          onComplete={() => toggleIFrame(true)}
        >
          {({ remainingTime }) => {
            const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0')
            const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')
            const seconds = (remainingTime % 60).toString().padStart(2, '0')
          
            return <>
              <Row className="text-xl font-weight-bold text-monospace">
                <div className="mr-1">
                  {hours}
                </div>
                :
                <div className="mx-1">
                  {minutes}
                </div>
                :
                <div className="ml-1">
                  {seconds}
                </div>
              </Row>
            </>
            }}
          </CountdownCircleTimer>
        </div>
      </div>
    }  
  </div>;
}

WebinarWatch.propTypes = {};

export default memo(WebinarWatch);
