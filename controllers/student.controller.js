const Student = require("../models/student.model");

exports.create = async (req, res) => {
  try{
    const student = await Student.create(req.body);
    res.status(201).json({error: false, student});
  }catch(e){
    const {message} = e;
    res.status(500).json({error: false, message})
  }
}

exports.students = async (req, res) => {
    try{
      const students = await Student.find({});
      res.json({error: false, students});
    }catch(e){
      const {message} = e;
      res.status(500).json({error: false, message})
    }
}

exports.deleteAll = async (req, res) => {
  try{
    const {deletedCount: deleted} = await Student.deleteMany({})
    res.json({error: false, deleted});
  }catch(e){
    const {message} = e;
    res.status(500).json({error: false, message})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
    const student = await Student.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    res.json({error: false, student});
  }catch(e){
    const {message} = e;
    res.status(500).json({error: false, message})
  }
}

exports.student = async (req, res) => {
  const id = req.params.id;
  try{
    const student = await Student.findById(id);
    res.json({error: false, student});
  }catch(e){
    res.status(500).json({error: false, message})
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  try{
    const student = await Student.findByIdAndDelete(id);
    res.json({error: false, student})
  }catch(e){
    res.status(500).json({error: false, message})
  }
}
