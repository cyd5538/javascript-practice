const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Trader Joes",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Albertsons",
    miles: 2.8,
  },
  {
    id: 4,
    store: "Trader Joes",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Albertsons",
    miles: 1.8,
  },
];

router.get("", (request, response) => {
  const { miles } = request.query;
  const parsedMildes = parseInt(miles);
  if (!isNaN(parsedMildes)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= miles);
    response.send(filteredStores)
  } else {
    response.send(supermarkets);
  }
});

module.exports = router;
