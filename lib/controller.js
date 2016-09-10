class Controller {
    constructor(model) {
        this.model = model;
    }

    find(req, res, next) {
        return this.model.find(req.query).exec()
            .then(things => res.status(200).json(things))
            .catch(err => next(err));
    }

    findOne(req, res, next) {
        return this.model.findOne(req.query).exec()
            .then(thing => res.status(200).json(thing))
            .catch(err => next(err));
    }

    findById(req, res, next) {
        // the following check is only needed when using mongodb's
        // default objectid, it fails gracefully with bad input
        const id = req.params.id;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).end();
        }
        return this.model.findById(id).exec()
            .then(thing => {
                if (!thing) { return res.status(404).end(); }
                return res.status(200).json(thing);
            })
            .catch(err => next(err));
    }

    create(req, res, next) {
        const item = new this.model(req.body);
        item.save().exec()
            .then(thing => res.status(201).json(thing))
            .catch(err => next(err));
    }

    update(req, res, next) {
        const conditions = { _id: req.params.id };
        this.model.update(conditions, req.body)
            .then(thing => {
                if (!thing) { return res.status(404).end(); }
                return res.status(200).json(thing);
            })
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(thing => {
                if (!thing) { return res.status(404).end(); }
                return res.status(204).end();
            })
            .catch(err => next(err));
    }
}

module.exports = Controller;