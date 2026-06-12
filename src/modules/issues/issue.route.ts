import { Router } from 'express';
import { issueController } from './issue.controller.ts';
import auth from '../../middlewares/auth.ts';
import { User_Role } from '../../types/index.ts';

const router = Router();

router.post('/', auth(User_Role.maintainer, User_Role.contributor), issueController.createIssue);
router.get('/', issueController.getAllIssues);
router.get('/:id', issueController.getSingleIssue);
router.patch(
  '/:id',
  auth(User_Role.maintainer, User_Role.contributor),
  issueController.updateIssue,
);
router.delete('/:id', auth(User_Role.maintainer), issueController.deleteIssue);

export const issueRoute = router;
