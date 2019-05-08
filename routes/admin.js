const express = require('express');
const router = express.Router();
const adminService = require('../service/admin');

router.post('/changeUserStatus', async (req, res) => {
  const { status, id, type, rejectionReason } = req.body;
  const result = await adminService.changeUserStatus(type, id, status, rejectionReason);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.get('/matchingMentorRecommendations/:id', async (req, res) => {
  const result = await adminService.matchingMentorRecommendations(req.params.id);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/createMatch', async (req, res) => {
  const { mentorId, menteeId } = req.body;
  const result = await adminService.createMatch(mentorId, menteeId);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/cancelRelationship', async (req, res) => {
  const { relationshipId } = req.body;
  const result = await adminService.cancelMentoringRelationship(relationshipId);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/removeMentorFromBlacklist', async (req, res) => {
  const { menteeId, mentorId } = req.body;
  const result = await adminService.removeMentorFromBlacklist(menteeId, mentorId);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/toggleMentorAdmin', async (req, res) => {
  const { mentorId, adminValue, campusTeamAdmin } = req.body;
  if (req.admin.admin !== 'superadmin' && (adminValue === 'superadmin' || adminValue !== req.admin.admin)) res.sendStatus(456);
  const result = await adminService.toggleMentorAdmin(mentorId, adminValue, campusTeamAdmin);
  if (result) res.json(result);
  else res.sendStatus(400);
});

module.exports = router;