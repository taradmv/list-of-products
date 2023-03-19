import React, { useEffect, useState } from "react";
import firstJson from "../filter/first step json.json";
import addedJson from "../filter/added json file.json";
import {
  Card,
  CardDeck,
  Col,
  Dropdown,
  DropdownButton,
  Row,
  Container,
} from "react-bootstrap";

const Filter = () => {
  const [dates, setDates] = useState([]);
  const [titles, setTitle] = useState([]);
  const allData = firstJson.data;

  useEffect(() => {
    console.log("length:" + allData.length);
    const myDatesArray = [];
    const myTitlesArray = [];
    for (let i = 0; i < allData.length; i++) {
      myTitlesArray.push(allData[i].title);
      for (let j = 0; j < allData[i].dates.length; j++) {
        console.log("lengthOfDate: " + allData[i].dates.length);
        myDatesArray.push(allData[i].dates[j].date);
      }
    }
    setTitle(myTitlesArray);
    console.log("myDatesArray:" + myDatesArray.length);
    console.log("length of date:" + dates.length);
    console.log("length of title" + titles.length);
    //removing duplicates from Date array
    var newDate = [];
    newDate = myDatesArray.filter(function (elem, pos) {
      return myDatesArray.indexOf(elem) == pos;
    });
    setDates(newDate);
    console.log("titles: " + titles);
    console.log("dates: " + dates);
    console.log("date without duplicates:" + newDate);
  }, []);

  const dropdownData = [
    {
      title: "dates",
      actions: dates,
    },
    {
      title: "titles",
      actions: titles,
    },
  ];
  // const [selectedAction, setSelectedAction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(false);
  const cardDate = [];
  const cardPrice = [];
  const cardTitle = [];

  const handleDropdownClick = (action) => {
    // setSelectedAction(action);
    // Create arrays for title and subtitle

    const arrayCombine = [];
    console.log("cardDate: " + cardDate);

    for (let i = 0; i < allData.length; i++) {
      if (action === allData[i].title) {
        for (let j = 0; j < allData[i].dates.length; j++) {
          cardDate.push(allData[i].dates[j].date);
          cardPrice.push(allData[i].dates[j].price.amount);
        }
        setSelectedTitle(true);
      }
    }
    if (selectedTitle) {
      for (let i = 0; i < cardDate.length; i++) {
        let card = [cardDate[i], cardPrice[i]];
        arrayCombine.push(card);
      }
    }
    console.log("combine: " + arrayCombine);
    console.log("cardDate: " + cardDate);
    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].dates.length; j++) {
        if (action === allData[i].dates[j].date) {
          setSelectedDate(true);
          cardTitle.push(allData[i].title);
          cardPrice.push(allData[i].dates[j].price.amount);
        }
      }
    }
    if (selectedDate) {
      for (let i = 0; i < cardDate.length; i++) {
        let card = [cardTitle[i], cardPrice[i]];
        arrayCombine.push(card);
      }
    }
  };
  const cardsOfTitles = cardDate.map((item, index) => (
    <Col key={index}>
      <Card>
        <Card.Body>
          <Card.Title>Card {index + 1}</Card.Title>
          <Card.Text>
            Element from array1: {item}
            <br />
            Element from array2: {cardPrice[index]}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));
  const cardsOfDates = cardTitle.map((item, index) => (
    <Col key={index}>
      <Card>
        <Card.Body>
          <Card.Title>Card {index + 1}</Card.Title>
          <Card.Text>
            Element from array1: {item}
            <br />
            Element from array2: {cardPrice[index]}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <>
      <Row>
        {dropdownData.map((data, index) => (
          <Col key={index}>
            <DropdownButton
              id={`dropdown-basic-button-${index}`}
              title={data.title}
            >
              {data.actions.map((action, i) => (
                <Dropdown.Item
                  key={i}
                  href={`#/action-${i + 1}`}
                  onClick={() => handleDropdownClick(action)}
                >
                  {action}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        ))}
      </Row>
      <Container>
        {selectedDate && <Row>{cardsOfDates}</Row>}
        {selectedTitle && <Row>{cardsOfTitles}</Row>}
      </Container>
    </>
  );
};

export default Filter;
