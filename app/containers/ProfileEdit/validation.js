import * as yup from 'yup';

const phoneRegExp = /^[0-9]{10}$/;

export default yup.object().shape({
    firstName: yup.string().required('First name cannot be empty'),
    lastName: yup.string().required('Last name cannot be empty'),
    email:yup.string().email('Please enter valid email').required('Please Enter Email'),
    phoneNumber:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    userName:yup.string().required('User name cannot be empty'),
    currentRole:yup.string().required('Current role cannot be empty'),
    currentCompanyName: yup.string().required('Company name cannot be empty'),
    experience:yup.number().integer("Please give whole numbers only").positive("Experience cannot be lesser than 0"),
    otherProfile: yup.object().shape({ 
        websiteUrl: yup.string().nullable(true).url("Please enter valid url"),
        linkedInLink: yup.string().nullable(true).url("Please enter valid url"),
        githubLink: yup.string().nullable(true).url("Please enter valid url"),
        twitterLink: yup.string().nullable(true).url("Please enter valid url"),
    }) 
});
