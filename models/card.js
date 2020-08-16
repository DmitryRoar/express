const path = require('path')
const fs = require('fs')

const pth = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(course) {
        const card = await Card.fetch()
        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(pth, JSON.stringify(card, null, 2), (err , data) => {
                if (err) reject(err)
                console.log('data', data)
                resolve(data)
            })
        })
    }   
    
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(pth, 'utf-8', (error, data) => {
                if (error) reject(error)
                resolve(JSON.parse(data))
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()
        const idx = card.courses.findIndex(el => el.id === id)
        const candidate = card.courses[idx]

        if (candidate.count === 1) {
            card.courses = card.courses.filter(el => el.id !== id)
        } else {
            card.courses[idx].count--
        }

        card.price -= candidate.price
        
        return new Promise((resolve, reject) => {
            fs.writeFile(pth, JSON.stringify(card, null, 2), (err) => {
                if (err) reject(err)
                resolve(card)
            })
        })
    }
}

module.exports = Card