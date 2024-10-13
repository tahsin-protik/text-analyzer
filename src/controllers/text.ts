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

export const getWordCount = async (req: Request, res: Response) => {
  try {
    const text = await Text.findByPk(req.params.id);
    if (text) {
      const wordCount = text.content.split(/\s+/).length;
      res.status(200).json({ word_count: wordCount });
    } else {
      res.status(404).json({ error: 'Text not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get number of words' });
  }
};

export const getCharacterCount = async (req: Request, res: Response) => {
    try {
        const text = await Text.findByPk(req.params.id);
        if (text) {
            const characterCount = text.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, '').length;
            res.status(200).json({ character_count: characterCount });
        } else {
      res.status(404).json({ error: 'Text not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get number of characters' });
  }
};

export const getSentenceCount = async (req: Request, res: Response) => {
    try {
        const text = await Text.findByPk(req.params.id);
        if (text) {
            const splitText = text.content.split(/[.!?]+/g);
            let sentenceCount = 0;
            for(let sentence of splitText) {
                if (sentence.trim() !== '') {
                    sentenceCount++;
                }
            }
            res.status(200).json({ sentence_count: sentenceCount });
        } else {
            res.status(404).json({ error: 'Text not found' });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getParagraphCount = async (req: Request, res: Response) => {
    try {
        const text = await Text.findByPk(req.params.id);
        if (text) {
            const paragraphCount = text.content.split(/\n/).length;
            res.status(200).json({ paragraph_count: paragraphCount });
        } else {
            res.status(404).json({ error: 'Text not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get number of paragraphs' });
    }

};

export const getLongestWordsInParagraphs = async (req: Request, res: Response) => {
    try {
      const text = await Text.findByPk(req.params.id);
      if (text) {
        let paragraphs = text.content.split(/\n/).map((paragraph, index) => ({paragraph_no: index, content: paragraph, longest_word: ""}));
        
        for(let paragraph of paragraphs) {
            const words = paragraph.content.split(/\s+/);
            
            for(let word of words) {
                const cleanWord = word.replace(/[^\w]/g, '');
                if (cleanWord.length > paragraph.longest_word.length) {
                    paragraph.longest_word = cleanWord;
                }
            }
        }
  
        res.status(200).json({ paragraphs });
      } else {
        res.status(404).json({ error: 'Text not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get longest words in paragraphs' });
    }
  };


