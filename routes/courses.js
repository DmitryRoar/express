const Course = require('../models/course')
const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'Courses Page',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.getById(req.params.id)
    const capitalize = (str) => `${str.charAt(0).toUpperCase()}${course.title.slice(1)}`
    res.render('course.edit.hbs', {
        title: `Edit ${capitalize(course.title)}`,
        course
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

module.exports = router