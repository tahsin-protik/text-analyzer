import { Request, Response } from 'express';
import Text from '../models/text';

// Create a new text
export const createText = async (req: Request, res: Response) => {
  try {
    const text = await Text.create(req.body);
    res.status(201).json(text);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create text' });
  }
};

// Get all texts
export const getAllTexts = async (req: Request, res: Response) => {
  try {
    const texts = await Text.findAll();
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve texts' });
  }
};

// Get a single text by ID
export const getTextById = async (req: Request, res: Response) => {
  try {
    const text = await Text.findByPk(req.params.id);
    if (text) {
      res.status(200).json(text);
    } else {
      res.status(404).json({ error: 'Text not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve text' });
  }
};

// Update a text by ID
export const updateText = async (req: Request, res: Response) => {
  try {
    const [updated] = await Text.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedText = await Text.findByPk(req.params.id);
      res.status(200).json(updatedText);
    } else {
      res.status(404).json({ error: 'Text not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update text' });
  }
};

// Delete a text by ID
export const deleteText = async (req: Request, res: Response) => {
  try {
    const deleted = await Text.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Text not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete text' });
  }
};

