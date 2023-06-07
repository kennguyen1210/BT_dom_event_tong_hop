let submitBtn = document.querySelector(".btn");
let checkValid = () => {
  let fullName = document.getElementById("fullname");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let hometown = document.getElementById("hometown");

  if (fullName.value == "") {
    alert("Vui long nhap ten");
    return false;
  }
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email.value)) {
    alert("Vui long nhap mail dung dinh dang");
    return false;
  }
  let phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!phoneRegex.test(phone.value)) {
    alert("Vui long nhap so dien thoai dung dinh dang so dien thoai Viet Nam");
    return false;
  }
  if (hometown.value == "") {
    alert("Vui long khong de trong que quan");
    return false;
  }
  return true;
};
let reset = () => {
  let inputGroup = document.querySelectorAll("input[type=text]");
  inputGroup.forEach((element) => {
    element.value = "";
  });
  let maleRadio = document.querySelector("#male");
  maleRadio.checked = true;
};

let studentList = [];
let studentListTable = document.querySelector(".student_list_item");
studentListTable.innerHTML = "";
submitBtn.addEventListener("click", function (e) {
  if (checkValid()) {
    let fullName = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let hometown = document.getElementById("hometown").value;
    let sex = document.querySelectorAll(".sex");
    let gender;

    sex.forEach((element) => {
      if (element.checked) {
        gender = element.value;
      }
    });
    let student = [];
    student.push(fullName, email, phone, hometown, gender);

    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i][0] === fullName) {
        debugger;
        studentList.splice(i, 1, student);
        let flagGroup = document.querySelectorAll("#flag");
        console.log(flagGroup);
        flagGroup.forEach((flag) => {
          if (flag.innerText === fullName) {
            let num = flag.classList[0].slice(-1);
            console.log(num);
            document.querySelector(`.student_name${num}`).innerText = fullName;
            document.querySelector(`.student_email${num}`).innerText = email;
            document.querySelector(`.student_phone${num}`).innerText = phone;
            document.querySelector(`.student_hometown${num}`).innerText =
              hometown;
            document.querySelector(`.student_gender${num}`).innerText = gender;
            reset();
            console.log(studentList);
            return false;
          }
        });
        return false;
      }
    }
    studentList.push(student);
    let index = studentList.length - 1;

    studentListTable.innerHTML += `<tr id="student${index}">
                <td></td>
                <td class="student_name${index}" id="flag">${fullName}</td>
                <td class="student_email${index}">${email}</td>
                <td class="student_phone${index}">${phone}</td>
                <td class="student_hometown${index}">${hometown}</td>
                <td class="student_gender${index}">${gender}</td>
                <td><a href="#" class="edit${index}" onclick="edit(${index})">edit</a>| <a href="#" class="delete${index}" onclick="deleteItem(${index})">delete</a></td>
              </tr>`;
    reset();
    console.log(studentList);
  }
});
let edit = (index) => {
  let fullName = document.getElementById("fullname");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let hometown = document.getElementById("hometown");
  let sex = document.querySelectorAll(".sex");
  let gender;
  let studentNameElement = document.querySelector(`.student_name${index}`);
  let studentName = studentNameElement.innerText;
  console.log(studentName);
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i][0] == studentName) {
      fullName.value = studentList[i][0];
      email.value = studentList[i][1];
      phone.value = studentList[i][2];
      hometown.value = studentList[i][3];
      gender = studentList[i][4];
      sex.forEach((element) => {
        if (element.value === gender) {
          element.checked = true;
        }
      });
    }
  }
};
let deleteItem = (index) => {
  let deleteElement = document.getElementById(`student${index}`);
  studentListTable.removeChild(deleteElement);
  studentList.splice(index, 1);
  console.log(studentList);
};
