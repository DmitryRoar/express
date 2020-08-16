const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, image) {
        this.title = title
        this.price = price
        this.image = image
        this.id = uuid()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.image,
            id: this.id
        }
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses, null, 4),
                (err) => {
                    if (err) reject(err)
                    resolve()
                }
            )
        })   
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, data) => {
                    if (err) reject(err)
                
                    resolve(JSON.parse(data))
                }
            )
        }) 
    }

    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(el => el.id === id)
    }

    static async update(course) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course    

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.resolve(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses, null, 2),
                (err) => {
                    if (err) reject(err)
                    resolve()
                }
            )
        })
    }
}

module.exports = Course