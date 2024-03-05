const goals = [];

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortune = ["Happy life is just in front of you.", "Good news will come to you by mail.", "Welcome change.", "You are next in line for promotion in your firm.", "You will become more and more wealthy."];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortune.length);
        let randomFortune = fortune[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    createGoal: (req, res) => {
        const { goal } = req.body;
        if (!goal || typeof goal !== 'string'){
            return res.status(400).json({ success: false, message: 'Invalid goal format' });
        }
        goals.push(goal)
        res.status(200).json({ success: true, message: 'Goal added successfully',goals:goals });
    },
    deleteGoal: (req, res) => {
        let index = goals.findIndex(elem => elem === req.params.id)
        goals.splice(index, 1)
        res.status(200).json(goals)
    },
    updateGoal: (req, res) => {
    const { id } = req.params;
    const { goal } = req.body;
    const index = goals.findIndex(elem => elem === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Goal not found' });
    }
    goals[index] = goal;

    res.status(200).json({ success: true, message: 'Goal updated successfully', goals });
    }
}