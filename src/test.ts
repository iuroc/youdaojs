import YouDaoJS from './main'
const fanyi = new YouDaoJS()

fanyi.getResult('Hello World').then(data => {
    console.log(data)
})