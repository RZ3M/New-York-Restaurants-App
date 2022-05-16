import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Pagination, Table } from "react-bootstrap";

function Restaurants() {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const perPage = 10;

  // runs on first render
  // plus any dependency changes
  // dependencies: page, location
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    console.log(borough);

    let url = `https://salty-depths-25560.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    if (borough) url += `&borough=${borough}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, location.search]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  if (restaurants === null) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Loading Restaurants...</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {restaurants && restaurants.length > 0 ? (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Text>
                Full list of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((res) => {
                return (
                  <tr
                    key={res._id}
                    onClick={() => {
                      navigate(`/restaurant/${res._id}`);
                    }}
                  >
                    <td>{res.name}</td>
                    <td>
                      {res.address.building} {res.address.street}
                    </td>
                    <td>{res.borough}</td>
                    <td>{res.cuisine}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>No Restaurants Found</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Restaurants;
