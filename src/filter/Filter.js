import React, { useEffect, useState } from "react";
import firstJson from "../filter/first step json.json";
import addedJson from "../filter/added json file.json";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";

const Filter = () => {
  const [dates, setDates] = useState([]);
  const [titles, setTitle] = useState([]);
  useEffect(() => {
    const allData = firstJson.data;
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
    setDates(myDatesArray);
    setTitle(myTitlesArray);
    console.log("myDatesArray:" + myDatesArray.length);
    console.log("length of date:" + dates.length);
    console.log("length of title" + titles.length);
    //removing duplicates from Date array
    var newDate = [];
    newDate = dates.filter(function (elem, pos) {
      return dates.indexOf(elem) == pos;
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
    {
      title: "more items",
      actions: ["Action 7", "Action 8", "Action 9"],
    },
  ];

  return (
    <Row>
      {dropdownData.map((data, index) => (
        <Col key={index}>
          <DropdownButton
            id={`dropdown-basic-button-${index}`}
            title={data.title}
          >
            {data.actions.map((action, i) => (
              <Dropdown.Item key={i} href={`#/action-${i + 1}`}>
                {action}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      ))}
    </Row>
  );
};

export default Filter;
