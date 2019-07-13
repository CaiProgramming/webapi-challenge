const express = require("express");
const router = express.Router();
const data = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", (req, res) => {
  data
    .get()
    .then(project => {
      if (project.length === 0) {
        return res.status(404).json("Could not find the project with given id");
      }
      return res.status(200).json(project);
    })
    .catch(error => {
      return res.status(404).json("Can not find project");
    });
});

router.get("/:id", validateID, (req, res) => {
  data
    .get(req.params.id)
    .then(project => {
      if (project.length === 0) {
        return res.status(404).json("Could not find the project with given id");
      }
      return res.status(200).json(project);
    })
    .catch(error => {
      return res.status(404).json("Can not find project");
    });
});

router.get("/project/:id", validateID, (req, res) => {
  data
    .getProjectActions(req.params.id)
    .then(project => {
      if (project.length === 0) {
        return res.status(404).json("Could not find the project with given id");
      }
      return res.status(200).json(project);
    })
    .catch(error => {
      return res.status(404).json("Can not find project");
    });
});

router.post("/", validateproject, (req, res) => {
  data
    .insert(req.body)
    .then(project => {
      if (project.length === 0) {
        return res.status(404).json("Could not find the project with given id");
      }
      return res.status(200).json(project);
    })
    .catch(error => {
      return res
        .status(400)
        .json("Please provide project_id, description, notes, and completed");
    });
});

router.put("/:id", validateID, validateproject, (req, res) => {
  data
    .update(req.params.id, req.body)
    .then(project => {
      if (project.length === 0) {
        return res.status(404).json("Could not find the project with given id");
      }
      return res.status(200).json(project);
    })
    .catch(error => {
      return res.status(404).json("Could not find the project with given id");
    });
});

router.delete("/:id", validateID, (req, res) => {
  data
    .remove(req.params.id)
    .then(project => {
      return res.status(201).json("Successfully deleted");
    })
    .catch(error => {
      return res.status(404).json("Could not find the project with given id");
    });
});

function validateID(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json("please provide an id");
  }
}

function validateproject(req, res, next) {
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
