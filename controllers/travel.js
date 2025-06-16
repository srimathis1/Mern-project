import travel from '../models/travel.js';

export const gettravel = async (req, res) => {
  try {
    const alltravdetails = await travel.find();
    res.status(200).json(alltravdetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createdetails = async (req, res) => {
  const data = req.body;

  // Don't create if any field is missing
  if (!data.travelerid || !data.TravelerName || !data.From || !data.Todest || !data.transmode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTraveler = new travel(data);

  try {
    await newTraveler.save();
    res.status(201).json(newTraveler);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTraveler = async (req, res) => {
  const id = req.params.id;
  try {
    await travel.findByIdAndDelete(id);
    res.status(200).send('Successfully Deleted!');
  } catch (error) {
    res.status(500).send('Deletion failed');
  }
};



export const updateTraveler = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updated = await travel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
