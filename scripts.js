/* =========================================
   WINRI.GO — LIVE TRACKER V3
   ========================================= */

const API_URL =
  "https://script.google.com/macros/s/AKfycbzz_8zxK5sHh6emFTeSxWBTYcLB1NOGHnbdSwI4RpHwOF5tWg9LTseubba5WM-DFQIr/exec";


async function searchOrders() {

  const input = document.getElementById("usernameInput");
  const message = document.getElementById("message");
  const results = document.getElementById("results");
  const orderList = document.getElementById("orderList");
  const usernameDisplay = document.getElementById("usernameDisplay");

  let username = input.value.trim();

  // Remove @
  username = username.replace(/^@/, "");


  if (!username) {

    message.textContent =
      "Please enter your Telegram username.";

    results.classList.add("hidden");

    return;
  }


  /* =========================================
     LOADING
     ========================================= */

  message.textContent =
    "LIVE API V3 — Searching...";

  results.classList.add("hidden");
  orderList.innerHTML = "";


  try {

    const requestURL =
      API_URL +
      "?username=" +
      encodeURIComponent(username) +
      "&t=" +
      Date.now();


    console.log("WINRI.GO API request:", requestURL);


    const response = await fetch(
      requestURL,
      {
        method: "GET",
        redirect: "follow",
        cache: "no-store"
      }
    );


    console.log(
      "WINRI.GO API response:",
      response.status,
      response.url
    );


    if (!response.ok) {

      throw new Error(
        "API HTTP error: " + response.status
      );

    }


    const data = await response.json();


    console.log(
      "WINRI.GO API data:",
      data
    );


    if (!data.success) {

      throw new Error(
        data.message ||
        "Tracker API returned an error."
      );

    }


    const orders =
      Array.isArray(data.orders)
        ? data.orders
        : [];


    /* =========================================
       NO ORDERS
       ========================================= */

    if (orders.length === 0) {

      message.textContent =
        "No orders found for @" +
        username +
        ".";

      results.classList.add("hidden");

      return;

    }


    /* =========================================
       SUCCESS
       ========================================= */

    message.textContent =
      orders.length +
      " order(s) found ♡";


    results.classList.remove("hidden");


    usernameDisplay.textContent =
      "@" + username;


    orderList.innerHTML = "";


    orders.forEach(order => {

      const card =
        document.createElement("div");


      card.className =
        "order-card";


      const statusClass =
        getStatusClass(order.status);


      const paymentClass =
        getPaymentClass(order.payment);


      const emsClass =
        getPaymentClass(order.ems);


      const postageClass =
        getPaymentClass(order.postage);


      card.innerHTML = `

        <div class="order-top">

          <div>

            <div class="order-name">
              ${escapeHTML(
                order.goName || "GO Order"
              )}
            </div>

            <div class="order-id">
              Last updated:
              ${escapeHTML(
                order.lastUpdated || "-"
              )}
            </div>

          </div>


          <div class="status ${statusClass}">
            ${escapeHTML(
              order.status || "Updating"
            )}
          </div>

        </div>


        <div class="order-info">

          <div class="info-row">
            <span>Item</span>

            <span>
              ${escapeHTML(
                order.item || "-"
              )}
            </span>
          </div>


          <div class="info-row">
            <span>Amount</span>

            <span>
              ${escapeHTML(
                order.amount || "-"
              )}
            </span>
          </div>


          <div class="info-row">
            <span>Item Payment</span>

            <span class="payment-text ${paymentClass}">
              ${escapeHTML(
                order.payment || "Pending"
              )}
            </span>
          </div>


          <div class="info-row">
            <span>EMS</span>

            <span class="payment-text ${emsClass}">
              ${escapeHTML(
                order.ems || "Not Ready"
              )}
            </span>
          </div>


          <div class="info-row">
            <span>Postage</span>

            <span class="payment-text ${postageClass}">
              ${escapeHTML(
                order.postage || "Not Ready"
              )}
            </span>
          </div>


          <div class="info-row">
            <span>Tracking</span>

            <span>
              ${escapeHTML(
                order.tracking || "-"
              )}
            </span>
          </div>

        </div>

      `;


      orderList.appendChild(card);

    });


  } catch (error) {

    console.error(
      "WINRI.GO tracker error:",
      error
    );


    message.textContent =
      "LIVE API V3 ERROR — " +
      error.message;


    results.classList.add("hidden");

  }

}



/* =========================================
   STATUS COLOUR
   ========================================= */

function getStatusClass(status) {

  const value =
    String(status || "")
      .toLowerCase();


  if (value.includes("secured")) {
    return "secured";
  }


  if (
    value.includes("transit") ||
    value.includes("warehouse")
  ) {
    return "transit";
  }


  if (
    value.includes("admin") ||
    value.includes("packing")
  ) {
    return "arrived";
  }


  if (
    value.includes("posted") ||
    value.includes("done")
  ) {
    return "posted";
  }


  return "";

}



/* =========================================
   PAYMENT COLOUR
   ========================================= */

function getPaymentClass(value) {

  const text =
    String(value || "")
      .trim()
      .toLowerCase();


  if (text === "paid") {
    return "paid";
  }


  if (text === "pending") {
    return "pending";
  }


  return "not-ready";

}



/* =========================================
   SECURITY
   ========================================= */

function escapeHTML(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}



/* =========================================
   ENTER TO SEARCH
   ========================================= */

const usernameInput =
  document.getElementById("usernameInput");


if (usernameInput) {

  usernameInput.addEventListener(
    "keydown",
    function(event) {

      if (event.key === "Enter") {
        searchOrders();
      }

    }
  );

}
