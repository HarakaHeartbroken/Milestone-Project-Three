const router = require('express').Router()
const db = require("../models")

const { Unit, Comment, User } = db

router.post('/', async (req, res) => {
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.rank) {
        req.body.rank = 'Legionary'
    }
    if (!req.body.legion) {
        req.body.legion = 'Shattered Legions'
    }
    const unit = await Unit.create(req.body)
    res.json(unit)
})


router.get('/', async (req, res) => {
    const units = await Unit.findAll()
    res.json(units)
})


router.get('/:unitId', async (req, res) => {
    let unitId = Number(req.params.unitId)
    if (isNaN(unitId)) {
        res.status(404).json({ message: `Invalid id "${unitId}"` })
    } else {
        const unit = await Unit.findOne({
            where: { unitId: unitId },
            include: {
                association: 'comments',
                include: 'author'
            }
        })
        if (!unit) {
            res.status(404).json({ message: `Could not find unit with id "${unitId}"` })
        } else {
            res.json(unit)
        }
    }
})

router.put('/:unitId', async (req, res) => {
    let unitId = Number(req.params.unitId)
    if (isNaN(unitId)) {
        res.status(404).json({ message: `Invalid id "${unitId}"` })
    } else {
        const unit = await Unit.findOne({
            where: { unitId: unitId },
        })
        if (!unit) {
            res.status(404).json({ message: `Could not find unit with id "${unitId}"` })
        } else {
            Object.assign(unit, req.body)
            await unit.save()
            res.json(unit)
        }
    }
})

router.delete('/:unitId', async (req, res) => {
    let unitId = Number(req.params.unitId)
    if (isNaN(unitId)) {
        res.status(404).json({ message: `Invalid id "${unitId}"` })
    } else {
        const unit = await Unit.findOne({
            where: {
                unitId: unitId
            }
        })
        if (!unit) {
            res.status(404).json({ message: `Could not find unit with id "${unitId}"` })
        } else {
            await unit.destroy()
            res.json(unit)
        }
    }
})

// commented out, legacy code from rest-rant base, will delete after testing
// router.post('/:unitId/comments', async (req, res) => {
//     const unitId = Number(req.params.unitId)

//     req.body.rant = req.body.rant ? true : false

//     const unit = await Unit.findOne({
//         where: { unitId: unitId }
//     })

//     if (!unit) {
//         res.status(404).json({ message: `Could not find unit with id "${unitId}"` })
//     }

//     const author = await User.findOne({
//         where: { userId: req.body.authorId }
//     })

//     if (!author) {
//         res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` })
//     }

//     const comment = await Comment.create({
//         ...req.body,
//         unitId: unitId
//     })

//     res.send({
//         ...comment.toJSON(),
//         author
//     })
// })

// router.delete('/:unitId/comments/:commentId', async (req, res) => {
//     let unitId = Number(req.params.unitId)
//     let commentId = Number(req.params.commentId)

//     if (isNaN(unitId)) {
//         res.status(404).json({ message: `Invalid id "${unitId}"` })
//     } else if (isNaN(commentId)) {
//         res.status(404).json({ message: `Invalid id "${commentId}"` })
//     } else {
//         const comment = await Comment.findOne({
//             where: { commentId: commentId, unitId: unitId }
//         })
//         if (!comment) {
//             res.status(404).json({ message: `Could not find comment with id "${commentId}" for unit with id "${unitId}"` })
//         } else {
//             await comment.destroy()
//             res.json(comment)
//         }
//     }
// })


module.exports = router