import YouDaoFanYi from './YouDaoFanYi'

const fanyi = new YouDaoFanYi()
fanyi.getResult('你好', 0, 0).then(data => {
    console.log(data)
})