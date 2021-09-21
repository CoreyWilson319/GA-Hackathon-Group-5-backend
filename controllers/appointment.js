// import model

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};

export const getAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if(appointment) {
            res.json(appointment)
        } else {
            res.status(404).json({ error: 'Appointment not found.' })
        }
        res.json(appointments);
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};

export const postAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};

export const putAppointment = async (req,res) => {
    try {
        const { id, body } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(id, body, {new: true});
        res.send(appointment);
    } catch (e) {
        res.status(424).json({ error: e.message });
    };
};

export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        res.send(appointment)
    } catch (e) {
        res.status(404).json({ error: e.message });
    };
};