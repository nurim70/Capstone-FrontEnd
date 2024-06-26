import React from "react";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Toolbar from "../ui/Toolbar";
import { useEffect } from "react";
import UploadButton from "../ui/FileInput";
import axios from 'axios';
import { useState } from "react";
import FileInput from "../ui/FileInput";


function RegisterPage() {
    const navigate = useNavigate();
    const [emailinput, setEmailinput] = useState("");
    const [usernameinput, setUsernameinput] = useState("");
    const [passwordinput, setPasswordinput] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const [message, setMessage] = useState("");
    var confirm = 0;

    const registeraxios = () => {
        if (confirm === 1) {
            axios({
                method: "POST",
                url: "http://15.165.131.15:8080/api/signup",
                data: {
                    email: emailinput,
                    nickname: usernameinput,
                    password: passwordinput
                },
                headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*"
                }
            }).then((res) => {
                console.log(res);
                alert("회원가입이 완료되었습니다. 로그인해주세요.");
                if (res.status === 200) {
                    navigate("/");
                }
            }).catch((err) => {
                setMessage(err.response.data.message);
                alert(message)
                console.log(err);
            });
        }
        else {
            alert("비밀번호를 확인해주세요.");
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Register`;
    }, []);

    const pwcheck = () => {
        var pw = document.getElementById("pw").value;
        var pwcheck = document.getElementById("PwCheck").value;

        if (pw === "" || pwcheck === "") { alert("비밀번호를 입력해주세요."); }
        else if (pw !== pwcheck) {
            alert("비밀번호가 일치하지 않습니다.");
            document.getElementById("pw").value = "";
            document.getElementById("PwCheck").value = "";

        }
        else {
            alert("비밀번호가 일치합니다.");
            confirm = 1;
        }
    }

    return (
        <div className="registerPage">
            <Toolbar />
            <div className="register-wrapper">
                <h1>Sign Up</h1>
            </div>
            <form>
                <form id="register-form">
                    <table>
                        <tr>
                            <th>
                                <label htmlfor="email" className="register-label">이메일</label> </th>
                            <td><input type="email" id="email" name="email"
                                onChange={(e) => {
                                    setEmailinput(e.target.value);
                                }} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="name" className="register-label">이름</label></th>
                            <td><input type="text" id="Name" name="name" placeholder="국문 / 영문 3~20자 이내"

                                onChange={(e) => {
                                    setUsernameinput(e.target.value);
                                }} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password" className="register-label">비밀번호</label></th>
                            <td><input type="password" id="pw" name="pw" placeholder="영문/숫자/특수문자 포함 8~20자 이내"

                                onChange={(e) => {
                                    setPasswordinput(e.target.value);
                                }} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="passwordcheck" className="register-label">비밀번호 확인</label></th>
                            <td><input type="password" id="PwCheck" name="pwcheck"
                                onChange={(e) => {
                                    setPasswordcheck(e.target.value);
                                }} />
                            </td>
                            <input type="button" id="checkpw" name="확인" value="확인" onClick={pwcheck}></input>
                        </tr>

                    </table>
                    <input type="button" value="Sign" className="Sign" style={{ width: "70%" }} onClick={registeraxios} />

                </form>
            </form>
        </div>
    );
}

export default RegisterPage;