import React from "react";
import { Card } from "react-bootstrap";

function About() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Jack Ma</Card.Title>
        <Card.Text>
          Super cool and interesting guy!
          <br />
          Check out my
          <a href="https://github.com/rzeema/Sudoku"> Sudoku</a> project!
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
