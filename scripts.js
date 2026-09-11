const orders = [

  {
    username: "chloe123",
    order: "aespa Album GO",
    orderId: "AESPA-001",
    item: "aespa 6th Mini Album",
    quantity: 2,
    status: "In Transit",
    tracking: "JP123456789"
  },

  {
    username: "chloe123",
    order: "H2H Album GO",
    orderId: "H2H-004",
    item: "Hearts2Hearts Album",
    quantity: 1,
    status: "Secured",
    tracking: "-"
  },

  {
    username: "anna99",
    order: "aespa MD GO",
    orderId: "AESPA-008",
    item: "aespa Official MD",
    quantity: 3,
    status: "Posted Out",
    tracking: "MY987654321"
  }

];


function searchOrders() {

  const input =
    document.getElementById("usernameInput");

  const message =
    document.getElementById("message");

  const results =
    document.getElementById("results");

  const orderList =
    document.getElementById("orderList");

  const usernameDisplay =
    document.getElementById("usernameDisplay");


  let username =
    input.value.trim().toLowerCase();


  // Remove @

  username =
    username.replace(/^@/, "");


  if (!username) {

    message.textContent =
      "Please enter your Telegram username.";

    results.classList.add("hidden");

    return;
  }


  const userOrders =
    orders.filter(order =>
      order.username.toLowerCase() === username
    );


  if (userOrders.length === 0) {

    message.textContent =
      "No orders found. Please check your username.";

    results.classList.add("hidden");

    return;
  }


  message.textContent = "";

  results.classList.remove("hidden");


  usernameDisplay.textContent =
    "@" + username;


  orderList.innerHTML = "";


  userOrders.forEach(order => {

    const card =
      document.createElement("div");

    card.className = "order-card";


    const statusClass =
      getStatusClass(order.status);


    card.innerHTML = `

      <div class="order-top">

        <div>

          <div class="order-name">
            ${order.order}
          </div>

          <div class="order-id">
            ${order.orderId}
          </div>

        </div>

        <div class="status ${statusClass}">
          ${order.status}
        </div>

      </div>


      <div class="order-info">

        <div class="info-row">
          <span>Item</span>
          <span>${order.item}</span>
        </div>

        <div class="info-row">
          <span>Quantity</span>
          <span>${order.quantity}</span>
        </div>

        <div class="info-row">
          <span>Tracking</span>
          <span>${order.tracking}</span>
        </div>

      </div>

    `;


    orderList.appendChild(card);

  });

}


function getStatusClass(status) {

  const value =
    status.toLowerCase();


  if (value.includes("secured")) {
    return "secured";
  }

  if (value.includes("transit")) {
    return "transit";
  }

  if (value.includes("arrived")) {
    return "arrived";
  }

  if (value.includes("posted")) {
    return "posted";
  }

  return "";

}


/* Press Enter to search */

document
  .getElementById("usernameInput")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      searchOrders();
    }

  });
