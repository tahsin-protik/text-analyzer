import { Request, Response } from 'express';

export const testAccessibilityV1 = (req: Request, res: Response): void => {
  try {
    const testResult = {
      status: 'success',
      message: 'TEST, OK!'
    };

    res.status(200).json(testResult);
  } catch (error) {
    console.error('Error in test controller:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error occurred during test'
    });
  }
};
