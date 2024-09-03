// DOM 요소 참조
const form = document.querySelector(".js-form");
const input = document.querySelectorAll(".js-input");
const button = document.querySelector(".js-button");
const emailError = document.querySelector(".js-email-error");
const pwError = document.querySelector(".js-pw-error");
const nicknameError = document.querySelector(".js-nickname-error");
const pwCheckError = document.querySelector(".js-pw-check-error");
const pwCheck = document.querySelector(".js-pw-check");

// 이벤트 핸들러
function valueCheck(e) {
  switch (e.target.name) {
    case "email":
      setInvalid(e.target, emailError, "이메일을 입력해주세요");
      break;

    case "password":
      setInvalid(e.target, pwError, "비밀번호를 입력해주세요");
      break;

    case "password-check":
      setInvalid(e.target, pwCheckError, "비밀번호를 입력해주세요");
      break;

    case "nickname":
      e.target.value
        ? setValid(e.target, nicknameError)
        : setInvalid(e.target, nicknameError, "닉네임을 입력해주세요");
      break;
  }
}

function rewriteValue(e) {
  if (!e.target.value) {
    e.target.classList.add("invalid");
  }
}

function setValid(el, errorElement) {
  el.classList.remove("invalid", "js-error");
  if (errorElement) errorElement.textContent = "";
}

function setInvalid(el, errorElement, message) {
  el.classList.add("invalid", "js-error");
  if (errorElement) errorElement.textContent = message;
}

// 유효성 검사
function valueValidation() {
  input.forEach((el) => {
    switch (el.name) {
      case "email":
        emailValidation(el);
        break;

      case "password":
      case "password-check":
        pwValidation(el);
        break;

      case "nickname":
        el.value
          ? setValid(el, nicknameError)
          : setInvalid(el, nicknameError, "닉네임을 입력해주세요");
        break;
    }
  });

  if (pwCheck) {
    pwMatch();
  } else buttonActivation();
}

function emailValidation(el) {
  if (!el.value) {
    setInvalid(el, emailError, "이메일을 입력해주세요");
  } else {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (pattern.test(el.value)) {
      setValid(el, emailError);
    } else {
      setInvalid(el, emailError, "잘못된 이메일 형식입니다");
    }
  }
}

function pwValidation(el) {
  const isValid = el.value && el.value.length >= 8; //조건을 묶음
  const errorTarget = !el.value ? pwError : pwCheckError; //에러 타겟을 지정
  const errorMessage = !el.value
    ? "비밀번호를 입력해주세요"
    : "비밀번호를 8자 이상 입력해주세요"; //타겟별 메시지 지정

  if (isValid) {
    setValid(el, el.name === "password" ? pwError : pwCheckError);
    return;
  }

  setInvalid(el, errorTarget, errorMessage);
}

function pwMatch() {
  if (pw.value && pwCheck.value) {
    if (pw.value === pwCheck.value) {
      setValid(pwCheck, pwCheckError);
    } else {
      if (pwCheck.value.length > 8) {
        setInvalid(pwCheck, pwCheckError, "비밀번호가 일치하지 않습니다");
      }
      valueStatus.push(FAILED);
    }
  }
  buttonActivation();
  //비밀번호 일치 확인
}

function buttonActivation() {
  if (!valueStatus.includes(FAILED)) {
    form.submit();
    if (!pwCheck) location.href = "items.html";
    else location.href = "login.html";
  }
  //버튼 활성화 및 페이지 이동
}

const pw = document.querySelector(".js-pw");
const pwIcon = document.querySelector(".js-pw-icon");

function toggleIcon(e) {
  const hidden = "/images/icon/pw-hidden.png";
  const view = "/images/icon/pw-view.png";

  const isPasswordType = pw.type === "password";

  pw.type = isPasswordType ? "text" : "password";
  pwIcon.src = isPasswordType ? view : hidden;
  pwIcon.alt = isPasswordType ? "비밀번호 보기 버튼" : "비밀번호 숨기기 버튼";
  pw.focus();
  //비밀번호 토글 기능
}

// 이벤트 리스너
input.forEach((el) => {
  el.addEventListener("focusout", valueCheck);
  el.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("js-error")) {
      rewriteValue(e);
    }
  });
  el.addEventListener("change", valueCheck);
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  valueValidation();
});

pwIcon.addEventListener("click", toggleIcon);
