import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('index'); 
});
router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  res.render('reset-password', { token });
});


export default router;
