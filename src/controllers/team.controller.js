const { Team } = require('../models');

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
};

// Create team
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating team',
      error: error.message
    });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    await team.update(req.body);
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating team',
      error: error.message
    });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    await team.destroy();
    res.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message
    });
  }
};
