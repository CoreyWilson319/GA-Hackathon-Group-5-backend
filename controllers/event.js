import Events from "../models/Events";

export const getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        res.json(events);
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findById(id);
        if(event) {
            res.json(event)
        } else {
            res.status(404).json({ error: 'event not found.' })
        }
        res.json(events);
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};

export const postEvent = async (req, res) => {
    try {
        const event = new Events(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};

export const putEvent = async (req,res) => {
    try {
        const { id, body } = req.params;
        const event = await Events.findByIdAndUpdate(id, body, {new: true});
        res.send(event);
    } catch (e) {
        res.status(424).json({ error: e.message });
    };
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findByIdAndDelete(id);
        res.send(event)
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};