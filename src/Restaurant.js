import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";

function prettyDate(d) {
  let tempDate = new Date(d);

  return `${
    tempDate.getMonth() + 1
  }/${tempDate.getDate()}/${tempDate.getFullYear()}`;
}

function Restaurant() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://salty-depths-25560.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((restaurant) => {
        console.log(restaurant);
        if (restaurant.hasOwnProperty("_id")) setRestaurant(restaurant);
        else setRestaurant(null);

        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Loading Restaurant Data...</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {restaurant ? (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>

          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>

          <h3>Ratings</h3>
          <CardDeck>
            {restaurant.grades.map((grade) => {
              return (
                <Card>
                  <Card.Header>Grade: {grade.grade}</Card.Header>
                  <Card.Body>Completed: {prettyDate(grade.date)}</Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              Unable to find Restaurant with id:{" "}
              <b style={{ color: "red" }}>{id}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Restaurant;
