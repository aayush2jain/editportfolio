import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar";
function Projects() {
   const { id } = useParams(); 
    console.log("userId",id)// Get userId from URL
    const [projectData, setprojectData] = useState(null);
    const [loading,setloading] = useState(false);
    const handleSaveProject = async (id, updatedProject) => {
      setloading(true);
      try {
        console.log("updatedProject",updatedProject);
        const response = await axios.put(`http://localhost:4000/changeproject/${id}`, updatedProject);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error updating project:", error);
      }
      finally{
        setloading(false);
        alert("changes are saved");
      }
    };
    
    useEffect(() => {
      if (id) {
        axios
          .get(`http://localhost:4000/project/${id}`) // Pass userId to API
          .then((response) => {
            setprojectData(response.data);
            console.log("User data:", response.data);
          })
          .catch((error) => console.error("Error fetching user data:", error));

      }
    }, [id]);
  
    if (!projectData) {
      return <h2>Loading...</h2>;
    }
  return (
    <Container fluid className="project-section">
      <Particle />
      <NavBar id = {id}/>
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px",position: "relative" }}>
        {projectData.map((project, index) => (
            <Col md={4} className="project-card" key={project.id} style={{ position: "relative" }}>
              <Card className="project-card-view">
                <Card.Img variant="top" src={project.image} alt="card-img" />
                <Card.Body>
                  <Card.Title>
                    <input
                      type="text"
                      value={project.projectname}
                      style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        textAlign: "center",
                        color:"white"
                      }}
                      onChange={(e) => {
                        const newProjectName = e.target.value;
                        setprojectData((prevData) =>
                          prevData.map((p) =>
                            p.id === project.id ? { ...p, projectname: newProjectName } : p
                          )
                        );
                      }}
                    />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "justify" }}>
                  <textarea
                      type="text"
                      value={project.description}
                      style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        textAlign: "center",
                        width:"100%",
                        height:"auto",
                        color:"white"
                      }}
                      onChange={(e) => {
                        const newdescription = e.target.value;
                        setprojectData((prevData) =>
                          prevData.map((p) =>
                            p.id === project.id ? { ...p,description: newdescription} : p
                          )
                        );
                      }}
                    />
                  </Card.Text>

                  {project.demolink && (
                    <Button variant="primary" href={project.demolink} target="_blank" style={{ marginLeft: "10px" }}>
                      <CgWebsite /> &nbsp; {"Demo"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
              {
                loading?(
                  <Button
                  style={{ zIndex: 1000, marginTop: "10px", position: "absolute", left: "135px" }}
                  onClick={() => handleSaveProject(project.id,{projectname:project.projectname,description: project.description })}
                >
                  Saving Changes
                </Button>
                ):(
                  <Button
                  style={{ zIndex: 1000, marginTop: "10px", position: "absolute", left: "135px" }}
                  onClick={() => handleSaveProject(project.id,{projectname:project.projectname,description: project.description })}
                >
                  Save Changes
                </Button>
                )
              }
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
