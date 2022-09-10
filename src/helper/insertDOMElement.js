function insertElement({ element = "div", id = "feedback" }) {
  const feedback = document.createElement(element);
  feedback.setAttribute("id", id);
  document.body.appendChild(feedback);
}
export { insertElement };
