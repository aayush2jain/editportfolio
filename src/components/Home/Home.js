import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Typewriter from "typewriter-effect";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPinterest } from "react-icons/fa";
import { FaPatreon } from "react-icons/fa";
import NavBar from "../Navbar";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useParams } from "react-router-dom";
function Home() {
  const { id } = useParams(); 
  console.log("userId",id)// Get userId from URL
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [formData, setFormData] = useState({
    techStack: "",
    about: "",
    profession: "",
    skills:"",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setLoading(true);
    try{
         const response = await axios.put(`http://localhost:4000/user/updateintro/${id}`,formData);
         console.log("see response",response);
    }
    catch(error){
      console.error("Error updating user data:", error);
    }
    finally{
      setLoading(false);
      alert("Changes Saved Successfully!");
    }
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/user/${id}`) // Pass userId to API
        .then((response) => {
          setUserData(response.data);
          console.log("User data:", response.data);
          setFormData({profession: response.data.profession, skills: response.data.coding_languages, about: response.data.about, techStack: response.data.tech_stacks});
        })
        .catch((error) => console.error("Error fetching user data:", error));
        axios
        .get(`http://localhost:4000/roles/${id}`) // Pass userId to API
        .then((response) => {
         setRoleData(response.data);
          console.log("User data:", response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [id]);

  if (!userData) {
    return <h2>Loading...</h2>;
  }
  return (
    <section>
       <NavBar id = {id}/>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M &nbsp;
                <strong className=" main-name">{userData.name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
              {roleData ? (
  <Typewriter
    options={{
      strings: roleData.map((role) => role.role),
      autoStart: true,
      loop: true,
      deleteSpeed: 50,
    }}
  />
) : (
  <p>Loading roles...</p>
)}

              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with <b className="purple">  <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="main-name"
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                  }}
                /></b> and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"><input className="purple" type="text" 
                name="skills" value={formData.skills} onChange={handleChange}   style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                  }}></input> </b>
              </i>
              <br />
              <br />
              <input className="purple" type="text" name="about"
              value={formData.about} onChange={handleChange} style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                    width:"50vw"
                  }}></input>&nbsp;
              {/* <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Blockchain.
                </b>
              </i> */}
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple"><input className="purple" name="techStack"
              onChange={handleChange} value={formData.techStack} style={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "transparent",
                  }} type="text"></input></b>
              {/* <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i> */}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              { userData.github && (
               <li className="social-icons">
               <a
                 href={userData.github}
                 target="_blank"
                 rel="noreferrer"
                 className="icon-colour  home-social-icons"
               >
                 <AiFillGithub />
               </a>
             </li>
              )  
}
              { userData.twitter && (
   <li className="social-icons">
   <a
     href={userData.twitter}
     target="_blank"
     rel="noreferrer"
     className="icon-colour  home-social-icons"
   >
     <AiOutlineTwitter />
   </a>
 </li>
              )}
              { userData.linkedin && (
                <li className="social-icons">
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            )
            }
            { userData.instagram && (
              <li className="social-icons">
              <a
                href={userData.instagram}
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillInstagram />
              </a>
              </li>
            )}
            { userData.pinterest && (
              <li className="social-icons">
              <a
                href={userData.pinterest}
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <FaPinterest />
              </a>
              </li>
            )}
            { userData.patreon && (
              <li className="social-icons">
              <a
                href={userData.patreon}
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <FaPatreon/>
              </a>  
              </li>
            )}
            </ul>
          </Col>
        </Row>
        {
          loading ?(
            <Button onClick={handleSubmit} className="purple">Saving...</Button>
          ):(
            <Button onClick={handleSubmit} className="purple">Save Changes</Button>
          )
        }
      </Container>
    </Container>
    </section>
  );
}

export default Home;

