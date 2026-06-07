import { Router } from 'express';
import { issueController } from './issue.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/', auth(), issueController.createIssue);
router.get('/', issueController.getAllIssues);
router.get('/:id', issueController.getSingleIssue);
router.put('/:id', auth(), issueController.updateIssue);
router.delete('/:id', auth(), issueController.deleteIssue);

export const issueRoute = router;
