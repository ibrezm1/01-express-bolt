const userService = require('../services/userService');
const logger = require('../utils/logger');

exports.createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userService.updateUser(userId, userData);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.unlockUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.unlockUser(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.deprovisionUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.deprovisionUser(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.passwordUnlock = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.passwordUnlock(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await userService.searchUsers(page, limit, search);
    res.json(result);
  } catch (error) {
    next(error);
  }
};