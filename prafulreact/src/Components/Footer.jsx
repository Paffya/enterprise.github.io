import React, {useState, useEffect} from 'react'
import "../Styles/Footer.css"
import { Container,  Form, Row, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import LazyLoad from 'react-lazyload';
import laptopImg from "../Images/enterpriselaptop.png"
import talkdev from "../Images/TalkDev.png"
import talkmar from "../Images/TalkMartech.png"
import talkfin from "../Images/TalkFintech.png"
import talkit from "../Images/ITSecuritywire.png"
import talkcmo1 from "../Images/talkcmo1.png"
import facebook from "../Images/facebook-f.png"
import instagram from "../Images/instagram.png"
import linkedin from "../Images/linkedin.png"
import news6 from "../Images/news6.png";
// import { Link } from 'react-router-dom';
import {API_ROOT,webPath} from "../apiConfig";
import EnterpriseLogo from "../Images/enterpriseLogo.webp"

const Footer = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [policyText, setPolicyText] = useState(
    '*By clicking on the Submit button, you are agreeing with the Privacy Policy with Enterprise Talks.'
  );

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setIsValidEmail(true);
    setPolicyText(
      '*By clicking on the Submit button, you are agreeing with the Privacy Policy with Enterprise Talks.'
    );
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      try {
        const response = await fetch(`${API_ROOT}/api/subscribe/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          // The request was successful, you can handle the response here
          console.log('Subscription successful');
          resetForm(); // Reset the form after successful submission
          setPolicyText('Thank you for subscribing ✅');

          // Reset the complete form after 5 seconds
          setTimeout(() => {
            resetForm();
          }, 5000);
        } else {
          // The request failed, handle the error
          console.error("Subscription failed");
  
          // Check if the user already exists (assuming a specific response status code)
          // setTimeout(() => {
          //   resetForm();
          // }, 5000);
          if (response.status === 404) {
            // User already exists, show a message
            setPolicyText("This email is already subscribed ❌");
          }
        }
      } catch (error) {
        console.error('Error sending subscription request:', error);
      }
    } else {
      console.log('Invalid email');
    }
  };

  const [className, setClassName] = useState('');

  useEffect(() => {
    const sections = 5; 
    let currentSection = 1;

    const setSectionClassName = () => {
      const removeTimer = setTimeout(() => {
        setClassName('');
      }, 0);

      const setTimer = setTimeout(() => {
        setClassName('loaded');
        currentSection++;

        if (currentSection <= sections) {
          setSectionClassName();
        } else {
          
          window.removeEventListener('scroll', handleScroll);
        }
      }, currentSection * 150);

      return () => {
        clearTimeout(removeTimer);
        clearTimeout(setTimer);
      };
    };

    const handleScroll = () => {
     
      if (window.scrollY > 100) { 
        setSectionClassName();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  

  return (
    <div>


<div className="footerPadding" style={{backgroundColor:"rgb(238, 237, 237)"}}>
  <div className="container container-max">
    <div className="row">
      <div className="col-md-3">
        <div>
          <img className="FootLogo" src={EnterpriseLogo} alt="Enterprise Logo" />
        </div>
        <div className="mt-4">
          <p className="just-text">A Peer Knowledge resources - By the CXO, For the CXO</p>
        </div>
        <div className="mt-2">
          <p className="just-text">Expert inputs on challenges, triumphs and innovative solution from corporate Movers and Shakers in the global Leadership space to add value to Business decision making.</p>
        </div>
        <div className="mt-3">
          <div>
            <a className="text-black fw-bold hoverHead" href="mailto: media@enterprisetalk.com">Media@Enterprisetalk.com</a>
          </div>
          <div className='mt-1'>
            <a className="text-black fw-bold hoverHead" href="mailto: sales@enterprisetalk.com">Sales@EnterpriseTalk.com</a>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="">
          <div className="border-bottom mt-3">
            <h6 className="fw-bold h5">About</h6>
          </div>
          <div className="border-bottom mt-3">
            <p ><a href="/about" className='text-black hoverHead'>About Us</a></p>
          </div>
          <div className="border-bottom mt-3">
            <a href="/contact-us"><p className='hoverHead'>Contact Us</p></a>
          </div>
          <div className="border-bottom mt-3">
            <p className='hoverHead'>
            <p className='text-black hoverHead DesktopResponsive' style={{cursor:"pointer"}} onClick={handleShow}>
        Subscribe
      </p>

      <div className="subscribePopUp">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <img className="subslogo" style={{width:"20%"}} src={EnterpriseLogo} alt="Footer Logo" />

        </Modal.Header>
        <Container className="popupBack">
          <Row>
            <Col  md={5} className="mb-3 laptopmImgback">
              <img className="DesktopResponsive mt-3" style={{width:"100%" ,objectFit:"cover", borderRadius:"10px"}} src={laptopImg} alt="" />

            </Col>
         

            <Col md={7}>
                         <div style={{textAlign:"center"}}>
                         <img className="mt-3" style={{width:"40%", borderRadius:"10px", filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(1000%) hue-rotate(345deg)' }} src={news6} alt="" />
                         </div>
                         
                          <Form.Group className="px-3 mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="email"
          placeholder="Email ID"
          className={`mt-3 py-3 ${isValidEmail ? '' : 'is-invalid'}`}
          value={email}
          onChange={handleEmailChange}
        />
        <div className="mt-3 px-2 fw-bold" style={{ fontSize: '14px' }}>
        {policyText}
        </div> 
        
        {!isValidEmail && <div className="invalid-feedback">Please enter a valid email address.</div>}
      </Form.Group>
      <Modal.Footer className="start">
        <button className="SubBtn" onClick={handleSubmit}>
          Submit
        </button>
      </Modal.Footer>
            </Col>
          </Row>
         
        </Container>

        
        
      </Modal>
      </div>
            </p>
          </div>
          <div className="border-bottom mt-3">
            <a href="/sitemap"><p className='hoverHead'>Sitemap</p></a>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="">
          <div className="border-bottom mt-3">
            <h6 className="fw-bold h5">Policies</h6>
          </div>
          <div className="border-bottom mt-3">
           <a href='/privacy'> <p className='hoverHead'>Privacy Policy</p></a>
          </div>
       
          <div className="border-bottom mt-3">
           <a href="/opt-out-form"> <p className='hoverHead'>Do Not Sell My Information</p> </a>
          </div>
        </div>
      </div>
      <div className="col-md-3 followPadding">
        <div>
          <p className="fw-bold" style={{fontSize:"19px"}}>Follow Us</p>
        </div>
        <div className="d-flex mt-2">
          <div style={{width:"18%"}} className='facebookImg'>
            <a href="https://www.facebook.com/EnterpriseTalk">
            <source srcSet={facebook} type="image/webp" />
              <img src={facebook} alt="facebook" defer="defer"  width="10px" height="auto" />
              </a>
          </div>
          <div style={{width:"18%"}} className='facebookImg'>
          <a href="https://www.instagram.com/enterprisetalk">
          <source srcSet={instagram} type="image/webp" />
            <img src={instagram} alt="instagram" defer="defer"  width="15px" height="auto"/>
            </a>
          </div>
          <div style={{width:"18%"}} className='facebookImg'>
            <a  href="https://www.twitter.com/Enterprise_Talk">
            <source  type="image/webp" />
              <img src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg" alt="twitter img" defer="defer" style={{width:"70%", borderRadius:"6px"}} width="10px" height="auto" />
              </a>
          </div>
          <div style={{width:"18%"}} className='facebookImg'>
            <a href="https://www.linkedin.com/company/enterprisetalk/">
            <source srcSet={linkedin} type="image/webp" />
              <img src={linkedin} alt="linkedin"  width="15px" height="auto" defer="defer" />
              </a>
           
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-12 mt-3">
      <h6 className="text-center h5 fw-bold">Other Publications</h6>
    </div>
    <div className="d-flex text-center otherPublic" >
      <div>
       <a href="https://itsecuritywire.com/"> <img className='imgPublica'  src={`${talkit}?width=100`} alt="talkit"  width="100" height="auto" defer="defer" /></a>
      </div>
      <div>
       <a href="https://talkmartech.com/"> <img className='imgPublica' src={`${talkmar}?width=100`} alt="talkmar"  width="100" height="auto" defer="defer" /> </a>
      </div>
      <div>
       <a href="https://talkfintech.com/"> <img className='imgPublica' src={`${talkfin}?width=100`} alt="talkfin"   width="100" height="auto" defer="defer" /> </a>
      </div>
      <div>
       <a href="https://talkcmo.com/"> <img className='imgPublicaCMO' src={`${talkcmo1}?width=100`} alt="talkcmo"  width="100" height="auto" defer="defer" /> </a>
      </div>
      <div>
       <a href="https://talkdev.com/"> <img className='imgPublica' src={`${talkdev}?width=100`} alt="talkdev"   width="100" height="auto" defer="defer" /> </a> 
      </div>
      
    </div> 
    <div className="mt-4" style={{borderTop:"1px solid #bdbdbd"}}>
      <p className="mt-2" style={{fontSize:" 13px"}}>An Imprint of OnDot ® Media © | All Rights Reserved | <a href="/privacy" className='colorRed hoverHead'>Privacy Policy</a></p>
    </div>
  </div>
</div>




    </div>
  )
}

export default Footer