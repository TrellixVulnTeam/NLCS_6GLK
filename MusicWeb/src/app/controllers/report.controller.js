const db = require("../models");
const Report = db.report;
const Song = db.song;
const User = db.user;
// Create and Save a new report
exports.createOneReport = async (req, res, next) => {
  try{
    const {userId} = req.user;
    const report = await Report.create({...req.body, user: userId}); 
    res.status(200).json({
      status: 'success',
      data:{report}
    }
    );
  }catch(error){
    next(error);
  } 
};

// Retrieve all reports from the database.
exports.getAllReport = async (req, res, next) => {
  try{
    const report = await Report.find({}).populate('user', 'name');
    res.status(200).json({
      status: 'success',
      resulsts: report.length,
      data:{report}
    }
    );
  }catch(error){
    res.json(error)
  } 
};

// Find a single report with an id
exports.getOneReport = async (req, res, next) => {
  try{
    const id = req.params.id;
    const report = await Report.findById(id);
    res.status(200).json({
      status: 'success',
      resulsts: report.length,
      data:{report}
    }
    );
  }catch(error){
    res.json(error)
  } 
};

// Delete a report with the specified id in the request
exports.deleteOneReport = async (req, res, next) => {
  try{
    const id = req.params.id;
    await Report.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'Report was deleted successfully!'
    });
  }catch(error){
    res.json(error)
  }
};
