// const DOMAIN = "192.168.0.152"
const DOMAIN = "localhost"

const PORT = 5000

const BASE_URL = `http://${DOMAIN}:${PORT}`;

// Upload the message sketch to the database
export async function pushToDb(data, x, y, w, h, continent) {
  console.log(data)
  await fetch(BASE_URL + "/message", {
    method: "post",
    body: JSON.stringify({
      dataURL: data,
      xcoord: x || 0,
      ycoord: y || 0,
      width: w,
      height: h,
      continent: continent,
      date: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Get all message sketches from the database
export async function fetchMessages() {
  const res = await fetch(BASE_URL + "/messages/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

// Update all gives messages
export async function updateMessages(messages) {
  await fetch(BASE_URL + "/messages", {
    method: "put",
    body: JSON.stringify(messages),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Update a single message in the database
export async function updateMessage(message) {
  await fetch(BASE_URL + "/message", {
    method: "put",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Remove a single message in the database
export async function removeMessage(message) {
  await fetch(BASE_URL + "/message", {
    method: "delete",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
}