const { request, response } = require("express");
const Job = require("../models/job");
const Postulation = require("../models/postulation");

const create = async (req = request, res = response) => {
    const { title, description, companyName, contractType, schedule, location, salary } = req.body;

    const newJob = new Job({
        title, description, companyName, contractType, schedule, location, salary
    });
    const savedJob = await Job.create(newJob);
    return res.status(201).json(savedJob);
};

const getJobs = async (req = request, res = response) => {
    return res.status(200).json((await Job.find()));
};

const getJobById = async (req = request, res = response) => {
    const { jobId, userId } = req.params;
    if (!jobId) {
        return res.status(400).json({ message: "jobId is required." });
    }

    if (!userId) {
        return res.status(400).json({ message: "userId is required." });
    }

    let job = await Job.findById(jobId);
    const alreadyApplied = (await Postulation.findOne({ jobId, userId })) ? true : false;
    return res.status(200).json({ job, alreadyApplied });
};

const apply = async (req = request, res = response) => {
    const { userId, jobId } = req.params;
    if (!jobId) {
        return res.status(400).json({ message: "jobId is required." });
    }

    if (!userId) {
        return res.status(400).json({ message: "userId is required." });
    }

    const postulation = await Postulation.findOne({ jobId, userId });
    if (postulation) {
        return res.status(400).json({ message: "User already applied to this job" });
    }

    const newPostulation = new Postulation({
        userId, jobId
    });
    const savedPostulation = await Postulation.create(newPostulation);
    return res.status(201).json(savedPostulation);
};

const getAppliedJobs = async (req = request, res = response) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "userId is required." });
    }

    const postulations = await Postulation.find({ userId });

    return res.status(201).json(postulations);
};

module.exports = {
    create,
    getJobs,
    getJobById,
    apply,
    getAppliedJobs
}