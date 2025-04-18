document.addEventListener("DOMContentLoaded", function() {
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  const addButton = document.querySelector("button");

  function addTask() {
    if (inputBox.value === "") {
      alert("You must write something");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      let span = document.createElement("span");
      span.innerHTML = "\u00D7";
      li.appendChild(span);
      listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
  }

  addButton.addEventListener("click", addTask);

  listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  }, false);

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    let items = listContainer.getElementsByTagName("li");
    for (let item of items) {
      let span = item.getElementsByTagName("span")[0];
      span.onclick = function() {
        item.remove();
        saveData();
      };
      item.onclick = function(e) {
        if (e.target.tagName === "LI") {
          item.classList.toggle("checked");
          saveData();
        }
      };
    }
  }

  showTask();
});