import React,{useState} from "react";
import {
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
} from "reactstrap";
import last from 'lodash/last';
import split from 'lodash/split';
import { useLocation,NavLink as ReactRouterNavLink, } from "react-router-dom";
import './ProfileStyle.scss';
import ProfileEdit from "../ProfileEdit";
import ResumeEdit from "../ResumeEdit";

function Profile() {
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState(last(split(location.pathname,'/')));
    const renderNavLinkRouter = ({children,className,subPath})=>{
        return (
            <ReactRouterNavLink activeClassName="activeNavTab" className={className} exact to={subPath}>{children}</ReactRouterNavLink>
        )
    }
    const renderComponent = () => {
        switch(currentTab){            
            case 'edit': return <ProfileEdit />;
            case 'resume': return <ResumeEdit />;
            default: return <ProfileEdit />; 
        }
    }
    const getProfileEditStatus = () => {
        return currentTab === "profile" || currentTab==="edit" || currentTab === "";
    }
    
    return (
        <>
            <Container className="profile">
                <Nav tabs justified >
                    <NavItem  active={ getProfileEditStatus() }   onClick={(e)=>setCurrentTab("edit")}>                        
                        <NavLink active={ getProfileEditStatus() }  
                        tag={({...vals})=>renderNavLinkRouter({...vals,subPath:"/profile/edit"})}
                        className="h4"
                        >Profile </NavLink>
                    </NavItem>
                    <NavItem active={currentTab==="resume"} onClick={(e)=>setCurrentTab("resume")}>
                        <NavLink active={currentTab==="resume"} exact to="/profile/resume" 
                        className="h4"
                        tag={({...vals})=>renderNavLinkRouter({...vals,subPath:"/profile/resume"})}>Resume</NavLink>
                    </NavItem>  
                </Nav>
                {renderComponent()}
            </Container>
        </>
    );
}

export default Profile;
