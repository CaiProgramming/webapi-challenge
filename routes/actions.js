const express = require("express");
const router = express.Router();
const data = require("../data/helpers/actionModel");

router.use(express.json());

router.get("/", (req, res) => {
  data
    .get()
    .then(action => {
      if (action.length === 0) {
        return res.status(404).json("Could not find the action with given id");
      }
      return res.status(200).json(action);
    })
    .catch(error => {
      return res.status(404).json("Can not find action");
    });
});

router.get("/:id", validateID, (req, res) => {
  data
    .get(req.params.id)
    .then(action => {
      if (action.length === 0) {
        return res.status(404).json("Could not find the action with given id");
      }
      return res.status(200).json(action);
    })
    .catch(error => {
      return res.status(404).json("Can not find action");
    });
});

router.post("/", validateAction, (req, res) => {
  data
    .insert(req.body)
    .then(action => {
      return res.status(200).json(action);
    })
    .catch(error => {
      return res
        .status(400)
        .json("Please provide project_id, description, notes, and completed");
    });
});

router.put("/:id", validateID, validateAction, (req, res) => {
  data
    .update(req.params.id, req.body)
    .then(action => {
      if (action.length === 0) {
        return res.status(404).json("Could not find the action with given id");
      }
      return res.status(200).json(action);
    })
    .catch(error => {
      return res.status(404).json("Could not find the action with given id");
    });
});

router.delete("/:id", validateID, (req, res) => {
  data
    .remove(req.params.id)
    .then(action => {
      return res.status(201).json("Successfully deleted");
    })
    .catch(error => {
      return res.status(404).json("Could not find the action with given id");
    });
});

function validateID(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json("please provide an id");
  }
}

function validateAction(req, res, next) {
  if (
    req.body.project_id ||
    req.body.description ||
    req.body.notes ||
    req.body.completed
  ) {
    next();
  } else {
    console.log(req.body);
    res
      .status(400)
      .json(
        "Please provide at least project_id, description, notes, or completed"
      );
  }
}

module.exports = router;
