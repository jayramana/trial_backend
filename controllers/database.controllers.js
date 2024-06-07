
const Gym_Schema = require("../models/database.models.js");
const getAlltasks = async (req, res) => {
  try {
    const all_task = await Gym_Schema.find({});
    res.status(200).json(all_task);
  } catch (error) {
    res.status(500).json("Server Error cannot fetch data");
  }
};

const getOnetask = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await Gym_Schema.findOne(id);
    res.status(200).json(getOne);
  } catch (error) {
    res.status(500).json("Not found !");
  }
};

const createTask = async (req, res) => {
  try {
    const respond = await Gym_Schema.create(req.body);
    res.status(200).json(respond);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatetask = async (req, res) => {
  try {
    const { id } = req.params;
    const Update_Mem = await Gym_Schema.findByIdAndUpdate(id, req.body,{new:true,runValidators:true});
    if (!Update_Mem) {
      return res.status(404).json("Not Found");
    }
    res.status(200).json(Update_Mem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletetask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProd = await Gym_Schema.findByIdAndDelete(id);
    if (!deleteProd) {
      res.status(404).json("Not found !");
    }
    res.status(200).json(deleteProd);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {getAlltasks,getOnetask,createTask,updatetask,deletetask}