import React from "react";
import axios from 'axios';
import "../CSS/List.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toolbar from "../ui/Toolbar";
import RecommendItem from "../ui/RecommendItem";

function ListPage() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  var sentence=" ";

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `List`;
  }, []);


  const handleCheckboxChange = (script) => {
    // 이미 선택된 아이템인지 확인
    const isSelected = selectedItems.includes(script);
    if (isSelected) {
      // 이미 선택된 경우 선택을 해제
      setSelectedItems(selectedItems.filter(item => item !== script));
      console.log(selectedItems);
    } else {
      // 선택되지 않은 경우 선택 목록에 추가
      setSelectedItems([...selectedItems, script]);
      console.log(selectedItems);
    }
  };

  const makeSentence = () => {
    sentence = document.getElementById("inputbox").value;
    selectedItems.push(sentence);
    console.log(selectedItems);
  };

  // 선택된 아이템을 서버에 전송하는 함수
  const sendSelectedItems = () => {
    // 선택된 아이템을 서버로 전송
    var accessToken = localStorage.getItem("token");
    axios({
      method: "POST",
      url: "http://15.165.131.15:8080/api/styling/words",
      data: {
        words: selectedItems.toString()
      },
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      console.log("Selected items sent successfully:", res);
      navigate('/loading');
    }).catch((err) => {
      console.error("Error sending selected items:", err);
    });
  };

  return (
    <div className="main">
      <Toolbar />
      <div className="title"> Pick what you want!</div>
      <form id="list" className="list">
        <table>
          <tbody>
            <tr>
              <RecommendItem
                id="op1"
                htmlFor="op1"
                src="img/keyword (1).png"
                alt="pink, cherry blossom, spring, flower"
                script="봄 스타일 추천"
                onChange={() => handleCheckboxChange('keyword')}
              />
              <RecommendItem
                id="op2"
                htmlFor="op2"
                src="img/keyword (2).png"
                alt="Product 2"
                script="스트릿"
                onChange={() => handleCheckboxChange('op2')}
              />
              <RecommendItem
                id="op3"
                htmlFor="op3"
                src="img/keyword (3).png"
                alt="Product 3"
                script="아메카지"
                onChange={() => handleCheckboxChange('op3')}
              />
            </tr>
            <tr>
              <RecommendItem
                id="op4"
                htmlFor="op4"
                src="img/keyword (4).png"
                alt="Product 4"
                script="스포티"
                onChange={() => handleCheckboxChange('op4')}
              />
              <RecommendItem
                id="op5"
                htmlFor="op5"
                src="img/keyword (5).png"
                alt="Product 5"
                script="청량한 여름옷"
                onChange={() => handleCheckboxChange('op5')}
              />
              <RecommendItem
                id="op6"
                htmlFor="op6"
                src="img/keyword (6).png"
                alt="Product 6"
                script="럭비셔츠"
                onChange={() => handleCheckboxChange('op6')}
              />
            </tr>
            <tr>
              <RecommendItem
                id="op7"
                htmlFor="op7"
                src="img/keyword (7).png"
                alt="Product 7"
                script="톤다운"
                onChange={() => handleCheckboxChange('op7')}
              />
              <RecommendItem
                id="op8"
                htmlFor="op8"
                src="img/keyword (8).png"
                alt="Product 8"
                script="MZ 오피스"
                onChange={() => handleCheckboxChange('op8')}
              />
              <RecommendItem
                id="op9"
                htmlFor="op9"
                src="img/keyword (9).png"
                alt="Product 9"
                script="데일리 캐주얼"
                onChange={() => handleCheckboxChange('op9')}
              />
            </tr>
          </tbody>
        </table>
        <div className="prompt"> Or..You can type it ! </div>
        <textarea placeholder="Type your keyword" type="input" id="inputbox" className="inputbox" />
        <div><input type="button" value="keyword add" id="addButton" className="addbutton" onClick={makeSentence} /></div>
        <div><input type="button" value="> > > NEXT" id="nextButton" className="howtobutton" onClick={sendSelectedItems} /></div>
      </form>
    </div>
  );
}

export default ListPage;